const FootSpaSection = () => {
    return (
        <section className="bg-[#E8DDD3] py-20 px-6">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-5xl md:text-6xl font-serif mb-4 tracking-wide text-[#2C2420]">
                        SPA DOS PÉS
                    </h2>
                    <div className="w-24 h-1 bg-[#2C2420] mx-auto"></div>
                </div>

                <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
                    <div className="space-y-8">
                        <div>
                            <p className="text-lg md:text-xl leading-relaxed text-[#2C2420] text-center mb-8">
                                O Spa dos Pés é um tratamento relaxante e revigorante que proporciona
                                cuidados especiais para os pés cansados. Inclui esfoliação suave,
                                hidratação profunda com produtos premium e massagem terapêutica,
                                ajudando a aliviar o estresse e melhorar a circulação. Este serviço
                                é ideal para quem busca conforto e bem-estar, deixando os pés macios,
                                saudáveis e completamente renovados.
                            </p>
                        </div>

                        <div className="border-t-2 border-[#2C2420] pt-8">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-2xl font-serif text-[#2C2420] mb-4 flex items-center gap-2">
                                        <span className="text-3xl">⏱️</span>
                                        Tempo
                                    </h3>
                                    <p className="text-lg text-[#5C4F45]">Relaxamento Profundo</p>
                                    <p className="text-base text-[#5C4F45] mt-2">
                                        <strong>Tempo de procedimento:</strong> 1h a 1h 30m <br />
                                        Momento de puro relaxamento.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-2xl font-serif text-[#2C2420] mb-4">
                                        SERVIÇO
                                    </h3>
                                    <p className="text-base text-[#5C4F45]">
                                        R$ 90,00
                                    </p>
                                    <p className="text-sm text-[#5C4F45] mt-2 italic">
                                        Inclui esfoliação, hidratação e massagem
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

export default FootSpaSection;