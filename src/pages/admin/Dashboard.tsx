import React from 'react';
import { TrendingUp, ShoppingBag, Users, DollarSign, Package, Eye, Calendar, ArrowUp, ArrowDown } from 'lucide-react';
import StatCard from '../../components/StatCard';

const AdminDashboard: React.FC = () => {
  // Mock data
  const stats = [
    {
      title: 'Total Sales',
      value: '₹1,24,500',
      icon: DollarSign,
      color: 'bg-[#D7263D]',
      change: '+12.5% from last month',
      changeType: 'positive' as const
    },
    {
      title: 'Orders',
      value: '156',
      icon: ShoppingBag,
      color: 'bg-[#087E8B]',
      change: '+8 new orders today',
      changeType: 'positive' as const
    },
    {
      title: 'Products',
      value: '89',
      icon: Package,
      color: 'bg-[#F4C95D]',
      change: '5 out of stock',
      changeType: 'neutral' as const
    },
    {
      title: 'Customers',
      value: '342',
      icon: Users,
      color: 'bg-purple-500',
      change: '+23 new this week',
      changeType: 'positive' as const
    }
  ];

  const recentOrders = [
    {
      id: '#1001',
      customer: 'Priya Sharma',
      email: 'priya@example.com',
      product: 'Mango Pickle',
      amount: '₹299',
      status: 'Completed',
      date: '2024-01-15',
      items: 2
    },
    {
      id: '#1002',
      customer: 'Rajesh Kumar',
      email: 'rajesh@example.com',
      product: 'Mixed Veg Pickle',
      amount: '₹249',
      status: 'Processing',
      date: '2024-01-14',
      items: 1
    },
    {
      id: '#1003',
      customer: 'Anita Patel',
      email: 'anita@example.com',
      product: 'Garlic Pickle',
      amount: '₹349',
      status: 'Shipped',
      date: '2024-01-13',
      items: 3
    },
    {
      id: '#1004',
      customer: 'Vikram Singh',
      email: 'vikram@example.com',
      product: 'Lemon Pickle',
      amount: '₹199',
      status: 'Pending',
      date: '2024-01-12',
      items: 1
    },
    {
      id: '#1005',
      customer: 'Meera Reddy',
      email: 'meera@example.com',
      product: 'Combo Pack',
      amount: '₹899',
      status: 'Completed',
      date: '2024-01-11',
      items: 4
    }
  ];

  const topProducts = [
    {
      name: 'Mango Pickle (Aam ka Achaar)',
      sales: 45,
      revenue: '₹13,455',
      trend: 'up'
    },
    {
      name: 'Mixed Vegetable Pickle',
      sales: 38,
      revenue: '₹9,462',
      trend: 'up'
    },
    {
      name: 'Garlic Pickle (Lahsun Achaar)',
      sales: 32,
      revenue: '₹11,168',
      trend: 'down'
    },
    {
      name: 'Lemon Pickle (Nimbu Achaar)',
      sales: 28,
      revenue: '₹5,572',
      trend: 'up'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800';
      case 'Pending':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 bg-[#FFFDF6] min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#2B2B2B] mb-2">Dashboard</h1>
        <p className="text-[#2B2B2B]/70">Welcome back! Here's what's happening with your pickle business.</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
            change={stat.change}
            changeType={stat.changeType}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-[#2B2B2B]">Recent Orders</h2>
                <button className="text-[#D7263D] hover:text-[#C71F37] font-medium flex items-center space-x-1">
                  <span>View All</span>
                  <Eye className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-[#2B2B2B]">{order.id}</div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {order.date}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-[#2B2B2B]">{order.customer}</div>
                          <div className="text-sm text-gray-500">{order.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-[#2B2B2B]">{order.product}</div>
                        <div className="text-sm text-gray-500">{order.items} item{order.items > 1 ? 's' : ''}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2B2B2B]">
                        {order.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-[#2B2B2B]">Top Products</h2>
              <TrendingUp className="h-5 w-5 text-[#D7263D]" />
            </div>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-[#FFFDF6] rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium text-[#2B2B2B] text-sm mb-1">{product.name}</h3>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <span>{product.sales} sales</span>
                      <span>•</span>
                      <span>{product.revenue}</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {product.trend === 'up' ? (
                      <ArrowUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <ArrowDown className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
            <h2 className="text-xl font-semibold text-[#2B2B2B] mb-6">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full bg-[#D7263D] text-white py-3 rounded-lg font-medium hover:bg-[#C71F37] transition-colors">
                Add New Product
              </button>
              <button className="w-full bg-[#087E8B] text-white py-3 rounded-lg font-medium hover:bg-[#065a63] transition-colors">
                View All Orders
              </button>
              <button className="w-full bg-[#F4C95D] text-[#2B2B2B] py-3 rounded-lg font-medium hover:bg-[#F4C95D]/90 transition-colors">
                Export Reports
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sales Chart Placeholder */}
      <div className="mt-8">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-[#2B2B2B] mb-6">Monthly Sales Overview</h2>
          <div className="h-64 bg-gradient-to-r from-[#F4C95D]/20 to-[#087E8B]/20 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-[#D7263D] mx-auto mb-4" />
              <p className="text-[#2B2B2B]/70">Sales chart would be displayed here</p>
              <p className="text-sm text-[#2B2B2B]/50">Integration with chart library needed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;