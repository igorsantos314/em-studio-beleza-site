import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import AddressSection from './AddressSection';
import { STUDIO_MAPS_EMBED_URL } from '../../constants/contacts';

describe('AddressSection', () => {
  it('exibe o mapa do Google acima do nome da rua', () => {
    render(<AddressSection />);

    const map = screen.getByTitle(/localização do EM Studio Beleza no Google Maps/i);
    const street = screen.getByRole('heading', { name: /rua garanhus, 161/i });

    expect(map).toHaveAttribute('src', STUDIO_MAPS_EMBED_URL);
    expect(map.compareDocumentPosition(street) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });
});
