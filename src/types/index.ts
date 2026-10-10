export interface Product {
  id: number;
  categoryId: number;
  categoryName: string;
  name: string;
  slug: string;
  sku: string;
  shortDescription: string;
  description: string;
  price: number;
  salePrice?: number;
  stock: number;
  lowStockThreshold: number;
  material: string;
  weight: string;
  dimensions?: string;
  image: string;
  secondaryImages?: string[];
  isFeatured: boolean;
  isBestseller: boolean;
  isNewArrival: boolean;
  status: 'active' | 'inactive';
  rating: number;
  reviewCount: number;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  count: number;
  status: 'active' | 'inactive';
}

export interface CartItem {
  id: string;
  productId: number;
  product: Product;
  quantity: number;
  selectedSize?: string;
}

export interface OrderItem {
  productId: number;
  productName: string;
  sku: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  items: OrderItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  shipping: number;
  grandTotal: number;
  paymentMethod: 'cod' | 'razorpay' | 'card';
  paymentStatus: 'pending' | 'paid';
  orderStatus: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
}

export interface Coupon {
  id: number;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minOrder: number;
  maxDiscount?: number;
  status: 'active' | 'inactive';
  timesUsed: number;
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  ordersCount: number;
  totalSpent: number;
  createdAt: string;
  status: 'active' | 'suspended';
}

export interface Review {
  id: number;
  productId: number;
  productName: string;
  customerName: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  status: 'approved' | 'pending' | 'rejected';
}

export interface StoreSettings {
  brandName: string;
  tagline: string;
  currencySymbol: string;
  currencyCode: string;
  contactEmail: string;
  contactPhone: string;
  boutiqueAddress: string;
  freeShippingThreshold: number;
  standardShippingFee: number;
  taxRatePercent: number;
  razorpayKeyId: string;
  smtpHost: string;
}
