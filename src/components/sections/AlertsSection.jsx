import { motion } from 'framer-motion';
import { AlertTriangle, Shield, Bell, CheckCircle, Clock, MapPin, TrendingUp, IndianRupee, Layers } from 'lucide-react';
import ChartCard from '../charts/ChartCard';
import DataTable from '../ui/DataTable';
import RiskBadge from '../ui/RiskBadge';
import ProgressBar from '../ui/ProgressBar';
import {
  tier1Districts,
  septemberSurge,
  fiscalImpact,
  riskCascade,
  subsidyLeakage,
  gvpProtocolLayers,
  implementationRoadmap,
  roiAnalysis,
} from '../../data/dashboardData';

const AlertsSection = () => {
  const criticalAlerts = [
    {
      id: 1,
      type: 'critical',
      title: 'Murshidabad D/B Ratio Breach (Demographic-to-Biometric)',
      description: 'D/B ratio (Demographic-to-Biometric) at 3.17 - highest nationally. Adult demographic updates 3.15σ above mean.',
      district: 'Murshidabad, WB',
      timestamp: '2 hours ago',
      action: 'Deploy GVP-2.0 hardening',
    },
    {
      id: 2,
      type: 'critical',
      title: 'September Surge Pattern Detected',
      description: '5 border districts showing 3.5×+ activity spike. Pattern matches 2024 injection signature.',
      district: 'Multiple Districts',
      timestamp: '4 hours ago',
      action: 'Pre-mobilize verification teams',
    },
    {
      id: 3,
      type: 'high',
      title: 'Bahraich Adult Enrolment Anomaly',
      description: 'Adult enrolment share at 12.3% - 4× national average. New identity creation accelerating.',
      district: 'Bahraich, UP',
      timestamp: '6 hours ago',
      action: 'Enhanced document scrutiny',
    },
    {
      id: 4,
      type: 'high',
      title: 'Scale Penalty Alert - Thane',
      description: 'Compliance dropped to 67% with 380K monthly volume. Override rate at 33%.',
      district: 'Thane, MH',
      timestamp: '8 hours ago',
      action: 'Reduce throughput SLA',
    },
    {
      id: 5,
      type: 'medium',
      title: 'Nepal Corridor Activity Increase',
      description: 'Pashchim Champaran showing 24.9/1K intensity - direct border district.',
      district: 'Pashchim Champaran, Bihar',
      timestamp: '12 hours ago',
      action: 'Increase spot-checks',
    },
  ];

  const recommendedActions = [
    {
      priority: 1,
      action: 'Deploy GVP-2.0 Biometric Hardening',
      districts: 'All Tier-1 Districts',
      timeline: 'Immediate (0-30 days)',
      impact: 'Reduces injection success rate by 85%',
      status: 'pending',
    },
    {
      priority: 2,
      action: 'Pre-mobilize Verification Teams',
      districts: 'Border Districts',
      timeline: 'By August 15, 2026',
      impact: 'Prevents September surge exploitation',
      status: 'in-progress',
    },
    {
      priority: 3,
      action: 'Reduce Throughput SLAs',
      districts: 'Tier-3 Urban Laundromats',
      timeline: '30-60 days',
      impact: 'Improves compliance by 15-20%',
      status: 'pending',
    },
    {
      priority: 4,
      action: 'Implement Real-time Anomaly Detection',
      districts: 'All Districts',
      timeline: '60-90 days',
      impact: 'Early warning system activation',
      status: 'planning',
    },
    {
      priority: 5,
      action: 'Cross-reference with Intelligence Databases',
      districts: 'Tier-1 & Tier-2',
      timeline: '90-120 days',
      impact: 'Identifies existing compromised entries',
      status: 'planning',
    },
  ];

  const actionColumns = [
    { header: '#', accessor: 'priority', render: (v) => (
      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
        v === 1 ? 'bg-red-500/20 text-red-400' :
        v === 2 ? 'bg-orange-500/20 text-orange-400' :
        'bg-blue-500/20 text-blue-400'
      }`}>
        {v}
      </span>
    )},
    { header: 'Action', accessor: 'action', render: (v) => <span className="text-slate-800 font-medium">{v}</span> },
    { header: 'Scope', accessor: 'districts', className: 'text-slate-500 text-sm' },
    { header: 'Timeline', accessor: 'timeline', render: (v) => (
      <span className={`text-sm ${v.includes('Immediate') ? 'text-red-600' : 'text-slate-600'}`}>{v}</span>
    )},
    { header: 'Status', accessor: 'status', render: (v) => (
      <span className={`px-2 py-0.5 rounded-full text-xs ${
        v === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
        v === 'in-progress' ? 'bg-blue-500/20 text-blue-400' :
        'bg-slate-500/20 text-slate-400'
      }`}>
        {v.charAt(0).toUpperCase() + v.slice(1)}
      </span>
    )},
  ];

  return (
    <div className="space-y-6">
      {/* Critical Alert Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-r from-red-100 via-red-50 to-orange-50 border-2 border-red-300 rounded-xl p-6 shadow-md"
      >
        <div className="flex items-start gap-4">
          <div className="p-4 bg-red-200 rounded-xl">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold text-slate-800">NATIONAL SECURITY ALERT</h2>
              <span className="px-3 py-1 bg-red-200 text-red-700 text-sm rounded-full animate-pulse">LIVE</span>
            </div>
            <p className="text-slate-700 text-lg mb-4">
              Identity Injection threat level: <span className="text-red-600 font-bold">CRITICAL</span>. 
              38 districts compromised, 12 requiring immediate intervention.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-3 rounded-lg shadow-sm border border-slate-200">
                <p className="text-red-600 text-2xl font-bold">12</p>
                <p className="text-slate-500 text-sm">Tier-1 Critical</p>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm border border-slate-200">
                <p className="text-orange-600 text-2xl font-bold">3.35×</p>
                <p className="text-slate-500 text-sm">Sept Surge</p>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm border border-slate-200">
                <p className="text-yellow-600 text-2xl font-bold">₹7,500 Cr</p>
                <p className="text-slate-500 text-sm">Annual Leakage</p>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm border border-slate-200">
                <p className="text-purple-600 text-2xl font-bold">175K</p>
                <p className="text-slate-500 text-sm">Est. Fraud IDs</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Active Alerts */}
      <ChartCard
        title="Active Alerts"
        subtitle="Real-time threat monitoring"
        icon={Bell}
      >
        <div className="space-y-3">
          {criticalAlerts.map((alert, index) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg border ${
                alert.type === 'critical' ? 'bg-red-50 border-red-200' :
                alert.type === 'high' ? 'bg-orange-50 border-orange-200' :
                'bg-yellow-50 border-yellow-200'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <AlertTriangle className={`w-5 h-5 mt-0.5 ${
                    alert.type === 'critical' ? 'text-red-600' :
                    alert.type === 'high' ? 'text-orange-600' : 'text-yellow-600'
                  }`} />
                  <div>
                    <h4 className="text-slate-800 font-medium">{alert.title}</h4>
                    <p className="text-sm text-slate-600 mt-1">{alert.description}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="flex items-center gap-1 text-xs text-slate-500">
                        <MapPin className="w-3 h-3" />
                        {alert.district}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-slate-500">
                        <Clock className="w-3 h-3" />
                        {alert.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
                <button className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                  alert.type === 'critical' ? 'bg-red-100 text-red-700 hover:bg-red-200' :
                  alert.type === 'high' ? 'bg-orange-100 text-orange-700 hover:bg-orange-200' :
                  'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                } transition-colors`}>
                  {alert.action}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </ChartCard>

      {/* Recommended Actions */}
      <ChartCard
        title="Recommended Intervention Actions"
        subtitle="Prioritized response protocol"
        icon={Shield}
      >
        <DataTable
          data={recommendedActions}
          columns={actionColumns}
          maxHeight="350px"
          highlightRows={[0]}
        />
      </ChartCard>

      {/* Fiscal Impact Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Fiscal Leakage Breakdown"
          subtitle="Annual subsidy drain per fraudulent identity"
          icon={IndianRupee}
        >
          <div className="space-y-4">
            {subsidyLeakage.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-700">{item.benefit}</span>
                <div className="text-right">
                  <p className="text-orange-600 font-bold">₹{item.annual.toLocaleString()}</p>
                  <p className="text-xs text-slate-500">₹{item.monthly.toLocaleString()}/month</p>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
              <span className="text-slate-800 font-semibold">Total per Fraudulent ID</span>
              <p className="text-red-600 font-bold text-xl">₹{fiscalImpact.perFraudulentIdentity.toLocaleString()}</p>
            </div>
          </div>
          <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-200">
            <p className="text-sm text-slate-600">
              <span className="text-orange-600 font-medium">Conservative estimate:</span> At 30% utilization rate, 
              realistic leakage is ₹{fiscalImpact.realisticPerIdentity.toLocaleString()}/identity/year.
            </p>
          </div>
        </ChartCard>

        <ChartCard
          title="Risk Cascade Timeline"
          subtitle="Downstream security implications"
          icon={TrendingUp}
        >
          <div className="relative pl-8">
            {riskCascade.map((tier, index) => (
              <motion.div
                key={tier.tier}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="relative pb-6 last:pb-0"
              >
                {/* Timeline line */}
                {index < riskCascade.length - 1 && (
                  <div className={`absolute left-[-20px] top-6 w-0.5 h-full ${
                    index === 0 ? 'bg-gradient-to-b from-red-500 to-orange-500' :
                    index === 1 ? 'bg-gradient-to-b from-orange-500 to-yellow-500' :
                    'bg-yellow-500'
                  }`} />
                )}
                
                {/* Timeline dot */}
                <div className={`absolute left-[-26px] top-1 w-3 h-3 rounded-full ${
                  index === 0 ? 'bg-red-500' :
                  index === 1 ? 'bg-orange-500' : 'bg-yellow-500'
                }`} />
                
                <div className={`p-4 rounded-lg ${
                  index === 0 ? 'bg-red-500/10 border border-red-500/20' :
                  index === 1 ? 'bg-orange-500/10 border border-orange-500/20' :
                  'bg-yellow-500/10 border border-yellow-500/20'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-slate-800 font-semibold">{tier.tier}</h4>
                    <span className="text-xs text-slate-500">({tier.timeframe})</span>
                  </div>
                  <ul className="space-y-1">
                    {tier.risks.map((risk, i) => (
                      <li key={i} className="text-sm text-slate-700 flex items-start gap-2">
                        <span className={`w-1 h-1 rounded-full mt-2 ${
                          index === 0 ? 'bg-red-400' :
                          index === 1 ? 'bg-orange-400' : 'bg-yellow-400'
                        }`} />
                        {risk}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-50 border border-red-200 rounded-lg text-center shadow-sm"
        >
          <p className="text-4xl font-bold text-red-600">₹7,500 Cr</p>
          <p className="text-sm text-slate-600 mt-1">Annual Fiscal Leakage</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-4 bg-orange-50 border border-orange-200 rounded-lg text-center shadow-sm"
        >
          <p className="text-4xl font-bold text-orange-600">175K</p>
          <p className="text-sm text-slate-600 mt-1">Est. Fraudulent IDs</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-center shadow-sm"
        >
          <p className="text-4xl font-bold text-yellow-600">2-3%</p>
          <p className="text-sm text-slate-600 mt-1">Fraud Rate (Tier-1)</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-4 bg-purple-50 border border-purple-200 rounded-lg text-center shadow-sm"
        >
          <p className="text-4xl font-bold text-purple-600">12</p>
          <p className="text-sm text-slate-600 mt-1">Districts at Critical</p>
        </motion.div>
      </div>

      {/* GVP 2.0 Protocol Layers */}
      {gvpProtocolLayers && (
        <ChartCard
          title="GVP 2.0 Protocol Architecture"
          subtitle="Geofenced Verification Protocol - 4-Layer Defense"
          icon={Layers}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {gvpProtocolLayers.map((layer, index) => (
              <motion.div
                key={layer.layer}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-slate-50 border border-slate-200 rounded-lg"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                    L{layer.layer}
                  </span>
                  <span className="text-xs text-slate-500">{layer.status}</span>
                </div>
                <h4 className="text-slate-800 font-medium text-sm mb-2">{layer.name}</h4>
                <p className="text-xs text-slate-600 mb-2">{layer.description}</p>
                <div className="text-xs text-blue-600 font-medium">{layer.implementation}</div>
              </motion.div>
            ))}
          </div>
        </ChartCard>
      )}

      {/* Implementation Roadmap */}
      {implementationRoadmap && (
        <ChartCard
          title="Implementation Roadmap"
          subtitle="3-Phase deployment strategy"
          icon={TrendingUp}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {implementationRoadmap.map((phase, index) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15 }}
                className={`p-4 rounded-lg border ${
                  index === 0 ? 'bg-green-50 border-green-200' :
                  index === 1 ? 'bg-blue-50 border-blue-200' :
                  'bg-purple-50 border-purple-200'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    index === 0 ? 'bg-green-200 text-green-700' :
                    index === 1 ? 'bg-blue-200 text-blue-700' :
                    'bg-purple-200 text-purple-700'
                  }`}>
                    Phase {phase.phase}
                  </span>
                  <span className="text-xs text-slate-500">{phase.duration}</span>
                </div>
                <h4 className="text-slate-800 font-semibold mb-1">Deadline: {phase.deadline}</h4>
                <p className={`text-lg font-bold mb-3 ${
                  index === 0 ? 'text-green-600' : index === 1 ? 'text-blue-600' : 'text-purple-600'
                }`}>
                  {phase.budget}
                </p>
                <ul className="space-y-1">
                  {phase.deliverables.slice(0, 3).map((item, i) => (
                    <li key={i} className="text-xs text-slate-600 flex items-start gap-1">
                      <CheckCircle className="w-3 h-3 mt-0.5 text-green-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                  {phase.deliverables.length > 3 && (
                    <li className="text-xs text-slate-500">+{phase.deliverables.length - 3} more deliverables</li>
                  )}
                </ul>
              </motion.div>
            ))}
          </div>
          {roiAnalysis && (
            <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-slate-800 font-semibold">5-Year Net ROI</h4>
                  <p className="text-sm text-slate-600">Prevented leakage + reputational recovery - implementation cost</p>
                </div>
                <p className="text-2xl font-bold text-green-600">{roiAnalysis.netROI5Year}</p>
              </div>
            </div>
          )}
        </ChartCard>
      )}
    </div>
  );
};

export default AlertsSection;
