import React, { useState } from 'react';
import { 
  CreditCard, 
  MapPin, 
  User, 
  Phone, 
  Mail, 
  Lock, 
  CheckCircle, 
  Truck,
  Calendar,
  Shield,
  ArrowLeft,
  Gift
} from 'lucide-react';
import { useCart, useCartActions } from '../context/CartContext';

const Checkout: React.FC = () => {
  const { state } = useCart();
  const { clearCart } = useCartActions();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Navigation function
  const handleNavigation = (path: string) => {
    if ((window as any).navigate) {
      (window as any).navigate(path);
    } else {
      window.location.href = path;
    }
  };

  // Form states
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  const [shippingInfo, setShippingInfo] = useState({
    address: '',
    city: '',
    state: '',
    pincode: '',
    landmark: ''
  });

  const [paymentInfo, setPaymentInfo] = useState({
    method: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    upiId: ''
  });

  // Calculate totals (same as cart)
  const subtotal = state.total;
  const shipping = subtotal > 500 ? 0 : 49;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;

  const handleInputChange = (section: string, field: string, value: string) => {
    switch (section) {
      case 'customer':
        setCustomerInfo(prev => ({ ...prev, [field]: value }));
        break;
      case 'shipping':
        setShippingInfo(prev => ({ ...prev, [field]: value }));
        break;
      case 'payment':
        setPaymentInfo(prev => ({ ...prev, [field]: value }));
        break;
    }
  };

  const validateStep = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        return customerInfo.firstName && customerInfo.lastName && customerInfo.email && customerInfo.phone;
      case 2:
        return shippingInfo.address && shippingInfo.city && shippingInfo.state && shippingInfo.pincode;
      case 3:
        if (paymentInfo.method === 'card') {
          return paymentInfo.cardNumber && paymentInfo.expiryDate && paymentInfo.cvv && paymentInfo.cardName;
        } else if (paymentInfo.method === 'upi') {
          return paymentInfo.upiId;
        }
        return true; // For COD
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    } else {
      alert('Please fill in all required fields');
    }
  };

  const handlePlaceOrder = async () => {
    if (!validateStep(3)) {
      alert('Please complete payment information');
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Generate order ID
      const newOrderId = 'PK' + Date.now().toString().slice(-6);
      setOrderId(newOrderId);
      
      // Clear cart and show success
      clearCart();
      setOrderComplete(true);
      setIsProcessing(false);
    } catch (error) {
      setIsProcessing(false);
      alert('Payment failed. Please try again.');
    }
  };

  // If cart is empty, redirect to shop
  if (state.items.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen bg-[#FFFDF6] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#2B2B2B] mb-4">Your cart is empty</h1>
          <button 
            onClick={() => handleNavigation('/shop')}
            className="bg-[#D7263D] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#C71F37] transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  // Order completion screen
  if (orderComplete) {
    return (
      <div className="min-h-screen bg-[#FFFDF6] py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-12 w-12 text-white" />
              </div>
              
              <h1 className="text-3xl font-bold text-[#2B2B2B] mb-4">Order Placed Successfully!</h1>
              <p className="text-xl text-[#2B2B2B]/70 mb-6">
                Thank you for your order. Your delicious pickles are on their way!
              </p>
              
              <div className="bg-[#FFFDF6] rounded-lg p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                  <div>
                    <p className="text-sm text-[#2B2B2B]/70">Order ID</p>
                    <p className="font-bold text-[#D7263D] text-lg">{orderId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#2B2B2B]/70">Total Amount</p>
                    <p className="font-bold text-[#2B2B2B] text-lg">₹{total.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#2B2B2B]/70">Payment Method</p>
                    <p className="font-medium text-[#2B2B2B] capitalize">
                      {paymentInfo.method === 'card' ? 'Credit/Debit Card' : 
                       paymentInfo.method === 'upi' ? 'UPI' : 'Cash on Delivery'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-[#2B2B2B]/70">Estimated Delivery</p>
                    <p className="font-medium text-[#2B2B2B]">3-5 Business Days</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-2 text-[#087E8B]">
                  <Truck className="h-5 w-5" />
                  <span className="font-medium">We'll send you tracking details via email</span>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={() => handleNavigation('/shop')}
                    className="bg-[#D7263D] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#C71F37] transition-colors"
                  >
                    Continue Shopping
                  </button>
                  <button 
                    onClick={() => handleNavigation('/')}
                    className="border-2 border-[#087E8B] text-[#087E8B] px-6 py-3 rounded-lg font-semibold hover:bg-[#087E8B] hover:text-white transition-colors"
                  >
                    Back to Home
                  </button>
                </div>
              </div>
            </div>
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
          <button 
            onClick={() => handleNavigation('/cart')}
            className="flex items-center space-x-2 text-[#087E8B] hover:text-[#065a63] transition-colors font-medium mb-4"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Cart</span>
          </button>
          <h1 className="text-4xl font-bold text-[#2B2B2B] mb-2">Checkout</h1>
          <p className="text-[#2B2B2B]/70">Complete your order in just a few steps</p>
        </div>
        
        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[
              { number: 1, label: 'Information', icon: User },
              { number: 2, label: 'Shipping', icon: MapPin },
              { number: 3, label: 'Payment', icon: CreditCard }
            ].map((stepItem, index) => {
              const IconComponent = stepItem.icon;
              return (
                <React.Fragment key={stepItem.number}>
                  <div className={`flex items-center space-x-2 ${
                    step >= stepItem.number ? 'text-[#D7263D]' : 'text-gray-400'
                  }`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      step >= stepItem.number ? 'bg-[#D7263D] text-white' : 'bg-gray-300'
                    }`}>
                      {step > stepItem.number ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <IconComponent className="h-5 w-5" />
                      )}
                    </div>
                    <span className="font-medium hidden sm:block">{stepItem.label}</span>
                  </div>
                  {index < 2 && (
                    <div className={`w-12 h-px ${
                      step > stepItem.number ? 'bg-[#D7263D]' : 'bg-gray-300'
                    }`}></div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              {/* Step 1: Customer Information */}
              {step === 1 && (
                <div>
                  <h2 className="text-2xl font-semibold mb-6 flex items-center space-x-2">
                    <User className="h-6 w-6 text-[#D7263D]" />
                    <span>Contact Information</span>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#2B2B2B] mb-2">
                        First Name *
                      </label>
                      <input 
                        type="text" 
                        value={customerInfo.firstName}
                        onChange={(e) => handleInputChange('customer', 'firstName', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D7263D] focus:border-transparent"
                        placeholder="Enter first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#2B2B2B] mb-2">
                        Last Name *
                      </label>
                      <input 
                        type="text" 
                        value={customerInfo.lastName}
                        onChange={(e) => handleInputChange('customer', 'lastName', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D7263D] focus:border-transparent"
                        placeholder="Enter last name"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-[#2B2B2B] mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input 
                          type="email" 
                          value={customerInfo.email}
                          onChange={(e) => handleInputChange('customer', 'email', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D7263D] focus:border-transparent"
                          placeholder="Enter email address"
                        />
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-[#2B2B2B] mb-2">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input 
                          type="tel" 
                          value={customerInfo.phone}
                          onChange={(e) => handleInputChange('customer', 'phone', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D7263D] focus:border-transparent"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Shipping Information */}
              {step === 2 && (
                <div>
                  <h2 className="text-2xl font-semibold mb-6 flex items-center space-x-2">
                    <MapPin className="h-6 w-6 text-[#D7263D]" />
                    <span>Shipping Address</span>
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-[#2B2B2B] mb-2">
                        Street Address *
                      </label>
                      <textarea 
                        value={shippingInfo.address}
                        onChange={(e) => handleInputChange('shipping', 'address', e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D7263D] focus:border-transparent"
                        placeholder="Enter your complete address"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-[#2B2B2B] mb-2">
                          City *
                        </label>
                        <input 
                          type="text" 
                          value={shippingInfo.city}
                          onChange={(e) => handleInputChange('shipping', 'city', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D7263D] focus:border-transparent"
                          placeholder="Enter city"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#2B2B2B] mb-2">
                          State *
                        </label>
                        <select 
                          value={shippingInfo.state}
                          onChange={(e) => handleInputChange('shipping', 'state', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D7263D] focus:border-transparent"
                        >
                          <option value="">Select State</option>
                          <option value="Andhra Pradesh">Andhra Pradesh</option>
                          <option value="Karnataka">Karnataka</option>
                          <option value="Tamil Nadu">Tamil Nadu</option>
                          <option value="Kerala">Kerala</option>
                          <option value="Maharashtra">Maharashtra</option>
                          <option value="Gujarat">Gujarat</option>
                          <option value="Rajasthan">Rajasthan</option>
                          <option value="Delhi">Delhi</option>
                          <option value="West Bengal">West Bengal</option>
                          <option value="Uttar Pradesh">Uttar Pradesh</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#2B2B2B] mb-2">
                          PIN Code *
                        </label>
                        <input 
                          type="text" 
                          value={shippingInfo.pincode}
                          onChange={(e) => handleInputChange('shipping', 'pincode', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D7263D] focus:border-transparent"
                          placeholder="Enter PIN code"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#2B2B2B] mb-2">
                          Landmark (Optional)
                        </label>
                        <input 
                          type="text" 
                          value={shippingInfo.landmark}
                          onChange={(e) => handleInputChange('shipping', 'landmark', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D7263D] focus:border-transparent"
                          placeholder="Near landmark"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Payment Information */}
              {step === 3 && (
                <div>
                  <h2 className="text-2xl font-semibold mb-6 flex items-center space-x-2">
                    <CreditCard className="h-6 w-6 text-[#D7263D]" />
                    <span>Payment Method</span>
                  </h2>
                  
                  {/* Payment Method Selection */}
                  <div className="mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { id: 'card', label: 'Credit/Debit Card', icon: CreditCard },
                        { id: 'upi', label: 'UPI Payment', icon: Phone },
                        { id: 'cod', label: 'Cash on Delivery', icon: Gift }
                      ].map((method) => {
                        const IconComponent = method.icon;
                        return (
                          <button
                            key={method.id}
                            onClick={() => handleInputChange('payment', 'method', method.id)}
                            className={`p-4 border-2 rounded-lg transition-colors ${
                              paymentInfo.method === method.id
                                ? 'border-[#D7263D] bg-[#D7263D]/5'
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                          >
                            <IconComponent className={`h-6 w-6 mx-auto mb-2 ${
                              paymentInfo.method === method.id ? 'text-[#D7263D]' : 'text-gray-600'
                            }`} />
                            <p className={`font-medium ${
                              paymentInfo.method === method.id ? 'text-[#D7263D]' : 'text-gray-600'
                            }`}>
                              {method.label}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Payment Details */}
                  {paymentInfo.method === 'card' && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-[#2B2B2B] mb-2">
                          Card Number *
                        </label>
                        <input 
                          type="text" 
                          value={paymentInfo.cardNumber}
                          onChange={(e) => handleInputChange('payment', 'cardNumber', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D7263D] focus:border-transparent"
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-[#2B2B2B] mb-2">
                            Expiry Date *
                          </label>
                          <input 
                            type="text" 
                            value={paymentInfo.expiryDate}
                            onChange={(e) => handleInputChange('payment', 'expiryDate', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D7263D] focus:border-transparent"
                            placeholder="MM/YY"
                            maxLength={5}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#2B2B2B] mb-2">
                            CVV *
                          </label>
                          <input 
                            type="text" 
                            value={paymentInfo.cvv}
                            onChange={(e) => handleInputChange('payment', 'cvv', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D7263D] focus:border-transparent"
                            placeholder="123"
                            maxLength={4}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#2B2B2B] mb-2">
                          Cardholder Name *
                        </label>
                        <input 
                          type="text" 
                          value={paymentInfo.cardName}
                          onChange={(e) => handleInputChange('payment', 'cardName', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D7263D] focus:border-transparent"
                          placeholder="Name as on card"
                        />
                      </div>
                    </div>
                  )}

                  {paymentInfo.method === 'upi' && (
                    <div>
                      <label className="block text-sm font-medium text-[#2B2B2B] mb-2">
                        UPI ID *
                      </label>
                      <input 
                        type="text" 
                        value={paymentInfo.upiId}
                        onChange={(e) => handleInputChange('payment', 'upiId', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D7263D] focus:border-transparent"
                        placeholder="yourname@paytm"
                      />
                    </div>
                  )}

                  {paymentInfo.method === 'cod' && (
                    <div className="bg-[#FFFDF6] border border-[#F4C95D] rounded-lg p-4">
                      <p className="text-[#2B2B2B] font-medium">Cash on Delivery</p>
                      <p className="text-sm text-[#2B2B2B]/70 mt-1">
                        Pay when your order is delivered to your doorstep. Additional charges may apply.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                <button 
                  onClick={() => step > 1 ? setStep(step - 1) : handleNavigation('/cart')}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  {step === 1 ? 'Back to Cart' : 'Previous'}
                </button>
                
                {step < 3 ? (
                  <button 
                    onClick={handleNext}
                    className="px-6 py-3 bg-[#D7263D] text-white rounded-lg hover:bg-[#C71F37] transition-colors font-semibold"
                  >
                    Next Step
                  </button>
                ) : (
                  <button 
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="px-8 py-3 bg-[#D7263D] text-white rounded-lg hover:bg-[#C71F37] transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <Lock className="h-4 w-4" />
                        <span>Place Order</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h3 className="text-xl font-semibold text-[#2B2B2B] mb-6">Order Summary</h3>
              
              {/* Items */}
              <div className="space-y-4 mb-6">
                {state.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-[#2B2B2B] text-sm truncate">{item.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-[#2B2B2B]">₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              
              {/* Totals */}
              <div className="space-y-3 border-t border-gray-200 pt-4">
                <div className="flex justify-between">
                  <span className="text-[#2B2B2B]">Subtotal</span>
                  <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
                </div>
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
                  <span className="text-[#2B2B2B]">Tax</span>
                  <span className="font-semibold">₹{tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-bold text-lg">
                  <span className="text-[#2B2B2B]">Total</span>
                  <span className="text-[#D7263D]">₹{total.toFixed(2)}</span>
                </div>
              </div>

              {/* Security Badge */}
              <div className="mt-6 p-4 bg-[#FFFDF6] rounded-lg">
                <div className="flex items-center space-x-2 text-[#087E8B]">
                  <Shield className="h-5 w-5" />
                  <span className="font-medium text-sm">Secure SSL Encrypted Payment</span>
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