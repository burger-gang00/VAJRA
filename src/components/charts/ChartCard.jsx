import { motion } from 'framer-motion';

const ChartCard = ({ title, subtitle, children, className = "", icon: Icon, alert = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`chart-container p-6 ${alert ? 'border-red-500/50 pulse-critical' : ''} ${className}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            {Icon && <Icon className="w-5 h-5 text-orange-600" />}
            {title}
          </h3>
          {subtitle && (
            <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
          )}
        </div>
        {alert && (
          <span className="px-2 py-1 text-xs font-medium bg-red-500/20 text-red-400 rounded-full border border-red-500/30">
            ALERT
          </span>
        )}
      </div>
      <div className="w-full">
        {children}
      </div>
    </motion.div>
  );
};

export default ChartCard;
