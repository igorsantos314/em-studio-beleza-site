export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
  duration?: number; // em minutos
}

export interface Service {
  id: string;
  name: string;
  duration: number; // em minutos
  price: number;
  description: string;
  category: ServiceCategory;
  popular?: boolean;
}

export type ServiceCategory = 'nails' | 'manicure' | 'pedicure' | 'nail-art' | 'extension';

export interface Customer {
  name: string;
  phone: string;
  email: string;
  notes?: string;
}

export interface Appointment {
  id?: string;
  customer: Customer;
  service: Service;
  date: string; // YYYY-MM-DD
  timeSlot: TimeSlot;
  status: AppointmentStatus;
  createdAt?: string;
  notes?: string;
}

export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface AppointmentRepository {
  getAvailableSlots(date: string, serviceId: string): Promise<TimeSlot[]>;
  getServices(): Promise<Service[]>;
  createAppointment(appointment: Omit<Appointment, 'id' | 'createdAt'>): Promise<Appointment>;
  getAppointments(date?: string): Promise<Appointment[]>;
}