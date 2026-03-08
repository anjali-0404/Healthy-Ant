import React, { useState } from 'react';
import { useApp } from '../../services/AppContext';
import { CustomCard } from '../../widgets/CustomCard';
import { GradientButton } from '../../widgets/GradientButton';
import { Pill, CheckCircle2, Circle, Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function MedicineScreen() {
  const { medicines, addMedicine, toggleMedicineTaken } = useApp();
  const [isAdding, setIsAdding] = useState(false);
  const [newMed, setNewMed] = useState({ name: '', time: '', dosage: '' });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMed.name && newMed.time && newMed.dosage) {
      addMedicine(newMed);
      setIsAdding(false);
      setNewMed({ name: '', time: '', dosage: '' });
    }
  };

  return (
    <div className="p-6">
      <header className="flex justify-between items-center pt-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Medicines</h1>
        <button 
          onClick={() => setIsAdding(true)}
          className="w-10 h-10 bg-pink-100 text-pink-500 rounded-full flex items-center justify-center hover:bg-pink-200 transition-colors"
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
            <CustomCard className="border-pink-200 shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-gray-800">Add New Medicine</h2>
                <button onClick={() => setIsAdding(false)} className="text-gray-400 hover:text-gray-600">
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleAdd} className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Medicine Name"
                    value={newMed.name}
                    onChange={e => setNewMed({...newMed, name: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="time"
                    value={newMed.time}
                    onChange={e => setNewMed({...newMed, time: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Dosage (e.g. 1 Pill)"
                    value={newMed.dosage}
                    onChange={e => setNewMed({...newMed, dosage: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none"
                    required
                  />
                </div>
                <GradientButton type="submit" className="py-2.5">Save Reminder</GradientButton>
              </form>
            </CustomCard>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-4">
        {medicines.map((med) => (
          <CustomCard key={med.id} className={`transition-opacity ${med.taken ? 'opacity-60' : ''}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${med.taken ? 'bg-gray-100 text-gray-400' : 'bg-pink-50 text-pink-500'}`}>
                  <Pill size={24} />
                </div>
                <div>
                  <h3 className={`font-bold ${med.taken ? 'text-gray-500 line-through' : 'text-gray-900'}`}>{med.name}</h3>
                  <p className="text-sm text-gray-500">{med.dosage} • {med.time}</p>
                </div>
              </div>
              <button 
                onClick={() => toggleMedicineTaken(med.id)}
                className={`p-2 rounded-full transition-colors ${med.taken ? 'text-green-500' : 'text-gray-300 hover:text-pink-400'}`}
              >
                {med.taken ? <CheckCircle2 size={28} /> : <Circle size={28} />}
              </button>
            </div>
          </CustomCard>
        ))}
        {medicines.length === 0 && !isAdding && (
          <div className="text-center py-10 text-gray-400">
            <Pill size={48} className="mx-auto mb-4 opacity-20" />
            <p>No medicines added yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
