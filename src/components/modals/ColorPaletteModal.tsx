import React, { useState, useEffect } from 'react';
import { X, Search, Sparkles, TrendingUp, Heart, Palette } from 'lucide-react';
import type { Color, ColorCategory, ColorFilter } from '../../types/Color';
import { colorRepository } from '../../repositories/ColorRepository';

interface ColorPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onColorSelect?: (color: Color) => void;
}

const categoryLabels: Record<ColorCategory, string> = {
  nude: 'Nude',
  pink: 'Rosa',
  red: 'Vermelho',
  purple: 'Roxo',
  blue: 'Azul',
  green: 'Verde',
  yellow: 'Amarelo',
  orange: 'Laranja',
  black: 'Preto',
  white: 'Branco',
  metallic: 'Metálico',
  special: 'Especial'
};

const ColorPaletteModal: React.FC<ColorPaletteModalProps> = ({ isOpen, onClose, onColorSelect }) => {
  const [colors, setColors] = useState<Color[]>([]);
  const [filteredColors, setFilteredColors] = useState<Color[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ColorCategory | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showOnlyTrending, setShowOnlyTrending] = useState(false);
  const [showOnlyNew, setShowOnlyNew] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);

  const categories: (ColorCategory | 'all')[] = [
    'all', 'nude', 'pink', 'red', 'purple', 'blue', 'green', 'metallic', 'special'
  ];

  useEffect(() => {
    if (isOpen) {
      loadColors();
    }
  }, [isOpen]);

  useEffect(() => {
    filterColors();
  }, [colors, selectedCategory, searchTerm, showOnlyTrending, showOnlyNew]);

  const loadColors = async () => {
    setLoading(true);
    try {
      const allColors = await colorRepository.getAllColors();
      setColors(allColors);
    } catch (error) {
      console.error('Erro ao carregar cores:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterColors = async () => {
    const filter: ColorFilter = {
      category: selectedCategory === 'all' ? undefined : selectedCategory as ColorCategory,
      searchTerm: searchTerm || undefined,
      showOnlyNew,
      showOnlyTrending
    };

    try {
      const filtered = await colorRepository.searchColors(filter);
      setFilteredColors(filtered);
    } catch (error) {
      console.error('Erro ao filtrar cores:', error);
    }
  };

  const handleColorClick = (color: Color) => {
    setSelectedColor(color);
    onColorSelect?.(color);
  };

  const getCategoryIcon = (category: ColorCategory | 'all') => {
    switch (category) {
      case 'metallic': return <Sparkles size={16} />;
      case 'special': return <Palette size={16} />;
      default: return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-500 to-pink-500 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">Paleta de Cores</h2>
              <p className="text-rose-100">Escolha a cor perfeita para suas unhas</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="flex h-[calc(90vh-140px)]">
          {/* Sidebar - Filtros */}
          <div className="w-80 bg-gray-50 p-6 overflow-y-auto border-r">
            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Buscar cores..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Quick Filters */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">Filtros Rápidos</h3>
              <div className="space-y-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showOnlyTrending}
                    onChange={(e) => setShowOnlyTrending(e.target.checked)}
                    className="rounded border-gray-300 text-rose-500 focus:ring-rose-500"
                  />
                  <TrendingUp size={16} className="text-rose-500" />
                  <span className="text-sm">Em alta</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showOnlyNew}
                    onChange={(e) => setShowOnlyNew(e.target.checked)}
                    className="rounded border-gray-300 text-rose-500 focus:ring-rose-500"
                  />
                  <Sparkles size={16} className="text-rose-500" />
                  <span className="text-sm">Novidades</span>
                </label>
              </div>
            </div>

            {/* Categories */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Categorias</h3>
              <div className="space-y-1">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                      selectedCategory === category
                        ? 'bg-rose-100 text-rose-700 font-medium'
                        : 'hover:bg-gray-100 text-gray-600'
                    }`}
                  >
                    {getCategoryIcon(category)}
                    <span className="capitalize">
                      {category === 'all' ? 'Todas' : categoryLabels[category as ColorCategory]}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Color Info */}
            {selectedColor && (
              <div className="mt-6 p-4 bg-white rounded-lg shadow-sm border">
                <h4 className="font-semibold text-gray-800 mb-3">Cor Selecionada</h4>
                <div className="flex items-center space-x-3 mb-3">
                  <div 
                    className="w-12 h-12 rounded-lg shadow-md" 
                    style={{ backgroundColor: selectedColor.hex }}
                  />
                  <div>
                    <p className="font-medium text-gray-800">{selectedColor.name}</p>
                    <p className="text-sm text-gray-500">{selectedColor.hex}</p>
                  </div>
                </div>
                {selectedColor.description && (
                  <p className="text-sm text-gray-600 italic">{selectedColor.description}</p>
                )}
              </div>
            )}
          </div>

          {/* Main Content - Colors Grid */}
          <div className="flex-1 p-6 overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto mb-4"></div>
                  <p className="text-gray-600">Carregando cores...</p>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {selectedCategory === 'all' 
                        ? 'Todas as Cores' 
                        : `Cores ${categoryLabels[selectedCategory as ColorCategory]}`
                      }
                    </h3>
                    <p className="text-gray-600">{filteredColors.length} cores disponíveis</p>
                  </div>
                </div>

                <div className="grid grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4">
                  {filteredColors.map((color) => (
                    <div
                      key={color.id}
                      className="group cursor-pointer"
                      onClick={() => handleColorClick(color)}
                    >
                      <div className="relative">
                        <div
                          className={`aspect-square rounded-xl shadow-md group-hover:shadow-xl group-hover:scale-110 transform transition-all duration-300 ${
                            color.gradient ? `bg-gradient-to-br ${color.gradient}` : ''
                          }`}
                          style={{ backgroundColor: color.gradient ? undefined : color.hex }}
                        >
                          {/* Badges */}
                          <div className="absolute top-1 right-1 flex flex-col space-y-1">
                            {color.isTrending && (
                              <div className="bg-rose-500 text-white p-1 rounded-full">
                                <TrendingUp size={10} />
                              </div>
                            )}
                            {color.isNew && (
                              <div className="bg-green-500 text-white p-1 rounded-full">
                                <Sparkles size={10} />
                              </div>
                            )}
                          </div>

                          {/* Selection Indicator */}
                          {selectedColor?.id === color.id && (
                            <div className="absolute inset-0 border-4 border-rose-500 rounded-xl animate-pulse">
                              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <Heart className="text-rose-500 fill-current" size={20} />
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="mt-2 text-center">
                          <p className="text-xs font-medium text-gray-700 group-hover:text-rose-600 transition-colors">
                            {color.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {color.hex}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredColors.length === 0 && (
                  <div className="text-center py-12">
                    <Palette className="mx-auto mb-4 text-gray-400" size={48} />
                    <h3 className="text-lg font-medium text-gray-600 mb-2">Nenhuma cor encontrada</h3>
                    <p className="text-gray-500">Tente ajustar os filtros ou buscar por outro termo.</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <TrendingUp size={14} className="text-rose-500" />
              <span>Em alta</span>
            </div>
            <div className="flex items-center space-x-1">
              <Sparkles size={14} className="text-green-500" />
              <span>Novidade</span>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Fechar
            </button>
            {selectedColor && (
              <button
                onClick={() => {
                  onColorSelect?.(selectedColor);
                  onClose();
                }}
                className="px-6 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-lg hover:from-rose-600 hover:to-pink-600 transition-all transform hover:scale-105"
              >
                Confirmar Seleção
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPaletteModal;