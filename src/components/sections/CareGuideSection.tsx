import { CONTACTS, WHATSAPP_MESSAGES } from '../../constants/contacts';

const CareGuideSection = () => {
  return (
    <section className="bg-[#5C4F45] text-white py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-serif mb-4 tracking-wide">
            GUIA E CUIDADOS
          </h2>
          <p className="text-xl text-[#E8DDD3] mt-4">
            Pós Procedimento
          </p>
          <div className="w-24 h-1 bg-white mx-auto mt-4"></div>
        </div>

        <div className="space-y-8">
          {/* Primeira seção */}
          <div className="bg-[#4A3F38] rounded-3xl p-8 md:p-10">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-10 h-10 bg-white text-[#5C4F45] rounded-full flex items-center justify-center font-bold text-xl">
                1
              </div>
              <div>
                <h3 className="text-2xl font-serif mb-3">Hidrate Cutículas e Unhas Diariamente</h3>
              </div>
            </div>
            <p className="text-lg text-[#E8DDD3] leading-relaxed ml-14">
              Aplique óleo de cutícula ou creme hidratante específico para as mãos diariamente, 
              especialmente antes de dormir. A hidratação mantém as cutículas saudáveis e previne 
              o ressecamento que pode levar ao surgimento de "unheiras" (peles soltas).
            </p>
          </div>

          {/* Segunda seção */}
          <div className="bg-[#4A3F38] rounded-3xl p-8 md:p-10">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-10 h-10 bg-white text-[#5C4F45] rounded-full flex items-center justify-center font-bold text-xl">
                2
              </div>
              <div>
                <h3 className="text-2xl font-serif mb-3">Proteja suas Unhas no Dia a Dia</h3>
              </div>
            </div>
            <p className="text-lg text-[#E8DDD3] leading-relaxed ml-14">
              Evite usar as unhas como ferramentas para abrir latas, raspar etiquetas ou teclar com força. 
              Use luvas ao realizar tarefas domésticas, lavar louça ou manusear produtos de limpeza. 
              Isso preserva tanto a esmaltação quanto a saúde natural das unhas.
            </p>
          </div>

          {/* Terceira seção */}
          <div className="bg-[#4A3F38] rounded-3xl p-8 md:p-10">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-10 h-10 bg-white text-[#5C4F45] rounded-full flex items-center justify-center font-bold text-xl">
                3
              </div>
              <div>
                <h3 className="text-2xl font-serif mb-3">Respeite o Crescimento Natural</h3>
              </div>
            </div>
            <p className="text-lg text-[#E8DDD3] leading-relaxed ml-14">
              Não arranque nem force a retirada de esmalte em gel ou cutículas por conta própria. 
              Isso pode danificar a superfície da unha natural e enfraquecer sua estrutura. 
              Sempre procure um profissional qualificado para remoção segura e manutenção adequada.
            </p>
          </div>

          {/* Quarta seção */}
          <div className="bg-[#4A3F38] rounded-3xl p-8 md:p-10">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-10 h-10 bg-white text-[#5C4F45] rounded-full flex items-center justify-center font-bold text-xl">
                4
              </div>
              <div>
                <h3 className="text-2xl font-serif mb-3">Evite Traumas e Impactos</h3>
              </div>
            </div>
            <p className="text-lg text-[#E8DDD3] leading-relaxed ml-14">
              Tenha cuidado ao manusear objetos pesados ou realizar atividades que possam causar impacto 
              direto nas unhas. Batidas, pancadas ou pressão excessiva podem causar descolamento do gel, 
              quebra ou até mesmo hematomas subungueais (manchas roxas sob a unha).
            </p>
          </div>
        </div>

        {/* Chamada para Ação */}
        <div className="mt-12 bg-gradient-to-r from-[#6B5B4F] to-[#4A3F38] rounded-3xl p-8 md:p-12 text-center border-2 border-white/20">
          <h3 className="text-3xl md:text-4xl font-serif mb-6 text-white">
            Agende Sua Próxima Manutenção
          </h3>
          <p className="text-lg md:text-xl text-[#E8DDD3] leading-relaxed mb-8 max-w-3xl mx-auto">
            Para que suas unhas estejam sempre fortes, saudáveis e impecáveis, reserve sua próxima 
            manutenção de gel em <strong className="text-white">2-3 semanas</strong> ou agende sua próxima 
            manicure tradicional na <strong className="text-white">próxima semana</strong>.
          </p>
          <p className="text-lg text-[#E8DDD3] italic mb-8">
            Cuidar das unhas é um investimento contínuo na sua saúde e beleza!
          </p>
          
          <a
            href={`${CONTACTS.whatsapp.url}?text=${WHATSAPP_MESSAGES.general}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold px-10 py-5 rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl text-lg"
          >
            <svg
              className="w-7 h-7"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            <span>Agendar Manutenção no WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CareGuideSection;
