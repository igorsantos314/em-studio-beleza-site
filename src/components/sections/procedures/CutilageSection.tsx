import { CONTACTS, WHATSAPP_MESSAGES } from '../../../constants/contacts';

const CutilageSection = () => {
    return (
        <section id="cutilagem" className="bg-[#E8DDD3] py-20 px-6">
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
                                Uma cuticulagem bem-feita não só embeleza a unha no momento, como também previne o surgimento de peles soltas (unheiras) e mantém a área mais hidratada e bonita por mais tempo.Não se trata apenas de remover, mas de tratar a pele ao redor da unha com o máximo cuidado.
                                Priorize a saúde e a beleza das suas unhas desde o primeiro passo. 
                                Tenha um acabamento limpo e seguro em minhas mãos!
                            </p>
                        </div>

                        <div className="border-t-2 border-[#2C2420] pt-8">
                            <div className="flex flex-col items-center">
                                <div className="grid md:grid-cols-2 gap-8 w-full mb-8">
                                    <div className="text-center">
                                        <h3 className="text-2xl font-serif text-[#2C2420] mb-4 flex items-center justify-center gap-2">
                                            <span className="text-3xl">⏱️</span>
                                            Tempo de Procedimento
                                        </h3>
                                        <p className="text-lg text-[#5C4F45]">20 minutos a 30 minutos</p>
                                        <p className="text-base text-[#5C4F45] mt-2">
                                            Para mãos ou pés
                                        </p>
                                    </div>
                                    <div className="text-center">
                                        <h3 className="text-2xl font-serif text-[#2C2420] mb-4 flex items-center justify-center gap-2">
                                            <span className="text-3xl">🔄</span>
                                            Frequência de Manutenção
                                        </h3>
                                        <p className="text-lg text-[#5C4F45]">Semanalmente ou Quinzenalmente</p>
                                        <p className="text-base text-[#5C4F45] mt-2">
                                            Para manter a saúde das unhas
                                        </p>
                                    </div>
                                </div>

                                <a
                                    href={`${CONTACTS.whatsapp.url}?text=${WHATSAPP_MESSAGES.cutilagem}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold px-10 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                                >
                                    <svg
                                        className="w-6 h-6"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                    </svg>
                                    <span>Solicitar Informações</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CutilageSection;
