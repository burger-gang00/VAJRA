import { motion } from 'framer-motion';
import { Bell, Search, User, Calendar } from 'lucide-react';

const Header = ({ title, subtitle, searchTerm, onSearchChange }) => {
  const currentDate = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200">
      <div className="flex items-center justify-between px-6 py-3 space-x-4">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-slate-800"
          >
            {title}
          </motion.h1>
          {subtitle && (
            <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
          )}
        </div>

        <div className="flex items-center gap-4">
          {/* Date */}
          <div className="hidden md:flex items-center gap-2 text-slate-500 text-sm">
            <Calendar className="w-4 h-4" />
            {currentDate}
          </div>

          {/* Search */}
          <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search districts, metrics..."
              value={searchTerm || ''}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-64 pl-10 pr-4 py-2 bg-slate-100 border border-slate-200 rounded-lg text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full pulse-critical" />
          </button>

          {/* User */}
          <div className="flex items-center gap-3 pl-4">
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium text-slate-800">UIDAI Analyst</p>
              <p className="text-xs text-slate-500">Security Division</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
