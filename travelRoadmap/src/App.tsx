import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ProtectedRoute, AdminRoute, HostRoute } from './components/ProtectedRoute';

// Pages
import Landing from './pages/Landing';
import HowItWorks from './pages/HowItWorks';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Register from './pages/Register';
import VerifyEmail from './pages/VerifyEmail';
import EmailVerified from './pages/EmailVerified';
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
import AdminProfile from './pages/AdminProfile';
import HostDashboard from './pages/HostDashboard';
import HostProperties from './pages/HostProperties';
import HostGuests from './pages/HostGuests';
import HostEarnings from './pages/HostEarnings';
import HostReviews from './pages/HostReviews';
import HostAvailability from './pages/HostAvailability';
import HostFeedback from './pages/HostFeedback';

function AppContent() {
  const location = useLocation();

  // Pages without standard footer (full-screen pages)
  const noFooterPages = ['/login', '/register', '/verify-email', '/email-verified', '/admin', '/admin/profile', '/forgot-password'];
  const showFooter = !noFooterPages.includes(location.pathname);

  // Don't show navbar on login/register (they have their own layout). Admin has sidebar.
  const noNavPages = ['/login', '/register', '/verify-email', '/email-verified', '/admin', '/admin/profile', '/forgot-password'];
  const showNav = !noNavPages.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">
      {showNav && <Navbar />}

      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* ── Public routes ──────────────────────────────── */}
            <Route path="/" element={<Landing />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/email-verified" element={<EmailVerified />} />

            {/* ── Protected routes (login required) ──────────── */}
            <Route element={<ProtectedRoute />}>
              <Route path="/plan" element={<TripPlanner />} />
              <Route path="/stay-selection" element={<StaySelection />} />
              <Route path="/host-register" element={<HostRegistration />} />
              <Route path="/roadmap-options" element={<RoadmapOptions />} />
              <Route path="/itinerary" element={<Itinerary />} />
              <Route path="/map-view" element={<MapView />} />
              <Route path="/expense-breakdown" element={<ExpenseBreakdown />} />
              <Route path="/final-review" element={<FinalReview />} />
              <Route path="/host-feedback/:roadmapId" element={<HostFeedback />} />
              <Route path="/profile" element={<Profile />} />
            </Route>

            {/* ── Admin-only routes ───────────────────────────── */}
            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/profile" element={<AdminProfile />} />
            </Route>

            {/* ── Host-only routes ───────────────────────────── */}
            <Route element={<HostRoute />}>
              <Route path="/host-dashboard" element={<HostDashboard />} />
              <Route path="/host-properties" element={<HostProperties />} />
              <Route path="/host-guests" element={<HostGuests />} />
              <Route path="/host-earnings" element={<HostEarnings />} />
              <Route path="/host-reviews" element={<HostReviews />} />
              <Route path="/host-availability" element={<HostAvailability />} />
            </Route>
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
