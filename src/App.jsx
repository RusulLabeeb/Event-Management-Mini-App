import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Context
import { AppProvider } from './context/AppContext';

// Components
import BottomNav from './components/BottomNav';

// Pages
import SplashScreen from './pages/SplashScreen';
import HomePage from './pages/HomePage';
import EventDetailsPage from './pages/EventDetailsPage';
import BookingPage from './pages/BookingPage';
import ExplorePage from './pages/ExplorePage';
import FavoritesPage from './pages/FavoritesPage';
import ProfilePage from './pages/ProfilePage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <AppProvider>
      <Router>
        <ScrollToTop />
        <div className="max-w-[414px] mx-auto relative bg-slate-50 dark:bg-[#0F172A] min-h-screen shadow-2xl ring-1 ring-slate-100 dark:ring-white/5 flex flex-col overflow-hidden">
          <main className="flex-1">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<SplashScreen />} />
                <Route path="/login" element={<SignInPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/explore" element={<ExplorePage />} />
                <Route path="/add" element={<ExplorePage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/event/:id" element={<EventDetailsPage />} />
                <Route path="/booking/:id" element={<BookingPage />} />
              </Routes>
            </AnimatePresence>
          </main>
          <BottomNav />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
