import React from 'react';
import { motion } from 'framer-motion';
import {
  Settings,
  ChevronRight,
  Moon,
  Sun,
  Edit3,
  Zap,
  Briefcase,
  Heart,
  Shield,
  HelpCircle,
  LogOut,
  Map,
  Compass
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const SectionItem = ({ icon: Icon, label, subtitle, color, onClick, rightElement }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center justify-between p-4 rounded-3xl hover:bg-slate-100 dark:hover:bg-white/5 transition-all duration-300 group"
  >
    <div className="flex items-center gap-4">
      <div className={`p-3 rounded-2xl ${color} shadow-sm group-hover:scale-110 transition-transform`}>
        <Icon size={20} />
      </div>
      <div className="text-left">
        <p className="font-bold text-slate-800 dark:text-white text-sm tracking-tight">{label}</p>
        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{subtitle}</p>
      </div>
    </div>
    {rightElement || <ChevronRight size={18} className="text-slate-300 group-hover:text-teal-500 group-hover:translate-x-1 transition-all" />}
  </button>
);

const ProfilePage = () => {
  const { darkMode, toggleDarkMode } = useAppContext();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white dark:bg-[#0F172A] pb-40 animate-fadeIn">
      {/* Header with Background Gradient */}
      <header className="relative pt-12 pb-6 px-6 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-48 gradient-premium opacity-10 dark:opacity-30" />
        <div className="relative flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-24 h-24 rounded-[2rem] overflow-hidden border-[3px] border-white dark:border-slate-800 shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80"
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute -bottom-1 -right-1 p-2 bg-teal-500 text-white rounded-xl shadow-lg active:scale-90 transition-transform">
              <Edit3 size={14} />
            </button>
          </div>

          <div className="text-center">
            <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center justify-center gap-2 tracking-tighter uppercase">
              Alex Rivera
              <Zap size={14} className="text-teal-500 fill-teal-500" />
            </h1>
            <p className="text-slate-400 font-black text-[8px] uppercase tracking-[0.3em]">Premium Explorer</p>
          </div>

          {/* Stats Bar */}
          <div className="flex gap-6 mt-2 pt-4 border-t border-slate-100 dark:border-slate-800 w-full justify-center">
            <div className="text-center">
              <p className="text-xs font-black text-slate-900 dark:text-white">12</p>
              <p className="text-[7px] text-slate-400 font-bold uppercase tracking-widest">Trips</p>
            </div>
            <div className="text-center border-x border-slate-100 dark:border-slate-800 px-6">
              <p className="text-xs font-black text-slate-900 dark:text-white">4.8k</p>
              <p className="text-[7px] text-slate-400 font-bold uppercase tracking-widest">Points</p>
            </div>
            <div className="text-center">
              <p className="text-xs font-black text-slate-900 dark:text-white">24</p>
              <p className="text-[7px] text-slate-400 font-bold uppercase tracking-widest">Reviews</p>
            </div>
          </div>
        </div>
      </header>

      <main className="px-6 space-y-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-white/5 active:scale-95 transition-all">
            <div className="h-8 w-8 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-500">
              <Map size={16} />
            </div>
            <span className="font-extrabold text-[10px] text-slate-800 dark:text-white uppercase tracking-tight">My Trips</span>
          </button>
          <button className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-white/5 active:scale-95 transition-all">
            <div className="h-8 w-8 bg-red-500/10 rounded-lg flex items-center justify-center text-red-500">
              <Heart size={16} />
            </div>
            <span className="font-extrabold text-[10px] text-slate-800 dark:text-white uppercase tracking-tight">Favorites</span>
          </button>
        </div>

        {/* Section: General */}
        <div className="space-y-3">
          <h3 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] px-2">Account</h3>
          <div className="bg-slate-50/50 dark:bg-slate-800/20 rounded-3xl border border-slate-100 dark:border-white/5 overflow-hidden p-1">
            <SectionItem
              icon={Sun}
              label="Appearance"
              subtitle="Theme Settings"
              color="bg-teal-500/10 text-teal-500"
              rightElement={
                <button onClick={toggleDarkMode} className={`w-10 h-5 rounded-full p-1 relative transition-colors ${darkMode ? 'bg-teal-500' : 'bg-slate-300'}`}>
                  <motion.div
                    layout
                    className={`h-3 w-3 bg-white rounded-full ${darkMode ? 'ml-auto' : 'ml-0'}`}
                  />
                </button>
              }
            />
            <SectionItem icon={Shield} label="Security" subtitle="Password & Privacy" color="bg-red-500/10 text-red-500" />
            <SectionItem icon={HelpCircle} label="Support" subtitle="Help & Feedback" color="bg-blue-500/10 text-blue-500" />
          </div>
        </div>

        {/* Sign Out */}
        <button
          onClick={() => navigate('/login')}
          className="w-full py-4 rounded-2xl border border-red-500/10 text-red-500 font-black text-[10px] uppercase tracking-[0.2em] active:bg-red-500 active:text-white transition-all"
        >
          Sign Out
        </button>
      </main>
    </div>
  );
};

export default ProfilePage;
