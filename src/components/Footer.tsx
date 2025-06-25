import React from 'react';
import { MessageCircle, Heart, Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-earthy-900 via-earthy-800 to-earthy-900 text-turmeric-100">
      {/* Main Footer */}
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-achari-500 to-achari-600 rounded-2xl flex items-center justify-center shadow-glow">
                  <span className="text-white font-bold text-xl font-serif">A</span>
                </div>
                <div>
                  <span className="text-2xl font-bold text-white font-serif">Achari Bliss</span>
                  <div className="text-xs text-turmeric-300 font-medium tracking-wider">AUTHENTIC PICKLES</div>
                </div>
              </div>
              <p className="text-turmeric-200 leading-relaxed mb-6 max-w-md">
                Preserving the authentic taste of traditional Indian pickles with recipes passed down through generations. Made with love, delivered with care.
              </p>
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="w-5 h-5 text-achari-400" />
                <span className="text-lg font-medium">Handmade in India</span>
                <span className="text-2xl">🇮🇳</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
              <ul className="space-y-3">
                <li><Link to="/" className="text-turmeric-200 hover:text-white transition-colors duration-300">Home</Link></li>
                <li><Link to="/shop" className="text-turmeric-200 hover:text-white transition-colors duration-300">Shop</Link></li>
                <li><Link to="/cart" className="text-turmeric-200 hover:text-white transition-colors duration-300">Cart</Link></li>
                <li><Link to="/contact" className="text-turmeric-200 hover:text-white transition-colors duration-300">Contact</Link></li>
                <li><a href="#" className="text-turmeric-200 hover:text-white transition-colors duration-300">About Us</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-white font-bold text-lg mb-6">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-achari-400" />
                  <span className="text-turmeric-200">+91 99999 99999</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-achari-400" />
                  <span className="text-turmeric-200">hello@acharibliss.com</span>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-achari-400 mt-1" />
                  <span className="text-turmeric-200">Mumbai, Maharashtra<br />India</span>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media & WhatsApp */}
          <div className="border-t border-earthy-700 pt-8 mt-12">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-6">
                <span className="text-turmeric-200 font-medium">Follow Us:</span>
                <div className="flex items-center space-x-4">
                  <a href="#" className="w-10 h-10 bg-earthy-700 hover:bg-achari-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                    <Instagram className="w-5 h-5 text-turmeric-200 hover:text-white" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-earthy-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                    <Facebook className="w-5 h-5 text-turmeric-200 hover:text-white" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-earthy-700 hover:bg-blue-400 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                    <Twitter className="w-5 h-5 text-turmeric-200 hover:text-white" />
                  </a>
                </div>
              </div>
              
              <a 
                href="https://wa.me/919999999999?text=Hi, I'd like to order some pickles from Achari Bliss." 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-soft"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-earthy-700 py-6 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-turmeric-300">
            © 2025 Achari Bliss • Preserving Tradition, One Jar at a Time • All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;