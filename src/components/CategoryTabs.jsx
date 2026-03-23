import React from 'react';
import { motion } from 'framer-motion';
import { CATEGORIES } from '../data/mockData';
import { Compass, Calendar, Tent, Landmark } from 'lucide-react';

const icons = {
  trips: Compass,
  events: Calendar,
  camping: Tent,
  heritage: Landmark,
};

const CategoryTabs = ({ activeCategory, onCategoryChange }) => {
  return (
    <div className="flex items-center gap-4 overflow-x-auto no-scrollbar py-2 px-1">
      {CATEGORIES.map((cat) => {
        const Icon = icons[cat.id] || Compass;
        const isActive = activeCategory === cat.id;

        return (
          <button
            key={cat.id}
            onClick={() => onCategoryChange?.(cat.id)}
            className={`relative flex items-center gap-2.5 px-6 h-12 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all duration-300 shrink-0 border ${
              isActive
                ? 'text-white border-transparent shadow-lg shadow-teal-500/20'
                : 'bg-white dark:bg-slate-800/40 text-slate-400 dark:text-slate-500 border-slate-100 dark:border-white/5 backdrop-blur-md hover:text-teal-500 transition-colors'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="activeCategory"
                className="absolute inset-0 gradient-teal rounded-2xl -z-10"
                transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
              />
            )}
            <Icon size={14} strokeWidth={2.5} className={isActive ? 'text-white' : 'text-slate-400'} />
            {cat.name}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryTabs;

