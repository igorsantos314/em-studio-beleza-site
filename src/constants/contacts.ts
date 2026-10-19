export const CONTACTS = {
  whatsapp: {
    number: '5581993214165',
    url: 'https://wa.me/5581993214165',
  },
  instagram: {
    username: '@ellenmoraes.sb',
    url: 'https://instagram.com/ellenmoraes.sb',
  },
} as const;

export const STUDIO_MAPS_URL = 'https://share.google/JsvaTXN3dzCPs3lM5';

export const STUDIO_ADDRESS = {
  full: 'Rua Garanhus, 161 - Bairro São Pedro, Belo Jardim, Pernambuco',
  reference: 'Ponto de referência: Rua do Berg Ostenta',
  mapsUrl: STUDIO_MAPS_URL,
} as const;

export const STUDIO_MAPS_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(
  STUDIO_ADDRESS.full
)}&z=16&hl=pt-BR&output=embed`;

export const WHATSAPP_MESSAGES = {
  general: encodeURIComponent(
    'Olá! Visitei o site do EM Studio Beleza e gostaria muito de conhecer mais sobre os serviços de nail design. Poderia me passar mais informações?'
  ),
  cutilagem: encodeURIComponent(
    'Olá! Gostaria de saber mais informações sobre o serviço de *Cutilagem*. Poderia me passar mais detalhes e valores?'
  ),
  plasticaPes: encodeURIComponent(
    'Olá! Gostaria de saber mais informações sobre o serviço de *Plástica dos Pés*. Poderia me passar mais detalhes e valores?'
  ),
  spaPes: encodeURIComponent(
    'Olá! Gostaria de saber mais informações sobre o serviço de *Spa dos Pés*. Poderia me passar mais detalhes e valores?'
  ),
  banhoGel: encodeURIComponent(
    'Olá! Gostaria de saber mais informações sobre o serviço de *Banho em Gel*. Poderia me passar mais detalhes e valores?'
  ),
  esmaltacaoGel: encodeURIComponent(
    'Olá! Gostaria de saber mais informações sobre o serviço de *Esmaltação em Gel*. Poderia me passar mais detalhes e valores?'
  ),
  manicurePedicure: encodeURIComponent(
    'Olá! Gostaria de saber mais informações sobre os serviços de *Manicure e Pedicure*. Poderia me passar mais detalhes e valores?'
  ),
  extensaoDeUnhas: encodeURIComponent(
    'Olá! Gostaria de saber mais informações sobre o serviço de *Extensão de Unhas*. Poderia me passar mais detalhes e valores?'
  ),
} as const;
