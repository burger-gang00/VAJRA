import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text 
      x={x} 
      y={y} 
      fill="white" 
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central"
      className="text-base font-bold"
      style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-white/95 backdrop-blur-sm border-2 border-slate-300 rounded-xl p-4 shadow-2xl">
        <p className="text-slate-900 font-bold text-base">{data.name}</p>
        <p className="text-slate-700 text-sm mt-1">
          Value: <span className="text-orange-600 font-bold text-base">{data.value.toLocaleString()}</span>
        </p>
        <p className="text-slate-600 text-sm mt-1 font-medium">
          {((data.value / payload[0].payload.total) * 100).toFixed(1)}% of total
        </p>
      </div>
    );
  }
  return null;
};

const DonutChart = ({ data, innerRadius = 70, outerRadius = 120, showLabels = true }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const dataWithTotal = data.map(item => ({ ...item, total }));

  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Pie
          data={dataWithTotal}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={showLabels ? renderCustomizedLabel : false}
          outerRadius={outerRadius}
          innerRadius={innerRadius}
          fill="#8884d8"
          dataKey="value"
          animationBegin={0}
          animationDuration={800}
          paddingAngle={2}
          stroke="white"
          strokeWidth={2}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend 
          verticalAlign="bottom"
          iconType="circle"
          iconSize={12}
          wrapperStyle={{ paddingTop: '20px' }}
          formatter={(value) => <span className="text-slate-700 text-sm font-medium">{value}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default DonutChart;
