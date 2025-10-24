import { MapPin, Phone, Clock, Instagram, MessageCircle } from 'lucide-react';

const ContactSection = () => {
  return (
    <section className="bg-gray-900 text-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Localização e Contato */}
          <div>
            <h2 className="text-4xl font-bold mb-8">
              Localização e Contato
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <MapPin className="text-rose-400 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-bold text-xl mb-2">Endereço</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Rua das Flores, 123<br />
                    Centro - São Paulo, SP<br />
                    CEP: 01234-567
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Phone className="text-rose-400 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-bold text-xl mb-2">Telefone</h3>
                  <p className="text-gray-300">
                    (11) 99999-9999
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Clock className="text-rose-400 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-bold text-xl mb-2">Horário de Funcionamento</h3>
                  <div className="text-gray-300 space-y-1">
                    <p>Segunda a Sexta: 9h às 18h</p>
                    <p>Sábado: 9h às 16h</p>
                    <p>Domingo: Fechado</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-4 mt-8">
              <a 
                href="#" 
                className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
              >
                <MessageCircle size={20} />
                WhatsApp
              </a>
              
              <a 
                href="#" 
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
              >
                <Instagram size={20} />
                Instagram
              </a>
            </div>
          </div>
          
          {/* Denderço (Mapa) */}
          <div>
            <h2 className="text-4xl font-bold mb-8">
              Denderço
            </h2>
            
            <div className="bg-gradient-to-br from-rose-200 to-pink-300 rounded-2xl h-96 flex items-center justify-center">
              <div className="text-center text-gray-700">
                <MapPin size={48} className="mx-auto mb-4" />
                <p className="text-lg font-medium">
                  Mapa Interativo
                </p>
                <p className="text-sm opacity-75">
                  [Integração com Google Maps]
                </p>
              </div>
            </div>
            
            <div className="mt-6 bg-gray-800 rounded-lg p-6">
              <h3 className="font-bold text-xl mb-4 text-rose-400">
                Como chegar:
              </h3>
              <ul className="text-gray-300 space-y-2">
                <li>• Próximo ao Shopping Center</li>
                <li>• Estacionamento gratuito</li>
                <li>• Acesso por transporte público</li>
                <li>• Ponto de referência: Banco do Brasil</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;