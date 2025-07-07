import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search, Filter, Eye, Package } from 'lucide-react';
import ProductFormModal from '../../components/ProductFormModal';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  stock: number;
  category: string;
  status: string;
  image: string;
  description: string;
  weight: string;
  spiceLevel: string;
  tags: string[];
  sales: number;
}

const AdminProducts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Mango Pickle (Aam ka Achaar)',
      price: 299,
      originalPrice: 399,
      stock: 45,
      category: 'veg-pickles',
      status: 'Active',
      image: 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg?auto=compress&cs=tinysrgb&w=100',
      description: 'Traditional Andhra-style mango pickle made with authentic spices',
      weight: '250g',
      spiceLevel: 'Medium',
      tags: ['Bestseller', 'Traditional'],
      sales: 156
    },
    {
      id: '2',
      name: 'Lemon Pickle (Nimbu Achaar)',
      price: 199,
      originalPrice: 279,
      stock: 23,
      category: 'veg-pickles',
      status: 'Active',
      image: 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg?auto=compress&cs=tinysrgb&w=100',
      description: 'Tangy lemon pickle with perfect balance of spices',
      weight: '250g',
      spiceLevel: 'Mild',
      tags: ['Organic', 'Healthy'],
      sales: 89
    },
    {
      id: '3',
      name: 'Garlic Pickle (Lahsun Achaar)',
      price: 349,
      originalPrice: 449,
      stock: 0,
      category: 'veg-pickles',
      status: 'Out of Stock',
      image: 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg?auto=compress&cs=tinysrgb&w=100',
      description: 'Premium garlic pickle with rich flavor and aroma',
      weight: '250g',
      spiceLevel: 'Spicy',
      tags: ['Premium', 'Hot'],
      sales: 67
    },
    {
      id: '4',
      name: 'Mixed Vegetable Pickle',
      price: 249,
      originalPrice: 329,
      stock: 34,
      category: 'veg-pickles',
      status: 'Active',
      image: 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg?auto=compress&cs=tinysrgb&w=100',
      description: 'Assorted vegetables pickled with traditional spices',
      weight: '250g',
      spiceLevel: 'Medium',
      tags: ['New', 'Healthy'],
      sales: 123
    },
    {
      id: '5',
      name: 'Chicken Pickle (Murgh Achaar)',
      price: 449,
      originalPrice: 549,
      stock: 12,
      category: 'non-veg-pickles',
      status: 'Low Stock',
      image: 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg?auto=compress&cs=tinysrgb&w=100',
      description: 'Spicy chicken pickle with authentic Andhra flavors',
      weight: '250g',
      spiceLevel: 'Spicy',
      tags: ['Premium', 'Non-Veg'],
      sales: 45
    }
  ]);

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'veg-pickles', label: 'Vegetable Pickles' },
    { value: 'non-veg-pickles', label: 'Non-Veg Pickles' },
    { value: 'fryums', label: 'Fryums & Snacks' },
    { value: 'combos', label: 'Combo Packs' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'Active', label: 'Active' },
    { value: 'Out of Stock', label: 'Out of Stock' },
    { value: 'Low Stock', label: 'Low Stock' },
    { value: 'Inactive', label: 'Inactive' }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleAddProduct = () => {
    setModalMode('add');
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setModalMode('edit');
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(prev => prev.filter(p => p.id !== productId));
    }
  };

  const handleSaveProduct = (productData: Omit<Product, 'id' | 'sales'>) => {
    if (modalMode === 'add') {
      const newProduct: Product = {
        ...productData,
        id: Date.now().toString(),
        sales: 0,
        status: productData.stock > 0 ? 'Active' : 'Out of Stock'
      };
      setProducts(prev => [...prev, newProduct]);
    } else if (selectedProduct) {
      setProducts(prev => prev.map(p => 
        p.id === selectedProduct.id 
          ? { 
              ...productData, 
              id: selectedProduct.id, 
              sales: selectedProduct.sales,
              status: productData.stock > 0 ? 'Active' : 'Out of Stock'
            }
          : p
      ));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Out of Stock':
        return 'bg-red-100 text-red-800';
      case 'Low Stock':
        return 'bg-yellow-100 text-yellow-800';
      case 'Inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryLabel = (category: string) => {
    const cat = categories.find(c => c.value === category);
    return cat ? cat.label : category;
  };

  return (
    <div className="p-6 bg-[#FFFDF6] min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#2B2B2B] mb-2">Products</h1>
          <p className="text-[#2B2B2B]/70">Manage your pickle inventory and product catalog</p>
        </div>
        <button 
          onClick={handleAddProduct}
          className="bg-[#D7263D] text-white px-6 py-3 rounded-lg hover:bg-[#C71F37] transition-colors flex items-center space-x-2 font-semibold"
        >
          <Plus className="h-5 w-5" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#D7263D] focus:border-transparent"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#D7263D] focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#D7263D] focus:border-transparent"
            >
              {statusOptions.map(status => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sales
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover mr-4"
                      />
                      <div>
                        <div className="text-sm font-medium text-[#2B2B2B]">{product.name}</div>
                        <div className="text-sm text-gray-500">{product.weight}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2B2B2B]">
                    {getCategoryLabel(product.category)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-[#2B2B2B]">₹{product.price}</div>
                    <div className="text-sm text-gray-500 line-through">₹{product.originalPrice}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${
                      product.stock === 0 ? 'text-red-600' : 
                      product.stock < 20 ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {product.stock}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2B2B2B]">
                    {product.sales}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(product.status)}`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEditProduct(product)}
                        className="text-[#087E8B] hover:text-[#065a63] p-1 rounded transition-colors"
                        title="Edit Product"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-600 hover:text-red-800 p-1 rounded transition-colors"
                        title="Delete Product"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No products found</h3>
            <p className="text-gray-500 mb-6">
              {searchTerm || categoryFilter !== 'all' || statusFilter !== 'all' 
                ? 'Try adjusting your filters to see more products.'
                : 'Get started by adding your first product.'
              }
            </p>
            {!searchTerm && categoryFilter === 'all' && statusFilter === 'all' && (
              <button 
                onClick={handleAddProduct}
                className="bg-[#D7263D] text-white px-6 py-3 rounded-lg hover:bg-[#C71F37] transition-colors"
              >
                Add Your First Product
              </button>
            )}
          </div>
        )}
      </div>

      {/* Product Form Modal */}
      <ProductFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProduct}
        product={selectedProduct}
        mode={modalMode}
      />
    </div>
  );
};

export default AdminProducts;