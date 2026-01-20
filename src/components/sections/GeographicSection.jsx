import { motion } from 'framer-motion';
import { MapPin, Globe, Navigation, TrendingUp } from 'lucide-react';
import ChartCard from '../charts/ChartCard';
import GroupedBarChart from '../charts/GroupedBarChart';
import HorizontalBarChart from '../charts/HorizontalBarChart';
import ComboChart from '../charts/ComboChart';
import DataTable from '../ui/DataTable';
import ProgressBar from '../ui/ProgressBar';
import {
  borderMultiplier,
  nepalCorridor,
  top20Districts,
  regionalComparison,
  urbanRuralComparison,
  migrationIndicators,
} from '../../data/dashboardData';

const GeographicSection = () => {
  const borderColumns = [
    { header: 'District', accessor: 'district', render: (v) => <span className="text-slate-800 font-medium">{v}</span> },
    { header: 'Pop (M)', accessor: 'population', render: (v) => <span className="text-slate-600">{v}M</span> },
    { header: 'Activity/1K', accessor: 'activityPer1k', render: (v) => (
      <span className={`font-mono ${v >= 25 ? 'text-red-600' : v >= 15 ? 'text-orange-600' : 'text-green-600'}`}>
        {v.toFixed(1)}
      </span>
    )},
    { header: 'Multiplier', accessor: 'multiplier', render: (v) => (
      <div className="flex items-center gap-2">
        <ProgressBar value={v * 40} max={100} color="auto" size="sm" showValue={false} />
        <span className={`font-bold ${v >= 2 ? 'text-red-600' : v >= 1.5 ? 'text-orange-600' : 'text-slate-500'}`}>
          {v.toFixed(2)}×
        </span>
      </div>
    )},
    { header: 'Border', accessor: 'border', render: (v) => (
      <span className={`px-2 py-0.5 rounded-full text-xs ${
        v === 'Bangladesh' ? 'bg-red-500/20 text-red-400' : 
        v === 'Nepal' ? 'bg-orange-500/20 text-orange-400' : 
        'bg-slate-500/20 text-slate-400'
      }`}>
        {v}
      </span>
    )},
  ];

  const nepalColumns = [
    { header: 'District', accessor: 'district', render: (v, row) => (
      <div>
        <span className="text-slate-800 font-medium">{v}</span>
        <span className="text-slate-500 text-xs ml-2">({row.state})</span>
      </div>
    )},
    { header: 'Border Distance', accessor: 'distanceFromBorder', render: (v) => (
      <span className={`text-xs px-2 py-0.5 rounded ${
        v === 'Direct' ? 'bg-red-500/20 text-red-400' : 
        v === 'Interior' ? 'bg-green-500/20 text-green-400' : 
        'bg-orange-500/20 text-orange-400'
      }`}>
        {v}
      </span>
    )},
    { header: 'Activity/1K', accessor: 'activityPer1k', render: (v) => (
      <span className={`font-mono ${v >= 20 ? 'text-red-600' : v >= 15 ? 'text-orange-600' : 'text-green-600'}`}>
        {v.toFixed(1)}
      </span>
    )},
    { header: 'Multiplier', accessor: 'multiplier', render: (v) => (
      <span className={`font-bold ${v >= 1.5 ? 'text-red-600' : v >= 1.2 ? 'text-orange-600' : 'text-slate-500'}`}>
        {v.toFixed(2)}×
      </span>
    )},
  ];

  // Prepare data for charts
  const migrationChartData = migrationIndicators.map(d => ({
    ...d,
    color: d.risk === 'High' ? '#ef4444' : d.risk === 'Medium' ? '#f97316' : '#22c55e'
  }));

  return (
    <div className="space-y-6">
      {/* Border Multiplier Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-5 rounded-xl bg-gradient-to-br from-red-50 to-red-100/50 border border-red-200 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <Globe className="w-5 h-5 text-red-600" />
            </div>
            <span className="text-slate-600 text-sm">Bangladesh Border</span>
          </div>
          <p className="text-4xl font-bold text-slate-800">2.4×</p>
          <p className="text-sm text-slate-500 mt-1">Activity multiplier vs inland</p>
          <div className="mt-3 pt-3 border-t border-red-200">
            <p className="text-xs text-red-600">West Bengal districts show highest deviation</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="p-5 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100/50 border border-orange-200 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Navigation className="w-5 h-5 text-orange-600" />
            </div>
            <span className="text-slate-600 text-sm">Nepal Corridor</span>
          </div>
          <p className="text-4xl font-bold text-slate-800">1.51×</p>
          <p className="text-sm text-slate-500 mt-1">Activity multiplier vs inland</p>
          <div className="mt-3 pt-3 border-t border-orange-200">
            <p className="text-xs text-orange-600">UP/Bihar Terai belt affected</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <MapPin className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-slate-600 text-sm">Interior Baseline</span>
          </div>
          <p className="text-4xl font-bold text-slate-800">1.0×</p>
          <p className="text-sm text-slate-500 mt-1">Reference baseline</p>
          <div className="mt-3 pt-3 border-t border-blue-200">
            <p className="text-xs text-blue-600">Metros: Kolkata, Lucknow, Patna</p>
          </div>
        </motion.div>
      </div>

      {/* Border Analysis Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Bangladesh Border Belt Analysis"
          subtitle="West Bengal district comparison"
          icon={Globe}
        >
          <DataTable
            data={borderMultiplier}
            columns={borderColumns}
            maxHeight="320px"
            highlightRows={[0, 3]}
          />
        </ChartCard>

        <ChartCard
          title="Nepal Corridor Analysis"
          subtitle="UP-Bihar Terai belt districts"
          icon={Navigation}
        >
          <DataTable
            data={nepalCorridor}
            columns={nepalColumns}
            maxHeight="320px"
            highlightRows={[2]}
          />
        </ChartCard>
      </div>

      {/* Regional Comparison */}
      <ChartCard
        title="Regional Service Mix Comparison"
        subtitle="Service distribution by Indian region"
        icon={MapPin}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GroupedBarChart
            data={regionalComparison}
            xDataKey="region"
            bars={[
              { dataKey: 'biometric', name: 'Biometric %', color: '#3b82f6' },
              { dataKey: 'demographic', name: 'Demographic %', color: '#f97316' },
              { dataKey: 'enrolment', name: 'Enrolment %', color: '#22c55e' },
            ]}
            height={300}
          />
          <div className="space-y-3">
            {regionalComparison.map((region, index) => (
              <motion.div
                key={region.region}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200"
              >
                <div>
                  <p className="text-slate-800 font-medium">{region.region}</p>
                  <p className="text-xs text-slate-500">
                    Bio: {region.biometric}% | Demo: {region.demographic}% | Enrol: {region.enrolment}%
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  region.risk === 'High' ? 'bg-red-500/20 text-red-400' :
                  region.risk === 'Medium' ? 'bg-orange-500/20 text-orange-400' :
                  'bg-green-500/20 text-green-400'
                }`}>
                  {region.risk} Risk
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </ChartCard>

      {/* Urban-Rural Comparison */}
      <ChartCard
        title="Urban-Rural Activity Pattern"
        subtitle="Service mix and compliance by area type"
        icon={TrendingUp}
      >
        <ComboChart
          data={urbanRuralComparison}
          xDataKey="category"
          bars={[
            { dataKey: 'biometric', name: 'Biometric %', color: '#3b82f6' },
            { dataKey: 'demographic', name: 'Demographic %', color: '#f97316' },
          ]}
          lines={[
            { dataKey: 'compliance', name: 'Compliance %', color: '#22c55e' },
          ]}
          height={350}
        />
      </ChartCard>

      {/* Migration Flow Indicators */}
      <ChartCard
        title="State Migration Flow Indicators"
        subtitle="Net migration patterns by state"
        icon={Navigation}
      >
        <GroupedBarChart
          data={migrationChartData}
          xDataKey="state"
          bars={[
            { dataKey: 'inMigration', name: 'In-Migration Index', color: '#ef4444' },
            { dataKey: 'outMigration', name: 'Out-Migration Index', color: '#22c55e' },
          ]}
          height={300}
        />
        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
          {migrationIndicators.map((state, index) => (
            <div 
              key={index}
              className={`p-3 rounded-lg ${
                state.netFlow > 20 ? 'bg-red-500/10 border border-red-500/20' :
                state.netFlow > 0 ? 'bg-orange-500/10 border border-orange-500/20' :
                'bg-green-500/10 border border-green-500/20'
              }`}
            >
              <p className="text-slate-800 font-medium text-sm">{state.state}</p>
              <p className={`text-lg font-bold ${
                state.netFlow > 20 ? 'text-red-600' :
                state.netFlow > 0 ? 'text-orange-600' :
                'text-green-600'
              }`}>
                {state.netFlow > 0 ? '+' : ''}{state.netFlow}
              </p>
              <p className="text-xs text-slate-500">Net Flow Index</p>
            </div>
          ))}
        </div>
      </ChartCard>

      {/* Top 20 Districts */}
      <ChartCard
        title="Top 20 Districts by Total Activity"
        subtitle="Absolute transaction volume comparison"
        icon={MapPin}
      >
        <HorizontalBarChart
          data={top20Districts.map(d => ({
            name: `${d.district} (${d.state})`,
            total: d.total,
            color: d.state === 'WB' ? '#ef4444' : 
                   d.state === 'UP' || d.state === 'Bihar' ? '#f97316' : '#3b82f6'
          }))}
          dataKey="total"
          nameKey="name"
          barSize={16}
        />
      </ChartCard>
    </div>
  );
};

export default GeographicSection;
