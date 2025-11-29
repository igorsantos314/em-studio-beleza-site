const FootPlasticSection = () => {
    return (
        <section className="bg-[#E8DDD3] py-20 px-6">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-5xl md:text-6xl font-serif mb-4 tracking-wide text-[#2C2420]">
                        PLÁSTICA DOS PÉS
                    </h2>
                    <div className="w-24 h-1 bg-[#2C2420] mx-auto"></div>
                </div>

                <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
                    <div className="space-y-8">
                        <div>
                            <p className="text-lg md:text-xl leading-relaxed text-[#2C2420] text-center mb-8">
                                A Plástica dos Pés é um tratamento intensivo e transformador que proporciona
                                renovação completa. Inclui esfoliação profunda, remoção de calosidades,
                                hidratação intensiva e massagem relaxante. Ideal para quem sofre com pés
                                ressecados, rachados ou cansados, este procedimento restaura a maciez e
                                saúde da pele, deixando os pés completamente renovados e prontos para
                                qualquer ocasião.
                            </p>
                        </div>

                        <div className="border-t-2 border-[#2C2420] pt-8">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-2xl font-serif text-[#2C2420] mb-4 flex items-center gap-2">
                                        <span className="text-3xl">⏱️</span>
                                        Tempo
                                    </h3>
                                    <p className="text-lg text-[#5C4F45]">Tratamento Completo</p>
                                    <p className="text-base text-[#5C4F45] mt-2">
                                        <strong>Tempo de procedimento:</strong> 1h 30m a 2h <br />
                                        Procedimento completo e detalhado.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-2xl font-serif text-[#2C2420] mb-4">
                                        SERVIÇO
                                    </h3>
                                    <p className="text-base text-[#5C4F45]">
                                        R$ 120,00
                                    </p>
                                    <p className="text-sm text-[#5C4F45] mt-2 italic">
                                        Inclui todos os passos do tratamento completo
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

export default FootPlasticSection;