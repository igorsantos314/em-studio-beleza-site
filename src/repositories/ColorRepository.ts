import type { Color, ColorCategory, ColorFilter, ColorRepository as IColorRepository } from '../types/Color';

class ColorRepository implements IColorRepository {
  private colors: Color[] = [
    // Nude Collection
    {
      id: 'nude-001',
      name: 'Nude Clássico',
      hex: '#F5DEB3',
      rgb: { r: 245, g: 222, b: 179 },
      category: 'nude',
      gradient: 'from-amber-100 to-amber-200',
      description: 'Tom nude perfeito para o dia a dia',
      popularity: 95,
      isTrending: true
    },
    {
      id: 'nude-002',
      name: 'Bege Rosado',
      hex: '#E6C2A6',
      rgb: { r: 230, g: 194, b: 166 },
      category: 'nude',
      gradient: 'from-rose-100 to-orange-100',
      description: 'Nude com toque rosado elegante',
      popularity: 87
    },
    {
      id: 'nude-003',
      name: 'Champagne',
      hex: '#F7E7CE',
      rgb: { r: 247, g: 231, b: 206 },
      category: 'nude',
      gradient: 'from-yellow-50 to-orange-100',
      description: 'Tom sofisticado como champagne',
      popularity: 82
    },
    
    // Pink Collection
    {
      id: 'pink-001',
      name: 'Rosa Millennial',
      hex: '#FFB6C1',
      rgb: { r: 255, g: 182, b: 193 },
      category: 'pink',
      gradient: 'from-pink-200 to-pink-300',
      description: 'O rosa que define uma geração',
      popularity: 92,
      isTrending: true
    },
    {
      id: 'pink-002',
      name: 'Rosa Bebê',
      hex: '#FFD1DC',
      rgb: { r: 255, g: 209, b: 220 },
      category: 'pink',
      gradient: 'from-pink-100 to-pink-200',
      description: 'Delicado como um sonho',
      popularity: 88
    },
    {
      id: 'pink-003',
      name: 'Rosa Choque',
      hex: '#FF69B4',
      rgb: { r: 255, g: 105, b: 180 },
      category: 'pink',
      gradient: 'from-pink-400 to-pink-500',
      description: 'Para quem quer se destacar',
      popularity: 75,
      isNew: true
    },
    {
      id: 'pink-004',
      name: 'Rosa Antigo',
      hex: '#C08081',
      rgb: { r: 192, g: 128, b: 129 },
      category: 'pink',
      gradient: 'from-rose-300 to-rose-400',
      description: 'Elegância vintage',
      popularity: 79
    },
    
    // Red Collection
    {
      id: 'red-001',
      name: 'Vermelho Paixão',
      hex: '#DC143C',
      rgb: { r: 220, g: 20, b: 60 },
      category: 'red',
      gradient: 'from-red-500 to-red-600',
      description: 'Clássico que nunca sai de moda',
      popularity: 90,
      isTrending: true
    },
    {
      id: 'red-002',
      name: 'Vermelho Cereja',
      hex: '#800020',
      rgb: { r: 128, g: 0, b: 32 },
      category: 'red',
      gradient: 'from-red-700 to-red-800',
      description: 'Sofisticado e intenso',
      popularity: 84
    },
    {
      id: 'red-003',
      name: 'Coral Vibrante',
      hex: '#FF6B6B',
      rgb: { r: 255, g: 107, b: 107 },
      category: 'red',
      gradient: 'from-red-400 to-orange-400',
      description: 'Energia do verão',
      popularity: 81,
      isNew: true
    },
    
    // Purple Collection
    {
      id: 'purple-001',
      name: 'Roxo Místico',
      hex: '#8A2BE2',
      rgb: { r: 138, g: 43, b: 226 },
      category: 'purple',
      gradient: 'from-purple-500 to-purple-600',
      description: 'Misterioso e encantador',
      popularity: 76
    },
    {
      id: 'purple-002',
      name: 'Lavanda',
      hex: '#E6E6FA',
      rgb: { r: 230, g: 230, b: 250 },
      category: 'purple',
      gradient: 'from-purple-100 to-purple-200',
      description: 'Serenidade em suas mãos',
      popularity: 83
    },
    {
      id: 'purple-003',
      name: 'Violeta Real',
      hex: '#663399',
      rgb: { r: 102, g: 51, b: 153 },
      category: 'purple',
      gradient: 'from-purple-600 to-purple-700',
      description: 'Nobreza e elegância',
      popularity: 72
    },
    
    // Blue Collection
    {
      id: 'blue-001',
      name: 'Azul Serenity',
      hex: '#87CEEB',
      rgb: { r: 135, g: 206, b: 235 },
      category: 'blue',
      gradient: 'from-blue-300 to-blue-400',
      description: 'Paz e tranquilidade',
      popularity: 78
    },
    {
      id: 'blue-002',
      name: 'Azul Marinho',
      hex: '#000080',
      rgb: { r: 0, g: 0, b: 128 },
      category: 'blue',
      gradient: 'from-blue-800 to-blue-900',
      description: 'Clássico e atemporal',
      popularity: 85
    },
    {
      id: 'blue-003',
      name: 'Turquesa',
      hex: '#40E0D0',
      rgb: { r: 64, g: 224, b: 208 },
      category: 'blue',
      gradient: 'from-teal-400 to-cyan-400',
      description: 'Frescor tropical',
      popularity: 74,
      isTrending: true
    },
    
    // Green Collection
    {
      id: 'green-001',
      name: 'Verde Menta',
      hex: '#98FB98',
      rgb: { r: 152, g: 251, b: 152 },
      category: 'green',
      gradient: 'from-green-200 to-green-300',
      description: 'Refrescante como menta',
      popularity: 71
    },
    {
      id: 'green-002',
      name: 'Verde Esmeralda',
      hex: '#50C878',
      rgb: { r: 80, g: 200, b: 120 },
      category: 'green',
      gradient: 'from-emerald-400 to-emerald-500',
      description: 'Luxo da natureza',
      popularity: 73
    },
    
    // Metallic Collection
    {
      id: 'metallic-001',
      name: 'Dourado Luxo',
      hex: '#FFD700',
      rgb: { r: 255, g: 215, b: 0 },
      category: 'metallic',
      gradient: 'from-yellow-300 to-yellow-400',
      description: 'Brilho que chama atenção',
      popularity: 89,
      isTrending: true
    },
    {
      id: 'metallic-002',
      name: 'Prata Elegante',
      hex: '#C0C0C0',
      rgb: { r: 192, g: 192, b: 192 },
      category: 'metallic',
      gradient: 'from-gray-300 to-gray-400',
      description: 'Sofisticação em prata',
      popularity: 77
    },
    {
      id: 'metallic-003',
      name: 'Rose Gold',
      hex: '#E8B4B8',
      rgb: { r: 232, g: 180, b: 184 },
      category: 'metallic',
      gradient: 'from-rose-200 to-pink-300',
      description: 'Tendência que virou clássico',
      popularity: 91,
      isTrending: true
    },
    
    // Special/Artistic Collection
    {
      id: 'special-001',
      name: 'Holográfico',
      hex: '#FF00FF',
      rgb: { r: 255, g: 0, b: 255 },
      category: 'special',
      gradient: 'from-purple-400 via-pink-400 to-blue-400',
      description: 'Efeito mágico nas unhas',
      popularity: 68,
      isNew: true
    },
    {
      id: 'special-002',
      name: 'Glitter Arco-íris',
      hex: '#9400D3',
      rgb: { r: 148, g: 0, b: 211 },
      category: 'special',
      gradient: 'from-violet-500 via-purple-500 to-fuchsia-500',
      description: 'Todas as cores em uma',
      popularity: 62,
      isNew: true
    }
  ];

