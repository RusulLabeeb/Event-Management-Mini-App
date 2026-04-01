import React, { useState } from 'react';
import { Home, Compass, Plus, Heart, User, X, Calendar, MapPin, Clock } from 'lucide-react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';


const AddEventModal = ({ onClose }) => {
  const [form, setForm] = useState({ title: '', date: '', location: '', category: 'music' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(onClose, 1500);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
      />
      <motion.div
        initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
        transition={{ type: 'spring', bounce: 0.1, duration: 0.5 }}
        className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 rounded-t-3xl z-50 p-6 space-y-5 max-w-[414px] mx-auto shadow-2xl"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-slate-900 dark:text-white">Add New Event</h2>
          <button onClick={onClose} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500">
            <X size={18} />
          </button>
        </div>

        {submitted ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center gap-3 py-8"
          >
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <Calendar size={28} className="text-white" />
            </div>
            <p className="text-lg font-black text-slate-900 dark:text-white">Event Added! 🎉</p>
            <p className="text-sm text-slate-400 font-medium">Your event has been submitted</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Event Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Event Name</label>
              <input
                type="text"
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Rock Concert Night"
                required
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              />
            </div>

            {/* Category */}
            <div className="space-y-1.5">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Category</label>
              <select
                value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              >
                {['music', 'conference', 'sports', 'festival', 'workshop'].map(c => (
                  <option key={c} value={c} className="capitalize">{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div className="space-y-1.5">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                <Calendar size={11} /> Date
              </label>
              <input
                type="date"
                value={form.date}
                onChange={e => setForm({ ...form, date: e.target.value })}
                required
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              />
            </div>

            {/* Location */}
            <div className="space-y-1.5">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                <MapPin size={11} /> Location
              </label>
              <input
                type="text"
                value={form.location}
                onChange={e => setForm({ ...form, location: e.target.value })}
                placeholder="Venue name, city"
                required
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full h-13 bg-primary text-white rounded-2xl font-black text-sm py-4 flex items-center justify-center gap-2 shadow-lg shadow-primary/30"
            >
              <Plus size={18} />
              Submit Event
            </motion.button>
          </form>
        )}
      </motion.div>
    </>
  );
};

const BottomNav = () => {
  const location = useLocation();
  const { t } = useLanguage();
  const [showAddModal, setShowAddModal] = useState(false);

  const hideNav = ['/', '/login', '/signup'].some(path =>
    location.pathname === path
  ) || location.pathname.startsWith('/booking/') || location.pathname.startsWith('/event/');

  if (hideNav) return null;

  const navItems = [
    { icon: Home,    label: t('home'),    path: '/home'      },
    { icon: Compass, label: t('explore'), path: '/explore'   },
    { icon: Plus,    label: t('add'),     path: null, isCenter: true },
    { icon: Heart,   label: t('favorites'), path: '/favorites' },
    { icon: User,    label: t('profile'), path: '/profile'   },
  ];


  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center px-4 pb-5 pt-2 pointer-events-none">
        <div className="w-full max-w-[400px] h-16 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-around px-2 shadow-2xl pointer-events-auto border border-slate-100 dark:border-slate-800">
          {navItems.map((item) => {
            const Icon = item.icon;

            if (item.isCenter) {
              return (
                <motion.button
                  key="center-add"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowAddModal(true)}
                  className="relative -top-7 w-14 h-14 bg-primary text-white rounded-2xl shadow-xl flex items-center justify-center border-4 border-white dark:border-slate-900"
                >
                  <Plus size={26} strokeWidth={3} />
                </motion.button>
              );
            }

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `relative flex flex-col items-center gap-0.5 transition-all duration-300 py-2 px-3 rounded-xl ${
                    isActive ? 'text-primary' : 'text-slate-400 dark:text-slate-500'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                    {isActive && (
                      <motion.div
                        layoutId="activeNavDot"
                        className="absolute -bottom-0.5 w-1 h-1 bg-primary rounded-full"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                      />
                    )}
                    <span className={`text-[9px] font-black uppercase tracking-widest ${isActive ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
                      {item.label}
                    </span>
                  </>
                )}
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* Add Event Modal */}
      <AnimatePresence>
        {showAddModal && <AddEventModal onClose={() => setShowAddModal(false)} />}
      </AnimatePresence>
    </>
  );
};

export default BottomNav;
