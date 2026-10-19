import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Icon from '../ui/Icon';
import avatar from '../../assets/avatar/avatar.png';
import ColorPaletteModal from '../modals/ColorPaletteModal';
import ColorRoulette from './ColorRoulette';
import { CONTACTS, STUDIO_ADDRESS, WHATSAPP_MESSAGES } from '../../constants/contacts';
import {
  ROULETTE_MAX_NUMBER,
  ROULETTE_MIN_NUMBER,
  ROULETTE_SEGMENT_COUNT,
} from '../../constants/colorWheel';
import type { ChatContext, ChatMessage, ChatOption } from '../../types/Chat';
import { CHAT_START_NODE, chatFlow, APPOINTMENT_DOUBT_VALUE, randomColorOptions, rootOptions } from './chatFlow';

let messageCounter = 0;
const createId = () => `chat-${(messageCounter += 1)}`;

let spinCounter = 0;
const createSpinId = () => (spinCounter += 1);

const optionIcon = (option: ChatOption) => {
  switch (option.action) {
    case 'whatsapp':
    case 'whatsappProcedures':
    case 'whatsappColor':
      return <Icon name="chat" size={18} />;
    case 'instagram':
      return <Icon name="photo_camera" size={18} />;
    case 'maps':
      return <Icon name="location_on" size={18} />;
    case 'openPalette':
    case 'selectColorSuggestion':
      return <Icon name="palette" size={18} />;
    case 'openPix':
      return <Icon name="qr_code_2" size={18} />;
    case 'schedule':
    case 'scheduleWithColor':
      return <Icon name="calendar_month" size={18} />;
    case 'randomColor':
      return <Icon name="shuffle" size={18} />;
    case 'toggleProcedure':
      return <Icon name="spa" size={18} />;
    case 'confirmProcedures':
      return <Icon name="check" size={18} />;
  }

  switch (option.id) {
    case 'go-appointment':
      return <Icon name="calendar_month" size={18} />;
    case 'go-color':
      return <Icon name="palette" size={18} />;
    case 'go-whatsapp':
      return <Icon name="chat" size={18} />;
    case 'go-instagram':
      return <Icon name="photo_camera" size={18} />;
    case 'go-address':
      return <Icon name="location_on" size={18} />;
    case 'go-payment':
      return <Icon name="payments" size={18} />;
    case 'go-policy':
      return <Icon name="event_note" size={18} />;
    case 'go-care':
      return <Icon name="spa" size={18} />;
    case 'color-event':
      return <Icon name="celebration" size={18} />;
    case 'color-outfit':
      return <Icon name="checkroom" size={18} />;
    case 'color-feeling':
      return <Icon name="mood" size={18} />;
    case 'confirm-yes':
      return <Icon name="check" size={18} />;
    case 'confirm-no':
      return <Icon name="close" size={18} />;
  }

  if (option.id.startsWith('back') || option.id === 'confirm-back') {
    return <Icon name="arrow_back" size={18} />;
  }
  return <Icon name="auto_awesome" size={18} />;
};

const optionTone = (option: ChatOption) => {
  if (option.action === 'confirmProcedures') {
    return 'border-green-600 bg-green-600 text-white hover:bg-green-700';
  }
  if (option.action === 'schedule') {
    return 'border-[#C8B8A8] bg-[#C8B8A8] text-[#2C2420] hover:bg-[#E8DDD3]';
  }
  if (option.action === 'whatsapp') {
    return 'border-[#25D366]/40 bg-[#25D366]/10 text-[#2C2420] hover:bg-[#25D366]/20';
  }
  if (option.id === 'back-root') {
    return 'border-[#C8B8A8] bg-[#F5EFE9] text-[#5C4F45] hover:bg-[#E8DDD3]';
  }
  return option.selected
    ? 'border-[#2C2420] bg-[#2C2420] text-white'
    : 'border-[#2C2420]/15 bg-white text-[#2C2420] hover:bg-[#2C2420] hover:text-white';
};

