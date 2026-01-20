import { motion } from 'framer-motion';
import { Activity, PieChart, BarChart3, Users } from 'lucide-react';
import ChartCard from '../charts/ChartCard';
import DonutChart from '../charts/DonutChart';
import GroupedBarChart from '../charts/GroupedBarChart';
import RadarChartComponent from '../charts/RadarChartComponent';
import TreemapChart from '../charts/TreemapChart';
import HeatmapChart from '../charts/HeatmapChart';
import {
  transactionDistribution,
  biometricByAge,
  demographicByAge,
  ageGroupComparison,
  serviceMixByState,
  enrolmentByAge,
} from '../../data/dashboardData';

const ServiceMixSection = () => {
  // Prepare radar data
  const radarData = [
    { subject: 'Biometric', 'Border Districts': 35, 'Inland Districts': 45, fullMark: 60 },
    { subject: 'Demographic', 'Border Districts': 47, 'Inland Districts': 33, fullMark: 60 },
    { subject: 'Enrolment', 'Border Districts': 21, 'Inland Districts': 22, fullMark: 60 },
    { subject: 'Adult Share', 'Border Districts': 45, 'Inland Districts': 15, fullMark: 60 },
    { subject: 'Compliance', 'Border Districts': 25, 'Inland Districts': 45, fullMark: 60 },
  ];

  // Prepare treemap data
  const treemapData = serviceMixByState.map(state => ({
    name: state.state,
    children: [
      { name: 'Biometric', value: state.biometric * 10 },
      { name: 'Demographic', value: state.demographic * 10 },
      { name: 'Enrolment', value: state.enrolment * 10 },
    ]
  }));

  const flatTreemapData = serviceMixByState.map(state => ({
    name: state.state,
    value: Math.round((state.biometric + state.demographic + state.enrolment) * 10),
  }));

  // Age-service heatmap data
  const heatmapData = [
    [20, 55, 25], // 0-5
    [25, 70, 5],  // 5-17  
    [55, 10, 35], // 18+
  ];
  const heatmapXLabels = ['Biometric %', 'Demographic %', 'Enrolment %'];
  const heatmapYLabels = ['0-5 Years', '5-17 Years', '18+ Years'];

  // Biometric by age donut
  const biometricDonut = biometricByAge.map((d, i) => ({
    name: d.ageGroup,
    value: d.count,
    color: ['#3b82f6', '#8b5cf6', '#06b6d4'][i]
  }));

  // Demographic by age donut
  const demographicDonut = demographicByAge.map((d, i) => ({
    name: d.ageGroup,
    value: d.count,
    color: ['#22c55e', '#eab308', '#f97316'][i]
  }));

  return (
    <div className="space-y-6">
      {/* Service Distribution Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartCard
          title="Overall Transaction Mix"
          subtitle="4.9M total transactions"
          icon={PieChart}
        >
          <DonutChart data={transactionDistribution} />
        </ChartCard>

        <ChartCard
          title="Biometric by Age Group"
          subtitle="Age distribution in biometric updates"
          icon={Users}
        >
          <DonutChart data={biometricDonut} innerRadius={50} outerRadius={90} />
        </ChartCard>

        <ChartCard
          title="Demographic by Age Group"
          subtitle="Age distribution in demographic updates"
          icon={Users}
        >
          <DonutChart data={demographicDonut} innerRadius={50} outerRadius={90} />
        </ChartCard>
      </div>

      {/* Age Group Comparison */}
      <ChartCard
        title="Service Mix by Age Group"
        subtitle="Comparative analysis across all services"
        icon={BarChart3}
      >
        <GroupedBarChart
          data={ageGroupComparison}
          xDataKey="service"
          bars={[
            { dataKey: '0-5', name: '0-5 Years', color: '#22c55e' },
            { dataKey: '5-17', name: '5-17 Years', color: '#3b82f6' },
            { dataKey: '18+', name: '18+ Years', color: '#f97316' },
          ]}
          height={320}
        />
      </ChartCard>

      {/* Border vs Inland Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Border vs Inland Profile"
          subtitle="Multi-dimensional comparison"
          icon={Activity}
        >
          <RadarChartComponent
            data={radarData}
            angleKey="subject"
            dataKeys={[
              { dataKey: 'Border Districts', name: 'Border Districts', color: '#ef4444' },
              { dataKey: 'Inland Districts', name: 'Inland Districts', color: '#22c55e' },
            ]}
            height={350}
          />
        </ChartCard>

        <ChartCard
          title="State Service Mix Treemap"
          subtitle="Proportional representation by state"
          icon={PieChart}
        >
          <TreemapChart data={flatTreemapData} height={350} />
        </ChartCard>
      </div>

      {/* State-wise Service Mix */}
      <ChartCard
        title="Service Mix by State"
        subtitle="Stacked comparison across major states"
        icon={BarChart3}
      >
        <GroupedBarChart
          data={serviceMixByState}
          xDataKey="state"
          bars={[
            { dataKey: 'biometric', name: 'Biometric %', color: '#3b82f6' },
            { dataKey: 'demographic', name: 'Demographic %', color: '#f97316' },
            { dataKey: 'enrolment', name: 'Enrolment %', color: '#22c55e' },
          ]}
          stacked
          height={350}
        />
      </ChartCard>

      {/* Enrolment Gap Analysis */}
      <ChartCard
        title="Enrolment Composition Gap Analysis"
        subtitle="Expected vs Actual age distribution in new enrolments"
        icon={Users}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GroupedBarChart
            data={enrolmentByAge}
            xDataKey="ageGroup"
            bars={[
              { dataKey: 'expected', name: 'Expected %', color: '#22c55e' },
              { dataKey: 'actual', name: 'Actual %', color: '#ef4444' },
            ]}
            height={280}
          />
          <div className="space-y-4">
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <h4 className="text-red-600 font-medium mb-2">Critical Finding: Adult Surplus</h4>
              <p className="text-sm text-slate-700 mb-3">
                In border Tier-1 districts, adult (18+) enrolments are <span className="text-red-600 font-bold">3× higher</span> than 
                expected in a saturated system. This 6% gap represents potential identity injection.
              </p>
              <div className="flex justify-between items-center p-2 bg-slate-100 rounded">
                <span className="text-slate-600 text-sm">Expected Adult Share</span>
                <span className="text-green-600 font-bold">3%</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-slate-100 rounded mt-2">
                <span className="text-slate-600 text-sm">Actual Adult Share (Border)</span>
                <span className="text-red-600 font-bold">9-12%</span>
              </div>
            </div>
            <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <h4 className="text-orange-600 font-medium mb-2">Child Deficit Pattern</h4>
              <p className="text-sm text-slate-700">
                0-5 age group shows <span className="text-orange-600 font-bold">17% deficit</span> in border districts 
                (74% vs 91% expected). This displacement is absorbed by anomalous adult enrolments.
              </p>
            </div>
          </div>
        </div>
      </ChartCard>

      {/* Age-Service Heatmap */}
      <ChartCard
        title="Age Group × Service Type Matrix"
        subtitle="Intensity distribution heatmap (normalized)"
        icon={Activity}
      >
        <HeatmapChart
          data={heatmapData}
          xLabels={heatmapXLabels}
          yLabels={heatmapYLabels}
          height={200}
        />
        <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-200">
          <p className="text-sm text-slate-600">
            <span className="text-orange-600 font-medium">Interpretation:</span> High adult demographic % 
            combined with low adult biometric % indicates <span className="text-red-600">address manipulation</span> - 
            adults are changing addresses at rates far exceeding normal migration patterns.
          </p>
        </div>
      </ChartCard>
    </div>
  );
};

export default ServiceMixSection;
