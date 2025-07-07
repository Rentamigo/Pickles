import React, { useState } from 'react';
import { Search, Mail, Phone, User, Calendar, ShoppingBag, Filter, Download } from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  ordersPlaced: number;
  totalSpent: number;
  lastOrderDate: string;
  joinDate: string;
  status: 'Active' | 'VIP' | 'New' | 'Inactive';
  location: string;
}

const AdminCustomers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showCustomerDetails, setShowCustomerDetails] = useState(false);

  const [customers] = useState<Customer[]>([
    {
      id: '1',
      name: 'Priya Sharma',
      email: 'priya@example.com',
      phone: '+91 98765 43210',
      ordersPlaced: 8,
      totalSpent: 2397,
      lastOrderDate: '2024-01-15',
      joinDate: '2023-08-15',
      status: 'VIP',
      location: 'Bangalore, Karnataka'
    },
    {
      id: '2',
      name: 'Rajesh Kumar',
      email: 'rajesh@example.com',
      phone: '+91 87654 32109',
      ordersPlaced: 5,
      totalSpent: 1245,
      lastOrderDate: '2024-01-14',
      joinDate: '2023-10-22',
      status: 'Active',
      location: 'Kolkata, West Bengal'
    },
    {
      id: '3',
      name: 'Anita Patel',
      email: 'anita@example.com',
      phone: '+91 76543 21098',
      ordersPlaced: 12,
      totalSpent: 3567,
      lastOrderDate: '2024-01-13',
      joinDate: '2023-06-10',
      status: 'VIP',
      location: 'Ahmedabad, Gujarat'
    },
    {
      id: '4',
      name: 'Vikram Singh',
      email: 'vikram@example.com',
      phone: '+91 65432 10987',
      ordersPlaced: 2,
      totalSpent: 648,
      lastOrderDate: '2024-01-12',
      joinDate: '2023-12-05',
      status: 'Active',
      location: 'New Delhi, Delhi'
    },
    {
      id: '5',
      name: 'Meera Reddy',
      email: 'meera@example.com',
      phone: '+91 54321 09876',
      ordersPlaced: 15,
      totalSpent: 4234,
      lastOrderDate: '2024-01-11',
      joinDate: '2023-05-18',
      status: 'VIP',
      location: 'Hyderabad, Telangana'
    },
    {
      id: '6',
      name: 'Arjun Nair',
      email: 'arjun@example.com',
      phone: '+91 43210 98765',
      ordersPlaced: 1,
      totalSpent: 299,
      lastOrderDate: '2024-01-10',
      joinDate: '2024-01-08',
      status: 'New',
      location: 'Kochi, Kerala'
    },
    {
      id: '7',
      name: 'Sunita Joshi',
      email: 'sunita@example.com',
      phone: '+91 32109 87654',
      ordersPlaced: 6,
      totalSpent: 1789,
      lastOrderDate: '2023-12-28',
      joinDate: '2023-09-12',
      status: 'Active',
      location: 'Pune, Maharashtra'
    },
    {
      id: '8',
      name: 'Kiran Gupta',
      email: 'kiran@example.com',
      phone: '+91 21098 76543',
      ordersPlaced: 3,
      totalSpent: 897,
      lastOrderDate: '2023-11-15',
      joinDate: '2023-07-20',
      status: 'Inactive',
      location: 'Jaipur, Rajasthan'
    }
  ]);

  const statusOptions = [
    { value: 'all', label: 'All Customers' },
    { value: 'VIP', label: 'VIP Customers' },
    { value: 'Active', label: 'Active' },
    { value: 'New', label: 'New Customers' },
    { value: 'Inactive', label: 'Inactive' }
  ];

  const sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'ordersPlaced', label: 'Orders Placed' },
    { value: 'totalSpent', label: 'Total Spent' },
    { value: 'lastOrderDate', label: 'Last Order' },
    { value: 'joinDate', label: 'Join Date' }
  ];

  const filteredAndSortedCustomers = customers
    .filter(customer => {
      const matchesSearch = 
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm);
      
      const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'ordersPlaced':
          return b.ordersPlaced - a.ordersPlaced;
        case 'totalSpent':
          return b.totalSpent - a.totalSpent;
        case 'lastOrderDate':
          return new Date(b.lastOrderDate).getTime() - new Date(a.lastOrderDate).getTime();
        case 'joinDate':
          return new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime();
        default:
          return 0;
      }
    });

  const handleViewCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowCustomerDetails(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'VIP':
        return 'bg-purple-100 text-purple-800';
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'New':
        return 'bg-blue-100 text-blue-800';
      case 'Inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTotalCustomers = () => filteredAndSortedCustomers.length;
  const getVIPCustomers = () => filteredAndSortedCustomers.filter(c => c.status === 'VIP').length;
  const getNewCustomers = () => filteredAndSortedCustomers.filter(c => c.status === 'New').length;
  const getTotalRevenue = () => filteredAndSortedCustomers.reduce((sum, c) => sum + c.totalSpent, 0);

  return (
    <div className="p-6 bg-[#FFFDF6] min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#2B2B2B] mb-2">Customers</h1>
          <p className="text-[#2B2B2B]/70">Manage customer relationships and track engagement</p>
        </div>
        <button className="bg-[#087E8B] text-white px-6 py-3 rounded-lg hover:bg-[#065a63] transition-colors flex items-center space-x-2 font-semibold">
          <Download className="h-5 w-5" />
          <span>Export Data</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Customers</p>
              <p className="text-2xl font-bold text-[#2B2B2B]">{getTotalCustomers()}</p>
            </div>
            <User className="h-8 w-8 text-[#D7263D]" />
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">VIP Customers</p>
              <p className="text-2xl font-bold text-[#2B2B2B]">{getVIPCustomers()}</p>
            </div>
            <div className="h-8 w-8 bg-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">★</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">New This Month</p>
              <p className="text-2xl font-bold text-[#2B2B2B]">{getNewCustomers()}</p>
            </div>
            <Calendar className="h-8 w-8 text-[#F4C95D]" />
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-[#2B2B2B]">₹{getTotalRevenue().toLocaleString()}</p>
            </div>
            <div className="h-8 w-8 bg-[#087E8B] rounded-full flex items-center justify-center">
              <span className="text-white font-bold">₹</span>
            </div>
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
                placeholder="Search customers..."
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

          {/* Sort By */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#D7263D] focus:border-transparent"
            >
              {sortOptions.map(sort => (
                <option key={sort.value} value={sort.value}>
                  Sort by {sort.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Orders
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Spent
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Order
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
              {filteredAndSortedCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-[#F4C95D] flex items-center justify-center mr-4">
                        <span className="text-sm font-medium text-[#2B2B2B]">
                          {customer.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-[#2B2B2B]">{customer.name}</div>
                        <div className="text-sm text-gray-500">{customer.location}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-[#2B2B2B] flex items-center space-x-1 mb-1">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span>{customer.email}</span>
                    </div>
                    <div className="text-sm text-gray-500 flex items-center space-x-1">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span>{customer.phone}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-[#2B2B2B] flex items-center space-x-1">
                      <ShoppingBag className="h-4 w-4 text-gray-400" />
                      <span>{customer.ordersPlaced}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2B2B2B]">
                    ₹{customer.totalSpent.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {customer.lastOrderDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(customer.status)}`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleViewCustomer(customer)}
                        className="text-[#087E8B] hover:text-[#065a63] font-medium"
                      >
                        View
                      </button>
                      <button className="text-[#D7263D] hover:text-[#C71F37] font-medium">
                        Contact
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Details Modal */}
      {showCustomerDetails && selectedCustomer && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-[#2B2B2B]">Customer Details</h2>
              <button
                onClick={() => setShowCustomerDetails(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                ×
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              <div className="space-y-6">
                {/* Customer Info */}
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-[#F4C95D] flex items-center justify-center">
                    <span className="text-xl font-bold text-[#2B2B2B]">
                      {selectedCustomer.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#2B2B2B]">{selectedCustomer.name}</h3>
                    <span className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(selectedCustomer.status)}`}>
                      {selectedCustomer.status}
                    </span>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-[#2B2B2B] mb-2">Contact Information</h4>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600 flex items-center space-x-2">
                        <Mail className="h-4 w-4" />
                        <span>{selectedCustomer.email}</span>
                      </p>
                      <p className="text-sm text-gray-600 flex items-center space-x-2">
                        <Phone className="h-4 w-4" />
                        <span>{selectedCustomer.phone}</span>
                      </p>
                      <p className="text-sm text-gray-600">{selectedCustomer.location}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2B2B2B] mb-2">Account Information</h4>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Joined:</span> {selectedCustomer.joinDate}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Last Order:</span> {selectedCustomer.lastOrderDate}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Order Statistics */}
                <div>
                  <h4 className="font-semibold text-[#2B2B2B] mb-4">Order Statistics</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#FFFDF6] p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold text-[#D7263D]">{selectedCustomer.ordersPlaced}</p>
                      <p className="text-sm text-gray-600">Total Orders</p>
                    </div>
                    <div className="bg-[#FFFDF6] p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold text-[#087E8B]">₹{selectedCustomer.totalSpent.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">Total Spent</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 pt-4 border-t border-gray-200">
                  <button className="flex-1 bg-[#D7263D] text-white py-3 rounded-lg font-semibold hover:bg-[#C71F37] transition-colors">
                    Send Email
                  </button>
                  <button className="flex-1 bg-[#087E8B] text-white py-3 rounded-lg font-semibold hover:bg-[#065a63] transition-colors">
                    View Orders
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCustomers;