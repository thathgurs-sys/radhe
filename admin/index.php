<?php
define('ELAN_APP', true);
require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/security.php';

if (!isAdminLoggedIn()) {
    header("Location: /admin/login.php");
    exit;
}

try {
    $db = Database::getConnection();
    $totalSales = $db->query("SELECT COALESCE(SUM(grand_total), 0) FROM orders")->fetchColumn();
    $totalOrders = $db->query("SELECT COUNT(*) FROM orders")->fetchColumn();
    $totalProducts = $db->query("SELECT COUNT(*) FROM products")->fetchColumn();
    $lowStock = $db->query("SELECT COUNT(*) FROM products WHERE stock_quantity <= low_stock_threshold")->fetchColumn();
    $recentOrders = $db->query("SELECT * FROM orders ORDER BY id DESC LIMIT 5")->fetchAll();
} catch (Exception $e) {
    $totalSales = 0; $totalOrders = 0; $totalProducts = 0; $lowStock = 0; $recentOrders = [];
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>ÉLAN JEWELS — Admin Management Console</title>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Plus Jakarta Sans', sans-serif; background: #141414; color: #E0E0E0; margin: 0; padding: 0; }
        .sidebar { width: 240px; background: #1A1A1A; border-right: 1px solid #282828; height: 100vh; position: fixed; padding: 1.5rem; }
        .content { margin-left: 240px; padding: 2rem; }
        .card { background: #1C1C1C; border: 1px solid #2D2D2D; padding: 1.5rem; margin-bottom: 1.5rem; }
        .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 2rem; }
        a { color: #B89B5E; text-decoration: none; }
    </style>
</head>
<body>
    <div class="sidebar">
        <h2 style="font-family: 'Cormorant Garamond'; color: #FFF; font-size: 1.5rem; margin-bottom: 2rem;">ÉLAN ADMIN</h2>
        <ul style="list-style: none; line-height: 2.2; font-size: 13px;">
            <li><a href="/admin/index.php" style="color: #FFF;">Dashboard</a></li>
            <li><a href="/shop.php" target="_blank">View Live Storefront ↗</a></li>
            <li><a href="/admin/logout.php" style="color: #FF6B6B;">Logout</a></li>
        </ul>
        <div style="position: absolute; bottom: 2rem; font-size: 11px; color: #666;">
            PHP 8.2+ PDO & MySQL 8<br>Shared Hosting Mode
        </div>
    </div>
    <div class="content">
        <h1 style="font-family: 'Cormorant Garamond'; color: #FFF; font-size: 2.2rem; margin-bottom: 1.5rem;">Store Performance & Metrics</h1>
        <div class="grid">
            <div class="card">
                <span style="font-size: 11px; color: #888; text-transform: uppercase;">Total Sales</span>
                <div style="font-size: 1.8rem; font-weight: bold; color: #FFF; margin-top: 0.5rem;">₹<?= number_format((float)$totalSales, 2) ?></div>
            </div>
            <div class="card">
                <span style="font-size: 11px; color: #888; text-transform: uppercase;">Orders</span>
                <div style="font-size: 1.8rem; font-weight: bold; color: #FFF; margin-top: 0.5rem;"><?= $totalOrders ?></div>
            </div>
            <div class="card">
                <span style="font-size: 11px; color: #888; text-transform: uppercase;">Products In Stock</span>
                <div style="font-size: 1.8rem; font-weight: bold; color: #FFF; margin-top: 0.5rem;"><?= $totalProducts ?></div>
            </div>
            <div class="card">
                <span style="font-size: 11px; color: #888; text-transform: uppercase;">Low Stock Warning</span>
                <div style="font-size: 1.8rem; font-weight: bold; color: #E5A93C; margin-top: 0.5rem;"><?= $lowStock ?></div>
            </div>
        </div>
    </div>
</body>
</html>
