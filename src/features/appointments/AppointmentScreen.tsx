import React, { useState } from 'react';
import { useApp } from '../../services/AppContext';
import { CustomCard } from '../../widgets/CustomCard';
import { GradientButton } from '../../widgets/GradientButton';
import { Calendar, Plus, X, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { format } from 'date-fns';

export function AppointmentScreen() {
  const { appointments, addAppointment } = useApp();
  const [isAdding, setIsAdding] = useState(false);
  const [newAppt, setNewAppt] = useState({ doctorName: '', hospitalName: '', date: '' });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAppt.doctorName && newAppt.hospitalName && newAppt.date) {
      addAppointment(newAppt);
      setIsAdding(false);
      setNewAppt({ doctorName: '', hospitalName: '', date: '' });
    }
  };

  return (
    <div className="p-6">
      <header className="flex justify-between items-center pt-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
        <button 
          onClick={() => setIsAdding(true)}
          className="w-10 h-10 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center hover:bg-blue-100 transition-colors"
        >
          <Plus size={24} />
        </button>
      </header>

      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
            animate={{ opacity: 1, height: 'auto', marginBottom: 24 }}
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            className="overflow-hidden"
          >
            <CustomCard className="border-blue-200 shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-gray-800">New Appointment</h2>
                <button onClick={() => setIsAdding(false)} className="text-gray-400 hover:text-gray-600">
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleAdd} className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Doctor Name"
                    value={newAppt.doctorName}
                    onChange={e => setNewAppt({...newAppt, doctorName: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Hospital/Clinic Name"
                    value={newAppt.hospitalName}
                    onChange={e => setNewAppt({...newAppt, hospitalName: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                    required
                  />
                </div>
                <div>
                  <input
                    type="datetime-local"
                    value={newAppt.date}
                    onChange={e => setNewAppt({...newAppt, date: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                    required
                  />
                </div>
                <GradientButton type="submit" className="py-2.5 from-blue-400 to-blue-500">Save Appointment</GradientButton>
              </form>
            </CustomCard>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-4">
        {appointments.sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map((appt) => (
          <CustomCard key={appt.id}>
            <div className="flex gap-4">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex flex-col items-center justify-center text-blue-600 shrink-0">
                <span className="text-xs font-semibold uppercase">{format(new Date(appt.date), 'MMM')}</span>
                <span className="text-xl font-bold leading-none my-0.5">{format(new Date(appt.date), 'dd')}</span>
                <span className="text-[10px] font-medium">{format(new Date(appt.date), 'EEE')}</span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-lg">{appt.doctorName}</h3>
                <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-1">
                  <MapPin size={14} className="text-gray-400" />
                  <span>{appt.hospitalName}</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-1">
                  <Calendar size={14} className="text-gray-400" />
                  <span>{format(new Date(appt.date), 'h:mm a')}</span>
                </div>
              </div>
            </div>
          </CustomCard>
        ))}
        {appointments.length === 0 && !isAdding && (
          <div className="text-center py-10 text-gray-400">
            <Calendar size={48} className="mx-auto mb-4 opacity-20" />
            <p>No upcoming appointments.</p>
          </div>
        )}
      </div>
    </div>
  );
}
