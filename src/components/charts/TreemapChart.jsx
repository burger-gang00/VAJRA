import { ResponsiveContainer, Treemap, Tooltip } from 'recharts';

const COLORS = ['#3b82f6', '#f97316', '#22c55e', '#8b5cf6', '#ef4444', '#eab308', '#06b6d4', '#ec4899'];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white/95 backdrop-blur-sm border border-slate-200 rounded-lg p-3 shadow-xl">
        <p className="text-slate-800 font-medium">{data.name}</p>
        <p className="text-slate-600 text-sm">
          Value: <span className="text-orange-500 font-semibold">{data.value?.toLocaleString()}</span>
        </p>
        {data.percentage && (
          <p className="text-slate-500 text-xs">{data.percentage}%</p>
        )}
      </div>
    );
  }
  return null;
};

const CustomContent = ({ x, y, width, height, name, value, index }) => {
  if (width < 50 || height < 30) return null;
  
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={COLORS[index % COLORS.length]}
        stroke="#1e293b"
        strokeWidth={2}
        rx={4}
      />
      <text
        x={x + width / 2}
        y={y + height / 2 - 8}
        textAnchor="middle"
        fill="#fff"
        fontSize={12}
        fontWeight="bold"
      >
        {name}
      </text>
      <text
        x={x + width / 2}
        y={y + height / 2 + 10}
        textAnchor="middle"
        fill="#cbd5e1"
        fontSize={10}
      >
        {value?.toLocaleString()}
      </text>
    </g>
  );
};

const TreemapChart = ({ data, height = 350 }) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <Treemap
        data={data}
        dataKey="value"
        aspectRatio={4 / 3}
        stroke="#1e293b"
        content={<CustomContent />}
      >
        <Tooltip content={<CustomTooltip />} />
      </Treemap>
    </ResponsiveContainer>
  );
};

export default TreemapChart;
