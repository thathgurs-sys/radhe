<?php
/**
 * ÉLAN JEWELS - Security & Input Sanitization
 */

require_once __DIR__ . '/../config/config.php';

class Security {
    /**
     * Generate CSRF Token and store in session
     */
    public static function generateCsrfToken(): string {
        if (empty($_SESSION['csrf_token'])) {
            $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
        }
        return $_SESSION['csrf_token'];
    }

    /**
     * Validate incoming CSRF token
     */
    public static function validateCsrfToken(?string $token): bool {
        if (empty($_SESSION['csrf_token']) || empty($token)) {
            return false;
        }
        return hash_equals($_SESSION['csrf_token'], $token);
    }

    /**
     * Escape HTML output for XSS protection
     */
    public static function e(?string $string): string {
        return htmlspecialchars((string)$string, ENT_QUOTES, 'UTF-8');
    }

    /**
     * Sanitize general string input
     */
    public static function sanitizeString(?string $string): string {
        if ($string === null) return '';
        return trim(strip_tags($string));
    }

    /**
     * Sanitize and validate email
     */
    public static function sanitizeEmail(?string $email): ?string {
        $filtered = filter_var(trim((string)$email), FILTER_SANITIZE_EMAIL);
        return filter_var($filtered, FILTER_VALIDATE_EMAIL) ? $filtered : null;
    }

    /**
     * Set security response headers
     */
    public static function setSecurityHeaders(): void {
        header("X-Content-Type-Options: nosniff");
        header("X-Frame-Options: SAMEORIGIN");
        header("X-XSS-Protection: 1; mode=block");
        header("Referrer-Policy: strict-origin-when-cross-origin");
    }
}
