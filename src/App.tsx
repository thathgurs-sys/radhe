import React, { useState } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BenefitsBar } from './components/BenefitsBar';
import { CollectionBanners } from './components/CollectionBanners';
import { ProductGrid } from './components/ProductGrid';
import { EditorialFeature } from './components/EditorialFeature';
import { BrandStory } from './components/BrandStory';
import { NewsletterSection } from './components/NewsletterSection';
import { Footer } from './components/Footer';
import { QuickViewModal } from './components/QuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { CartPage } from './components/CartPage';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { CustomerAuthModal } from './components/CustomerAuthModal';
import { CustomerAccountView } from './components/CustomerAccountView';
import { WishlistPage } from './components/WishlistPage';
import { ShopCatalogView } from './components/ShopCatalogView';
import { ProductDetailPage } from './components/ProductDetailPage';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminCpanelExport } from './components/admin/AdminCpanelExport';
import { Toast } from './components/Toast';

const MainAppContent: React.FC = () => {
  const { currentView, setCurrentView, isAdminLoggedIn } = useStore();

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isOrderConfirmationOpen, setIsOrderConfirmationOpen] = useState(false);

  // If viewing admin section
  if (currentView === 'admin') {
    if (!isAdminLoggedIn) {
      return (
        <>
          <AdminLogin />
          <Toast />
        </>
      );
    }
    return (
      <>
        <AdminLayout />
        <Toast />
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F4] text-[#171717] selection:bg-[#B89B5E]/20 selection:text-[#111111]">
      {/* Toast Notifications */}
      <Toast />

      {/* Main Luxury Header */}
      <Header onOpenAuth={() => setIsAuthModalOpen(true)} />

      {/* Main Content Router */}
      <main className="flex-grow">
        {currentView === 'home' && (
          <>
            <Hero />
            <BenefitsBar />
            <CollectionBanners />
            <ProductGrid />
            <EditorialFeature />
            <BrandStory />
            <NewsletterSection />
          </>
        )}

        {currentView === 'shop' && <ShopCatalogView />}

        {currentView === 'product-detail' && <ProductDetailPage />}

        {currentView === 'cart' && (
          <CartPage onOpenCheckout={() => setIsCheckoutModalOpen(true)} />
        )}

        {currentView === 'wishlist' && <WishlistPage />}

        {currentView === 'account' && <CustomerAccountView />}

        {currentView === 'cpanel-export' && (
          <div className="bg-[#141414] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="mb-6 flex justify-between items-center text-xs">
                <button
                  onClick={() => setCurrentView('home')}
                  className="text-[#B89B5E] hover:underline cursor-pointer"
                >
                  ← Return to Luxury Storefront
                </button>
              </div>
              <AdminCpanelExport />
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      {currentView !== 'cpanel-export' && <Footer />}

      {/* Modals & Drawers */}
      <QuickViewModal />
      
      <CartDrawer onOpenCheckout={() => setIsCheckoutModalOpen(true)} />

      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        onOrderSuccess={() => setIsOrderConfirmationOpen(true)}
      />

      <OrderConfirmationModal
        isOpen={isOrderConfirmationOpen}
        onClose={() => setIsOrderConfirmationOpen(false)}
      />

      <CustomerAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainAppContent />
    </StoreProvider>
  );
}
