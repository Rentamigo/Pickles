import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';

const Cart: React.FC = () => {
  const { state } = useCart();

  const deliveryFee = state.total > 500 ? 0 : 50;
  const finalTotal = state.total + deliveryFee;

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-amber-50 pt-20 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-12">
            <ShoppingBag className="w-24 h-24 text-amber-300 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-amber-900 mb-4">Your Cart is Empty</h2>
            <p className="text-amber-700 mb-8 text-lg">
              Looks like you haven't added any delicious pickles to your cart yet.
            </p>
            <Link
              to="/shop"
              className="inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50 pt-20 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-amber-900 mb-2">
            Your Cart
          </h1>
          <p className="text-amber-700">
            {state.itemCount} {state.itemCount === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {state.items.map((item) => (
              <CartItem key={item.product.id} item={item} />
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h3 className="text-xl font-bold text-amber-900 mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-amber-700">
                  <span>Subtotal ({state.itemCount} items)</span>
                  <span>₹{state.total}</span>
                </div>
                
                <div className="flex justify-between text-amber-700">
                  <span>Delivery Fee</span>
                  <span className={deliveryFee === 0 ? 'text-green-600 font-medium' : ''}>
                    {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                  </span>
                </div>
                
                {state.total < 500 && (
                  <div className="text-sm text-amber-600 bg-amber-50 p-3 rounded-lg">
                    Add ₹{500 - state.total} more for free delivery!
                  </div>
                )}
                
                <div className="border-t border-amber-200 pt-4">
                  <div className="flex justify-between text-lg font-bold text-amber-900">
                    <span>Total</span>
                    <span>₹{finalTotal}</span>
                  </div>
                </div>
              </div>

              <Link
                to="/checkout"
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="mt-6 text-center">
                <Link
                  to="/shop"
                  className="text-amber-600 hover:text-red-600 font-medium transition-colors duration-200"
                >
                  ← Continue Shopping
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-amber-200">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="text-xs text-amber-600">
                    <div className="font-medium">🔒 Secure</div>
                    <div>Payment</div>
                  </div>
                  <div className="text-xs text-amber-600">
                    <div className="font-medium">🚚 Fast</div>
                    <div>Delivery</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;