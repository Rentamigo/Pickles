import React, { useState } from 'react';
import { Eye, Search, Filter, Download, Calendar, Package, Truck, CheckCircle } from 'lucide-react';

interface Order {
  id: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  date: string;
  shippingAddress: string;
  paymentMethod: string;
}

const AdminOrders: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  const [orders, setOrders] = useState<Order[]>([
    {
      id: '#1001',
      customer: {
        name: 'Priya Sharma',
        email: 'priya@example.com',
        phone: '+91 98765 43210'
      },
      items: [
        { name: 'Mango Pickle', quantity: 2, price: 299 },
        { name: 'Lemon Pickle', quantity: 1, price: 199 }
      ],
      total: 797,
      status: 'Delivered',
      date: '2024-01-15',
      shippingAddress: '123 MG Road, Bangalore, Karnataka 560001',
      paymentMethod: 'UPI'
    },
    {
      id: '#1002',
      customer: {
        name: 'Rajesh Kumar',
        email: 'rajesh@example.com',
        phone: '+91 87654 32109'
      },
      items: [
        { name: 'Mixed Vegetable Pickle', quantity: 1, price: 249 }
      ],
      total: 249,
      status: 'Shipped',
      date: '2024-01-14',
      shippingAddress: '456 Park Street, Kolkata, West Bengal 700016',
      paymentMethod: 'Credit Card'
    },
    {
      id: '#1003',
      customer: {
        name: 'Anita Patel',
        email: 'anita@example.com',
        phone: '+91 76543 21098'
      },
      items: [
        { name: 'Garlic Pickle', quantity: 3, price: 349 },
        { name: 'Combo Pack', quantity: 1, price: 899 }
      ],
      total: 1946,
      status: 'Processing',
      date: '2024-01-13',
      shippingAddress: '789 SG Highway, Ahmedabad, Gujarat 380015',
      paymentMethod: 'Net Banking'
    },
    {
      id: '#1004',
      customer: {
        name: 'Vikram Singh',
        email: 'vikram@example.com',
        phone: '+91 65432 10987'
      },
      items: [
        { name: 'Chicken Pickle', quantity: 1, price: 449 }
      ],
      total: 449,
      status: 'Pending',
      date: '2024-01-12',
      shippingAddress: '321 CP, New Delhi, Delhi 110001',
      paymentMethod: 'Cash on Delivery'
    },
    {
      id: '#1005',
      customer: {
        name: 'Meera Reddy',
        email: 'meera@example.com',
        phone: '+91 54321 09876'
      },
      items: [
        { name: 'Family Combo', quantity: 1, price: 899 },
        { name: 'Lemon Pickle', quantity: 2, price: 199 }
      ],
      total: 1297,
      status: 'Delivered',
      date: '2024-01-11',
      shippingAddress: '654 Banjara Hills, Hyderabad, Telangana 500034',
      paymentMethod: 'UPI'
    }
  ]);

  const statusOptions = [
    { value: 'all', label: 'All Orders' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Processing', label: 'Processing' },
    { value: 'Shipped', label: 'Shipped' },
    { value: 'Delivered', label: 'Delivered' },
    { value: 'Cancelled', label: 'Cancelled' }
  ];

  const dateOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' }
  ];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'Pending':
        return 'bg-gray-100 text-gray-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered':
        return <CheckCircle className="h-4 w-4" />;
      case 'Shipped':
        return <Truck className="h-4 w-4" />;
      case 'Processing':
        return <Package className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  const getTotalRevenue = () => {
    return filteredOrders.reduce((sum, order) => sum + order.total, 0);
  };

  return (
    <div className="p-6 bg-[#FFFDF6] min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#2B2B2B] mb-2">Orders</h1>
          <p className="text-[#2B2B2B]/70">Manage customer orders and track deliveries</p>
        </div>
        <button className="bg-[#087E8B] text-white px-6 py-3 rounded-lg hover:bg-[#065a63] transition-colors flex items-center space-x-2 font-semibold">
          <Download className="h-5 w-5" />
          <span>Export Orders</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-[#2B2B2B]">{filteredOrders.length}</p>
            </div>
            <Package className="h-8 w-8 text-[#D7263D]" />
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Revenue</p>
              <p className="text-2xl font-bold text-[#2B2B2B]">₹{getTotalRevenue().toLocaleString()}</p>
            </div>
            <div className="h-8 w-8 bg-[#087E8B] rounded-full flex items-center justify-center">
              <span className="text-white font-bold">₹</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-[#2B2B2B]">
                {filteredOrders.filter(o => o.status === 'Pending').length}
              </p>
            </div>
            <Calendar className="h-8 w-8 text-[#F4C95D]" />
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Delivered</p>
              <p className="text-2xl font-bold text-[#2B2B2B]">
                {filteredOrders.filter(o => o.status === 'Delivered').length}
              </p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search orders, customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#D7263D] focus:border-transparent"
              />
            </div>
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

          {/* Date Filter */}
          <div>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#D7263D] focus:border-transparent"
            >
              {dateOptions.map(date => (
                <option key={date.value} value={date.value}>
                  {date.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
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
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-[#2B2B2B]">{order.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-[#2B2B2B]">{order.customer.name}</div>
                      <div className="text-sm text-gray-500">{order.customer.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-[#2B2B2B]">
                      {order.items.length} item{order.items.length > 1 ? 's' : ''}
                    </div>
                    <div className="text-sm text-gray-500">
                      {order.items[0].name}
                      {order.items.length > 1 && ` +${order.items.length - 1} more`}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2B2B2B]">
                    ₹{order.total.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value as Order['status'])}
                      className={`text-xs font-semibold rounded-full px-3 py-1 border-0 focus:ring-2 focus:ring-[#D7263D] ${getStatusColor(order.status)}`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => handleViewOrder(order)}
                      className="text-[#087E8B] hover:text-[#065a63] p-1 rounded transition-colors"
                      title="View Order Details"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {showOrderDetails && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-[#2B2B2B]">Order Details</h2>
              <button
                onClick={() => setShowOrderDetails(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                ×
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              <div className="space-y-6">
                {/* Order Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-[#2B2B2B] mb-2">Order Information</h3>
                    <p className="text-sm text-gray-600">Order ID: {selectedOrder.id}</p>
                    <p className="text-sm text-gray-600">Date: {selectedOrder.date}</p>
                    <p className="text-sm text-gray-600">Payment: {selectedOrder.paymentMethod}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#2B2B2B] mb-2">Status</h3>
                    <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(selectedOrder.status)}`}>
                      {getStatusIcon(selectedOrder.status)}
                      <span>{selectedOrder.status}</span>
                    </span>
                  </div>
                </div>

                {/* Customer Info */}
                <div>
                  <h3 className="font-semibold text-[#2B2B2B] mb-2">Customer Information</h3>
                  <p className="text-sm text-gray-600">Name: {selectedOrder.customer.name}</p>
                  <p className="text-sm text-gray-600">Email: {selectedOrder.customer.email}</p>
                  <p className="text-sm text-gray-600">Phone: {selectedOrder.customer.phone}</p>
                </div>

                {/* Shipping Address */}
                <div>
                  <h3 className="font-semibold text-[#2B2B2B] mb-2">Shipping Address</h3>
                  <p className="text-sm text-gray-600">{selectedOrder.shippingAddress}</p>
                </div>

                {/* Order Items */}
                <div>
                  <h3 className="font-semibold text-[#2B2B2B] mb-2">Order Items</h3>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-[#2B2B2B]">{item.name}</p>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                        <p className="font-semibold text-[#2B2B2B]">₹{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-[#2B2B2B]">Total:</span>
                      <span className="text-lg font-bold text-[#D7263D]">₹{selectedOrder.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;