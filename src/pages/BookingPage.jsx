import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Check, Ticket, Users, CreditCard, X, QrCode } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { EVENTS, TICKET_TYPES } from '../data/mockData';
import Button from '../components/Button';

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = EVENTS.find(e => e.id === parseInt(id));

  const [selectedTicket, setSelectedTicket] = useState(TICKET_TYPES[0].id);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showQR, setShowQR] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  if (!event) return null;

  const toggleSeat = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const ticketPrice = TICKET_TYPES.find(t => t.id === selectedTicket).price * event.price;
  const totalAmount = ticketPrice * Math.max(1, selectedSeats.length);

  const handleConfirm = () => {
    setBookingConfirmed(true);
    setTimeout(() => {
        setShowQR(true);
    }, 1500);
  };

  const rows = ['A', 'B', 'C', 'D'];
  const cols = [1, 2, 3, 4, 5, 6];

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark pb-32 animate-fadeIn">
      {/* Header */}
      <header className="px-6 pt-12 pb-6 flex items-center justify-between sticky top-0 bg-bg-light/80 dark:bg-bg-dark/80 backdrop-blur-3xl z-40">
        <button 
          onClick={() => navigate(-1)}
          className="p-4 glass rounded-full shadow-lg active:scale-95 transition-all text-slate-800 dark:text-white"
        >
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Select Tickets</h2>
        <div className="w-12 h-12" /> {/* Spacer */}
      </header>

      <main className="px-6 space-y-10">
        {/* Event Summary Minor */}
        <div className="flex items-center gap-4 p-4 glass dark:glass-dark rounded-4xl border-white/20">
          <img src={event.image} alt="" className="w-16 h-16 rounded-2xl object-cover" />
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white">{event.title}</h3>
            <p className="text-xs text-slate-400 font-medium">{event.duration} • {event.location}</p>
          </div>
        </div>

        {/* Ticket Types */}
        <section className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            Ticket Type
            <Ticket size={20} className="text-primary-soft" />
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {TICKET_TYPES.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedTicket(type.id)}
                className={`flex items-center justify-between p-6 rounded-4xl border-2 transition-all duration-300 ${
                  selectedTicket === type.id
                    ? 'border-primary bg-primary/5 dark:bg-primary/10'
                    : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800/40'
                }`}
              >
                <div className="flex flex-col items-start gap-1">
                  <span className={`font-bold text-lg ${selectedTicket === type.id ? 'text-primary' : 'text-slate-800 dark:text-slate-200'}`}>
                    {type.name}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">{type.description}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xl font-extrabold text-slate-900 dark:text-white">
                    ${(type.price * event.price).toFixed(0)}
                  </span>
                  {selectedTicket === type.id && (
                    <div className="p-2 bg-primary text-white rounded-full shadow-glow">
                      <Check size={16} />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Seat Selection Mockup */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              Select Seats
              <Users size={20} className="text-primary-soft" />
            </h3>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{selectedSeats.length} Selected</span>
          </div>

          <div className="glass dark:glass-dark p-8 rounded-5xl border-white/20 shadow-xl space-y-8 flex flex-col items-center">
            {/* Stage/Screen */}
            <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700/50 rounded-full shadow-inner relative">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] uppercase font-bold text-slate-400 tracking-[0.3em]">Stage Area</div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-primary rounded-full blur-[2px] opacity-40 animate-pulse" />
            </div>

            <div className="grid grid-cols-6 gap-3">
              {rows.map(row => (
                cols.map(col => {
                  const seatId = `${row}${col}`;
                  const isSelected = selectedSeats.includes(seatId);
                  const isOccupied = (row === 'B' && col === 3) || (row === 'A' && col === 5);
                  
                  return (
                    <button
                      key={seatId}
                      disabled={isOccupied}
                      onClick={() => toggleSeat(seatId)}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-[10px] font-bold transition-all transform active:scale-75 ${
                        isOccupied 
                          ? 'bg-slate-100 dark:bg-slate-800 text-slate-300 dark:text-slate-600 cursor-not-allowed opacity-40' 
                          : isSelected
                            ? 'bg-primary text-white shadow-glow scale-110'
                            : 'bg-white dark:bg-slate-700/50 text-slate-400 dark:text-slate-500 border border-slate-100 dark:border-slate-600/50 hover:bg-slate-50 dark:hover:bg-slate-600'
                      }`}
                    >
                      {seatId}
                    </button>
                  );
                })
              ))}
            </div>

            <div className="flex gap-6 pt-4">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Available</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Selected</span>
                </div>
                <div className="flex items-center gap-2 opacity-50">
                    <div className="w-3 h-3 rounded-full bg-slate-200 dark:bg-slate-800" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Sold</span>
                </div>
            </div>
          </div>
        </section>
      </main>

      {/* Booking Summary Floating */}
      <div className="fixed bottom-0 left-0 right-0 p-8 z-50 pointer-events-none">
        <div className="max-w-md mx-auto pointer-events-auto">
          <AnimatePresence mode="wait">
            {!bookingConfirmed ? (
              <motion.div 
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                className="glass dark:glass-dark p-6 rounded-5xl border-white/20 shadow-2xl space-y-4 ring-1 ring-black/5 dark:ring-white/5"
              >
                <div className="flex justify-between items-center px-2">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest leading-none mb-1">Total Fee</span>
                    <span className="text-3xl font-extrabold text-slate-900 dark:text-white">${totalAmount}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs font-bold text-primary italic">{selectedSeats.length || 1} Ticket{selectedSeats.length !== 1 ? 's' : ''}</span>
                    <span className="text-[10px] text-slate-500 font-medium">Service fee included</span>
                  </div>
                </div>
                <Button 
                  onClick={handleConfirm}
                  disabled={selectedSeats.length === 0}
                  className="w-full h-20 text-xl font-extrabold rounded-4xl flex items-center justify-center gap-3 shadow-glow"
                >
                  <CreditCard size={24} />
                  Confirm Booking
                </Button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-primary p-8 rounded-5xl shadow-2xl text-center space-y-4"
              >
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                  <Check size={40} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Booking Confirmed!</h3>
                <p className="text-white/80 font-medium">Your tickets have been reserved. Preparing your digital pass...</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* QR Modal */}
      <AnimatePresence>
        {showQR && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-8 bg-black/60 backdrop-blur-xl transition-all">
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 100 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0, y: 100 }}
              className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-[3rem] p-10 flex flex-col items-center gap-8 relative shadow-[0_0_100px_rgba(46,196,182,0.3)]"
            >
              <button 
                onClick={() => navigate('/home')}
                className="absolute top-6 right-6 p-3 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500 transition-transform active:scale-75"
              >
                <X size={20} />
              </button>

              <div className="text-center space-y-2">
                <div className="w-16 h-1 w-12 bg-primary/20 rounded-full mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Your Digital Pass</h2>
                <p className="text-slate-400 font-medium text-sm">Scan this at the entrance</p>
              </div>

              <div className="p-8 bg-white dark:bg-slate-800 rounded-5xl shadow-inner border-2 border-slate-50 dark:border-slate-800 ring-1 ring-black/5 relative group">
                <QRCodeSVG 
                    value={`BOOKING-${event.id}-${Date.now()}`} 
                    size={200}
                    fgColor={selectedTicket === 'elite' ? '#2EC4B6' : '#0F172A'}
                    className="relative z-10"
                />
                <div className="absolute inset-0 bg-primary/5 rounded-5xl opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
              </div>

              <div className="w-full space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800/50">
                <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">Event</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white truncate max-w-[150px]">{event.title}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">Pass Type</span>
                    <span className="text-sm font-bold text-primary">{TICKET_TYPES.find(t => t.id === selectedTicket).name}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">Date</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">Oct 24, 2026</span>
                </div>
              </div>

              <Button 
                onClick={() => navigate('/home')}
                variant="primary" 
                className="w-full h-16 rounded-3xl"
              >
                Done
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BookingPage;
