const ImportantSection = () => {
  return (
    <section className="bg-[#E8DDD3] py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-serif mb-4 tracking-wide text-[#2C2420]">
            IMPORTANTE
          </h2>
          <div className="w-24 h-1 bg-[#2C2420] mx-auto"></div>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-[#2C2420] text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <p className="text-lg text-[#2C2420] leading-relaxed">
                  <strong>Atendimento só com agendamento.</strong> Garanta seu horário com antecedência 
                  para um atendimento exclusivo e de alta qualidade.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-[#2C2420] text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <p className="text-lg text-[#2C2420] leading-relaxed">
                  <strong>Apresente o print do comprovante do PIX</strong> ou o recibo do seu cartão 
                  no dia do atendimento caso tenha feito o pagamento antecipado.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-[#2C2420] text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <p className="text-lg text-[#2C2420] leading-relaxed">
                  <strong>Tolerância de atraso são de 15 minutos.</strong> Após este período, 
                  seu horário poderá ser remarcado para outro dia e será cobrada uma taxa de remarcação.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-[#2C2420] text-white rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <p className="text-lg text-[#2C2420] leading-relaxed">
                  <strong>Evitar trazer acompanhantes.</strong> Mantenha o ambiente calmo e 
                  profissional para garantir a melhor experiência possível.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-[#2C2420] text-white rounded-full flex items-center justify-center font-bold">
                5
              </div>
              <div>
                <p className="text-lg text-[#2C2420] leading-relaxed">
                  <strong>Mantenha suas unhas higienizadas e sem esmalte.</strong> Isso ajuda a 
                  garantir um melhor resultado e durabilidade do procedimento.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImportantSection;
