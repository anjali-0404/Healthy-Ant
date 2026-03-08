import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Medicine {
  id: string;
  name: string;
  time: string;
  dosage: string;
  taken: boolean;
}

export interface Appointment {
  id: string;
  doctorName: string;
  hospitalName: string;
  date: string;
}

interface AppState {
  user: { phone: string } | null;
  medicines: Medicine[];
  appointments: Appointment[];
  login: (phone: string) => void;
  logout: () => void;
  addMedicine: (med: Omit<Medicine, 'id' | 'taken'>) => void;
  toggleMedicineTaken: (id: string) => void;
  addAppointment: (app: Omit<Appointment, 'id'>) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{ phone: string } | null>(null);
  const [medicines, setMedicines] = useState<Medicine[]>([
    { id: '1', name: 'Paracetamol', time: '08:00', dosage: '1 Pill', taken: false },
    { id: '2', name: 'Vitamin C', time: '13:00', dosage: '1 Tablet', taken: true },
  ]);
  const [appointments, setAppointments] = useState<Appointment[]>([
    { id: '1', doctorName: 'Dr. Smith', hospitalName: 'City Hospital', date: '2026-03-10T10:00' },
  ]);

  const login = (phone: string) => setUser({ phone });
  const logout = () => setUser(null);

  const addMedicine = (med: Omit<Medicine, 'id' | 'taken'>) => {
    setMedicines([...medicines, { ...med, id: Date.now().toString(), taken: false }]);
  };

  const toggleMedicineTaken = (id: string) => {
    setMedicines(medicines.map(m => m.id === id ? { ...m, taken: !m.taken } : m));
  };

  const addAppointment = (app: Omit<Appointment, 'id'>) => {
    setAppointments([...appointments, { ...app, id: Date.now().toString() }]);
  };

  return (
    <AppContext.Provider value={{ user, medicines, appointments, login, logout, addMedicine, toggleMedicineTaken, addAppointment }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
