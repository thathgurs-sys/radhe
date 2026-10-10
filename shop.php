<?php
define('ELAN_APP', true);
require_once __DIR__ . '/config/config.php';
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/includes/functions.php';

try {
    $db = Database::getConnection();
    $catSlug = $_GET['category'] ?? null;
    $filter = [];
    if ($catSlug) {
        $catStmt = $db->prepare("SELECT id FROM categories WHERE slug = :slug LIMIT 1");
        $catStmt->execute([':slug' => $catSlug]);
        $foundCat = $catStmt->fetch();
        if ($foundCat) $filter['category_id'] = $foundCat['id'];
    }
    if (!empty($_GET['q'])) {
        $filter['search'] = Security::sanitizeString($_GET['q']);
    }
    if (!empty($_GET['sort'])) {
        $filter['sort'] = Security::sanitizeString($_GET['sort']);
    }

    $products = getProducts($db, $filter, 24);
    $categories = getCategories($db);
} catch (Exception $e) {
    $products = [];
    $categories = [];
}

$pageTitle = 'Fine Jewelry Catalog — ÉLAN JEWELS';
require_once __DIR__ . '/includes/header.php';
?>

<div class="container" style="padding-top: 3rem; padding-bottom: 5rem;">
    <div style="text-align: center; margin-bottom: 3rem;">
        <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.28em; color: #B89B5E;">Catalog</span>
        <h1 style="font-size: 3rem; color: #111111; margin-top: 0.5rem;">All Jewelry Pieces</h1>
    </div>

    <div style="display: flex; gap: 0.75rem; justify-content: center; margin-bottom: 3rem; flex-wrap: wrap;">
        <a href="/shop.php" style="padding: 0.5rem 1rem; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; border: 1px solid #111; background: <?= empty($catSlug) ? '#111; color: #FFF;' : '#FFF; color: #111;' ?>">All</a>
        <?php foreach ($categories as $c): ?>
            <a href="/shop.php?category=<?= urlencode($c['slug']) ?>" style="padding: 0.5rem 1rem; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; border: 1px solid #E8E1D7; background: <?= ($catSlug === $c['slug']) ? '#111; color: #FFF;' : '#FFF; color: #111;' ?>">
                <?= Security::e($c['name']) ?>
            </a>
        <?php endforeach; ?>
    </div>

    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem;">
        <?php foreach ($products as $p): ?>
            <div style="background: #FFF; border: 1px solid #E8E1D7; padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                    <span style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.18em; color: #B89B5E; display: block; margin-bottom: 0.3rem;">
                        <?= Security::e($p['category_name']) ?>
                    </span>
                    <h3 style="font-size: 1.2rem; color: #111; margin-bottom: 0.5rem;">
                        <a href="/product.php?slug=<?= urlencode($p['slug']) ?>"><?= Security::e($p['name']) ?></a>
                    </h3>
                    <p style="font-size: 11px; color: #77716A; margin-bottom: 1rem;"><?= Security::e($p['material']) ?></p>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: baseline; border-top: 1px solid #E8E1D7; padding-top: 0.75rem;">
                    <span style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 1.25rem; font-weight: 600;">
                        <?= formatPrice($p['sale_price'] ?? $p['price']) ?>
                    </span>
                    <a href="/product.php?slug=<?= urlencode($p['slug']) ?>" style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.15em; color: #111; font-weight: 600;">
                        View Piece →
                    </a>
                </div>
            </div>
        <?php endforeach; ?>
    </div>
</div>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
