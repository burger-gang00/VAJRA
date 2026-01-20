import { useMemo } from 'react';

const HeatmapChart = ({ data, xLabels, yLabels, valueKey = 'value', height = 350 }) => {
  const { minValue, maxValue } = useMemo(() => {
    let min = Infinity;
    let max = -Infinity;
    data.forEach(row => {
      row.forEach(cell => {
        const val = typeof cell === 'object' ? cell[valueKey] : cell;
        if (val < min) min = val;
        if (val > max) max = val;
      });
    });
    return { minValue: min, maxValue: max };
  }, [data, valueKey]);

  const getColor = (value) => {
    const normalized = (value - minValue) / (maxValue - minValue);
    if (normalized < 0.25) return '#22c55e';
    if (normalized < 0.5) return '#eab308';
    if (normalized < 0.75) return '#f97316';
    return '#ef4444';
  };

  const getOpacity = (value) => {
    const normalized = (value - minValue) / (maxValue - minValue);
    return 0.4 + normalized * 0.6;
  };

  return (
    <div className="overflow-x-auto" style={{ height }}>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="p-2 text-slate-600 text-xs font-medium"></th>
            {xLabels.map((label, i) => (
              <th key={i} className="p-2 text-slate-600 text-xs font-medium text-center">
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td className="p-2 text-slate-600 text-xs font-medium whitespace-nowrap">
                {yLabels[rowIndex]}
              </td>
              {row.map((cell, colIndex) => {
                const value = typeof cell === 'object' ? cell[valueKey] : cell;
                return (
                  <td 
                    key={colIndex}
                    className="p-1"
                  >
                    <div
                      className="w-full h-10 rounded flex items-center justify-center text-white text-xs font-medium transition-transform hover:scale-110 cursor-pointer"
                      style={{ 
                        backgroundColor: getColor(value),
                        opacity: getOpacity(value)
                      }}
                      title={`${yLabels[rowIndex]} / ${xLabels[colIndex]}: ${value}`}
                    >
                      {value.toFixed(2)}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mt-4">
        <span className="text-slate-600 text-xs">Low</span>
        <div className="flex">
          {['#22c55e', '#eab308', '#f97316', '#ef4444'].map((color, i) => (
            <div 
              key={i}
              className="w-8 h-4"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <span className="text-slate-600 text-xs">High</span>
      </div>
    </div>
  );
};

export default HeatmapChart;
