import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
  ReferenceLine,
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-sm border border-slate-200 rounded-lg p-3 shadow-xl">
        <p className="text-slate-800 font-medium mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: <span className="font-semibold">{entry.value?.toLocaleString()}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const TimeSeriesChart = ({ 
  data, 
  lines = [],
  xDataKey = 'month',
  showGrid = true,
  showArea = false,
  referenceLines = [],
  height = 350,
}) => {
  const Chart = showArea ? AreaChart : LineChart;
  const DataComponent = showArea ? Area : Line;

  return (
    <ResponsiveContainer width="100%" height={height}>
      <Chart 
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
      >
        {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />}
        <XAxis 
          dataKey={xDataKey} 
          tick={{ fill: '#64748b', fontSize: 11 }}
          tickMargin={10}
          angle={-45}
          textAnchor="end"
          height={60}
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
        {lines.map((line) => (
          <DataComponent
            key={line.dataKey}
            type="monotone"
            dataKey={line.dataKey}
            name={line.name}
            stroke={line.color}
            fill={showArea ? `${line.color}20` : undefined}
            strokeWidth={2}
            dot={line.showDot !== false ? { fill: line.color, strokeWidth: 2, r: 3 } : false}
            activeDot={{ r: 5, strokeWidth: 2 }}
          />
        ))}
        {referenceLines.map((ref, index) => (
          <ReferenceLine
            key={index}
            y={ref.y}
            x={ref.x}
            stroke={ref.color || '#ef4444'}
            strokeDasharray="5 5"
            label={{
              value: ref.label,
              fill: ref.color || '#ef4444',
              fontSize: 11,
              position: 'insideTopRight'
            }}
          />
        ))}
      </Chart>
    </ResponsiveContainer>
  );
};

export default TimeSeriesChart;
