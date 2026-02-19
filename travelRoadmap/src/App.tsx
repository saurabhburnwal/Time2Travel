import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Landing from './pages/Landing';
import HowItWorks from './pages/HowItWorks';
import Login from './pages/Login';
import Register from './pages/Register';
import TripPlanner from './pages/TripPlanner';
import StaySelection from './pages/StaySelection';
import HostRegistration from './pages/HostRegistration';
import RoadmapOptions from './pages/RoadmapOptions';
import Itinerary from './pages/Itinerary';
import MapView from './pages/MapView';
import ExpenseBreakdown from './pages/ExpenseBreakdown';
import FinalReview from './pages/FinalReview';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';

function AppContent() {
  const location = useLocation();

  // Pages without standard footer (full-screen pages)
  const noFooterPages = ['/login', '/register'];
  const showFooter = !noFooterPages.includes(location.pathname);

  // Don't show navbar on login/register (they have their own layout)
  const noNavPages = ['/login', '/register'];
  const showNav = !noNavPages.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">
      {showNav && <Navbar />}

      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Landing />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/plan" element={<TripPlanner />} />
            <Route path="/stay-selection" element={<StaySelection />} />
            <Route path="/host-register" element={<HostRegistration />} />
            <Route path="/roadmap-options" element={<RoadmapOptions />} />
            <Route path="/itinerary" element={<Itinerary />} />
            <Route path="/map-view" element={<MapView />} />
            <Route path="/expense-breakdown" element={<ExpenseBreakdown />} />
            <Route path="/final-review" element={<FinalReview />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </AnimatePresence>
      </main>

      {showFooter && <Footer />}

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: '12px',
            background: '#1e293b',
            color: '#fff',
            fontSize: '14px',
            padding: '12px 20px',
          },
        }}
      />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
