import React, { useState } from 'react';
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag, Heart, Gift, Truck, Shield } from 'lucide-react';
import { useCart, useCartActions } from '../context/CartContext';
import CartSidebar from '../components/CartSidebar';

const Cart: React.FC = () => {
  const { state } = useCart();
  const { removeItem, updateQuantity, clearCart } = useCartActions();
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null);
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);

  // Navigation function
  const handleNavigation = (path: string) => {
    if ((window as any).navigate) {
      (window as any).navigate(path);
    } else {
      window.location.href = path;
    }
  };

  // Mock promo codes
  const promoCodes = {
    'WELCOME10': 10,
    'PICKLE20': 20,
    'SAVE15': 15,
    'FIRST25': 25
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const handleApplyPromo = async () => {
    setIsApplyingPromo(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const discount = promoCodes[promoCode.toUpperCase() as keyof typeof promoCodes];
    if (discount) {
      setAppliedPromo({ code: promoCode.toUpperCase(), discount });
      setPromoCode('');
    } else {
      alert('Invalid promo code. Try: WELCOME10, PICKLE20, SAVE15, or FIRST25');
    }
    
    setIsApplyingPromo(false);
  };

  const removePromo = () => {
    setAppliedPromo(null);
  };

  // Calculate totals
  const subtotal = state.total;
  const promoDiscount = appliedPromo ? (subtotal * appliedPromo.discount) / 100 : 0;
  const shipping = subtotal > 500 ? 0 : 49; // Free shipping over ₹500
  const tax = (subtotal - promoDiscount) * 0.05; // 5% tax
  const total = subtotal - promoDiscount + shipping + tax;

  const suggestedProducts = [
    {
      id: 'suggest-1',
      name: 'Garlic Pickle',
      price: 349,
      originalPrice: 449,
      image: 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg?auto=compress&cs=tinysrgb&w=200',
      badge: 'Popular'
    },
    {
      id: 'suggest-2',
      name: 'Lemon Pickle',
      price: 199,
      originalPrice: 279,
      image: 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg?auto=compress&cs=tinysrgb&w=200',
      badge: 'Bestseller'
    }
  ];

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-[#FFFDF6] py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-[#2B2B2B] mb-4">Your Cart is Empty</h1>
            <p className="text-xl text-[#2B2B2B]/70 mb-8">
              Looks like you haven't added any delicious pickles to your cart yet.
            </p>
            <button 
              onClick={() => handleNavigation('/shop')}
              className="bg-[#D7263D] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#C71F37] transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-2 mx-auto"
            >
              <span>Start Shopping</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFDF6] py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#2B2B2B] mb-2">Shopping Cart</h1>
          <p className="text-[#2B2B2B]/70">Review your items and proceed to checkout</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {/* Items List */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-[#2B2B2B]">
                    Cart Items ({state.itemCount})
                  </h2>
                  <button
                    onClick={clearCart}
                    className="text-red-500 hover:text-red-700 text-sm font-medium"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
              
              <div className="divide-y divide-gray-200">
                {state.items.map((item) => (
                  <div key={item.id} className="p-6">
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-[#2B2B2B] mb-1">{item.name}</h3>
                        {item.weight && (
                          <p className="text-sm text-gray-500 mb-2">{item.weight}</p>
                        )}
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-[#D7263D]">₹{item.price}</span>
                          {item.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">₹{item.originalPrice}</span>
                          )}
                        </div>
                      </div>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center border-2 border-gray-300 rounded-lg">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="p-2 hover:bg-gray-100 transition-colors"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-4 py-2 text-lg font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-gray-100 transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-lg font-bold text-[#2B2B2B]">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                        
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Suggested Products */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-[#2B2B2B] mb-4">You might also like</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {suggestedProducts.map((product) => (
                  <div key={product.id} className="flex items-center space-x-4 p-4 bg-[#FFFDF6] rounded-lg">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-[#2B2B2B]">{product.name}</h4>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-[#D7263D]">₹{product.price}</span>
                        <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                      </div>
                    </div>
                    <button className="bg-[#087E8B] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#065a63] transition-colors">
                      Add
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-[#2B2B2B] mb-6">Order Summary</h2>
              
              {/* Promo Code */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#2B2B2B] mb-2">
                  Promo Code
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D7263D] focus:border-transparent"
                  />
                  <button
                    onClick={handleApplyPromo}
                    disabled={!promoCode || isApplyingPromo}
                    className="bg-[#087E8B] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#065a63] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isApplyingPromo ? 'Applying...' : 'Apply'}
                  </button>
                </div>
                {appliedPromo && (
                  <div className="mt-2 flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-2">
                    <span className="text-sm text-green-800 font-medium">
                      {appliedPromo.code} applied ({appliedPromo.discount}% off)
                    </span>
                    <button
                      onClick={removePromo}
                      className="text-green-600 hover:text-green-800 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
              
              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-[#2B2B2B]">Subtotal</span>
                  <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
                </div>
                
                {appliedPromo && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({appliedPromo.code})</span>
                    <span>-₹{promoDiscount.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-[#2B2B2B]">Shipping</span>
                  <span className="font-semibold">
                    {shipping === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      `₹${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-[#2B2B2B]">Tax (5%)</span>
                  <span className="font-semibold">₹{tax.toFixed(2)}</span>
                </div>
                
                <div className="border-t pt-3 flex justify-between font-bold text-lg">
                  <span className="text-[#2B2B2B]">Total</span>
                  <span className="text-[#D7263D]">₹{total.toFixed(2)}</span>
                </div>
              </div>

              {/* Shipping Info */}
              <div className="mb-6 p-4 bg-[#FFFDF6] rounded-lg">
                <div className="flex items-center space-x-2 text-[#087E8B] mb-2">
                  <Truck className="h-5 w-5" />
                  <span className="font-medium">
                    {shipping === 0 ? 'Free Delivery' : 'Standard Delivery'}
                  </span>
                </div>
                <p className="text-sm text-[#2B2B2B]/70">
                  {shipping === 0 
                    ? 'Congratulations! You qualify for free delivery.'
                    : `Add ₹${(500 - subtotal).toFixed(2)} more for free delivery.`
                  }
                </p>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <Shield className="h-6 w-6 text-[#F4C95D] mx-auto mb-1" />
                  <p className="text-xs text-[#2B2B2B]/70">Secure Payment</p>
                </div>
                <div className="text-center">
                  <Truck className="h-6 w-6 text-[#F4C95D] mx-auto mb-1" />
                  <p className="text-xs text-[#2B2B2B]/70">Fast Delivery</p>
                </div>
              </div>

              {/* Checkout Button */}
              <button 
                onClick={() => handleNavigation('/checkout')}
                className="w-full bg-[#D7263D] text-white py-4 rounded-lg text-lg font-semibold hover:bg-[#C71F37] transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2 mb-4"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="h-5 w-5" />
              </button>

              <button 
                onClick={() => handleNavigation('/shop')}
                className="w-full border-2 border-[#087E8B] text-[#087E8B] py-3 rounded-lg font-semibold hover:bg-[#087E8B] hover:text-white transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Sidebar */}
      <CartSidebar />
    </div>
  );
};

export default Cart;