const ServicesSection = () => {
  const services = [
    { name: "Cutilagem", price: 22 },
    { name: "Manicure", price: 25 },
    { name: "Pedicure", price: 25 },
    { name: "Spa dos Pés", price: 30 },
    { name: "Plástica dos Pés", price: 50 },
    { name: "Esmaltação em gel", price: 45 },
    { name: "Banho de gel", price: 65 }
  ];

  return (
    <section className="bg-[#E8DDD3] py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-serif mb-4 tracking-wide text-[#2C2420]">
            Serviços
          </h2>
          <div className="w-24 h-1 bg-[#2C2420] mx-auto"></div>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="divide-y divide-gray-200">
            {services.map((service, index) => (
              <div 
                key={index}
                className="flex justify-between items-center px-8 md:px-12 py-6 hover:bg-[#F5F0EB] transition-colors duration-200"
              >
                <h3 className="text-xl md:text-2xl font-serif text-[#2C2420]">
                  {service.name}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm md:text-base text-[#5C4F45]">R$</span>
                  <span className="text-2xl md:text-3xl font-bold text-[#2C2420]">
                    {service.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;