  async getAllColors(): Promise<Color[]> {
    // Simular chamada de API
    return new Promise((resolve) => {
      setTimeout(() => resolve([...this.colors]), 100);
    });
  }

  async getColorsByCategory(category: ColorCategory): Promise<Color[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filtered = this.colors.filter(color => color.category === category);
        resolve(filtered);
      }, 100);
    });
  }

  async searchColors(filter: ColorFilter): Promise<Color[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        let filtered = [...this.colors];

        if (filter.category) {
          filtered = filtered.filter(color => color.category === filter.category);
        }

        if (filter.searchTerm) {
          const searchTerm = filter.searchTerm.toLowerCase();
          filtered = filtered.filter(color => 
            color.name.toLowerCase().includes(searchTerm) ||
            color.description?.toLowerCase().includes(searchTerm)
          );
        }

        if (filter.showOnlyNew) {
          filtered = filtered.filter(color => color.isNew);
        }

        if (filter.showOnlyTrending) {
          filtered = filtered.filter(color => color.isTrending);
        }

        resolve(filtered);
      }, 100);
    });
  }

  async getColorById(id: string): Promise<Color | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const color = this.colors.find(c => c.id === id) || null;
        resolve(color);
      }, 50);
    });
  }

  async getTrendingColors(): Promise<Color[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const trending = this.colors
          .filter(color => color.isTrending)
          .sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
        resolve(trending);
      }, 100);
    });
  }

  async getPopularColors(): Promise<Color[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const popular = this.colors
          .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
          .slice(0, 12);
        resolve(popular);
      }, 100);
    });
  }
}

export const colorRepository = new ColorRepository();