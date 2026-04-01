import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, Heart, Star, MapPin, Clock, Calendar,
  Users, ChevronRight, Share2, Ticket, Info, LayoutList, MessageSquare
} from 'lucide-react';
import { EVENTS } from '../data/mockData';
import { useAppContext } from '../context/AppContext';

const EventDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useAppContext();
  const [activeTab, setActiveTab] = useState(0);
  const [imgError, setImgError] = useState(false);

  const event = EVENTS.find(e => e.id === parseInt(id));

  if (!event) return (
    <div className="h-screen flex flex-col items-center justify-center bg-white dark:bg-[#0B0F1A] gap-4">
      <Ticket size={48} className="text-primary opacity-50" />
      <p className="text-slate-400 font-black text-xl">Event not found</p>
      <button onClick={() => navigate('/home')} className="bg-primary text-white px-6 py-3 rounded-2xl font-black">Go Home</button>
    </div>
  );

  const tabs = [
    { id: 0, label: 'About', icon: Info },
    { id: 1, label: 'Schedule', icon: LayoutList },
    { id: 2, label: 'Reviews', icon: MessageSquare }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F1A] pb-32">

      {/* ─── COMPACT HERO IMAGE ─── */}
      <section className="relative h-[320px] w-full overflow-hidden">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          src={imgError ? 'https://picsum.photos/id/1015/800/600' : event.image}
          alt={event.title}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1A] via-transparent to-black/20" />

        {/* Floating Controls */}
        <div className="absolute top-8 left-4 right-4 flex items-center justify-between z-10">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(-1)}
            className="h-10 w-10 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/20 text-white"
          >
            <ChevronLeft size={20} strokeWidth={3} />
          </motion.button>
          <div className="flex gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="h-10 w-10 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/20 text-white"
            >
              <Share2 size={18} />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => toggleFavorite(event.id)}
              className={`h-10 w-10 backdrop-blur-xl rounded-2xl flex items-center justify-center border transition-all ${
                isFavorite(event.id) ? 'bg-red-500 border-transparent text-white shadow-lg' : 'bg-white/10 border-white/20 text-white'
              }`}
            >
              <Heart size={18} fill={isFavorite(event.id) ? 'currentColor' : 'none'} />
            </motion.button>
          </div>
        </div>
      </section>

      {/* ─── INFO PANEL (REDUCED PADDING) ─── */}
      <section className="px-4 -mt-12 relative z-10 space-y-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-3xl rounded-[2.5rem] p-5 shadow-2xl border border-white dark:border-white/5"
        >
          {/* Header */}
          <div className="space-y-1 mb-4">
            <span className="bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full">{event.category}</span>
            <h1 className="text-2xl font-black text-slate-800 dark:text-white leading-tight tracking-tighter">{event.title}</h1>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 opacity-70">
                <MapPin size={12} className="text-primary" />
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{event.location}</span>
              </div>
              <div className="flex items-center gap-1 bg-yellow-400 text-white px-2 py-0.5 rounded-lg">
                 <Star size={12} className="fill-current" />
                 <span className="text-xs font-black">{event.rating}</span>
              </div>
            </div>
          </div>

          {/* Minimal Grid */}
          <div className="grid grid-cols-3 gap-2 border-t border-slate-100 dark:border-white/5 pt-4">
            <div className="flex flex-col items-center">
              <Calendar size={14} className="text-primary mb-1" />
              <span className="text-[10px] font-black text-slate-800 dark:text-white">{event.date}</span>
              <p className="text-[8px] font-bold text-slate-400 uppercase">Date</p>
            </div>
            <div className="flex flex-col items-center border-x border-slate-100 dark:border-white/5">
              <Clock size={14} className="text-primary mb-1" />
              <span className="text-[10px] font-black text-slate-800 dark:text-white">{event.time}</span>
              <p className="text-[8px] font-bold text-slate-400 uppercase">Start Time</p>
            </div>
            <div className="flex flex-col items-center">
              <Users size={14} className="text-primary mb-1" />
              <span className="text-[10px] font-black text-slate-800 dark:text-white">{event.capacity / 1000}K</span>
              <p className="text-[8px] font-bold text-slate-400 uppercase">Attendees</p>
            </div>
          </div>
        </motion.div>

        {/* CUSTOM TAB BAR (COMPACT) */}
        <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-md rounded-2xl p-1 flex border border-white dark:border-white/5">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 flex items-center justify-center gap-2 rounded-xl transition-all duration-300 ${
                  active ? 'bg-primary text-white shadow-lg' : 'text-slate-400 font-bold text-xs'
                }`}
              >
                <Icon size={14} strokeWidth={active ? 3 : 2} />
                {active && <span className="font-black uppercase tracking-widest text-[9px]">{tab.label}</span>}
              </button>
            );
          })}
        </div>

        {/* Tab Content (Reduced Spacing) */}
        <div className="px-2 min-h-[220px]">
          <AnimatePresence mode="wait">
            {activeTab === 0 && (
              <motion.div key="about" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-4">
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  {event.description}
                </p>
                <div className="grid grid-cols-2 gap-2">
                   {event.highlights.map((h, i) => (
                     <div key={i} className="bg-white dark:bg-slate-800/50 p-3 rounded-2xl border border-slate-100 dark:border-white/5 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span className="text-[10px] font-black text-slate-800 dark:text-white uppercase tracking-tight">{h}</span>
                     </div>
                   ))}
                </div>
              </motion.div>
            )}
            {activeTab === 1 && (
              <motion.div key="schedule" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-3">
                 {[1, 2, 3].map(i => (
                   <div key={i} className="flex gap-4 p-3 bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-white/5">
                      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-black text-xs">0{i}</div>
                      <div>
                         <p className="text-xs font-black text-slate-800 dark:text-white">Main Session 0{i}</p>
                         <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">Doors open • 15:30</p>
                      </div>
                   </div>
                 ))}
              </motion.div>
            )}
            {activeTab === 2 && (
              <motion.div key="reviews" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-3">
                 {[1, 2].map(i => (
                   <div key={i} className="p-4 bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-white/5">
                      <div className="flex justify-between mb-2">
                         <span className="text-xs font-bold text-slate-800 dark:text-white">Alex Rivera</span>
                         <Star size={10} className="fill-yellow-400 text-yellow-400" />
                      </div>
                      <p className="text-[10px] text-slate-500 font-medium">This event was truly incredible! Highly recommended.</p>
                   </div>
                 ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ─── STICKY FOOTER ACTION (COMPACT) ─── */}
      <div className="fixed bottom-0 left-0 right-0 p-4 z-50 bg-gradient-to-t from-slate-50 dark:from-[#0B0F1A] to-transparent">
        <div className="max-w-[380px] mx-auto bg-white dark:bg-slate-900 overflow-hidden shadow-2xl rounded-3xl border border-white dark:border-white/5 p-3 flex items-center justify-between">
          <div className="flex flex-col pl-2">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Starting at</span>
            <span className="text-xl font-black text-primary leading-none">${event.price}</span>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(`/booking/${event.id}`)}
            className="bg-primary text-white px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-primary/30"
          >
            Book Now <ChevronRight size={14} />
          </motion.button>
        </div>
      </div>

    </div>
  );
};

export default EventDetailsPage;
