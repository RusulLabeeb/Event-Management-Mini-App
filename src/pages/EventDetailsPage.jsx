import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Heart, Star, MapPin, Clock, Image as ImageIcon, MessageCircle, Share2, Users, ChevronRight } from 'lucide-react';
import { EVENTS } from '../data/mockData';
import { useAppContext } from '../context/AppContext';
import Button from '../components/Button';

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

const EventDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useAppContext();
  const [activeTab, setActiveTab] = useState('details');

  const event = EVENTS.find(e => e.id === parseInt(id));

  if (!event) return (
    <div className="h-screen flex items-center justify-center bg-bg-light dark:bg-bg-dark text-slate-400 font-black text-2xl">
      Place not found
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-[#0F172A] pb-32">
      {/* Hero Banner Section */}
      <section className="relative h-80 w-full overflow-hidden bg-gradient-to-br from-blue-400 to-primary">
        <motion.div
           initial={{ scale: 1.1 }}
           animate={{ scale: 1 }}
           transition={{ duration: 1.5, ease: "easeOut" }}
           className="w-full h-full"
        >
          <ImageWithFallback
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60" />
        
        {/* Navigation Controls */}
        <div className="absolute top-8 left-4 right-4 flex items-center justify-between z-10">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(-1)}
            className="h-10 w-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 shadow-lg text-white"
          >
            <ChevronLeft size={20} strokeWidth={3} />
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => toggleFavorite(event.id)}
            className={`h-10 w-10 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg border transition-all ${
              isFavorite(event.id) ? 'bg-red-500 border-transparent text-white' : 'bg-white/20 border-white/40 text-white'
            }`}
          >
            <Heart size={20} fill={isFavorite(event.id) ? 'currentColor' : 'none'} />
          </motion.button>
        </div>
      </section>

      {/* Title and Info Card */}
      <section className="px-5 -mt-10 relative z-20 space-y-5">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-white dark:bg-slate-800/80 rounded-3xl p-6 shadow-xl border border-slate-200 dark:border-slate-700 space-y-4"
        >
          {/* Title and Rating */}
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1 space-y-2">
              <h1 className="text-3xl font-black text-slate-900 dark:text-white">
                {event.title}
              </h1>
              <div className="flex items-center gap-1 text-sm">
                <MapPin size={14} className="text-slate-400" />
                <span className="text-slate-600 dark:text-slate-400">{event.location}</span>
              </div>
            </div>
            <div className="bg-yellow-300 rounded-full w-14 h-14 flex flex-col items-center justify-center shadow-lg">
              <Star size={18} className="text-white fill-white" />
              <span className="font-black text-white text-sm">{event.rating}k</span>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
            <div className="flex flex-col items-center gap-1 py-2">
              <Clock size={20} className="text-primary" />
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400 text-center">{event.duration}</span>
              <span className="text-[10px] font-black text-slate-400 uppercase">Duration</span>
            </div>
            <div className="flex flex-col items-center gap-1 py-2">
              <MapPin size={20} className="text-primary" />
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400 text-center">{event.distance}</span>
              <span className="text-[10px] font-black text-slate-400 uppercase">Distance</span>
            </div>
            <div className="flex flex-col items-center gap-1 py-2">
              <Star size={20} className="text-yellow-400 fill-yellow-400" />
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400 text-center">{event.reviews}</span>
              <span className="text-[10px] font-black text-slate-400 uppercase">Reviews</span>
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex gap-2 border-b border-slate-200 dark:border-slate-700">
          {['Details', 'Route List', 'Reviews'].map((tab, i) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`pb-4 font-bold text-sm transition-colors relative ${
                activeTab === i ? 'text-primary' : 'text-slate-400'
              }`}
            >
              {tab}
              {activeTab === i && (
                <motion.div
                  layoutId="underline"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </section>

      {/* Content Section */}
      <main className="px-5 space-y-6 py-6">
        <AnimatePresence mode="wait">
          {activeTab === 0 && (
            <motion.div
              key="details"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <h3 className="text-lg font-black text-slate-900 dark:text-white">About Destination</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {event.description}
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-black text-slate-900 dark:text-white">Gallery</h3>
                <div className="grid grid-cols-2 gap-3">
                  {event.gallery?.slice(0, 4).map((img, i) => (
                    <div 
                      key={i}
                      className="rounded-2xl overflow-hidden h-32 bg-slate-200 dark:bg-slate-700"
                    >
                      <ImageWithFallback 
                        src={img} 
                        alt="Gallery" 
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" 
                      />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 1 && (
            <motion.div
              key="route"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-6 border border-primary/20 space-y-3">
                <h3 className="font-black text-slate-900 dark:text-white">Route Information</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">Starting Point</p>
                      <p className="text-slate-600 dark:text-slate-400 text-xs">Main city center</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">Highlights</p>
                      <p className="text-slate-600 dark:text-slate-400 text-xs">Multiple scenic stops along the way</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">Ending Point</p>
                      <p className="text-slate-600 dark:text-slate-400 text-xs">Destination viewpoint</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 2 && (
            <motion.div
              key="reviews"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="flex gap-4 items-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                <div className="text-center">
                  <span className="text-4xl font-black text-slate-900 dark:text-white block">{event.rating}</span>
                  <div className="flex gap-1 justify-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{event.reviews}k reviews</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Excellent destination rating</p>
                </div>
              </div>

              <div className="space-y-3">
                {['Amazing experience!', 'Worth every penny', 'Highly recommended'].map((text, i) => (
                  <div key={i} className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                    <p className="text-xs font-bold text-slate-900 dark:text-white mb-1">⭐⭐⭐⭐⭐</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Sticky Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-5 z-50 bg-gradient-to-t from-white dark:from-[#0F172A] via-white/80 dark:via-[#0F172A]/80 to-transparent">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="max-w-[400px] mx-auto"
        >
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(`/booking/${event.id}`)}
            className="w-full bg-gradient-teal text-white font-black py-4 rounded-3xl flex items-center justify-center gap-2 shadow-lg shadow-primary/40 active:scale-95 transition-all text-lg"
          >
            <span>Start your trip</span>
            <ChevronRight size={20} />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default EventDetailsPage;

