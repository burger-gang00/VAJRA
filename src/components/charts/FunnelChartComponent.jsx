import {
  Funnel,
  FunnelChart,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from 'recharts';

const COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e'];

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
          <p className="text-slate-500 text-xs">{data.percentage}% of base</p>
        )}
      </div>
    );
  }
  return null;
};

const FunnelChartComponent = ({ data, height = 350 }) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <FunnelChart>
        <Tooltip content={<CustomTooltip />} />
        <Funnel
          dataKey="value"
          data={data}
          isAnimationActive
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
          ))}
          <LabelList 
            position="center" 
            fill="#fff" 
            stroke="none" 
            dataKey="name"
            fontSize={12}
            fontWeight="bold"
          />
        </Funnel>
      </FunnelChart>
    </ResponsiveContainer>
  );
};

export default FunnelChartComponent;
