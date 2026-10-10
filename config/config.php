<?php
/**
 * ÉLAN JEWELS - Global Configuration File
 * Shared Hosting Ready (cPanel / Apache / PHP 8.2+)
 */

// Prevent direct script access
if (!defined('ELAN_APP')) {
    define('ELAN_APP', true);
}

// Session configuration (Secure session parameters)
if (session_status() === PHP_SESSION_NONE) {
    ini_set('session.cookie_httponly', 1);
    ini_set('session.use_only_cookies', 1);
    if (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') {
        ini_set('session.cookie_secure', 1);
    }
    session_start();
}

// Database Credentials (Update these with your cPanel MySQL details)
define('DB_HOST', 'localhost');
define('DB_NAME', 'elanjewels_db');
define('DB_USER', 'elanjewels_user');
define('DB_PASS', 'YourSecurePassword2026!');
define('DB_CHARSET', 'utf8mb4');

// Site URL & Brand
define('SITE_NAME', 'ÉLAN JEWELS');
define('SITE_TAGLINE', 'Jewelry Made to Be Remembered');
define('SITE_URL', 'http://' . ($_SERVER['HTTP_HOST'] ?? 'localhost'));
define('CURRENCY_SYMBOL', '₹');
define('CURRENCY_CODE', 'INR');
define('FREE_SHIPPING_THRESHOLD', 5000);
define('STANDARD_SHIPPING_FEE', 250);

// Security & Environment
define('APP_ENV', 'production'); // 'development' or 'production'
if (APP_ENV === 'development') {
    ini_set('display_errors', 1);
    error_reporting(E_ALL);
} else {
    ini_set('display_errors', 0);
    error_reporting(0);
}

// Timezone
date_default_timezone_set('Asia/Kolkata');