const optionIconTone = (option: ChatOption) => {
  if (option.selected || option.action === 'confirmProcedures') return 'text-white';
  if (option.action === 'whatsapp') return 'text-[#25D366]';
  if (option.action === 'schedule') return 'text-[#2C2420]';
  if (option.id === 'back-root') return 'text-[#5C4F45]';
  return 'text-[#C8B8A8]';
};

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [options, setOptions] = useState<ChatOption[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [spin, setSpin] = useState<{ id: number; targetIndex: number; number: number } | null>(
    null
  );
  const [selectedProcedures, setSelectedProcedures] = useState<string[]>([]);

  const startedRef = useRef(false);
  const timersRef = useRef<number[]>([]);
  const contextRef = useRef<ChatContext>({});
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const scrollPositionRef = useRef(0);

  useLayoutEffect(() => {
    if (!isOpen || !scrollContainerRef.current) return;
    scrollContainerRef.current.scrollTop = scrollPositionRef.current;
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  const interpolate = (text: string) =>
    text.replace(/\{(\w+)\}/g, (_, key: string) => {
      const value = contextRef.current[key as keyof ChatContext];
      return value !== undefined ? String(value) : `{${key}}`;
    });

  const pushBotMessages = (texts: string[], nextOptions: ChatOption[], delay = 650) => {
    setIsTyping(true);
    const timer = window.setTimeout(() => {
      setMessages((previous) => [
        ...previous,
        ...texts.map((text) => ({
          id: createId(),
          role: 'bot' as const,
          text: interpolate(text),
        })),
      ]);
      setIsTyping(false);
      setOptions(nextOptions);
    }, delay);
    timersRef.current.push(timer);
  };

  const enterNode = (nodeId: string) => {
    const node = chatFlow[nodeId];
    if (!node) return;
    setOptions([]);
    pushBotMessages(node.messages, node.options ?? []);
  };

  const openChat = () => {
    setIsOpen(true);
    if (!startedRef.current) {
      startedRef.current = true;
      enterNode(CHAT_START_NODE);
    }
  };

  const closeChat = () => {
    const hasUserMessages = messages.some((message) => message.role === 'user');
    scrollPositionRef.current =
      hasUserMessages && scrollContainerRef.current ? scrollContainerRef.current.scrollTop : 0;
    setIsOpen(false);
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      scrollPositionRef.current = scrollContainerRef.current.scrollTop;
    }
  };

  const openWhatsapp = (message: string) => {
    window.open(
      `${CONTACTS.whatsapp.url}?text=${message}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const buildAppointmentMessage = (procedures: string[], inDoubt: boolean) => {
    const { colorNumber, colorSuggestion } = contextRef.current;
    const colorText =
      colorNumber !== undefined
        ? ` com a cor número ${colorNumber}`
        : colorSuggestion
          ? ` com a cor ${colorSuggestion}`
          : '';
    const details =
      procedures.length > 0
        ? `gostaria de agendar: *${procedures.join(', ')}*${colorText}`
        : `gostaria de agendar um horário${colorText}`;
    return `Olá! Vim pelo chat do site e ${details}${inDoubt ? ', mas ainda estou em dúvida' : ''}. Pode me ajudar?`;
  };

  const spinRoulette = () => {
    const targetIndex = Math.floor(Math.random() * ROULETTE_SEGMENT_COUNT);
    const number =
      ROULETTE_MIN_NUMBER +
      Math.floor(Math.random() * (ROULETTE_MAX_NUMBER - ROULETTE_MIN_NUMBER + 1));
    contextRef.current.colorNumber = number;
    contextRef.current.colorSuggestion = undefined;
    setOptions([]);
    setSpin({ id: createSpinId(), targetIndex, number });
  };

  const toggleProcedure = (option: ChatOption) => {
    const label = option.value ?? option.label;
    const next = selectedProcedures.includes(label)
      ? selectedProcedures.filter((item) => item !== label)
      : [...selectedProcedures, label];
    setSelectedProcedures(next);
    setOptions((previous) =>
      previous.map((candidate) =>
        candidate.action === 'toggleProcedure'
          ? { ...candidate, selected: next.includes(candidate.value ?? candidate.label) }
          : candidate
      )
    );
  };

  const handleOption = (option: ChatOption) => {
    if (option.action === 'toggleProcedure') {
      toggleProcedure(option);
      return;
    }

    const userText =
      option.action === 'whatsappProcedures' ? selectedProcedures.join(', ') : option.label;

    setMessages((previous) => [
      ...previous,
      { id: createId(), role: 'user' as const, text: userText },
    ]);
    setOptions([]);

    if (option.action !== 'randomColor') {
      setSpin(null);
    }

    switch (option.action) {
      case 'whatsapp':
        openWhatsapp(WHATSAPP_MESSAGES.general);
        pushBotMessages(
          ['Te espero por lá! Se precisar de mais alguma coisa, é só me chamar. 😊'],
          rootOptions
        );
        return;
      case 'whatsappProcedures': {
        const procedures = selectedProcedures.filter(
          (procedure) => procedure !== APPOINTMENT_DOUBT_VALUE
        );
        const inDoubt = selectedProcedures.includes(APPOINTMENT_DOUBT_VALUE);
        openWhatsapp(encodeURIComponent(buildAppointmentMessage(procedures, inDoubt)));
        setSelectedProcedures([]);
        pushBotMessages(
          ['Perfeito! Te espero no WhatsApp para confirmarmos seu horário. 😊'],
          rootOptions
        );
        return;
      }
      case 'instagram':
        window.open(CONTACTS.instagram.url, '_blank', 'noopener,noreferrer');
        pushBotMessages(['Te espero por lá! Já pode me seguir. 😊'], rootOptions);
        return;
      case 'maps':
        window.open(STUDIO_ADDRESS.mapsUrl, '_blank', 'noopener,noreferrer');
        pushBotMessages(['Abrindo o mapa! Qualquer coisa é só me chamar.'], rootOptions);
        return;
      case 'openPalette':
        setPaletteOpen(true);
        pushBotMessages(
          ['Prontinho, abri a paleta para você. Escolha a cor que mais te encantar!'],
          []
        );
        return;
      case 'openPix':
        window.dispatchEvent(new Event('pix:open'));
        pushBotMessages(
          ['Prontinho, abri a seção de pagamento PIX. Posso te ajudar com mais alguma coisa?'],
          rootOptions
        );
        return;
      case 'confirmProcedures': {
        const procedures = selectedProcedures.filter(
          (procedure) => procedure !== APPOINTMENT_DOUBT_VALUE
        );
        const inDoubt = selectedProcedures.includes(APPOINTMENT_DOUBT_VALUE);
        if (procedures.length === 0) {
          openWhatsapp(encodeURIComponent(buildAppointmentMessage([], inDoubt)));
          setSelectedProcedures([]);
          pushBotMessages(
            ['Perfeito! Te espero no WhatsApp para combinarmos seu horário. 😊'],
            rootOptions
          );
          return;
        }
        contextRef.current.procedureList = procedures.join(', ');
        enterNode('appointmentConfirm');
        return;
      }
      case 'selectColorSuggestion':
        contextRef.current.colorSuggestion = option.value ?? '';
        enterNode('colorSuggestion');
        return;
      case 'randomColor':
        spinRoulette();
        return;
      case 'whatsappColor': {
        const { colorNumber, colorSuggestion } = contextRef.current;
        const message =
          colorNumber !== undefined
            ? `Olá! Tirei o número ${colorNumber} na roleta de cores do site e estou curiosa para saber qual é a cor!`
            : `Olá! Recebi uma sugestão de cor no chat do site: ${colorSuggestion ?? ''}. Amei!`;
        openWhatsapp(encodeURIComponent(message));
        pushBotMessages(
          ['Prontinho! Enviei para o meu WhatsApp. Posso te ajudar com mais alguma coisa? 😍'],
          rootOptions
        );
        return;
      }
      case 'schedule':
        contextRef.current.colorSuggestion = undefined;
        contextRef.current.colorNumber = undefined;
        setSelectedProcedures([]);
        enterNode('appointment');
        return;
      case 'scheduleWithColor':
        setSelectedProcedures([]);
        enterNode('appointment');
        return;
    }

    if (option.next) {
      enterNode(option.next);
    }
  };

  const closePalette = () => {
    setPaletteOpen(false);
    pushBotMessages(
      ['Gostou de alguma cor? Posso te ajudar com mais alguma coisa?'],
      rootOptions
    );
  };

  const handleRouletteStop = () => {
    const number = contextRef.current.colorNumber;
    pushBotMessages(
      [
        `Prontinho! Sua cor é o número ${number}.`,
        'Guarde esse número e envie para a Ellen: ela tem todas as cores numeradas e vai te mostrar qual é a sua cor.',
      ],
      randomColorOptions
    );
  };

  return (
    <>
      {isOpen ? (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={closeChat}
            aria-hidden="true"
          />
          <div className="fixed bottom-6 right-6 z-50 flex h-[560px] max-h-[calc(100vh-3rem)] w-[380px] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-3xl border border-[#E8DDD3] bg-white shadow-2xl">
          <header className="flex items-center gap-3 bg-[#2C2420] px-4 py-3 text-white">
            <div className="relative h-11 w-11 flex-shrink-0">
              <img
                src={avatar}
                alt="Assistente da Ellen"
                className="h-11 w-11 rounded-full border-2 border-[#E8DDD3] object-cover"
              />
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#2C2420] bg-green-500" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-serif text-lg leading-tight">Assistente da Ellen</p>
              <p className="truncate text-xs text-[#C8B8A8]">Studio Beleza · online</p>
            </div>
            <button
              type="button"
              onClick={closeChat}
              aria-label="Fechar chat"
              className="rounded-full p-2 transition-colors hover:bg-white/15"
            >
              <Icon name="close" size={20} />
            </button>
          </header>

          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex-1 space-y-3 overflow-y-auto bg-[#F5EFE9] px-4 py-4"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-end gap-2 ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.role === 'bot' && (
                  <img
                    src={avatar}
                    alt=""
                    className="h-7 w-7 flex-shrink-0 rounded-full object-cover"
                  />
                )}
                <p
                  className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
                    message.role === 'user'
                      ? 'rounded-br-sm bg-[#2C2420] text-white'
                      : 'rounded-bl-sm border border-[#E8DDD3] bg-white text-[#2C2420]'
                  }`}
                >
                  {message.text}
                </p>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-end gap-2">
                <img
                  src={avatar}
                  alt=""
                  className="h-7 w-7 flex-shrink-0 rounded-full object-cover"
                />
                <div className="flex gap-1 rounded-2xl rounded-bl-sm border border-[#E8DDD3] bg-white px-4 py-3 shadow-sm">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-[#C8B8A8] [animation-delay:-0.3s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-[#C8B8A8] [animation-delay:-0.15s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-[#C8B8A8]" />
                </div>
              </div>
            )}

            {spin && (
              <ColorRoulette
                key={spin.id}
                targetIndex={spin.targetIndex}
                number={spin.number}
                onStop={handleRouletteStop}
                onSpin={spinRoulette}
              />
            )}

            {!isTyping && options.length > 0 && (
              <div className="flex flex-col gap-2 pt-1">
                {options.map((option, index) => {
                  const startsConfirmationGroup =
                    options[index - 1]?.action === 'toggleProcedure' &&
                    option.action !== 'toggleProcedure';

                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => handleOption(option)}
                      aria-pressed={option.selected}
                      className={`flex items-center gap-2 rounded-2xl border px-4 py-2.5 text-left text-sm font-medium shadow-sm transition-colors ${
                        startsConfirmationGroup ? 'mt-4' : ''
                      } ${optionTone(option)}`}
                    >
                      <span className={optionIconTone(option)}>{optionIcon(option)}</span>
                      <span className="flex-1">{option.label}</span>
                      {option.selected && <Icon name="check" size={18} />}
                    </button>
                  );
                })}
              </div>
            )}

          </div>

          <footer className="border-t border-[#E8DDD3] bg-white px-4 py-2.5 text-center text-[11px] text-[#5C4F45]">
            Assistente da Ellen · Studio Beleza
          </footer>
        </div>
        </>
      ) : (
        <button
          type="button"
          onClick={openChat}
          aria-label="Abrir chat com a assistente da Ellen"
          className="fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full bg-white p-1 ring-1 ring-black/5 shadow-2xl transition-transform duration-300 hover:scale-105"
        >
          <span className="pointer-events-none absolute inset-0 animate-ping rounded-full bg-[#2C2420]/20" />
          <img
            src={avatar}
            alt="Falar com a assistente da Ellen"
            className="relative h-full w-full rounded-full object-cover"
          />
          <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-white bg-green-500" />
        </button>
      )}

      <ColorPaletteModal isOpen={paletteOpen} onClose={closePalette} />
    </>
  );
};

export default ChatAssistant;
