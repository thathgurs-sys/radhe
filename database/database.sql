-- ============================================================
-- ÉLAN JEWELS - Production Database Schema & Seed Data
-- Designed for MySQL 8.0+ / MariaDB 10.4+ (Shared Hosting)
-- Charset: utf8mb4 | Collation: utf8mb4_unicode_ci | Engine: InnoDB
-- ============================================================

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS settings;
DROP TABLE IF EXISTS newsletter_subscribers;
DROP TABLE IF EXISTS homepage_sections;
DROP TABLE IF EXISTS banners;
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS coupon_usage;
DROP TABLE IF EXISTS coupons;
DROP TABLE IF EXISTS cart_items;
DROP TABLE IF EXISTS cart;
DROP TABLE IF EXISTS wishlist_items;
DROP TABLE IF EXISTS wishlist;
DROP TABLE IF EXISTS addresses;
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS product_variants;
DROP TABLE IF EXISTS product_images;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS customers;
DROP TABLE IF EXISTS admins;
SET FOREIGN_KEY_CHECKS = 1;

-- ------------------------------------------------------------
-- 1. Admins Table
-- ------------------------------------------------------------
CREATE TABLE admins (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(191) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('super_admin', 'manager', 'support') DEFAULT 'super_admin',
    last_login DATETIME NULL,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 2. Customers Table
-- ------------------------------------------------------------
CREATE TABLE customers (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(191) NOT NULL UNIQUE,
    phone VARCHAR(30) NULL,
    password_hash VARCHAR(255) NOT NULL,
    status ENUM('active', 'suspended') DEFAULT 'active',
    reset_token VARCHAR(100) NULL,
    reset_token_expiry DATETIME NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_customer_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 3. Categories Table
-- ------------------------------------------------------------
CREATE TABLE categories (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(120) NOT NULL UNIQUE,
    description TEXT NULL,
    image_url VARCHAR(255) NULL,
    display_order INT DEFAULT 0,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_cat_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 4. Products Table
-- ------------------------------------------------------------
CREATE TABLE products (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    category_id INT UNSIGNED NOT NULL,
    name VARCHAR(200) NOT NULL,
    slug VARCHAR(220) NOT NULL UNIQUE,
    sku VARCHAR(50) NOT NULL UNIQUE,
    short_description VARCHAR(500) NULL,
    description LONGTEXT NULL,
    price DECIMAL(10,2) NOT NULL,
    sale_price DECIMAL(10,2) NULL,
    cost_price DECIMAL(10,2) NULL,
    stock_quantity INT NOT NULL DEFAULT 10,
    low_stock_threshold INT NOT NULL DEFAULT 3,
    material VARCHAR(100) DEFAULT '18K Yellow Gold',
    weight VARCHAR(50) DEFAULT '3.8g',
    dimensions VARCHAR(100) NULL,
    main_image VARCHAR(255) NOT NULL,
    is_featured TINYINT(1) DEFAULT 0,
    is_bestseller TINYINT(1) DEFAULT 0,
    is_new_arrival TINYINT(1) DEFAULT 1,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT,
    INDEX idx_product_cat (category_id),
    INDEX idx_product_slug (slug),
    INDEX idx_product_featured (is_featured),
    INDEX idx_product_bestseller (is_bestseller),
    INDEX idx_product_new (is_new_arrival)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 5. Product Images Table
-- ------------------------------------------------------------
CREATE TABLE product_images (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    product_id INT UNSIGNED NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 6. Product Variants Table
-- ------------------------------------------------------------
CREATE TABLE product_variants (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    product_id INT UNSIGNED NOT NULL,
    variant_name VARCHAR(100) NOT NULL, -- e.g. Ring Size 6, 7, 8 or Yellow Gold / White Gold
    sku_modifier VARCHAR(50) NULL,
    price_modifier DECIMAL(10,2) DEFAULT 0.00,
    stock_quantity INT DEFAULT 5,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 7. Addresses Table
-- ------------------------------------------------------------
CREATE TABLE addresses (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    customer_id INT UNSIGNED NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    phone VARCHAR(30) NOT NULL,
    street_address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    pincode VARCHAR(20) NOT NULL,
    country VARCHAR(100) DEFAULT 'India',
    is_default TINYINT(1) DEFAULT 0,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 8. Coupons Table
-- ------------------------------------------------------------
CREATE TABLE coupons (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    discount_type ENUM('percentage', 'fixed') NOT NULL DEFAULT 'percentage',
    discount_value DECIMAL(10,2) NOT NULL,
    min_order_amount DECIMAL(10,2) DEFAULT 0.00,
    max_discount_amount DECIMAL(10,2) NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    usage_limit INT DEFAULT 1000,
    times_used INT DEFAULT 0,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 9. Orders Table
-- ------------------------------------------------------------
CREATE TABLE orders (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    order_number VARCHAR(60) NOT NULL UNIQUE,
    customer_id INT UNSIGNED NULL,
    customer_name VARCHAR(150) NOT NULL,
    customer_email VARCHAR(191) NOT NULL,
    customer_phone VARCHAR(30) NOT NULL,
    shipping_address TEXT NOT NULL,
    shipping_city VARCHAR(100) NOT NULL,
    shipping_state VARCHAR(100) NOT NULL,
    shipping_pincode VARCHAR(20) NOT NULL,
    shipping_country VARCHAR(100) DEFAULT 'India',
    subtotal DECIMAL(10,2) NOT NULL,
    discount_amount DECIMAL(10,2) DEFAULT 0.00,
    shipping_fee DECIMAL(10,2) DEFAULT 0.00,
    tax_amount DECIMAL(10,2) DEFAULT 0.00,
    grand_total DECIMAL(10,2) NOT NULL,
    coupon_code VARCHAR(50) NULL,
    payment_method ENUM('cod', 'razorpay', 'bank_transfer') DEFAULT 'cod',
    payment_status ENUM('pending', 'paid', 'failed') DEFAULT 'pending',
    order_status ENUM('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    notes TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE SET NULL,
    INDEX idx_order_num (order_number),
    INDEX idx_order_status (order_status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 10. Order Items Table
-- ------------------------------------------------------------
CREATE TABLE order_items (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    order_id INT UNSIGNED NOT NULL,
    product_id INT UNSIGNED NULL,
    product_name VARCHAR(200) NOT NULL,
    product_sku VARCHAR(50) NOT NULL,
    variant_details VARCHAR(100) NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    quantity INT NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 11. Reviews Table
-- ------------------------------------------------------------
CREATE TABLE reviews (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    product_id INT UNSIGNED NOT NULL,
    customer_name VARCHAR(150) NOT NULL,
    customer_email VARCHAR(191) NOT NULL,
    rating TINYINT UNSIGNED NOT NULL CHECK (rating BETWEEN 1 AND 5),
    title VARCHAR(200) NOT NULL,
    comment TEXT NOT NULL,
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    INDEX idx_review_prod (product_id),
    INDEX idx_review_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 12. Banners Table
-- ------------------------------------------------------------
CREATE TABLE banners (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    subtitle VARCHAR(255) NULL,
    image_url VARCHAR(255) NOT NULL,
    button_text VARCHAR(60) DEFAULT 'Shop Collection',
    button_link VARCHAR(255) DEFAULT '/shop.php',
    sort_order INT DEFAULT 0,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 13. Homepage Sections Table
-- ------------------------------------------------------------
CREATE TABLE homepage_sections (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    section_key VARCHAR(50) NOT NULL UNIQUE,
    title VARCHAR(100) NOT NULL,
    subtitle VARCHAR(255) NULL,
    is_enabled TINYINT(1) DEFAULT 1,
    sort_order INT DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 14. Newsletter Subscribers Table
-- ------------------------------------------------------------
CREATE TABLE newsletter_subscribers (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(191) NOT NULL UNIQUE,
    status ENUM('subscribed', 'unsubscribed') DEFAULT 'subscribed',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 15. Settings Table
-- ------------------------------------------------------------
CREATE TABLE settings (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(100) NOT NULL UNIQUE,
    setting_value LONGTEXT NULL,
    description VARCHAR(255) NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- SEED DATA
-- ============================================================

-- Initial Admin (Password is: Admin@Elan2026 - change upon initial setup)
-- Hash generated using password_hash('Admin@Elan2026', PASSWORD_BCRYPT)
INSERT INTO admins (name, email, password_hash, role, status) VALUES
('Principal Administrator', 'admin@elanjewels.com', '$2y$10$w09Z5u16M8Y5Lp7lHk8n2.x8W9i7J6G3E1q2F0aB4cD5e6f7g8h9i', 'super_admin', 'active');

-- Categories
INSERT INTO categories (name, slug, description, image_url, display_order) VALUES
('Necklaces', 'necklaces', 'Artisanal pendants and diamond statement necklaces.', 'categories/necklaces.jpg', 1),
('Earrings', 'earrings', 'Radiant studs, chandelier drops, and diamond hoops.', 'categories/earrings.jpg', 2),
('Rings', 'rings', 'Solitaire diamond and bespoke precious stone bands.', 'categories/rings.jpg', 3),
('Bracelets', 'bracelets', 'Timeless diamond tennis bracelets and delicate cuffs.', 'categories/bracelets.jpg', 4);

-- Products (with exact demo items requested)
INSERT INTO products (category_id, name, slug, sku, short_description, description, price, sale_price, stock_quantity, low_stock_threshold, material, weight, main_image, is_featured, is_bestseller, is_new_arrival, status) VALUES
(1, 'Aurora Diamond Necklace', 'aurora-diamond-necklace', 'ELN-NK-001', 'An ethereal yellow sapphire pendant crowned by a brilliant halo of micro-pavé diamonds.', 'Handcrafted in 18K white and yellow gold, the Aurora Pendant captures radiant golden hour illumination. Features a certified cushion-cut 2.4ct natural yellow sapphire encased in a dual brilliant diamond halo.', 18900.00, 16900.00, 12, 3, '18K White & Yellow Gold', '4.6g', 'products/hero_diamond_pendant.jpg', 1, 1, 1, 'active'),
(2, 'Celeste Drop Earrings', 'celeste-drop-earrings', 'ELN-ER-002', 'Pear-cut royal sapphires suspended from diamond leaves and pavé hoops.', 'Designed for unforgettable galas and milestones, Celeste brings high-jewelry theatre to your collection. Features twin 1.8ct deep blue natural sapphires accented with marquise diamonds.', 7500.00, 6800.00, 8, 2, '18K Platinum & Sapphire', '3.4g', 'products/sapphire_drop_earrings.jpg', 1, 0, 1, 'active'),
(3, 'Serena Gold Ring', 'serena-gold-ring', 'ELN-RG-003', 'A magnificent solitaire brilliant diamond set in solid polished 18K yellow gold.', 'Timeless minimalism elevated. The Serena Ring showcases a flawless six-prong round cut diamond that catches every ray of ambient light with breathtaking brilliance.', 9800.00, 8900.00, 15, 4, '18K Solid Yellow Gold', '3.2g', 'products/gold_diamond_ring.jpg', 1, 1, 1, 'active'),
(4, 'Luna Pearl Bracelet', 'luna-pearl-bracelet', 'ELN-BR-004', 'Lustrous Japanese Akoya pearls interspersed with faceted diamond roundels.', 'Graceful and timeless. The Luna Pearl Bracelet rests comfortably on the wrist, fastened with an intricate filigree gold safety clasp.', 6200.00, 5600.00, 20, 5, '18K Yellow Gold & Akoya Pearls', '5.1g', 'products/luna_pearl_bracelet.jpg', 1, 0, 1, 'active'),
(5, 'Aurelia Statement Ring', 'aurelia-statement-ring', 'ELN-RG-005', 'Sculptural multi-band ring sparkling with hand-set baguette and pavé diamonds.', 'An architectural triumph of modern luxury. Aurelia combines geometric lines with organic fluid gold curves.', 12500.00, 11200.00, 6, 2, '18K Rose & White Gold', '5.8g', 'products/aurelia_statement_ring.jpg', 0, 1, 1, 'active'),
(6, 'Mira Gold Hoops', 'mira-gold-hoops', 'ELN-ER-006', 'Substantial fluted gold hoops sculpted with internal diamond accents.', 'Everyday grandeur redefined. Lightweight hollow construction for all-day elegance without pulling on the earlobes.', 5900.00, 5200.00, 14, 3, '18K Italian Yellow Gold', '2.8g', 'products/mira_gold_hoops.jpg', 0, 1, 1, 'active'),
(7, 'Noor Tennis Bracelet', 'noor-tennis-bracelet', 'ELN-BR-007', 'A seamless continuous river of four-prong brilliant cut lab diamonds.', 'Total carat weight of 3.5 carats in DEF color and VVS clarity. Features double-locking luxury clasp.', 15900.00, 14500.00, 9, 3, '18K White Gold', '6.2g', 'products/noor_tennis_bracelet.jpg', 1, 1, 0, 'active'),
(8, 'Elara Pendant', 'elara-pendant', 'ELN-NK-008', 'Delicate celestial pendant with a floating diamond constellation motif.', 'Perfect for layering or quiet standalone charm. Comes with an adjustable 16-18 inch delicate diamond-cut cable chain.', 8400.00, 7500.00, 18, 4, '18K Yellow Gold', '2.5g', 'products/elara_pendant.jpg', 1, 0, 0, 'active');

-- Coupons
INSERT INTO coupons (code, discount_type, discount_value, min_order_amount, start_date, end_date, status) VALUES
('ELAN20', 'percentage', 20.00, 5000.00, '2026-01-01', '2027-12-31', 'active'),
('WELCOME10', 'percentage', 10.00, 2000.00, '2026-01-01', '2027-12-31', 'active'),
('LUXURY1000', 'fixed', 1000.00, 10000.00, '2026-01-01', '2027-12-31', 'active');

-- Settings
INSERT INTO settings (setting_key, setting_value, description) VALUES
('site_name', 'ÉLAN JEWELS', 'Brand Name'),
('site_tagline', 'Jewelry Made to Be Remembered', 'Brand Tagline'),
('currency_symbol', '₹', 'Currency Symbol'),
('currency_code', 'INR', 'Currency Code'),
('contact_email', 'concierge@elanjewels.com', 'Store Contact Email'),
('contact_phone', '+91 98765 43210', 'Customer Care Phone'),
('contact_address', '12 Heritage Boulevard, Bandra West, Mumbai 400050, India', 'Boutique Address'),
('free_shipping_threshold', '5000', 'Free delivery on orders above'),
('standard_shipping_fee', '250', 'Shipping charge for orders below threshold'),
('tax_rate_percent', '3', 'GST Rate for Fine Jewelry (%)'),
('razorpay_key_id', '', 'Razorpay API Key ID (leave empty for test/COD)'),
('razorpay_key_secret', '', 'Razorpay Secret Key'),
('smtp_host', 'mail.elanjewels.com', 'SMTP Server Host'),
('smtp_port', '587', 'SMTP Port'),
('smtp_user', '', 'SMTP Username'),
('smtp_pass', '', 'SMTP Password');

-- Homepage Sections Management
INSERT INTO homepage_sections (section_key, title, subtitle, is_enabled, sort_order) VALUES
('hero', 'Hero Banner', 'Editorial opening showcase', 1, 1),
('benefits', 'Value Proposition Bar', 'Free shipping, returns, warranty', 1, 2),
('collections', 'Curated For You', 'Explore collections designed for every expression', 1, 3),
('new_arrivals', 'New Arrivals', 'Fresh designs. Timeless feeling.', 1, 4),
('editorial_banner', 'Craftsmanship Feature', 'Timeless pieces crafted with passion', 1, 5),
('bestsellers', 'Iconic Bestsellers', 'Most-coveted heirloom designs', 1, 6),
('brand_story', 'The Élan Legacy', 'Our artisanal heritage', 1, 7),
('testimonials', 'Voices of Splendor', 'Cherished clients reviews', 1, 8),
('newsletter', 'The Élan Privé Newsletter', 'Sign up and enjoy 20% off', 1, 9);
