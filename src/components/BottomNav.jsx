import React from 'react';
import { Home, Compass, Plus, Heart, User } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const BottomNav = () => {
  const location = useLocation();
  const hideNav = ['/', '/login', '/signup', '/booking'].some(path => 
    location.pathname === path || location.pathname.startsWith('/booking/') || location.pathname.startsWith('/event/')
  );

  if (hideNav) return null;

  const navItems = [
    { icon: Home, label: 'Home', path: '/home' },
    { icon: Compass, label: 'Explore', path: '/explore' },
    { icon: Plus, label: 'Add', path: '/add', isCenter: true },
    { icon: Heart, label: 'Saved', path: '/favorites' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center p-4 pb-6 pointer-events-none">
      <div className="w-full max-w-[400px] h-16 glass dark:glass-dark rounded-[1.75rem] flex items-center justify-around px-2 shadow-2xl pointer-events-auto border border-white/40 dark:border-white/5 ring-1 ring-black/5 dark:ring-white/5 relative">
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          
          if (item.isCenter) {
            return (
              <NavLink 
                key="center-add" 
                to={item.path}
                className="relative -top-8 transition-transform active:scale-95 group"
              >
                <motion.div 
                   whileHover={{ scale: 1.1, rotate: 90 }}
                   whileTap={{ scale: 0.9 }}
                   className="h-14 w-14 gradient-teal text-white rounded-2xl shadow-xl flex items-center justify-center border-4 border-slate-50 dark:border-[#0F172A] transition-all"
                >
                  <Icon size={28} strokeWidth={3} />
                </motion.div>
              </NavLink>
            );
          }

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `relative flex flex-col items-center gap-0.5 transition-all duration-300 py-1.5 px-3 rounded-xl ${
                  isActive ? 'text-teal-500' : 'text-slate-400 dark:text-slate-500'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                  {isActive && (
                    <motion.div
                      layoutId="activeTabDot"
                      className="absolute -bottom-0.5 w-1 h-1 bg-teal-500 rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className={`text-[7px] font-black uppercase tracking-widest ${isActive ? 'opacity-100' : 'opacity-0 h-0 w-0'}`}>
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;


