import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import OverviewSection from './components/sections/OverviewSection';
import RiskAnalysisSection from './components/sections/RiskAnalysisSection';
import GeographicSection from './components/sections/GeographicSection';
import TemporalSection from './components/sections/TemporalSection';
import ServiceMixSection from './components/sections/ServiceMixSection';
import DistrictDeepDive from './components/sections/DistrictDeepDive';
import ForecastSection from './components/sections/ForecastSection';
import AlertsSection from './components/sections/AlertsSection';

const sectionConfig = {
  overview: {
    title: 'Executive Overview',
    subtitle: 'PROJECT VAJRA-AADHAAR: Biometric Integrity & Sovereignty Audit',
    component: OverviewSection,
  },
  risk: {
    title: 'Risk Analysis',
    subtitle: 'Multi-factor threat assessment and D/B (Demographic-to-Biometric) ratio anomalies',
    component: RiskAnalysisSection,
  },
  geographic: {
    title: 'Geographic Analysis',
    subtitle: 'Border multipliers and regional distribution patterns',
    component: GeographicSection,
  },
  temporal: {
    title: 'Temporal Patterns',
    subtitle: 'September surge analysis and seasonal signatures',
    component: TemporalSection,
  },
  service: {
    title: 'Service Mix Analysis',
    subtitle: 'Transaction type distribution by age and geography',
    component: ServiceMixSection,
  },
  districts: {
    title: 'District Deep Dive',
    subtitle: 'Individual district profiles and risk assessments',
    component: DistrictDeepDive,
  },
  forecast: {
    title: 'Forecast & Trends',
    subtitle: 'Predictive analysis and 2026 projections',
    component: ForecastSection,
  },
  alerts: {
    title: 'Critical Alerts',
    subtitle: 'Active threats and recommended interventions',
    component: AlertsSection,
  },
};

function App() {
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [globalSearchTerm, setGlobalSearchTerm] = useState('');

  // Auto-navigate to districts section when searching
  useEffect(() => {
    if (globalSearchTerm && globalSearchTerm.length > 0 && activeSection !== 'districts') {
      setActiveSection('districts');
    }
  }, [globalSearchTerm]);

  // Clear search when manually navigating away from districts
  const handleSectionChange = (section) => {
    if (section !== 'districts' && globalSearchTerm) {
      setGlobalSearchTerm('');
    }
    setActiveSection(section);
  };

  const currentSection = sectionConfig[activeSection];
  const SectionComponent = currentSection.component;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar */}
      <Sidebar
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-[72px]' : 'ml-[260px]'}`}>
        {/* Header */}
        <Header
          title={currentSection.title}
          subtitle={currentSection.subtitle}
          searchTerm={globalSearchTerm}
          onSearchChange={setGlobalSearchTerm}
        />

        {/* Content Area */}
        <main className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <SectionComponent searchTerm={globalSearchTerm} />
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Footer */}
        <footer className="p-6 border-t border-slate-200">
          <div className="flex items-center justify-between text-sm text-slate-500">
            <div>
              <span className="font-medium text-slate-700">PROJECT VAJRA-AADHAAR</span>
              <span className="mx-2">•</span>
              <span>UIDAI Data Hackathon 2026</span>
            </div>
            <div>
              <span>Classification: </span>
              <span className="text-red-400 font-medium">RESTRICTED - National Security</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
