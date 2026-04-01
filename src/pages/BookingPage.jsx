import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Check, Ticket, Users, CreditCard, X, Calendar, MapPin, Sparkles } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { EVENTS, TICKET_TYPES } from '../data/mockData';

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = EVENTS.find(e => e.id === parseInt(id));

  const [selectedTicket, setSelectedTicket] = useState(TICKET_TYPES[0].id);
  const [ticketCount, setTicketCount] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showQR, setShowQR] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);

  if (!event) return null;

  const toggleSeat = (seatId) => {
    setSelectedSeats(prev =>
      prev.includes(seatId) ? prev.filter(s => s !== seatId) : [...prev, seatId]
    );
  };

  const currentTicket = TICKET_TYPES.find(t => t.id === selectedTicket);
  const ticketPrice = currentTicket.price * event.price;
  const totalAmount = (ticketPrice * (selectedSeats.length || ticketCount)).toFixed(2);

  const handleConfirm = () => {
    setIsConfirming(true);
    setTimeout(() => {
        setIsConfirming(false);
        setShowQR(true);
    }, 1200);
  };

  const rows = ['A', 'B', 'C', 'D'];
  const cols = [1, 2, 3, 4, 5, 6];
  const occupied = ['B3', 'A5', 'C2', 'D4'];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F1A] pb-44 animate-fadeIn">

      {/* ─── DENSE HEADER ─── */}
      <header className="px-5 pt-10 pb-4 sticky top-0 bg-slate-50/80 dark:bg-[#0B0F1A]/80 backdrop-blur-2xl z-40 flex items-center gap-4 border-b border-transparent hover:border-slate-100 dark:hover:border-white/5">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate(-1)}
          className="w-10 h-10 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center text-slate-800 dark:text-white border border-slate-100 dark:border-white/5"
        >
          <ChevronLeft size={20} strokeWidth={3} />
        </motion.button>
        <div className="flex flex-col">
          <h1 className="text-lg font-black text-slate-800 dark:text-white leading-tight">Checkout</h1>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{event.title}</p>
        </div>
      </header>

      <main className="px-5 space-y-8 pt-4">

        {/* ─── COMPACT EVENT INFO ─── */}
        <div className="p-4 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-white/5 shadow-sm flex items-center gap-4">
           <img src={event.image} alt="" className="w-14 h-14 rounded-2xl object-cover ring-2 ring-primary/10 shadow-lg" />
           <div className="flex-1 min-w-0">
              <h3 className="text-sm font-black text-slate-800 dark:text-white line-clamp-1">{event.title}</h3>
              <div className="flex items-center gap-1 opacity-60 mt-1">
                 <Calendar size={10} className="text-primary" />
                 <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">{event.date}</span>
              </div>
           </div>
           <div className="text-right">
              <span className="text-[9px] font-black text-primary uppercase block mb-1">Standard</span>
              <p className="text-xl font-black text-slate-800 dark:text-white tracking-tighter">${event.price}</p>
           </div>
        </div>

        {/* ─── TICKET TYPES (GRID) ─── */}
        <section className="space-y-4">
           <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] px-1 flex items-center gap-2">
              <Ticket size={14} className="text-primary" /> Select Type
           </h2>
           <div className="grid grid-cols-1 gap-2.5">
              {TICKET_TYPES.map(type => (
                <button
                  key={type.id}
                  onClick={() => setSelectedTicket(type.id)}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all duration-300 ${
                    selectedTicket === type.id
                      ? 'border-primary bg-primary/5 dark:bg-primary/10 shadow-lg shadow-primary/5'
                      : 'border-slate-100 dark:border-white/5 bg-white dark:bg-slate-800/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl group-hover:scale-125 transition-transform">{type.icon}</span>
                    <div className="text-left">
                       <p className={`font-black text-xs uppercase tracking-widest ${selectedTicket === type.id ? 'text-primary' : 'text-slate-800 dark:text-slate-200'}`}>{type.name}</p>
                       <p className="text-[9px] text-slate-400 font-bold opacity-60 mt-0.5">{type.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-lg font-black text-slate-800 dark:text-white leading-none tracking-tighter">${(type.price * event.price).toFixed(0)}</p>
                    {selectedTicket === type.id && (
                      <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center text-white scale-110 shadow-lg shadow-primary/30">
                        <Check size={12} strokeWidth={4} />
                      </div>
                    )}
                  </div>
                </button>
              ))}
           </div>
        </section>

        {/* ─── SEAT SELECTOR (TIGHTER) ─── */}
        <section className="space-y-4">
           <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] px-1 flex items-center justify-between">
              <span className="flex items-center gap-2"><Users size={14} className="text-primary" /> Seats</span>
              <span className="text-[10px] font-black text-primary">{selectedSeats.length} Reserved</span>
           </h2>
           <div className="p-6 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-inner-xl space-y-6">
              {/* STAGE */}
              <div className="space-y-1.5 opacity-40">
                 <div className="w-full h-1 bg-primary/40 rounded-full blur-[1px]" />
                 <p className="text-center text-[8px] font-black uppercase text-slate-400 tracking-[0.3em]">Main Stage</p>
              </div>

              {/* GRID */}
              <div className="space-y-2">
                 {rows.map(row => (
                   <div key={row} className="flex items-center gap-2.5">
                      <span className="text-[8px] font-black text-slate-400 w-3 text-center">{row}</span>
                      <div className="flex-1 flex gap-2 justify-center">
                         {cols.map(col => {
                           const sId = `${row}${col}`;
                           const isOcc = occupied.includes(sId);
                           const isSel = selectedSeats.includes(sId);
                           return (
                             <motion.button
                               key={sId}
                               whileTap={{ scale: 0.8 }}
                               disabled={isOcc}
                               onClick={() => toggleSeat(sId)}
                               className={`w-8 h-8 rounded-lg text-[8px] font-black transition-all ${
                                 isOcc ? 'bg-slate-100 dark:bg-white/5 text-slate-300 opacity-30 cursor-not-allowed' :
                                 isSel ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-115 border-0' :
                                 'bg-slate-50 dark:bg-slate-800 text-slate-500 border border-slate-100 dark:border-white/5'
                               }`}
                             >
                               {sId}
                             </motion.button>
                           );
                         })}
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </section>

      </main>

      {/* ─── STICKY MINI-FOOTER ─── */}
      <div className="fixed bottom-0 left-0 right-0 p-4 z-50 bg-gradient-to-t from-slate-50 dark:from-[#0B0F1A] to-transparent">
        <div className="max-w-[380px] mx-auto bg-slate-900 rounded-3xl p-4 flex items-center justify-between shadow-2xl overflow-hidden group">
          <div className="flex flex-col pl-2">
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1 leading-none">Total Pay</span>
            <span className="text-2xl font-black text-white leading-none tracking-tighter">${totalAmount}</span>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleConfirm}
            disabled={isConfirming}
            className="bg-primary text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 shadow-lg shadow-primary/40 relative overflow-hidden"
          >
            {isConfirming ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <CreditCard size={18} />
                Confirm
              </>
            )}
          </motion.button>
          
          {/* Shine effect */}
          <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-30 blur-sm" />
        </div>
      </div>

      {/* QR MODAL (AESTHETIC) */}
      <AnimatePresence>
        {showQR && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-3xl animate-fadeIn">
             <motion.div
               initial={{ scale: 0.6, opacity: 0, y: 100 }}
               animate={{ scale: 1, opacity: 1, y: 0 }}
               className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-[3rem] p-8 flex flex-col items-center gap-6 relative shadow-2xl border border-white dark:border-white/10"
             >
                <div className="w-16 h-1 bg-slate-100 dark:bg-slate-800 rounded-full mb-2" />
                <div className="text-center space-y-1">
                   <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-none">Your Pass</h2>
                   <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Entry ID: 94827103</p>
                </div>

                <div className="p-6 bg-white rounded-[2.5rem] shadow-inner-xl border border-slate-50 relative group">
                   <QRCodeSVG value={`EVENT-${event.id}-${Date.now()}`} size={160} fgColor="#1FD3BA" />
                   <div className="absolute -top-3 -right-3 w-10 h-10 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/20 backdrop-blur-md">
                      <Sparkles size={20} />
                   </div>
                </div>

                <div className="w-full space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                   {[
                     { l: 'Event', v: event.title },
                     { l: 'Date', v: event.date },
                     { l: 'Ticket', v: currentTicket.name },
                     { l: 'Seats', v: selectedSeats.join(', ') || 'N/A' },
                   ].map(it => (
                     <div key={it.l} className="flex justify-between items-center">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{it.l}</span>
                        <span className="text-xs font-black text-slate-800 dark:text-white w-32 text-right truncate">{it.v}</span>
                     </div>
                   ))}
                </div>

                <button
                  onClick={() => navigate('/home')}
                  className="w-full h-14 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 mt-2"
                >
                  Return Home
                </button>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default BookingPage;
