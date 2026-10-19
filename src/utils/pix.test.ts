import { describe, expect, it } from 'vitest';
import { buildPixAppUri, buildPixPayload, crc16 } from './pix';

describe('crc16', () => {
  it('calcula o CRC16-CCITT-FALSE', () => {
    expect(crc16('123456789')).toBe('29B1');
  });
});

describe('buildPixPayload (BR Code)', () => {
  const payload = buildPixPayload({
    key: '+5581993214165',
    merchantName: 'ELLEN MORAES',
    merchantCity: 'BELO JARDIM',
    amount: 50,
  });

  it('inicia com o payload format indicator', () => {
    expect(payload.startsWith('000201')).toBe(true);
  });

  it('inclui a GUI do PIX e a chave', () => {
    expect(payload).toContain('0014BR.GOV.BCB.PIX');
    expect(payload).toContain('0114+5581993214165');
  });

  it('inclui país, nome, cidade e valor', () => {
    expect(payload).toContain('5802BR');
    expect(payload).toContain('5912ELLEN MORAES');
    expect(payload).toContain('6011BELO JARDIM');
    expect(payload).toContain('540550.00');
  });

  it('finaliza com o CRC correto (campo 6304 + CRC)', () => {
    const semCrc = payload.slice(0, -4);
    expect(semCrc.endsWith('6304')).toBe(true);
    expect(payload.endsWith(crc16(semCrc))).toBe(true);
  });

  it('omite o valor quando não informado', () => {
    const semValor = buildPixPayload({ key: 'a', merchantName: 'x', merchantCity: 'y' });
    expect(semValor).not.toContain('540550.00');
    expect(semValor.length).toBeLessThan(payload.length);
  });

  it('remove acentos de nome e cidade', () => {
    const comAcento = buildPixPayload({
      key: 'k',
      merchantName: 'Ellen Moraes',
      merchantCity: 'São Paulo',
    });
    expect(comAcento).toContain('6009Sao Paulo');
  });
});

describe('buildPixAppUri', () => {
  it('monta a URI pix:// com o payload codificado', () => {
    expect(buildPixAppUri('000201')).toBe('pix://?qr=000201');
  });

  it('codifica caracteres especiais', () => {
    expect(buildPixAppUri('a b')).toBe('pix://?qr=a%20b');
  });
});
