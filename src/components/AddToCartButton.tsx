import React, { useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { useCartActions } from '../context/CartContext';

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    weight?: string;
    maxQuantity?: number;
  };
  quantity?: number;
  className?: string;
  showQuantity?: boolean;
  onAddToCart?: () => void;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  product,
  quantity = 1,
  className = '',
  showQuantity = false,
  onAddToCart
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const { addItem, openCart } = useCartActions();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent parent click events
    
    setIsAdding(true);
    
    // Add item to cart
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      weight: product.weight,
      maxQuantity: product.maxQuantity,
      quantity
    });

    // Show success state
    setTimeout(() => {
      setIsAdding(false);
      setIsAdded(true);
      
      // Open cart sidebar
      setTimeout(() => {
        openCart();
      }, 300);
      
      // Reset success state
      setTimeout(() => {
        setIsAdded(false);
      }, 2000);
    }, 500);

    // Call optional callback
    if (onAddToCart) {
      onAddToCart();
    }
  };

  const baseClasses = "flex items-center justify-center space-x-2 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg";
  
  const getButtonContent = () => {
    if (isAdding) {
      return (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
          <span>Adding...</span>
        </>
      );
    }
    
    if (isAdded) {
      return (
        <>
          <Check className="h-4 w-4" />
          <span>Added!</span>
        </>
      );
    }
    
    return (
      <>
        <ShoppingCart className="h-4 w-4" />
        <span>
          Add to Cart
          {showQuantity && quantity > 1 && ` (${quantity})`}
          {showQuantity && ` - ₹${(product.price * quantity).toFixed(2)}`}
        </span>
      </>
    );
  };

  const getButtonClasses = () => {
    if (isAdded) {
      return `${baseClasses} bg-green-500 text-white hover:bg-green-600 ${className}`;
    }
    
    if (isAdding) {
      return `${baseClasses} bg-[#D7263D]/70 text-white cursor-not-allowed ${className}`;
    }
    
    return `${baseClasses} bg-[#D7263D] text-white hover:bg-[#C71F37] ${className}`;
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdding}
      className={getButtonClasses()}
    >
      {getButtonContent()}
    </button>
  );
};

export default AddToCartButton;