import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Button from '../components/Button';

const SplashScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-end p-8 overflow-hidden animate-fadeIn">
      <motion.img
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        alt="Splash"
        className="absolute inset-0 w-full h-full object-cover scale-150 transform transition-transform duration-1000"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />
      
      <div className="z-10 w-full flex flex-col items-center gap-6 max-w-md animate-slideUp stagger-2">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center space-y-2"
        >
          <h1 className="text-5xl font-extrabold text-white leading-[1.2] drop-shadow-2xl">
            Discover Events <br /> 
            <span className="text-primary italic">Around You</span>
          </h1>
          <p className="text-slate-300 text-lg font-medium leading-relaxed max-w-[280px] mx-auto opacity-80 backdrop-blur-sm">
            Experience the world like never before with Wayana events.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="w-full flex justify-center pb-8"
        >
          <Button 
            variant="glass" 
            onClick={() => navigate('/login')} 
            className="w-full h-20 text-xl font-bold flex items-center justify-center gap-4 rounded-4xl group"
          >
            Explore Now
            <div className="p-2 bg-white/20 rounded-full group-hover:bg-primary transition-colors">
              <ChevronRight size={24} />
            </div>
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default SplashScreen;
