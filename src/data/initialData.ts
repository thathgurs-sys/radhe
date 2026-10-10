import { Product, Category, Coupon, Customer, Order, Review, StoreSettings } from '../types';

// Luxury Image Assets
import heroImage from '../assets/images/hero_diamond_pendant_1791612732695.jpg';
import bridalImage from '../assets/images/collection_bridal_luxury_1791612742370.jpg';
import sapphireEarringsImage from '../assets/images/sapphire_drop_earrings_1791612755801.jpg';
import goldRingImage from '../assets/images/gold_diamond_ring_1791612766918.jpg';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 1,
    name: 'Necklaces',
    slug: 'necklaces',
    description: 'Artisanal pendants and brilliant diamond statement necklaces.',
    image: heroImage,
    count: 14,
    status: 'active'
  },
  {
    id: 2,
    name: 'Earrings',
    slug: 'earrings',
    description: 'Radiant studs, chandelier drops, and sculpted gold hoops.',
    image: sapphireEarringsImage,
    count: 22,
    status: 'active'
  },
  {
    id: 3,
    name: 'Rings',
    slug: 'rings',
    description: 'Solitaire diamonds and bespoke precious gemstone bands.',
    image: goldRingImage,
    count: 18,
    status: 'active'
  },
  {
    id: 4,
    name: 'Bracelets',
    slug: 'bracelets',
    description: 'Timeless diamond tennis bracelets and delicate cuffs.',
    image: bridalImage,
    count: 11,
    status: 'active'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    categoryId: 1,
    categoryName: 'Necklaces',
    name: 'Aurora Diamond Necklace',
    slug: 'aurora-diamond-necklace',
    sku: 'ELN-NK-001',
    shortDescription: 'An ethereal yellow sapphire pendant crowned by a brilliant halo of micro-pavé diamonds.',
    description: 'Handcrafted in 18K white and yellow gold, the Aurora Pendant captures radiant golden hour illumination. Features a certified cushion-cut 2.4ct natural yellow sapphire encased in a dual brilliant diamond halo.',
    price: 18900,
    salePrice: 16900,
    stock: 12,
    lowStockThreshold: 3,
    material: '18K White & Yellow Gold',
    weight: '4.6g',
    dimensions: '18-inch adjustable chain, 14mm pendant',
    image: heroImage,
    secondaryImages: [sapphireEarringsImage, goldRingImage],
    isFeatured: true,
    isBestseller: true,
    isNewArrival: true,
    status: 'active',
    rating: 4.9,
    reviewCount: 38
  },
  {
    id: 2,
    categoryId: 2,
    categoryName: 'Earrings',
    name: 'Celeste Drop Earrings',
    slug: 'celeste-drop-earrings',
    sku: 'ELN-ER-002',
    shortDescription: 'Pear-cut royal sapphires suspended from diamond leaves and pavé hoops.',
    description: 'Designed for unforgettable galas and milestones, Celeste brings high-jewelry theatre to your collection. Features twin 1.8ct deep blue natural sapphires accented with marquise diamonds.',
    price: 7500,
    salePrice: 6800,
    stock: 8,
    lowStockThreshold: 2,
    material: '18K Platinum & Sapphire',
    weight: '3.4g',
    dimensions: '32mm drop length',
    image: sapphireEarringsImage,
    secondaryImages: [heroImage, goldRingImage],
    isFeatured: true,
    isBestseller: false,
    isNewArrival: true,
    status: 'active',
    rating: 5.0,
    reviewCount: 24
  },
  {
    id: 3,
    categoryId: 3,
    categoryName: 'Rings',
    name: 'Serena Gold Ring',
    slug: 'serena-gold-ring',
    sku: 'ELN-RG-003',
    shortDescription: 'A magnificent solitaire brilliant diamond set in solid polished 18K yellow gold.',
    description: 'Timeless minimalism elevated. The Serena Ring showcases a flawless six-prong round cut diamond that catches every ray of ambient light with breathtaking brilliance.',
    price: 9800,
    salePrice: 8900,
    stock: 15,
    lowStockThreshold: 4,
    material: '18K Solid Yellow Gold',
    weight: '3.2g',
    dimensions: 'Band width 2.2mm, Size 6-8',
    image: goldRingImage,
    secondaryImages: [heroImage, sapphireEarringsImage],
    isFeatured: true,
    isBestseller: true,
    isNewArrival: true,
    status: 'active',
    rating: 4.8,
    reviewCount: 42
  },
  {
    id: 4,
    categoryId: 4,
    categoryName: 'Bracelets',
    name: 'Luna Pearl Bracelet',
    slug: 'luna-pearl-bracelet',
    sku: 'ELN-BR-004',
    shortDescription: 'Lustrous Japanese Akoya pearls interspersed with faceted diamond roundels.',
    description: 'Graceful and timeless. The Luna Pearl Bracelet rests comfortably on the wrist, fastened with an intricate filigree gold safety clasp.',
    price: 6200,
    salePrice: 5600,
    stock: 20,
    lowStockThreshold: 5,
    material: '18K Yellow Gold & Akoya Pearls',
    weight: '5.1g',
    dimensions: '7.25-inch length',
    image: heroImage,
    secondaryImages: [bridalImage],
    isFeatured: true,
    isBestseller: false,
    isNewArrival: true,
    status: 'active',
    rating: 4.7,
    reviewCount: 19
  },
  {
    id: 5,
    categoryId: 3,
    categoryName: 'Rings',
    name: 'Aurelia Statement Ring',
    slug: 'aurelia-statement-ring',
    sku: 'ELN-RG-005',
    shortDescription: 'Sculptural multi-band ring sparkling with hand-set baguette and pavé diamonds.',
    description: 'An architectural triumph of modern luxury. Aurelia combines geometric lines with organic fluid gold curves.',
    price: 12500,
    salePrice: 11200,
    stock: 3, // Low stock demo
    lowStockThreshold: 4,
    material: '18K Rose & White Gold',
    weight: '5.8g',
    dimensions: 'Front width 11mm',
    image: goldRingImage,
    secondaryImages: [heroImage],
    isFeatured: false,
    isBestseller: true,
    isNewArrival: true,
    status: 'active',
    rating: 4.9,
    reviewCount: 31
  },
  {
    id: 6,
    categoryId: 2,
    categoryName: 'Earrings',
    name: 'Mira Gold Hoops',
    slug: 'mira-gold-hoops',
    sku: 'ELN-ER-006',
    shortDescription: 'Substantial fluted gold hoops sculpted with internal diamond accents.',
    description: 'Everyday grandeur redefined. Lightweight hollow construction for all-day elegance without pulling on the earlobes.',
    price: 5900,
    salePrice: 5200,
    stock: 14,
    lowStockThreshold: 3,
    material: '18K Italian Yellow Gold',
    weight: '2.8g',
    dimensions: 'Diameter 24mm',
    image: sapphireEarringsImage,
    secondaryImages: [goldRingImage],
    isFeatured: false,
    isBestseller: true,
    isNewArrival: true,
    status: 'active',
    rating: 4.6,
    reviewCount: 18
  },
  {
    id: 7,
    categoryId: 4,
    categoryName: 'Bracelets',
    name: 'Noor Tennis Bracelet',
    slug: 'noor-tennis-bracelet',
    sku: 'ELN-BR-007',
    shortDescription: 'A seamless continuous river of four-prong brilliant cut lab diamonds.',
    description: 'Total carat weight of 3.5 carats in DEF color and VVS clarity. Features double-locking luxury clasp.',
    price: 15900,
    salePrice: 14500,
    stock: 2, // Low stock demo
    lowStockThreshold: 3,
    material: '18K White Gold',
    weight: '6.2g',
    dimensions: 'Length 7.0 inches',
    image: bridalImage,
    secondaryImages: [heroImage],
    isFeatured: true,
    isBestseller: true,
    isNewArrival: false,
    status: 'active',
    rating: 5.0,
    reviewCount: 45
  },
  {
    id: 8,
    categoryId: 1,
    categoryName: 'Necklaces',
    name: 'Elara Pendant',
    slug: 'elara-pendant',
    sku: 'ELN-NK-008',
    shortDescription: 'Delicate celestial pendant with a floating diamond constellation motif.',
    description: 'Perfect for layering or quiet standalone charm. Comes with an adjustable 16-18 inch delicate diamond-cut cable chain.',
    price: 8400,
    salePrice: 7500,
    stock: 18,
    lowStockThreshold: 4,
    material: '18K Yellow Gold',
    weight: '2.5g',
    dimensions: 'Pendant 10mm',
    image: heroImage,
    secondaryImages: [goldRingImage],
    isFeatured: true,
    isBestseller: false,
    isNewArrival: false,
    status: 'active',
    rating: 4.8,
    reviewCount: 22
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    id: 1,
    code: 'ELAN20',
    type: 'percentage',
    value: 20,
    minOrder: 5000,
    status: 'active',
    timesUsed: 42
  },
  {
    id: 2,
    code: 'WELCOME10',
    type: 'percentage',
    value: 10,
    minOrder: 2000,
    status: 'active',
    timesUsed: 118
  },
  {
    id: 3,
    code: 'LUXURY1000',
    type: 'fixed',
    value: 1000,
    minOrder: 10000,
    status: 'active',
    timesUsed: 15
  }
];

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 1,
    name: 'Aanya Sharma',
    email: 'aanya.sharma@example.com',
    phone: '+91 98201 12345',
    ordersCount: 3,
    totalSpent: 42800,
    createdAt: '2026-08-14',
    status: 'active'
  },
  {
    id: 2,
    name: 'Rohan Mehra',
    email: 'rohan.mehra@example.com',
    phone: '+91 98199 87654',
    ordersCount: 1,
    totalSpent: 16900,
    createdAt: '2026-09-02',
    status: 'active'
  },
  {
    id: 3,
    name: 'Priyanka Kapoor',
    email: 'priyanka.k@example.com',
    phone: '+91 98334 56789',
    ordersCount: 2,
    totalSpent: 22400,
    createdAt: '2026-09-21',
    status: 'active'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord_1',
    orderNumber: 'ELN-2026-000108',
    customerName: 'Aanya Sharma',
    customerEmail: 'aanya.sharma@example.com',
    customerPhone: '+91 98201 12345',
    shippingAddress: {
      street: 'Flat 402, Sea Green Apts, Worli Sea Face',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400018',
      country: 'India'
    },
    items: [
      {
        productId: 1,
        productName: 'Aurora Diamond Necklace',
        sku: 'ELN-NK-001',
        price: 16900,
        quantity: 1,
        image: heroImage
      }
    ],
    subtotal: 16900,
    discount: 3380,
    couponCode: 'ELAN20',
    shipping: 0,
    grandTotal: 13520,
    paymentMethod: 'cod',
    paymentStatus: 'pending',
    orderStatus: 'confirmed',
    createdAt: '2026-10-08 14:32'
  },
  {
    id: 'ord_2',
    orderNumber: 'ELN-2026-000107',
    customerName: 'Rohan Mehra',
    customerEmail: 'rohan.mehra@example.com',
    customerPhone: '+91 98199 87654',
    shippingAddress: {
      street: '15 Civil Lines, Near Club House',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110054',
      country: 'India'
    },
    items: [
      {
        productId: 3,
        productName: 'Serena Gold Ring',
        sku: 'ELN-RG-003',
        price: 8900,
        quantity: 1,
        image: goldRingImage
      },
      {
        productId: 2,
        productName: 'Celeste Drop Earrings',
        sku: 'ELN-ER-002',
        price: 6800,
        quantity: 1,
        image: sapphireEarringsImage
      }
    ],
    subtotal: 15700,
    discount: 0,
    shipping: 0,
    grandTotal: 15700,
    paymentMethod: 'card',
    paymentStatus: 'paid',
    orderStatus: 'shipped',
    createdAt: '2026-10-07 10:15'
  }
];

