<?php
/**
 * ÉLAN JEWELS - Cart Management Functions
 */

require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/functions.php';

function initCart(): void {
    if (!isset($_SESSION['cart'])) {
        $_SESSION['cart'] = [];
    }
}

function addToCart(int $productId, int $quantity = 1, ?string $variant = null): void {
    initCart();
    $key = $productId . ($variant ? '_' . md5($variant) : '');
    
    if (isset($_SESSION['cart'][$key])) {
        $_SESSION['cart'][$key]['quantity'] += $quantity;
    } else {
        $_SESSION['cart'][$key] = [
            'product_id' => $productId,
            'quantity' => $quantity,
            'variant' => $variant
        ];
    }
}

function updateCartQuantity(string $cartKey, int $quantity): void {
    initCart();
    if ($quantity <= 0) {
        unset($_SESSION['cart'][$cartKey]);
    } elseif (isset($_SESSION['cart'][$cartKey])) {
        $_SESSION['cart'][$cartKey]['quantity'] = $quantity;
    }
}

function removeFromCart(string $cartKey): void {
    initCart();
    unset($_SESSION['cart'][$cartKey]);
}

function clearCart(): void {
    $_SESSION['cart'] = [];
    unset($_SESSION['applied_coupon']);
}

function getCartItems(PDO $db): array {
    initCart();
    $items = [];
    if (empty($_SESSION['cart'])) {
        return $items;
    }

    $productIds = array_unique(array_column($_SESSION['cart'], 'product_id'));
    if (empty($productIds)) {
        return $items;
    }

    $inQuery = implode(',', array_fill(0, count($productIds), '?'));
    $stmt = $db->prepare("SELECT id, name, slug, sku, price, sale_price, main_image, stock_quantity FROM products WHERE id IN ($inQuery)");
    $stmt->execute(array_values($productIds));
    $products = [];
    while ($row = $stmt->fetch()) {
        $products[$row['id']] = $row;
    }

    foreach ($_SESSION['cart'] as $key => $cartItem) {
        $pId = $cartItem['product_id'];
        if (isset($products[$pId])) {
            $p = $products[$pId];
            $unitPrice = $p['sale_price'] ? (float)$p['sale_price'] : (float)$p['price'];
            $totalPrice = $unitPrice * $cartItem['quantity'];

            $items[] = [
                'cart_key' => $key,
                'product_id' => $pId,
                'name' => $p['name'],
                'slug' => $p['slug'],
                'sku' => $p['sku'],
                'main_image' => $p['main_image'],
                'variant' => $cartItem['variant'],
                'unit_price' => $unitPrice,
                'quantity' => $cartItem['quantity'],
                'total_price' => $totalPrice,
                'stock' => (int)$p['stock_quantity']
            ];
        }
    }
    return $items;
}

function getCartTotals(array $cartItems): array {
    $subtotal = 0.00;
    $itemCount = 0;

    foreach ($cartItems as $item) {
        $subtotal += $item['total_price'];
        $itemCount += $item['quantity'];
    }

    $discount = 0.00;
    $couponCode = $_SESSION['applied_coupon']['code'] ?? null;
    if (!empty($_SESSION['applied_coupon'])) {
        $c = $_SESSION['applied_coupon'];
        if ($c['discount_type'] === 'percentage') {
            $discount = ($subtotal * $c['discount_value']) / 100;
            if (!empty($c['max_discount_amount']) && $discount > $c['max_discount_amount']) {
                $discount = (float)$c['max_discount_amount'];
            }
        } else {
            $discount = (float)$c['discount_value'];
        }
        if ($discount > $subtotal) {
            $discount = $subtotal;
        }
    }

    $afterDiscount = max(0, $subtotal - $discount);
    $shipping = ($afterDiscount >= FREE_SHIPPING_THRESHOLD || $afterDiscount == 0) ? 0.00 : STANDARD_SHIPPING_FEE;
    $grandTotal = $afterDiscount + $shipping;

    return [
        'item_count' => $itemCount,
        'subtotal' => $subtotal,
        'discount' => $discount,
        'coupon_code' => $couponCode,
        'shipping' => $shipping,
        'grand_total' => $grandTotal
    ];
}
