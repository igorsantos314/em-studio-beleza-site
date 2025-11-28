import CatalogHeroSection from '../components/sections/CatalogHeroSection';
import AboutSection from '../components/sections/AboutSection';
import ProceduresSection from '../components/sections/ProceduresSection';
import ServicesSection from '../components/sections/ServicesSection';
import TipsSection from '../components/sections/TipsSection';
import GelBathSection from '../components/sections/GelBathSection';
import AdditionalsSection from '../components/sections/AdditionalsSection';
import ImportantSection from '../components/sections/ImportantSection';
import PaymentMethodsSection from '../components/sections/PaymentMethodsSection';
import CareGuideSection from '../components/sections/CareGuideSection';
import AddressSection from '../components/sections/AddressSection';

const HomePage = () => {
	return (
		<div className="min-h-screen">
			<CatalogHeroSection />
			<AboutSection />
			<ProceduresSection />
			<ServicesSection />
			<TipsSection />
			<GelBathSection />
			<AdditionalsSection />
			<ImportantSection />
			<PaymentMethodsSection />
			<CareGuideSection />
			<AddressSection />
		</div>
	);
};

export default HomePage;
