export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  description: string;
  ingredients: string[];
  spiceLevel: 1 | 2 | 3 | 4 | 5;
  region: 'Andhra' | 'Bengali' | 'Punjabi' | 'Gujarati' | 'Tamil' | 'Kerala' | 'Karnataka';
  type: 'Mango' | 'Lemon' | 'Garlic' | 'Mixed' | 'Chili' | 'Tomato' | 'Fish' | 'Prawn' | 'Chicken' | 'Mutton' | 'Podi' | 'Fryum';
  category: 'Veg Pickles' | 'Non-Veg Pickles' | 'Podis' | 'Fryums';
  weight: string;
  inStock: boolean;
  featured?: boolean;
  nutritionInfo: {
    calories: number;
    fat: string;
    sodium: string;
    carbs: string;
    protein: string;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
}