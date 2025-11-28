import { MapPin, Map } from 'lucide-react';

const AddressSection = () => {
  return (
    <section className="bg-[#E8DDD3] py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-serif mb-4 tracking-wide text-[#2C2420]">
            ENDEREÇO
          </h2>
          <div className="w-24 h-1 bg-[#2C2420] mx-auto"></div>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <div className="flex items-start gap-6 mb-8">
            <div className="flex-shrink-0">
              <MapPin className="text-[#2C2420]" size={36} />
            </div>
            <div>
              <h3 className="text-3xl font-serif text-[#2C2420] mb-4">
                Rua Garanhus, 161
              </h3>
              <p className="text-xl text-[#5C4F45] mb-2">
                Bairro São Pedro, Belo Jardim, Pernambuco
              </p>
            </div>
          </div>

          <div className="border-t-2 border-[#E8DDD3] pt-8">
            <h4 className="text-2xl font-serif text-[#2C2420] mb-6 flex items-center gap-3">
              <Map size={28} />
              COMO CHEGAR:
            </h4>
            <ul className="space-y-3 text-lg text-[#5C4F45]">
              <li className="flex items-start gap-3">
                <span className="text-[#2C2420] font-bold">•</span>
                <span>Próximo ao Shopping Center</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#2C2420] font-bold">•</span>
                <span>Estacionamento disponível na rua</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#2C2420] font-bold">•</span>
                <span>Acesso por transporte público - Linha 123</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#2C2420] font-bold">•</span>
                <span>Ponto de referência: Banco do Brasil</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-2xl font-serif text-[#2C2420] tracking-wide">
            Larissa
          </p>
        </div>
      </div>
    </section>
  );
};

export default AddressSection;
