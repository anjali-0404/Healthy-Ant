import React, { useState } from 'react';
import { motion } from 'motion/react';
import { HeartPulse } from 'lucide-react';
import { useApp } from '../../services/AppContext';
import { GradientButton } from '../../widgets/GradientButton';
import { CustomCard } from '../../widgets/CustomCard';

export function LoginScreen() {
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const { login } = useApp();

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 10) {
      setOtpSent(true);
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 4) {
      login(phone);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm"
      >
        <div className="flex flex-col items-center mb-10">
          <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mb-4">
            <HeartPulse size={40} className="text-pink-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">HospitalCare</h1>
          <p className="text-gray-500 text-center">Your personal healthcare reminder and companion.</p>
        </div>

        <CustomCard>
          {!otpSent ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">+1</span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\\D/g, '').slice(0, 10))}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
              </div>
              <GradientButton type="submit" disabled={phone.length < 10}>
                Send OTP
              </GradientButton>
            </form>
          ) : (
            <motion.form
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onSubmit={handleVerifyOtp}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Enter OTP</label>
                <p className="text-xs text-gray-500 mb-3">Sent to +1 {phone}</p>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\\D/g, '').slice(0, 4))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all text-center tracking-widest text-lg font-semibold"
                  placeholder="••••"
                  required
                />
              </div>
              <GradientButton type="submit" disabled={otp.length < 4}>
                Verify & Login
              </GradientButton>
              <button
                type="button"
                onClick={() => setOtpSent(false)}
                className="w-full text-sm text-pink-500 font-medium mt-2"
              >
                Change Phone Number
              </button>
            </motion.form>
          )}
        </CustomCard>
      </motion.div>
    </div>
  );
}
