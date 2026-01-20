import { useState } from 'react';
import { motion } from 'framer-motion';

const Tabs = ({ tabs, defaultTab = 0, onChange }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleTabClick = (index) => {
    setActiveTab(index);
    onChange && onChange(index);
  };

  return (
    <div>
      <div className="flex gap-1 p-1 bg-slate-100 rounded-lg mb-4 overflow-x-auto">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => handleTabClick(index)}
            className={`relative px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap
              ${activeTab === index 
                ? 'text-orange-700' 
                : 'text-slate-500 hover:text-slate-800'
              }`}
          >
            {activeTab === index && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-white shadow-sm border border-slate-200 rounded-md"
                transition={{ type: 'spring', duration: 0.5 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              {tab.icon && <tab.icon className="w-4 h-4" />}
              {tab.label}
            </span>
          </button>
        ))}
      </div>
      <div>
        {tabs[activeTab]?.content}
      </div>
    </div>
  );
};

export default Tabs;
