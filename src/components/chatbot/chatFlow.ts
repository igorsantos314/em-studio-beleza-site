import type { ChatNode, ChatOption } from '../../types/Chat';
import { STUDIO_ADDRESS } from '../../constants/contacts';

export const CHAT_START_NODE = 'root';

export const rootOptions: ChatOption[] = [
  { id: 'go-appointment', label: 'Quero marcar um agendamento', action: 'schedule' },
  { id: 'go-color', label: 'Sugestão de cores para as unhas', next: 'color' },
  { id: 'go-whatsapp', label: 'Quero falar pelo WhatsApp', next: 'whatsappInfo' },
  { id: 'go-instagram', label: 'Gostaria de ver seu Instagram', next: 'instagramInfo' },
  { id: 'go-address', label: 'Onde fica o studio?', next: 'address' },
  { id: 'go-payment', label: 'Formas de pagamento', next: 'payment' },
  { id: 'go-policy', label: 'Política de agendamento e cancelamento', next: 'policy' },
  { id: 'go-care', label: 'Cuidados com as unhas', next: 'care' },
];

const PROCEDURES = [
  'Extensão de Unhas',
  'Cutilagem',
  'Manicure',
  'Pedicure',
  'Spa dos Pés',
  'Plástica dos Pés',
  'Esmaltação em Gel',
  'Banho em Gel',
];

const procedureOptions: ChatOption[] = PROCEDURES.map((label, index) => ({
  id: `procedure-${index}`,
  label,
  action: 'toggleProcedure',
  value: label,
}));

const backToStart: ChatOption = {
  id: 'back-root',
  label: 'Voltar ao início',
  next: 'menu',
};

const backToColor: ChatOption = {
  id: 'back-color',
  label: 'Voltar',
  next: 'color',
};

const scheduleOptions: ChatOption[] = [
  { id: 'go-appointment', label: 'Quero marcar um agendamento', action: 'schedule' },
  backToStart,
];

const colorFinalOptions: ChatOption[] = [
  {
    id: 'schedule-with-color',
    label: 'Quero marcar o agendamento já com a cor',
    action: 'scheduleWithColor',
  },
  {
    id: 'whatsapp-color',
    label: 'Enviar a opção para o WhatsApp da melhor nail design do mundo 😍',
    action: 'whatsappColor',
  },
  backToStart,
];

export const randomColorOptions: ChatOption[] = [
  {
    id: 'whatsapp-number',
    label: 'Estou curiosa para saber qual a cor 🤭',
    action: 'whatsappColor',
  },
  {
    id: 'schedule-with-color',
    label: 'Quero marcar o agendamento já com a cor',
    action: 'scheduleWithColor',
  },
  { id: 'spin-again', label: 'Quero rodar novamente', action: 'randomColor' },
  backToStart,
];

