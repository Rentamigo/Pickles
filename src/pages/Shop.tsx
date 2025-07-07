import React, { useState } from 'react';
import { Search, Filter, Grid, List, ChevronDown, X, Star, ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import AddToCartButton from '../components/AddToCartButton';
import CartSidebar from '../components/CartSidebar';

const Shop: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('veg-pickles');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('popularity');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    pickleType: [] as string[],
    spiceLevel: [] as string[],
    priceRange: [] as string[]
  });

  const { state } = useCart();

  // Navigation function
  const handleNavigation = (path: string) => {
    if ((window as any).navigate) {
      (window as any).navigate(path);
    } else {
      window.location.href = path;
    }
  };

  const categories = [
    { id: 'veg-pickles', name: 'Veg Pickles', count: 24 },
    { id: 'non-veg-pickles', name: 'Non-Veg Pickles', count: 12 },
    { id: 'fryums', name: 'Fryums', count: 18 },
    { id: 'combos', name: 'Combos', count: 8 }
  ];

  const filterOptions = {
    pickleType: ['Mango', 'Lemon', 'Garlic', 'Amla', 'Chili', 'Mixed Veg', 'Chicken', 'Mutton', 'Fish', 'Prawns', 'Egg'],
    spiceLevel: ['Mild', 'Medium', 'Spicy'],
    priceRange: ['Under ₹100', '₹100-₹300', '₹300+']
  };

  const sortOptions = [
    { value: 'popularity', label: 'Popularity' },
    { value: 'price-low-high', label: 'Price: Low to High' },
    { value: 'price-high-low', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest First' },
    { value: 'rating', label: 'Customer Rating' }
  ];

  // Mock product data
  const allProducts = {
    'veg-pickles': [
      {
        id: '1',
        name: 'Mango Pickle (Aam ka Achaar)',
        price: 299,
        originalPrice: 399,
        rating: 5,
        reviews: 127,
        image: '/images/Mango1.webp',
        badge: 'Bestseller',
        spiceLevel: 'Medium',
        category: 'Mango',
        weight: '250g'
      },
      {
        id: '2',
        name: 'Lemon Pickle (Nimbu Achaar)',
        price: 199,
        originalPrice: 279,
        rating: 4,
        reviews: 89,
        image: '/images/lemon1.png',
        badge: 'Organic',
        spiceLevel: 'Mild',
        category: 'Lemon',
        weight: '250g'
      },
      {
        id: '3',
        name: 'Garlic Pickle (Lahsun Achaar)',
        price: 349,
        originalPrice: 449,
        rating: 5,
        reviews: 156,
        image: '/images/GarlicPickle1.webp',
        badge: 'Premium',
        spiceLevel: 'Spicy',
        category: 'Garlic',
        weight: '250g'
      },
      {
        id: '4',
        name: 'Mixed Vegetable Pickle',
        price: 249,
        originalPrice: 329,
        rating: 5,
        reviews: 203,
        image: '/images/mxv1.webp',
        badge: 'New',
        spiceLevel: 'Medium',
        category: 'Mixed Veg',
        weight: '250g'
      },
      {
        id: '5',
        name: 'Amla Pickle (Gooseberry)',
        price: 179,
        originalPrice: 249,
        rating: 4,
        reviews: 67,
        image: '/images/AmlaPickle.webp',
        badge: 'Healthy',
        spiceLevel: 'Mild',
        category: 'Amla',
        weight: '250g'
      },
      {
        id: '6',
        name: 'Green Chili Pickle',
        price: 229,
        originalPrice: 299,
        rating: 5,
        reviews: 94,
        image: '/images/chilli1.webp',
        badge: 'Hot',
        spiceLevel: 'Spicy',
        category: 'Chili',
        weight: '250g'
      }
    ],
    'non-veg-pickles': [
      {
        id: '7',
        name: 'Chicken Pickle (Murgh Achaar)',
        price: 449,
        originalPrice: 549,
        rating: 5,
        reviews: 78,
        image: '/images/chicken1.jpg',
        badge: 'Premium',
        spiceLevel: 'Spicy',
        category: 'Chicken',
        weight: '250g'
      },
      {
        id: '8',
        name: 'Mutton Pickle (Gosht Achaar)',
        price: 599,
        originalPrice: 699,
        rating: 5,
        reviews: 45,
        image: '/images/Mutton.webp',
        badge: 'Deluxe',
        spiceLevel: 'Spicy',
        category: 'Mutton',
        weight: '250g'
      },
      {
        id: '9',
        name: 'Fish Pickle (Machli Achaar)',
        price: 399,
        originalPrice: 499,
        rating: 4,
        reviews: 62,
        image: '/images/fish1.webp',
        badge: 'Coastal',
        spiceLevel: 'Medium',
        category: 'Fish',
        weight: '250g'
      }
    ],
    'fryums': [
      {
        id: '10',
        name: 'Traditional Papad Pack',
        price: 149,
        originalPrice: 199,
        rating: 4,
        reviews: 134,
        image: '/images/papad1.webp',
        badge: 'Classic',
        spiceLevel: 'Mild',
        category: 'Papad',
        weight: '200g'
      },
      {
        id: '11',
        name: 'Masala Fryums Mix',
        price: 199,
        originalPrice: 249,
        rating: 5,
        reviews: 89,
        image: '/images/masala1.webp',
        badge: 'Crunchy',
        spiceLevel: 'Medium',
        category: 'Fryums',
        weight: '300g'
      }
    ],
    'combos': [
      {
        id: '12',
        name: 'Family Pickle Combo (4 Jars)',
        price: 899,
        originalPrice: 1199,
        rating: 5,
        reviews: 156,
        image: '/images/tomato1.jpg',
        badge: 'Value Pack',
        spiceLevel: 'Mixed',
        category: 'Family',
        weight: '1kg'
      },
      {
        id: '13',
        name: 'Gift Box - Premium Selection',
        price: 1299,
        originalPrice: 1699,
        rating: 5,
        reviews: 89,
        image: '/images/gift.jpg',
        badge: 'Gift',
        spiceLevel: 'Mixed',
        category: 'Gift',
        weight: '1.5kg'
      }
    ]
  };

  const currentProducts = allProducts[activeCategory as keyof typeof allProducts] || [];
  const productsPerPage = 12;
  const totalPages = Math.ceil(currentProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const displayedProducts = currentProducts.slice(startIndex, startIndex + productsPerPage);

  const handleFilterChange = (filterType: keyof typeof filters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter(item => item !== value)
        : [...prev[filterType], value]
    }));
  };

  const clearFilters = () => {
    setFilters({
      pickleType: [],
      spiceLevel: [],
      priceRange: []
    });
  };

  const getBadgeColor = (badge: string) => {
    const colors: { [key: string]: string } = {
      'Bestseller': 'bg-[#D7263D] text-white',
      'New': 'bg-[#087E8B] text-white',
      'Organic': 'bg-green-500 text-white',
      'Premium': 'bg-purple-500 text-white',
      'Hot': 'bg-red-500 text-white',
      'Healthy': 'bg-blue-500 text-white',
      'Classic': 'bg-gray-600 text-white',
      'Crunchy': 'bg-orange-500 text-white',
      'Value Pack': 'bg-[#F4C95D] text-[#2B2B2B]',
      'Gift': 'bg-pink-500 text-white',
      'Deluxe': 'bg-indigo-500 text-white',
      'Coastal': 'bg-teal-500 text-white'
    };
    return colors[badge] || 'bg-gray-500 text-white';
  };

  const ProductCard: React.FC<{ product: any }> = ({ product }) => (
    <div 
      className="bg-[#FFFDF6] rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer"
      onClick={() => handleNavigation(`/product/${product.id}`)}
    >
      <div className="relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-sm font-semibold ${getBadgeColor(product.badge)}`}>
          {product.badge}
        </span>
        <button 
          className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
          onClick={(e) => {
            e.stopPropagation(); // Prevent card click when clicking wishlist
            console.log('Added to wishlist:', product.name);
          }}
        >
          <Heart className="h-4 w-4 text-gray-600 hover:text-[#D7263D]" />
        </button>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-[#2B2B2B] mb-2 line-clamp-2">{product.name}</h3>
        <div className="flex items-center space-x-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`h-4 w-4 ${i < product.rating ? 'text-[#F4C95D] fill-current' : 'text-gray-300'}`} 
            />
          ))}
          <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
        </div>
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-2xl font-bold text-[#D7263D]">₹{product.price}</span>
          <span className="text-lg text-gray-500 line-through">₹{product.originalPrice}</span>
          <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
          </span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-600">Spice Level: <span className="font-medium">{product.spiceLevel}</span></span>
        </div>
        <AddToCartButton
          product={product}
          className="w-full py-3"
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FFFDF6] text-[#2B2B2B]">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-[#2B2B2B] text-center mb-2">Explore Our Flavors</h1>
          <p className="text-xl text-[#2B2B2B]/70 text-center">Discover authentic Indian pickles and traditional delicacies</p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex space-x-8 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.id);
                  setCurrentPage(1);
                }}
                className={`py-4 px-2 border-b-2 font-semibold whitespace-nowrap transition-colors ${
                  activeCategory === category.id
                    ? 'border-[#D7263D] text-[#D7263D]'
                    : 'border-transparent text-[#2B2B2B]/70 hover:text-[#D7263D]'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-[#2B2B2B]">Filters</h3>
                <button
                  onClick={clearFilters}
                  className="text-[#D7263D] hover:text-[#C71F37] text-sm font-medium"
                >
                  Clear All
                </button>
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#2B2B2B] mb-2">Search Products</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search pickles..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D7263D] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Pickle Type Filter */}
              <div className="mb-6">
                <h4 className="font-semibold text-[#2B2B2B] mb-3">Pickle Type</h4>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {filterOptions.pickleType.map((type) => (
                    <label key={type} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.pickleType.includes(type)}
                        onChange={() => handleFilterChange('pickleType', type)}
                        className="rounded border-gray-300 text-[#D7263D] focus:ring-[#D7263D]"
                      />
                      <span className="text-sm text-[#2B2B2B]">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Spice Level Filter */}
              <div className="mb-6">
                <h4 className="font-semibold text-[#2B2B2B] mb-3">Spice Level</h4>
                <div className="space-y-2">
                  {filterOptions.spiceLevel.map((level) => (
                    <label key={level} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.spiceLevel.includes(level)}
                        onChange={() => handleFilterChange('spiceLevel', level)}
                        className="rounded border-gray-300 text-[#D7263D] focus:ring-[#D7263D]"
                      />
                      <span className="text-sm text-[#2B2B2B]">{level}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <h4 className="font-semibold text-[#2B2B2B] mb-3">Price Range</h4>
                <div className="space-y-2">
                  {filterOptions.priceRange.map((range) => (
                    <label key={range} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.priceRange.includes(range)}
                        onChange={() => handleFilterChange('priceRange', range)}
                        className="rounded border-gray-300 text-[#D7263D] focus:ring-[#D7263D]"
                      />
                      <span className="text-sm text-[#2B2B2B]">{range}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-[#D7263D] text-white rounded-lg hover:bg-[#C71F37] transition-colors"
                >
                  <Filter className="h-4 w-4" />
                  <span>Filters</span>
                </button>
                <p className="text-[#2B2B2B]/70">
                  Showing {displayedProducts.length} of {currentProducts.length} products
                </p>
              </div>

              <div className="flex items-center space-x-4">
                {/* View Mode Toggle */}
                <div className="flex items-center bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                    }`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                    }`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>

                {/* Sort Dropdown */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-[#D7263D] focus:border-transparent"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className={`grid gap-6 mb-8 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {displayedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`px-4 py-2 rounded-lg ${
                      currentPage === index + 1
                        ? 'bg-[#D7263D] text-white'
                        : 'border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Overlay */}
      {showFilters && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-50" onClick={() => setShowFilters(false)}>
          <div className="absolute right-0 top-0 h-full w-80 bg-white p-6 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-[#2B2B2B]">Filters</h3>
              <button onClick={() => setShowFilters(false)}>
                <X className="h-6 w-6 text-gray-400" />
              </button>
            </div>
            {/* Filter content would be repeated here */}
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      <CartSidebar />
    </div>
  );
};

export default Shop;