import { motion } from 'framer-motion';
import { TrendingUp, Calendar, AlertTriangle, Target, Activity, CheckCircle } from 'lucide-react';
import ChartCard from '../charts/ChartCard';
import ForecastChart from '../charts/ForecastChart';
import TimeSeriesChart from '../charts/TimeSeriesChart';
import GroupedBarChart from '../charts/GroupedBarChart';
import DataTable from '../ui/DataTable';
import ProgressBar from '../ui/ProgressBar';
import {
  forecastData,
  monthlyTrends,
  growthRates,
  forecastModelMetrics,
  peakInjectionWindows,
} from '../../data/dashboardData';

const ForecastSection = () => {
  // Combine historical and forecast data
  const combinedData = [
    ...monthlyTrends.slice(-6).map(d => ({
      month: d.month,
      actual: d.demographic,
      forecast: null,
      lower: null,
      upper: null,
    })),
    ...forecastData,
  ];

  // State-level forecast
  const stateForecast = [
    { state: 'West Bengal', current: 342000, forecast2026: 412000, growth: 20.5, risk: 'Critical' },
    { state: 'Bihar', current: 267000, forecast2026: 318000, growth: 19.1, risk: 'High' },
    { state: 'Uttar Pradesh', current: 312000, forecast2026: 358000, growth: 14.7, risk: 'High' },
    { state: 'Maharashtra', current: 298000, forecast2026: 321000, growth: 7.7, risk: 'Low' },
    { state: 'Gujarat', current: 143000, forecast2026: 152000, growth: 6.3, risk: 'Low' },
  ];

  const forecastColumns = [
{ header: 'State', accessor: 'state', render: (v) => <span className="text-slate-800 font-medium">{v}</span> },
    { header: 'Current', accessor: 'current', render: (v) => (
      <span className="text-slate-600">{(v/1000).toFixed(0)}K</span>
    )},
    { header: '2026 Forecast', accessor: 'forecast2026', render: (v) => (
      <span className="text-orange-600 font-medium">{(v/1000).toFixed(0)}K</span>
    )},
    { header: 'Growth', accessor: 'growth', render: (v) => (
      <span className={`font-mono ${v >= 15 ? 'text-red-600' : v >= 10 ? 'text-orange-600' : 'text-green-600'}`}>
        +{v}%
      </span>
    )},
    { header: 'Risk', accessor: 'risk', render: (v) => (
      <span className={`px-2 py-0.5 rounded-full text-xs ${
        v === 'Critical' ? 'bg-red-500/20 text-red-400' :
        v === 'High' ? 'bg-orange-500/20 text-orange-400' :
        'bg-green-500/20 text-green-400'
      }`}>
        {v}
      </span>
    )},
  ];

  return (
    <div className="space-y-6">
      {/* Forecast Alert */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-orange-50 via-red-50 to-purple-50 border border-orange-200 rounded-xl p-4 shadow-sm"
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-orange-100 rounded-lg">
            <Target className="w-6 h-6 text-orange-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-slate-800 font-semibold">September 2026 Predicted Surge</h3>
            <p className="text-slate-600 text-sm mt-1">
              Based on 24-month trend analysis, September 2026 is projected to see 
              <span className="text-red-600 font-bold"> 178,000 demographic updates</span> in border districts - 
              requiring pre-emptive verification team deployment in August.
            </p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-orange-600">178K</p>
            <p className="text-xs text-slate-500">Sept 2026 Forecast</p>
          </div>
        </div>
      </motion.div>

      {/* Main Forecast Chart */}
      <ChartCard
        title="12-Month Demographic Activity Forecast"
        subtitle="Historical + projected with confidence intervals"
        icon={TrendingUp}
      >
        <ForecastChart
          data={combinedData}
          actualKey="actual"
          forecastKey="forecast"
          lowerKey="lower"
          upperKey="upper"
          xDataKey="month"
          alertKey="alert"
          height={400}
        />
        <div className="mt-4 grid grid-cols-3 gap-4">
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-center">
            <p className="text-blue-600 text-sm">Actual Data</p>
            <p className="text-slate-500 text-xs">Jul 2025 - Dec 2025</p>
          </div>
          <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg text-center">
            <p className="text-orange-600 text-sm">Forecast</p>
            <p className="text-slate-500 text-xs">Jan 2026 - Dec 2026</p>
          </div>
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-center">
            <p className="text-red-600 text-sm">Alert Period</p>
            <p className="text-slate-500 text-xs">September 2026</p>
          </div>
        </div>
      </ChartCard>

      {/* State-Level Forecasts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="State-Level Demand Forecast"
          subtitle="2026 projected demographic activity"
          icon={Activity}
        >
          <DataTable
            data={stateForecast}
            columns={forecastColumns}
            maxHeight="280px"
            highlightRows={[0, 1]}
          />
        </ChartCard>

        <ChartCard
          title="Growth Rate Projection"
          subtitle="YoY growth trajectory"
          icon={TrendingUp}
        >
          <GroupedBarChart
            data={stateForecast}
            xDataKey="state"
            bars={[
              { 
                dataKey: 'growth', 
                name: 'Growth %', 
                color: '#f97316',
                cells: stateForecast.map(s => 
                  s.growth >= 15 ? '#ef4444' : s.growth >= 10 ? '#f97316' : '#22c55e'
                )
              },
            ]}
            referenceLines={[
              { y: 10, label: 'Alert Threshold', color: '#f97316' },
            ]}
            height={280}
          />
        </ChartCard>
      </div>

      {/* Predictive Insights */}
      <ChartCard
        title="Predictive Analysis & Recommendations"
        subtitle="Strategic forecasting insights"
        icon={Target}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-red-50 border border-red-200 rounded-lg"
          >
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <h4 className="text-slate-800 font-semibold">Red Month Alert</h4>
            </div>
            <p className="text-sm text-slate-700 mb-4">
              September 2026 is a <span className="text-red-600 font-bold">"Red Month"</span> - 
              pre-mobilize verification teams to Tier-1 districts by August 15.
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Expected Surge</span>
                <span className="text-red-600 font-bold">3.35×</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Districts at Risk</span>
                <span className="text-red-600 font-bold">12</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-4 bg-orange-50 border border-orange-200 rounded-lg"
          >
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-5 h-5 text-orange-600" />
              <h4 className="text-slate-800 font-semibold">Seasonal Windows</h4>
            </div>
            <p className="text-sm text-slate-700 mb-4">
              Three peak injection windows predicted for 2026 based on historical patterns.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                <span className="text-sm text-slate-700">Sept (3.35×) - Primary</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                <span className="text-sm text-slate-700">Mar (1.8×) - Secondary</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                <span className="text-sm text-slate-700">Nov (1.6×) - Tertiary</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-4 bg-blue-50 border border-blue-200 rounded-lg"
          >
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <h4 className="text-slate-800 font-semibold">Trend Trajectory</h4>
            </div>
            <p className="text-sm text-slate-700 mb-4">
              If unchecked, demographic update growth will continue accelerating in border regions.
            </p>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">2024 Growth</span>
                  <span className="text-orange-600">+15.3%</span>
                </div>
                <ProgressBar value={15.3} max={30} color="orange" size="sm" showValue={false} />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">2025 Growth</span>
                  <span className="text-red-600">+18.7%</span>
                </div>
                <ProgressBar value={18.7} max={30} color="red" size="sm" showValue={false} />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">2026 Projected</span>
                  <span className="text-red-600">+22.1%</span>
                </div>
                <ProgressBar value={22.1} max={30} color="red" size="sm" showValue={false} />
              </div>
            </div>
          </motion.div>
        </div>
      </ChartCard>

      {/* Model Confidence */}
      <ChartCard
        title="Forecast Model Confidence"
        subtitle={`${forecastModelMetrics?.modelType || 'SARIMA + XGBoost'} - Validated on ${forecastModelMetrics?.validationPeriod || '2024-2025'}`}
        icon={Target}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-center shadow-sm">
            <p className="text-3xl font-bold text-green-600">{forecastModelMetrics?.accuracy || 94.2}%</p>
            <p className="text-sm text-slate-600">Model Accuracy</p>
            <p className="text-xs text-slate-500">Based on {forecastModelMetrics?.validationPeriod || '2024-2025'} validation</p>
          </div>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-center shadow-sm">
            <p className="text-3xl font-bold text-blue-600">±{forecastModelMetrics?.confidenceInterval || 8.5}%</p>
            <p className="text-sm text-slate-600">Confidence Interval</p>
            <p className="text-xs text-slate-500">95% confidence level</p>
          </div>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-center shadow-sm">
            <p className="text-3xl font-bold text-orange-600">{forecastModelMetrics?.rSquare || 0.89}</p>
            <p className="text-sm text-slate-600">R² Score</p>
            <p className="text-xs text-slate-500">Goodness of fit</p>
          </div>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-center shadow-sm">
            <p className="text-3xl font-bold text-purple-600">{forecastModelMetrics?.mape || 2.3}%</p>
            <p className="text-sm text-slate-600">MAPE</p>
            <p className="text-xs text-slate-500">Mean absolute % error</p>
          </div>
        </div>
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-slate-700">
            <span className="text-blue-600 font-medium">Model Specification:</span> SARIMA(1,1,1)(1,1,1,12) with seasonal differencing for 12-month lag. 
            Residual alerts triggered when Actual &gt; Forecast + 2 × RMSE.
          </p>
        </div>
      </ChartCard>

      {/* Peak Injection Windows */}
      {peakInjectionWindows && (
        <ChartCard
          title="Predicted Peak Injection Windows"
          subtitle="Based on historical pattern analysis"
          icon={Calendar}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {peakInjectionWindows.map((window, index) => (
              <motion.div
                key={window.month}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-lg border ${
                  index === 0 ? 'bg-red-50 border-red-200' :
                  index === 1 ? 'bg-orange-50 border-orange-200' :
                  'bg-yellow-50 border-yellow-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-slate-800 font-semibold">{window.month}</h4>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    index === 0 ? 'bg-red-200 text-red-700' :
                    index === 1 ? 'bg-orange-200 text-orange-700' :
                    'bg-yellow-200 text-yellow-700'
                  }`}>
                    {window.priority}
                  </span>
                </div>
                <p className={`text-2xl font-bold mb-2 ${
                  index === 0 ? 'text-red-600' : index === 1 ? 'text-orange-600' : 'text-yellow-600'
                }`}>
                  {window.multiplier}× surge
                </p>
                <p className="text-sm text-slate-600">{window.reason}</p>
              </motion.div>
            ))}
          </div>
        </ChartCard>
      )}
    </div>
  );
};

export default ForecastSection;
