const CutilageSection = () => {
    return (
        <section className="bg-[#E8DDD3] py-20 px-6">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-5xl md:text-6xl font-serif mb-4 tracking-wide text-[#2C2420]">
                        CUTILAGEM
                    </h2>
                    <div className="w-24 h-1 bg-[#2C2420] mx-auto"></div>
                </div>

                <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
                    <div className="space-y-8">
                        <div>
                            <p className="text-lg md:text-xl leading-relaxed text-[#2C2420] text-center mb-8">
                                A cutilagem é um procedimento essencial para manter as unhas e cutículas saudáveis.
                                Consiste na remoção cuidadosa das cutículas e da pele morta ao redor das unhas,
                                promovendo uma aparência limpa e bem cuidada. Além disso, a cutilagem ajuda a prevenir
                                infecções e facilita o crescimento saudável das unhas, preparando-as para receber
                                qualquer tipo de esmaltação ou tratamento.
                            </p>
                        </div>

                        <div className="border-t-2 border-[#2C2420] pt-8">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-2xl font-serif text-[#2C2420] mb-4 flex items-center gap-2">
                                        <span className="text-3xl">⏱️</span>
                                        Tempo
                                    </h3>
                                    <p className="text-lg text-[#5C4F45]">Procedimento Rápido</p>
                                    <p className="text-base text-[#5C4F45] mt-2">
                                        <strong>Tempo de procedimento:</strong> 30 a 45 minutos <br />
                                        Para mãos ou pés.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-2xl font-serif text-[#2C2420] mb-4">
                                        SERVIÇO
                                    </h3>
                                    <p className="text-base text-[#5C4F45]">
                                        <strong>Mãos:</strong> R$ 25,00
                                    </p>
                                    <p className="text-base text-[#5C4F45] mt-2">
                                        <strong>Pés:</strong> R$ 30,00
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

export default CutilageSection;
