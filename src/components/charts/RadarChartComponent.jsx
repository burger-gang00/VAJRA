import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-sm border border-slate-200 rounded-lg p-3 shadow-xl">
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: <span className="font-semibold">{entry.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const RadarChartComponent = ({
  data,
  dataKeys = [],
  angleKey = 'subject',
  showGrid = true,
  showLegend = true,
  height = 350,
}) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        {showGrid && <PolarGrid stroke="#e2e8f0" />}
        <PolarAngleAxis 
          dataKey={angleKey} 
          tick={{ fill: '#64748b', fontSize: 11 }}
        />
        <PolarRadiusAxis 
          angle={30} 
          domain={[0, 100]}
          tick={{ fill: '#64748b', fontSize: 10 }}
        />
        <Tooltip content={<CustomTooltip />} />
        {dataKeys.map((key) => (
          <Radar
            key={key.dataKey}
            name={key.name}
            dataKey={key.dataKey}
            stroke={key.color}
            fill={key.color}
            fillOpacity={0.3}
            strokeWidth={2}
          />
        ))}
        {showLegend && (
          <Legend 
            verticalAlign="bottom"
            iconType="circle"
            formatter={(value) => <span className="text-slate-600 text-sm">{value}</span>}
          />
        )}
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default RadarChartComponent;
