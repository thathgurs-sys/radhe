import React, { useState } from 'react';
import { Server, Database, FileCode, Check, Copy, Download, FolderTree, Shield, Terminal } from 'lucide-react';

export const AdminCpanelExport: React.FC = () => {
  const [activeFile, setActiveFile] = useState<'sql' | 'config' | 'htaccess' | 'cloudflare' | 'readme'>('cloudflare');
  const [copied, setCopied] = useState(false);

  const cloudflareSample = `# ⚡ 100% Free Hosting on Cloudflare Pages (No Credit Card / No Billing)

### Option A: Deploy via GitHub (Recommended - 2 Minutes)
1. Push this project to your GitHub repository.
2. Go to https://dash.cloudflare.com/ -> Click 'Workers & Pages' -> 'Create Application' -> 'Pages' -> 'Connect to Git'.
3. Select your repository.
4. Set Build Settings:
   - Framework preset: Vite
   - Build command: npm run build
   - Build output directory: dist
5. Click 'Save and Deploy'.
   Your website is instantly live on https://elan-jewels.pages.dev with free custom domain & free SSL!

### Option B: Deploy via Cloudflare Direct Upload / CLI (Wrangler)
1. Run: npm run build
2. Run: npx wrangler pages deploy dist --project-name elan-jewels
3. Done! Instant global CDN deployment on Cloudflare Edge.

### Included Cloudflare Optimizations:
- public/_redirects -> Handles client-side React SPA routing (/* /index.html 200)
- public/_headers -> Security headers (X-Frame-Options, CSP, X-Content-Type-Options)
- functions/api/health.ts -> Cloudflare Workers serverless API endpoint
- functions/api/newsletter.ts -> Cloudflare Workers serverless subscription handler
- Zero Google Cloud billing or paid subscriptions required!`;

  const sqlSample = `-- ============================================================
-- ÉLAN JEWELS - Production Database Schema & Seed Data
-- MySQL 8.0+ / MariaDB 10.4+ (Shared Hosting cPanel)
-- Engine: InnoDB | Charset: utf8mb4 | Collation: utf8mb4_unicode_ci
-- ============================================================

CREATE TABLE admins (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(191) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('super_admin', 'manager') DEFAULT 'super_admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE categories (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(120) NOT NULL UNIQUE,
    image_url VARCHAR(255) NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE products (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    category_id INT UNSIGNED NOT NULL,
    name VARCHAR(200) NOT NULL,
    slug VARCHAR(220) NOT NULL UNIQUE,
    sku VARCHAR(50) NOT NULL UNIQUE,
    price DECIMAL(10,2) NOT NULL,
    sale_price DECIMAL(10,2) NULL,
    stock_quantity INT NOT NULL DEFAULT 10,
    material VARCHAR(100) DEFAULT '18K Yellow Gold',
    weight VARCHAR(50) DEFAULT '3.8g',
    main_image VARCHAR(255) NOT NULL,
    is_featured TINYINT(1) DEFAULT 0,
    is_bestseller TINYINT(1) DEFAULT 0,
    status ENUM('active', 'inactive') DEFAULT 'active',
    FOREIGN KEY (category_id) REFERENCES categories(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE orders (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    order_number VARCHAR(60) NOT NULL UNIQUE,
    customer_name VARCHAR(150) NOT NULL,
    customer_email VARCHAR(191) NOT NULL,
    customer_phone VARCHAR(30) NOT NULL,
    shipping_address TEXT NOT NULL,
    grand_total DECIMAL(10,2) NOT NULL,
    payment_method ENUM('cod', 'razorpay') DEFAULT 'cod',
    order_status ENUM('pending', 'confirmed', 'processing', 'shipped', 'delivered') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Full schema with all 15 tables and demo data available in database/database.sql`;

  const configSample = `<?php
/**
 * ÉLAN JEWELS - Global Configuration File
 * Upload to: public_html/config/config.php
 */

define('DB_HOST', 'localhost');
define('DB_NAME', 'yourcpanel_elanjewels');
define('DB_USER', 'yourcpanel_elanuser');
define('DB_PASS', 'YourSecurePassword2026!');
define('DB_CHARSET', 'utf8mb4');

define('SITE_NAME', 'ÉLAN JEWELS');
define('SITE_TAGLINE', 'Jewelry Made to Be Remembered');
define('CURRENCY_SYMBOL', '₹');
define('FREE_SHIPPING_THRESHOLD', 5000);
define('STANDARD_SHIPPING_FEE', 250);

date_default_timezone_set('Asia/Kolkata');
?>`;

  const htaccessSample = `# Apache .htaccess for Shared Hosting (cPanel / Apache 2.4+)
Options -Indexes
Options +FollowSymLinks

# Deny direct browser access to sensitive files
<FilesMatch "(\.(env|sql|json|lock|git.*|md)|config\.php)$">
    Require all denied
</FilesMatch>

# Security Headers
<IfModule mod_headers.c>
    Header set X-Content-Type-Options "nosniff"
    Header set X-Frame-Options "SAMEORIGIN"
    Header set X-XSS-Protection "1; mode=block"
    Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# Block PHP execution inside uploads folder
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteRule ^uploads/.*\.php$ - [F,L,NC]
</IfModule>`;

  const readmeSample = `# 🚀 5-Minute cPanel Shared Hosting Deployment Guide

1. Log into your cPanel account.
2. In 'MySQL® Databases', create database 'yourcpanel_elanjewels' and user with full privileges.
3. Open phpMyAdmin, select your database, and import 'database/database.sql'.
4. Upload all files to 'public_html/' via cPanel File Manager or FTP.
5. Edit 'config/config.php' with your database username & password.
6. Admin URL: https://yourdomain.com/admin/
   Admin Email: admin@elanjewels.com
   Admin Password: Admin@Elan2026 (change immediately upon login)
7. Ready! No Node.js, VPS, Docker, or Composer needed.`;

  const getActiveContent = () => {
    switch (activeFile) {
      case 'cloudflare': return cloudflareSample;
      case 'sql': return sqlSample;
      case 'config': return configSample;
      case 'htaccess': return htaccessSample;
      case 'readme': return readmeSample;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getActiveContent());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const filename = activeFile === 'cloudflare'
      ? 'CLOUDFLARE_PAGES_DEPLOY.md'
      : activeFile === 'sql'
      ? 'database.sql'
      : activeFile === 'config'
      ? 'config.php'
      : activeFile === 'htaccess'
      ? '.htaccess'
      : 'README.md';

    const blob = new Blob([getActiveContent()], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 font-sans text-stone-200">
      <div className="pb-4 border-b border-[#2C2C2C]">
        <div className="flex items-center gap-2 mb-1">
          <Server className="w-6 h-6 text-[#B89B5E]" />
          <h2 className="font-serif text-2xl text-white">cPanel & Shared Hosting Deployment Center</h2>
        </div>
        <p className="text-xs text-stone-400">
          Pure PHP 8.2+ / MySQL 8.0 architecture. 100% uploadable to standard Apache <code className="text-[#B89B5E]">public_html/</code> with zero Node.js or terminal required.
        </p>
      </div>

      {/* 3 Step Deployment Checklist */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#1C1C1C] border border-[#2D2D2D] p-4 text-xs">
          <div className="flex items-center gap-2 text-[#B89B5E] font-semibold mb-1">
            <span className="w-5 h-5 rounded-full bg-[#2A2A2A] flex items-center justify-center text-[10px]">1</span>
            <span>Import Database</span>
          </div>
          <p className="text-stone-400">
            Import <code className="text-stone-200">database/database.sql</code> into your cPanel phpMyAdmin database.
          </p>
        </div>
        <div className="bg-[#1C1C1C] border border-[#2D2D2D] p-4 text-xs">
          <div className="flex items-center gap-2 text-[#B89B5E] font-semibold mb-1">
            <span className="w-5 h-5 rounded-full bg-[#2A2A2A] flex items-center justify-center text-[10px]">2</span>
            <span>Upload to public_html</span>
          </div>
          <p className="text-stone-400">
            Upload the PHP files, includes, admin, and .htaccess to your web root.
          </p>
        </div>
        <div className="bg-[#1C1C1C] border border-[#2D2D2D] p-4 text-xs">
          <div className="flex items-center gap-2 text-[#B89B5E] font-semibold mb-1">
            <span className="w-5 h-5 rounded-full bg-[#2A2A2A] flex items-center justify-center text-[10px]">3</span>
            <span>Set DB Credentials</span>
          </div>
          <p className="text-stone-400">
            Update DB_USER and DB_PASS in <code className="text-stone-200">config/config.php</code> via cPanel File Manager.
          </p>
        </div>
      </div>

      {/* Code Inspector Tabs */}
      <div className="bg-[#1C1C1C] border border-[#2D2D2D]">
        <div className="flex flex-wrap items-center justify-between p-3 border-b border-[#2D2D2D] bg-[#171717] gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveFile('cloudflare')}
              className={`px-3 py-1.5 text-xs font-mono transition-colors cursor-pointer ${
                activeFile === 'cloudflare' ? 'bg-[#2A2A2A] text-[#B89B5E] border-b-2 border-[#B89B5E]' : 'text-stone-400 hover:text-white'
              }`}
            >
              Cloudflare Pages (Free)
            </button>
            <button
              onClick={() => setActiveFile('sql')}
              className={`px-3 py-1.5 text-xs font-mono transition-colors cursor-pointer ${
                activeFile === 'sql' ? 'bg-[#2A2A2A] text-[#B89B5E] border-b-2 border-[#B89B5E]' : 'text-stone-400 hover:text-white'
              }`}
            >
              database/database.sql
            </button>
            <button
              onClick={() => setActiveFile('config')}
              className={`px-3 py-1.5 text-xs font-mono transition-colors cursor-pointer ${
                activeFile === 'config' ? 'bg-[#2A2A2A] text-[#B89B5E] border-b-2 border-[#B89B5E]' : 'text-stone-400 hover:text-white'
              }`}
            >
              config/config.php
            </button>
            <button
              onClick={() => setActiveFile('htaccess')}
              className={`px-3 py-1.5 text-xs font-mono transition-colors cursor-pointer ${
                activeFile === 'htaccess' ? 'bg-[#2A2A2A] text-[#B89B5E] border-b-2 border-[#B89B5E]' : 'text-stone-400 hover:text-white'
              }`}
            >
              .htaccess
            </button>
            <button
              onClick={() => setActiveFile('readme')}
              className={`px-3 py-1.5 text-xs font-mono transition-colors cursor-pointer ${
                activeFile === 'readme' ? 'bg-[#2A2A2A] text-[#B89B5E] border-b-2 border-[#B89B5E]' : 'text-stone-400 hover:text-white'
              }`}
            >
              README.md
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1 bg-[#262626] hover:bg-[#333333] text-stone-300 text-xs flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Code'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="px-3 py-1 bg-[#B89B5E] hover:bg-[#D8C59B] text-[#111111] text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download File</span>
            </button>
          </div>
        </div>

        {/* Code Content */}
        <pre className="p-4 text-xs font-mono text-stone-300 overflow-x-auto bg-[#141414] max-h-96 leading-relaxed selection:bg-[#B89B5E]/30">
          {getActiveContent()}
        </pre>
      </div>

    </div>
  );
};
