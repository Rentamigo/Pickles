import React, { useState } from 'react';
import { Save, Upload, User, Lock, Bell, Globe, Palette, Shield } from 'lucide-react';

const AdminSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(false);

  const [profileData, setProfileData] = useState({
    name: 'Admin User',
    email: 'admin@picklecart.com',
    phone: '+91 98765 43210',
    role: 'Super Admin',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150'
  });

  const [storeSettings, setStoreSettings] = useState({
    storeName: 'PickleCart',
    storeDescription: 'Authentic Indian pickles made with love and traditional recipes since 1985',
    email: 'info@picklecart.com',
    phone: '(555) 123-4567',
    address: '123 Pickle Street, Cucumber City, CC 12345',
    shippingFee: '5.99',
    taxRate: '8.0',
    currency: 'INR'
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notifications, setNotifications] = useState({
    orderNotifications: true,
    lowStockAlerts: true,
    customerMessages: true,
    marketingEmails: false,
    systemUpdates: true
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'store', label: 'Store Settings', icon: Globe },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette }
  ];

  const handleSave = async (section: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(`Saving ${section} settings...`);
      // Show success message
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStoreChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setStoreSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNotificationChange = (key: string) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-6">
        <div className="relative">
          <img
            src={profileData.avatar}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
          <button className="absolute bottom-0 right-0 bg-[#D7263D] text-white p-2 rounded-full hover:bg-[#C71F37] transition-colors">
            <Upload className="h-4 w-4" />
          </button>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[#2B2B2B]">{profileData.name}</h3>
          <p className="text-gray-600">{profileData.role}</p>
          <button className="mt-2 text-[#D7263D] hover:text-[#C71F37] font-medium">
            Change Avatar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-[#2B2B2B] mb-2">Full Name</label>
          <input
            type="text"
            name="name"
            value={profileData.name}
            onChange={handleProfileChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#D7263D] focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#2B2B2B] mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={profileData.email}
            onChange={handleProfileChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#D7263D] focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#2B2B2B] mb-2">Phone</label>
          <input
            type="tel"
            name="phone"
            value={profileData.phone}
            onChange={handleProfileChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#D7263D] focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#2B2B2B] mb-2">Role</label>
          <input
            type="text"
            value={profileData.role}
            disabled
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-500"
          />
        </div>
      </div>

      <button
        onClick={() => handleSave('profile')}
        disabled={isLoading}
        className="bg-[#D7263D] text-white px-6 py-3 rounded-lg hover:bg-[#C71F37] transition-colors flex items-center space-x-2 disabled:opacity-50"
      >
        <Save className="h-4 w-4" />
        <span>{isLoading ? 'Saving...' : 'Save Changes'}</span>
      </button>
    </div>
  );

  const renderStoreSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-[#2B2B2B] mb-2">Store Name</label>
          <input
            type="text"
            name="storeName"
            value={storeSettings.storeName}
            onChange={handleStoreChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#D7263D] focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#2B2B2B] mb-2">Currency</label>
          <select
            name="currency"
            value={storeSettings.currency}
            onChange={handleStoreChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#D7263D] focus:border-transparent"
          >
            <option value="INR">INR - Indian Rupee</option>
            <option value="USD">USD - US Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#2B2B2B] mb-2">Store Description</label>
        <textarea
          name="storeDescription"
          value={storeSettings.storeDescription}
          onChange={handleStoreChange}
          rows={3}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#D7263D] focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-[#2B2B2B] mb-2">Contact Email</label>
          <input
            type="email"
            name="email"
            value={storeSettings.email}
            onChange={handleStoreChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#D7263D] focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#2B2B2B] mb-2">Phone</label>
          <input
            type="tel"
            name="phone"
            value={storeSettings.phone}
            onChange={handleStoreChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#D7263D] focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#2B2B2B] mb-2">Address</label>
        <textarea
          name="address"
          value={storeSettings.address}
          onChange={handleStoreChange}
          rows={3}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#D7263D] focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-[#2B2B2B] mb-2">Default Shipping Fee (₹)</label>
          <input
            type="number"
            name="shippingFee"
            value={storeSettings.shippingFee}
            onChange={handleStoreChange}
            step="0.01"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#D7263D] focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#2B2B2B] mb-2">Tax Rate (%)</label>
          <input
            type="number"
            name="taxRate"
            value={storeSettings.taxRate}
            onChange={handleStoreChange}
            step="0.1"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#D7263D] focus:border-transparent"
          />
        </div>
      </div>

      <button
        onClick={() => handleSave('store')}
        disabled={isLoading}
        className="bg-[#D7263D] text-white px-6 py-3 rounded-lg hover:bg-[#C71F37] transition-colors flex items-center space-x-2 disabled:opacity-50"
      >
        <Save className="h-4 w-4" />
        <span>{isLoading ? 'Saving...' : 'Save Changes'}</span>
      </button>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center space-x-2">
          <Shield className="h-5 w-5 text-yellow-600" />
          <h3 className="font-medium text-yellow-800">Security Notice</h3>
        </div>
        <p className="text-yellow-700 text-sm mt-1">
          Use a strong password with at least 8 characters, including uppercase, lowercase, numbers, and symbols.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#2B2B2B] mb-2">Current Password</label>
          <input
            type="password"
            name="currentPassword"
            value={passwordData.currentPassword}
            onChange={handlePasswordChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#D7263D] focus:border-transparent"
            placeholder="Enter current password"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#2B2B2B] mb-2">New Password</label>
          <input
            type="password"
            name="newPassword"
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#D7263D] focus:border-transparent"
            placeholder="Enter new password"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#2B2B2B] mb-2">Confirm New Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={passwordData.confirmPassword}
            onChange={handlePasswordChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#D7263D] focus:border-transparent"
            placeholder="Confirm new password"
          />
        </div>
      </div>

      <button
        onClick={() => handleSave('security')}
        disabled={isLoading}
        className="bg-[#D7263D] text-white px-6 py-3 rounded-lg hover:bg-[#C71F37] transition-colors flex items-center space-x-2 disabled:opacity-50"
      >
        <Lock className="h-4 w-4" />
        <span>{isLoading ? 'Updating...' : 'Update Password'}</span>
      </button>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        {Object.entries(notifications).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="text-sm font-medium text-[#2B2B2B] capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </h3>
              <p className="text-sm text-gray-500">
                {key === 'orderNotifications' && 'Receive notifications for new orders'}
                {key === 'lowStockAlerts' && 'Get alerted when products are running low'}
                {key === 'customerMessages' && 'Notifications for customer inquiries'}
                {key === 'marketingEmails' && 'Receive marketing and promotional emails'}
                {key === 'systemUpdates' && 'Important system and security updates'}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={value}
                onChange={() => handleNotificationChange(key)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#D7263D]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D7263D]"></div>
            </label>
          </div>
        ))}
      </div>

      <button
        onClick={() => handleSave('notifications')}
        disabled={isLoading}
        className="bg-[#D7263D] text-white px-6 py-3 rounded-lg hover:bg-[#C71F37] transition-colors flex items-center space-x-2 disabled:opacity-50"
      >
        <Bell className="h-4 w-4" />
        <span>{isLoading ? 'Saving...' : 'Save Preferences'}</span>
      </button>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <div className="text-center py-12">
        <Palette className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-600 mb-2">Appearance Settings</h3>
        <p className="text-gray-500">
          Theme customization and appearance options will be available in a future update.
        </p>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileSettings();
      case 'store':
        return renderStoreSettings();
      case 'security':
        return renderSecuritySettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'appearance':
        return renderAppearanceSettings();
      default:
        return renderProfileSettings();
    }
  };

  return (
    <div className="p-6 bg-[#FFFDF6] min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#2B2B2B] mb-2">Settings</h1>
        <p className="text-[#2B2B2B]/70">Manage your account and store preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-left ${
                      activeTab === tab.id
                        ? 'bg-[#D7263D] text-white'
                        : 'text-[#2B2B2B] hover:bg-gray-100'
                    }`}
                  >
                    <IconComponent className="h-5 w-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#2B2B2B] mb-6">
              {tabs.find(tab => tab.id === activeTab)?.label}
            </h2>
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;