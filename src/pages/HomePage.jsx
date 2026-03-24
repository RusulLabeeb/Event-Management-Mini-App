import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Search, Clock, MapPin, Star, Heart } from 'lucide-react';
import { CATEGORIES, EVENTS } from '../data/mockData';
import EventCard from '../components/EventCard';
import SearchBar from '../components/SearchBar';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const HomePage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { isFavorite, toggleFavorite } = useAppContext();

  const filteredEvents = EVENTS.filter(event => {
    const matchesCategory = activeCategory === 'all' || event.category === activeCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          event.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const scrollEvents = EVENTS.slice(0, 3);
  const nature = EVENTS.slice(1, 4);
  const popular = EVENTS.slice(0, 4);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0F172A] pb-32 overflow-x-hidden">
      {/* Hero Banner Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative h-80 w-full overflow-hidden bg-gradient-hero"
      >
        <div className="absolute inset-0">
          <img 
            src="https://picsum.photos/id/1015/800/600" 
            alt="hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60" />
        </div>

        <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="space-y-3"
          >
            <div>
              <p className="text-sm font-semibold tracking-widest opacity-90 mb-1">EXPLORE WONDERS</p>
              <h1 className="text-4xl font-black leading-tight">
                Unveil The<br />Travel Wonders
              </h1>
            </div>
            <p className="text-sm opacity-80 font-medium max-w-xs">Take the first step into an unforgettable journey</p>
            <Link to="/explore">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 bg-primary text-white font-black px-8 py-3 rounded-full flex items-center gap-2 shadow-lg shadow-primary/40 hover:shadow-primary/60 transition-all active:scale-95"
              >
                <span>Explore Now</span>
                <ChevronRight size={18} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      <main className="px-5 space-y-8 py-8">
        {/* Find Your Favorite */}
        <section className="space-y-5 animate-slideUp">
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              Find your<br />favorite place
            </h2>
          </div>

          {/* Search and Filter */}
          <div className="flex gap-3">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-sm"
            >
              <svg className="w-5 h-5 text-slate-600 dark:text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </motion.button>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            {[
              { id: 'all', name: '🎯 All Package' },
              { id: 'trips', name: '✈️ Flight Package' },
              { id: 'camping', name: '🏨 Hotel Pack' }
            ].map(cat => (
              <motion.button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2.5 rounded-full font-semibold text-sm whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {cat.name}
              </motion.button>
            ))}
          </div>
        </section>

        {/* Spend Little Time in Nature */}
        <section className="space-y-4 animate-slideUp">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-slate-900 dark:text-white">Spend little time in nature</h3>
            <button className="text-primary text-xs font-black uppercase tracking-widest hover:underline decoration-2 underline-offset-4">View All</button>
          </div>

          <div className="flex gap-3 overflow-x-auto no-scrollbar">
            {nature.map((event, idx) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex-shrink-0"
              >
                <Link to={`/event/${event.id}`}>
                  <div className="relative w-40 h-44 rounded-2xl overflow-hidden group cursor-pointer">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h4 className="font-bold text-sm mb-2">{event.title}</h4>
                      <div className="flex items-center gap-1 text-xs bg-secondary/90 w-fit px-2 py-1 rounded-full">
                        <Star size={12} className="fill-secondary text-secondary" />
                        <span className="font-bold">{event.rating}</span>
                      </div>
                    </div>

                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.preventDefault();
                        toggleFavorite(event.id);
                      }}
                      className="absolute top-3 right-3 bg-white/90 rounded-full p-2 shadow-lg"
                    >
                      <Heart 
                        size={16} 
                        className={isFavorite(event.id) ? 'fill-red-500 text-red-500' : 'text-slate-400'}
                      />
                    </motion.button>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Popular Destinations */}
        <section className="space-y-4 animate-slideUp">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-slate-900 dark:text-white">Popular Destinations</h3>
            <button className="text-primary text-xs font-black uppercase tracking-widest hover:underline decoration-2 underline-offset-4">View All</button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {popular.slice(0, 2).map((event, idx) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link to={`/event/${event.id}`}>
                  <div className="relative h-56 rounded-2xl overflow-hidden group cursor-pointer">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    
                    <div className="absolute inset-0 flex flex-col justify-between p-4 text-white">
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.preventDefault();
                          toggleFavorite(event.id);
                        }}
                        className="bg-white/20 backdrop-blur-sm rounded-full p-2 w-fit self-end"
                      >
                        <Heart 
                          size={18} 
                          className={isFavorite(event.id) ? 'fill-red-500 text-red-500' : 'text-white'}
                        />
                      </motion.button>

                      <div>
                        <div className="flex items-center gap-2 mb-2 bg-secondary/90 w-fit px-3 py-1 rounded-full">
                          <span className="font-black text-sm">📍 42</span>
                        </div>
                        <h4 className="font-black text-lg">{event.title}</h4>
                        <p className="text-xs opacity-80">{event.location}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;

