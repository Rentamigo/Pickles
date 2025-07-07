import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Home from '../pages/Home';
import Shop from '../pages/Shop';
import ProductDetails from '../pages/ProductDetails';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import About from '../pages/About';
import Contact from '../pages/Contact';
import { useCart } from '../context/CartContext';

// Admin pages
import AdminLogin from '../pages/admin/Login';
import AdminDashboard from '../pages/admin/Dashboard';
import AdminProducts from '../pages/admin/Products';
import AdminOrders from '../pages/admin/Orders';
import AdminCustomers from '../pages/admin/Customers';
import AdminSettings from '../pages/admin/Settings';
import AdminSidebar from '../components/AdminSidebar';

// Header component from Home page
const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { state } = useCart();

  const handleNavigation = (path: string) => {
    if ((window as any).navigate) {
      (window as any).navigate(path);
    } else {
      window.location.href = path;
    }
    setIsMenuOpen(false);
  };

  return (
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
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
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
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
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
  );
};

// Footer component from Home page
const AppFooter: React.FC = () => {
  const handleNavigation = (path: string) => {
    if ((window as any).navigate) {
      (window as any).navigate(path);
    } else {
      window.location.href = path;
    }
  };

  return (
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
              <svg className="h-6 w-6 text-[#F4C95D] hover:text-white cursor-pointer transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
              <svg className="h-6 w-6 text-[#F4C95D] hover:text-white cursor-pointer transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
              </svg>
              <svg className="h-6 w-6 text-[#F4C95D] hover:text-white cursor-pointer transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
              </svg>
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
                <svg className="h-5 w-5 text-[#F4C95D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-gray-300">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="h-5 w-5 text-[#F4C95D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-300">hello@picklecart.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="h-5 w-5 text-[#F4C95D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
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
  );
};

const AppRoutes: React.FC = () => {
  // Simple routing based on URL hash or pathname
  const [currentRoute, setCurrentRoute] = React.useState(window.location.pathname || '/');
  const [adminActiveTab, setAdminActiveTab] = React.useState('dashboard');

  // Listen for navigation changes
  React.useEffect(() => {
    const handleNavigation = () => {
      setCurrentRoute(window.location.pathname);
    };

    // Listen for popstate events (back/forward buttons)
    window.addEventListener('popstate', handleNavigation);
    
    // Listen for custom navigation events
    window.addEventListener('navigate', handleNavigation as EventListener);

    return () => {
      window.removeEventListener('popstate', handleNavigation);
      window.removeEventListener('navigate', handleNavigation as EventListener);
    };
  }, []);

  // Navigation function
  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentRoute(path);
    window.dispatchEvent(new CustomEvent('navigate'));
  };

  // Make navigate function available globally
  React.useEffect(() => {
    (window as any).navigate = navigate;
  }, []);

  // Check if user is authenticated for admin routes
  const isAdminAuthenticated = () => {
    return localStorage.getItem('admin-token') !== null;
  };

  const renderPublicPage = () => {
    switch (currentRoute) {
      case '/':
        return <Home />;
      case '/shop':
        return <Shop />;
      case '/product-details':
        return <ProductDetails />;
      case '/cart':
        return <Cart />;
      case '/checkout':
        return <Checkout />;
      case '/about':
        return <About />;
      case '/contact':
        return <Contact />;
      default:
        // Handle dynamic product routes
        if (currentRoute.startsWith('/product/')) {
          return <ProductDetails />;
        }
        return <Home />;
    }
  };

  const renderAdminPage = () => {
    switch (adminActiveTab) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'products':
        return <AdminProducts />;
      case 'orders':
        return <AdminOrders />;
      case 'customers':
        return <AdminCustomers />;
      case 'settings':
        return <AdminSettings />;
      default:
        return <AdminDashboard />;
    }
  };

  // Admin login page
  if (currentRoute === '/admin/login') {
    return <AdminLogin />;
  }

  // Admin panel - check authentication
  if (currentRoute.startsWith('/admin')) {
    if (!isAdminAuthenticated()) {
      // Redirect to login if not authenticated
      React.useEffect(() => {
        navigate('/admin/login');
      }, []);
      return null;
    }

    return (
      <div className="flex min-h-screen bg-[#FFFDF6]">
        <AdminSidebar activeTab={adminActiveTab} onTabChange={setAdminActiveTab} />
        <div className="flex-1 overflow-auto">
          {renderAdminPage()}
        </div>
      </div>
    );
  }

  // Home page with its own complete layout
  if (currentRoute === '/') {
    return <Home />;
  }

  // All other public pages with consistent header and footer
  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF6] text-[#2B2B2B]">
      <Header />
      <main className="flex-1">
        {renderPublicPage()}
      </main>
      <AppFooter />
    </div>
  );
};

export default AppRoutes;