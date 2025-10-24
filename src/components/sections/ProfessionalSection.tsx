const ProfessionalSection = () => {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-800 mb-16 text-center">
          Apresentação da Profissional
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <div className="w-64 h-80 bg-gradient-to-br from-rose-100 to-pink-200 rounded-2xl shadow-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Profissional especialista" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-800">
              Sou [Seu nome], especialista em <br />
              <span className="text-rose-600">alongamento e nail art personalizada</span>
            </h3>
            
            <p className="text-gray-600 text-lg leading-relaxed">
              Transformo suas unhas em extensão da sua personalidade. 
              Com anos de experiência e paixão pela arte das unhas, 
              crio designs únicos que refletem seu estilo e personalidade.
            </p>
            
            <div className="flex flex-wrap gap-3">
              <span className="bg-rose-100 text-rose-700 px-4 py-2 rounded-full text-sm font-medium">
                +5 anos de experiência
              </span>
              <span className="bg-pink-100 text-pink-700 px-4 py-2 rounded-full text-sm font-medium">
                Certificada
              </span>
              <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">
                Nail Art Especialista
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalSection;