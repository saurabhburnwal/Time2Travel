import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

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
            {/* Public routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected routes — require authentication */}
            <Route path="/plan" element={<ProtectedRoute><TripPlanner /></ProtectedRoute>} />
            <Route path="/stay-selection" element={<ProtectedRoute><StaySelection /></ProtectedRoute>} />
            <Route path="/host-register" element={<ProtectedRoute><HostRegistration /></ProtectedRoute>} />
            <Route path="/roadmap-options" element={<ProtectedRoute><RoadmapOptions /></ProtectedRoute>} />
            <Route path="/itinerary" element={<ProtectedRoute><Itinerary /></ProtectedRoute>} />
            <Route path="/map-view" element={<ProtectedRoute><MapView /></ProtectedRoute>} />
            <Route path="/expense-breakdown" element={<ProtectedRoute><ExpenseBreakdown /></ProtectedRoute>} />
            <Route path="/final-review" element={<ProtectedRoute><FinalReview /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

            {/* Admin route — requires admin role */}
            <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
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
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
