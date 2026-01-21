import { motion } from 'framer-motion';
import {
  Database,
  MapPin,
  AlertTriangle,
  TrendingUp,
  IndianRupee,
  Users,
  Activity,
  Shield
} from 'lucide-react';
import KPICard from '../charts/KPICard';
import ChartCard from '../charts/ChartCard';
import DonutChart from '../charts/DonutChart';
import GroupedBarChart from '../charts/GroupedBarChart';
import TimeSeriesChart from '../charts/TimeSeriesChart';
import DataTable from '../ui/DataTable';
import RiskBadge from '../ui/RiskBadge';
import ProgressBar from '../ui/ProgressBar';
import {
  keyMetrics,
  transactionDistribution,
  top10States,
  monthlyTrends,
  tier1Districts,
  riskTierDistribution,
} from '../../data/dashboardData';

const OverviewSection = () => {
  const districtColumns = [
    {
      header: 'Rank',
      accessor: 'rank',
      render: (val) => <span className="text-slate-500 font-mono">#{val}</span>
    },
    {
      header: 'District',
      accessor: 'district',
      render: (val, row) => (
        <div>
          <span className="text-slate-800 font-medium">{val}</span>
          <span className="text-slate-500 text-xs ml-2">({row.state})</span>
        </div>
      )
    },
    {
      header: 'Risk Score',
      accessor: 'score',
      render: (val) => (
        <div className="flex items-center gap-2">
          <ProgressBar value={val} max={100} showValue={false} color="auto" size="sm" />
          <span className={`font-bold ${val >= 80 ? 'text-red-400' : val >= 60 ? 'text-orange-400' : 'text-yellow-400'}`}>
            {val}
          </span>
        </div>
      )
    },
    {
      header: 'D/B Ratio (Demographic-to-Biometric)',
      accessor: 'dbRatio',
      render: (val) => (
        <span className={`font-mono ${val >= 2 ? 'text-red-600' : val >= 1.5 ? 'text-orange-600' : 'text-slate-600'}`}>
          {val.toFixed(2)}
        </span>
      )
    },
    {
      header: 'Adult %',
      accessor: 'adultShare',
      render: (val) => (
        <span className={`font-mono ${val >= 10 ? 'text-red-600' : val >= 7 ? 'text-orange-600' : 'text-slate-600'}`}>
          {val}%
        </span>
      )
    },
  ];

  return (
    <div className="space-y-6">
      {/* Alert Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-red-50 via-orange-50 to-yellow-50 border border-red-200 rounded-xl p-4 shadow-sm"
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-red-100 rounded-lg">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-slate-800 font-semibold">Identity Injection Alert</h3>
            <p className="text-slate-600 text-sm mt-1">
              38 anomalous districts identified with coordinated batch injection signatures.
              12 Tier-1 critical districts require immediate intervention.
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-red-600">₹7,500 Cr</p>
            <p className="text-xs text-slate-500">Est. Annual Fiscal Leakage</p>
          </div>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <KPICard
          title="Total Transactions Analyzed"
          value={keyMetrics.totalTransactions}
          subtitle="Jan 2025 - Jan 2026"
          icon={Database}
          color="blue"
        />
        <KPICard
          title="Tier-1 Critical Districts"
          value={keyMetrics.tier1CriticalDistricts}
          subtitle="Immediate intervention required"
          change="+3 vs last quarter"
          changeType="increase"
          icon={Shield}
          color="red"
        />
        <KPICard
          title="September Surge"
          value={keyMetrics.septemberSurgeMultiplier}
          format="multiplier"
          subtitle="Above monthly average"
          icon={TrendingUp}
          color="orange"
        />
      </div>

      {/* Second Row KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Bangladesh Border Multiplier"
          value={keyMetrics.bangladeshBorderMultiplier}
          format="multiplier"
          subtitle="vs inland districts"
          icon={Activity}
          color="orange"
        />
        <KPICard
          title="Nepal Border Multiplier"
          value={keyMetrics.nepalBorderMultiplier}
          format="multiplier"
          subtitle="vs inland districts"
          icon={Activity}
          color="yellow"
        />
        <KPICard
          title="Critical D/B Threshold (Demographic-to-Biometric)"
          value={keyMetrics.criticalDbRatio}
          subtitle="Ratio inversion indicator"
          icon={AlertTriangle}
          color="red"
        />
        <KPICard
          title="Scale Penalty Correlation"
          value={keyMetrics.scalePenaltyCorrelation}
          subtitle="Throughput vs Compliance"
          icon={TrendingUp}
          color="blue"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartCard
          title="Transaction Distribution"
          subtitle="4.9M total transactions"
          icon={Database}
        >
          <DonutChart data={transactionDistribution} />
        </ChartCard>

        <ChartCard
          title="Risk Tier Distribution"
          subtitle="765 districts classified"
          icon={Shield}
          className="lg:col-span-2"
        >
          <div className="grid grid-cols-5 gap-4">
            {riskTierDistribution.map((tier, index) => (
              <motion.div
                key={tier.tier}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-4 rounded-lg"
                style={{ backgroundColor: `${tier.color}15`, borderColor: `${tier.color}30`, borderWidth: 1 }}
              >
                <p className="text-3xl font-bold" style={{ color: tier.color }}>{tier.count}</p>
                <p className="text-xs text-slate-400 mt-1">{tier.tier.replace('Tier-', 'T')}</p>
                <p className="text-xs text-slate-500">{tier.scoreRange}</p>
              </motion.div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Monthly Trends */}
      <ChartCard
        title="Monthly Transaction Trends"
        subtitle="Jan 2025 - Dec 2025 analysis showing September anomaly peak"
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
            { x: 'Sep 2025', label: 'Sept Surge', color: '#ef4444' },
          ]}
          height={350}
        />
      </ChartCard>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top States */}
        <ChartCard
          title="Top 10 States by Activity"
          subtitle="Transaction volume distribution"
          icon={MapPin}
        >
          <GroupedBarChart
            data={top10States.slice(0, 8)}
            xDataKey="state"
            bars={[
              { dataKey: 'biometric', name: 'Biometric', color: '#3b82f6' },
              { dataKey: 'demographic', name: 'Demographic', color: '#f97316' },
              { dataKey: 'enrolment', name: 'Enrolment', color: '#22c55e' },
            ]}
            height={350}
          />
        </ChartCard>

        {/* Critical Districts Table */}
        <ChartCard
          title="Tier-1 Critical Districts"
          subtitle="Top 12 requiring immediate intervention"
          icon={AlertTriangle}
          alert
        >
          <DataTable
            data={tier1Districts}
            columns={districtColumns}
            maxHeight="320px"
            highlightRows={[0, 1, 2]}
          />
        </ChartCard>
      </div>
    </div>
  );
};

export default OverviewSection;
