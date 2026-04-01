import React from 'react';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

/**
 * Premium Button Component
 * Supports multiple variants with high-end hover effects and animations.
 */
const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  className,
  disabled = false,
  type = 'button',
  loading = false,
}) => {
  
  const baseStyles = 'px-8 py-4.5 rounded-2xl font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm tracking-tight active:scale-[0.98]';
  
  const variants = {
    primary: 'bg-primary text-white shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 btn-hover-glow',
    secondary: 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700',
    outline: 'border-2 border-primary/30 text-primary hover:bg-primary/5 hover:border-primary',
    glass: 'bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 shadow-lg',
    ghost: 'bg-transparent text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors',
    danger: 'bg-red-500 text-white shadow-xl shadow-red-500/20 hover:shadow-red-500/40',
    dark: 'bg-slate-900 text-white shadow-xl shadow-slate-900/20 hover:bg-slate-800',
  };

  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={twMerge(
        baseStyles,
        variants[variant],
        className
      )}
    >
      {loading ? (
        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : children}
    </motion.button>
  );
};

export default Button;
