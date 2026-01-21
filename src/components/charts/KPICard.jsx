import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const KPICard = ({
  title,
  value,
  subtitle,
  change,
  changeType = 'neutral',
  icon: Icon,
  color = 'blue',
  format = 'number'
}) => {
  const colorClasses = {
    blue: 'from-blue-50 to-blue-100/50 border-blue-200',
    orange: 'from-orange-50 to-orange-100/50 border-orange-200',
    red: 'from-red-50 to-red-100/50 border-red-200',
    green: 'from-green-50 to-green-100/50 border-green-200',
    purple: 'from-purple-50 to-purple-100/50 border-purple-200',
    yellow: 'from-yellow-50 to-yellow-100/50 border-yellow-200',
  };

  const iconColorClasses = {
    blue: 'text-blue-600 bg-blue-100',
    orange: 'text-orange-600 bg-orange-100',
    red: 'text-red-600 bg-red-100',
    green: 'text-green-600 bg-green-100',
    purple: 'text-purple-600 bg-purple-100',
    yellow: 'text-yellow-600 bg-yellow-100',
  };

  const formatValue = (val) => {
    if (format === 'currency') {
      return `₹${val.toLocaleString()} Cr`;
    }
    if (format === 'percentage') {
      return `${val}%`;
    }
    if (format === 'multiplier') {
      return `${val}×`;
    }
    if (typeof val === 'number') {
      return val.toLocaleString();
    }
    return val;
  };

  const TrendIcon = changeType === 'increase' ? TrendingUp : changeType === 'decrease' ? TrendingDown : Minus;
  const trendColor = changeType === 'increase' ? 'text-red-600' : changeType === 'decrease' ? 'text-green-600' : 'text-slate-500';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${colorClasses[color]} border p-5 shadow-sm`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-slate-600 font-medium">{title}</p>
          <p className="text-3xl font-bold text-slate-800 mt-2">{formatValue(value)}</p>
          {subtitle && (
            <p className="text-xs text-slate-500 mt-1">{subtitle}</p>
          )}
          {change && (
            <div className={`flex items-center gap-1 mt-2 ${trendColor}`}>
              <TrendIcon className="w-4 h-4" />
              <span className="text-sm font-medium">{change}</span>
            </div>
          )}
        </div>
        {Icon && (
          <div className={`p-3 rounded-lg ${iconColorClasses[color]}`}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>
      <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/5 rounded-full blur-2xl" />
    </motion.div>
  );
};

export default KPICard;
