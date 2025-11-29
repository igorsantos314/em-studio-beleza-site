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
            <h1 className="text-[120px] md:text-[180px] font-serif leading-none tracking-tight text-white mb-8">
              <span className="block">CATA</span>
              <span className="block -mt-12">LOGO</span>
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CatalogHeroSection;
