import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, MapPin, Search, ChevronRight } from 'lucide-react';
import { CATEGORIES, EVENTS } from '../data/mockData';
import CategoryTabs from '../components/CategoryTabs';
import EventCard from '../components/EventCard';
import SearchBar from '../components/SearchBar';

const HomePage = () => {
  const [activeCategory, setActiveCategory] = useState('heritage');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = EVENTS.filter(event => {
    const matchesCategory = activeCategory === 'all' || event.category === activeCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          event.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featured = EVENTS.filter(e => e.rating >= 4.5);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0F172A] pb-32 overflow-x-hidden">
      {/* Premium Header */}
      <header className="px-6 pt-10 pb-6 flex items-center justify-between sticky top-0 bg-slate-50/80 dark:bg-[#0F172A]/80 backdrop-blur-3xl z-50">
        <div className="flex flex-col">
          <div className="flex items-center gap-1 mb-0.5">
             <div className="w-1 h-1 bg-teal-500 animate-pulse rounded-full" />
             <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">Live Exploring</span>
          </div>
          <div className="flex items-center gap-1 cursor-pointer group">
            <span className="text-xl font-black text-slate-900 dark:text-white tracking-tighter">Baghdad, Iraq</span>
            <ChevronRight size={14} className="text-teal-500" />
          </div>
        </div>
        <button className="h-10 w-10 glass dark:glass-dark rounded-xl flex items-center justify-center border border-white/50 dark:border-white/5 shadow-sm active:scale-95">
          <Bell size={18} className="text-slate-800 dark:text-white" />
        </button>
      </header>

      <main className="px-6 space-y-8">
        {/* Title & Search */}
        <section className="animate-slideUp flex flex-col gap-6">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white leading-tight tracking-tighter">
            Find your next <br />
            <span className="text-teal-500">adventure.</span>
          </h1>
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </section>

        {/* Categories Section */}
        <section className="animate-slideUp stagger-1">
          <CategoryTabs activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
        </section>

        {/* Heritage Section (Horizontal) */}
        <section className="space-y-4 animate-slideUp stagger-2">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tighter">Iraqi Heritage</h2>
            <button className="text-teal-600 dark:text-teal-400 font-extrabold text-[10px] uppercase tracking-widest">See All</button>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar -mx-6 px-6 pb-2">
            <AnimatePresence mode="popLayout">
              {filteredEvents.map((event) => (
                <motion.div
                  key={event.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <EventCard event={event} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* Popular Section (Vertical List) */}
        <section className="space-y-4 animate-slideUp stagger-3">
           <div className="flex items-center justify-between px-1">
             <div className="flex flex-col">
               <span className="text-[8px] font-black text-teal-500 uppercase tracking-widest">Curated for you</span>
               <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tighter">Popular in Your City</h2>
             </div>
             <button className="bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-md shadow-lg shadow-blue-500/20 active:scale-95 transition-all">View Map</button>
           </div>
           
           <div className="grid grid-cols-1 gap-4">
              {featured.map((event, idx) => (
                <motion.div
                  key={`feat-${event.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="w-full"
                >
                  <EventCard event={event} horizontal />
                </motion.div>
              ))}
           </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;

