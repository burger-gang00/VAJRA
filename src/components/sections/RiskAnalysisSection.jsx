import { motion } from 'framer-motion';
import { Shield, AlertTriangle, TrendingUp, Users, Activity } from 'lucide-react';
import ChartCard from '../charts/ChartCard';
import DonutChart from '../charts/DonutChart';
import GroupedBarChart from '../charts/GroupedBarChart';
import ScatterPlot from '../charts/ScatterPlot';
import ComboChart from '../charts/ComboChart';
import DataTable from '../ui/DataTable';
import RiskBadge from '../ui/RiskBadge';
import ProgressBar from '../ui/ProgressBar';
import {
  tier1Districts,
  dbRatioAnalysis,
  scalePenalty,
  zScoreAnalysis,
  riskCascade,
  adultEnrolmentComposition,
} from '../../data/dashboardData';

const RiskAnalysisSection = () => {
  // Prepare scatter plot data
  const scatterData = tier1Districts.map(d => ({
    district: d.district,
    dbRatio: d.dbRatio,
    score: d.score,
    adultShare: d.adultShare,
    color: d.score >= 90 ? '#ef4444' : d.score >= 80 ? '#f97316' : '#eab308'
  }));

  // D/B Ratio distribution for donut
  const dbDonutData = dbRatioAnalysis.map(d => ({
    name: d.category,
    value: d.districts,
    color: d.category === 'Critical' ? '#ef4444' : 
           d.category === 'Red Flag' ? '#f97316' :
           d.category === 'Yellow Flag' ? '#eab308' : '#22c55e'
  }));

  const zScoreColumns = [
    { header: 'District', accessor: 'district', render: (v) => <span className="text-slate-800 font-medium">{v}</span> },
    { header: 'Z-Score', accessor: 'zScore', render: (v) => (
      <span className={`font-mono font-bold ${v >= 3 ? 'text-red-600' : v >= 2.5 ? 'text-orange-600' : 'text-yellow-600'}`}>
        {v.toFixed(2)}σ
      </span>
    )},
    { header: 'Metric', accessor: 'metric', className: 'text-slate-400 text-sm' },
    { header: 'Percentile', accessor: 'percentile', render: (v) => (
      <span className="text-slate-600">Top {(100 - v).toFixed(1)}%</span>
    )},
  ];

  const scalePenaltyColumns = [
    { header: 'City', accessor: 'city', render: (v, row) => (
      <div className="flex items-center gap-2">
        <span className="text-slate-800 font-medium">{v}</span>
        <RiskBadge tier={row.tier === 'Tier-1' ? 1 : 3} showScore={false} />
      </div>
    )},
    { header: 'Volume', accessor: 'volume', render: (v) => (
      <span className="text-slate-600">{(v/1000).toFixed(0)}K</span>
    )},
    { header: 'Compliance', accessor: 'compliance', render: (v) => (
      <div className="flex items-center gap-2">
        <ProgressBar value={v} showValue={false} color="auto" size="sm" />
        <span className={`font-mono ${v < 60 ? 'text-red-600' : v < 70 ? 'text-orange-600' : 'text-green-600'}`}>
          {v}%
        </span>
      </div>
    )},
    { header: 'Override', accessor: 'override', render: (v) => (
      <span className={`font-mono ${v > 40 ? 'text-red-600' : v > 30 ? 'text-orange-600' : 'text-slate-500'}`}>
        {v}%
      </span>
    )},
  ];

  return (
    <div className="space-y-6">
      {/* Risk Classification Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartCard
          title="D/B Ratio Distribution (Demographic-to-Biometric)"
          subtitle="Ratio of address changes to biometric updates by district"
          icon={Activity}
        >
          <DonutChart data={dbDonutData} />
          <div className="mt-4 grid grid-cols-2 gap-2">
            {dbRatioAnalysis.map((d, i) => (
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600">{d.range}</span>
                <span className="text-slate-700">{d.districts} districts</span>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard
          title="Risk Score vs D/B Ratio (Demographic-to-Biometric)"
          subtitle="Scatter analysis of critical districts"
          icon={Shield}
          className="lg:col-span-2"
        >
          <ScatterPlot
            data={scatterData}
            xDataKey="dbRatio"
            yDataKey="score"
            zDataKey="adultShare"
            xLabel="D/B Ratio"
            yLabel="Risk Score"
            colorByValue
            thresholds={{ low: 70, high: 85 }}
            referenceLines={[
              { y: 80, label: 'Critical Threshold', color: '#ef4444' },
              { x: 1.5, label: 'D/B Alert', color: '#f97316' },
            ]}
            height={320}
          />
        </ChartCard>
      </div>

      {/* Z-Score Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Statistical Anomaly Detection"
          subtitle="Z-Score analysis of top outliers"
          icon={TrendingUp}
        >
          <DataTable
            data={zScoreAnalysis}
            columns={zScoreColumns}
            maxHeight="300px"
          />
          <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-200">
            <p className="text-xs text-slate-600">
              <span className="text-orange-600 font-medium">Interpretation:</span> Z-Score ≥ 3.0 indicates 
              &lt;0.1% probability of occurring by chance. These districts show statistically impossible 
              patterns under normal demographic models.
            </p>
          </div>
        </ChartCard>

        <ChartCard
          title="Scale Penalty Analysis"
          subtitle="Throughput vs Compliance correlation (ρ = -0.29)"
          icon={Activity}
        >
          <DataTable
            data={scalePenalty}
            columns={scalePenaltyColumns}
            maxHeight="300px"
          />
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-xs text-slate-700">
              <span className="text-red-600 font-medium">Finding:</span> High-volume centres have 
              systematically lower compliance. Border districts show worse compliance despite lower volume.
            </p>
          </div>
        </ChartCard>
      </div>

      {/* Adult Enrolment Composition */}
      <ChartCard
        title="Adult Enrolment Anomaly"
        subtitle="Age composition in new enrolments - Expected vs Actual"
        icon={Users}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GroupedBarChart
            data={adultEnrolmentComposition}
            xDataKey="district"
            bars={[
              { dataKey: '0-5', name: '0-5 Years', color: '#22c55e' },
              { dataKey: '5-17', name: '5-17 Years', color: '#3b82f6' },
              { dataKey: '18+', name: '18+ Years', color: '#ef4444' },
            ]}
            stacked
            height={300}
          />
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <h4 className="text-slate-800 font-medium mb-3">The Saturation Paradox</h4>
              <p className="text-sm text-slate-600 mb-4">
                At 99%+ Aadhaar saturation, new adult enrolments should be &lt;3%. 
                Border districts show 9-12% adult share - statistically impossible without external injection.
              </p>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-400">National Average (18+ share)</span>
                    <span className="text-green-400 font-medium">3%</span>
                  </div>
                  <ProgressBar value={3} max={15} color="green" size="sm" showValue={false} />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-400">Murshidabad (18+ share)</span>
                    <span className="text-red-400 font-medium">9.1%</span>
                  </div>
                  <ProgressBar value={9.1} max={15} color="red" size="sm" showValue={false} />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-400">Bahraich (18+ share)</span>
                    <span className="text-red-400 font-medium">12.3%</span>
                  </div>
                  <ProgressBar value={12.3} max={15} color="red" size="sm" showValue={false} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </ChartCard>

      {/* Risk Cascade */}
      <ChartCard
        title="Strategic Risk Cascade"
        subtitle="Downstream national security implications"
        icon={AlertTriangle}
        alert
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {riskCascade.map((tier, index) => (
            <motion.div
              key={tier.tier}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              className={`p-4 rounded-lg border ${
                index === 0 ? 'bg-red-500/10 border-red-500/30' :
                index === 1 ? 'bg-orange-500/10 border-orange-500/30' :
                'bg-yellow-500/10 border-yellow-500/30'
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className={`w-5 h-5 ${
                  index === 0 ? 'text-red-600' : index === 1 ? 'text-orange-600' : 'text-yellow-600'
                }`} />
                <h4 className="text-slate-800 font-semibold">{tier.tier}</h4>
              </div>
              <p className="text-xs text-slate-500 mb-3">{tier.timeframe}</p>
              <ul className="space-y-2">
                {tier.risks.map((risk, i) => (
                  <li key={i} className="text-sm text-slate-700 flex items-start gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                      index === 0 ? 'bg-red-400' : index === 1 ? 'bg-orange-400' : 'bg-yellow-400'
                    }`} />
                    {risk}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </ChartCard>
    </div>
  );
};

export default RiskAnalysisSection;
