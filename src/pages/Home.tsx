import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, Leaf, Truck, Award, Users, Globe, ArrowRight, CheckCircle, Star, Quote } from 'lucide-react';
import HeroCarousel from '../components/HeroCarousel';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const Home: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const featuredProducts = products.filter(product => product.featured);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: ChefHat,
      title: "100% Homemade",
      description: "Crafted in small batches with heirloom recipes passed down through generations. Every jar tells a story of authentic Indian tradition.",
      color: "from-turmeric-400 to-turmeric-500",
      bgColor: "bg-turmeric-50",
      iconColor: "text-turmeric-700"
    },
    {
      icon: Leaf,
      title: "Preservative-Free",
      description: "We use traditional sun-drying and cold-pressed mustard oil — no chemicals, no artificial preservatives, just pure goodness.",
      color: "from-green-400 to-green-500",
      bgColor: "bg-green-50",
      iconColor: "text-green-700"
    },
    {
      icon: Truck,
      title: "Pan India Delivery",
      description: "Sealed freshness in eco-friendly glass jars, carefully packaged and shipped across India in just 3–5 days.",
      color: "from-blue-400 to-blue-500",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-700"
    }
  ];

  const stats = [
    { number: "10K+", label: "Happy Customers", icon: Users },
    { number: "50+", label: "Pickle Varieties", icon: Award },
    { number: "25+", label: "Cities Served", icon: Globe },
    { number: "100%", label: "Natural Ingredients", icon: CheckCircle }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      location: "Mumbai, Maharashtra",
      rating: 5,
      review: "The taste of my grandmother's pickles, delivered right to my doorstep. Achari Bliss has truly captured the essence of traditional Indian flavors. Every jar is a journey back to my childhood.",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face",
      product: "Mango Pickle"
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      location: "Delhi, NCR",
      rating: 5,
      review: "Outstanding quality and authentic taste! I've tried many pickle brands, but nothing comes close to Achari Bliss. The Garlick Pickle is absolutely phenomenal - just like my mother used to make.",
      avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face",
      product: "Garlick Pickle"
    },
    {
      id: 3,
      name: "Meera Patel",
      location: "Ahmedabad, Gujarat",
      rating: 5,
      review: "Fresh, flavorful, and made with love! The packaging is excellent and the pickles arrived in perfect condition. My family absolutely loves the Mixed Veg Pickle. Highly recommended!",
      avatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face",
      product: "Mixed Veg Pickle"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-turmeric-50 via-white to-turmeric-50">
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Stats Section */}
      <section className="py-16 bg-white/80 backdrop-blur-sm border-y border-turmeric-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-achari-100 to-achari-200 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-8 h-8 text-achari-600" />
                </div>
                <div className="text-3xl font-bold text-earthy-900 mb-1">{stat.number}</div>
                <div className="text-earthy-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers Section - Moved Up */}
      <section className="py-24 px-4 bg-gradient-to-br from-white via-turmeric-50/30 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-achari-50 text-achari-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Award className="w-4 h-4" />
              <span>Customer Favorites</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-earthy-900 mb-6 font-serif">
              Our <span className="text-achari-600">Bestsellers</span>
            </h2>
            <p className="text-xl text-earthy-600 max-w-3xl mx-auto leading-relaxed">
              Discover our most loved pickles, each bringing unique flavors and memories from traditional Indian households across different regions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {featuredProducts.map((product, index) => (
              <div 
                key={product.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Link
              to="/shop"
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-achari-500 to-achari-600 hover:from-achari-600 hover:to-achari-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-glow hover:shadow-glow-lg"
            >
              <span>View All Products</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-20 transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="inline-flex items-center space-x-2 bg-achari-50 text-achari-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Award className="w-4 h-4" />
              <span>Why Choose Achari Bliss</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-earthy-900 mb-6 font-serif">
              Crafted with <span className="text-achari-600">Tradition</span>
            </h2>
            <p className="text-xl text-earthy-600 max-w-3xl mx-auto leading-relaxed">
              Three generations of pickle-making expertise, bringing authentic flavors from Indian kitchens to your table with uncompromising quality and care.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`group bg-white rounded-3xl p-8 shadow-soft hover:shadow-card transition-all duration-500 transform hover:-translate-y-3 border border-turmeric-100 hover:border-turmeric-200 animate-slide-up`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-soft`}>
                  <feature.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-earthy-900 mb-4 group-hover:text-achari-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-earthy-600 leading-relaxed text-lg">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Reviews Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-earthy-50 via-turmeric-50 to-earthy-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-achari-50 text-achari-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Star className="w-4 h-4 fill-current" />
              <span>Customer Reviews</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-earthy-900 mb-6 font-serif">
              What Our <span className="text-achari-600">Customers Say</span>
            </h2>
            <p className="text-xl text-earthy-600 max-w-3xl mx-auto leading-relaxed">
              Join thousands of satisfied customers who have made Achari Bliss a part of their daily meals and special occasions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className="group bg-white rounded-3xl p-8 shadow-soft hover:shadow-card transition-all duration-500 transform hover:-translate-y-2 border border-turmeric-100 hover:border-achari-200 animate-slide-up"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Quote Icon */}
                <div className="relative mb-6">
                  <Quote className="w-12 h-12 text-achari-200 absolute -top-2 -left-2" />
                  <div className="relative z-10">
                    {/* Rating Stars */}
                    <div className="flex items-center space-x-1 mb-4">
                      {Array.from({ length: testimonial.rating }, (_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-earthy-700 leading-relaxed mb-6 text-lg italic">
                  "{testimonial.review}"
                </p>

                {/* Product Badge */}
                <div className="inline-flex items-center bg-achari-50 text-achari-600 px-3 py-1 rounded-full text-sm font-medium mb-6">
                  <Award className="w-3 h-3 mr-1" />
                  {testimonial.product}
                </div>

                {/* Customer Info */}
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover border-3 border-turmeric-200 group-hover:border-achari-300 transition-colors duration-300"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold text-earthy-900 text-lg">{testimonial.name}</div>
                    <div className="text-earthy-600 text-sm">{testimonial.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Review Stats */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center space-x-8 bg-white rounded-2xl px-8 py-6 shadow-soft">
              <div className="text-center">
                <div className="text-3xl font-bold text-achari-600">4.9</div>
                <div className="flex items-center justify-center space-x-1 mb-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <div className="text-sm text-earthy-600">Average Rating</div>
              </div>
              <div className="w-px h-12 bg-turmeric-200"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-achari-600">2,847</div>
                <div className="text-sm text-earthy-600">Total Reviews</div>
              </div>
              <div className="w-px h-12 bg-turmeric-200"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-achari-600">98%</div>
                <div className="text-sm text-earthy-600">Recommend Us</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;