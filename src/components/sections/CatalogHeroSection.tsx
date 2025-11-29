import catalogHeroBg from '../../../assets/images/catalog-hero-background.jpg';

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
                <span className="block mt-6 sm:-mt-6 md:-mt-8 lg:-mt-10 text-7xl sm:text-9xl md:text-[120px] lg:text-[180px] xl:text-[200px] font-bold">SB</span>
              </h1>
            </div>
            
            <div className="mt-8 md:mt-12">
              <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-[120px] xl:text-[140px] font-serif tracking-widest text-white/90 drop-shadow-xl">
                CATÁLOGO
              </h2>
            </div>
            
            <div className="mt-6 md:mt-8">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 font-light tracking-wide">
                Designer de Unhas & Beleza
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CatalogHeroSection;
