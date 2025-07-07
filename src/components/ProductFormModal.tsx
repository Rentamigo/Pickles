import React, { useState, useEffect } from 'react';
import { X, Upload, Save } from 'lucide-react';

interface Product {
  id?: string;
  name: string;
  price: number;
  originalPrice: number;
  stock: number;
  category: string;
  description: string;
  image: string;
  weight: string;
  spiceLevel: string;
  tags: string[];
}

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
  product?: Product | null;
  mode: 'add' | 'edit';
}

const ProductFormModal: React.FC<ProductFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  product,
  mode
}) => {
  const [formData, setFormData] = useState<Product>({
    name: '',
    price: 0,
    originalPrice: 0,
    stock: 0,
    category: 'veg-pickles',
    description: '',
    image: 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg?auto=compress&cs=tinysrgb&w=400',
    weight: '250g',
    spiceLevel: 'Medium',
    tags: []
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { value: 'veg-pickles', label: 'Vegetable Pickles' },
    { value: 'non-veg-pickles', label: 'Non-Veg Pickles' },
    { value: 'fryums', label: 'Fryums & Snacks' },
    { value: 'combos', label: 'Combo Packs' }
  ];

  const spiceLevels = ['Mild', 'Medium', 'Spicy', 'Extra Spicy'];
  const availableTags = ['Bestseller', 'New', 'Organic', 'Premium', 'Hot', 'Healthy', 'Traditional', 'Vegan'];

  useEffect(() => {
    if (product && mode === 'edit') {
      setFormData(product);
    } else {
      setFormData({
        name: '',
        price: 0,
        originalPrice: 0,
        stock: 0,
        category: 'veg-pickles',
        description: '',
        image: 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg?auto=compress&cs=tinysrgb&w=400',
        weight: '250g',
        spiceLevel: 'Medium',
        tags: []
      });
    }
    setErrors({});
  }, [product, mode, isOpen]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }

    if (formData.price <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }

    if (formData.originalPrice <= 0) {
      newErrors.originalPrice = 'Original price must be greater than 0';
    }

    if (formData.price >= formData.originalPrice) {
      newErrors.price = 'Price must be less than original price';
    }

    if (formData.stock < 0) {
      newErrors.stock = 'Stock cannot be negative';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSave(formData);
      onClose();
    } catch (error) {
      console.error('Error saving product:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'originalPrice' || name === 'stock' 
        ? parseFloat(value) || 0 
        : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleTagToggle = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-[#2B2B2B]">
            {mode === 'add' ? 'Add New Product' : 'Edit Product'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium text-[#2B2B2B] mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-[#D7263D] focus:border-transparent`}
                  placeholder="Enter product name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              {/* Price Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#2B2B2B] mb-2">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.price ? 'border-red-500' : 'border-gray-300'
                    } focus:ring-2 focus:ring-[#D7263D] focus:border-transparent`}
                    placeholder="0.00"
                  />
                  {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2B2B2B] mb-2">
                    Original Price (₹) *
                  </label>
                  <input
                    type="number"
                    name="originalPrice"
                    value={formData.originalPrice}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.originalPrice ? 'border-red-500' : 'border-gray-300'
                    } focus:ring-2 focus:ring-[#D7263D] focus:border-transparent`}
                    placeholder="0.00"
                  />
                  {errors.originalPrice && <p className="text-red-500 text-sm mt-1">{errors.originalPrice}</p>}
                </div>
              </div>

              {/* Stock and Weight */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#2B2B2B] mb-2">
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    min="0"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.stock ? 'border-red-500' : 'border-gray-300'
                    } focus:ring-2 focus:ring-[#D7263D] focus:border-transparent`}
                    placeholder="0"
                  />
                  {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2B2B2B] mb-2">
                    Weight
                  </label>
                  <input
                    type="text"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#D7263D] focus:border-transparent"
                    placeholder="250g"
                  />
                </div>
              </div>

              {/* Category and Spice Level */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#2B2B2B] mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#D7263D] focus:border-transparent"
                  >
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2B2B2B] mb-2">
                    Spice Level
                  </label>
                  <select
                    name="spiceLevel"
                    value={formData.spiceLevel}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#D7263D] focus:border-transparent"
                  >
                    {spiceLevels.map(level => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Product Image */}
              <div>
                <label className="block text-sm font-medium text-[#2B2B2B] mb-2">
                  Product Image
                </label>
                <div className="space-y-4">
                  <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={formData.image}
                      alt="Product preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#D7263D] transition-colors"
                  >
                    <Upload className="h-5 w-5 text-gray-600" />
                    <span className="text-gray-600">Upload Image</span>
                  </button>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-[#2B2B2B] mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-[#D7263D] focus:border-transparent`}
                  placeholder="Enter product description"
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-[#2B2B2B] mb-2">
                  Tags
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableTags.map(tag => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleTagToggle(tag)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        formData.tags.includes(tag)
                          ? 'bg-[#D7263D] text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center space-x-2 px-6 py-3 bg-[#D7263D] text-white rounded-lg hover:bg-[#C71F37] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>{mode === 'add' ? 'Add Product' : 'Save Changes'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormModal;