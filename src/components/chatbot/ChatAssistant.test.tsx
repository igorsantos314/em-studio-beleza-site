import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import ChatAssistant from './ChatAssistant';

const ROOT_MARKER = /onde fica o studio/i;

const flush = (ms = 1000) => act(() => {
  vi.advanceTimersByTime(ms);
});

const openChat = () => {
  fireEvent.click(screen.getByRole('button', { name: /abrir chat/i }));
  flush();
};

const clickOption = (name: RegExp) => {
  fireEvent.click(screen.getByRole('button', { name }));
  flush();
};

const expectInitialOptions = () => {
  expect(screen.getByRole('button', { name: ROOT_MARKER })).toBeInTheDocument();
};

beforeEach(() => {
  vi.useFakeTimers();
  vi.spyOn(window, 'open').mockImplementation(() => null);
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe('ChatAssistant', () => {
  it('abre mostrando a saudação e as opções iniciais', () => {
    render(<ChatAssistant />);
    openChat();
    expect(screen.getByText(/seja bem-vinda ao Studio Ellen Moraes/i)).toBeInTheDocument();
    expectInitialOptions();
  });

  it('sugestão de cores: segue o fluxo e leva ao agendamento com a cor', () => {
    render(<ChatAssistant />);
    openChat();
    clickOption(/sugestão de cores/i);

    expect(screen.getByRole('button', { name: /combine com um evento/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /combine com minha roupa/i })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /combine com meu sentimento/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cor aleatória/i })).toBeInTheDocument();

    clickOption(/combine com um evento/i);
    clickOption(/casamento/i);

    expect(screen.getByText(/nude clássico, rosa antigo ou rose gold/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /marcar o agendamento já com a cor/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /enviar a opção para o whatsapp/i })
    ).toBeInTheDocument();

    clickOption(/marcar o agendamento já com a cor/i);
    expect(screen.getByRole('button', { name: /cutilagem/i })).toBeInTheDocument();
  });

  it('cor aleatória: gira a roleta, exibe o número e permite girar novamente', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.42);
    render(<ChatAssistant />);
    openChat();
    clickOption(/sugestão de cores/i);
    fireEvent.click(screen.getByRole('button', { name: /cor aleatória/i }));

    flush(200);
    expect(screen.getByText(/sorteando sua cor/i)).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /girar novamente/i })
    ).not.toBeInTheDocument();

    flush(6000);
    expect(screen.getByText('42')).toBeInTheDocument();
    expect(screen.getByText(/todas as cores numeradas/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /estou curiosa para saber qual a cor/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /quero rodar novamente/i })).toBeInTheDocument();

    // gira novamente pelo centro da roleta (ícone de refresh)
    fireEvent.click(screen.getByRole('button', { name: /girar novamente/i }));
    flush(200);
    expect(screen.getByText(/sorteando sua cor/i)).toBeInTheDocument();

    flush(6000);
    expect(screen.getByText('42')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /estou curiosa para saber qual a cor/i })
    ).toBeInTheDocument();
  });

  it('cor aleatória: enviar o número para o WhatsApp e reexibir opções iniciais', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.42);
    render(<ChatAssistant />);
    openChat();
    clickOption(/sugestão de cores/i);
    fireEvent.click(screen.getByRole('button', { name: /cor aleatória/i }));
    flush(6000);
    clickOption(/estou curiosa para saber qual a cor/i);
    expect(window.open).toHaveBeenCalledWith(
      expect.stringContaining(encodeURIComponent('número 42')),
      '_blank',
      'noopener,noreferrer'
    );
    expectInitialOptions();
  });

  it('nunca encerra o fluxo sem reexibir as opções iniciais', () => {
    render(<ChatAssistant />);
    openChat();

    clickOption(/quero falar pelo whatsapp/i);
    clickOption(/abrir whatsapp/i);
    expectInitialOptions();

    clickOption(/gostaria de ver seu instagram/i);
    clickOption(/abrir instagram/i);
    expectInitialOptions();

    clickOption(/onde fica o studio/i);
    clickOption(/abrir no mapa/i);
    expectInitialOptions();

    clickOption(/formas de pagamento/i);
    clickOption(/pagar com pix/i);
    expectInitialOptions();

    clickOption(/cuidados com as unhas/i);
    expect(
      screen.getByRole('button', { name: /quero marcar um agendamento/i })
    ).toBeInTheDocument();
  });

  it('agendamento: seleciona vários procedimentos e envia todos ao WhatsApp', () => {
    render(<ChatAssistant />);
    openChat();
    clickOption(/quero marcar um agendamento/i);

    clickOption(/cutilagem/i);
    expect(screen.getByRole('button', { name: /cutilagem/i })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    clickOption(/manicure/i);

    clickOption(/pronto, continuar/i);
    expect(screen.getByText(/cutilagem, manicure/i)).toBeInTheDocument();

    clickOption(/isso mesmo/i);
    expect(window.open).toHaveBeenCalledWith(
      expect.stringContaining('Cutilagem%2C%20Manicure'),
      '_blank',
      'noopener,noreferrer'
    );
    expectInitialOptions();
  });

  it('não faz scroll automático ao alternar um procedimento', () => {
    render(<ChatAssistant />);
    openChat();
    clickOption(/quero marcar um agendamento/i);

    const scrollSpy = vi.mocked(window.HTMLElement.prototype.scrollIntoView);
    scrollSpy.mockClear();

    fireEvent.click(screen.getByRole('button', { name: /cutilagem/i }));
    expect(scrollSpy).not.toHaveBeenCalled();
  });
});
