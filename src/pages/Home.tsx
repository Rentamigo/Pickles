import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Star, 
  Truck, 
  Shield, 
  Leaf, 
  Heart,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  ShoppingCart,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  Phone,
  MapPin
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import AddToCartButton from '../components/AddToCartButton';
import CartSidebar from '../components/CartSidebar';

const Home: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [email, setEmail] = useState('');
  const { state } = useCart();

  // Navigation function
  const handleNavigation = (path: string) => {
    if ((window as any).navigate) {
      (window as any).navigate(path);
    } else {
      window.location.href = path;
    }
    setIsMenuOpen(false);
  };

  // Auto-scroll testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Scroll animation hook
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const bestsellers = [
    {
      id: '1',
      name: 'Mango Pickle (Aam ka Achaar)',
      price: 299,
      originalPrice: 399,
      rating: 5,
      image: '/images/Mango1.webp',
      badge: 'Bestseller',
      weight: '250g'
    },
    {
      id: '2',
      name: 'Mixed Vegetable Pickle',
      price: 249,
      originalPrice: 329,
      rating: 5,
      image: '/images/mxv1.webp',
      badge: 'New',
      weight: '250g'
    },
    {
      id: '3',
      name: 'Lemon Pickle (Nimbu Achaar)',
      price: 199,
      originalPrice: 279,
      rating: 4,
      image: '/images/lemon1.png',
      badge: 'Organic',
      weight: '250g'
    },
    {
      id: '4',
      name: 'Garlic Pickle (Lahsun Achaar)',
      price: 349,
      originalPrice: 449,
      rating: 5,
      image: '/images/GarlicPickle1.webp',
      badge: 'Premium',
      weight: '250g'
    }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      city: 'Mumbai',
      text: 'The mango pickle tastes exactly like my grandmother used to make! Absolutely authentic and delicious.',
      rating: 5
    },
    {
      name: 'Rajesh Kumar',
      city: 'Delhi',
      text: 'Fast delivery and amazing quality. The mixed vegetable pickle is now a staple in our home.',
      rating: 5
    },
    {
      name: 'Anita Patel',
      city: 'Ahmedabad',
      text: 'Finally found preservative-free pickles that taste homemade. Will definitely order again!',
      rating: 5
    }
  ];

  const categories = [
    {
      name: 'Spicy Pickles',
      image: '/images/chicken1.jpg',
      description: 'For heat lovers'
    },
    {
      name: 'Mild Pickles',
      image: '/images/Mango1.webp',
      description: 'Perfect for families'
    },
    {
      name: 'Organic & Vegan',
      image: '/images/AmlaPickle.webp',
      description: 'Pure & natural'
    },
    {
      name: 'Sweet & Tangy',
      image: '/images/mxv1.webp',
      description: 'Unique flavors'
    }
  ];

  const trustFeatures = [
    {
      icon: Shield,
      title: 'No Preservatives',
      description: 'Made with natural ingredients only'
    },
    {
      icon: Heart,
      title: 'Homemade',
      description: 'Traditional family recipes'
    },
    {
      icon: Leaf,
      title: 'Farm-Fresh',
      description: 'Sourced directly from farmers'
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Fresh pickles at your doorstep'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FFFDF6] text-[#2B2B2B]">
      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-50 bg-[#FFFDF6] shadow-md border-b border-[#F4C95D]/20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => handleNavigation('/')}>
              <div className="w-8 h-8 bg-[#D7263D] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <h1 className="text-2xl font-bold text-[#D7263D]">PickleCart</h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <button onClick={() => handleNavigation('/')} className="text-[#2B2B2B] hover:text-[#D7263D] transition-colors font-medium">Home</button>
              <button onClick={() => handleNavigation('/shop')} className="text-[#2B2B2B] hover:text-[#D7263D] transition-colors font-medium">Shop</button>
              <button onClick={() => handleNavigation('/about')} className="text-[#2B2B2B] hover:text-[#D7263D] transition-colors font-medium">About</button>
              <button onClick={() => handleNavigation('/contact')} className="text-[#2B2B2B] hover:text-[#D7263D] transition-colors font-medium">Contact</button>
            </div>

            {/* Cart and Mobile Menu */}
            <div className="flex items-center space-x-4">
              <button onClick={() => handleNavigation('/cart')} className="relative p-2 text-[#2B2B2B] hover:text-[#D7263D] transition-colors">
                <ShoppingCart className="h-6 w-6" />
                {state.itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#D7263D] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    {state.itemCount}
                  </span>
                )}
              </button>
              
              {/* Mobile Menu Button */}
              <button 
                className="md:hidden p-2 text-[#2B2B2B] hover:text-[#D7263D] transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-[#F4C95D]/20">
              <div className="flex flex-col space-y-4">
                <button onClick={() => handleNavigation('/')} className="text-left text-[#2B2B2B] hover:text-[#D7263D] transition-colors font-medium">Home</button>
                <button onClick={() => handleNavigation('/shop')} className="text-left text-[#2B2B2B] hover:text-[#D7263D] transition-colors font-medium">Shop</button>
                <button onClick={() => handleNavigation('/about')} className="text-left text-[#2B2B2B] hover:text-[#D7263D] transition-colors font-medium">About</button>
                <button onClick={() => handleNavigation('/contact')} className="text-left text-[#2B2B2B] hover:text-[#D7263D] transition-colors font-medium">Contact</button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F4C95D]/10 to-[#087E8B]/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left animate-fade-in">
              <h1 className="text-4xl lg:text-6xl font-bold text-[#2B2B2B] mb-6 leading-tight">
                Handmade Indian <span className="text-[#D7263D]">Pickles</span> Delivered to Your Door
              </h1>
              <p className="text-xl text-[#2B2B2B]/80 mb-4">Authentic | Homemade | Preservative-Free</p>
              <p className="text-lg text-[#2B2B2B]/70 mb-8">
                Experience the authentic taste of traditional Indian pickles made with love and time-honored recipes.
              </p>
              <button 
                onClick={() => handleNavigation('/shop')}
                className="bg-[#D7263D] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#C71F37] transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-2 mx-auto lg:mx-0"
              >
                <span>Shop Now</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
            <div className="relative animate-fade-in-delay">
              <div className="absolute inset-0 bg-[#F4C95D]/20 rounded-full blur-3xl"></div>
              <img 
                src="/images/gift.jpg" 
                alt="Indian Pickle Jars"
                className="w-full h-96 object-cover rounded-2xl shadow-2xl relative z-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Bestsellers Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl font-bold text-[#2B2B2B] mb-4">Our Bestsellers</h2>
            <p className="text-xl text-[#2B2B2B]/70">Taste the favorites loved by thousands</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestsellers.map((product, index) => (
              <div 
                key={product.id} 
                className="bg-[#FFFDF6] rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-on-scroll group cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => handleNavigation(`/product/${product.id}`)}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 bg-[#D7263D] text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {product.badge}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-[#2B2B2B] mb-2">{product.name}</h3>
                  <div className="flex items-center space-x-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < product.rating ? 'text-[#F4C95D] fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-2xl font-bold text-[#D7263D]">₹{product.price}</span>
                    <span className="text-lg text-gray-500 line-through">₹{product.originalPrice}</span>
                  </div>
                  <AddToCartButton
                    product={product}
                    className="w-full py-3"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why PickleCart Section */}
      <section className="py-20 bg-[#FFFDF6]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl font-bold text-[#2B2B2B] mb-4">Why Choose PickleCart?</h2>
            <p className="text-xl text-[#2B2B2B]/70">Quality you can trust, taste you'll love</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trustFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div 
                  key={index}
                  className="text-center animate-on-scroll group"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="w-20 h-20 bg-[#F4C95D] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#2B2B2B] mb-2">{feature.title}</h3>
                  <p className="text-[#2B2B2B]/70">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl font-bold text-[#2B2B2B] mb-4">What Our Customers Say</h2>
            <p className="text-xl text-[#2B2B2B]/70">Real reviews from real pickle lovers</p>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-2xl bg-[#FFFDF6] shadow-lg">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 p-12 text-center">
                    <div className="flex justify-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-6 w-6 text-[#F4C95D] fill-current" />
                      ))}
                    </div>
                    <p className="text-xl text-[#2B2B2B] mb-6 italic">"{testimonial.text}"</p>
                    <div>
                      <p className="font-semibold text-[#2B2B2B]">{testimonial.name}</p>
                      <p className="text-[#2B2B2B]/70">{testimonial.city}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation Arrows */}
            <button 
              onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-[#D7263D] text-white p-3 rounded-full hover:bg-[#C71F37] transition-colors"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button 
              onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#D7263D] text-white p-3 rounded-full hover:bg-[#C71F37] transition-colors"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            
            {/* Dots Indicator */}
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentTestimonial === index ? 'bg-[#D7263D]' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-20 bg-[#FFFDF6]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl font-bold text-[#2B2B2B] mb-4">Shop by Category</h2>
            <p className="text-xl text-[#2B2B2B]/70">Find your perfect pickle match</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <div 
                key={index}
                className="group cursor-pointer animate-on-scroll"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => handleNavigation('/shop')}
              >
                <div className="relative overflow-hidden rounded-2xl shadow-lg">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                    <p className="text-sm opacity-90">{category.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-[#087E8B]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll">
              <img 
                src="/images/lemon1.png" 
                alt="Pickle Making Process"
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
            </div>
            <div className="text-white animate-on-scroll">
              <h2 className="text-4xl font-bold mb-6">Our Story</h2>
              <p className="text-lg mb-6 opacity-90">
                Started in 1985 by Grandmother Kamala in her small kitchen in Rajasthan, PickleCart began as a way to preserve the authentic taste of traditional Indian pickles for her family.
              </p>
              <p className="text-lg mb-6 opacity-90">
                Today, we continue her legacy by using the same time-honored recipes and natural ingredients, bringing the authentic taste of homemade Indian pickles to families across the country.
              </p>
              <p className="text-lg mb-8 opacity-90">
                Every jar is made with love, care, and the finest ingredients sourced directly from local farmers.
              </p>
              <button 
                onClick={() => handleNavigation('/about')}
                className="bg-[#F4C95D] text-[#2B2B2B] px-8 py-3 rounded-full font-semibold hover:bg-[#F4C95D]/90 transition-colors"
              >
                Learn More About Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center animate-on-scroll">
            <h2 className="text-4xl font-bold text-[#2B2B2B] mb-4">Join Our Achaar Club</h2>
            <p className="text-xl text-[#2B2B2B]/70 mb-8">Get 10% off your first order and exclusive pickle recipes!</p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D7263D] focus:border-transparent"
              />
              <button className="bg-[#D7263D] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#C71F37] transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
            
            <p className="text-sm text-[#2B2B2B]/60 mt-4">
              No spam, just delicious pickle updates and exclusive offers.
            </p>
          </div>
        </div>
      </section>

      {/* Instagram Gallery */}
      <section className="py-20 bg-[#FFFDF6]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl font-bold text-[#2B2B2B] mb-4">Follow Us on Instagram</h2>
            <p className="text-xl text-[#2B2B2B]/70">See how our customers enjoy their pickles</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((index) => (
              <div 
                key={index}
                className="relative group cursor-pointer animate-on-scroll overflow-hidden rounded-lg"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <img 
                  src={`/images/tomato1.jpg`} 
                  alt={`Instagram post ${index}`}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Instagram className="h-8 w-8 text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2B2B2B] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center space-x-2 mb-4 cursor-pointer" onClick={() => handleNavigation('/')}>
                <div className="w-8 h-8 bg-[#D7263D] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">P</span>
                </div>
                <h3 className="text-2xl font-bold text-[#D7263D]">PickleCart</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Authentic Indian pickles made with love and traditional recipes since 1985.
              </p>
              <div className="flex space-x-4">
                <Facebook className="h-6 w-6 text-[#F4C95D] hover:text-white cursor-pointer transition-colors" />
                <Instagram className="h-6 w-6 text-[#F4C95D] hover:text-white cursor-pointer transition-colors" />
                <Twitter className="h-6 w-6 text-[#F4C95D] hover:text-white cursor-pointer transition-colors" />
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><button onClick={() => handleNavigation('/about')} className="text-gray-300 hover:text-[#F4C95D] transition-colors text-left">About Us</button></li>
                <li><button onClick={() => handleNavigation('/shop')} className="text-gray-300 hover:text-[#F4C95D] transition-colors text-left">Shop</button></li>
                <li><a href="/terms" className="text-gray-300 hover:text-[#F4C95D] transition-colors">Terms & Conditions</a></li>
                <li><a href="/privacy" className="text-gray-300 hover:text-[#F4C95D] transition-colors">Privacy Policy</a></li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Categories</h4>
              <ul className="space-y-2">
                <li><button onClick={() => handleNavigation('/shop')} className="text-gray-300 hover:text-[#F4C95D] transition-colors text-left">Spicy Pickles</button></li>
                <li><button onClick={() => handleNavigation('/shop')} className="text-gray-300 hover:text-[#F4C95D] transition-colors text-left">Mild Pickles</button></li>
                <li><button onClick={() => handleNavigation('/shop')} className="text-gray-300 hover:text-[#F4C95D] transition-colors text-left">Organic & Vegan</button></li>
                <li><button onClick={() => handleNavigation('/shop')} className="text-gray-300 hover:text-[#F4C95D] transition-colors text-left">Sweet & Tangy</button></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-[#F4C95D]" />
                  <span className="text-gray-300">+91 98765 43210</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-[#F4C95D]" />
                  <span className="text-gray-300">hello@picklecart.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-[#F4C95D]" />
                  <span className="text-gray-300">Jaipur, Rajasthan, India</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-12 pt-8 text-center">
            <p className="text-gray-300">
              © 2024 PickleCart. All rights reserved. Made with ❤️ for pickle lovers.
            </p>
          </div>
        </div>
      </footer>

      {/* Cart Sidebar */}
      <CartSidebar />
    </div>
  );
};

export default Home;