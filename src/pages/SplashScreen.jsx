import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Calendar, Sparkles, MapPin, Zap } from 'lucide-react';

const SplashScreen = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleStart = () => {
    setLoading(true);
    setTimeout(() => navigate('/login'), 800);
  };

  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-between p-8 overflow-hidden bg-slate-900">
      {/* ─── BACKGROUND LAYERS ─── */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 gradient-aurora opacity-40 blur-3xl pointer-events-none"
        />
        <div className="absolute inset-0 bg-slate-900/60 transition-all duration-1000 scale-125 hover:scale-100 pointer-events-none" />
      </div>

      {/* Floating Blobs */}
      <motion.div 
        animate={{ y: [0, -40, 0], x: [0, 20, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
        className="absolute -top-20 -right-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl"
      />
      <motion.div 
        animate={{ y: [0, 40, 0], x: [0, -20, 0] }}
        transition={{ duration: 9, repeat: Infinity }}
        className="absolute -bottom-20 -left-20 w-80 h-80 bg-accent/20 rounded-full blur-3xl"
      />

      {/* ─── HEADER AREA ─── */}
      <header className="relative z-10 w-full pt-16 flex flex-col items-center">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="px-6 py-3 bg-white/10 backdrop-blur-3xl border border-white/20 rounded-3xl flex items-center gap-3 shadow-2xl"
        >
          <div className="p-2 bg-primary rounded-xl shadow-[0_0_15px_rgba(31,211,186,0.6)]">
            <Sparkles size={16} className="text-white" />
          </div>
          <span className="text-white text-xs font-black uppercase tracking-[0.25em] leading-none">Premium Event Hub</span>
        </motion.div>
      </header>

      {/* ─── CENTER CONTENT ─── */}
      <main className="relative z-10 w-full max-w-md flex flex-col items-center text-center">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="space-y-6"
        >
          <div className="space-y-4">
            <h1 className="text-6xl md:text-7xl font-black text-white leading-none tracking-tighter drop-shadow-2xl">
              Elevate Your<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Vibe.</span>
            </h1>
            <p className="text-slate-300 text-lg font-medium leading-relaxed max-w-[300px] mx-auto opacity-70">
              The ultimate destination for music, tech, art, and world-class networking.
            </p>
          </div>

          <div className="flex gap-4 justify-center py-4">
            {[Zap, Calendar, MapPin].map((Icon, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1 + (i * 0.1), type: 'spring' }}
                className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10 animate-float"
                style={{ animationDelay: `${i * 1.5}s` }}
              >
                <Icon size={24} className={i === 0 ? 'text-primary' : 'text-white'} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>

      {/* ─── FOOTER ACTION ─── */}
      <footer className="relative z-10 w-full max-w-sm pb-16">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStart}
            disabled={loading}
            className="w-full h-20 bg-white text-slate-900 rounded-3xl font-black text-xl flex items-center justify-center gap-4 shadow-[0_20px_50px_rgba(0,0,0,0.4)] disabled:opacity-50 transition-all hover:bg-primary hover:text-white group relative overflow-hidden"
          >
            {loading ? (
              <div className="w-6 h-6 border-4 border-slate-900/30 border-t-slate-900 rounded-full animate-spin" />
            ) : (
              <>
                <span className="ml-8">Get Started</span>
                <div className="ml-auto mr-6 p-3 bg-slate-900/10 rounded-2xl group-hover:bg-white group-hover:text-primary transition-all duration-300">
                  <ChevronRight size={24} />
                </div>
              </>
            )}
            {/* Gloss shine effect */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-white opacity-20" />
          </motion.button>
          
          <div className="mt-8 flex items-center justify-center gap-6 text-slate-500 font-bold uppercase text-[10px] tracking-widest opacity-40">
             <span>Terms</span>
             <div className="w-1 h-1 bg-slate-500 rounded-full" />
             <span>Privacy</span>
             <div className="w-1 h-1 bg-slate-500 rounded-full" />
             <span>v2.0 PRO</span>
          </div>
        </motion.div>
      </footer>
    </div>
  );
};

export default SplashScreen;
