import HeroSection from '../components/sections/HeroSection';
import ProfessionalSection from '../components/sections/ProfessionalSection';
import ServicesSection from '../components/sections/ServicesSection';
import ColorCatalogSection from '../components/sections/ColorCatalogSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import ContactSection from '../components/sections/ContactSection';

const HomePage = () => {
	return (
		<div className="min-h-screen">
			<HeroSection />
			<ProfessionalSection />
			<ServicesSection />
			<ColorCatalogSection />
			<TestimonialsSection />
			<ContactSection />
		</div>
	);
};

export default HomePage;