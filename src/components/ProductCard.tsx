import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Flame, Heart, Star } from 'lucide-react';
import { Product } from '../types/Product';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  showAddToCart?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, showAddToCart = true }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const getSpiceLevelColor = (level: number) => {
    if (level <= 2) return 'text-green-500';
    if (level <= 3) return 'text-yellow-500';
    return 'text-red-500';
  };

  const renderSpiceLevel = (level: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Flame
        key={i}
        className={`w-3 h-3 ${
          i < level ? getSpiceLevelColor(level) : 'text-gray-300'
        }`}
        fill="currentColor"
      />
    ));
  };

  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-500 transform hover:-translate-y-2 border border-turmeric-100 hover:border-turmeric-200">
      <Link to={`/product/${product.id}`}>
        <div className="relative overflow-hidden">
          <img 
  src={`/${product.images?.[0] || product.image}`}
  alt={product.name}
  onError={(e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = '/images/placeholder.png'; // Optional fallback image
  }}
  className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
/>
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col space-y-2">
            {product.originalPrice && (
              <div className="bg-gradient-to-r from-achari-500 to-achari-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-soft">
                Save ₹{product.originalPrice - product.price}
              </div>
            )}
            {product.featured && (
              <div className="bg-gradient-to-r from-turmeric-400 to-turmeric-500 text-earthy-900 px-3 py-1 rounded-full text-sm font-bold shadow-soft flex items-center space-x-1">
                <Star className="w-3 h-3 fill-current" />
                <span>Featured</span>
              </div>
            )}
          </div>

          {/* Wishlist Button */}
          <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110">
            <Heart className="w-5 h-5 text-achari-500 hover:fill-current" />
          </button>
          
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <div className="bg-white/95 backdrop-blur-sm text-gray-800 px-6 py-3 rounded-full font-bold text-lg shadow-soft">
                Out of Stock
              </div>
            </div>
          )}
        </div>
        
        <div className="p-6">
          {/* Region and Spice Level */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-achari-600 font-semibold bg-achari-50 px-3 py-1 rounded-full">
              {product.region}
            </span>
            <div className="flex items-center space-x-1">
              {renderSpiceLevel(product.spiceLevel)}
            </div>
          </div>
          
          {/* Product Name */}
          <h3 className="text-xl font-bold text-earthy-900 mb-3 group-hover:text-achari-600 transition-colors duration-300">
            {product.name}
          </h3>
          
          {/* Description */}
          <p className="text-earthy-600 mb-4 text-sm leading-relaxed line-clamp-2">
            {product.description}
          </p>
          
          {/* Price and Weight */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-achari-600">₹{product.price}</span>
              {product.originalPrice && (
                <span className="text-lg text-gray-400 line-through">₹{product.originalPrice}</span>
              )}
            </div>
            <span className="text-sm text-earthy-500 font-medium bg-turmeric-50 px-2 py-1 rounded-lg">
              {product.weight}
            </span>
          </div>
          
          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Link
              to={`/product/${product.id}`}
              className="flex-1 bg-gradient-to-r from-turmeric-100 to-turmeric-200 hover:from-turmeric-200 hover:to-turmeric-300 text-earthy-800 py-3 px-4 rounded-xl text-center font-semibold transition-all duration-300 transform hover:scale-105"
            >
              View Details
            </Link>
            {showAddToCart && product.inStock && (
              <button
                onClick={handleAddToCart}
                className="flex items-center justify-center bg-gradient-to-r from-achari-500 to-achari-600 hover:from-achari-600 hover:to-achari-700 text-white p-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-soft hover:shadow-glow"
              >
                <ShoppingCart className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;