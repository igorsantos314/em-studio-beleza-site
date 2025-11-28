const AboutSection = () => {
  return (
    <section className="bg-[#2C2420] text-white py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-serif mb-8 tracking-wide">
            QUEM SOU EU?
          </h2>
        </div>

        <div className="bg-[#3D342D] rounded-3xl p-8 md:p-12">
          <p className="text-lg md:text-xl leading-relaxed text-center text-[#E8DDD3]">
            Olá, meu nome é <span className="font-bold text-white">Ellen Moraes</span>, sou 
            <span className="font-bold text-white"> técnica em designer de unhas</span> há mais de 3 
            <span className="font-bold text-white"> anos de beleza</span>, especializada em nail design.
          </p>
          <p className="text-lg md:text-xl leading-relaxed text-center text-[#E8DDD3] mt-6">
            Minha missão é realçar a beleza natural de cada cliente, oferecendo resultados personalizados e 
            atendimento de alta necessidade e desejável.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
