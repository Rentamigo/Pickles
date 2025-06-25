import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, MessageCircle, Menu, X, Mail, Phone } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar: React.FC = () => {
  const location = useLocation();
  const { state } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white shadow-lg border-b border-gray-100' 
        : 'bg-white/95 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-achari-500 to-achari-600 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300">
              <span className="text-white font-bold text-lg font-serif">A</span>
            </div>
            <div>
              <span className="text-xl font-bold text-earthy-900 font-serif group-hover:text-achari-600 transition-colors duration-300">
                Achari Bliss
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              to="/"
              className={`font-medium transition-colors duration-300 ${
                isActive('/') 
                  ? 'text-achari-600' 
                  : 'text-earthy-700 hover:text-achari-600'
              }`}
            >
              Home
            </Link>
            <Link
              to="/shop"
              className={`font-medium transition-colors duration-300 ${
                isActive('/shop') 
                  ? 'text-achari-600' 
                  : 'text-earthy-700 hover:text-achari-600'
              }`}
            >
              Shop
            </Link>
            <Link
              to="/contact"
              className={`font-medium transition-colors duration-300 ${
                isActive('/contact') 
                  ? 'text-achari-600' 
                  : 'text-earthy-700 hover:text-achari-600'
              }`}
            >
              Contact
            </Link>
            <Link
              to="/cart"
              className={`relative flex items-center space-x-2 font-medium transition-colors duration-300 ${
                isActive('/cart') 
                  ? 'text-achari-600' 
                  : 'text-earthy-700 hover:text-achari-600'
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Cart</span>
              {state.itemCount > 0 && (
                <div className="absolute -top-2 -right-2 bg-achari-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {state.itemCount}
                </div>
              )}
            </Link>
            <a
              href="https://wa.me/919999999999?text=Hi, I'd like to order some pickles from Achari Bliss."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-4">
            <Link
              to="/cart"
              className="relative text-earthy-700 hover:text-achari-600 transition-colors duration-300"
            >
              <ShoppingCart className="w-6 h-6" />
              {state.itemCount > 0 && (
                <div className="absolute -top-2 -right-2 bg-achari-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {state.itemCount}
                </div>
              )}
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-earthy-700 hover:text-achari-600 transition-colors duration-300"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100">
            <div className="px-4 py-4 space-y-2">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block font-medium py-2 px-3 rounded-lg transition-colors duration-300 ${
                  isActive('/') ? 'text-achari-600 bg-achari-50' : 'text-earthy-700 hover:bg-gray-50'
                }`}
              >
                Home
              </Link>
              <Link
                to="/shop"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block font-medium py-2 px-3 rounded-lg transition-colors duration-300 ${
                  isActive('/shop') ? 'text-achari-600 bg-achari-50' : 'text-earthy-700 hover:bg-gray-50'
                }`}
              >
                Shop
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block font-medium py-2 px-3 rounded-lg transition-colors duration-300 ${
                  isActive('/contact') ? 'text-achari-600 bg-achari-50' : 'text-earthy-700 hover:bg-gray-50'
                }`}
              >
                Contact
              </Link>
              <a
                href="https://wa.me/919999999999?text=Hi, I'd like to order some pickles from Achari Bliss."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-green-600 font-medium py-2 px-3 rounded-lg hover:bg-green-50 transition-colors duration-300"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Chat</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;