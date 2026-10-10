<?php
define('ELAN_APP', true);
require_once __DIR__ . '/config/config.php';
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/includes/functions.php';

try {
    $db = Database::getConnection();
    $featuredProducts = getProducts($db, ['is_featured' => 1], 8);
    $categories = getCategories($db);
} catch (Exception $e) {
    // Graceful fallback for initial upload before database is imported
    $featuredProducts = [];
    $categories = [];
}

$pageTitle = 'ÉLAN JEWELS — Jewelry Made to Be Remembered';
require_once __DIR__ . '/includes/header.php';
?>

<div class="container" style="padding-top: 4rem; padding-bottom: 4rem;">
    <!-- Hero Section -->
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center; margin-bottom: 5rem;">
        <div>
            <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.28em; color: #B89B5E; font-weight: 600; display: block; margin-bottom: 1rem;">
                The Art of Elegance
            </span>
            <h1 style="font-size: 3.5rem; line-height: 1.1; margin-bottom: 1.5rem; color: #111111;">
                Jewelry That<br><em>Tells Your Story.</em>
            </h1>
            <p style="color: #77716A; font-size: 15px; margin-bottom: 2rem; max-width: 480px;">
                Discover timeless pieces designed to celebrate every moment, from quiet beginnings to unforgettable occasions. Handcrafted with ethically sourced gemstones and certified hallmarked gold.
            </p>
            <div style="display: flex; gap: 1rem;">
                <a href="/shop.php" style="background: #111111; color: #FFF; padding: 0.9rem 2rem; text-transform: uppercase; font-size: 11px; letter-spacing: 0.2em; font-weight: 500;">
                    Shop Collection →
                </a>
                <a href="/shop.php?category=necklaces" style="border: 1px solid #111111; color: #111111; padding: 0.9rem 2rem; text-transform: uppercase; font-size: 11px; letter-spacing: 0.2em; font-weight: 500;">
                    New Arrivals
                </a>
            </div>
        </div>
        <div style="background: #FFF; border: 1px solid #E8E1D7; padding: 1.5rem; box-shadow: 0 10px 30px rgba(0,0,0,0.04);">
            <div style="aspect-ratio: 4/3; background: #FAF8F4; overflow: hidden; display: flex; align-items: center; justify-content: center;">
                <div style="text-align: center; padding: 2rem;">
                    <span style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 2rem; color: #111111; display: block;">Aurora Diamond Necklace</span>
                    <span style="color: #B89B5E; font-size: 14px; font-weight: 600; display: block; margin-top: 0.5rem;">₹16,900</span>
                    <span style="color: #77716A; font-size: 12px; display: block; margin-top: 0.5rem;">Cushion-cut certified natural yellow sapphire framed in brilliant micro-pavé diamonds</span>
                </div>
            </div>
        </div>
    </div>

    <!-- Benefits Bar -->
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; background: #FFF; border: 1px solid #E8E1D7; padding: 2rem; margin-bottom: 5rem; text-align: center;">
        <div>
            <h4 style="text-transform: uppercase; font-size: 11px; letter-spacing: 0.15em; margin-bottom: 0.3rem;">Free Shipping</h4>
            <p style="font-size: 11px; color: #77716A;">Complimentary delivery over ₹5,000</p>
        </div>
        <div>
            <h4 style="text-transform: uppercase; font-size: 11px; letter-spacing: 0.15em; margin-bottom: 0.3rem;">Secure Payments</h4>
            <p style="font-size: 11px; color: #77716A;">Safe and encrypted checkout</p>
        </div>
        <div>
            <h4 style="text-transform: uppercase; font-size: 11px; letter-spacing: 0.15em; margin-bottom: 0.3rem;">Easy Returns</h4>
            <p style="font-size: 11px; color: #77716A;">7-day privilege exchange</p>
        </div>
        <div>
            <h4 style="text-transform: uppercase; font-size: 11px; letter-spacing: 0.15em; margin-bottom: 0.3rem;">Crafted With Care</h4>
            <p style="font-size: 11px; color: #77716A;">100% BIS Hallmarked Pure Gold</p>
        </div>
    </div>

    <!-- Featured Products Grid -->
    <div style="text-align: center; margin-bottom: 3rem;">
        <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.28em; color: #B89B5E; font-weight: 600;">Curated For You</span>
        <h2 style="font-size: 2.8rem; color: #111111; margin-top: 0.5rem;">New Arrivals & Iconic Creations</h2>
    </div>

    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; margin-bottom: 4rem;">
        <?php foreach ($featuredProducts as $product): ?>
            <div style="background: #FFF; border: 1px solid #E8E1D7; padding: 1.25rem; display: flex; flex-col; justify-content: space-between;">
                <div>
                    <span style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.18em; color: #B89B5E; display: block; margin-bottom: 0.3rem;">
                        <?= Security::e($product['category_name']) ?>
                    </span>
                    <h3 style="font-size: 1.25rem; color: #111111; margin-bottom: 0.5rem;">
                        <a href="/product.php?slug=<?= urlencode($product['slug']) ?>"><?= Security::e($product['name']) ?></a>
                    </h3>
                    <p style="font-size: 11px; color: #77716A; margin-bottom: 1rem;"><?= Security::e($product['material']) ?></p>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: baseline; border-top: 1px solid #E8E1D7; padding-top: 0.75rem;">
                    <span style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 1.25rem; font-weight: 600;">
                        <?= formatPrice($product['sale_price'] ?? $product['price']) ?>
                    </span>
                    <a href="/product.php?slug=<?= urlencode($product['slug']) ?>" style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.15em; color: #111111; font-weight: 600;">
                        View Piece →
                    </a>
                </div>
            </div>
        <?php endforeach; ?>
    </div>
</div>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
