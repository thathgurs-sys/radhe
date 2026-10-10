import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { User, Package, MapPin, LogOut, Shield, Clock } from 'lucide-react';

export const CustomerAccountView: React.FC = () => {
  const { currentUser, logoutCustomer, orders, settings, setCurrentView } = useStore();
  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'security'>('orders');

  if (!currentUser) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center font-sans">
        <h2 className="font-serif text-3xl mb-4">Please sign in to access your account</h2>
        <button
          onClick={() => setCurrentView('home')}
          className="px-6 py-2 bg-[#111111] text-white text-xs uppercase tracking-wider"
        >
          Return Home
        </button>
      </div>
    );
  }

  const userOrders = orders; // Show user orders

  return (
    <div className="bg-[#FAF8F4] min-h-screen py-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Account Header */}
        <div className="bg-white border border-[#E8E1D7] p-6 sm:p-8 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#FAF8F4] border border-[#B89B5E] text-[#B89B5E] flex items-center justify-center font-serif text-2xl font-bold">
              {currentUser.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.24em] text-[#B89B5E] font-semibold block">
                Privé Member
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl text-[#111111]">
                {currentUser.name}
              </h1>
              <p className="text-xs text-[#77716A]">{currentUser.email}</p>
            </div>
          </div>

          <button
            onClick={logoutCustomer}
            className="flex items-center gap-1.5 px-4 py-2 border border-[#E8E1D7] text-xs uppercase tracking-wider hover:border-red-400 hover:text-red-600 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Sidebar */}
          <div className="bg-white border border-[#E8E1D7] p-4 space-y-1 h-fit">
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-xs uppercase tracking-wider font-medium text-left transition-colors cursor-pointer ${
                activeTab === 'orders' ? 'bg-[#111111] text-white' : 'text-[#77716A] hover:bg-[#FAF8F4] hover:text-[#111111]'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Order History ({userOrders.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('addresses')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-xs uppercase tracking-wider font-medium text-left transition-colors cursor-pointer ${
                activeTab === 'addresses' ? 'bg-[#111111] text-white' : 'text-[#77716A] hover:bg-[#FAF8F4] hover:text-[#111111]'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Saved Addresses</span>
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-xs uppercase tracking-wider font-medium text-left transition-colors cursor-pointer ${
                activeTab === 'security' ? 'bg-[#111111] text-white' : 'text-[#77716A] hover:bg-[#FAF8F4] hover:text-[#111111]'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>Security & Password</span>
            </button>
          </div>

          {/* Content Area */}
          <div className="md:col-span-3">
            {activeTab === 'orders' && (
              <div className="space-y-4">
                <h3 className="font-serif text-2xl text-[#111111] mb-4">Your Recent Orders</h3>
                {userOrders.length === 0 ? (
                  <div className="bg-white border border-[#E8E1D7] p-8 text-center text-xs text-[#77716A]">
                    You have not placed any orders yet.
                  </div>
                ) : (
                  userOrders.map((ord) => (
                    <div key={ord.id} className="bg-white border border-[#E8E1D7] p-5">
                      <div className="flex flex-wrap justify-between items-center gap-2 pb-3 border-b border-[#E8E1D7] text-xs">
                        <div>
                          <span className="font-mono font-bold text-sm text-[#111111]">{ord.orderNumber}</span>
                          <span className="text-[10px] text-stone-400 block">{ord.createdAt}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="px-2.5 py-1 bg-[#FAF8F4] border border-[#B89B5E]/40 text-[#B89B5E] text-[10px] uppercase tracking-wider font-semibold">
                            {ord.orderStatus.toUpperCase()}
                          </span>
                          <span className="font-serif font-bold text-base text-[#111111] tabular-nums">
                            {settings.currencySymbol}{ord.grandTotal.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>

                      <div className="py-3 space-y-2">
                        {ord.items.map((it, idx) => (
                          <div key={idx} className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                              <img src={it.image} alt={it.productName} className="w-10 h-10 object-cover border" />
                              <div>
                                <span className="font-medium text-[#111111]">{it.productName}</span>
                                <span className="text-[10px] text-stone-400 block">Qty: {it.quantity}</span>
                              </div>
                            </div>
                            <span className="font-mono tabular-nums text-[#111111]">
                              {settings.currencySymbol}{(it.price * it.quantity).toLocaleString('en-IN')}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-3 border-t border-[#E8E1D7] text-[11px] text-[#77716A]">
                        <span>Shipping to: {ord.shippingAddress.street}, {ord.shippingAddress.city} ({ord.shippingAddress.pincode})</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="bg-white border border-[#E8E1D7] p-6 space-y-4">
                <h3 className="font-serif text-2xl text-[#111111] mb-2">Primary Residence</h3>
                <div className="p-4 bg-[#FAF8F4] border border-[#E8E1D7] text-xs space-y-1">
                  <span className="font-semibold text-[#111111] block">Default Armored Delivery Address</span>
                  <p className="text-[#77716A]">Flat 402, Sea Green Apts, Worli Sea Face</p>
                  <p className="text-[#77716A]">Mumbai, Maharashtra 400018, India</p>
                  <p className="text-[#77716A]">Phone: +91 98201 12345</p>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="bg-white border border-[#E8E1D7] p-6 space-y-4">
                <h3 className="font-serif text-2xl text-[#111111] mb-2">Account Security</h3>
                <p className="text-xs text-[#77716A]">
                  Your password is protected via PBKDF2/Bcrypt hash verification on shared hosting PHP.
                </p>
                <div className="pt-2">
                  <button className="px-4 py-2 border border-[#111111] text-xs uppercase tracking-wider hover:bg-[#111111] hover:text-white transition-colors cursor-pointer">
                    Change Password
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
