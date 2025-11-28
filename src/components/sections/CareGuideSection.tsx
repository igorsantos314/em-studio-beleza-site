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
                <h3 className="text-2xl font-serif mb-3">Evite a Umidade</h3>
              </div>
            </div>
            <p className="text-lg text-[#E8DDD3] leading-relaxed ml-14">
              Mantenha suas mãos longe da água pelas primeiras 2 horas. Evite também contato 
              com detergentes e outros produtos químicos nas primeiras 24 horas.
            </p>
          </div>

          {/* Segunda seção */}
          <div className="bg-[#4A3F38] rounded-3xl p-8 md:p-10">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-10 h-10 bg-white text-[#5C4F45] rounded-full flex items-center justify-center font-bold text-xl">
                2
              </div>
              <div>
                <h3 className="text-2xl font-serif mb-3">Mantenha suas unhas em bom estado</h3>
              </div>
            </div>
            <p className="text-lg text-[#E8DDD3] leading-relaxed ml-14">
              Evite usar as unhas como ferramenta. Mantenha-as sempre hidratadas aplicando 
              óleo de cutícula diariamente. Use luvas ao realizar tarefas domésticas.
            </p>
          </div>

          {/* Terceira seção */}
          <div className="bg-[#4A3F38] rounded-3xl p-8 md:p-10">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-10 h-10 bg-white text-[#5C4F45] rounded-full flex items-center justify-center font-bold text-xl">
                3
              </div>
              <div>
                <h3 className="text-2xl font-serif mb-3">Não casa as cutículas</h3>
              </div>
            </div>
            <p className="text-lg text-[#E8DDD3] leading-relaxed ml-14">
              Evite roer ou arrancar as cutículas. Isso pode causar infecções e danificar 
              o leito ungueal. Procure sempre um profissional qualificado para manutenção.
            </p>
          </div>

          {/* Quarta seção */}
          <div className="bg-[#4A3F38] rounded-3xl p-8 md:p-10">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-10 h-10 bg-white text-[#5C4F45] rounded-full flex items-center justify-center font-bold text-xl">
                4
              </div>
              <div>
                <h3 className="text-2xl font-serif mb-3">Evite mexer com as unhas</h3>
              </div>
            </div>
            <p className="text-lg text-[#E8DDD3] leading-relaxed ml-14">
              Evite bater, arranhar ou forçar as unhas. Movimentos bruscos podem causar 
              descolamento prematuro do gel e comprometer a durabilidade do procedimento.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-2xl font-serif tracking-wide">
            Larissa
          </p>
        </div>
      </div>
    </section>
  );
};

export default CareGuideSection;
