/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Home, Pill, Calendar, PhoneCall } from 'lucide-react';
import { AppProvider, useApp } from './services/AppContext';
import { LoginScreen } from './features/auth/LoginScreen';
import { DashboardScreen } from './features/dashboard/DashboardScreen';
import { MedicineScreen } from './features/medicines/MedicineScreen';
import { AppointmentScreen } from './features/appointments/AppointmentScreen';
import { EmergencyScreen } from './features/emergency/EmergencyScreen';

function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/medicines', icon: Pill, label: 'Meds' },
    { path: '/appointments', icon: Calendar, label: 'Appts' },
    { path: '/emergency', icon: PhoneCall, label: 'SOS' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-pink-100 pb-safe pt-2 px-6 flex justify-between items-center z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.02)]">
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.path;
        const Icon = tab.icon;
        return (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            className="flex flex-col items-center p-2 relative"
          >
            <div className={`p-2 rounded-xl transition-colors ${isActive ? 'bg-pink-50 text-pink-500' : 'text-gray-400'}`}>
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            </div>
            <span className={`text-[10px] mt-1 font-medium transition-colors ${isActive ? 'text-pink-500' : 'text-gray-400'}`}>
              {tab.label}
            </span>
            {isActive && (
              <motion.div
                layoutId="bottom-nav-indicator"
                className="absolute -top-2 w-1 h-1 bg-pink-500 rounded-full"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  const { user } = useApp();

  if (!user) {
    return <LoginScreen />;
  }

  return (
    <div className="pb-24 min-h-screen bg-gray-50/50">
      <AnimatePresence mode="wait">
        {/* @ts-expect-error - React 19 types issue with react-router-dom Routes key prop */}
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageWrapper><DashboardScreen /></PageWrapper>} />
          <Route path="/medicines" element={<PageWrapper><MedicineScreen /></PageWrapper>} />
          <Route path="/appointments" element={<PageWrapper><AppointmentScreen /></PageWrapper>} />
          <Route path="/emergency" element={<PageWrapper><EmergencyScreen /></PageWrapper>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
      <BottomNav />
    </div>
  );
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="max-w-md mx-auto min-h-screen bg-gray-50/50"
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </AppProvider>
  );
}
