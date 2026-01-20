import { motion } from 'framer-motion';
import { Clock, Calendar, TrendingUp, AlertTriangle, Activity } from 'lucide-react';
import ChartCard from '../charts/ChartCard';
import TimeSeriesChart from '../charts/TimeSeriesChart';
import GroupedBarChart from '../charts/GroupedBarChart';
import ComboChart from '../charts/ComboChart';
import DataTable from '../ui/DataTable';
import ProgressBar from '../ui/ProgressBar';
import {
  monthlyTrends,
  dayOfWeekData,
  septemberSurge,
  seasonalPatterns,
  growthRates,
} from '../../data/dashboardData';

const TemporalSection = () => {
  const surgeColumns = [
    { header: 'District', accessor: 'district', render: (v) => (
      <span className={`font-medium ${v === 'National Average' ? 'text-green-600' : 'text-slate-800'}`}>{v}</span>
    )},
    { header: 'Sept Activity', accessor: 'septActivity', render: (v, row) => (
      <span className="text-slate-600">
        {row.district === 'National Average' ? `${v}% above avg` : v.toLocaleString()}
      </span>
    )},
    { header: 'Annual Avg', accessor: 'annualAvg', render: (v, row) => (
      <span className="text-slate-500">
        {row.district === 'National Average' ? 'baseline' : v.toLocaleString()}
      </span>
    )},
    { header: 'Multiplier', accessor: 'multiplier', render: (v) => (
      <div className="flex items-center gap-2">
        <ProgressBar 
          value={Math.min(v * 25, 100)} 
          max={100} 
          color={v >= 3.5 ? 'red' : v >= 2.5 ? 'orange' : 'green'} 
          size="sm" 
          showValue={false} 
        />
        <span className={`font-bold ${v >= 3.5 ? 'text-red-600' : v >= 2.5 ? 'text-orange-600' : 'text-green-600'}`}>
          {v.toFixed(2)}×
        </span>
      </div>
    )},
  ];

  const growthColumns = [
    { header: 'Category', accessor: 'category', render: (v) => <span className="text-slate-800 font-medium">{v}</span> },
    { header: '2024 YoY', accessor: 'yoy2024', render: (v) => (
      <span className={`font-mono ${v > 10 ? 'text-red-600' : v > 0 ? 'text-orange-600' : 'text-green-600'}`}>
        {v > 0 ? '+' : ''}{v}%
      </span>
    )},
    { header: '2025 YoY', accessor: 'yoy2025', render: (v) => (
      <span className={`font-mono ${v > 10 ? 'text-red-600' : v > 0 ? 'text-orange-600' : 'text-green-600'}`}>
        {v > 0 ? '+' : ''}{v}%
      </span>
    )},
    { header: 'Trend', accessor: 'trend', render: (v) => (
      <span className={`px-2 py-0.5 rounded-full text-xs ${
        v === 'Accelerating' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'
      }`}>
        {v}
      </span>
    )},
  ];

  return (
    <div className="space-y-6">
      {/* September Surge Alert */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-red-50 via-orange-50 to-yellow-50 border border-red-200 rounded-xl p-4 shadow-sm"
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-red-100 rounded-lg">
            <Calendar className="w-6 h-6 text-red-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-slate-800 font-semibold">September Surge Anomaly Detected</h3>
            <p className="text-slate-600 text-sm mt-1">
              Border districts show 3.35× average activity in September - statistically impossible without coordinated batch injection.
              Pattern consistent across 2024 and 2025.
            </p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-red-600">3.35×</p>
            <p className="text-xs text-slate-500">Peak Multiplier</p>
          </div>
        </div>
      </motion.div>

      {/* Monthly Trends with Annotations */}
      <ChartCard
        title="12-Month Transaction Timeline"
        subtitle="Jan - Dec 2025 trends with September anomaly marker"
        icon={TrendingUp}
      >
        <TimeSeriesChart
          data={monthlyTrends.slice(12, 24)}
          xDataKey="month"
          lines={[
            { dataKey: 'biometric', name: 'Biometric', color: '#3b82f6' },
            { dataKey: 'demographic', name: 'Demographic', color: '#f97316' },
            { dataKey: 'enrolment', name: 'Enrolment', color: '#22c55e' },
          ]}
          referenceLines={[
            { x: 'Sep 2025', label: 'Sept Peak', color: '#ef4444' },
          ]}
          height={400}
        />
      </ChartCard>

      {/* September Surge Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="September Surge by District"
          subtitle="Multiplier analysis vs annual average"
          icon={AlertTriangle}
          alert
        >
          <DataTable
            data={septemberSurge}
            columns={surgeColumns}
            maxHeight="320px"
            highlightRows={[0, 3]}
          />
        </ChartCard>

        <ChartCard
          title="Day of Week Distribution"
          subtitle="Transaction volume patterns"
          icon={Clock}
        >
          <GroupedBarChart
            data={dayOfWeekData}
            xDataKey="day"
            bars={[
              { dataKey: 'transactions', name: 'Transactions', color: '#3b82f6' },
            ]}
            height={280}
          />
          <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <p className="text-sm text-slate-700">
              <span className="text-orange-600 font-medium">Pattern:</span> Tuesday (+18%) and Saturday (+16%) 
              show elevated activity. Weekends have reduced supervision - potential exploitation window.
            </p>
          </div>
        </ChartCard>
      </div>

      {/* Seasonal Patterns */}
      <ChartCard
        title="Quarterly Seasonal Analysis"
        subtitle="Transaction patterns by quarter"
        icon={Calendar}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            {seasonalPatterns.map((season, index) => (
              <motion.div
                key={season.period}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-lg ${
                  season.period.includes('Jul-Sep') 
                    ? 'bg-red-50 border border-red-200' 
                    : 'bg-slate-50 border border-slate-200'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="text-slate-800 font-medium">{season.period}</h4>
                    <p className="text-xs text-slate-500">{season.characteristic}</p>
                  </div>
                  <span className={`text-2xl font-bold ${
                    season.period.includes('Jul-Sep') ? 'text-red-600' : 'text-slate-700'
                  }`}>
                    {(season.avgActivity / 1000).toFixed(0)}K
                  </span>
                </div>
                <ProgressBar 
                  value={season.avgActivity} 
                  max={100000} 
                  color={season.period.includes('Jul-Sep') ? 'red' : 'blue'}
                  size="sm"
                  showValue={false}
                />
              </motion.div>
            ))}
          </div>
          <div className="flex flex-col justify-center">
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <h4 className="text-slate-800 font-semibold mb-3">Peak Injection Windows</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-red-500 pulse-critical"></span>
                  <div>
                    <p className="text-slate-800 text-sm font-medium">September (3.35×)</p>
                    <p className="text-xs text-slate-500">School opening, administrative chaos</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-orange-500"></span>
                  <div>
                    <p className="text-slate-800 text-sm font-medium">March (1.8×)</p>
                    <p className="text-xs text-slate-500">Financial year-end, spring migration</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                  <div>
                    <p className="text-slate-800 text-sm font-medium">November (1.6×)</p>
                    <p className="text-xs text-slate-500">Post-Diwali, harvest season</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-200">
                <p className="text-xs text-slate-600">
                  <span className="text-orange-600 font-medium">Recommendation:</span> Pre-mobilize 
                  verification teams in August for Tier-1 districts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </ChartCard>

      {/* Growth Rate Analysis */}
      <ChartCard
        title="Year-over-Year Growth Analysis"
        subtitle="Service category growth trends"
        icon={Activity}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DataTable
            data={growthRates}
            columns={growthColumns}
            maxHeight="200px"
          />
          <div className="space-y-4">
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <h4 className="text-red-600 font-medium mb-2">⚠️ Accelerating Threat</h4>
              <p className="text-sm text-slate-700">
                Demographic updates growing at <span className="text-red-600 font-bold">+18.7% YoY</span> while 
                new enrolments declining (-4.3%). This inversion pattern is characteristic of 
                <span className="text-red-600 font-medium"> identity injection</span> - existing entries 
                being modified rather than new legitimate registrations.
              </p>
            </div>
            <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <h4 className="text-orange-600 font-medium mb-2">Border District Trend</h4>
              <p className="text-sm text-slate-700">
                Border district activity accelerating at <span className="text-orange-600 font-bold">+28.9% YoY</span> - 
                nearly 3× faster than national demographic update growth. Concentrated, targeted pattern.
              </p>
            </div>
          </div>
        </div>
      </ChartCard>
    </div>
  );
};

export default TemporalSection;
