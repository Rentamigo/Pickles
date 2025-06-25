import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '../types/Product';
import { useCart } from '../context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(item.product.id);
    } else {
      updateQuantity(item.product.id, newQuantity);
    }
  };

  return (
    <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm border border-amber-100">
      <img
        src={item.product.image}
        alt={item.product.name}
        className="w-20 h-20 object-cover rounded-lg"
      />
      
      <div className="flex-1">
        <h3 className="font-semibold text-amber-900">{item.product.name}</h3>
        <p className="text-amber-600 text-sm">{item.product.weight}</p>
        <p className="text-red-600 font-bold">₹{item.product.price}</p>
      </div>
      
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handleQuantityChange(item.quantity - 1)}
          className="w-8 h-8 rounded-full bg-amber-100 hover:bg-amber-200 flex items-center justify-center transition-colors duration-200"
        >
          <Minus className="w-4 h-4 text-amber-800" />
        </button>
        
        <span className="w-8 text-center font-semibold text-amber-900">
          {item.quantity}
        </span>
        
        <button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="w-8 h-8 rounded-full bg-amber-100 hover:bg-amber-200 flex items-center justify-center transition-colors duration-200"
        >
          <Plus className="w-4 h-4 text-amber-800" />
        </button>
      </div>
      
      <div className="text-right">
        <p className="font-bold text-amber-900">₹{item.product.price * item.quantity}</p>
        <button
          onClick={() => removeFromCart(item.product.id)}
          className="text-red-500 hover:text-red-700 mt-1 transition-colors duration-200"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;