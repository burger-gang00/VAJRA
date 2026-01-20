import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
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

const ComboChart = ({
  data,
  bars = [],
  lines = [],
  areas = [],
  xDataKey = 'name',
  showGrid = true,
  showLegend = true,
  height = 350,
  yAxisDomain,
  secondaryYAxis = false,
}) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ComposedChart
        data={data}
        margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
      >
        {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />}
        <XAxis 
          dataKey={xDataKey} 
          tick={{ fill: '#64748b', fontSize: 11 }}
          angle={-45}
          textAnchor="end"
          height={80}
        />
        <YAxis 
          yAxisId="left"
          tick={{ fill: '#64748b', fontSize: 12 }}
          tickFormatter={(value) => value >= 1000 ? `${(value/1000).toFixed(0)}k` : value}
          domain={yAxisDomain}
        />
        {secondaryYAxis && (
          <YAxis 
            yAxisId="right"
            orientation="right"
            tick={{ fill: '#64748b', fontSize: 12 }}
          />
        )}
        <Tooltip content={<CustomTooltip />} />
        {showLegend && (
          <Legend 
            verticalAlign="top"
            iconType="circle"
            formatter={(value) => <span className="text-slate-600 text-sm">{value}</span>}
          />
        )}
        {areas.map((area) => (
          <Area
            key={area.dataKey}
            type="monotone"
            dataKey={area.dataKey}
            name={area.name}
            fill={area.color}
            stroke={area.color}
            fillOpacity={0.3}
            yAxisId={area.yAxisId || 'left'}
          />
        ))}
        {bars.map((bar) => (
          <Bar
            key={bar.dataKey}
            dataKey={bar.dataKey}
            name={bar.name}
            fill={bar.color}
            barSize={bar.barSize || 20}
            radius={[4, 4, 0, 0]}
            yAxisId={bar.yAxisId || 'left'}
          />
        ))}
        {lines.map((line) => (
          <Line
            key={line.dataKey}
            type="monotone"
            dataKey={line.dataKey}
            name={line.name}
            stroke={line.color}
            strokeWidth={2}
            dot={{ fill: line.color, strokeWidth: 2, r: 3 }}
            yAxisId={line.yAxisId || 'left'}
          />
        ))}
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default ComboChart;
