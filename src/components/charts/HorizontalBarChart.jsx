import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-sm border border-slate-200 rounded-lg p-3 shadow-xl">
        <p className="text-slate-800 font-medium mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: <span className="font-semibold">{entry.value.toLocaleString()}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const HorizontalBarChart = ({ 
  data, 
  dataKey, 
  nameKey = 'name',
  colors = ['#3b82f6', '#f97316', '#22c55e'],
  showGrid = true,
  barSize = 20,
  layout = 'vertical',
  referenceLine = null,
  stacked = false,
  multipleKeys = null,
}) => {
  const getColor = (index, value, threshold) => {
    if (threshold) {
      if (value >= threshold.critical) return '#ef4444';
      if (value >= threshold.warning) return '#f97316';
      return '#22c55e';
    }
    return colors[index % colors.length];
  };

  return (
    <ResponsiveContainer width="100%" height={Math.max(300, data.length * 40)}>
      <BarChart 
        data={data} 
        layout={layout}
        margin={{ top: 10, right: 30, left: 100, bottom: 10 }}
      >
        {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />}
        {layout === 'vertical' ? (
          <>
            <XAxis type="number" tick={{ fill: '#64748b', fontSize: 12 }} />
            <YAxis 
              type="category" 
              dataKey={nameKey} 
              tick={{ fill: '#64748b', fontSize: 12 }}
              width={90}
            />
          </>
        ) : (
          <>
            <XAxis dataKey={nameKey} tick={{ fill: '#64748b', fontSize: 12 }} />
            <YAxis tick={{ fill: '#64748b', fontSize: 12 }} />
          </>
        )}
        <Tooltip content={<CustomTooltip />} />
        {multipleKeys ? (
          <>
            <Legend 
              verticalAlign="top"
              iconType="circle"
              formatter={(value) => <span className="text-slate-600 text-sm">{value}</span>}
            />
            {multipleKeys.map((key, index) => (
              <Bar 
                key={key.dataKey}
                dataKey={key.dataKey}
                name={key.name}
                fill={key.color || colors[index]}
                stackId={stacked ? 'stack' : undefined}
                barSize={barSize}
                radius={[4, 4, 4, 4]}
              />
            ))}
          </>
        ) : (
          <Bar 
            dataKey={dataKey} 
            barSize={barSize}
            radius={[4, 4, 4, 4]}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color || getColor(index, entry[dataKey])}
              />
            ))}
          </Bar>
        )}
        {referenceLine && (
          <ReferenceLine 
            x={referenceLine.value} 
            stroke={referenceLine.color || '#ef4444'} 
            strokeDasharray="5 5"
            label={{ 
              value: referenceLine.label, 
              fill: referenceLine.color || '#ef4444',
              fontSize: 12
            }}
          />
        )}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default HorizontalBarChart;
