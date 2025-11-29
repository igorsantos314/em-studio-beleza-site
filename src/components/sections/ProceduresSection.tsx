const ProceduresSection = () => {
  const procedures = [
    {
      title: "Cutilagem",
      image: "assets/images/procedures/cutilagem.jpg",
      sectionId: "cutilagem"
    },
    {
      title: "Manicure",
      image: "assets/images/procedures/manicure.jpg",
      sectionId: "manicure-pedicure"
    },
    {
      title: "Pedicure",
      image: "assets/images/procedures/pedicure.jpg",
      sectionId: "manicure-pedicure"
    },
    {
      title: "Spa dos Pés",
      image: "assets/images/procedures/spa-dos-pes.jpg",
      sectionId: "spa-dos-pes"
    },
    {
      title: "Plástica dos Pés",
      image: "assets/images/procedures/plastica-dos-pes.jpg",
      sectionId: "plastica-dos-pes"
    },
    {
      title: "Esmaltação em Gel",
      image: "assets/images/procedures/esmaltacao-em-gel.jpg",
      sectionId: "esmaltacao-em-gel"
    },
    {
      title: "Banho em Gel",
      image: "assets/images/procedures/banho-em-gel.jpg",
      sectionId: "banho-em-gel"
    },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="bg-[#E8DDD3] py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-serif mb-4 tracking-wide text-[#2C2420]">
            Procedimentos
          </h2>
          <div className="w-24 h-1 bg-[#2C2420] mx-auto"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {procedures.map((procedure, index) => (
            <div 
              key={index}
              onClick={() => scrollToSection(procedure.sectionId)}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl aspect-square mb-4 shadow-lg">
                <img 
                  src={procedure.image}
                  alt={procedure.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-center text-lg font-serif text-[#2C2420]">
                {procedure.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProceduresSection;
