import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import ChatAssistant from './ChatAssistant';
import { STUDIO_MAPS_URL } from '../../constants/contacts';

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

const expectScrollPreserved = () => {
  expect(vi.mocked(window.HTMLElement.prototype.scrollIntoView)).not.toHaveBeenCalled();
};

const lastWhatsappMessage = () => {
  const url = vi.mocked(window.open).mock.calls.at(-1)?.[0];
  return decodeURIComponent(String(url).split('?text=')[1] ?? '');
};

beforeEach(() => {
  vi.useFakeTimers();
  vi.spyOn(window, 'open').mockImplementation(() => null);
  vi.mocked(window.HTMLElement.prototype.scrollIntoView).mockClear();
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe('ChatAssistant', () => {
  it('a animação do launcher não intercepta cliques', () => {
    const { container } = render(<ChatAssistant />);
    expect(container.querySelector('.animate-ping')).toHaveClass('pointer-events-none');
  });

  it('preserva a posição do scroll ao fechar e reabrir após interação', () => {
    const { container } = render(<ChatAssistant />);
    openChat();
    clickOption(/sugestão de cores/i);

    const chatScroll = container.querySelector('.overflow-y-auto') as HTMLElement;
    chatScroll.scrollTop = 240;
    fireEvent.scroll(chatScroll);

    fireEvent.click(screen.getByRole('button', { name: /fechar chat/i }));
    fireEvent.click(screen.getByRole('button', { name: /abrir chat/i }));
    flush();

    expect((container.querySelector('.overflow-y-auto') as HTMLElement).scrollTop).toBe(240);
  });

  it('volta ao início ao reabrir quando não há mensagens do usuário', () => {
    const { container } = render(<ChatAssistant />);
    openChat();

    const chatScroll = container.querySelector('.overflow-y-auto') as HTMLElement;
    chatScroll.scrollTop = 150;
    fireEvent.scroll(chatScroll);

    fireEvent.click(screen.getByRole('button', { name: /fechar chat/i }));
    fireEvent.click(screen.getByRole('button', { name: /abrir chat/i }));
    flush();

    expect((container.querySelector('.overflow-y-auto') as HTMLElement).scrollTop).toBe(0);
  });

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

  it('separa visualmente as confirmações das opções de múltipla escolha no agendamento', () => {
    render(<ChatAssistant />);
    openChat();
    clickOption(/quero marcar um agendamento/i);

    expect(screen.getByRole('button', { name: /cutilagem/i })).not.toHaveClass('mt-4');
    expect(screen.getByRole('button', { name: /pronto, continuar/i })).toHaveClass('mt-4');
    expect(screen.getByRole('button', { name: /pronto, continuar/i })).toHaveClass('bg-green-600');
    expect(
      screen.getByRole('button', { name: /prefiro conversar pelo whatsapp/i })
    ).not.toHaveClass('mt-4');
  });

  it('usa cores distintas para agendamento, WhatsApp e voltar ao início', () => {
    render(<ChatAssistant />);
    openChat();

    expect(screen.getByRole('button', { name: /quero marcar um agendamento/i })).toHaveClass(
      'bg-[#C8B8A8]'
    );

    clickOption(/política de agendamento e cancelamento/i);
    expect(screen.getByRole('button', { name: /voltar ao início/i })).toHaveClass(
      'bg-[#F5EFE9]'
    );

    clickOption(/quero marcar um agendamento/i);
    expect(
      screen.getByRole('button', { name: /prefiro conversar pelo whatsapp/i })
    ).toHaveClass('bg-[#25D366]/10');
  });

  it('agendamento: envia os serviços selecionados junto com a dúvida', () => {
    render(<ChatAssistant />);
    openChat();
    clickOption(/quero marcar um agendamento/i);

    clickOption(/cutilagem/i);
    clickOption(/ainda estou em dúvida/i);
    clickOption(/pronto, continuar/i);

    expect(screen.getByText(/você quer marcar um horário para: cutilagem\?/i)).toBeInTheDocument();

    clickOption(/isso mesmo/i);

    expect(lastWhatsappMessage()).toContain('Cutilagem');
    expect(lastWhatsappMessage()).toContain('mas ainda estou em dúvida.');
  });

  it('agendamento: envia a dúvida mesmo sem serviços selecionados', () => {
    render(<ChatAssistant />);
    openChat();
    clickOption(/quero marcar um agendamento/i);

    clickOption(/ainda estou em dúvida/i);
    clickOption(/pronto, continuar/i);

    expect(lastWhatsappMessage()).toContain('gostaria de agendar um horário');
    expect(lastWhatsappMessage()).toContain('mas ainda estou em dúvida.');
  });

  it('agendamento: permite continuar sem selecionar procedimentos e envia ao WhatsApp', () => {
    render(<ChatAssistant />);
    openChat();
    clickOption(/quero marcar um agendamento/i);

    clickOption(/pronto, continuar/i);

    expect(window.open).toHaveBeenCalledWith(
      expect.stringContaining(encodeURIComponent('gostaria de agendar um horário')),
      '_blank',
      'noopener,noreferrer'
    );
    expect(screen.queryByText(/escolha pelo menos um procedimento/i)).not.toBeInTheDocument();
    expectInitialOptions();
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

  it('mantém o scroll ao percorrer todos os fluxos do menu e voltar ao início', () => {
    render(<ChatAssistant />);
    openChat();
    expectScrollPreserved();

    clickOption(/quero falar pelo whatsapp/i);
    expectScrollPreserved();
    clickOption(/abrir whatsapp/i);
    expectInitialOptions();
    expectScrollPreserved();

    clickOption(/gostaria de ver seu instagram/i);
    expectScrollPreserved();
    clickOption(/abrir instagram/i);
    expectInitialOptions();
    expectScrollPreserved();

    clickOption(/onde fica o studio/i);
    expectScrollPreserved();
    clickOption(/abrir no mapa/i);
    expect(window.open).toHaveBeenCalledWith(
      STUDIO_MAPS_URL,
      '_blank',
      'noopener,noreferrer'
    );
    expectInitialOptions();
    expectScrollPreserved();

    clickOption(/formas de pagamento/i);
    expectScrollPreserved();
    clickOption(/pagar com pix/i);
    expectInitialOptions();
    expectScrollPreserved();

    clickOption(/política de agendamento e cancelamento/i);
    expectScrollPreserved();
    clickOption(/voltar ao início/i);
    expectInitialOptions();
    expectScrollPreserved();

    clickOption(/cuidados com as unhas/i);
    expectScrollPreserved();
    clickOption(/voltar ao início/i);
    expectInitialOptions();
    expectScrollPreserved();
  });

  it('mantém o scroll no fluxo de agendamento, confirmação e retorno ao início', () => {
    render(<ChatAssistant />);
    openChat();

    clickOption(/quero marcar um agendamento/i);
    expectScrollPreserved();

    clickOption(/cutilagem/i);
    expectScrollPreserved();
    clickOption(/manicure/i);
    expectScrollPreserved();

    clickOption(/pronto, continuar/i);
    expect(screen.getByText(/cutilagem, manicure/i)).toBeInTheDocument();
    expectScrollPreserved();

    clickOption(/não é isso/i);
    expect(screen.getByRole('button', { name: /cutilagem/i })).toBeInTheDocument();
    expectScrollPreserved();

    clickOption(/voltar ao início/i);
    expectInitialOptions();
    expectScrollPreserved();

    clickOption(/quero marcar um agendamento/i);
    clickOption(/cutilagem/i);
    clickOption(/pronto, continuar/i);
    clickOption(/isso mesmo/i);
    expectInitialOptions();
    expectScrollPreserved();

    clickOption(/quero marcar um agendamento/i);
    clickOption(/prefiro conversar pelo whatsapp/i);
    expectInitialOptions();
    expectScrollPreserved();
  });

  it('mantém o scroll em todos os fluxos de cores e ao voltar ao início', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.42);
    render(<ChatAssistant />);
    openChat();

    clickOption(/sugestão de cores/i);
    expectScrollPreserved();

    clickOption(/combine com um evento/i);
    expectScrollPreserved();
    clickOption(/casamento/i);
    expectScrollPreserved();
    clickOption(/enviar a opção para o whatsapp/i);
    expectInitialOptions();
    expectScrollPreserved();

    clickOption(/sugestão de cores/i);
    clickOption(/combine com minha roupa/i);
    clickOption(/tons claros/i);
    clickOption(/marcar o agendamento já com a cor/i);
    expect(screen.getByRole('button', { name: /cutilagem/i })).toBeInTheDocument();
    expectScrollPreserved();
    clickOption(/voltar ao início/i);
    expectInitialOptions();
    expectScrollPreserved();

    clickOption(/sugestão de cores/i);
    clickOption(/combine com meu sentimento/i);
    clickOption(/romântica/i);
    clickOption(/voltar ao início/i);
    expectInitialOptions();
    expectScrollPreserved();

    clickOption(/sugestão de cores/i);
    clickOption(/combine com um evento/i);
    clickOption(/^voltar$/i);
    expect(screen.getByRole('button', { name: /cor aleatória/i })).toBeInTheDocument();
    expectScrollPreserved();
    clickOption(/voltar ao início/i);
    expectInitialOptions();
    expectScrollPreserved();

    clickOption(/sugestão de cores/i);
    fireEvent.click(screen.getByRole('button', { name: /cor aleatória/i }));
    flush(6000);
    expectScrollPreserved();
    clickOption(/estou curiosa para saber qual a cor/i);
    expectInitialOptions();
    expectScrollPreserved();

    clickOption(/sugestão de cores/i);
    fireEvent.click(screen.getByRole('button', { name: /cor aleatória/i }));
    flush(6000);
    clickOption(/quero rodar novamente/i);
    flush(6000);
    clickOption(/estou curiosa para saber qual a cor/i);
    expectInitialOptions();
    expectScrollPreserved();

    clickOption(/sugestão de cores/i);
    clickOption(/ver a paleta completa/i);
    expect(screen.getByText(/paleta de cores/i)).toBeInTheDocument();
    expectScrollPreserved();
    fireEvent.click(screen.getByRole('button', { name: /^fechar$/i }));
    flush();
    expectInitialOptions();
    expectScrollPreserved();
  });
});
