import CatalogHeroSection from '../components/sections/CatalogHeroSection';
import AboutSection from '../components/sections/AboutSection';
import ProceduresSection from '../components/sections/ProceduresSection';
import TipsSection from '../components/sections/TipsSection';
import GelBathSection from '../components/sections/procedures/GelBathSection';
import ImportantSection from '../components/sections/ImportantSection';
import PaymentMethodsSection from '../components/sections/PaymentMethodsSection';
import CareGuideSection from '../components/sections/CareGuideSection';
import AddressSection from '../components/sections/AddressSection';
import CutilageSection from '../components/sections/procedures/CutilageSection';
import GelNailPolishSection from '../components/sections/procedures/GelNailPolishSection';
import ManicurePadicureSection from '../components/sections/procedures/ManicurePadicureSection';
import FootPlasticSection from '../components/sections/procedures/FootPlastic';
import FootSpaSection from '../components/sections/procedures/FootSpaSection';

const HomePage = () => {
	return (
		<div className="min-h-screen">
			<CatalogHeroSection />
			<AboutSection />
			<ProceduresSection />

			{/* Descrição dos procedimentos */}
			<GelNailPolishSection />
			<ManicurePadicureSection />
			<FootPlasticSection />
			<FootSpaSection />
			<GelNailPolishSection />
			<CutilageSection />
			<TipsSection />
			<GelBathSection />

			<ImportantSection />
			<PaymentMethodsSection />
			<CareGuideSection />
			<AddressSection />
		</div>
	);
};

export default HomePage;
