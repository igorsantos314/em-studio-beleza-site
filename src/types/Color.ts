export interface Color {
  id: string;
  name: string;
  hex: string;
  rgb: {
    r: number;
    g: number;
    b: number;
  };
  category: ColorCategory;
  gradient?: string;
  description?: string;
  popularity?: number;
  isNew?: boolean;
  isTrending?: boolean;
}

export type ColorCategory = 
  | 'nude'
  | 'pink' 
  | 'red'
  | 'purple'
  | 'blue'
  | 'green'
  | 'yellow'
  | 'orange'
  | 'black'
  | 'white'
  | 'metallic'
  | 'special';

export interface ColorFilter {
  category?: ColorCategory;
  searchTerm?: string;
  showOnlyNew?: boolean;
  showOnlyTrending?: boolean;
}

export interface ColorRepository {
  getAllColors(): Promise<Color[]>;
  getColorsByCategory(category: ColorCategory): Promise<Color[]>;
  searchColors(filter: ColorFilter): Promise<Color[]>;
  getColorById(id: string): Promise<Color | null>;
  getTrendingColors(): Promise<Color[]>;
  getPopularColors(): Promise<Color[]>;
}