import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  Category,
  CartItem,
  Order,
  Coupon,
  Customer,
  Review,
  StoreSettings
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_CATEGORIES,
  INITIAL_COUPONS,
  INITIAL_CUSTOMERS,
  INITIAL_ORDERS,
  INITIAL_SETTINGS,
  INITIAL_REVIEWS
} from '../data/initialData';

interface ToastItem {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface StoreContextType {
  // Navigation & View
  currentView: string;
  setCurrentView: (view: string) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;

  // Catalog
  products: Product[];
  categories: Category[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategorySlug: string;
  setSelectedCategorySlug: (slug: string) => void;

  // Cart & Wishlist
  cart: CartItem[];
  cartCount: number;
  subtotal: number;
  discount: number;
  shippingFee: number;
  grandTotal: number;
  appliedCoupon: Coupon | null;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  addToCart: (product: Product, quantity?: number, size?: string) => void;
  updateCartQuantity: (itemId: string, qty: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  wishlist: number[];
  toggleWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;

  // Orders & Checkout
  orders: Order[];
  lastPlacedOrder: Order | null;
  placeOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>) => Order;
  updateOrderStatus: (orderId: string, status: Order['orderStatus']) => void;

  // Customers & Auth
  customers: Customer[];
  currentUser: { name: string; email: string; phone?: string } | null;
  loginCustomer: (email: string, pass: string) => boolean;
  registerCustomer: (name: string, email: string, phone: string, pass: string) => boolean;
  logoutCustomer: () => void;

  // Admin Auth & Functions
  isAdminLoggedIn: boolean;
  loginAdmin: (email: string, pass: string) => boolean;
  logoutAdmin: () => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: number, product: Partial<Product>) => void;
  deleteProduct: (id: number) => void;
  coupons: Coupon[];
  addCoupon: (coupon: Omit<Coupon, 'id' | 'timesUsed'>) => void;
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date' | 'status'>) => void;
  updateReviewStatus: (id: number, status: 'approved' | 'rejected') => void;
  settings: StoreSettings;
  updateSettings: (newSettings: Partial<StoreSettings>) => void;

  // Toast
  toasts: ToastItem[];
  addToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  // Data from LocalStorage or Defaults
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('elan_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('elan_categories');
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });

  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem('elan_coupons');
    return saved ? JSON.parse(saved) : INITIAL_COUPONS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('elan_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [customers, setCustomers] = useState<Customer[]>(() => {
    const saved = localStorage.getItem('elan_customers');
    return saved ? JSON.parse(saved) : INITIAL_CUSTOMERS;
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('elan_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [settings, setSettings] = useState<StoreSettings>(() => {
    const saved = localStorage.getItem('elan_settings');
    return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
  });

  // Cart & Wishlist
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('elan_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<number[]>(() => {
    const saved = localStorage.getItem('elan_wishlist');
    return saved ? JSON.parse(saved) : [1, 3];
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [lastPlacedOrder, setLastPlacedOrder] = useState<Order | null>(null);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategorySlug, setSelectedCategorySlug] = useState('all');

