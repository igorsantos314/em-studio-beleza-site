const ManicurePadicureSection = () => {
    return (
        <section className="bg-[#E8DDD3] py-20 px-6">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-5xl md:text-6xl font-serif mb-4 tracking-wide text-[#2C2420]">
                        MANICURE E PEDICURE
                    </h2>
                    <div className="w-24 h-1 bg-[#2C2420] mx-auto"></div>
                </div>

                <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
                    <div className="space-y-8">
                        <div>
                            <p className="text-lg md:text-xl leading-relaxed text-[#2C2420] text-center mb-8">
                                Nossos serviços de manicure e pedicure são realizados por profissionais
                                experientes que utilizam técnicas modernas e produtos de alta qualidade
                                para garantir a saúde e a beleza das suas unhas. Oferecemos uma variedade
                                de tratamentos, desde o cuidado básico até designs personalizados, sempre
                                focando no bem-estar e satisfação do cliente. Cada procedimento inclui
                                lixamento, polimento, hidratação e esmaltação com produtos de primeira linha.
                            </p>
                        </div>

                        <div className="border-t-2 border-[#2C2420] pt-8">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-2xl font-serif text-[#2C2420] mb-4 flex items-center gap-2">
                                        <span className="text-3xl">⏱️</span>
                                        Tempo
                                    </h3>
                                    <p className="text-lg text-[#5C4F45]">Cuidado Completo</p>
                                    <p className="text-base text-[#5C4F45] mt-2">
                                        <strong>Manicure:</strong> 45 minutos a 1h <br />
                                        <strong>Pedicure:</strong> 1h a 1h 15m
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-2xl font-serif text-[#2C2420] mb-4">
                                        SERVIÇOS
                                    </h3>
                                    <p className="text-base text-[#5C4F45]">
                                        <strong>Manicure:</strong> R$ 35,00
                                    </p>
                                    <p className="text-base text-[#5C4F45] mt-2">
                                        <strong>Pedicure:</strong> R$ 40,00
                                    </p>
                                    <p className="text-base text-[#5C4F45] mt-2">
                                        <strong>Combo (Mãos + Pés):</strong> R$ 70,00
                                    </p>
                                </div>
                            </div>

                            <div className="mt-8">
                                <h3 className="text-2xl font-serif text-[#2C2420] mb-4">
                                    ADICIONAIS
                                </h3>
                                <p className="text-base text-[#5C4F45]">
                                    <strong>Nail Art:</strong> A partir de R$ 10,00 por unha <br />
                                    <strong>Francesinha:</strong> R$ 15,00 adicional
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ManicurePadicureSection;
