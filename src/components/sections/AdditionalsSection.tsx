const AdditionalsSection = () => {
  return (
    <section className="bg-[#E8DDD3] py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-serif mb-4 tracking-wide text-[#2C2420]">
            ADICIONAIS
          </h2>
          <div className="w-24 h-1 bg-[#2C2420] mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Imagem de ferramentas */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Ferramentas de manicure"
              className="w-full h-64 object-cover"
            />
          </div>

          {/* Lista de serviços adicionais */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 flex flex-col justify-center">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-serif text-[#2C2420] mb-2">
                  REMOÇÃO
                </h3>
                <p className="text-base text-[#5C4F45]">
                  Valor incluso no serviço
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-serif text-[#2C2420] mb-2">
                  REVERSÃO COMUM (PAR)
                </h3>
                <p className="text-base text-[#5C4F45]">
                  R$ 8,00
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-serif text-[#2C2420] mb-2">
                  REVERSÃO NO ACRILICO
                </h3>
                <p className="text-base text-[#5C4F45]">
                  R$ 15,00
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-serif text-[#2C2420] mb-2">
                  BEBIDA 50 ML
                </h3>
                <p className="text-base text-[#5C4F45]">
                  R$ 10,00
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdditionalsSection;
