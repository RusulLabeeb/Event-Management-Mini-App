import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Heart, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const ImageWithFallback = ({ src, alt, className }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const fallback = "https://picsum.photos/id/1015/800/600";

  React.useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <img 
      src={imgSrc} 
      alt={alt} 
      className={className} 
      onError={() => setImgSrc(fallback)}
      loading="lazy"
    />
  );
};

const EventCard = ({ event, horizontal = false, featured = false }) => {
  const { isFavorite, toggleFavorite } = useAppContext();
  const favorite = isFavorite(event.id);

  if (horizontal) {
    return (
      <Link to={`/event/${event.id}`}>
        <motion.div 
          whileTap={{ scale: 0.98 }}
          className="flex gap-5 p-3 bg-white dark:bg-slate-900/40 backdrop-blur-3xl rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-2xl shadow-slate-200/40 dark:shadow-none hover:border-primary/20 transition-all group relative overflow-hidden"
        >
          {/* Subtle Glow Background */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[50px] -z-10 rounded-full" />
          
          <div className="relative w-32 h-32 shrink-0 rounded-[1.75rem] overflow-hidden shadow-xl ring-4 ring-slate-50 dark:ring-white/5">
            <ImageWithFallback 
              src={event.image} 
              alt={event.title} 
              className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-1000 ease-out" 
            />
            {/* Price Overlay */}
            <div className="absolute bottom-2 right-2 bg-primary text-white text-[10px] font-black uppercase tracking-tighter px-2.5 py-1.5 rounded-xl shadow-lg">
              ${event.price}
            </div>
          </div>

          <div className="flex flex-col flex-1 min-w-0 pr-2 py-2">
            <div className="flex flex-col gap-1 mb-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] opacity-80">{event.category}</span>
                <div className="w-1 h-1 bg-slate-300 dark:bg-white/20 rounded-full" />
                <div className="flex items-center gap-1 text-yellow-500 text-[10px] font-black">
                  <Star size={10} className="fill-current" />
                  {event.rating}
                </div>
              </div>
              <h3 className="font-black text-slate-800 dark:text-white text-lg line-clamp-1 tracking-tighter leading-tight group-hover:text-primary transition-colors">
                {event.title}
              </h3>
            </div>

            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-3">
              <div className="p-1.5 bg-slate-100 dark:bg-white/5 rounded-lg">
                <MapPin size={10} className="text-primary" />
              </div>
              <span className="text-xs font-bold truncate tracking-tight">{event.location}</span>
            </div>

            <div className="mt-auto flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Schedule</span>
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-300">
                  <Calendar size={10} className="opacity-50" />
                  <span className="text-[10px] font-black tracking-tight uppercase">{event.date.split(',')[0]}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  onClick={(e) => {
                    e.preventDefault();
                    toggleFavorite(event.id);
                  }}
                  className={`p-2.5 rounded-xl border transition-all ${
                    favorite 
                      ? 'bg-red-500 border-red-500 text-white shadow-lg shadow-red-500/30' 
                      : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-white/10 text-slate-400 hover:border-primary/30'
                  }`}
                >
                  <Heart size={14} fill={favorite ? 'currentColor' : 'none'} />
                </motion.button>
                
                <div className="p-2.5 bg-primary/10 text-primary rounded-xl group-hover:bg-primary group-hover:text-white transition-all border border-primary/5">
                  <ArrowRight size={14} />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    );
  }

  // Premium Vertical Card
  return (
    <Link to={`/event/${event.id}`}>
      <motion.div 
        whileTap={{ scale: 0.98 }}
        className="relative w-full h-[420px] rounded-[2.5rem] overflow-hidden shadow-2xl group cursor-pointer border border-white/10"
      >
        <ImageWithFallback 
          src={event.image} 
          alt={event.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" 
        />

        {/* Improved Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/5" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent opacity-60" />

        {/* Top Badges */}
        <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
          <div className="flex gap-2">
            <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl">
              {event.category}
            </span>
            <div className="bg-yellow-400 text-white px-3 py-2 rounded-xl flex items-center gap-1.5 shadow-xl font-black text-xs">
              <Star size={12} className="fill-current" />
              {event.rating}
            </div>
          </div>
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite(event.id);
            }}
            className={`p-3 rounded-2xl backdrop-blur-md border transition-all ${
              favorite 
                ? 'bg-red-500 border-transparent text-white shadow-lg shadow-red-500/40' 
                : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
            }`}
          >
            <Heart size={18} fill={favorite ? 'currentColor' : 'none'} />
          </motion.button>
        </div>

        {/* Bottom Content Area */}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white space-y-4">
          <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
            <h3 className="text-2xl font-black leading-tight tracking-tighter mb-2 group-hover:text-primary transition-colors">
              {event.title}
            </h3>
            
            <div className="flex items-center gap-2 text-white/70 mb-4">
              <MapPin size={14} className="text-primary" />
              <span className="text-sm font-bold opacity-90">{event.location}</span>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-black tracking-[0.2em] opacity-60 leading-none mb-1.5">Price Starts</span>
                <span className="text-2xl font-black text-primary leading-none">${event.price}</span>
              </div>
              <div className="h-12 w-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <ArrowRight size={20} />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default EventCard;
