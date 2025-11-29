const GelNailPolishSection = () => {
    return (
        <section className="bg-[#E8DDD3] py-20 px-6">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-5xl md:text-6xl font-serif mb-4 tracking-wide text-[#2C2420]">
                        ESMALTAÇÃO EM GEL
                    </h2>
                    <div className="w-24 h-1 bg-[#2C2420] mx-auto"></div>
                </div>

                <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
                    <div className="space-y-8">
                        <div>
                            <p className="text-lg md:text-xl leading-relaxed text-[#2C2420] text-center mb-8">
                                A esmaltação em gel oferece cor vibrante e durabilidade excepcional.
                                Utilizamos produtos de alta qualidade que garantem um acabamento impecável,
                                brilho intenso e longa duração. O esmalte em gel é curado sob luz LED,
                                proporcionando secagem imediata e resistência superior a lascas e arranhões.
                                Ideal para quem busca unhas sempre impecáveis por mais tempo, com cores
                                vibrantes e acabamento profissional.
                            </p>
                        </div>

                        <div className="border-t-2 border-[#2C2420] pt-8">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-2xl font-serif text-[#2C2420] mb-4 flex items-center gap-2">
                                        <span className="text-3xl">⏱️</span>
                                        Tempo
                                    </h3>
                                    <p className="text-lg text-[#5C4F45]">Durabilidade Garantida</p>
                                    <p className="text-base text-[#5C4F45] mt-2">
                                        <strong>Tempo de procedimento:</strong> 45 minutos a 1h <br />
                                        Duração de 15 a 20 dias.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-2xl font-serif text-[#2C2420] mb-4">
                                        APLICAÇÃO
                                    </h3>
                                    <p className="text-base text-[#5C4F45]">
                                        <strong>Mãos:</strong> R$ 50,00
                                    </p>
                                    <p className="text-base text-[#5C4F45] mt-2">
                                        <strong>Pés:</strong> R$ 55,00
                                    </p>
                                </div>
                            </div>

                            <div className="mt-8">
                                <h3 className="text-2xl font-serif text-[#2C2420] mb-4">
                                    REMOÇÃO
                                </h3>
                                <p className="text-base text-[#5C4F45]">
                                    R$ 20,00 (procedimento seguro que preserva as unhas naturais)
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GelNailPolishSection;