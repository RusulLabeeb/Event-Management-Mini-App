import React from 'react';
import { Search, Map } from 'lucide-react';

const SearchBar = ({ value, onChange, placeholder = 'Explore adventures...' }) => {
  return (
    <div className="flex items-center gap-3 w-full">
      <div className="relative flex-1 group">
        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-all duration-300">
          <Search size={20} strokeWidth={2.5} />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-white dark:bg-slate-800/60 pl-16 pr-6 h-16 rounded-[1.5rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-white/5 focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500/50 transition-all font-bold text-slate-800 dark:text-slate-100 placeholder:text-slate-400 outline-none backdrop-blur-xl"
        />
      </div>
      <button className="h-16 w-16 glass dark:glass-dark text-teal-500 rounded-[1.5rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-white/50 dark:border-white/5 flex items-center justify-center hover:scale-105 active:scale-95 transition-all shrink-0">
        <Map size={22} strokeWidth={2.5} />
      </button>
    </div>
  );
};


export default SearchBar;