export const chatFlow: Record<string, ChatNode> = {
  root: {
    id: 'root',
    messages: [
      'Olá, seja bem-vinda ao Studio Ellen Moraes — Studio Beleza!',
      'Como posso te ajudar hoje?',
    ],
    options: rootOptions,
  },
  menu: {
    id: 'menu',
    messages: ['Posso te ajudar com mais alguma coisa?'],
    options: rootOptions,
  },
  whatsappInfo: {
    id: 'whatsappInfo',
    messages: ['Entendi, clica nesse link e conversa diretamente com a gente 😊'],
    options: [{ id: 'whatsapp', label: 'Abrir WhatsApp', action: 'whatsapp' }, backToStart],
  },
  instagramInfo: {
    id: 'instagramInfo',
    messages: ['Claro, é pra já, pode clicar na opção abaixo e já nos seguir 😊'],
    options: [{ id: 'instagram', label: 'Abrir Instagram', action: 'instagram' }, backToStart],
  },
  address: {
    id: 'address',
    messages: [`Estamos na ${STUDIO_ADDRESS.full}.`, STUDIO_ADDRESS.reference],
    options: [{ id: 'maps', label: 'Abrir no mapa', action: 'maps' }, ...scheduleOptions],
  },
  payment: {
    id: 'payment',
    messages: [
      'Aceitamos Dinheiro, Cartão (débito e crédito, com acréscimo) e PIX.',
      'Se preferir, já pode adiantar o pagamento por PIX por aqui:',
    ],
    options: [{ id: 'open-pix', label: 'Pagar com PIX', action: 'openPix' }, ...scheduleOptions],
  },
  policy: {
    id: 'policy',
    messages: [
      'Para garantir um atendimento tranquilo, trabalho apenas com hora marcada.',
      'Chegue com 5 a 10 minutos de antecedência. A tolerância de atraso é de 15 minutos.',
      'Envio um lembrete 24h antes e a confirmação é indispensável. Cancelamentos e remarcações também devem ser avisados com 24h de antecedência.',
    ],
    options: [...scheduleOptions],
  },
  care: {
    id: 'care',
    messages: [
      'Para manter suas unhas lindas por mais tempo:',
      'Hidrate as cutículas diariamente e use luvas nas tarefas domésticas.',
      'Não use as unhas como ferramenta e não remova o gel por conta própria.',
      'Reserve a manutenção a cada 2 a 3 semanas.',
    ],
    options: [...scheduleOptions],
  },
  color: {
    id: 'color',
    messages: ['Claro! Me conta o que você tem em mente que eu te ajudo a escolher a cor ideal:'],
    options: [
      { id: 'color-event', label: 'Quero uma cor que combine com um evento', next: 'colorEvent' },
      { id: 'color-outfit', label: 'Quero uma cor que combine com minha roupa', next: 'colorOutfit' },
      {
        id: 'color-feeling',
        label: 'Quero uma cor que combine com meu sentimento',
        next: 'colorFeeling',
      },
      { id: 'color-random', label: 'Quero uma cor aleatória 🤭', action: 'randomColor' },
      { id: 'open-palette', label: 'Ver a paleta completa', action: 'openPalette' },
      backToStart,
    ],
  },
  colorEvent: {
    id: 'colorEvent',
    messages: ['Que legal! Que tipo de evento é? Assim eu acerto na cor:'],
    options: [
      {
        id: 'event-wedding',
        label: 'Casamento',
        action: 'selectColorSuggestion',
        value: 'Nude Clássico, Rosa Antigo ou Rose Gold',
      },
      {
        id: 'event-party',
        label: 'Festa ou balada',
        action: 'selectColorSuggestion',
        value: 'Dourado Luxo, Vermelho Paixão ou efeito holográfico',
      },
      {
        id: 'event-work',
        label: 'Trabalho e dia a dia',
        action: 'selectColorSuggestion',
        value: 'Nude Clássico, Rosa Bebê ou Bege Rosado',
      },
      backToColor,
    ],
  },
  colorOutfit: {
    id: 'colorOutfit',
    messages: ['Me conta qual a cor predominante da sua roupa que eu sugiro combinações:'],
    options: [
      {
        id: 'outfit-light',
        label: 'Tons claros (branco, bege)',
        action: 'selectColorSuggestion',
        value: 'Rosa Bebê, Nude Clássico ou Lavanda',
      },
      {
        id: 'outfit-dark',
        label: 'Tons escuros (preto)',
        action: 'selectColorSuggestion',
        value: 'Vermelho Paixão, Rosa Antigo ou Dourado Luxo',
      },
      {
        id: 'outfit-colorful',
        label: 'Colorida ou estampada',
        action: 'selectColorSuggestion',
        value: 'Nude Clássico ou Rose Gold',
      },
      {
        id: 'outfit-neutral',
        label: 'Neutra (cinza, nude)',
        action: 'selectColorSuggestion',
        value: 'Roxo Místico, Verde Esmeralda ou Azul Marinho',
      },
      backToColor,
    ],
  },
  colorFeeling: {
    id: 'colorFeeling',
    messages: ['Legal! Como você está se sentindo hoje?'],
    options: [
      {
        id: 'feeling-happy',
        label: 'Alegre e animada',
        action: 'selectColorSuggestion',
        value: 'Rosa Choque, Coral Vibrante ou Turquesa',
      },
      {
        id: 'feeling-romantic',
        label: 'Romântica',
        action: 'selectColorSuggestion',
        value: 'Rosa Bebê, Rosa Millennial ou Lavanda',
      },
      {
        id: 'feeling-powerful',
        label: 'Poderosa e confiante',
        action: 'selectColorSuggestion',
        value: 'Vermelho Paixão, Roxo Místico ou Vermelho Cereja',
      },
      {
        id: 'feeling-calm',
        label: 'Tranquila e zen',
        action: 'selectColorSuggestion',
        value: 'Azul Serenity, Verde Menta ou Nude Clássico',
      },
      backToColor,
    ],
  },
  colorSuggestion: {
    id: 'colorSuggestion',
    messages: [
      'Minha sugestão para você: {colorSuggestion}',
      'Quer marcar o agendamento já com a cor ou enviar a opção para o meu WhatsApp? 😍',
    ],
    options: colorFinalOptions,
  },
  appointment: {
    id: 'appointment',
    messages: [
      'Para facilitar no seu agendamento, selecione um ou mais procedimentos que deseja fazer:',
    ],
    options: [
      ...procedureOptions,
      { id: 'confirm-procedures', label: 'Pronto, continuar', action: 'confirmProcedures' },
      { id: 'appt-whatsapp', label: 'Prefiro conversar pelo WhatsApp', action: 'whatsapp' },
      backToStart,
    ],
  },
  appointmentConfirm: {
    id: 'appointmentConfirm',
    messages: [
      'Ta bom, deixa vê se eu entendi, você quer marcar um horário para: {procedureList}?',
    ],
    options: [
      { id: 'confirm-yes', label: 'Isso mesmo', action: 'whatsappProcedures' },
      { id: 'confirm-no', label: 'Não é isso', next: 'appointment' },
      { id: 'confirm-back', label: 'Voltar', next: 'menu' },
    ],
  },
};

export const validateChatFlow = (): string[] => {
  const errors: string[] = [];

  Object.values(chatFlow).forEach((node) => {
    if (!node.options || node.options.length === 0) {
      errors.push(`Nó "${node.id}" não possui opções (beco sem saída).`);
    }

    (node.options ?? []).forEach((option) => {
      if (!option.next && !option.action) {
        errors.push(`Opção "${option.id}" do nó "${node.id}" sem "next" nem "action".`);
      }
      if (option.next && !chatFlow[option.next]) {
        errors.push(`Opção "${option.id}" aponta para o nó inexistente "${option.next}".`);
      }
    });
  });

  return errors;
};

if (import.meta.env.DEV) {
  const problems = validateChatFlow();
  if (problems.length > 0) {
    console.error('[chatFlow] Fluxo inválido:\n' + problems.join('\n'));
  }
}
