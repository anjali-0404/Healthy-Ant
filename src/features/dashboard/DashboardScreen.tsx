import { useApp } from '../../services/AppContext';
import { CustomCard } from '../../widgets/CustomCard';
import { Bell, Calendar, Pill, ChevronRight, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

export function DashboardScreen() {
  const { user, medicines, appointments } = useApp();
  const navigate = useNavigate();

  const nextMedicine = medicines.find(m => !m.taken);
  const nextAppointment = appointments.length > 0 ? appointments[0] : null;

  return (
    <div className="p-6 space-y-6">
      <header className="flex justify-between items-center pt-4">
        <div>
          <p className="text-gray-500 text-sm">Good morning,</p>
          <h1 className="text-2xl font-bold text-gray-900">User {user?.phone.slice(-4)}</h1>
        </div>
        <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center text-pink-500">
          <User size={24} />
        </div>
      </header>

      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <Bell size={20} className="text-pink-500" /> Next Reminder
        </h2>
        {nextMedicine ? (
          <CustomCard onClick={() => navigate('/medicines')} className="bg-gradient-to-br from-pink-500 to-pink-400 border-none !p-6">
            <div className="flex justify-between items-start text-white">
              <div>
                <p className="text-pink-100 text-sm font-medium mb-1">Time to take</p>
                <h3 className="text-2xl font-bold mb-1">{nextMedicine.name}</h3>
                <p className="text-pink-50">{nextMedicine.dosage}</p>
              </div>
              <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
                <Pill size={24} className="text-white" />
              </div>
            </div>
            <div className="mt-6 flex items-center gap-2 text-white/90 text-sm font-medium bg-white/10 w-fit px-3 py-1.5 rounded-lg">
              <Bell size={14} /> {nextMedicine.time}
            </div>
          </CustomCard>
        ) : (
          <CustomCard className="text-center py-8">
            <p className="text-gray-500">No upcoming medicines today.</p>
          </CustomCard>
        )}
      </section>

      <section>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Calendar size={20} className="text-blue-500" /> Upcoming Appointment
          </h2>
          <button onClick={() => navigate('/appointments')} className="text-sm text-pink-500 font-medium flex items-center">
            See all <ChevronRight size={16} />
          </button>
        </div>
        
        {nextAppointment ? (
          <CustomCard onClick={() => navigate('/appointments')}>
            <div className="flex gap-4">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex flex-col items-center justify-center text-blue-600">
                <span className="text-xs font-semibold uppercase">{format(new Date(nextAppointment.date), 'MMM')}</span>
                <span className="text-lg font-bold leading-none">{format(new Date(nextAppointment.date), 'dd')}</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{nextAppointment.doctorName}</h3>
                <p className="text-sm text-gray-500">{nextAppointment.hospitalName}</p>
                <p className="text-xs text-gray-400 mt-1">{format(new Date(nextAppointment.date), 'h:mm a')}</p>
              </div>
            </div>
          </CustomCard>
        ) : (
          <CustomCard className="text-center py-6">
            <p className="text-gray-500 text-sm">No upcoming appointments.</p>
          </CustomCard>
        )}
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-4">
          <CustomCard onClick={() => navigate('/medicines')} className="flex flex-col items-center justify-center py-6 gap-3">
            <div className="w-12 h-12 bg-pink-50 rounded-full flex items-center justify-center text-pink-500">
              <Pill size={24} />
            </div>
            <span className="font-medium text-gray-800">Add Medicine</span>
          </CustomCard>
          <CustomCard onClick={() => navigate('/emergency')} className="flex flex-col items-center justify-center py-6 gap-3">
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center text-red-500">
              <Bell size={24} />
            </div>
            <span className="font-medium text-gray-800">Emergency</span>
          </CustomCard>
        </div>
      </section>
    </div>
  );
}
