import { motion } from 'framer-motion';

const ProgressBar = ({ 
  value, 
  max = 100, 
  label, 
  showValue = true,
  color = 'blue',
  size = 'md',
  animated = true,
}) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    orange: 'from-orange-500 to-orange-600',
    red: 'from-red-500 to-red-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    yellow: 'from-yellow-500 to-yellow-600',
    gradient: 'from-orange-500 via-red-500 to-purple-600',
  };

  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  const getColorByValue = () => {
    if (percentage >= 80) return 'from-red-500 to-red-600';
    if (percentage >= 60) return 'from-orange-500 to-orange-600';
    if (percentage >= 40) return 'from-yellow-500 to-yellow-600';
    return 'from-green-500 to-green-600';
  };

  return (
    <div className="w-full">
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && <span className="text-sm text-slate-600">{label}</span>}
          {showValue && (
            <span className="text-sm font-semibold text-slate-700">
              {value.toLocaleString()}{max !== 100 && ` / ${max.toLocaleString()}`}
            </span>
          )}
        </div>
      )}
      <div className={`w-full bg-slate-200 rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <motion.div
          initial={animated ? { width: 0 } : { width: `${percentage}%` }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={`h-full bg-gradient-to-r ${color === 'auto' ? getColorByValue() : colorClasses[color]} rounded-full`}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
