import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Search, Star, Trash2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { EVENTS } from '../data/mockData';
import EventCard from '../components/EventCard';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

const FavoritesPage = () => {
  const { favorites, toggleFavorite } = useAppContext();
  const favoriteEvents = EVENTS.filter(event => favorites.includes(event.id));
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark pb-32 animate-fadeIn stagger-1">
      <header className="px-6 pt-12 pb-6 flex items-center justify-between sticky top-0 bg-bg-light/80 dark:bg-bg-dark/80 backdrop-blur-3xl z-40 transition-shadow">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3 group cursor-default">
          My Favorites
          <Heart size={24} className="text-red-500 fill-red-500 group-hover:scale-125 transition-transform" />
        </h1>
        <button className="p-3 glass dark:glass-dark rounded-full text-slate-500 hover:text-red-500 transition-colors active:scale-95 group">
          <Trash2 size={20} className="group-hover:translate-y-[-2px] transition-transform" />
        </button>
      </header>

      <main className="px-6 space-y-10">
        <AnimatePresence mode="popLayout">
          {favoriteEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              {favoriteEvents.map((event) => (
                <motion.div
                  key={event.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: -50 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <EventCard event={event} />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-40 text-slate-400 gap-6 glass dark:glass-dark rounded-5xl border-dashed border-2 border-slate-200 dark:border-slate-800 shadow-inner group py-2"
            >
              <div className="relative">
                <Heart size={80} className="opacity-20 translate-y-2 text-primary" />
                <Star size={24} className="absolute -top-2 -right-2 text-yellow-400 animate-bounce scale-110" />
              </div>
              <div className="text-center space-y-1">
                <p className="font-extrabold text-2xl text-slate-800 dark:text-slate-100 group-hover:text-primary transition-colors">No favorites yet</p>
                <p className="text-sm font-medium opacity-60 tracking-wide uppercase">Discover events you'll love</p>
              </div>
              <Button 
                onClick={() => navigate('/home')} 
                variant="primary" 
                className="px-10 h-16 rounded-3xl mt-4 shadow-glow"
              >
                Start Exploring
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default FavoritesPage;
