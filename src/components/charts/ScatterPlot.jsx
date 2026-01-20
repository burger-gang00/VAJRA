import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ZAxis,
  Cell,
  ReferenceLine,
} from 'recharts';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white/95 backdrop-blur-sm border border-slate-200 rounded-lg p-3 shadow-xl">
        <p className="text-slate-800 font-medium mb-2">{data.name || data.district}</p>
        {Object.entries(data).map(([key, value]) => {
          if (key === 'name' || key === 'district' || key === 'color') return null;
          return (
            <p key={key} className="text-sm text-slate-600">
              {key}: <span className="text-orange-500 font-semibold">
                {typeof value === 'number' ? value.toLocaleString() : value}
              </span>
            </p>
          );
        })}
      </div>
    );
  }
  return null;
};

const ScatterPlot = ({
  data,
  xDataKey,
  yDataKey,
  zDataKey,
  xLabel,
  yLabel,
  showGrid = true,
  referenceLines = [],
  colorByValue = false,
  thresholds = { low: 33, high: 66 },
  height = 350,
}) => {
  const getColor = (value) => {
    if (!colorByValue) return '#3b82f6';
    if (value >= thresholds.high) return '#ef4444';
    if (value >= thresholds.low) return '#f97316';
    return '#22c55e';
  };

  return (
    <ResponsiveContainer width="100%" height={height}>
      <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
        {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />}
        <XAxis 
          type="number" 
          dataKey={xDataKey} 
          name={xLabel}
          tick={{ fill: '#64748b', fontSize: 12 }}
          label={{ value: xLabel, position: 'insideBottom', offset: -10, fill: '#64748b' }}
        />
        <YAxis 
          type="number" 
          dataKey={yDataKey} 
          name={yLabel}
          tick={{ fill: '#64748b', fontSize: 12 }}
          label={{ value: yLabel, angle: -90, position: 'insideLeft', fill: '#64748b' }}
        />
        {zDataKey && (
          <ZAxis type="number" dataKey={zDataKey} range={[100, 500]} />
        )}
        <Tooltip content={<CustomTooltip />} />
        <Scatter name="Districts" data={data} fill="#3b82f6">
          {data.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={entry.color || getColor(entry[yDataKey])}
            />
          ))}
        </Scatter>
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
            }}
          />
        ))}
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default ScatterPlot;
