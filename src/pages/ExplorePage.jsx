import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, MapPin, SlidersHorizontal, Star, Zap, Search, Calendar, X, Filter } from 'lucide-react';
import { EVENTS, CATEGORIES } from '../data/mockData';
import EventCard from '../components/EventCard';

const ExplorePage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('popular');

  const filteredEvents = EVENTS.filter(event => {
    const matchesFilter = activeFilter === 'all' || event.category === activeFilter;
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return b.reviews - a.reviews; // popular
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F1A] pb-32 animate-fadeIn">

      {/* ─── COMPACT HEADER ─── */}
      <header className="px-6 pt-12 pb-5 sticky top-0 bg-slate-50/80 dark:bg-[#0B0F1A]/80 backdrop-blur-2xl z-40 space-y-5 border-b border-transparent hover:border-slate-100 dark:hover:border-white/5">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-black text-slate-800 dark:text-white flex items-center gap-2.5 tracking-tighter">
            <Compass size={26} className="text-primary" /> Explore
          </h1>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowFilters(true)}
            className="w-11 h-11 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center text-primary relative border border-slate-100 dark:border-white/5 shadow-sm"
          >
            <Filter size={20} />
          </motion.button>
        </div>

        {/* Search */}
        <div className="relative group">
          <Search size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-all duration-300" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search venue or event..."
            className="w-full pl-12 pr-6 py-3.5 bg-white dark:bg-slate-900 rounded-2xl text-xs font-bold text-slate-800 dark:text-white placeholder:text-slate-400 border border-slate-100 dark:border-white/5 outline-none focus:ring-4 focus:ring-primary/10 transition-all shadow-sm"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"><X size={16} /></button>
          )}
        </div>
      </header>

      <main className="px-6 pt-5 space-y-10">

        {/* ─── CATEGORY FILTERS (MINIMAL) ─── */}
        <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1">
          {CATEGORIES.map(cat => (
            <motion.button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-2.5 rounded-2xl font-black text-[10px] uppercase tracking-widest whitespace-nowrap transition-all border ${
                activeFilter === cat.id
                  ? 'bg-primary text-white border-primary shadow-lg shadow-primary/30'
                  : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-100 dark:border-white/5 shadow-sm'
              }`}
            >
              {cat.name}
            </motion.button>
          ))}
        </div>

        {/* ─── RESULTS PANEL (DENSER) ─── */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-1">
             <div className="flex items-center gap-2">
                <span className="text-xl font-black text-slate-800 dark:text-white tracking-tighter">{filteredEvents.length}</span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Events Found</span>
             </div>
             <select
               value={sortBy}
               onChange={e => setSortBy(e.target.value)}
               className="text-[10px] font-black text-primary bg-primary/10 px-4 py-2 rounded-xl outline-none border-none uppercase tracking-widest cursor-pointer hover:bg-primary/20 transition-all"
             >
               <option value="popular">🔥 Popular</option>
               <option value="rating">⭐ Rated</option>
               <option value="price-asc">💰 Price ↑</option>
               <option value="price-desc">💎 Price ↓</option>
             </select>
          </div>

          <AnimatePresence mode="popLayout">
            {filteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 pb-20">
                {filteredEvents.map((event, idx) => (
                  <motion.div
                    key={event.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <EventCard event={event} horizontal />
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-20 gap-4 text-slate-400 bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-white/5"
              >
                <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto opacity-30 animate-pulse">
                   <Search size={32} />
                </div>
                <p className="font-black text-xl text-slate-300">No events found</p>
                <button
                  onClick={() => { setActiveFilter('all'); setSearchQuery(''); }}
                  className="bg-primary/10 text-primary px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-primary hover:text-white transition-all shadow-sm"
                >
                  Clear Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </main>

      {/* ─── FILTER BOTTOM SHEET (AESTHETIC) ─── */}
      <AnimatePresence>
        {showFilters && (
          <div className="fixed inset-0 z-[100] flex items-end justify-center animate-fadeIn">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowFilters(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-3xl"
            />
            <motion.div
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'spring', bounce: 0.1, duration: 0.6 }}
              className="relative w-full max-w-[414px] bg-white dark:bg-slate-900 rounded-t-[3rem] p-8 space-y-6 shadow-2xl border-t border-white dark:border-white/5"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">Filters</h3>
                <button onClick={() => setShowFilters(false)} className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-500"><X size={18} /></button>
              </div>

              <div className="space-y-4">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Sort & Organize</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { v: 'popular', l: 'Trending', i: <Zap size={14}/> },
                    { v: 'rating', l: 'Top Rated', i: <Star size={14}/> },
                    { v: 'price-asc', l: 'Low Price', i: <Ticket size={14}/> },
                    { v: 'price-desc', l: 'Luxury', i: <Sparkles size={14}/> },
                  ].map(opt => (
                    <button
                      key={opt.v}
                      onClick={() => setSortBy(opt.v)}
                      className={`flex flex-col items-center gap-1.5 p-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                        sortBy === opt.v ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-105' : 'bg-slate-50 dark:bg-slate-800/50 text-slate-400 border border-slate-100 dark:border-white/5'
                      }`}
                    >
                      {opt.i}
                      {opt.l}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setShowFilters(false)}
                className="w-full h-16 bg-primary text-white rounded-3xl font-black text-xs uppercase tracking-[0.25em] shadow-xl shadow-primary/30 mt-4 active:scale-95 transition-all"
              >
                Apply Criteria
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default ExplorePage;
