import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings, ChevronRight, Moon, Sun, Edit3, Zap,
  Ticket, Heart, Shield, HelpCircle, LogOut, Bell, Star, Map
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { EVENTS } from '../data/mockData';

const SectionItem = ({ icon: Icon, label, subtitle, color, onClick, rightElement }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-slate-100 dark:hover:bg-white/5 transition-all duration-200 group active:scale-[0.98]"
  >
    <div className="flex items-center gap-3">
      <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
        <Icon size={18} />
      </div>
      <div className="text-left">
        <p className="font-bold text-slate-800 dark:text-white text-sm">{label}</p>
        <p className="text-[10px] text-slate-400 font-medium">{subtitle}</p>
      </div>
    </div>
    {rightElement || <ChevronRight size={16} className="text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />}
  </button>
);

const ProfilePage = () => {
  const { darkMode, toggleDarkMode, favorites } = useAppContext();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(null);

  const myBookings = EVENTS.slice(0, 3); // Mock booked events

  return (
    <div className="min-h-screen bg-white dark:bg-[#0F172A] pb-36">

      {/* ─── HERO HEADER ─── */}
      <div className="relative px-5 pt-10 pb-6 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent dark:from-primary/20" />

        <div className="relative flex flex-col items-center gap-4">
          {/* Avatar */}
          <div className="relative">
            <div className="w-24 h-24 rounded-3xl overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80"
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <button
              className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg active:scale-90 transition-transform"
            >
              <Edit3 size={14} />
            </button>
          </div>

          {/* Info */}
          <div className="text-center">
            <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-1.5 justify-center">
              Alex Rivera
              <Zap size={16} className="text-primary fill-primary" />
            </h1>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">Premium Member</p>
          </div>

          {/* Stats Bar */}
          <div className="flex gap-6 pt-4 border-t border-slate-100 dark:border-slate-800 w-full justify-center">
            {[
              { value: '12', label: 'Events Attended' },
              { value: favorites.length.toString(), label: 'Saved Events' },
              { value: '4.8★', label: 'Rating' },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <p className="text-lg font-black text-slate-900 dark:text-white">{stat.value}</p>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <main className="px-5 space-y-6">

        {/* ─── QUICK ACTIONS ─── */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => navigate('/favorites')}
            className="flex flex-col items-center gap-2 p-4 bg-red-50 dark:bg-red-900/20 rounded-2xl active:scale-95 transition-all"
          >
            <Heart size={22} className="text-red-500 fill-red-500" />
            <span className="font-black text-xs text-red-500">Saved Events</span>
            <span className="text-[10px] text-red-400 font-bold">{favorites.length} saved</span>
          </button>
          <button
            onClick={() => navigate('/explore')}
            className="flex flex-col items-center gap-2 p-4 bg-primary/10 dark:bg-primary/20 rounded-2xl active:scale-95 transition-all"
          >
            <Ticket size={22} className="text-primary" />
            <span className="font-black text-xs text-primary">My Tickets</span>
            <span className="text-[10px] text-primary/70 font-bold">3 upcoming</span>
          </button>
        </div>

        {/* ─── UPCOMING BOOKINGS ─── */}
        <div className="space-y-3">
          <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest px-1">Upcoming Events</h2>
          <div className="space-y-2">
            {myBookings.map((event, idx) => (
              <motion.button
                key={event.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.08 }}
                onClick={() => navigate(`/event/${event.id}`)}
                className="w-full flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700 hover:border-primary/30 transition-all active:scale-[0.98]"
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                  onError={e => { e.target.src = 'https://picsum.photos/id/1015/200/200'; }}
                />
                <div className="flex-1 text-left min-w-0">
                  <p className="font-black text-slate-900 dark:text-white text-sm line-clamp-1">{event.title}</p>
                  <p className="text-xs text-slate-400 font-medium">{event.date}</p>
                </div>
                <span className="text-[10px] font-black text-primary bg-primary/10 px-2 py-1 rounded-full capitalize flex-shrink-0">
                  {event.category}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* ─── SETTINGS ─── */}
        <div className="space-y-3">
          <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest px-1">Account Settings</h2>
          <div className="bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-slate-100 dark:border-slate-700 overflow-hidden p-1 space-y-0.5">
            <SectionItem
              icon={darkMode ? Moon : Sun}
              label="Appearance"
              subtitle={darkMode ? 'Dark Mode is ON' : 'Light Mode is ON'}
              color="bg-teal-500/10 text-teal-500"
              rightElement={
                <button
                  onClick={toggleDarkMode}
                  className={`w-12 h-6 rounded-full p-1 relative transition-colors flex items-center ${darkMode ? 'bg-primary' : 'bg-slate-300'}`}
                >
                  <motion.div
                    layout
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className={`h-4 w-4 bg-white rounded-full shadow-sm ${darkMode ? 'ml-auto' : 'ml-0'}`}
                  />
                </button>
              }
            />
            <SectionItem
              icon={Bell}
              label="Notifications"
              subtitle="Event alerts & reminders"
              color="bg-blue-500/10 text-blue-500"
            />
            <SectionItem
              icon={Shield}
              label="Privacy & Security"
              subtitle="Password, 2FA & data"
              color="bg-purple-500/10 text-purple-500"
            />
            <SectionItem
              icon={Star}
              label="Reviews & Ratings"
              subtitle="Manage your reviews"
              color="bg-yellow-500/10 text-yellow-500"
            />
            <SectionItem
              icon={HelpCircle}
              label="Help & Support"
              subtitle="FAQ, contact us"
              color="bg-green-500/10 text-green-500"
            />
          </div>
        </div>

        {/* ─── SIGN OUT ─── */}
        <button
          onClick={() => navigate('/login')}
          className="w-full py-4 rounded-2xl border-2 border-red-200 dark:border-red-900/40 text-red-500 font-black text-sm flex items-center justify-center gap-2 active:bg-red-500 active:text-white active:border-red-500 transition-all"
        >
          <LogOut size={18} />
          Sign Out
        </button>

      </main>
    </div>
  );
};

export default ProfilePage;
