import { CreditCard, Banknote, Grid2x2 } from 'lucide-react';

const PaymentMethodsSection = () => {
  const paymentMethods = [
    {
      icon: Banknote,
      title: "DINHEIRO",
      description: "Pagamento em espécie"
    },
    {
      icon: CreditCard,
      title: "CARTÃO",
      description: "Débito e Crédito (com acréscimo)"
    },
    {
      icon: Grid2x2,
      title: "PIX",
      description: "Transferência instantânea"
    }
  ];

  return (
    <section className="bg-[#E8DDD3] py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-serif mb-4 tracking-wide text-[#2C2420]">
            FORMAS DE <br /> PAGAMENTO
          </h2>
          <div className="w-24 h-1 bg-[#2C2420] mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {paymentMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <div 
                key={index}
                className="bg-white rounded-3xl shadow-2xl p-8 text-center hover:scale-105 transition-transform duration-300"
              >
                <div className="w-20 h-20 mx-auto mb-6 bg-[#2C2420] rounded-full flex items-center justify-center">
                  <Icon className="text-white" size={36} />
                </div>
                <h3 className="text-2xl font-serif text-[#2C2420] mb-3">
                  {method.title}
                </h3>
                <p className="text-base text-[#5C4F45]">
                  {method.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PaymentMethodsSection;
