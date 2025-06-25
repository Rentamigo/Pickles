import { Product } from '../types/Product';

export const products: Product[] = [
  // VEG PICKLES
  {
    id: '1',
    name: 'Mango Pickle',
    price: 299,
    originalPrice: 349,
    image: 'images/v1.png',
    images: ['images/v1.png', 'images/v1-1.jfif', 'images/v1-2.jpg','images/v1-3.webp' ],
    description: 'Sweet and tangy raw mango pieces, perfectly spiced with traditional masalas and aged to perfection. Made with grandmother\'s secret recipe.',
    ingredients: ['Raw Mango', 'Mustard Oil', 'Red Chili Powder', 'Turmeric', 'Fenugreek Seeds', 'Asafoetida', 'Salt'],
    spiceLevel: 3,
    region: 'Andhra',
    type: 'Mango',
    category: 'Veg Pickles',
    weight: '500g',
    inStock: true,
    featured: true,
    nutritionInfo: {
      calories: 45,
      fat: '2.5g',
      sodium: '890mg',
      carbs: '6g',
      protein: '1g'
    }
  },
  {
    id: '2',
    name: 'Garlic Pickle',
    price: 349,
    originalPrice: 399,
    image: 'images/v5.png',
    images: ['images/v5.png', 'images/v5-1.jpg', 'images/v5-2.jpg','images/v5-3.jpg' ],
    description: 'Premium garlic cloves marinated in aromatic spices, delivering bold flavors that complement every meal perfectly.',
    ingredients: ['Fresh Garlic', 'Mustard Oil', 'Red Chili Powder', 'Coriander Seeds', 'Cumin Seeds', 'Black Mustard Seeds', 'Salt'],
    spiceLevel: 4,
    region: 'Punjabi',
    type: 'Garlic',
    category: 'Veg Pickles',
    weight: '400g',
    inStock: true,
    featured: true,
    nutritionInfo: {
      calories: 52,
      fat: '3.2g',
      sodium: '920mg',
      carbs: '4g',
      protein: '2g'
    }
  },
  {
    id: '3',
    name: 'Mixed Veg Pickle',
    price: 279,
    originalPrice: 329,
    image: 'images/v4.png',
    images: ['images/v4.png', 'images/v4-1.jfif', 'images/v4-2.jfif','images/v4-3.webp' ],
    description: 'A harmonious blend of seasonal vegetables, each piece bursting with authentic regional spices and traditional flavors.',
    ingredients: ['Cauliflower', 'Carrot', 'Turnip', 'Green Chili', 'Mustard Oil', 'Turmeric', 'Red Chili Powder', 'Salt'],
    spiceLevel: 2,
    region: 'Bengali',
    type: 'Mixed',
    category: 'Veg Pickles',
    weight: '450g',
    inStock: true,
    featured: true,
    nutritionInfo: {
      calories: 38,
      fat: '2.1g',
      sodium: '780mg',
      carbs: '5g',
      protein: '1.5g'
    }
  },
  {
    id: '4',
    name: 'Lemon Pickle',
    price: 259,
    originalPrice: 299,
    image: 'images/v3.png',
    images: ['images/v3.png', 'images/v3-1.jfif', 'images/v3-2.jpg','images/v3-3.jpg' ],
    description: 'Tangy lemon pickle with the perfect balance of sourness and spice, made with fresh lemons and traditional spices.',
    ingredients: ['Fresh Lemons', 'Mustard Oil', 'Red Chili Powder', 'Turmeric', 'Fenugreek Powder', 'Mustard Seeds', 'Salt'],
    spiceLevel: 3,
    region: 'Gujarati',
    type: 'Lemon',
    category: 'Veg Pickles',
    weight: '400g',
    inStock: true,
    nutritionInfo: {
      calories: 42,
      fat: '2.8g',
      sodium: '850mg',
      carbs: '4g',
      protein: '1g'
    }
  },
  {
    id: '5',
    name: 'Chilly Pickle',
    price: 329,
    image: 'images/v7.png',
    description: 'For spice lovers! Intense green chili pickle that packs a punch with every bite. Not for the faint-hearted.',
    ingredients: ['Red Chilies', 'Mustard Oil', 'Garlic', 'Ginger', 'Red Chili Powder', 'Cumin Seeds', 'Salt'],
    spiceLevel: 5,
    region: 'Andhra',
    type: 'Chili',
    category: 'Veg Pickles',
    weight: '350g',
    inStock: true,
    nutritionInfo: {
      calories: 48,
      fat: '3.5g',
      sodium: '950mg',
      carbs: '3g',
      protein: '2g'
    }
  },
  {
    id: '6',
    name: 'Tomato Pickle',
    price: 289,
    image: 'images/v2.png',
    images: ['images/v2.png', 'images/v2-11.jpg', 'images/v2-12.jpg'],
    description: 'Tangy and spicy tomato pickle made with sun-ripened tomatoes and a flavorful tempering of mustard, fenugreek, and garlic. Perfect as a side for rice, dosa, or paratha.',
   ingredients: ['Ripe Tomatoes', 'Tamarind Pulp', 'Red Chili Powder', 'Mustard Seeds', 'Fenugreek Seeds', 'Garlic', 'Curry Leaves', 'Salt', 'Sesame Oil', 'Asafoetida'],
    spiceLevel: 2,
    region: 'Andhra',
    type: 'Tomato',
    category: 'Veg Pickles',
    weight: '400g',
    inStock: false,
    nutritionInfo: {
      calories: 44,
      fat: '2.6g',
      sodium: '820mg',
      carbs: '5g',
      protein: '1.2g'
    }
  },

  // NON-VEG PICKLES
  {
    id: '7',
    name: 'Andhra Fish Pickle',
    price: 449,
    originalPrice: 499,
    image: 'images/nv4.png',
    description: 'Traditional Andhra-style fish pickle with tender fish pieces marinated in fiery spices and mustard oil. A coastal delicacy.',
    ingredients: ['Fresh Fish', 'Mustard Oil', 'Red Chili Powder', 'Turmeric', 'Ginger-Garlic Paste', 'Curry Leaves', 'Salt'],
    spiceLevel: 5,
    region: 'Andhra',
    type: 'Fish',
    category: 'Non-Veg Pickles',
    weight: '300g',
    inStock: true,
    featured: true,
    nutritionInfo: {
      calories: 85,
      fat: '5.2g',
      sodium: '1200mg',
      carbs: '2g',
      protein: '8g'
    }
  },
  {
    id: '8',
    name: 'Prawn Pickle',
    price: 549,
    originalPrice: 599,
    image: 'images/nv2.png',
    description: 'Succulent prawns in traditional Bengali spices with mustard oil. A perfect accompaniment to rice and dal.',
    ingredients: ['Fresh Prawns', 'Mustard Oil', 'Panch Phoron', 'Red Chili Powder', 'Turmeric', 'Ginger', 'Salt'],
    spiceLevel: 4,
    region: 'Bengali',
    type: 'Prawn',
    category: 'Non-Veg Pickles',
    weight: '250g',
    inStock: true,
    nutritionInfo: {
      calories: 92,
      fat: '4.8g',
      sodium: '1150mg',
      carbs: '3g',
      protein: '12g'
    }
  },
  {
    id: '9',
    name: 'Chicken Pickle ',
    price: 399,
    image: 'images/nv1.png',
    description: 'Tender chicken pieces slow-cooked in aromatic spices. A protein-rich pickle that\'s perfect for any meal.',
    ingredients: ['Chicken', 'Mustard Oil', 'Red Chili Powder', 'Garam Masala', 'Ginger-Garlic', 'Curry Leaves', 'Salt'],
    spiceLevel: 4,
    region: 'Andhra',
    type: 'Chicken',
    category: 'Non-Veg Pickles',
    weight: '300g',
    inStock: true,
    nutritionInfo: {
      calories: 95,
      fat: '6.2g',
      sodium: '1100mg',
      carbs: '2g',
      protein: '9g'
    }
  },
  {
    id: '10',
    name: 'Mutton Pickle ',
    price: 649,
    originalPrice: 699,
    image: 'images/nv3.png',
    description: 'Premium mutton pickle with rich spices and slow-cooked to perfection. A royal treat for meat lovers.',
    ingredients: ['Mutton', 'Mustard Oil', 'Red Chili Powder', 'Garam Masala', 'Bay Leaves', 'Ginger-Garlic', 'Salt'],
    spiceLevel: 5,
    region: 'Andhra',
    type: 'Mutton',
    category: 'Non-Veg Pickles',
    weight: '250g',
    inStock: true,
    nutritionInfo: {
      calories: 110,
      fat: '8.5g',
      sodium: '1250mg',
      carbs: '1g',
      protein: '11g'
    }
  },

  // PODIS (SPICE POWDERS)
  {
    id: '11',
    name: 'Kakarakaya Podi',
    price: 199,
    originalPrice: 229,
    image: 'images/p3.png',
    description: 'Flavor-packed and slightly bitter dry powder made from sun-dried bitter gourd (kakarakaya) and aromatic Indian spices. Perfect to mix with hot rice and ghee or serve as a side dish for any South Indian meal.',
    ingredients: ['Dried Bitter Gourd Slices', 'Urad Dal', 'Chana Dal', 'Dry Red Chilies', 'Coriander Seeds', 'Cumin Seeds', 'Tamarind', 'Garlic', 'Salt', 'Oil'],
    spiceLevel: 4,
    region: 'Tamil',
    type: 'Podi',
    category: 'Podis',
    weight: '200g',
    inStock: true,
    featured: true,
    nutritionInfo: {
      calories: 65,
      fat: '3.8g',
      sodium: '450mg',
      carbs: '8g',
      protein: '4g'
    }
  },
  {
    id: '12',
    name: 'Karivepaku Podi',
    price: 179,
    image: 'images/p2.png',
    description: 'Nutrient-rich spice powder made from roasted curry leaves, lentils, and aromatic spices. A South Indian staple served with hot rice and ghee.',
  ingredients: ['Curry Leaves', 'Urad Dal', 'Chana Dal', 'Red Chilies', 'Tamarind', 'Cumin Seeds', 'Black Pepper', 'Garlic', 'Salt', 'Asafoetida'],
    spiceLevel: 3,
    region: 'Kerala',
    type: 'Podi',
    category: 'Podis',
    weight: '200g',
    inStock: true,
    nutritionInfo: {
      calories: 58,
      fat: '4.2g',
      sodium: '380mg',
      carbs: '6g',
      protein: '3g'
    }
  },
  {
    id: '13',
    name: 'Palli Podi',
    price: 189,
    originalPrice: 219,
    image: 'images/p1.png',
    description: 'Roasted peanut powder blended with aromatic spices. Rich in protein and healthy fats, ideal as a side for rice or idli.',
ingredients: ['Peanuts', 'Garlic', 'Red Chilies', 'Cumin Seeds', 'Tamarind', 'Salt', 'Oil'],

    spiceLevel: 3,
    region: 'Karnataka',
    type: 'Podi',
    category: 'Podis',
    weight: '200g',
    inStock: true,
    nutritionInfo: {
      calories: 72,
      fat: '5.8g',
      sodium: '420mg',
      carbs: '4g',
      protein: '5g'
    }
  },

  // FRYUMS
  {
    id: '14',
    name: 'Fryums',
    price: 149,
    image: 'images/f1.png',
    description: 'Crispy potato-based fryums that puff up when fried. A perfect crunchy snack for tea time or meals.',
    ingredients: ['Potato Starch', 'Rice Flour', 'Salt', 'Turmeric', 'Red Chili Powder', 'Cumin Powder'],
    spiceLevel: 2,
    region: 'Tamil',
    type: 'Fryum',
    category: 'Fryums',
    weight: '200g',
    inStock: true,
    nutritionInfo: {
      calories: 45,
      fat: '0.5g',
      sodium: '320mg',
      carbs: '10g',
      protein: '1g'
    }
  },
  {
    id: '15',
    name: 'Rice Fryums',
    price: 139,
    originalPrice: 159,
    image: 'images/f2.png',
    description: 'Traditional rice-based fryums with authentic South Indian flavors. Light, crispy, and addictive.',
    ingredients: ['Rice Flour', 'Urad Dal Flour', 'Salt', 'Cumin Seeds', 'Black Pepper', 'Asafoetida'],
    spiceLevel: 1,
    region: 'Karnataka',
    type: 'Fryum',
    category: 'Fryums',
    weight: '200g',
    inStock: true,
    nutritionInfo: {
      calories: 42,
      fat: '0.3g',
      sodium: '280mg',
      carbs: '9g',
      protein: '1.5g'
    }
  },
  {
    id: '16',
    name: 'Tapioca Fryums',
    price: 159,
    image: 'images/f3.png',
    description: 'Unique tapioca-based fryums with a distinctive texture and taste. A Kerala specialty that\'s loved by all.',
    ingredients: ['Tapioca Starch', 'Rice Flour', 'Salt', 'Green Chili', 'Ginger', 'Curry Leaves'],
    spiceLevel: 2,
    region: 'Kerala',
    type: 'Fryum',
    category: 'Fryums',
    weight: '200g',
    inStock: true,
    nutritionInfo: {
      calories: 48,
      fat: '0.4g',
      sodium: '300mg',
      carbs: '11g',
      protein: '0.8g'
    }
  }
];