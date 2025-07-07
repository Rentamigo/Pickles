import React from 'react';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart, useCartActions } from '../context/CartContext';

const CartSidebar: React.FC = () => {
  const { state } = useCart();
  const { removeItem, updateQuantity, closeCart } = useCartActions();

  const handleNavigation = (path: string) => {
    if ((window as any).navigate) {
      (window as any).navigate(path);
    } else {
      window.location.href = path;
    }
    closeCart();
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  if (!state.isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={closeCart}
      />
      
      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl transform transition-transform">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-[#2B2B2B] flex items-center space-x-2">
              <ShoppingBag className="h-6 w-6 text-[#D7263D]" />
              <span>Your Cart ({state.itemCount})</span>
            </h2>
            <button
              onClick={closeCart}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-6 w-6 text-gray-600" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {state.items.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">Your cart is empty</h3>
                <p className="text-gray-500 mb-6">Add some delicious pickles to get started!</p>
                <button
                  onClick={() => handleNavigation('/shop')}
                  className="bg-[#D7263D] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#C71F37] transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {state.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 bg-[#FFFDF6] rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-[#2B2B2B] truncate">{item.name}</h4>
                      {item.weight && (
                        <p className="text-sm text-gray-500">{item.weight}</p>
                      )}
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="font-bold text-[#D7263D]">₹{item.price}</span>
                        {item.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">₹{item.originalPrice}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-gray-200 rounded transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-gray-200 rounded transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {state.items.length > 0 && (
            <div className="border-t border-gray-200 p-6 space-y-4">
              <div className="flex items-center justify-between text-lg font-bold">
                <span>Total:</span>
                <span className="text-[#D7263D]">₹{state.total.toFixed(2)}</span>
              </div>
              <div className="space-y-3">
                <button
                  onClick={() => handleNavigation('/cart')}
                  className="w-full bg-[#087E8B] text-white py-3 rounded-lg font-semibold hover:bg-[#065a63] transition-colors"
                >
                  View Cart
                </button>
                <button
                  onClick={() => handleNavigation('/checkout')}
                  className="w-full bg-[#D7263D] text-white py-3 rounded-lg font-semibold hover:bg-[#C71F37] transition-colors"
                >
                  Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;