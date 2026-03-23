import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Search, MapPin, SlidersHorizontal, Heart, Clock, Star, Zap } from 'lucide-react';
import { EVENTS } from '../data/mockData';
import EventCard from '../components/EventCard';
import SearchBar from '../components/SearchBar';

const ExplorePage = () => {
  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark pb-32 animate-fadeIn stagger-1">
      <header className="px-6 pt-12 pb-8 flex flex-col gap-6 sticky top-0 bg-bg-light/80 dark:bg-bg-dark/80 backdrop-blur-3xl z-40 transition-shadow">
        <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2 group cursor-default">
              Explore Events
              <Compass size={24} className="text-primary group-hover:rotate-180 transition-transform duration-700 shadow-glow" />
            </h1>
            <div className="p-3 glass dark:glass-dark rounded-full text-slate-500 group cursor-pointer hover:bg-primary/20 hover:text-primary transition-all active:scale-95">
              <SlidersHorizontal size={20} />
            </div>
        </div>
        <SearchBar />
      </header>

      <main className="px-6 space-y-10">
        {/* Quick Filters */}
        <section className="flex gap-4 overflow-x-auto no-scrollbar py-2 animate-slideUp stagger-1">
          {['Free', 'Paid', 'Trending', 'Nearby', 'Family'].map((filter, i) => (
            <button key={filter} className={`px-6 py-4 rounded-3xl font-bold text-sm transition-all whitespace-nowrap border-2 ring-1 ring-black/5 dark:ring-white/5 ${
              i === 2 ? 'bg-primary text-white border-primary shadow-glow shadow-primary/30' : 'bg-white dark:bg-slate-800 text-slate-500 border-white/50 dark:border-slate-700/50 hover:border-slate-200 dark:hover:border-slate-600 active:scale-95 shadow-sm'
            }`}>
              {filter}
            </button>
          ))}
        </section>

        {/* Discovery Sections */}
        <section className="space-y-6 animate-slideUp stagger-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                Popular in Your City
                <Star size={18} className="text-yellow-400 fill-yellow-400 shadow-glow" />
            </h3>
            <button className="text-primary font-bold text-xs uppercase tracking-widest hover:underline hover:underline-offset-4 decoration-2">View Map</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {EVENTS.slice(0, 4).map((event) => (
              <EventCard key={event.id} event={event} horizontal />
            ))}
          </div>
        </section>

        {/* Trending Events Area */}
        <section className="space-y-6 animate-slideUp stagger-3">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2 px-1">
            Trending Adventures
            <Zap size={18} className="text-primary-soft shadow-glow" />
          </h3>
          <div className="flex gap-8 overflow-x-auto no-scrollbar pb-8 pt-2 px-1 py-1">
            {EVENTS.slice().reverse().map((event) => (
              <EventCard key={`explore-${event.id}`} event={event} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ExplorePage;
