export type ChatRole = 'bot' | 'user';

export interface ChatMessage {
  id: string;
  role: ChatRole;
  text: string;
}

export type ChatAction = 'whatsapp' | 'openPalette';

export interface ChatOption {
  id: string;
  label: string;
  next?: string;
  action?: ChatAction;
}

export interface ChatNode {
  id: string;
  messages: string[];
  options?: ChatOption[];
}
