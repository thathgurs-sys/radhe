import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import {
  ShoppingBag,
  Heart,
  User,
  Search,
  Menu,
  X,
  Server,
  ShieldCheck
} from 'lucide-react';

export const Header: React.FC<{ onOpenAuth: () => void }> = ({ onOpenAuth }) => {
  const {
    currentView,
    setCurrentView,
    cartCount,
    wishlist,
    setIsCartDrawerOpen,
    searchQuery,
    setSearchQuery,
    currentUser,
    setSelectedCategorySlug
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (view: string, catSlug?: string) => {
    if (catSlug) {
      setSelectedCategorySlug(catSlug);
    }
    setCurrentView(view);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setCurrentView('shop');
      setIsSearchOpen(false);
    }
  };

  return (
    <>
      {/* Top Announcement & Developer/Admin Strip */}
      <div className="bg-[#111111] text-[#E8E1D7] text-[11px] uppercase tracking-[0.18em] py-2 px-4 border-b border-[#242424] font-sans">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-[#B89B5E]">✦</span>
            <span>Complimentary Insured Delivery on Orders Over ₹5,000</span>
          </div>

          <div className="flex items-center gap-4 text-[10px]">
            {/* Quick Switch to Cloudflare / cPanel Free Hosting inspector */}
            <button
              onClick={() => handleNavClick('cpanel-export')}
              className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                currentView === 'cpanel-export' ? 'text-[#B89B5E]' : 'hover:text-[#B89B5E]'
              }`}
              title="View free hosting deployment files (Cloudflare Pages & cPanel)"
            >
              <Server className="w-3.5 h-3.5" />
              <span>Cloudflare / cPanel (Free Hosting)</span>
            </button>

            {/* Quick Switch to Admin Panel */}
            <button
              onClick={() => handleNavClick('admin')}
              className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                currentView === 'admin' ? 'text-[#B89B5E]' : 'hover:text-[#B89B5E]'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Console</span>
            </button>

            <span className="text-stone-500">|</span>
            <span>INR (₹)</span>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 font-sans ${
          isScrolled
            ? 'bg-[#FAF8F4]/95 backdrop-blur-md shadow-sm border-b border-[#E8E1D7]'
            : 'bg-[#FAF8F4] border-b border-[#E8E1D7]/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
          {/* Mobile Hamburger */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-[#171717] hover:text-[#B89B5E] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Left / Brand Zone */}
          <div className="flex items-center">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left group focus:outline-none cursor-pointer"
            >
              <span className="font-serif text-2xl sm:text-3xl tracking-[0.14em] text-[#111111] font-medium block">
                ÉLAN JEWELS
              </span>
              <span className="text-[9px] uppercase tracking-[0.32em] text-[#B89B5E] block font-sans -mt-1 group-hover:text-[#9A7D42] transition-colors">
                Haute Joaillerie
              </span>
            </button>
          </div>

          {/* Center Navigation Links (Single-Line Contract) */}
          <nav className="hidden lg:flex items-center gap-8 text-[12px] font-medium tracking-[0.18em] uppercase text-[#171717]">
            <button
              onClick={() => handleNavClick('home')}
              className={`hover:text-[#B89B5E] transition-colors cursor-pointer pb-1 relative ${
                currentView === 'home' ? 'text-[#B89B5E]' : ''
              }`}
            >
              Home
              {currentView === 'home' && (
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#B89B5E]" />
              )}
            </button>

            <button
              onClick={() => handleNavClick('shop', 'all')}
              className={`hover:text-[#B89B5E] transition-colors cursor-pointer pb-1 relative ${
                currentView === 'shop' ? 'text-[#B89B5E]' : ''
              }`}
            >
              Shop All
            </button>

            <button
              onClick={() => handleNavClick('shop', 'necklaces')}
              className="hover:text-[#B89B5E] transition-colors cursor-pointer pb-1"
            >
              Necklaces
            </button>

            <button
              onClick={() => handleNavClick('shop', 'earrings')}
              className="hover:text-[#B89B5E] transition-colors cursor-pointer pb-1"
            >
              Earrings
            </button>

            <button
              onClick={() => handleNavClick('shop', 'rings')}
              className="hover:text-[#B89B5E] transition-colors cursor-pointer pb-1"
            >
              Rings
            </button>

            <button
              onClick={() => handleNavClick('shop', 'bracelets')}
              className="hover:text-[#B89B5E] transition-colors cursor-pointer pb-1"
            >
              Bracelets
            </button>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-4 sm:gap-5">
            {/* Search Toggle */}
            <div className="relative">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-1.5 text-[#171717] hover:text-[#B89B5E] transition-colors cursor-pointer"
                title="Search Jewelry"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Search dropdown */}
              {isSearchOpen && (
                <form
                  onSubmit={handleSearchSubmit}
                  className="absolute right-0 top-10 w-72 bg-white border border-[#E8E1D7] shadow-xl p-3 z-50 flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search diamonds, rings, SKU..."
                    className="w-full text-xs px-2 py-1.5 border border-stone-200 focus:outline-none focus:border-[#B89B5E]"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="bg-[#111111] text-white px-3 py-1.5 text-xs font-medium uppercase tracking-wider hover:bg-[#B89B5E] transition-colors"
                  >
                    Go
                  </button>
                </form>
              )}
            </div>

            {/* Customer Account */}
            <button
              onClick={() => {
                if (currentUser) {
                  handleNavClick('account');
                } else {
                  onOpenAuth();
                }
              }}
              className="p-1.5 text-[#171717] hover:text-[#B89B5E] transition-colors cursor-pointer flex items-center gap-1"
              title={currentUser ? `Account: ${currentUser.name}` : 'Sign In'}
              aria-label="Customer Account"
            >
              <User className="w-5 h-5" />
              {currentUser && (
                <span className="hidden xl:inline text-[11px] text-[#77716A]">
                  {currentUser.name}
                </span>
              )}
            </button>

            {/* Wishlist */}
            <button
              onClick={() => handleNavClick('wishlist')}
              className="p-1.5 text-[#171717] hover:text-[#B89B5E] transition-colors relative cursor-pointer"
              title="Your Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#B89B5E] text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="p-1.5 text-[#171717] hover:text-[#B89B5E] transition-colors relative cursor-pointer flex items-center gap-1"
              title="Shopping Bag"
              aria-label="Shopping Bag"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1.5 w-4 h-4 bg-[#111111] text-[#B89B5E] rounded-full text-[9px] font-bold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#FAF8F4] border-b border-[#E8E1D7] px-6 py-6 space-y-4">
            <div className="flex flex-col space-y-3 text-xs tracking-widest uppercase">
              <button
                onClick={() => handleNavClick('home')}
                className="text-left py-2 border-b border-[#E8E1D7]/50 font-medium"
              >
                Home
              </button>
              <button
                onClick={() => handleNavClick('shop', 'all')}
                className="text-left py-2 border-b border-[#E8E1D7]/50 font-medium"
              >
                All Jewelry
              </button>
              <button
                onClick={() => handleNavClick('shop', 'necklaces')}
                className="text-left py-2 border-b border-[#E8E1D7]/50"
              >
                Necklaces & Pendants
              </button>
              <button
                onClick={() => handleNavClick('shop', 'earrings')}
                className="text-left py-2 border-b border-[#E8E1D7]/50"
              >
                Earrings & Drops
              </button>
              <button
                onClick={() => handleNavClick('shop', 'rings')}
                className="text-left py-2 border-b border-[#E8E1D7]/50"
              >
                Rings & Bands
              </button>
              <button
                onClick={() => handleNavClick('shop', 'bracelets')}
                className="text-left py-2 border-b border-[#E8E1D7]/50"
              >
                Bracelets & Cuffs
              </button>
              <button
                onClick={() => handleNavClick('wishlist')}
                className="text-left py-2 border-b border-[#E8E1D7]/50 flex justify-between"
              >
                <span>Wishlist</span>
                <span className="text-[#B89B5E] font-mono">{wishlist.length}</span>
              </button>
              <button
                onClick={() => handleNavClick('cpanel-export')}
                className="text-left py-2 border-b border-[#E8E1D7]/50 text-[#B89B5E] font-medium flex items-center gap-2"
              >
                <Server className="w-4 h-4" />
                <span>cPanel PHP/MySQL Files</span>
              </button>
              <button
                onClick={() => handleNavClick('admin')}
                className="text-left py-2 text-[#111111] font-medium flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Admin Panel</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
