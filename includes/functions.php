<?php
/**
 * ÉLAN JEWELS - Core Utility Functions
 */

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/security.php';

function formatPrice($amount): string {
    return CURRENCY_SYMBOL . number_format((float)$amount, 2);
}

function getSettings(PDO $db): array {
    $stmt = $db->query("SELECT setting_key, setting_value FROM settings");
    $settings = [];
    while ($row = $stmt->fetch()) {
        $settings[$row['setting_key']] = $row['setting_value'];
    }
    return $settings;
}

function getCategories(PDO $db, bool $onlyActive = true): array {
    $sql = "SELECT * FROM categories " . ($onlyActive ? "WHERE status = 'active'" : "") . " ORDER BY display_order ASC, name ASC";
    return $db->query($sql)->fetchAll();
}

function getProducts(PDO $db, array $filter = [], int $limit = 20, int $offset = 0): array {
    $where = ["p.status = 'active'"];
    $params = [];

    if (!empty($filter['category_id'])) {
        $where[] = "p.category_id = :category_id";
        $params[':category_id'] = $filter['category_id'];
    }
    if (!empty($filter['is_featured'])) {
        $where[] = "p.is_featured = 1";
    }
    if (!empty($filter['is_bestseller'])) {
        $where[] = "p.is_bestseller = 1";
    }
    if (!empty($filter['is_new_arrival'])) {
        $where[] = "p.is_new_arrival = 1";
    }
    if (!empty($filter['search'])) {
        $where[] = "(p.name LIKE :search OR p.sku LIKE :search OR p.description LIKE :search)";
        $params[':search'] = '%' . $filter['search'] . '%';
    }

    $orderBy = "p.id DESC";
    if (!empty($filter['sort'])) {
        switch ($filter['sort']) {
            case 'price_asc':
                $orderBy = "COALESCE(p.sale_price, p.price) ASC";
                break;
            case 'price_desc':
                $orderBy = "COALESCE(p.sale_price, p.price) DESC";
                break;
            case 'popular':
                $orderBy = "p.is_bestseller DESC, p.id DESC";
                break;
        }
    }

    $whereClause = implode(" AND ", $where);
    $sql = "SELECT p.*, c.name as category_name, c.slug as category_slug 
            FROM products p 
            JOIN categories c ON p.category_id = c.id 
            WHERE $whereClause 
            ORDER BY $orderBy 
            LIMIT $limit OFFSET $offset";

    $stmt = $db->prepare($sql);
    $stmt->execute($params);
    return $stmt->fetchAll();
}

function getProductBySlug(PDO $db, string $slug): ?array {
    $stmt = $db->prepare("SELECT p.*, c.name as category_name, c.slug as category_slug 
                          FROM products p 
                          JOIN categories c ON p.category_id = c.id 
                          WHERE p.slug = :slug LIMIT 1");
    $stmt->execute([':slug' => $slug]);
    $prod = $stmt->fetch();
    return $prod ?: null;
}

function generateOrderNumber(): string {
    return 'ELN-' . date('Y') . '-' . str_pad((string)random_int(1, 999999), 6, '0', STR_PAD_LEFT);
}

function setFlash(string $type, string $message): void {
    $_SESSION['flash'] = [
        'type' => $type, // 'success', 'error', 'info'
        'message' => $message
    ];
}

function getFlash(): ?array {
    if (!empty($_SESSION['flash'])) {
        $flash = $_SESSION['flash'];
        unset($_SESSION['flash']);
        return $flash;
    }
    return null;
}
