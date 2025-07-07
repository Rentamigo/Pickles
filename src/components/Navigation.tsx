import React from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleNavigation = (path: string) => {
    if ((window as any).navigate) {
      (window as any).navigate(path);
    } else {
      window.location.href = path;
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-green-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold cursor-pointer" onClick={() => handleNavigation('/')}>
            PickleCo
          </h1>
        </div>
        <div className="hidden md:flex space-x-6">
          <button onClick={() => handleNavigation('/')} className="hover:text-green-200">
            Home
          </button>
          <button onClick={() => handleNavigation('/shop')} className="hover:text-green-200">
            Shop
          </button>
          <button onClick={() => handleNavigation('/about')} className="hover:text-green-200">
            About
          </button>
          <button onClick={() => handleNavigation('/contact')} className="hover:text-green-200">
            Contact
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={() => handleNavigation('/cart')} className="relative">
            <ShoppingCart className="h-6 w-6 cursor-pointer hover:text-green-200" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              0
            </span>
          </button>
          <button 
            className="h-6 w-6 md:hidden cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 pb-4 border-t border-green-700">
          <div className="flex flex-col space-y-2 mt-4">
            <button 
              onClick={() => handleNavigation('/')} 
              className="text-left py-2 hover:text-green-200"
            >
              Home
            </button>
            <button 
              onClick={() => handleNavigation('/shop')} 
              className="text-left py-2 hover:text-green-200"
            >
              Shop
            </button>
            <button 
              onClick={() => handleNavigation('/about')} 
              className="text-left py-2 hover:text-green-200"
            >
              About
            </button>
            <button 
              onClick={() => handleNavigation('/contact')} 
              className="text-left py-2 hover:text-green-200"
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;