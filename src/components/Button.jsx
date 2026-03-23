import React from 'react';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  className,
  disabled = false,
  type = 'button'
}) => {
  const variants = {
    primary: 'bg-gradient-to-r from-primary to-primary-soft text-white shadow-[0_10px_30px_-10px_rgba(46,196,182,0.4)] active:scale-95 border-none',
    secondary: 'bg-white/50 dark:bg-slate-800/50 text-slate-800 dark:text-white font-black uppercase tracking-widest text-[10px] shadow-sm active:scale-95 border border-slate-100 dark:border-white/5 backdrop-blur-xl',
    outline: 'border-2 border-primary/30 text-primary active:scale-95 hover:bg-primary/5 font-black uppercase tracking-widest text-[10px]',
    glass: 'bg-white/10 text-white font-black uppercase tracking-widest text-[10px] hover:bg-white/30 backdrop-blur-2xl active:scale-95 shadow-lg border border-white/20',
    ghost: 'bg-transparent text-primary hover:bg-primary/10 active:scale-90 font-black uppercase tracking-widest text-[10px]',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={twMerge(
        'px-8 py-5 rounded-[2rem] font-black transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-3',
        variants[variant],
        className
      )}
    >
      {children}
    </motion.button>
  );
};

export default Button;

