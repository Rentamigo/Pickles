import React, { useState, useMemo } from 'react';
import { Filter } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { Product } from '../types/Product';

const Shop: React.FC = () => {
  const [filters, setFilters] = useState({
    category: '',
    region: '',
    type: '',
    spiceLevel: '',
    inStock: false
  });
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((product: Product) => {
      if (filters.category && product.category !== filters.category) return false;
      if (filters.region && product.region !== filters.region) return false;
      if (filters.type && product.type !== filters.type) return false;
      if (filters.spiceLevel && product.spiceLevel.toString() !== filters.spiceLevel) return false;
      if (filters.inStock && !product.inStock) return false;
      return true;
    });
  }, [filters]);

  const handleFilterChange = (filterType: string, value: string | boolean) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      region: '',
      type: '',
      spiceLevel: '',
      inStock: false
    });
  };

  const categories = ['Veg Pickles', 'Non-Veg Pickles', 'Podis', 'Fryums'];
  const regions = ['Andhra', 'Bengali', 'Punjabi', 'Gujarati', 'Tamil', 'Kerala', 'Karnataka'];
  const types = ['Mango', 'Lemon', 'Garlic', 'Mixed', 'Chili', 'Tomato', 'Fish', 'Prawn', 'Chicken', 'Mutton', 'Podi', 'Fryum'];
  const spiceLevels = [1, 2, 3, 4, 5];

  return (
    <div className="min-h-screen bg-gradient-to-br from-turmeric-50 via-white to-turmeric-50 pt-20 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-achari-50 text-achari-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Filter className="w-4 h-4" />
            <span>Premium Collection</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-earthy-900 mb-6 font-serif">
            Our <span className="text-achari-600">Complete Range</span>
          </h1>
          <p className="text-xl text-earthy-600 max-w-3xl mx-auto leading-relaxed">
            From traditional pickles to authentic podis and crispy fryums - discover the complete taste of India
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={() => handleFilterChange('category', '')}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              filters.category === '' 
                ? 'bg-gradient-to-r from-achari-500 to-achari-600 text-white shadow-glow' 
                : 'bg-white text-earthy-700 hover:bg-achari-50 hover:text-achari-600 shadow-soft'
            }`}
          >
            All Products ({products.length})
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => handleFilterChange('category', category)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                filters.category === category 
                  ? 'bg-gradient-to-r from-achari-500 to-achari-600 text-white shadow-glow' 
                  : 'bg-white text-earthy-700 hover:bg-achari-50 hover:text-achari-600 shadow-soft'
              }`}
            >
              {category} ({products.filter(p => p.category === category).length})
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-earthy-900">
              {filteredProducts.length} Products Found
            </h2>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center space-x-2 bg-white px-4 py-2 rounded-lg border border-turmeric-200 hover:bg-turmeric-50 transition-colors duration-200 shadow-soft"
            >
              <Filter className="w-4 h-4" />
              <span>Advanced Filters</span>
            </button>
          </div>

          <div className={`${showFilters ? 'block' : 'hidden'} md:block bg-white p-6 rounded-2xl shadow-card border border-turmeric-100`}>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {/* Region Filter */}
              <div>
                <label className="block text-sm font-semibold text-earthy-900 mb-2">Region</label>
                <select
                  value={filters.region}
                  onChange={(e) => handleFilterChange('region', e.target.value)}
                  className="w-full p-3 border-2 border-turmeric-200 rounded-xl focus:ring-2 focus:ring-achari-500 focus:border-achari-500 transition-all duration-300"
                >
                  <option value="">All Regions</option>
                  {regions.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>

              {/* Type Filter */}
              <div>
                <label className="block text-sm font-semibold text-earthy-900 mb-2">Type</label>
                <select
                  value={filters.type}
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                  className="w-full p-3 border-2 border-turmeric-200 rounded-xl focus:ring-2 focus:ring-achari-500 focus:border-achari-500 transition-all duration-300"
                >
                  <option value="">All Types</option>
                  {types.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Spice Level Filter */}
              <div>
                <label className="block text-sm font-semibold text-earthy-900 mb-2">Spice Level</label>
                <select
                  value={filters.spiceLevel}
                  onChange={(e) => handleFilterChange('spiceLevel', e.target.value)}
                  className="w-full p-3 border-2 border-turmeric-200 rounded-xl focus:ring-2 focus:ring-achari-500 focus:border-achari-500 transition-all duration-300"
                >
                  <option value="">All Levels</option>
                  {spiceLevels.map(level => (
                    <option key={level} value={level.toString()}>
                      {level} {level === 1 ? 'Flame' : 'Flames'}
                    </option>
                  ))}
                </select>
              </div>

              {/* In Stock Filter */}
              <div>
                <label className="block text-sm font-semibold text-earthy-900 mb-2">Availability</label>
                <label className="flex items-center space-x-2 p-3 bg-turmeric-50 rounded-xl">
                  <input
                    type="checkbox"
                    checked={filters.inStock}
                    onChange={(e) => handleFilterChange('inStock', e.target.checked)}
                    className="rounded border-turmeric-300 text-achari-600 focus:ring-achari-500"
                  />
                  <span className="text-sm font-medium text-earthy-800">In Stock Only</span>
                </label>
              </div>

              {/* Clear Filters */}
              <div className="flex items-end">
                <button
                  onClick={clearFilters}
                  className="w-full bg-gradient-to-r from-achari-500 to-achari-600 hover:from-achari-600 hover:to-achari-700 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-soft"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product, index) => (
              <div 
                key={product.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🥒</div>
            <h3 className="text-2xl font-bold text-earthy-900 mb-2">No Products Found</h3>
            <p className="text-earthy-700 mb-6">Try adjusting your filters to see more products.</p>
            <button
              onClick={clearFilters}
              className="bg-gradient-to-r from-achari-500 to-achari-600 hover:from-achari-600 hover:to-achari-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;