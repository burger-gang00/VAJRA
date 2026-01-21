import { motion } from 'framer-motion';

const DataTable = ({
  data,
  columns,
  title,
  maxHeight = '400px',
  highlightRows = [],
  onRowClick,
}) => {
  return (
    <div className="overflow-hidden">
      {title && (
        <h4 className="text-slate-800 font-semibold mb-3">{title}</h4>
      )}
      <div className="overflow-auto" style={{ maxHeight }}>
        <table className="w-full">
          <thead className="sticky top-0 bg-slate-50 backdrop-blur-sm z-10">
            <tr>
              {columns.map((col, index) => (
                <th
                  key={index}
                  className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider border-b border-slate-200"
                  style={{ width: col.width }}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((row, rowIndex) => {
              const isHighlighted = highlightRows.includes(rowIndex);
              return (
                <motion.tr
                  key={rowIndex}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: rowIndex * 0.03 }}
                  className={`
                    ${isHighlighted ? 'bg-orange-50' : 'hover:bg-slate-50'}
                    ${onRowClick ? 'cursor-pointer' : ''}
                    transition-colors
                  `}
                  onClick={() => onRowClick && onRowClick(row, rowIndex)}
                >
                  {columns.map((col, colIndex) => (
                    <td
                      key={colIndex}
                      className="px-4 py-3 text-sm"
                    >
                      {col.render ? col.render(row[col.accessor], row, rowIndex) : (
                        <span className={col.className || 'text-slate-700'}>
                          {row[col.accessor]}
                        </span>
                      )}
                    </td>
                  ))}
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
