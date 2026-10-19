export type ChatRole = 'bot' | 'user';

export interface ChatMessage {
  id: string;
  role: ChatRole;
  text: string;
}

export type ChatAction =
  | 'whatsapp'
  | 'whatsappProcedures'
  | 'whatsappColor'
  | 'instagram'
  | 'maps'
  | 'openPalette'
  | 'openPix'
  | 'schedule'
  | 'scheduleWithColor'
  | 'toggleProcedure'
  | 'confirmProcedures'
  | 'selectColorSuggestion'
  | 'randomColor';

export interface ChatOption {
  id: string;
  label: string;
  next?: string;
  action?: ChatAction;
  value?: string;
  message?: string;
  selected?: boolean;
}

export interface ChatNode {
  id: string;
  messages: string[];
  options?: ChatOption[];
}

export interface ChatContext {
  procedureList?: string;
  colorSuggestion?: string;
  colorNumber?: number;
}
