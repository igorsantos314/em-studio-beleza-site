import { useState } from 'react';
import { Calendar } from 'lucide-react';
import AppointmentModal from '../modals/AppointmentModal';
import type { Appointment } from '../../types/Appointment';

const HeroSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAppointmentCreated = (appointment: Appointment) => {
    console.log('Agendamento criado:', appointment);
  };

  return (
    <>
      <section className="bg-gradient-to-br from-pink-50 to-rose-100 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-800 leading-tight">
                Unhas que <br />
                <span className="text-rose-600">expressam</span> quem <br />
                você é.
              </h1>
              
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-8 py-4 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 transform hover:scale-105 shadow-lg"
              >
                <Calendar size={20} />
                Agende seu horário
              </button>
              
              <p className="text-gray-600 text-lg font-medium">
                +300 clientes satisfeitas
              </p>
            </div>
            
            <div className="flex justify-center">
              <div className="w-80 h-96 bg-gradient-to-br from-rose-200 to-pink-300 rounded-3xl shadow-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="Manicure profissional" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <AppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAppointmentCreated={handleAppointmentCreated}
      />
    </>
  );
};

export default HeroSection;
