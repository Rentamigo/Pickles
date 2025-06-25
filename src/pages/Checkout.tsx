import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, CreditCard, Smartphone, Banknote } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Checkout: React.FC = () => {
  const { state, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    // Shipping Info
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    // Payment
    paymentMethod: 'cod'
  });

  const deliveryFee = state.total > 500 ? 0 : 50;
  const finalTotal = state.total + deliveryFee;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePlaceOrder = () => {
    // Simulate order placement
    setOrderPlaced(true);
    clearCart();
  };

  if (state.items.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-amber-50 pt-20 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-12">
            <h2 className="text-3xl font-bold text-amber-900 mb-4">No Items to Checkout</h2>
            <p className="text-amber-700 mb-8">Your cart is empty. Add some delicious pickles first!</p>
            <Link
              to="/shop"
              className="inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-amber-50 pt-20 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-12">
            <CheckCircle className="w-24 h-24 text-green-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-amber-900 mb-4">Order Placed Successfully!</h2>
            <p className="text-amber-700 mb-2">Thank you for your order, {formData.fullName}!</p>
            <p className="text-amber-600 mb-8">
              Your order will be delivered to {formData.address}, {formData.city} within 3-5 business days.
            </p>
            <div className="space-y-4">
              <Link
                to="/shop"
                className="inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 mr-4"
              >
                Continue Shopping
              </Link>
              <Link
                to="/"
                className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50 pt-20 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          to="/cart"
          className="inline-flex items-center space-x-2 text-amber-800 hover:text-red-600 font-medium mb-8 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Cart</span>
        </Link>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    currentStep >= step
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step}
                </div>
                {step < 3 && (
                  <div
                    className={`w-16 h-1 mx-2 ${
                      currentStep > step ? 'bg-red-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center space-x-16 mt-4">
            <span className={`text-sm ${currentStep >= 1 ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
              Shipping
            </span>
            <span className={`text-sm ${currentStep >= 2 ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
              Payment
            </span>
            <span className={`text-sm ${currentStep >= 3 ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
              Review
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              {/* Step 1: Shipping Information */}
              {currentStep === 1 && (
                <div>
                  <h2 className="text-2xl font-bold text-amber-900 mb-6">Shipping Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-amber-900 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-amber-900 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-amber-900 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-amber-900 mb-2">
                        Pincode *
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-amber-900 mb-2">
                        Address *
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-amber-900 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-amber-900 mb-2">
                        State *
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Payment Method */}
              {currentStep === 2 && (
                <div>
                  <h2 className="text-2xl font-bold text-amber-900 mb-6">Payment Method</h2>
                  <div className="space-y-4">
                    <div
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                        formData.paymentMethod === 'cod'
                          ? 'border-red-500 bg-red-50'
                          : 'border-amber-200 hover:border-amber-300'
                      }`}
                      onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'cod' }))}
                    >
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cod"
                          checked={formData.paymentMethod === 'cod'}
                          onChange={handleInputChange}
                          className="text-red-600"
                        />
                        <Banknote className="w-6 h-6 text-green-600" />
                        <div>
                          <div className="font-semibold text-amber-900">Cash on Delivery</div>
                          <div className="text-sm text-amber-600">Pay when you receive your order</div>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                        formData.paymentMethod === 'upi'
                          ? 'border-red-500 bg-red-50'
                          : 'border-amber-200 hover:border-amber-300'
                      }`}
                      onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'upi' }))}
                    >
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="upi"
                          checked={formData.paymentMethod === 'upi'}
                          onChange={handleInputChange}
                          className="text-red-600"
                        />
                        <Smartphone className="w-6 h-6 text-blue-600" />
                        <div>
                          <div className="font-semibold text-amber-900">UPI Payment</div>
                          <div className="text-sm text-amber-600">Pay using Google Pay, PhonePe, Paytm</div>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                        formData.paymentMethod === 'card'
                          ? 'border-red-500 bg-red-50'
                          : 'border-amber-200 hover:border-amber-300'
                      }`}
                      onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'card' }))}
                    >
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="card"
                          checked={formData.paymentMethod === 'card'}
                          onChange={handleInputChange}
                          className="text-red-600"
                        />
                        <CreditCard className="w-6 h-6 text-purple-600" />
                        <div>
                          <div className="font-semibold text-amber-900">Credit/Debit Card</div>
                          <div className="text-sm text-amber-600">Secure payment via Razorpay</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Review Order */}
              {currentStep === 3 && (
                <div>
                  <h2 className="text-2xl font-bold text-amber-900 mb-6">Review Your Order</h2>
                  
                  {/* Shipping Details */}
                  <div className="mb-6 p-4 bg-amber-50 rounded-lg">
                    <h3 className="font-semibold text-amber-900 mb-2">Shipping Address</h3>
                    <p className="text-amber-700">
                      {formData.fullName}<br />
                      {formData.address}<br />
                      {formData.city}, {formData.state} - {formData.pincode}<br />
                      Phone: {formData.phone}
                    </p>
                  </div>

                  {/* Payment Method */}
                  <div className="mb-6 p-4 bg-amber-50 rounded-lg">
                    <h3 className="font-semibold text-amber-900 mb-2">Payment Method</h3>
                    <p className="text-amber-700">
                      {formData.paymentMethod === 'cod' && 'Cash on Delivery'}
                      {formData.paymentMethod === 'upi' && 'UPI Payment'}
                      {formData.paymentMethod === 'card' && 'Credit/Debit Card'}
                    </p>
                  </div>

                  {/* Order Items */}
                  <div className="space-y-4">
                    {state.items.map((item) => (
                      <div key={item.product.id} className="flex items-center space-x-4 p-4 border border-amber-200 rounded-lg">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-amber-900">{item.product.name}</h4>
                          <p className="text-amber-600">Quantity: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-amber-900">₹{item.product.price * item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                {currentStep > 1 && (
                  <button
                    onClick={handlePreviousStep}
                    className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
                  >
                    Previous
                  </button>
                )}
                
                {currentStep < 3 ? (
                  <button
                    onClick={handleNextStep}
                    className="ml-auto bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={handlePlaceOrder}
                    className="ml-auto bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                  >
                    Place Order
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
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
                
                <div className="border-t border-amber-200 pt-4">
                  <div className="flex justify-between text-lg font-bold text-amber-900">
                    <span>Total</span>
                    <span>₹{finalTotal}</span>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 border-t border-amber-200">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="text-xs text-amber-600">
                    <div className="font-medium">🔒 Secure</div>
                    <div>Checkout</div>
                  </div>
                  <div className="text-xs text-amber-600">
                    <div className="font-medium">🚚 3-5 Days</div>
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

export default Checkout;