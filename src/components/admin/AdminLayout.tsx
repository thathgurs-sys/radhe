import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { AdminDashboard } from './AdminDashboard';
import { AdminProducts } from './AdminProducts';
import { AdminOrders } from './AdminOrders';
import { AdminCategories } from './AdminCategories';
import { AdminCoupons } from './AdminCoupons';
import { AdminInventory } from './AdminInventory';
import { AdminReports } from './AdminReports';
import { AdminSettings } from './AdminSettings';
import { AdminCpanelExport } from './AdminCpanelExport';
import {
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingBag,
  Tag,
  Warehouse,
  BarChart3,
  Settings,
  Server,
  LogOut,
  ExternalLink,
  ShieldCheck,
  Menu,
  X
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { logoutAdmin, setCurrentView } = useStore();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'categories', label: 'Categories', icon: FolderTree },
    { id: 'orders', label: 'Orders & Sales', icon: ShoppingBag },
    { id: 'inventory', label: 'Inventory', icon: Warehouse },
    { id: 'coupons', label: 'Coupons', icon: Tag },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'settings', label: 'Store Settings', icon: Settings },
    { id: 'cpanel-export', label: 'cPanel Hosting Package', icon: Server, badge: 'PHP/SQL' }
  ];

  return (
    <div className="min-h-screen bg-[#141414] text-stone-200 flex flex-col font-sans">
      
      {/* Admin Top Navigation */}
      <header className="h-16 bg-[#1A1A1A] border-b border-[#2A2A2A] px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            className="md:hidden p-1.5 text-stone-400 hover:text-white"
          >
            {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="flex items-center gap-2">
            <span className="font-serif text-xl font-bold tracking-wider text-white">
              ÉLAN JEWELS
            </span>
            <span className="px-2 py-0.5 bg-[#2B2B2B] text-[#B89B5E] text-[10px] uppercase font-mono tracking-wider font-semibold border border-[#3A3A3A]">
              Admin Core
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <button
            onClick={() => setCurrentView('home')}
            className="hidden sm:flex items-center gap-1.5 text-stone-400 hover:text-[#B89B5E] transition-colors cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Live Storefront</span>
          </button>
          
          <div className="h-4 w-[1px] bg-stone-700 hidden sm:block" />

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#2A2A2A] border border-[#B89B5E] flex items-center justify-center text-[11px] font-bold text-[#B89B5E]">
              A
            </div>
            <span className="hidden md:inline text-stone-300">admin@elanjewels.com</span>
          </div>

          <button
            onClick={logoutAdmin}
            className="p-1.5 text-stone-400 hover:text-red-400 transition-colors cursor-pointer"
            title="Log out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex-1 flex">
        
        {/* Left Sidebar */}
        <aside
          className={`w-64 bg-[#181818] border-r border-[#2A2A2A] flex flex-col justify-between shrink-0 fixed md:static inset-y-16 left-0 z-20 transform transition-transform duration-200 ${
            isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
        >
          <div className="p-4 space-y-1">
            <div className="px-3 py-2 text-[10px] uppercase tracking-wider text-stone-500 font-semibold">
              Management Menu
            </div>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-medium rounded-none transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#262626] text-[#B89B5E] border-l-2 border-[#B89B5E]'
                      : 'text-stone-400 hover:bg-[#202020] hover:text-stone-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[9px] px-1.5 py-0.2 bg-[#B89B5E]/20 text-[#B89B5E] font-mono border border-[#B89B5E]/40">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Sidebar Footnote */}
          <div className="p-4 border-t border-[#262626] text-[10px] text-stone-500 space-y-1">
            <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>PHP 8.2 / MySQL Mode</span>
            </div>
            <div>Shared Hosting Verified</div>
          </div>
        </aside>

        {/* Content Pane */}
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
          {activeTab === 'dashboard' && <AdminDashboard onNavigate={setActiveTab} />}
          {activeTab === 'products' && <AdminProducts />}
          {activeTab === 'categories' && <AdminCategories />}
          {activeTab === 'orders' && <AdminOrders />}
          {activeTab === 'inventory' && <AdminInventory />}
          {activeTab === 'coupons' && <AdminCoupons />}
          {activeTab === 'reports' && <AdminReports />}
          {activeTab === 'settings' && <AdminSettings />}
          {activeTab === 'cpanel-export' && <AdminCpanelExport />}
        </main>

      </div>

    </div>
  );
};
