import type { ChatNode } from '../../types/Chat';

export const CHAT_START_NODE = 'root';

export const chatFlow: Record<string, ChatNode> = {
  root: {
    id: 'root',
    messages: [
      'Olá, seja bem-vinda ao Studio Ellen Moraes — Studio Beleza!',
      'Como posso te ajudar hoje?',
    ],
    options: [
      { id: 'go-appointment', label: 'Quero marcar um agendamento', next: 'appointment' },
      { id: 'go-color', label: 'Sugestão de cor', next: 'color' },
    ],
  },
  appointment: {
    id: 'appointment',
    messages: [
      'Que ótimo! Será um prazer cuidar de você.',
      'Para marcar seu horário, fale comigo no WhatsApp pelo botão abaixo.',
    ],
    options: [
      { id: 'whatsapp', label: 'Falar no WhatsApp', action: 'whatsapp' },
      { id: 'back-root', label: 'Voltar ao início', next: 'root' },
    ],
  },
  color: {
    id: 'color',
    messages: [
      'Claro! Escolher a cor certa faz toda a diferença.',
      'Tenho uma paleta cheia de inspirações para você. Vamos dar uma olhada?',
    ],
    options: [
      { id: 'open-palette', label: 'Ver paleta de cores', action: 'openPalette' },
      { id: 'back-root', label: 'Voltar ao início', next: 'root' },
    ],
  },
};
