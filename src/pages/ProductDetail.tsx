import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Flame, Leaf, Award, Truck, Heart, Share2, Star, CheckCircle, Clock, Shield } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const product = products.find(p => p.id === id);
  const relatedProducts = products.filter(p => p.id !== id && (p.region === product?.region || p.type === product?.type)).slice(0, 3);

  // Mock additional images for carousel
const productImages = product?.images?.map(img => `/${img}`) || [`/${product?.image}`];

  if (!product) {
    return (
      <div className="min-h-screen bg-turmeric-50 flex items-center justify-center pt-20">
        <div className="text-center bg-white rounded-3xl p-12 shadow-card">
          <div className="text-6xl mb-4">🥒</div>
          <h2 className="text-3xl font-bold text-earthy-900 mb-4">Product Not Found</h2>
          <p className="text-earthy-600 mb-6">The pickle you're looking for seems to have been eaten already!</p>
          <Link 
            to="/shop" 
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-achari-500 to-achari-600 hover:from-achari-600 hover:to-achari-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Shop</span>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
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
        className={`w-5 h-5 ${
          i < level ? getSpiceLevelColor(level) : 'text-gray-300'
        }`}
        fill="currentColor"
      />
    ));
  };

  const features = [
    { icon: Leaf, text: "No Preservatives", color: "text-green-600" },
    { icon: Award, text: "100% Homemade", color: "text-turmeric-600" },
    { icon: Truck, text: "Free Delivery", color: "text-blue-600" },
    { icon: Shield, text: "Quality Assured", color: "text-purple-600" }
  ];

  const tabs = [
    { id: 'description', label: 'Description', icon: Award },
    { id: 'ingredients', label: 'Ingredients', icon: Leaf },
    { id: 'nutrition', label: 'Nutrition', icon: CheckCircle }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-turmeric-50 via-white to-turmeric-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-earthy-600 mb-8">
          <Link to="/" className="hover:text-achari-600 transition-colors duration-200">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-achari-600 transition-colors duration-200">Shop</Link>
          <span>/</span>
          <span className="text-earthy-900 font-medium">{product.name}</span>
        </div>

        {/* Back Button */}
        <Link
          to="/shop"
          className="inline-flex items-center space-x-2 text-earthy-700 hover:text-achari-600 font-medium mb-8 transition-colors duration-200 bg-white px-4 py-2 rounded-full shadow-soft hover:shadow-card"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Shop</span>
        </Link>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Product Images */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="relative bg-white rounded-3xl overflow-hidden shadow-card group">
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-96 lg:h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Badges */}
              <div className="absolute top-6 left-6 flex flex-col space-y-3">
                {product.originalPrice && (
                  <div className="bg-gradient-to-r from-achari-500 to-achari-600 text-white px-4 py-2 rounded-full font-bold shadow-soft">
                    Save ₹{product.originalPrice - product.price}
                  </div>
                )}
                {product.featured && (
                  <div className="bg-gradient-to-r from-turmeric-400 to-turmeric-500 text-earthy-900 px-4 py-2 rounded-full font-bold shadow-soft flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-current" />
                    <span>Featured</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="absolute top-6 right-6 flex flex-col space-y-3">
                <button 
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 hover:scale-110 ${
                    isWishlisted 
                      ? 'bg-achari-500 text-white' 
                      : 'bg-white/90 text-earthy-700 hover:bg-white'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
                <button className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-earthy-700 hover:bg-white hover:scale-110 transition-all duration-300">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {!product.inStock && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <div className="bg-white/95 backdrop-blur-sm text-gray-800 px-8 py-4 rounded-full font-bold text-xl shadow-soft">
                    Out of Stock
                  </div>
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-4">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-3 transition-all duration-300 ${
                    selectedImage === index 
                      ? 'border-achari-500 scale-105' 
                      : 'border-turmeric-200 hover:border-achari-300'
                  }`}
                >
                  <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <span className="bg-achari-50 text-achari-600 px-4 py-2 rounded-full text-sm font-semibold">
                  {product.region}
                </span>
                <span className="bg-turmeric-50 text-turmeric-700 px-4 py-2 rounded-full text-sm font-semibold">
                  {product.type}
                </span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold text-earthy-900 mb-4 font-serif">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-earthy-600 font-medium">4.9 (127 reviews)</span>
              </div>

              {/* Spice Level */}
              <div className="flex items-center space-x-3 mb-6">
                <span className="text-earthy-700 font-semibold">Spice Level:</span>
                <div className="flex items-center space-x-1">
                  {renderSpiceLevel(product.spiceLevel)}
                </div>
                <span className="text-sm text-earthy-600">
                  ({product.spiceLevel === 1 ? 'Mild' : product.spiceLevel <= 3 ? 'Medium' : 'Hot'})
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="bg-gradient-to-r from-achari-50 to-turmeric-50 rounded-2xl p-6">
              <div className="flex items-center space-x-4 mb-2">
                <span className="text-4xl font-bold text-achari-600">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-2xl text-gray-400 line-through">₹{product.originalPrice}</span>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-earthy-600 font-medium">Weight: {product.weight}</span>
                {product.originalPrice && (
                  <span className="text-green-600 font-semibold">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <p className="text-earthy-700 text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 bg-white p-4 rounded-2xl shadow-soft">
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  <span className="text-earthy-700 font-medium">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Quantity and Add to Cart */}
            {product.inStock ? (
              <div className="space-y-6">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-3">
                    <span className="text-earthy-900 font-semibold">Quantity:</span>
                    <div className="flex items-center bg-white border-2 border-turmeric-200 rounded-2xl overflow-hidden">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-4 py-3 hover:bg-turmeric-50 transition-colors duration-200 font-semibold"
                      >
                        -
                      </button>
                      <span className="px-6 py-3 font-bold text-lg border-x-2 border-turmeric-200">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-4 py-3 hover:bg-turmeric-50 transition-colors duration-200 font-semibold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 flex items-center justify-center space-x-3 bg-gradient-to-r from-achari-500 to-achari-600 hover:from-achari-600 hover:to-achari-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-glow hover:shadow-glow-lg"
                  >
                    <ShoppingCart className="w-6 h-6" />
                    <span>Add to Cart</span>
                  </button>
                  <Link
                    to="/cart"
                    onClick={handleAddToCart}
                    className="flex items-center justify-center bg-turmeric-500 hover:bg-turmeric-600 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105"
                  >
                    Buy Now
                  </Link>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">😔</div>
                <h3 className="text-2xl font-bold text-earthy-900 mb-2">Out of Stock</h3>
                <p className="text-earthy-600 mb-6">This delicious pickle is currently unavailable</p>
                <button className="bg-gray-400 text-white px-8 py-4 rounded-2xl font-bold cursor-not-allowed">
                  Notify When Available
                </button>
              </div>
            )}

            {/* Delivery Info */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Truck className="w-6 h-6 text-green-600" />
                <span className="font-bold text-earthy-900">Delivery Information</span>
              </div>
              <div className="space-y-2 text-earthy-700">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Free delivery on orders above ₹500</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>Delivered in 3-5 business days</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-purple-600" />
                  <span>Secure packaging guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="bg-white rounded-3xl shadow-card p-8 mb-20">
          <div className="flex space-x-8 border-b border-turmeric-200 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 pb-4 font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'text-achari-600 border-b-3 border-achari-600'
                    : 'text-earthy-600 hover:text-achari-600'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {activeTab === 'description' && (
            <div className="prose prose-lg max-w-none">
              <h3 className="text-2xl font-bold text-earthy-900 mb-6">About {product.name}</h3>
              <div className="text-earthy-700 leading-relaxed space-y-4">
                <p>
                  {product.description} This traditional recipe has been perfected over generations, 
                  ensuring every jar delivers the authentic taste of Indian pickles.
                </p>
                <p>
                  Made with the finest ingredients and traditional methods, our pickles are a perfect blend of 
                  flavors that will transport you to the heart of Indian cuisine. Each jar is carefully prepared 
                  in small batches to maintain the highest quality and freshness.
                </p>
                <p>
                  Our {product.region} style preparation brings out the unique regional characteristics that make 
                  this pickle special. The perfect balance of spices, oil, and time creates a flavor profile 
                  that's both nostalgic and exciting.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'ingredients' && (
            <div>
              <h3 className="text-2xl font-bold text-earthy-900 mb-6">Premium Ingredients</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {product.ingredients.map((ingredient, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-turmeric-50 to-achari-50 text-earthy-800 px-4 py-3 rounded-2xl font-medium text-center shadow-soft hover:shadow-card transition-all duration-300 transform hover:scale-105"
                  >
                    {ingredient}
                  </div>
                ))}
              </div>
              <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl">
                <div className="flex items-center space-x-2 mb-3">
                  <Leaf className="w-5 h-5 text-green-600" />
                  <span className="font-bold text-earthy-900">Quality Promise</span>
                </div>
                <p className="text-earthy-700">
                  All ingredients are sourced from trusted farmers and suppliers. We use only the freshest, 
                  highest quality ingredients with no artificial preservatives or chemicals.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'nutrition' && (
            <div>
              <h3 className="text-2xl font-bold text-earthy-900 mb-6">Nutrition Information</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-8">
                <div className="text-center bg-gradient-to-br from-achari-50 to-achari-100 p-6 rounded-2xl">
                  <div className="text-3xl font-bold text-achari-600 mb-2">{product.nutritionInfo.calories}</div>
                  <div className="text-earthy-700 font-medium">Calories</div>
                </div>
                <div className="text-center bg-gradient-to-br from-turmeric-50 to-turmeric-100 p-6 rounded-2xl">
                  <div className="text-3xl font-bold text-turmeric-600 mb-2">{product.nutritionInfo.fat}</div>
                  <div className="text-earthy-700 font-medium">Fat</div>
                </div>
                <div className="text-center bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{product.nutritionInfo.sodium}</div>
                  <div className="text-earthy-700 font-medium">Sodium</div>
                </div>
                <div className="text-center bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl">
                  <div className="text-3xl font-bold text-green-600 mb-2">{product.nutritionInfo.carbs}</div>
                  <div className="text-earthy-700 font-medium">Carbs</div>
                </div>
                <div className="text-center bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl">
                  <div className="text-3xl font-bold text-purple-600 mb-2">{product.nutritionInfo.protein}</div>
                  <div className="text-earthy-700 font-medium">Protein</div>
                </div>
              </div>
              <div className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl">
                <div className="flex items-center space-x-2 mb-3">
                  <Award className="w-5 h-5 text-orange-600" />
                  <span className="font-bold text-earthy-900">Health Benefits</span>
                </div>
                <ul className="text-earthy-700 space-y-2">
                  <li>• Rich in probiotics that support digestive health</li>
                  <li>• Contains antioxidants from natural spices</li>
                  <li>• Good source of vitamins and minerals</li>
                  <li>• Made with heart-healthy mustard oil</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Related Products */}
     {relatedProducts.length > 0 && (
  <div>
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-earthy-900 mb-4 font-serif">
        You May Also <span className="text-achari-600">Love</span>
      </h2>
      <p className="text-earthy-600 text-lg">
        Discover more authentic flavors from our collection
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {relatedProducts.map((relatedProduct, index) => (
        <div 
          key={relatedProduct.id}
          className="animate-slide-up"
          style={{ animationDelay: `${index * 150}ms` }}
        >
          <ProductCard
            product={{
              ...relatedProduct,
              image: relatedProduct.images?.[0] || relatedProduct.image
            }}
          />
        </div>
      ))}
    </div>
  </div>
)}

      </div>
    </div>
  );
};

export default ProductDetail;