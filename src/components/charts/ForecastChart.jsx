import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-sm border border-slate-200 rounded-lg p-3 shadow-xl">
        <p className="text-slate-800 font-medium mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.stroke }}>
            {entry.name}: <span className="font-semibold">{entry.value?.toLocaleString()}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const ForecastChart = ({
  data,
  actualKey = 'actual',
  forecastKey = 'forecast',
  lowerKey = 'lower',
  upperKey = 'upper',
  xDataKey = 'month',
  showConfidenceInterval = true,
  alertKey = 'alert',
  height = 350,
}) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart
        data={data}
        margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
      >
        <defs>
          <linearGradient id="confidenceGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#f97316" stopOpacity={0.05} />
          </linearGradient>
          <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis 
          dataKey={xDataKey} 
          tick={{ fill: '#64748b', fontSize: 11 }}
          angle={-45}
          textAnchor="end"
          height={80}
        />
        <YAxis 
          tick={{ fill: '#64748b', fontSize: 12 }}
          tickFormatter={(value) => value >= 1000 ? `${(value/1000).toFixed(0)}k` : value}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend 
          verticalAlign="top"
          iconType="circle"
          formatter={(value) => <span className="text-slate-600 text-sm">{value}</span>}
        />
        
        {showConfidenceInterval && (
          <Area
            type="monotone"
            dataKey={upperKey}
            stroke="transparent"
            fill="url(#confidenceGradient)"
            name="Upper Bound"
          />
        )}
        
        {showConfidenceInterval && (
          <Area
            type="monotone"
            dataKey={lowerKey}
            stroke="transparent"
            fill="#ffffff"
            name="Lower Bound"
          />
        )}
        
        <Area
          type="monotone"
          dataKey={actualKey}
          stroke="#3b82f6"
          fill="url(#actualGradient)"
          strokeWidth={2}
          name="Actual"
          dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
        />
        
        <Area
          type="monotone"
          dataKey={forecastKey}
          stroke="#f97316"
          fill="transparent"
          strokeWidth={2}
          strokeDasharray="5 5"
          name="Forecast"
          dot={{ fill: '#f97316', strokeWidth: 2, r: 4 }}
        />
        
        {data.filter(d => d[alertKey]).map((d, i) => (
          <ReferenceLine 
            key={i}
            x={d[xDataKey]}
            stroke="#ef4444"
            strokeDasharray="3 3"
            label={{
              value: '⚠️ Alert',
              fill: '#ef4444',
              fontSize: 11,
              position: 'top'
            }}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default ForecastChart;
