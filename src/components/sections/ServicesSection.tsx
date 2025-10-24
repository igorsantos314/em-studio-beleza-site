import { Sparkles, Palette, Heart, Crown } from 'lucide-react';

const ServicesSection = () => {
  const services = [
    {
      icon: Sparkles,
      title: "Alongamento em gel",
      description: "Unhas longas e resistentes com acabamento profissional",
      color: "from-pink-400 to-rose-500"
    },
    {
      icon: Heart,
      title: "Blindagem",
      description: "Fortalecimento e proteção das unhas naturais",
      color: "from-purple-400 to-pink-500"
    },
    {
      icon: Palette,
      title: "Manicure tradicional",
      description: "Cuidado completo das unhas e cutículas",
      color: "from-rose-400 to-pink-500"
    },
    {
      icon: Crown,
      title: "Nail art personalizada",
      description: "Designs únicos criados especialmente para você",
      color: "from-fuchsia-400 to-rose-500"
    }
  ];

  return (
    <section className="bg-gradient-to-br from-rose-50 to-pink-50 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-800 mb-16 text-center">
          Serviços
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div 
                key={index} 
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center group hover:scale-105 transform transition-transform"
              >
                <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${service.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <Icon className="text-white" size={28} />
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;