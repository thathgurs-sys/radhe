<?php
$isLoggedIn = isCustomerLoggedIn();
$customer = getLoggedInCustomer();
?>
<div style="background: #111111; color: #E8E1D7; font-size: 11px; text-transform: uppercase; letter-spacing: 0.18em; padding: 0.5rem 1rem;">
    <div style="max-width: 1280px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap;">
        <div><span style="color: #B89B5E;">✦</span> Complimentary Insured Delivery on Orders Over ₹5,000</div>
        <div style="display: flex; gap: 1.25rem;">
            <a href="/admin/" style="color: #B89B5E;">Admin Console</a>
            <span>|</span>
            <span>INR (₹)</span>
        </div>
    </div>
</div>

<header style="background: #FAF8F4; border-bottom: 1px solid #E8E1D7; position: sticky; top: 0; z-index: 40;">
    <div style="max-width: 1280px; margin: 0 auto; padding: 1.2rem 1.5rem; display: flex; justify-content: space-between; align-items: center;">
        <a href="/index.php" style="text-decoration: none;">
            <span style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 1.75rem; letter-spacing: 0.14em; color: #111111; font-weight: 600; display: block;">ÉLAN JEWELS</span>
            <span style="font-size: 9px; text-transform: uppercase; letter-spacing: 0.32em; color: #B89B5E; display: block; margin-top: -3px;">Haute Joaillerie</span>
        </a>

        <nav style="display: flex; gap: 2rem; font-size: 12px; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase;">
            <a href="/index.php" style="color: #111111;">Home</a>
            <a href="/shop.php" style="color: #111111;">Shop All</a>
            <a href="/shop.php?category=necklaces" style="color: #111111;">Necklaces</a>
            <a href="/shop.php?category=earrings" style="color: #111111;">Earrings</a>
            <a href="/shop.php?category=rings" style="color: #111111;">Rings</a>
            <a href="/shop.php?category=bracelets" style="color: #111111;">Bracelets</a>
        </nav>

        <div style="display: flex; align-items: center; gap: 1.25rem; font-size: 12px;">
            <a href="<?= $isLoggedIn ? '/account.php' : '/login.php' ?>" style="color: #171717;">
                <?= $isLoggedIn ? Security::e($customer['name']) : 'Sign In' ?>
            </a>
            <a href="/wishlist.php" style="color: #171717;">Wishlist</a>
            <a href="/cart.php" style="background: #111111; color: #FAF8F4; padding: 0.4rem 0.8rem; text-transform: uppercase; letter-spacing: 0.1em;">
                Bag (<?= $cartTotals['item_count'] ?>)
            </a>
        </div>
    </div>
</header>
