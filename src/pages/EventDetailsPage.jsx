import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Heart, Star, MapPin, Clock, Info, Image as ImageIcon, MessageCircle, Share2, Users } from 'lucide-react';
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

  const tabs = [
    { id: 'details', label: 'Details', icon: <Info size={16} /> },
    { id: 'gallery', label: 'Gallery', icon: <ImageIcon size={16} /> },
    { id: 'reviews', label: 'Reviews', icon: <MessageCircle size={16} /> },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#0F172A] pb-32">
      {/* Premium Hero Section */}
      <section className="relative h-[45vh] w-full overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#0F172A] via-transparent to-black/20" />
        
        {/* Navigation Controls */}
        <div className="absolute top-8 left-4 right-4 flex items-center justify-between z-10">
          <button 
            onClick={() => navigate(-1)}
            className="h-9 w-9 bg-white/30 backdrop-blur-xl rounded-xl flex items-center justify-center border border-white/40 shadow-xl text-white active:scale-90 transition-all"
          >
            <ChevronLeft size={18} strokeWidth={3} />
          </button>
          <div className="flex gap-2">
            <button className="h-9 w-9 bg-white/30 backdrop-blur-xl rounded-xl flex items-center justify-center border border-white/40 shadow-xl text-white active:scale-90 transition-all">
              <Share2 size={14} strokeWidth={2.5} />
            </button>
            <button 
              onClick={() => toggleFavorite(event.id)}
              className={`h-9 w-9 backdrop-blur-xl rounded-xl flex items-center justify-center shadow-xl active:scale-90 transition-all border ${
                isFavorite(event.id) ? 'bg-red-500 border-transparent text-white' : 'bg-white/30 border-white/40 text-white'
              }`}
            >
              <Heart size={14} fill={isFavorite(event.id) ? 'currentColor' : 'none'} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Floating Title Card */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="absolute bottom-4 left-4 right-4 p-4 bg-white/95 dark:bg-slate-900/90 backdrop-blur-2xl rounded-2xl border border-slate-100 dark:border-white/5 shadow-xl"
        >
          <div className="space-y-2">
            <div className="flex justify-between items-start">
              <div className="space-y-0.5">
                <span className="px-2 py-0.5 rounded-md bg-teal-500/10 border border-teal-500/20 text-[7px] font-black uppercase tracking-widest text-teal-600 dark:text-teal-400">
                  {event.category}
                </span>
                <h1 className="text-lg font-black text-slate-900 dark:text-white leading-tight uppercase tracking-tight">
                  {event.title}
                </h1>
              </div>
              <div className="bg-yellow-400 px-2 py-0.5 rounded-lg flex items-center gap-1 shadow-md">
                <Star className="text-white fill-white" size={10} />
                <span className="font-black text-white text-[10px]">{event.rating}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4 pt-2 border-t border-slate-50 dark:border-white/5">
              <div className="flex items-center gap-1.5">
                <MapPin size={12} className="text-teal-500" />
                <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tighter">{event.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={12} className="text-teal-500" />
                <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tighter">{event.duration}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Experience Content */}
      <main className="px-6 mt-6 space-y-8 animate-slideUp">
        {/* Premium Tabs */}
        <div className="flex bg-slate-50 dark:bg-white/5 p-1 rounded-2xl border border-slate-100 dark:border-white/5">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 relative flex items-center justify-center gap-2 py-3 font-black text-[10px] uppercase tracking-widest transition-all rounded-xl ${
                activeTab === tab.id ? 'text-white' : 'text-slate-400'
              }`}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTabDetails"
                  className="absolute inset-0 bg-teal-500 shadow-md rounded-xl"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
              <span className="z-10">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Dynamic Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="min-h-[200px]"
          >
            {activeTab === 'details' && (
              <div className="space-y-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tighter uppercase">About</h3>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm font-medium">
                    {event.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5 space-y-1">
                    <Users size={16} className="text-teal-500 mb-1" />
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Group</p>
                    <p className="text-[10px] font-bold text-slate-700 dark:text-white">Up to 15 people</p>
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5 space-y-1">
                    <Star size={16} className="text-yellow-400 mb-1" />
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Guide</p>
                    <p className="text-[10px] font-bold text-slate-700 dark:text-white">Professional Expert</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'gallery' && (
              <div className="grid grid-cols-2 gap-3">
                {event.gallery.map((img, i) => (
                  <div 
                    key={i}
                    className={`rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-white/5 ${i === 0 ? 'col-span-2 h-48' : 'h-32'}`}
                  >
                    <ImageWithFallback src={img} alt="Gallery" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="p-6 bg-slate-50 dark:bg-white/5 rounded-3xl border border-slate-100 dark:border-white/5 flex items-center justify-around">
                  <div className="text-center">
                    <span className="text-4xl font-black text-slate-900 dark:text-white">{event.rating}</span>
                    <div className="flex text-yellow-400 mt-1 gap-0.5 justify-center">
                      <Star size={10} fill="currentColor" />
                    </div>
                  </div>
                  <div className="w-1/2 h-px bg-slate-200 dark:bg-white/10 rotate-90" />
                  <div className="text-center">
                    <span className="text-sm font-black text-slate-900 dark:text-white">{event.reviews}</span>
                    <p className="text-[8px] text-slate-400 font-black uppercase tracking-widest">Reviews</p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Premium Sticky Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 pb-6 z-50 bg-gradient-to-t from-white dark:from-[#0F172A] via-white/80 dark:via-[#0F172A]/80 to-transparent">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="max-w-[400px] mx-auto"
        >
          <div className="bg-slate-900 dark:bg-white p-3 px-5 rounded-2xl shadow-2xl flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <span className="text-[7px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-widest leading-none mb-1">Price per person</span>
              <span className="text-xl font-black text-white dark:text-slate-900 tracking-tighter">${event.price}</span>
            </div>
            <button 
              onClick={() => navigate(`/booking/${event.id}`)}
              className="px-8 h-10 bg-teal-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-teal-500/30 active:scale-95 transition-all"
            >
              Book Now
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};


export default EventDetailsPage;

