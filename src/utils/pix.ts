export interface PixPayloadInput {
  key: string;
  merchantName: string;
  merchantCity: string;
  amount?: number;
  txid?: string;
  description?: string;
}

const emvField = (id: string, value: string): string =>
  `${id}${value.length.toString().padStart(2, '0')}${value}`;

export const crc16 = (payload: string): string => {
  let crc = 0xffff;
  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let bit = 0; bit < 8; bit++) {
      crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1;
      crc &= 0xffff;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, '0');
};

const sanitize = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\x20-\x7E]/g, '')
    .trim();

export type PixDevice = 'android' | 'ios' | 'desktop';

export const detectPixDevice = (): PixDevice => {
  const ua = navigator.userAgent;
  if (/Android/i.test(ua)) return 'android';
  if (/iPhone|iPad|iPod/i.test(ua)) return 'ios';
  return 'desktop';
};

/**
 * URI padrão do Pix (BR Code / "Tap to Pix" - BCB) para entregar o
 * código Copia e Cola ao aplicativo de pagamento instalado no dispositivo.
 * Formato oficial: pix://?qr=<copia-e-cola codificado>
 */
export const buildPixAppUri = (payload: string): string =>
  `pix://?qr=${encodeURIComponent(payload)}`;


export const buildPixPayload = ({
  key,
  merchantName,
  merchantCity,
  amount,
  txid = '***',
}: PixPayloadInput): string => {
  const merchantAccountInfo = emvField(
    '26',
    `${emvField('00', 'BR.GOV.BCB.PIX')}${emvField('01', key)}`
  );

  const additionalData = emvField('62', emvField('05', txid.slice(0, 25)));

  let payload = '';
  payload += emvField('00', '01');
  payload += merchantAccountInfo;
  payload += emvField('52', '0000');
  payload += emvField('53', '986');
  if (amount && amount > 0) {
    payload += emvField('54', amount.toFixed(2));
  }
  payload += emvField('58', 'BR');
  payload += emvField('59', sanitize(merchantName).slice(0, 25));
  payload += emvField('60', sanitize(merchantCity).slice(0, 15));
  payload += additionalData;
  payload += '6304';

  return payload + crc16(payload);
};
