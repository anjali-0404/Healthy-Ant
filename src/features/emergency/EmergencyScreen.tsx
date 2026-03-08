import { CustomCard } from '../../widgets/CustomCard';
import { Phone, Ambulance, Stethoscope, Store } from 'lucide-react';
import { motion } from 'motion/react';

export function EmergencyScreen() {
  const contacts = [
    {
      title: 'Call Ambulance',
      number: '108',
      icon: Ambulance,
      color: 'bg-red-500',
      lightColor: 'bg-red-50',
      textColor: 'text-red-500',
    },
    {
      title: 'Hospital Reception',
      number: '+1 234 567 8900',
      icon: Stethoscope,
      color: 'bg-blue-500',
      lightColor: 'bg-blue-50',
      textColor: 'text-blue-500',
    },
    {
      title: '24/7 Pharmacy',
      number: '+1 234 567 8901',
      icon: Store,
      color: 'bg-emerald-500',
      lightColor: 'bg-emerald-50',
      textColor: 'text-emerald-500',
    },
  ];

  return (
    <div className="p-6">
      <header className="pt-4 mb-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Phone size={32} className="text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Emergency Contacts</h1>
        <p className="text-gray-500 text-sm px-4">Tap any card below to immediately place a call to the respective service.</p>
      </header>

      <div className="space-y-4">
        {contacts.map((contact, index) => {
          const Icon = contact.icon;
          return (
            <motion.a
              key={contact.title}
              href={`tel:${contact.number.replace(/\s/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="block"
            >
              <CustomCard className="flex items-center gap-4 hover:border-red-200 transition-colors">
                <div className={`w-14 h-14 ${contact.lightColor} rounded-2xl flex items-center justify-center ${contact.textColor}`}>
                  <Icon size={28} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg">{contact.title}</h3>
                  <p className="text-gray-500 font-medium">{contact.number}</p>
                </div>
                <div className={`w-10 h-10 rounded-full ${contact.color} flex items-center justify-center text-white shadow-md`}>
                  <Phone size={20} />
                </div>
              </CustomCard>
            </motion.a>
          );
        })}
      </div>
      
      <div className="mt-8 p-4 bg-yellow-50 rounded-2xl border border-yellow-100">
        <p className="text-yellow-800 text-sm text-center font-medium">
          In case of severe medical emergencies, always dial your local emergency number immediately.
        </p>
      </div>
    </div>
  );
}
