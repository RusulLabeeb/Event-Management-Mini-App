import React from 'react';
import { motion } from 'framer-motion';
import { Compass, MapPin, SlidersHorizontal, Star, Zap } from 'lucide-react';
import { EVENTS } from '../data/mockData';
import EventCard from '../components/EventCard';
import SearchBar from '../components/SearchBar';

const ExplorePage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0F172A] pb-32 animate-fadeIn">
      <header className="px-5 pt-8 pb-6 sticky top-0 bg-white/80 dark:bg-[#0F172A]/80 backdrop-blur-2xl z-40 border-b border-slate-100 dark:border-slate-800">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              Explore
              <Compass size={28} className="text-primary" />
            </h1>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-primary/10 transition-all"
            >
              <SlidersHorizontal size={20} className="text-primary" />
            </motion.button>
          </div>
          <SearchBar />
        </div>
      </header>

      <main className="px-5 space-y-8 py-8">
        {/* Quick Filter Tabs */}
        <section className="space-y-4 animate-slideUp">
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
            {['All', 'Trips', 'Hotels', 'Camping', 'Heritage'].map((filter, i) => (
              <motion.button
                key={filter}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-5 py-2.5 rounded-full font-bold text-sm whitespace-nowrap transition-all ${
                  i === 0
                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {filter}
              </motion.button>
            ))}
          </div>
        </section>

        {/* Popular Destinations */}
        <section className="space-y-4 animate-slideUp">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Star size={20} className="fill-secondary text-secondary" />
              Popular in Your City
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="text-primary font-bold text-xs uppercase tracking-widest hover:underline"
            >
              View Map
            </motion.button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {EVENTS.slice(0, 4).map((event, idx) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <EventCard event={event} horizontal />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Trending Adventures */}
        <section className="space-y-4 animate-slideUp">
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Zap size={20} className="fill-primary text-primary" />
            Trending Adventures
          </h2>

          <div className="grid grid-cols-1 gap-6">
            {EVENTS.slice(0, 3).map((event, idx) => (
              <motion.div
                key={`trending-${event.id}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="w-full"
              >
                <EventCard event={event} />
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ExplorePage;
