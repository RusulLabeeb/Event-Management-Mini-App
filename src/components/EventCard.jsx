import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Heart, Clock } from 'lucide-react';
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
          className="flex gap-2 p-2 bg-white dark:bg-slate-800/60 backdrop-blur-xl rounded-xl items-center shadow-sm border border-slate-100 dark:border-white/5 w-full group overflow-hidden"
        >
          <div className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden">
            <ImageWithFallback src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
          <div className="flex flex-col gap-0 flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <span className="text-[7px] font-black text-teal-600 dark:text-teal-400 uppercase tracking-widest">{event.category}</span>
              <div className="flex items-center gap-0.5 bg-yellow-400/10 px-1 py-0.5 rounded-md border border-yellow-400/20">
                <Star className="text-yellow-500 fill-yellow-500" size={7} />
                <span className="text-[7px] font-black text-yellow-700 dark:text-yellow-400">{event.rating}</span>
              </div>
            </div>
            <h3 className="font-black text-slate-800 dark:text-white text-[12px] truncate leading-tight uppercase tracking-tight">{event.title}</h3>
            <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
              <MapPin size={8} className="text-teal-500" />
              <span className="text-[8px] truncate font-bold">{event.location}</span>
            </div>
            <div className="mt-1 flex items-center justify-between">
              <span className="font-black text-teal-600 dark:text-teal-400 text-[12px]">${event.price}</span>
              <span className="text-[7px] font-black text-slate-400 uppercase tracking-tighter">{event.duration}</span>
            </div>
          </div>
        </motion.div>
      </Link>
    );
  }

  const cardWidth = featured ? "w-[220px] md:w-[260px]" : "w-[180px] md:w-[220px]";
  const cardHeight = featured ? "h-[280px]" : "h-[240px]";

  return (
    <Link to={`/event/${event.id}`}>
      <motion.div 
        whileTap={{ scale: 0.95 }}
        className={`relative group ${cardWidth} ${cardHeight} rounded-[1.75rem] overflow-hidden shadow-lg transition-all duration-500 ring-1 ring-black/5 dark:ring-white/5`}
      >
        <ImageWithFallback 
          src={event.image} 
          alt={event.title} 
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90 transition-opacity" />
        
        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-center z-10">
          <div className="bg-black/30 backdrop-blur-md px-2 py-0.5 rounded-lg flex items-center gap-1 border border-white/10">
            <Star className="text-yellow-400 fill-yellow-400" size={10} />
            <span className="text-[10px] font-black text-white">{event.rating}</span>
          </div>
          <button 
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite(event.id);
            }}
            className={`p-2 rounded-lg backdrop-blur-md transition-all active:scale-75 shadow-lg border border-white/20 ${
              favorite ? 'bg-red-500 text-white' : 'bg-white/10 text-white hover:bg-white/30'
            }`}
          >
            <Heart size={14} fill={favorite ? 'currentColor' : 'none'} strokeWidth={2.5} className={favorite ? 'animate-heartBeat' : ''} />
          </button>
        </div>

        {/* Content Info */}
        <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-1.5 translate-y-1 group-hover:translate-y-0 transition-transform">
          <span className="w-fit px-2 py-0.5 rounded-md bg-teal-500/20 backdrop-blur-md border border-teal-500/30 text-[8px] font-black text-teal-400 uppercase tracking-widest">
            {event.category}
          </span>
          <div className="space-y-0">
            <h3 className="text-base font-black text-white leading-tight uppercase tracking-tight">{event.title}</h3>
            <div className="flex items-center gap-1 text-white/70">
              <MapPin size={10} className="text-teal-400" />
              <span className="text-[9px] font-black uppercase tracking-widest">{event.location}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-1 pt-2 border-t border-white/10">
            <div className="flex flex-col">
              <span className="text-[7px] text-white/40 uppercase font-black">Starting from</span>
              <span className="text-lg font-black text-white">${event.price}</span>
            </div>
            <div className="h-8 w-8 rounded-lg bg-teal-500 text-white flex items-center justify-center shadow-lg active:scale-90 transition-all">
               <span className="font-black text-base">+</span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};




export default EventCard;

