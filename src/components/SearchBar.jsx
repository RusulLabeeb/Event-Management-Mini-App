import React from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

const SearchBar = ({ value, onChange, placeholder = 'Search Destination place' }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative w-full group"
    >
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-all duration-300">
        <Search size={20} strokeWidth={2.5} />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white dark:bg-slate-800 pl-12 pr-6 py-3 rounded-full shadow-sm border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-medium text-slate-800 dark:text-slate-100 placeholder:text-slate-400 outline-none"
      />
    </motion.div>
  );
};

export default SearchBar;