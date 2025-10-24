import React, { useState, useEffect } from 'react';
import { X, Clock, User, Phone, Mail, MessageSquare, CheckCircle, Heart } from 'lucide-react';
import type { Service, TimeSlot, Customer, Appointment } from '../../types/Appointment';
import { appointmentRepository } from '../../repositories/AppointmentRepository';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAppointmentCreated?: (appointment: Appointment) => void;
}

const AppointmentModal: React.FC<AppointmentModalProps> = ({ isOpen, onClose, onAppointmentCreated }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [services, setServices] = useState<Service[]>([]);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  
  // Form data
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
  const [customer, setCustomer] = useState<Customer>({
    name: '',
    phone: '',
    email: '',
    notes: ''
  });

  const totalSteps = 4;

  useEffect(() => {
    if (isOpen) {
      loadServices();
      resetForm();
    }
  }, [isOpen]);

  useEffect(() => {
    if (selectedService && selectedDate) {
      loadTimeSlots();
    }
  }, [selectedService, selectedDate]);

  const resetForm = () => {
    setCurrentStep(1);
    setSelectedService(null);
    setSelectedDate('');
    setSelectedTimeSlot(null);
    setCustomer({ name: '', phone: '', email: '', notes: '' });
    setSuccess(false);
    setTimeSlots([]);
  };

  const loadServices = async () => {
    setLoading(true);
    try {
      const servicesData = await appointmentRepository.getServices();
      setServices(servicesData);
    } catch (error) {
      console.error('Erro ao carregar serviços:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadTimeSlots = async () => {
    if (!selectedService || !selectedDate) return;
    
    setLoading(true);
    try {
      const slots = await appointmentRepository.getAvailableSlots(selectedDate, selectedService.id);
      setTimeSlots(slots);
    } catch (error) {
      console.error('Erro ao carregar horários:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!selectedService || !selectedTimeSlot || !customer.name || !customer.phone) return;
    
    setSubmitting(true);
    try {
      const appointment = await appointmentRepository.createAppointment({
        customer,
        service: selectedService,
        date: selectedDate,
        timeSlot: selectedTimeSlot,
        status: 'pending'
      });
      
      setSuccess(true);
      onAppointmentCreated?.(appointment);
      
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error) {
      console.error('Erro ao criar agendamento:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30); // 30 dias no futuro
    return maxDate.toISOString().split('T')[0];
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return selectedService !== null;
      case 2: return selectedDate !== '';
      case 3: return selectedTimeSlot !== null;
      case 4: return customer.name && customer.phone;
      default: return false;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {success ? (
          // Success Screen
          <div className="p-8 text-center">
            <div className="mb-6">
              <CheckCircle className="mx-auto text-green-500 mb-4" size={64} />
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Agendamento Confirmado!</h2>
              <p className="text-gray-600">Seu horário foi reservado com sucesso.</p>
            </div>
            
            <div className="bg-green-50 rounded-2xl p-6 mb-6">
              <h3 className="font-semibold text-green-800 mb-4">Detalhes do Agendamento</h3>
              <div className="space-y-2 text-sm">
                <p><strong>Serviço:</strong> {selectedService?.name}</p>
                <p><strong>Data:</strong> {new Date(selectedDate + 'T00:00:00').toLocaleDateString('pt-BR')}</p>
                <p><strong>Horário:</strong> {selectedTimeSlot?.time}</p>
                <p><strong>Duração:</strong> {selectedService?.duration} min</p>
                <p><strong>Valor:</strong> R$ {selectedService?.price.toFixed(2)}</p>
              </div>
            </div>
            
            <p className="text-gray-600 text-sm mb-4">
              Entraremos em contato em breve para confirmar seu agendamento.
            </p>
            
            <button
              onClick={onClose}
              className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-3 rounded-lg font-medium hover:from-green-600 hover:to-emerald-600 transition-all"
            >
              Fechar
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="bg-gradient-to-r from-rose-500 to-pink-500 p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">Agendar Horário</h2>
                  <p className="text-rose-100">Passo {currentStep} de {totalSteps}</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-4">
                <div className="bg-white/20 rounded-full h-2">
                  <div 
                    className="bg-white rounded-full h-2 transition-all duration-300"
                    style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              {/* Step 1: Escolher Serviço */}
              {currentStep === 1 && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">Escolha o Serviço</h3>
                  
                  {loading ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-500 mx-auto mb-4"></div>
                      <p>Carregando serviços...</p>
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {services.map((service) => (
                        <div
                          key={service.id}
                          onClick={() => setSelectedService(service)}
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md ${
                            selectedService?.id === service.id
                              ? 'border-rose-500 bg-rose-50'
                              : 'border-gray-200 hover:border-rose-300'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h4 className="font-semibold text-gray-800">{service.name}</h4>
                                {service.popular && (
                                  <Heart className="text-rose-500 fill-current" size={16} />
                                )}
                              </div>
                              <p className="text-gray-600 text-sm mb-2">{service.description}</p>
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <span className="flex items-center space-x-1">
                                  <Clock size={14} />
                                  <span>{service.duration} min</span>
                                </span>
                                <span className="font-semibold text-rose-600">
                                  R$ {service.price.toFixed(2)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Step 2: Escolher Data */}
              {currentStep === 2 && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">Escolha a Data</h3>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Selecione uma data disponível
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={getMinDate()}
                      max={getMaxDate()}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    />
                  </div>
                  
                  {selectedService && (
                    <div className="bg-rose-50 rounded-lg p-4">
                      <h4 className="font-medium text-rose-800 mb-2">Serviço Selecionado:</h4>
                      <p className="text-rose-700">{selectedService.name}</p>
                      <p className="text-rose-600 text-sm">Duração: {selectedService.duration} min | R$ {selectedService.price.toFixed(2)}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Escolher Horário */}
              {currentStep === 3 && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">Escolha o Horário</h3>
                  
                  <div className="mb-4">
                    <p className="text-gray-600 text-sm">
                      Data: <strong>{new Date(selectedDate + 'T00:00:00').toLocaleDateString('pt-BR')}</strong>
                    </p>
                  </div>
                  
                  {loading ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-500 mx-auto mb-4"></div>
                      <p>Carregando horários...</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot.id}
                          onClick={() => slot.available && setSelectedTimeSlot(slot)}
                          disabled={!slot.available}
                          className={`p-3 rounded-lg text-sm font-medium transition-all ${
                            !slot.available
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : selectedTimeSlot?.id === slot.id
                              ? 'bg-rose-500 text-white'
                              : 'bg-gray-50 text-gray-700 hover:bg-rose-100 hover:text-rose-700'
                          }`}
                        >
                          {slot.time}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Step 4: Dados do Cliente */}
              {currentStep === 4 && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">Seus Dados</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <User size={16} className="inline mr-1" />
                        Nome Completo *
                      </label>
                      <input
                        type="text"
                        value={customer.name}
                        onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                        placeholder="Digite seu nome completo"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Phone size={16} className="inline mr-1" />
                        WhatsApp *
                      </label>
                      <input
                        type="tel"
                        value={customer.phone}
                        onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                        placeholder="(11) 99999-9999"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Mail size={16} className="inline mr-1" />
                        E-mail (opcional)
                      </label>
                      <input
                        type="email"
                        value={customer.email}
                        onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                        placeholder="seu@email.com"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <MessageSquare size={16} className="inline mr-1" />
                        Observações (opcional)
                      </label>
                      <textarea
                        value={customer.notes}
                        onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                        placeholder="Alguma preferência ou observação especial?"
                        rows={3}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent resize-none"
                      />
                    </div>
                  </div>
                  
                  {/* Resumo do Agendamento */}
                  <div className="mt-6 bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-800 mb-3">Resumo do Agendamento</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Serviço:</strong> {selectedService?.name}</p>
                      <p><strong>Data:</strong> {new Date(selectedDate + 'T00:00:00').toLocaleDateString('pt-BR')}</p>
                      <p><strong>Horário:</strong> {selectedTimeSlot?.time}</p>
                      <p><strong>Duração:</strong> {selectedService?.duration} min</p>
                      <p><strong>Valor:</strong> R$ {selectedService?.price.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-4 border-t flex items-center justify-between">
              <button
                onClick={currentStep === 1 ? onClose : () => setCurrentStep(currentStep - 1)}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {currentStep === 1 ? 'Cancelar' : 'Voltar'}
              </button>
              
              <div className="flex space-x-3">
                {currentStep < totalSteps ? (
                  <button
                    onClick={() => setCurrentStep(currentStep + 1)}
                    disabled={!canProceed()}
                    className={`px-6 py-2 rounded-lg font-medium transition-all ${
                      canProceed()
                        ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:from-rose-600 hover:to-pink-600 transform hover:scale-105'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Próximo
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={!canProceed() || submitting}
                    className={`px-6 py-2 rounded-lg font-medium transition-all flex items-center space-x-2 ${
                      canProceed() && !submitting
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 transform hover:scale-105'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {submitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                        <span>Agendando...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle size={16} />
                        <span>Confirmar Agendamento</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AppointmentModal;