export const INITIAL_SETTINGS: StoreSettings = {
  brandName: 'ÉLAN JEWELS',
  tagline: 'Jewelry Made to Be Remembered',
  currencySymbol: '₹',
  currencyCode: 'INR',
  contactEmail: 'concierge@elanjewels.com',
  contactPhone: '+91 98765 43210',
  boutiqueAddress: '12 Heritage Boulevard, Bandra West, Mumbai 400050, India',
  freeShippingThreshold: 5000,
  standardShippingFee: 250,
  taxRatePercent: 3,
  razorpayKeyId: 'rzp_test_luxury_preview_demo',
  smtpHost: 'mail.elanjewels.com'
};

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 1,
    productId: 1,
    productName: 'Aurora Diamond Necklace',
    customerName: 'Kavita Menon',
    rating: 5,
    title: 'Exquisite craftsmanship & radiant fire',
    comment: 'The yellow sapphire in the center has a vivid, luminous fire that turns heads at every dinner. The micro-pavé work is comparable to high European jewelry houses.',
    date: '2026-09-28',
    status: 'approved'
  },
  {
    id: 2,
    productId: 2,
    productName: 'Celeste Drop Earrings',
    customerName: 'Dia Singhania',
    rating: 5,
    title: 'Wore these for my sister’s sangeet',
    comment: 'Substantial yet feather-light on the ears. The royal blue sapphires are deeply saturated and caught the candlelight beautifully.',
    date: '2026-10-01',
    status: 'approved'
  }
];
