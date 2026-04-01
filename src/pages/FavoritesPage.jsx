import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Search, Trash2, Ticket } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { EVENTS } from '../data/mockData';
import EventCard from '../components/EventCard';
import { useNavigate } from 'react-router-dom';

const FavoritesPage = () => {
  const { favorites, toggleFavorite } = useAppContext();
  const favoriteEvents = EVENTS.filter(event => favorites.includes(event.id));
  const navigate = useNavigate();

  const clearAll = () => {
    favoriteEvents.forEach(e => toggleFavorite(e.id));
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0F172A] pb-32">

      {/* ─── HEADER ─── */}
      <header className="px-5 pt-10 pb-5 flex items-center justify-between sticky top-0 bg-white/90 dark:bg-[#0F172A]/90 backdrop-blur-2xl z-40 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            My Saved
            <Heart size={22} className="text-red-500 fill-red-500" />
          </h1>
          <p className="text-xs text-slate-400 font-bold mt-0.5">{favoriteEvents.length} event{favoriteEvents.length !== 1 ? 's' : ''} saved</p>
        </div>
        {favoriteEvents.length > 0 && (
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={clearAll}
            className="p-2.5 bg-red-50 dark:bg-red-900/20 rounded-xl text-red-400 hover:text-red-500 transition-colors"
          >
            <Trash2 size={18} />
          </motion.button>
        )}
      </header>

      <main className="px-5 pt-6">
        <AnimatePresence mode="popLayout">
          {favoriteEvents.length > 0 ? (
            <div className="space-y-4">
              {favoriteEvents.map((event) => (
                <motion.div
                  key={event.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.85, x: -60 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                >
                  <EventCard event={event} horizontal />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-32 gap-5 text-slate-400"
            >
              {/* Illustration */}
              <div className="relative">
                <div className="w-28 h-28 bg-slate-100 dark:bg-slate-800 rounded-3xl flex items-center justify-center">
                  <Heart size={48} className="text-slate-300 dark:text-slate-600" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                  <Search size={14} className="text-red-400" />
                </div>
              </div>
              <div className="text-center space-y-1">
                <p className="text-2xl font-black text-slate-800 dark:text-slate-100">No saved events</p>
                <p className="text-sm font-medium text-slate-400">Events you save will appear here</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/explore')}
                className="bg-primary text-white px-10 py-3.5 rounded-2xl font-black text-sm shadow-lg shadow-primary/30 flex items-center gap-2"
              >
                <Ticket size={16} />
                Browse Events
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default FavoritesPage;
