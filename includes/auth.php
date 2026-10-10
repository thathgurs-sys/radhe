<?php
/**
 * ÉLAN JEWELS - Authentication & Authorization System
 */

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/security.php';

// Customer Auth
function isCustomerLoggedIn(): bool {
    return !empty($_SESSION['customer_id']);
}

function getLoggedInCustomer(): ?array {
    if (!isCustomerLoggedIn()) {
        return null;
    }
    return [
        'id' => $_SESSION['customer_id'],
        'name' => $_SESSION['customer_name'] ?? 'Client',
        'email' => $_SESSION['customer_email'] ?? ''
    ];
}

function requireCustomerLogin(): void {
    if (!isCustomerLoggedIn()) {
        $_SESSION['redirect_after_login'] = $_SERVER['REQUEST_URI'];
        header("Location: /login.php");
        exit;
    }
}

// Admin Auth
function isAdminLoggedIn(): bool {
    return !empty($_SESSION['admin_id']);
}

function getLoggedInAdmin(): ?array {
    if (!isAdminLoggedIn()) {
        return null;
    }
    return [
        'id' => $_SESSION['admin_id'],
        'name' => $_SESSION['admin_name'] ?? 'Admin',
        'email' => $_SESSION['admin_email'] ?? '',
        'role' => $_SESSION['admin_role'] ?? 'super_admin'
    ];
}

function requireAdminLogin(): void {
    if (!isAdminLoggedIn()) {
        header("Location: /admin/login.php");
        exit;
    }
}
