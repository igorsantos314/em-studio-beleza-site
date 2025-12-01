import catalogHeroBg from '../../assets/images/catalog-hero-background.jpg';

const CatalogHeroSection = () => {
  return (
    <section className="bg-[#C8B8A8] min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-4xl mx-auto text-center">
        <div className="relative">
          {/* Background image */}
          <div className="absolute inset-0 opacity-30">
            <img 
              src={catalogHeroBg}
              alt="Background" 
              className="w-full h-full object-cover rounded-3xl"
            />
          </div>
          
          {/* Content */}
          <div className="relative z-10 py-32">
            <div className="mb-6">
              <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[140px] xl:text-[160px] font-serif leading-none tracking-wide text-white drop-shadow-2xl">
                <span className="block">Ellen Moraes</span>
              </h1>
            </div>
            
            <div className="mt-6 md:mt-8">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 font-light tracking-wide">
                Catálogo de Serviços
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CatalogHeroSection;
