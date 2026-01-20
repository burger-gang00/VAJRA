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
      <div className="bg-white/95 backdrop-blur-sm border border-slate-200 rounded-lg p-3 shadow-xl min-w-[180px]">
        <p className="text-slate-800 font-medium mb-2 border-b border-slate-200 pb-2">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex justify-between items-center py-1">
            <span className="text-sm flex items-center gap-2">
              <span 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              {entry.name}
            </span>
            <span className="font-semibold text-slate-700">
              {typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const GroupedBarChart = ({
  data,
  bars = [],
  xDataKey = 'name',
  showGrid = true,
  barSize = 16,
  showLegend = true,
  layout = 'horizontal',
  stacked = false,
  referenceLines = [],
  height = 350,
}) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart 
        data={data}
        layout={layout}
        margin={{ 
          top: 10, 
          right: 30, 
          left: layout === 'vertical' ? 100 : 0, 
          bottom: 10 
        }}
      >
        {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />}
        {layout === 'vertical' ? (
          <>
            <XAxis type="number" tick={{ fill: '#64748b', fontSize: 12 }} />
            <YAxis 
              type="category" 
              dataKey={xDataKey} 
              tick={{ fill: '#64748b', fontSize: 12 }}
              width={90}
            />
          </>
        ) : (
          <>
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
          </>
        )}
        <Tooltip content={<CustomTooltip />} />
        {showLegend && (
          <Legend 
            verticalAlign="top"
            iconType="circle"
            formatter={(value) => <span className="text-slate-600 text-sm">{value}</span>}
          />
        )}
        {bars.map((bar) => (
          <Bar
            key={bar.dataKey}
            dataKey={bar.dataKey}
            name={bar.name}
            fill={bar.color}
            stackId={stacked ? 'stack' : undefined}
            barSize={barSize}
            radius={stacked ? [0, 0, 0, 0] : [4, 4, 4, 4]}
          >
            {bar.cells && data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={bar.cells[index] || bar.color} />
            ))}
          </Bar>
        ))}
        {referenceLines.map((ref, index) => (
          <ReferenceLine
            key={index}
            y={ref.y}
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
      </BarChart>
    </ResponsiveContainer>
  );
};

export default GroupedBarChart;
