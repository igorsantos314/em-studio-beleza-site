import { useState, useEffect } from 'react';
import { colorRepository } from '../../repositories/ColorRepository';
import type { Color } from '../../types/Color';
import ColorPaletteModal from '../modals/ColorPaletteModal';

const ColorCatalogSection = () => {
  const [colors, setColors] = useState<Color[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);

  useEffect(() => {
    loadPopularColors();
  }, []);

  const loadPopularColors = async () => {
    try {
      const popularColors = await colorRepository.getPopularColors();
      setColors(popularColors.slice(0, 8)); // Mostrar apenas 8 cores populares
    } catch (error) {
      console.error('Erro ao carregar cores:', error);
    }
  };

  const handleColorSelect = (color: Color) => {
    setSelectedColor(color);
    console.log('Cor selecionada:', color);
    // Aqui você pode adicionar lógica para salvar a cor selecionada
  };

  return (
    <>
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-800 mb-16 text-center">
            Catálogo de Cores
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {colors.map((color) => (
              <div 
                key={color.id} 
                className="group cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              >
                <div className="relative">
                  <div 
                    className={`w-full aspect-square rounded-2xl shadow-lg group-hover:shadow-xl group-hover:scale-110 transform transition-all duration-300 mb-3 ${
                      color.gradient ? `bg-gradient-to-br ${color.gradient}` : ''
                    }`}
                    style={{ backgroundColor: color.gradient ? undefined : color.hex }}
                  >
                    <div className="w-full h-full rounded-2xl bg-gradient-to-br from-white/20 to-transparent" />
                    
                    {/* Badges */}
                    {(color.isTrending || color.isNew) && (
                      <div className="absolute top-2 right-2 flex flex-col space-y-1">
                        {color.isTrending && (
                          <span className="bg-rose-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                            🔥
                          </span>
                        )}
                        {color.isNew && (
                          <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                            ✨
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <p className="text-center text-sm font-medium text-gray-700 group-hover:text-rose-600 transition-colors">
                    {color.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-600 text-lg mb-6">
              E muito mais! Temos uma paleta completa de {colors.length > 0 ? '20+' : ''} cores para você escolher.
            </p>
            
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
            >
              Ver todas as cores
            </button>
            
            {selectedColor && (
              <div className="mt-6 inline-flex items-center space-x-3 bg-rose-50 px-4 py-2 rounded-lg">
                <div 
                  className="w-6 h-6 rounded-full border-2 border-white shadow-sm" 
                  style={{ backgroundColor: selectedColor.hex }}
                />
                <span className="text-rose-700 font-medium">
                  Última cor selecionada: {selectedColor.name}
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Modal de Paleta de Cores */}
      <ColorPaletteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onColorSelect={handleColorSelect}
      />
    </>
  );
};

export default ColorCatalogSection;