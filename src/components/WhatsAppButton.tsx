import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton: React.FC = () => {
  return (
    <a
      href="https://wa.me/919999999999?text=Hi, I'd like to order some pickles from Achari Bliss."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-4 rounded-full shadow-glow hover:shadow-glow-lg transition-all duration-300 transform hover:scale-110 animate-float"
    >
      <MessageCircle className="w-6 h-6" />
      <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
    </a>
  );
};

export default WhatsAppButton;