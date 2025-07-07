import React, { useState, useEffect } from 'react';
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  Minus, 
  Plus, 
  Truck, 
  Shield, 
  Leaf,
  ChevronLeft,
  ChevronRight,
  User,
  Calendar,
  ArrowLeft
} from 'lucide-react';
import { useCart, useCartActions } from '../context/CartContext';
import AddToCartButton from '../components/AddToCartButton';
import CartSidebar from '../components/CartSidebar';

const ProductDetails: React.FC = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { state } = useCart();

  // Navigation function
  const handleNavigation = (path: string) => {
    if ((window as any).navigate) {
      (window as any).navigate(path);
    } else {
      window.location.href = path;
    }
  };

  // Mock product data
  const product = {
    id: '1',
    name: 'Andhra Spicy Mango Pickle',
    price: 149,
    originalPrice: 199,
    weight: '250g',
    rating: 4.5,
    reviewCount: 112,
    description: 'Our signature Andhra-style mango pickle is a perfect blend of raw mangoes, aromatic spices, and traditional mustard oil. Made using a 100-year-old family recipe from Guntur, this pickle delivers an authentic taste that will transport you to the heart of Andhra Pradesh. Each jar is carefully prepared with hand-picked raw mangoes and sun-dried spices.',
    images: [
      '/images/Mango1.webp',
      '/images/Mango2.jpg',
      '/images/Mango3.jpg',
      '/images/mango4.jpg'
    ],
    tags: ['Spicy', 'Vegan', 'Preservative-Free', 'Traditional'],
    ingredients: [
      'Raw Mangoes (60%)',
      'Mustard Oil',
      'Red Chili Powder',
      'Turmeric Powder',
      'Fenugreek Seeds',
      'Mustard Seeds',
      'Asafoetida',
      'Salt'
    ],
    nutritionFacts: {
      calories: '45 per serving',
      fat: '3.2g',
      sodium: '890mg',
      carbs: '4.1g',
      protein: '1.2g'
    },
    storageTips: [
      'Store in a cool, dry place away from direct sunlight',
      'Always use a clean, dry spoon to take out pickle',
      'Ensure the jar is tightly closed after use',
      'Refrigerate after opening for extended freshness',
      'Best consumed within 6 months of opening'
    ],
    deliveryInfo: 'Delivery in 2–4 days across India',
    inStock: true,
    stockCount: 23,
    maxQuantity: 10
  };

  const reviews = [
    {
      id: 1,
      name: 'Priya Reddy',
      rating: 5,
      date: '2 weeks ago',
      comment: 'Absolutely authentic taste! Reminds me of my grandmother\'s homemade pickle. The spice level is perfect and the mango pieces are so fresh. Will definitely order again!',
      verified: true
    },
    {
      id: 2,
      name: 'Rajesh Kumar',
      rating: 4,
      date: '1 month ago',
      comment: 'Great quality pickle with traditional taste. The packaging was excellent and delivery was quick. Slightly more spicy than expected but still delicious.',
      verified: true
    },
    {
      id: 3,
      name: 'Anita Sharma',
      rating: 5,
      date: '3 weeks ago',
      comment: 'This is exactly what I was looking for! No preservatives, authentic Andhra taste, and the oil quality is excellent. My family loves it.',
      verified: true
    }
  ];

  const relatedProducts = [
    {
      id: '2',
      name: 'Hyderabadi Lemon Pickle',
      price: 129,
      originalPrice: 169,
      rating: 4.3,
      reviews: 89,
      image: 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg?auto=compress&cs=tinysrgb&w=300',
      badge: 'Tangy',
      weight: '250g'
    },
    {
      id: '3',
      name: 'Rajasthani Garlic Pickle',
      price: 179,
      originalPrice: 229,
      rating: 4.7,
      reviews: 156,
      image: 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg?auto=compress&cs=tinysrgb&w=300',
      badge: 'Premium',
      weight: '250g'
    },
    {
      id: '4',
      name: 'Kerala Fish Pickle',
      price: 249,
      originalPrice: 299,
      rating: 4.6,
      reviews: 67,
      image: 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg?auto=compress&cs=tinysrgb&w=300',
      badge: 'Coastal',
      weight: '250g'
    },
    {
      id: '5',
      name: 'Mixed Vegetable Pickle',
      price: 139,
      originalPrice: 179,
      rating: 4.4,
      reviews: 203,
      image: 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg?auto=compress&cs=tinysrgb&w=300',
      badge: 'Healthy',
      weight: '250g'
    }
  ];

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, Math.min(product.maxQuantity, quantity + change)));
  };

  const getBadgeColor = (badge: string) => {
    const colors: { [key: string]: string } = {
      'Tangy': 'bg-yellow-500 text-white',
      'Premium': 'bg-purple-500 text-white',
      'Coastal': 'bg-blue-500 text-white',
      'Healthy': 'bg-green-500 text-white',
      'Spicy': 'bg-red-500 text-white',
      'Vegan': 'bg-green-600 text-white',
      'Preservative-Free': 'bg-[#087E8B] text-white',
      'Traditional': 'bg-[#F4C95D] text-[#2B2B2B]'
    };
    return colors[badge] || 'bg-gray-500 text-white';
  };

  // Auto-scroll for image gallery
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedImage((prev) => (prev + 1) % product.images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [product.images.length]);

  return (
    <div className="min-h-screen bg-[#FFFDF6] text-[#2B2B2B]">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center space-x-2 text-sm text-[#2B2B2B]/70">
          <button onClick={() => handleNavigation('/')} className="hover:text-[#D7263D] transition-colors">
            Home
          </button>
          <span>/</span>
          <button onClick={() => handleNavigation('/shop')} className="hover:text-[#D7263D] transition-colors">
            Shop
          </button>
          <span>/</span>
          <span className="text-[#2B2B2B]">{product.name}</span>
        </div>
      </div>

      {/* Back Button */}
      <div className="container mx-auto px-4 mb-6">
        <button 
          onClick={() => handleNavigation('/shop')}
          className="flex items-center space-x-2 text-[#087E8B] hover:text-[#065a63] transition-colors font-medium"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Shop</span>
        </button>
      </div>

      <div className="container mx-auto px-4 pb-16">
        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg group">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-96 lg:h-[500px] object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {product.inStock && (
                <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  In Stock
                </div>
              )}
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="absolute top-4 right-4 p-3 bg-white/80 rounded-full hover:bg-white transition-colors"
              >
                <Heart className={`h-5 w-5 ${isWishlisted ? 'text-[#D7263D] fill-current' : 'text-gray-600'}`} />
              </button>
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-3 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index ? 'border-[#D7263D]' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-[#2B2B2B] mb-4">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-[#F4C95D] fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="text-lg font-medium text-[#2B2B2B]">{product.rating}</span>
                <span className="text-[#2B2B2B]/70">({product.reviewCount} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-3 mb-6">
                <span className="text-4xl font-bold text-[#D7263D]">₹{product.price}</span>
                <span className="text-2xl text-gray-500 line-through">₹{product.originalPrice}</span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </span>
              </div>

              <p className="text-lg text-[#2B2B2B]/80 mb-2">Weight: {product.weight}</p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag, index) => (
                <span
                  key={index}
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${getBadgeColor(tag)}`}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Stock Info */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 text-green-800">
                <Shield className="h-5 w-5" />
                <span className="font-medium">Only {product.stockCount} left in stock!</span>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-lg font-medium text-[#2B2B2B]">Quantity:</span>
                <div className="flex items-center border-2 border-gray-300 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="p-3 hover:bg-gray-100 transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-6 py-3 text-lg font-semibold">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="p-3 hover:bg-gray-100 transition-colors"
                    disabled={quantity >= product.maxQuantity}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <AddToCartButton
                product={product}
                quantity={quantity}
                className="w-full py-4 text-lg"
                showQuantity={true}
              />

              {/* Delivery Info */}
              <div className="flex items-center space-x-3 text-[#087E8B] bg-[#087E8B]/10 p-4 rounded-lg">
                <Truck className="h-5 w-5" />
                <span className="font-medium">{product.deliveryInfo}</span>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="text-center">
                <Shield className="h-8 w-8 text-[#F4C95D] mx-auto mb-2" />
                <p className="text-sm font-medium">No Preservatives</p>
              </div>
              <div className="text-center">
                <Leaf className="h-8 w-8 text-[#F4C95D] mx-auto mb-2" />
                <p className="text-sm font-medium">100% Natural</p>
              </div>
              <div className="text-center">
                <Truck className="h-8 w-8 text-[#F4C95D] mx-auto mb-2" />
                <p className="text-sm font-medium">Fast Delivery</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mb-16">
          <div className="border-b border-gray-200 mb-8">
            <div className="flex space-x-8 overflow-x-auto">
              {['description', 'ingredients', 'storage', 'nutrition'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-2 border-b-2 font-semibold whitespace-nowrap transition-colors capitalize ${
                    activeTab === tab
                      ? 'border-[#D7263D] text-[#D7263D]'
                      : 'border-transparent text-[#2B2B2B]/70 hover:text-[#D7263D]'
                  }`}
                >
                  {tab === 'nutrition' ? 'Nutrition Facts' : tab}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            {activeTab === 'description' && (
              <div>
                <h3 className="text-2xl font-bold text-[#087E8B] mb-4">Product Description</h3>
                <p className="text-lg text-[#2B2B2B]/80 leading-relaxed">{product.description}</p>
              </div>
            )}

            {activeTab === 'ingredients' && (
              <div>
                <h3 className="text-2xl font-bold text-[#087E8B] mb-4">Ingredients</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.ingredients.map((ingredient, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-[#FFFDF6] rounded-lg">
                      <div className="w-2 h-2 bg-[#D7263D] rounded-full"></div>
                      <span className="text-[#2B2B2B]">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'storage' && (
              <div>
                <h3 className="text-2xl font-bold text-[#087E8B] mb-4">Storage Tips</h3>
                <div className="space-y-3">
                  {product.storageTips.map((tip, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 bg-[#FFFDF6] rounded-lg">
                      <div className="w-6 h-6 bg-[#F4C95D] rounded-full flex items-center justify-center text-[#2B2B2B] font-bold text-sm mt-0.5">
                        {index + 1}
                      </div>
                      <span className="text-[#2B2B2B]">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'nutrition' && (
              <div>
                <h3 className="text-2xl font-bold text-[#087E8B] mb-4">Nutrition Facts</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(product.nutritionFacts).map(([key, value]) => (
                    <div key={key} className="bg-[#FFFDF6] p-4 rounded-lg text-center">
                      <p className="text-sm text-[#2B2B2B]/70 capitalize">{key}</p>
                      <p className="text-lg font-bold text-[#2B2B2B]">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Customer Reviews */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#087E8B] mb-8">Customer Reviews</h2>
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#F4C95D] rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-[#2B2B2B]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <h4 className="font-semibold text-[#2B2B2B]">{review.name}</h4>
                        {review.verified && (
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                            Verified Purchase
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-[#2B2B2B]/70">
                        <Calendar className="h-4 w-4" />
                        <span>{review.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < review.rating ? 'text-[#F4C95D] fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <p className="text-[#2B2B2B]/80 leading-relaxed">{review.comment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="text-3xl font-bold text-[#087E8B] mb-8">You Might Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <div
                key={relatedProduct.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer"
                onClick={() => handleNavigation(`/product/${relatedProduct.id}`)}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={relatedProduct.image} 
                    alt={relatedProduct.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-sm font-semibold ${getBadgeColor(relatedProduct.badge)}`}>
                    {relatedProduct.badge}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-[#2B2B2B] mb-2 line-clamp-2">{relatedProduct.name}</h3>
                  <div className="flex items-center space-x-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < Math.floor(relatedProduct.rating) ? 'text-[#F4C95D] fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                    <span className="text-sm text-gray-500 ml-2">({relatedProduct.reviews})</span>
                  </div>
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-xl font-bold text-[#D7263D]">₹{relatedProduct.price}</span>
                    <span className="text-sm text-gray-500 line-through">₹{relatedProduct.originalPrice}</span>
                  </div>
                  <button className="w-full bg-[#087E8B] text-white py-2 rounded-lg font-semibold hover:bg-[#087E8B]/90 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cart Sidebar */}
      <CartSidebar />
    </div>
  );
};

export default ProductDetails;