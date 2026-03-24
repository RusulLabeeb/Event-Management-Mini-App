import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Heart } from 'lucide-react';
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
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex gap-3 p-3 bg-white dark:bg-slate-800 rounded-2xl items-center shadow-sm border border-slate-200 dark:border-slate-700 w-full group overflow-hidden"
        >
          <div className="relative w-24 h-24 shrink-0 rounded-2xl overflow-hidden">
            <ImageWithFallback 
              src={event.image} 
              alt={event.title} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
            />
          </div>

          <div className="flex flex-col gap-1 flex-1 min-w-0">
            <div className="flex justify-between items-start gap-2">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm line-clamp-1">
                {event.title}
              </h3>
              <div className="flex items-center gap-0.5 bg-secondary/20 px-2 py-0.5 rounded-md flex-shrink-0">
                <Star size={12} className="fill-secondary text-secondary" />
                <span className="text-xs font-bold text-secondary">{event.rating}</span>
              </div>
            </div>

            <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
              <MapPin size={12} className="text-primary" />
              <span className="text-xs font-medium truncate">{event.location}</span>
            </div>

            <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 dark:border-slate-700">
              <span className="font-black text-primary text-base">${event.price}</span>
              <span className="text-xs font-medium text-slate-500">
                {event.duration}
              </span>
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite(event.id);
            }}
            className={`p-2 rounded-full transition-all flex-shrink-0 ${
              favorite 
                ? 'bg-red-500 text-white' 
                : 'bg-slate-100 dark:bg-slate-700 text-slate-400'
            }`}
          >
            <Heart size={16} fill={favorite ? 'currentColor' : 'none'} />
          </motion.button>
        </motion.div>
      </Link>
    );
  }

  // Vertical Card
  return (
    <Link to={`/event/${event.id}`}>
      <motion.div 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="relative w-full h-80 rounded-3xl overflow-hidden shadow-lg group cursor-pointer"
      >
        <ImageWithFallback 
          src={event.image} 
          alt={event.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Top Right: Rating Badge */}
        <motion.div 
          whileHover={{ scale: 1.1 }}
          className="absolute top-4 right-4 bg-secondary text-slate-900 rounded-full px-3 py-1.5 flex items-center gap-1 shadow-lg font-bold text-sm"
        >
          <Star size={14} className="fill-secondary" />
          {event.rating}
        </motion.div>

        {/* Top Left: Favorite Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.85 }}
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(event.id);
          }}
          className={`absolute top-4 left-4 p-2.5 rounded-full backdrop-blur-md transition-all shadow-lg ${
            favorite 
              ? 'bg-red-500 text-white' 
              : 'bg-white/20 text-white hover:bg-white/30'
          }`}
        >
          <Heart size={18} fill={favorite ? 'currentColor' : 'none'} />
        </motion.button>

        {/* Bottom Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5 text-white space-y-3">
          {/* Title */}
          <div>
            <h3 className="text-lg font-black leading-tight line-clamp-2">
              {event.title}
            </h3>
          </div>

          {/* Location and Price Row */}
          <div className="flex items-center justify-between pt-2 border-t border-white/20">
            <div className="flex items-center gap-1">
              <MapPin size={12} className="text-primary" />
              <span className="text-xs font-medium">{event.location}</span>
            </div>
            <span className="text-lg font-black text-secondary">${event.price}</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default EventCard;

