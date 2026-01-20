import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, AlertCircle, Info } from 'lucide-react';

const RiskBadge = ({ tier, score, showScore = true }) => {
  const configs = {
    1: {
      label: 'CRITICAL',
      color: 'bg-red-500/20 text-red-400 border-red-500/30',
      icon: AlertTriangle,
      pulse: true,
    },
    2: {
      label: 'HIGH RISK',
      color: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      icon: AlertCircle,
      pulse: false,
    },
    3: {
      label: 'MODERATE',
      color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      icon: Info,
      pulse: false,
    },
    4: {
      label: 'LOW',
      color: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      icon: Info,
      pulse: false,
    },
    5: {
      label: 'NORMAL',
      color: 'bg-green-500/20 text-green-400 border-green-500/30',
      icon: CheckCircle,
      pulse: false,
    },
  };

  const config = configs[tier] || configs[5];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${config.color} ${config.pulse ? 'pulse-critical' : ''}`}
    >
      <Icon className="w-4 h-4" />
      <span className="text-xs font-semibold">Tier-{tier}</span>
      <span className="text-xs">{config.label}</span>
      {showScore && score !== undefined && (
        <span className="text-xs font-bold ml-1">({score})</span>
      )}
    </motion.div>
  );
};

export default RiskBadge;
