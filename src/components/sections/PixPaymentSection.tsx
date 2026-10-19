import { useEffect, useMemo, useRef, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import Icon from '../ui/Icon';
import { PIX_CONFIG, PIX_PRESET_AMOUNTS, PIX_SECTION_ID } from '../../constants/pix';
import { buildPixAppUri, buildPixPayload, detectPixDevice, type PixDevice } from '../../utils/pix';

const formatBRL = (value: number) =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const PixPaymentSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [copied, setCopied] = useState(false);
  const [device, setDevice] = useState<PixDevice>('desktop');
  const [openAppFailed, setOpenAppFailed] = useState(false);

  const sectionRef = useRef<HTMLElement | null>(null);

  const amount = useMemo(() => {
    const parsed = Number(customAmount.replace(',', '.'));
    if (customAmount.trim() && !Number.isNaN(parsed) && parsed > 0) return parsed;
    return selectedAmount;
  }, [customAmount, selectedAmount]);

  const payload = useMemo(
    () =>
      buildPixPayload({
        key: PIX_CONFIG.key,
        merchantName: PIX_CONFIG.merchantName,
        merchantCity: PIX_CONFIG.merchantCity,
        amount: amount ?? undefined,
      }),
    [amount]
  );

  useEffect(() => {
    setDevice(detectPixDevice());

    const scrollToSection = () =>
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

    if (window.location.hash === `#${PIX_SECTION_ID}`) {
      setIsOpen(true);
    }

    const handleHashChange = () => {
      if (window.location.hash === `#${PIX_SECTION_ID}`) {
        setIsOpen(true);
        scrollToSection();
      }
    };

    const handleOpenEvent = () => {
      setIsOpen(true);
      scrollToSection();
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('pix:open', handleOpenEvent);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('pix:open', handleOpenEvent);
    };
  }, []);

  const selectPreset = (value: number) => {
    setSelectedAmount(value);
    setCustomAmount('');
  };

  const handleCustomChange = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount(null);
  };

  const copyPayload = async () => {
    try {
      await navigator.clipboard.writeText(payload);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = payload;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };

  const handleCopy = () => {
    void copyPayload();
  };

  const handleOpenApp = () => {
    // Copia o código como plano B, caso o app não abra.
    void copyPayload();
    setOpenAppFailed(false);

    const startedAt = Date.now();
    window.location.href = buildPixAppUri(payload);

    window.setTimeout(() => {
      if (document.visibilityState === 'visible' && Date.now() - startedAt < 2600) {
        setOpenAppFailed(true);
      }
    }, 2400);
  };

  return (
    <section id={PIX_SECTION_ID} ref={sectionRef} className="bg-[#E8DDD3] py-14 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
            aria-controls="pix-conteudo"
            className="w-full flex items-center justify-between gap-4 p-6 md:p-8 text-left"
          >
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#2C2420] text-white flex items-center justify-center">
                <Icon name="qr_code_2" size={26} />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-serif text-[#2C2420]">
                  Pagamento via PIX
                </h2>
                <p className="text-sm text-[#5C4F45]">
                  Toque para escolher o valor e pagar de forma rápida e segura
                </p>
              </div>
            </div>
            <Icon
              name={isOpen ? 'expand_less' : 'expand_more'}
              size={30}
              className="flex-shrink-0 text-[#2C2420]"
            />
          </button>

          {isOpen && (
            <div id="pix-conteudo" className="border-t border-[#E8DDD3] px-6 pb-8 pt-6 md:px-8">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-[#2C2420] mb-3">
                  Escolha o valor
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {PIX_PRESET_AMOUNTS.map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => selectPreset(value)}
                      className={`py-3 rounded-xl border-2 font-medium transition-all ${
                        amount === value && !customAmount.trim()
                          ? 'border-[#2C2420] bg-[#2C2420] text-white'
                          : 'border-[#E8DDD3] text-[#2C2420] hover:border-[#2C2420]'
                      }`}
                    >
                      {formatBRL(value)}
                    </button>
                  ))}
                </div>

                <div className="mt-3 relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5C4F45]">
                    R$
                  </span>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={customAmount}
                    onChange={(event) => handleCustomChange(event.target.value)}
                    placeholder="Outro valor"
                    aria-label="Outro valor"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-[#E8DDD3] text-[#2C2420] focus:outline-none focus:border-[#2C2420]"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="flex justify-center">
                  <div className="bg-white p-4 rounded-2xl border-2 border-[#E8DDD3]">
                    <QRCodeSVG value={payload} size={220} level="M" marginSize={0} />
                  </div>
                </div>

                <div>
                  <p className="text-[#2C2420] font-semibold mb-1">
                    Valor:{' '}
                    {amount ? (
                      <span className="text-[#5C4F45]">{formatBRL(amount)}</span>
                    ) : (
                      <span className="text-[#5C4F45] font-normal">
                        em aberto (você define no app)
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-[#5C4F45] mb-4">
                    Abra o app do seu banco, escolha <strong>PIX</strong> e escaneie o QR Code
                    ou use o código copia e cola.
                  </p>

                  {device !== 'desktop' && (
                    <button
                      type="button"
                      onClick={handleOpenApp}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold bg-[#25D366] hover:bg-[#20BA5A] text-white transition-all mb-3"
                    >
                      <Icon name="open_in_new" size={20} />
                      Abrir app do banco
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={handleCopy}
                    className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                      copied
                        ? 'bg-green-600 text-white'
                        : 'bg-[#2C2420] hover:bg-[#3D342D] text-white'
                    }`}
                  >
                    <Icon name={copied ? 'check' : 'content_copy'} size={20} />
                    {copied ? 'Código copiado!' : 'Copiar código PIX'}
                  </button>

                  {openAppFailed && (
                    <p className="mt-3 rounded-lg border border-[#f0d9b5] bg-[#fdf3e3] px-3 py-2 text-xs text-[#8a5a1a]">
                      Não abriu o app? O código já foi copiado — abra seu banco e use o
                      "PIX Copia e Cola".
                    </p>
                  )}

                  <p className="mt-4 flex items-start gap-2 text-xs text-[#5C4F45]">
                    <Icon name="lock" size={16} className="mt-0.5 flex-shrink-0" />
                    O pagamento é feito direto no app do seu banco. Este site não acessa seus
                    dados bancários.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PixPaymentSection;
