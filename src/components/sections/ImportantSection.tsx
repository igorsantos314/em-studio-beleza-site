const ImportantSection = () => {
  return (
    <section className="bg-[#E8DDD3] py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-serif mb-4 tracking-wide text-[#2C2420]">
            Política de Agendamento e Cancelamento
          </h2>
          <div className="w-24 h-1 bg-[#2C2420] mx-auto"></div>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          {/* Mensagem Introdutória */}
          <div className="mb-10 pb-8 border-b-2 border-[#E8DDD3]">
            <p className="text-lg md:text-xl text-[#2C2420] leading-relaxed text-center italic">
              Valorizo muito o seu tempo e o meu. O cumprimento das regras de agendamento garante que 
              eu possa me dedicar <span className="font-bold">100% ao seu cuidado</span> com a excelência 
              que você merece. Conto com sua compreensão!
            </p>
          </div>

          <div className="space-y-10">
            {/* 1. Agendamento */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-shrink-0 w-10 h-10 bg-[#2C2420] text-white rounded-full flex items-center justify-center font-bold text-lg">
                  1
                </div>
                <h3 className="text-2xl font-serif text-[#2C2420] font-bold">Agendamento</h3>
              </div>
              <div className="ml-13 space-y-3">
                <div className="flex items-start gap-2">
                  <span className="text-[#2C2420] mt-1">•</span>
                  <p className="text-base md:text-lg text-[#2C2420] leading-relaxed">
                    <strong>Prioridade:</strong> Todos os serviços são realizados exclusivamente com 
                    hora marcada. Por favor, chegue com <strong>5 a 10 minutos de antecedência</strong> para 
                    relaxar e iniciar o procedimento no horário exato.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#2C2420] mt-1">•</span>
                  <p className="text-base md:text-lg text-[#2C2420] leading-relaxed">
                    <strong>Atrasos:</strong> Toleramos um atraso máximo de <strong>15 minutos</strong>. 
                    Após esse período, o serviço poderá ser reajustado ou, dependendo da agenda, cancelado. 
                    O reagendamento será necessário para não prejudicar a cliente seguinte.
                  </p>
                </div>
              </div>
            </div>

            {/* 2. Confirmação */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-shrink-0 w-10 h-10 bg-[#2C2420] text-white rounded-full flex items-center justify-center font-bold text-lg">
                  2
                </div>
                <h3 className="text-2xl font-serif text-[#2C2420] font-bold">Confirmação</h3>
              </div>
              <div className="ml-13 space-y-3">
                <div className="flex items-start gap-2">
                  <span className="text-[#2C2420] mt-1">•</span>
                  <p className="text-base md:text-lg text-[#2C2420] leading-relaxed">
                    <strong>Lembrete:</strong> Enviamos uma mensagem de lembrete com <strong>24 horas 
                    de antecedência</strong> para confirmar o seu horário.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#2C2420] mt-1">•</span>
                  <p className="text-base md:text-lg text-[#2C2420] leading-relaxed">
                    <strong>Confirmação Obrigatória:</strong> A sua resposta confirmando a presença é 
                    indispensável. Caso não haja confirmação até <strong>12 horas antes do horário</strong>, 
                    o agendamento poderá ser liberado para outra cliente.
                  </p>
                </div>
              </div>
            </div>

            {/* 3. Cancelamento e Desistência */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-shrink-0 w-10 h-10 bg-[#2C2420] text-white rounded-full flex items-center justify-center font-bold text-lg">
                  3
                </div>
                <h3 className="text-2xl font-serif text-[#2C2420] font-bold">Cancelamento e Desistência</h3>
              </div>
              <div className="ml-13 space-y-3">
                <div className="flex items-start gap-2">
                  <span className="text-[#2C2420] mt-1">•</span>
                  <p className="text-base md:text-lg text-[#2C2420] leading-relaxed">
                    <strong>Aviso Prévio:</strong> Pedimos a gentileza de comunicar qualquer cancelamento 
                    ou necessidade de reagendamento com, no mínimo, <strong>24 horas de antecedência</strong>.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#2C2420] mt-1">•</span>
                  <p className="text-base md:text-lg text-[#2C2420] leading-relaxed">
                    <strong>Respeito e Compromisso:</strong> Cancelamentos de última hora ou o não 
                    comparecimento impossibilitam que outra cliente seja atendida no seu lugar. Caso ocorra 
                    reincidência de não comparecimento, será solicitado um <strong>sinal de 30% do valor 
                    do serviço</strong> para futuros agendamentos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImportantSection;
