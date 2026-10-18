import { useEffect, useRef, useState } from 'react';
import Icon from '../ui/Icon';
import avatar from '../../assets/images/professional-image.png';
import ColorPaletteModal from '../modals/ColorPaletteModal';
import { CONTACTS, WHATSAPP_MESSAGES } from '../../constants/contacts';
import type { ChatMessage, ChatOption } from '../../types/Chat';
import { CHAT_START_NODE, chatFlow } from './chatFlow';

let messageCounter = 0;
const createId = () => `chat-${(messageCounter += 1)}`;

const optionIcon = (option: ChatOption) => {
  if (option.action === 'whatsapp') return <Icon name="chat" size={18} />;
  if (option.action === 'openPalette') return <Icon name="palette" size={18} />;
  if (option.id.startsWith('back')) return <Icon name="arrow_back" size={18} />;
  if (option.id === 'go-appointment') return <Icon name="calendar_month" size={18} />;
  return <Icon name="auto_awesome" size={18} />;
};

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [options, setOptions] = useState<ChatOption[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  const startedRef = useRef(false);
  const timersRef = useRef<number[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, options]);

  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  const pushBotMessages = (texts: string[], nextOptions: ChatOption[], delay = 650) => {
    setIsTyping(true);
    const timer = window.setTimeout(() => {
      setMessages((previous) => [
        ...previous,
        ...texts.map((text) => ({ id: createId(), role: 'bot' as const, text })),
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

  const handleOption = (option: ChatOption) => {
    setMessages((previous) => [
      ...previous,
      { id: createId(), role: 'user' as const, text: option.label },
    ]);
    setOptions([]);

    if (option.action === 'whatsapp') {
      window.open(
        `${CONTACTS.whatsapp.url}?text=${WHATSAPP_MESSAGES.general}`,
        '_blank',
        'noopener,noreferrer'
      );
      pushBotMessages(
        ['Te espero por lá! Se precisar de mais alguma coisa, é só me chamar.'],
        [{ id: 'back-root', label: 'Voltar ao início', next: 'root' }]
      );
      return;
    }

    if (option.action === 'openPalette') {
      setPaletteOpen(true);
      pushBotMessages(
        ['Prontinho, abri a paleta para você. Escolha a cor que mais te encantar!'],
        []
      );
      return;
    }

    if (option.next) {
      enterNode(option.next);
    }
  };

  const closePalette = () => {
    setPaletteOpen(false);
    pushBotMessages(
      [
        'Gostou de alguma cor? Posso te ajudar a agendar para usá-la.',
        'E se ainda estiver em dúvida, fico feliz em sugerir a ideal para você!',
      ],
      [
        { id: 'whatsapp', label: 'Falar no WhatsApp', action: 'whatsapp' },
        { id: 'go-color', label: 'Quero uma sugestão', next: 'color' },
      ]
    );
  };

  return (
    <>
      {isOpen ? (
        <div className="fixed bottom-6 right-6 z-50 flex h-[560px] max-h-[calc(100vh-3rem)] w-[380px] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-3xl border border-[#E8DDD3] bg-white shadow-2xl">
          <header className="flex items-center gap-3 bg-[#2C2420] px-4 py-3 text-white">
            <div className="relative h-11 w-11 flex-shrink-0">
              <img
                src={avatar}
                alt="Ellen Moraes"
                className="h-11 w-11 rounded-full border-2 border-[#E8DDD3] object-cover"
              />
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#2C2420] bg-green-500" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-serif text-lg leading-tight">Ellen Moraes</p>
              <p className="truncate text-xs text-[#C8B8A8]">Studio Beleza · online</p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Fechar chat"
              className="rounded-full p-2 transition-colors hover:bg-white/15"
            >
              <Icon name="close" size={20} />
            </button>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto bg-[#F5EFE9] px-4 py-4">
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

            {!isTyping && options.length > 0 && (
              <div className="flex flex-col gap-2 pt-1">
                {options.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleOption(option)}
                    className="flex items-center gap-2 rounded-2xl border border-[#2C2420]/15 bg-white px-4 py-2.5 text-left text-sm font-medium text-[#2C2420] shadow-sm transition-colors hover:bg-[#2C2420] hover:text-white"
                  >
                    <span className="text-[#C8B8A8]">{optionIcon(option)}</span>
                    <span className="flex-1">{option.label}</span>
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <footer className="border-t border-[#E8DDD3] bg-white px-4 py-2.5 text-center text-[11px] text-[#5C4F45]">
            Atendimento do Studio Ellen Moraes
          </footer>
        </div>
      ) : (
        <button
          type="button"
          onClick={openChat}
          aria-label="Abrir chat com Ellen Moraes"
          className="fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full transition-transform duration-300 hover:scale-105"
        >
          <span className="absolute inset-0 animate-ping rounded-full bg-[#2C2420]/30" />
          <img
            src={avatar}
            alt="Falar com Ellen Moraes"
            className="relative h-16 w-16 rounded-full border-4 border-white object-cover shadow-2xl"
          />
          <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-white bg-green-500" />
        </button>
      )}

      <ColorPaletteModal isOpen={paletteOpen} onClose={closePalette} />
    </>
  );
};

export default ChatAssistant;
