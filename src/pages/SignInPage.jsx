import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    navigate('/home');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white dark:bg-[#0F172A] p-8 flex flex-col justify-center relative overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl opacity-50" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl opacity-50" />

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative z-10 space-y-8"
      >
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-none">
            Welcome <br /> Back
          </h1>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Login to your account</p>
        </div>

        <form onSubmit={handleSignIn} className="space-y-4">
          <div className="space-y-4">
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-colors" size={18} />
              <input 
                type="email" 
                placeholder="Email Address"
                className="w-full h-14 pl-12 pr-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl text-sm font-bold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all"
                required
              />
            </div>

            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-colors" size={18} />
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Password"
                className="w-full h-14 pl-12 pr-12 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl text-sm font-bold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all"
                required
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-teal-500 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <button type="button" className="text-[10px] font-black text-teal-500 uppercase tracking-widest hover:underline">
              Forgot Password?
            </button>
          </div>

          <button 
            type="submit"
            className="w-full h-14 bg-teal-500 text-white rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl shadow-teal-500/20 flex items-center justify-center gap-2 active:scale-[0.98] transition-all hover:bg-teal-600"
          >
            Sign In
            <ArrowRight size={18} />
          </button>
        </form>

        <div className="pt-8 text-center space-y-4">
          <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter">
            Don't have an account? 
            <Link to="/signup" className="text-teal-500 ml-2 hover:underline">Sign Up</Link>
          </p>
          
          <div className="relative pt-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100 dark:border-white/5"></div>
            </div>
            <div className="relative flex justify-center text-[8px] uppercase font-black tracking-widest text-slate-400 bg-white dark:bg-[#0F172A] px-2">
              Or continue with
            </div>
          </div>

          <div className="flex gap-4">
            <button className="flex-1 h-12 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-100 dark:hover:bg-white/10 transition-all">
              <img src="https://www.google.com/favicon.ico" className="w-4 h-4 grayscale" alt="Google" />
            </button>
            <button className="flex-1 h-12 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-100 dark:hover:bg-white/10 transition-all">
              <img src="https://www.apple.com/favicon.ico" className="w-4 h-4 grayscale" alt="Apple" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SignInPage;
