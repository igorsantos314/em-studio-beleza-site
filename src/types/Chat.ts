export type ChatRole = 'bot' | 'user';

export interface ChatMessage {
  id: string;
  role: ChatRole;
  text: string;
}

export type ChatAction =
  | 'whatsapp'
  | 'whatsappProcedure'
  | 'whatsappColor'
  | 'instagram'
  | 'maps'
  | 'openPalette'
  | 'openPix'
  | 'schedule'
  | 'scheduleWithColor'
  | 'selectProcedure'
  | 'selectColorSuggestion'
  | 'randomColor';

export interface ChatOption {
  id: string;
  label: string;
  next?: string;
  action?: ChatAction;
  value?: string;
  message?: string;
}

export interface ChatNode {
  id: string;
  messages: string[];
  options?: ChatOption[];
}

export interface ChatContext {
  procedureLabel?: string;
  procedureMessage?: string;
  colorSuggestion?: string;
}