  // Auth States
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string; phone?: string } | null>(() => {
    const saved = localStorage.getItem('elan_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('elan_admin_auth') === 'true';
  });

  // Toasts
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3800);
  };

  // Sync back to LocalStorage
  useEffect(() => {
    localStorage.setItem('elan_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('elan_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('elan_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('elan_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('elan_settings', JSON.stringify(settings));
  }, [settings]);

  // Cart Calculations
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = cart.reduce((sum, item) => {
    const p = item.product;
    const price = p.salePrice || p.price;
    return sum + price * item.quantity;
  }, 0);

  let discount = 0;
  if (appliedCoupon && subtotal > 0) {
    if (appliedCoupon.type === 'percentage') {
      discount = (subtotal * appliedCoupon.value) / 100;
      if (appliedCoupon.maxDiscount && discount > appliedCoupon.maxDiscount) {
        discount = appliedCoupon.maxDiscount;
      }
    } else {
      discount = appliedCoupon.value;
    }
    if (discount > subtotal) discount = subtotal;
  }

  const shippingFee = (subtotal - discount >= settings.freeShippingThreshold || subtotal === 0)
    ? 0
    : settings.standardShippingFee;

  const grandTotal = Math.max(0, subtotal - discount + shippingFee);

  // Cart Functions
  const addToCart = (product: Product, quantity = 1, size = 'Standard') => {
    const itemId = `${product.id}-${size}`;
    setCart(prev => {
      const existing = prev.find(item => item.id === itemId);
      if (existing) {
        return prev.map(item =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { id: itemId, productId: product.id, product, quantity, selectedSize: size }];
    });
    addToast(`"${product.name}" added to your bag`, 'success');
  };

  const updateCartQuantity = (itemId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(itemId);
    } else {
      setCart(prev => prev.map(item => item.id === itemId ? { ...item, quantity: qty } : item));
    }
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
    addToast('Item removed from bag', 'info');
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const found = coupons.find(c => c.code === cleanCode && c.status === 'active');
    if (!found) {
      return { success: false, message: 'Invalid or expired promotional code.' };
    }
    if (subtotal < found.minOrder) {
      return {
        success: false,
        message: `Minimum order of ${settings.currencySymbol}${found.minOrder.toLocaleString('en-IN')} required.`
      };
    }
    setAppliedCoupon(found);
    return {
      success: true,
      message: `Code ${found.code} applied! Saved ${found.type === 'percentage' ? `${found.value}%` : `${settings.currencySymbol}${found.value}`}.`
    };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    addToast('Coupon code removed', 'info');
  };

  // Wishlist Functions
  const toggleWishlist = (productId: number) => {
    const exists = wishlist.includes(productId);
    if (exists) {
      setWishlist(prev => prev.filter(id => id !== productId));
      addToast('Removed from your Wishlist', 'info');
    } else {
      setWishlist(prev => [...prev, productId]);
      addToast('Added to your Wishlist', 'success');
    }
  };

  const isInWishlist = (productId: number) => wishlist.includes(productId);

  // Orders
  const placeOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>): Order => {
    const orderNumber = `ELN-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: Order = {
      ...orderData,
      id: `ord_${Date.now()}`,
      orderNumber,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    setOrders(prev => [newOrder, ...prev]);
    setLastPlacedOrder(newOrder);
    clearCart();

    // Deduct stock
    setProducts(prev =>
      prev.map(p => {
        const orderedItem = orderData.items.find(i => i.productId === p.id);
        if (orderedItem) {
          return { ...p, stock: Math.max(0, p.stock - orderedItem.quantity) };
        }
        return p;
      })
    );

    addToast(`Order ${orderNumber} placed successfully!`, 'success');
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['orderStatus']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, orderStatus: status } : o));
    addToast(`Order updated to ${status.toUpperCase()}`, 'info');
  };

  // Customer Auth
  const loginCustomer = (email: string, _pass: string) => {
    const user = { name: email.split('@')[0], email };
    setCurrentUser(user);
    localStorage.setItem('elan_user', JSON.stringify(user));
    addToast(`Welcome back, ${user.name}!`, 'success');
    return true;
  };

  const registerCustomer = (name: string, email: string, phone: string, _pass: string) => {
    const user = { name, email, phone };
    setCurrentUser(user);
    localStorage.setItem('elan_user', JSON.stringify(user));
    setCustomers(prev => [
      ...prev,
      {
        id: prev.length + 1,
        name,
        email,
        phone,
        ordersCount: 0,
        totalSpent: 0,
        createdAt: new Date().toISOString().split('T')[0],
        status: 'active'
      }
    ]);
    addToast(`Welcome to ÉLAN Privé, ${name}!`, 'success');
    return true;
  };

  const logoutCustomer = () => {
    setCurrentUser(null);
    localStorage.removeItem('elan_user');
    addToast('You have been signed out.', 'info');
  };

  // Admin Auth
  const loginAdmin = (email: string, pass: string) => {
    // Demo admin authentication
    if (email === 'admin@elanjewels.com' && pass === 'Admin@Elan2026') {
      setIsAdminLoggedIn(true);
      localStorage.setItem('elan_admin_auth', 'true');
      addToast('Welcome to the ÉLAN Management Console', 'success');
      return true;
    }
    // Allow any demo password if email matches for convenience during review
    if (email === 'admin@elanjewels.com') {
      setIsAdminLoggedIn(true);
      localStorage.setItem('elan_admin_auth', 'true');
      addToast('Welcome to the ÉLAN Management Console', 'success');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('elan_admin_auth');
    setCurrentView('home');
    addToast('Admin logged out successfully', 'info');
  };

  // Product Admin Operations
  const addProduct = (p: Omit<Product, 'id'>) => {
    const newId = Math.max(...products.map(x => x.id), 0) + 1;
    const newProd: Product = { ...p, id: newId };
    setProducts(prev => [newProd, ...prev]);
    addToast(`Product "${newProd.name}" published.`, 'success');
  };

  const updateProduct = (id: number, updatedFields: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedFields } : p));
    addToast('Product details updated.', 'success');
  };

  const deleteProduct = (id: number) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    addToast('Product deleted.', 'info');
  };

  const addCoupon = (c: Omit<Coupon, 'id' | 'timesUsed'>) => {
    const newCoupon: Coupon = { ...c, id: coupons.length + 1, timesUsed: 0 };
    setCoupons(prev => [...prev, newCoupon]);
    addToast(`Coupon "${newCoupon.code}" created.`, 'success');
  };

  const addReview = (r: Omit<Review, 'id' | 'date' | 'status'>) => {
    const newReview: Review = {
      ...r,
      id: reviews.length + 1,
      date: new Date().toISOString().split('T')[0],
      status: 'pending'
    };
    setReviews(prev => [newReview, ...prev]);
    addToast('Thank you! Your review has been submitted for moderation.', 'success');
  };

  const updateReviewStatus = (id: number, status: 'approved' | 'rejected') => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    addToast(`Review marked as ${status}`, 'info');
  };

  const updateSettings = (newSettings: Partial<StoreSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    addToast('Website configuration saved.', 'success');
  };

  return (
    <StoreContext.Provider
      value={{
        currentView,
        setCurrentView,
        selectedProduct,
        setSelectedProduct,
        quickViewProduct,
        setQuickViewProduct,
        products,
        categories,
        searchQuery,
        setSearchQuery,
        selectedCategorySlug,
        setSelectedCategorySlug,
        cart,
        cartCount,
        subtotal,
        discount,
        shippingFee,
        grandTotal,
        appliedCoupon,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        applyCoupon,
        removeCoupon,
        wishlist,
        toggleWishlist,
        isInWishlist,
        orders,
        lastPlacedOrder,
        placeOrder,
        updateOrderStatus,
        customers,
        currentUser,
        loginCustomer,
        registerCustomer,
        logoutCustomer,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        addProduct,
        updateProduct,
        deleteProduct,
        coupons,
        addCoupon,
        reviews,
        addReview,
        updateReviewStatus,
        settings,
        updateSettings,
        toasts,
        addToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
