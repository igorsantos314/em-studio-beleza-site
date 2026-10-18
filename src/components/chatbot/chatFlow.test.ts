import { describe, expect, it } from 'vitest';
import {
  CHAT_START_NODE,
  chatFlow,
  randomColorOptions,
  rootOptions,
  validateChatFlow,
} from './chatFlow';

const KNOWN_ACTIONS = [
  'whatsapp',
  'whatsappProcedures',
  'whatsappColor',
  'instagram',
  'maps',
  'openPalette',
  'openPix',
  'schedule',
  'scheduleWithColor',
  'toggleProcedure',
  'confirmProcedures',
  'selectColorSuggestion',
  'randomColor',
];

describe('chatFlow', () => {
  it('é válido: todo "next" existe e toda opção tem "next" ou "action"', () => {
    expect(validateChatFlow()).toEqual([]);
  });

  it('não possui becos sem saída: todo nó tem pelo menos uma opção', () => {
    Object.values(chatFlow).forEach((node) => {
      expect(node.options?.length ?? 0).toBeGreaterThan(0);
    });
  });

  it('toda ação usada no fluxo é conhecida/tratada', () => {
    Object.values(chatFlow).forEach((node) => {
      (node.options ?? []).forEach((option) => {
        if (option.action) {
          expect(KNOWN_ACTIONS).toContain(option.action);
        }
      });
    });
  });

  it('o nó inicial existe e exibe as opções iniciais', () => {
    const root = chatFlow[CHAT_START_NODE];
    expect(root).toBeDefined();
    expect(root.options).toEqual(rootOptions);
  });

  it('o nó "menu" reexibe as opções iniciais (fluxo nunca acaba)', () => {
    expect(chatFlow.menu.options).toEqual(rootOptions);
  });

  it('"Voltar ao início" sempre retorna ao menu inicial', () => {
    Object.values(chatFlow).forEach((node) => {
      (node.options ?? [])
        .filter((option) => option.id === 'back-root')
        .forEach((option) => {
          expect(option.next).toBe('menu');
        });
    });
  });

  it('o nó de confirmação do agendamento interpola a lista de procedimentos', () => {
    expect(chatFlow.appointmentConfirm.messages.join(' ')).toContain('{procedureList}');
  });

  it('o agendamento permite selecionar vários procedimentos (toggle) e confirmar', () => {
    const options = chatFlow.appointment.options ?? [];
    const toggles = options.filter((option) => option.action === 'toggleProcedure');
    const confirm = options.find((option) => option.action === 'confirmProcedures');
    expect(toggles.length).toBeGreaterThan(1);
    expect(confirm).toBeDefined();
  });

  it('a sugestão de cores oferece os 4 caminhos pedidos', () => {
    const labels = (chatFlow.color.options ?? []).map((option) => option.label);
    expect(labels).toContain('Quero uma cor que combine com um evento');
    expect(labels).toContain('Quero uma cor que combine com minha roupa');
    expect(labels).toContain('Quero uma cor que combine com meu sentimento');
    expect(labels.some((label) => label.includes('cor aleatória'))).toBe(true);
  });

  it('cada caminho de cor leva à sugestão carregando o valor escolhido', () => {
    ['colorEvent', 'colorOutfit', 'colorFeeling'].forEach((nodeId) => {
      const pickOptions = (chatFlow[nodeId].options ?? []).filter(
        (option) => option.action === 'selectColorSuggestion'
      );
      expect(pickOptions.length).toBeGreaterThan(0);
      pickOptions.forEach((option) => {
        expect(option.value).toBeTruthy();
      });
    });
  });

  it('a sugestão final pergunta sobre agendamento com a cor e WhatsApp', () => {
    const ids = (chatFlow.colorSuggestion.options ?? []).map((option) => option.id);
    expect(ids).toContain('schedule-with-color');
    expect(ids).toContain('whatsapp-color');
    expect(chatFlow.colorSuggestion.messages.join(' ')).toContain('{colorSuggestion}');
  });

  it('após o sorteio, oferece a opção de curiosidade e rodar novamente', () => {
    const labels = randomColorOptions.map((option) => option.label);
    expect(labels).toContain('Estou curiosa para saber qual a cor 🤭');
    expect(labels.some((label) => label.includes('rodar novamente'))).toBe(true);
    const ids = randomColorOptions.map((option) => option.id);
    expect(ids).toContain('whatsapp-number');
  });
});
