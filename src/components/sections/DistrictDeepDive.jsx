import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Search, Filter, MapPin, AlertTriangle, TrendingUp, FileText, Activity } from 'lucide-react';
import ChartCard from '../charts/ChartCard';
import GroupedBarChart from '../charts/GroupedBarChart';
import TimeSeriesChart from '../charts/TimeSeriesChart';
import RadarChartComponent from '../charts/RadarChartComponent';
import DataTable from '../ui/DataTable';
import RiskBadge from '../ui/RiskBadge';
import ProgressBar from '../ui/ProgressBar';
import {
  tier1Districts,
  top15DemographicDistricts,
  genderSkew,
  murshidabadAnalysis,
  bahraichAnalysis,
} from '../../data/dashboardData';

const DistrictDeepDive = ({ searchTerm: globalSearchTerm }) => {
  const [selectedDistrict, setSelectedDistrict] = useState(tier1Districts[0]);
  const [localSearchTerm, setLocalSearchTerm] = useState('');
  const [filterTier, setFilterTier] = useState('all');

  // Use global search if provided, otherwise use local search
  const searchTerm = globalSearchTerm || localSearchTerm;

  const filteredDistricts = tier1Districts.filter(d => {
    const matchesSearch = d.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         d.state.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTier = filterTier === 'all' || 
                       (filterTier === 'critical' && d.score >= 90) ||
                       (filterTier === 'high' && d.score >= 75 && d.score < 90) ||
                       (filterTier === 'elevated' && d.score < 75);
    return matchesSearch && matchesTier;
  });

  // Radar data for selected district
  const getRadarData = (district) => [
    { metric: 'Risk Score', value: district.score, max: 100 },
    { metric: 'D/B (Dem/Bio)', value: district.dbRatio * 30, max: 100 },
    { metric: 'Adult Share', value: district.adultShare * 8, max: 100 },
    { metric: 'Sept Surge', value: district.septSurge * 25, max: 100 },
    { metric: 'Alert Level', value: district.score >= 90 ? 95 : district.score >= 80 ? 70 : 50, max: 100 },
  ];

  // Monthly trend simulation for selected district
  const getDistrictTrend = (district) => {
    const base = district.score * 100;
    return [
      { month: 'Jan', demographic: base * 0.7, biometric: base * 0.4, enrolment: base * 0.3 },
      { month: 'Feb', demographic: base * 0.65, biometric: base * 0.42, enrolment: base * 0.28 },
      { month: 'Mar', demographic: base * 0.85, biometric: base * 0.45, enrolment: base * 0.35 },
      { month: 'Apr', demographic: base * 0.75, biometric: base * 0.43, enrolment: base * 0.32 },
      { month: 'May', demographic: base * 0.68, biometric: base * 0.41, enrolment: base * 0.29 },
      { month: 'Jun', demographic: base * 0.62, biometric: base * 0.38, enrolment: base * 0.26 },
      { month: 'Jul', demographic: base * 0.78, biometric: base * 0.44, enrolment: base * 0.33 },
      { month: 'Aug', demographic: base * 0.88, biometric: base * 0.46, enrolment: base * 0.36 },
      { month: 'Sep', demographic: base * district.septSurge * 0.9, biometric: base * 0.5, enrolment: base * 0.45 },
      { month: 'Oct', demographic: base * 0.82, biometric: base * 0.47, enrolment: base * 0.38 },
      { month: 'Nov', demographic: base * 0.76, biometric: base * 0.44, enrolment: base * 0.34 },
      { month: 'Dec', demographic: base * 0.7, biometric: base * 0.42, enrolment: base * 0.3 },
    ];
  };

  const demographicColumns = [
    { header: 'District', accessor: 'district', render: (v, row) => (
      <div>
        <span className="text-slate-800 font-medium">{v}</span>
        <span className="text-slate-500 text-xs ml-2">({row.state})</span>
      </div>
    )},
    { header: 'Updates', accessor: 'updates', render: (v) => (
      <span className="text-slate-600">{(v/1000).toFixed(0)}K</span>
    )},
    { header: 'Intensity', accessor: 'intensity', render: (v) => (
      <span className={`font-mono ${v >= 25 ? 'text-red-600' : v >= 15 ? 'text-orange-600' : 'text-slate-600'}`}>
        {v.toFixed(1)}
      </span>
    )},
    { header: 'Z-Score', accessor: 'zScore', render: (v) => (
      <span className={`font-mono font-bold ${v >= 2.5 ? 'text-red-600' : v >= 2 ? 'text-orange-600' : 'text-slate-600'}`}>
        {v.toFixed(2)}σ
      </span>
    )},
  ];

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search districts..."
            value={localSearchTerm}
            onChange={(e) => setLocalSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
          />
        </div>
        <div className="flex gap-2">
          {['all', 'critical', 'high', 'elevated'].map((tier) => (
            <button
              key={tier}
              onClick={() => setFilterTier(tier)}
              className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                filterTier === tier
                  ? 'bg-orange-100 text-orange-700 border border-orange-300'
                  : 'bg-slate-50 text-slate-600 border border-slate-200 hover:text-slate-800'
              }`}
            >
              {tier.charAt(0).toUpperCase() + tier.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* District List */}
        <ChartCard
          title="Tier-1 Districts"
          subtitle={`${filteredDistricts.length} districts`}
          icon={MapPin}
        >
          <div className="space-y-2 max-h-[500px] overflow-y-auto">
            {filteredDistricts.map((district, index) => (
              <motion.button
                key={district.district}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedDistrict(district)}
                className={`w-full p-3 rounded-lg text-left transition-all ${
                  selectedDistrict.district === district.district
                    ? 'bg-orange-50 border border-orange-200'
                    : 'bg-slate-50 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-slate-800 font-medium">{district.district}</p>
                    <p className="text-xs text-slate-500">{district.state}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-bold ${
                      district.score >= 90 ? 'text-red-600' :
                      district.score >= 80 ? 'text-orange-600' : 'text-yellow-600'
                    }`}>
                      {district.score}
                    </p>
                    <p className="text-xs text-slate-500">Risk Score</p>
                  </div>
                </div>
                <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <span className="text-slate-500">D/B (Dem/Bio):</span>
                    <span className="text-slate-700 ml-1">{district.dbRatio}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Adult:</span>
                    <span className="text-slate-700 ml-1">{district.adultShare}%</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Surge:</span>
                    <span className="text-slate-700 ml-1">{district.septSurge}×</span>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </ChartCard>

        {/* Selected District Detail */}
        <div className="lg:col-span-2 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedDistrict.district}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* District Header */}
              <ChartCard
                title={selectedDistrict.district}
                subtitle={`${selectedDistrict.state} • Rank #${selectedDistrict.rank}`}
                icon={AlertTriangle}
                alert={selectedDistrict.score >= 90}
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-center">
                    <p className={`text-3xl font-bold ${
                      selectedDistrict.score >= 90 ? 'text-red-600' : 'text-orange-600'
                    }`}>
                      {selectedDistrict.score}
                    </p>
                    <p className="text-xs text-slate-500">Risk Score</p>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-center">
                    <p className={`text-3xl font-bold ${
                      selectedDistrict.dbRatio >= 2 ? 'text-red-600' : 'text-orange-600'
                    }`}>
                      {selectedDistrict.dbRatio}
                    </p>
                    <p className="text-xs text-slate-500">D/B Ratio (Dem/Bio)</p>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-center">
                    <p className={`text-3xl font-bold ${
                      selectedDistrict.adultShare >= 10 ? 'text-red-600' : 'text-orange-600'
                    }`}>
                      {selectedDistrict.adultShare}%
                    </p>
                    <p className="text-xs text-slate-500">Adult Enrolment</p>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-center">
                    <p className={`text-3xl font-bold ${
                      selectedDistrict.septSurge >= 3.5 ? 'text-red-600' : 'text-orange-600'
                    }`}>
                      {selectedDistrict.septSurge}×
                    </p>
                    <p className="text-xs text-slate-500">Sept Surge</p>
                  </div>
                </div>

                {/* District Risk Profile Radar */}
                <RadarChartComponent
                  data={getRadarData(selectedDistrict)}
                  angleKey="metric"
                  dataKeys={[
                    { dataKey: 'value', name: selectedDistrict.district, color: '#f97316' },
                  ]}
                  height={280}
                />
              </ChartCard>

              {/* District Monthly Trend */}
              <ChartCard
                title={`${selectedDistrict.district} Monthly Activity`}
                subtitle="12-month transaction pattern"
                icon={TrendingUp}
                className="mt-6"
              >
                <TimeSeriesChart
                  data={getDistrictTrend(selectedDistrict)}
                  xDataKey="month"
                  lines={[
                    { dataKey: 'demographic', name: 'Demographic', color: '#f97316' },
                    { dataKey: 'biometric', name: 'Biometric', color: '#3b82f6' },
                    { dataKey: 'enrolment', name: 'Enrolment', color: '#22c55e' },
                  ]}
                  referenceLines={[
                    { x: 'Sep', label: 'Sept Peak', color: '#ef4444' },
                  ]}
                  height={300}
                />
              </ChartCard>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Top 15 Demographic Updates */}
      <ChartCard
        title="Top 15 Districts by Demographic Updates"
        subtitle="Annual demographic update volume ranking"
        icon={Users}
      >
        <DataTable
          data={top15DemographicDistricts}
          columns={demographicColumns}
          maxHeight="400px"
          highlightRows={[0, 1, 2, 3, 4]}
        />
      </ChartCard>

      {/* Gender Skew Analysis */}
      <ChartCard
        title="Gender Skew in Adult Updates"
        subtitle="Male:Female ratio analysis"
        icon={Users}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {genderSkew.map((region, index) => (
            <motion.div
              key={region.region}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg ${
                region.region === 'National Average' 
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-red-50 border border-red-200'
              }`}
            >
              <h4 className="text-slate-800 font-medium mb-3">{region.region}</h4>
              <div className="flex items-center gap-4 mb-3">
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-blue-400">Male</span>
                    <span className="text-slate-700">{region.maleRatio}%</span>
                  </div>
                  <ProgressBar value={region.maleRatio} color="blue" size="sm" showValue={false} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-pink-400">Female</span>
                    <span className="text-slate-700">{region.femaleRatio}%</span>
                  </div>
                  <ProgressBar value={region.femaleRatio} color="purple" size="sm" showValue={false} />
                </div>
              </div>
              <div className="text-center pt-2 border-t border-slate-200">
                <p className={`text-lg font-bold ${
                  region.region === 'National Average' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {region.ratio}
                </p>
                <p className="text-xs text-slate-500">Male:Female Ratio</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
          <p className="text-sm text-slate-700">
            <span className="text-orange-600 font-medium">Interpretation:</span> Male-skewed adult updates 
            (1.64-1.87:1) in border districts indicate <span className="text-red-600">male-dominated labor migration</span> - 
            consistent with undocumented workers seeking to regularize residency through address changes.
          </p>
        </div>
      </ChartCard>
    </div>
  );
};

export default DistrictDeepDive;
