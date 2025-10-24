import type { Service, TimeSlot, Appointment, AppointmentRepository as IAppointmentRepository } from '../types/Appointment';

class AppointmentRepository implements IAppointmentRepository {
  private services: Service[] = [
    {
      id: 'manicure-simples',
      name: 'Manicure Simples',
      duration: 45,
      price: 35.00,
      description: 'Manicure básica com esmaltação',
      category: 'manicure',
      popular: true
    },
    {
      id: 'manicure-completa',
      name: 'Manicure Completa',
      duration: 60,
      price: 50.00,
      description: 'Manicure completa com hidratação e massagem',
      category: 'manicure',
      popular: true
    },
    {
      id: 'pedicure-simples',
      name: 'Pedicure Simples',
      duration: 50,
      price: 40.00,
      description: 'Pedicure básica com esmaltação',
      category: 'pedicure'
    },
    {
      id: 'pedicure-completa',
      name: 'Pedicure Completa',
      duration: 75,
      price: 65.00,
      description: 'Pedicure completa com esfoliação e hidratação',
      category: 'pedicure'
    },
    {
      id: 'alongamento-gel',
      name: 'Alongamento em Gel',
      duration: 90,
      price: 80.00,
      description: 'Alongamento profissional com gel',
      category: 'extension',
      popular: true
    },
    {
      id: 'alongamento-fibra',
      name: 'Alongamento em Fibra',
      duration: 120,
      price: 100.00,
      description: 'Alongamento premium com fibra de vidro',
      category: 'extension'
    },
    {
      id: 'nail-art-simples',
      name: 'Nail Art Simples',
      duration: 30,
      price: 25.00,
      description: 'Desenhos simples e elegant es',
      category: 'nail-art'
    },
    {
      id: 'nail-art-elaborada',
      name: 'Nail Art Elaborada',
      duration: 60,
      price: 45.00,
      description: 'Designs complexos e personalizados',
      category: 'nail-art'
    },
    {
      id: 'blindagem',
      name: 'Blindagem das Unhas',
      duration: 40,
      price: 35.00,
      description: 'Fortalecimento e proteção das unhas naturais',
      category: 'nails'
    },
    {
      id: 'manicure-pedicure',
      name: 'Mão e Pé Completo',
      duration: 120,
      price: 85.00,
      description: 'Pacote completo de manicure e pedicure',
      category: 'manicure',
      popular: true
    }
  ];

  private appointments: Appointment[] = [];

  private generateTimeSlots(): TimeSlot[] {
    const slots: TimeSlot[] = [];
    const startHour = 9; // 9:00
    const endHour = 18; // 18:00
    const interval = 30; // 30 minutos

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += interval) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push({
          id: `slot-${timeString}`,
          time: timeString,
          available: true
        });
      }
    }

    return slots;
  }

  async getServices(): Promise<Service[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...this.services]), 100);
    });
  }

  async getAvailableSlots(date: string, serviceId: string): Promise<TimeSlot[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const allSlots = this.generateTimeSlots();
        const service = this.services.find(s => s.id === serviceId);
        
        if (!service) {
          resolve([]);
          return;
        }

        // Simular alguns horários ocupados baseado na data
        const occupiedTimes = date === new Date().toISOString().split('T')[0] 
          ? ['10:00', '14:30', '16:00'] // Hoje tem menos vagas
          : ['14:00']; // Outros dias mais disponíveis
        
        const availableSlots = allSlots.map(slot => ({
          ...slot,
          available: !occupiedTimes.includes(slot.time),
          duration: service.duration
        }));

        resolve(availableSlots);
      }, 200);
    });
  }

  async createAppointment(appointment: Omit<Appointment, 'id' | 'createdAt'>): Promise<Appointment> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newAppointment: Appointment = {
          ...appointment,
          id: `apt-${Date.now()}`,
          createdAt: new Date().toISOString()
        };
        
        this.appointments.push(newAppointment);
        resolve(newAppointment);
      }, 300);
    });
  }

  async getAppointments(date?: string): Promise<Appointment[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        let filtered = [...this.appointments];
        
        if (date) {
          filtered = filtered.filter(apt => apt.date === date);
        }
        
        resolve(filtered);
      }, 100);
    });
  }
}

export const appointmentRepository = new AppointmentRepository();