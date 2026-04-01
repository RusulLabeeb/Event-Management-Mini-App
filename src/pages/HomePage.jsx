import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, Star, Calendar, MapPin, Ticket, Zap, ChevronRight, Bell, Sparkles, Filter } from 'lucide-react';
import { EVENTS, CATEGORIES } from '../data/mockData';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import EventCard from '../components/EventCard';


const HomePage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { isFavorite, toggleFavorite } = useAppContext();
  const { language, t, toggleLanguage } = useLanguage();
  const navigate = useNavigate();


  const filteredEvents = EVENTS.filter(event => {
    const matchesCategory = activeCategory === 'all' || event.category === activeCategory;
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredEvents = EVENTS.slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F1A] pb-36 overflow-x-hidden">

      {/* ─── STICKY PREMIUM HEADER ─── */}
      <header className="px-6 pt-12 pb-6 flex items-center justify-between sticky top-0 bg-slate-50/80 dark:bg-[#0B0F1A]/80 backdrop-blur-2xl z-50 transition-all border-b border-transparent hover:border-slate-100 dark:hover:border-white/5">
        <div className="flex items-center gap-4">
          <Link to="/profile" className="relative group">
            <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-white dark:border-slate-800 shadow-xl group-hover:scale-105 transition-transform duration-300 ring-2 ring-primary/20">
              <img
                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80"
                alt="avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-slate-900 shadow-sm" />
          </Link>
          <div className="flex flex-col">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] opacity-60 leading-none mb-1">Elite Member</p>
            <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-none">Alex Rivera</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleLanguage}
              className="w-12 h-12 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center border border-slate-100 dark:border-white/5 shadow-sm font-black text-xs text-primary"
            >
              {language === 'en' ? 'AR' : 'EN'}
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center relative border border-slate-100 dark:border-white/5 shadow-sm"
            >
              <Bell size={20} className="text-slate-600 dark:text-slate-400" />
              <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-slate-900 shadow-lg animate-pulse" />
            </motion.button>
        </div>

      </header>

      {/* ─── ULTRA PREMIUM SEARCH & FILTER ─── */}
      <div className="px-6 mb-8 mt-2">
        <div className="flex gap-3">
          <div className="relative flex-1 group">
            {/* Animated Glow on Focus */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-purple-500/30 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
            
            <div className="relative flex items-center bg-white dark:bg-slate-900/60 backdrop-blur-2xl rounded-2xl border border-slate-100 dark:border-white/10 shadow-sm group-focus-within:shadow-2xl group-focus-within:shadow-primary/10 transition-all duration-300">
              <Search size={18} className="ml-5 text-slate-400 group-focus-within:text-primary group-focus-within:scale-110 transition-all duration-300" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={t('search_placeholder')}
                className="w-full pl-3 pr-5 py-3.5 bg-transparent text-[13px] font-bold text-slate-800 dark:text-white placeholder:text-slate-400/40 outline-none"
              />
            </div>
          </div>
          <motion.button 
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 15px 30px -8px rgba(var(--primary-rgb), 0.5)",
              background: "linear-gradient(135deg, var(--primary) 0%, #7C3AED 100%)" 
            }}
            whileTap={{ scale: 0.95 }}
            className="w-13 h-12.5 bg-gradient-to-br from-primary to-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-primary/30 transition-all duration-300 relative overflow-hidden group/filter"
          >
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/filter:opacity-100 transition-opacity duration-500" />
            <Filter size={18} className="relative z-10 group-hover/filter:rotate-12 transition-transform duration-300" />
          </motion.button>

        </div>
      </div>



      {/* ─── PREMIUM CATEGORIES ─── */}
      <div className="mb-10">
        <div className="flex items-center justify-between px-6 mb-4">
          <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]">{t('categories')}</h2>
          <div className="h-px flex-1 bg-slate-100 dark:bg-white/5 ml-4" />
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar px-6 pb-2">
          {CATEGORIES.map(cat => {
            const isActive = activeCategory === cat.id;
            return (
              <motion.button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                whileTap={{ scale: 0.95 }}
                className={`relative group flex flex-row items-center gap-3 px-5 py-3 rounded-full transition-all duration-500 border whitespace-nowrap ${
                  isActive
                    ? 'bg-primary border-primary shadow-xl shadow-primary/30 text-white'
                    : 'bg-white dark:bg-slate-900/40 border-slate-100 dark:border-white/5 text-slate-500 dark:text-slate-400 hover:border-primary/30'
                }`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="category-glow"
                    className="absolute inset-0 bg-primary blur-xl opacity-20 -z-10"
                  />
                )}
                <span className="text-lg filter drop-shadow-sm group-hover:scale-110 transition-transform">{cat.name.split(' ')[0]}</span>
                <span className={`text-[10px] font-black uppercase tracking-widest ${isActive ? 'opacity-100' : 'opacity-60'}`}>
                  {t(cat.id)}
                </span>
                
                {isActive && (
                  <motion.div 
                    layoutId="active-dot"
                    className="w-1.5 h-1.5 bg-white rounded-full shrink-0"
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      <main className="px-6 space-y-10">

        {/* ─── FEATURED LARGE CARDS ─── */}
        <section className="space-y-6">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-1">{t('handpicked')}</p>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter flex items-center gap-2">
                {t('trending')} <Sparkles size={24} className="text-yellow-400" />
              </h2>
            </div>
            <Link to="/explore" className="px-4 py-2 bg-slate-100 dark:bg-slate-900 rounded-full text-primary text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
              {t('view_map')}
            </Link>
          </div>
          
          <div className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4 -mx-6 px-6">
            {featuredEvents.map((event, idx) => (
              <motion.div
                key={`feat-${event.id}`}
                className="flex-shrink-0 w-[310px] snap-center"
              >
                <EventCard event={event} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* ─── FEED (VERTICAL LISTING) ─── */}
        <section className="space-y-6">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">
              {t('explore_upcoming')}
            </h2>
            <div className="h-1px flex-1 bg-gradient-to-r from-slate-200 dark:from-white/10 to-transparent" />
            <div className="w-10 h-10 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center text-primary shadow-sm border border-slate-100 dark:border-white/5">
               <Zap size={18} fill="currentColor" />
            </div>
          </div>

          <AnimatePresence mode="popLayout">
            {filteredEvents.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20 bg-white dark:bg-slate-900 rounded-[3rem] border-2 border-dashed border-slate-100 dark:border-white/5"
              >
                <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 opacity-40">
                   <Search size={32} />
                </div>
                <p className="font-black text-xl text-slate-400">{t('no_events')}</p>
                <p className="text-xs text-slate-500 font-bold uppercase mt-2">{t('switch_categories')}</p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {filteredEvents.slice(0, 10).map((event, idx) => (
                  <motion.div
                    key={`list-${event.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <EventCard event={event} horizontal />
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </section>

      </main>

      {/* ─── BOTTOM DECO ─── */}
      <div className="mt-20 px-10 text-center opacity-30 pb-20">
         <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Proudly Designed by VibePass Hub</p>
      </div>

    </div>
  );
};

export default HomePage;
