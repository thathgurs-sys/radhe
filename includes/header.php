<?php
if (!defined('ELAN_APP')) {
    require_once __DIR__ . '/../config/config.php';
}
require_once __DIR__ . '/security.php';
require_once __DIR__ . '/functions.php';
require_once __DIR__ . '/cart-functions.php';
require_once __DIR__ . '/auth.php';

Security::setSecurityHeaders();
$csrfToken = Security::generateCsrfToken();
$cartItems = getCartItems($db ?? Database::getConnection());
$cartTotals = getCartTotals($cartItems);
$pageTitle = $pageTitle ?? (SITE_NAME . ' — ' . SITE_TAGLINE);
$metaDesc = $metaDesc ?? 'High-end luxury jewelry e-commerce platform featuring handcrafted necklaces, rings, earrings, and bracelets.';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= Security::e($pageTitle) ?></title>
    <meta name="description" content="<?= Security::e($metaDesc) ?>">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --color-primary: #111111;
            --color-bg: #FAF8F4;
            --color-white: #FFFFFF;
            --color-gold: #B89B5E;
            --color-gold-light: #D8C59B;
            --color-dark: #171717;
            --color-muted: #77716A;
            --color-border: #E8E1D7;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; background: var(--color-bg); color: var(--color-dark); line-height: 1.6; }
        h1, h2, h3, h4, .font-serif { font-family: 'Cormorant Garamond', Georgia, serif; }
        .tabular-nums { font-variant-numeric: tabular-nums; }
        .container { max-width: 1280px; margin: 0 auto; padding: 0 1.5rem; }
        a { text-decoration: none; color: inherit; }
    </style>
</head>
<body>
<?php require_once __DIR__ . '/navbar.php'; ?>
