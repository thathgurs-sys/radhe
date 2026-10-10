# ÉLAN JEWELS — Production Shared Hosting & cPanel Deployment Guide

> **"Jewelry Made to Be Remembered"**  
> Luxury Fine Jewelry E-Commerce Platform engineered specifically for shared hosting (cPanel, Apache, PHP 8.2+, MySQL 8 / MariaDB).

---

## 1. System Requirements

- **Web Server:** Apache with `mod_rewrite` & `mod_headers` enabled (Default in all cPanel accounts)
- **PHP Version:** PHP 8.2 or newer (PHP 8.2 / 8.3 recommended)
- **PHP Extensions:** `pdo_mysql`, `mbstring`, `openssl`, `json`, `gd` or `imagick`
- **Database:** MySQL 8.0+ or MariaDB 10.4+ (InnoDB engine with utf8mb4)
- **SSL Certificate:** Free Let's Encrypt / AutoSSL via cPanel
- **No Node.js, VPS, Docker, or Composer required on the server.**

---

## 2. Directory Structure

```text
public_html/
│
├── index.php                  # Luxury responsive homepage
├── shop.php                   # Product catalog with filter, search & sort
├── product.php                # High-conversion product detail page
├── cart.php                   # Full shopping bag page with coupon calculation
├── checkout.php               # Secure checkout (COD + Razorpay ready)
├── login.php                  # Customer login with password_verify()
├── register.php               # Customer registration with password_hash()
├── account.php                # Customer profile & saved addresses
├── orders.php                 # Customer order history & item tracker
├── wishlist.php               # Customer & guest wishlist
├── contact.php                # Boutique contact & concierge inquiry
│
├── config/
│   ├── config.php             # Database credentials & site constants
│   └── database.php           # PDO connection with prepared statements
│
├── includes/
│   ├── header.php             # Sticky luxury navigation & metadata
│   ├── footer.php             # Editorial footer with guarantees & newsletter
│   ├── navbar.php             # Navigation bar component
│   ├── auth.php               # Authentication & session verification
│   ├── functions.php          # Core catalog & order utility functions
│   ├── cart-functions.php     # Shopping bag calculation & coupon engine
│   └── security.php           # CSRF protection & input/output sanitization
│
├── admin/
│   ├── index.php              # Admin entry & dashboard router
│   ├── login.php              # Secure admin login
│   ├── logout.php             # Session termination
│   ├── dashboard.php          # KPI cards, sales charts, low stock alerts
│   ├── products.php           # Product list & quick status toggles
│   ├── product-add.php        # Create product with image upload
│   ├── product-edit.php       # Update product details & pricing
│   ├── categories.php         # Manage collections & categories
│   ├── orders.php             # Order management & status workflow
│   ├── order-view.php         # Printable invoice & customer details
│   ├── customers.php          # Customer list & order volume
│   ├── coupons.php            # Promotional discount engine
│   ├── banners.php            # Homepage hero & promotional banners
│   ├── homepage.php           # Enable/disable & reorder homepage sections
│   ├── reviews.php            # Moderate customer ratings
│   ├── newsletter.php         # Subscriber export & management
│   ├── settings.php           # Store details, currency, tax & threshold
│   ├── reports.php            # Sales analytics & CSV export
│   └── profile.php            # Change admin password & security settings
│
├── api/
│   ├── cart.php               # AJAX cart endpoints (add, update, remove)
│   ├── wishlist.php           # AJAX wishlist endpoints
│   ├── search.php             # Live search suggestion endpoint
│   ├── checkout.php           # Order submission endpoint
│   └── newsletter.php         # Newsletter subscribe endpoint
│
├── database/
│   └── database.sql           # Complete schema, indexes & demo jewelry seed
│
├── uploads/                   # Writable directory for user/admin uploads
│   ├── products/
│   ├── banners/
│   └── categories/
│
├── .htaccess                  # Apache security rules & protection
└── README.md                  # This file
```

---

## 3. Database Setup (cPanel phpMyAdmin)

1. Log into your **cPanel** dashboard.
2. In the **Databases** section, click **MySQL® Databases**.
3. Create a new database: e.g. `yourcpanel_elanjewels`.
4. Create a new MySQL user: e.g. `yourcpanel_elanuser` with a strong password.
5. In **Add User To Database**, select both, click **Add**, and check **ALL PRIVILEGES**.
6. Open **phpMyAdmin** from cPanel.
7. Select your new database on the left.
8. Click the **Import** tab at the top.
9. Choose `database/database.sql` from your computer and click **Go**.
10. All 15 relational tables with demo categories and products are instantly created.

---

## 4. Configuration

Open `config/config.php` using the cPanel File Manager Code Editor:

```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'yourcpanel_elanjewels');
define('DB_USER', 'yourcpanel_elanuser');
define('DB_PASS', 'YourStrongPasswordHere');
```

---

## 5. First Admin Account

The database includes an initial administrator:
- **Admin Email:** `admin@elanjewels.com`
- **Initial Password:** `Admin@Elan2026`
- **Admin Panel URL:** `https://yourdomain.com/admin/`

> **Security Requirement:** Immediately after your first login, visit **Admin Profile** (`/admin/profile.php`) and change your password to a private high-entropy password.

---

## 6. How to Connect Razorpay Payment Gateway

1. Log in to your Razorpay Dashboard (`https://dashboard.razorpay.com`).
2. Go to **Settings** → **API Keys** and generate **Key Id** and **Key Secret**.
3. In the ÉLAN JEWELS Admin Panel, go to **Settings** → **Payment Gateway**.
4. Enter your **Razorpay Key ID** and **Key Secret**.
5. Save settings. Cash on Delivery is enabled by default.

---

## 7. How to Connect SMTP for Emails

1. In cPanel, go to **Email Accounts** and create `concierge@yourdomain.com`.
2. In the Admin Panel, go to **Settings** → **Email / SMTP Configuration**.
3. Provide:
   - SMTP Host: `mail.yourdomain.com`
   - Port: `587` (TLS) or `465` (SSL)
   - Username: `concierge@yourdomain.com`
   - Password: Your email account password.

---

## 8. Backup Instructions

- **Database:** In cPanel phpMyAdmin, click **Export** → **Quick** → **SQL**.
- **Files:** In cPanel File Manager, compress `public_html` into a `.zip` archive and download.
