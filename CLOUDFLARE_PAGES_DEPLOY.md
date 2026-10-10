# ⚡ Free Deployment Guide: Cloudflare Pages (Zero Cost, No Billing Required)

This project is fully configured for **Cloudflare Pages** (100% Free Tier, Unlimited Bandwidth, Free Custom Domain, and Free SSL).

---

## Method 1: Git Integration (Easiest & Automatic CI/CD)

1. **Push this project to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit for Élan Jewels"
   git remote add origin https://github.com/your-username/elan-jewels.git
   git push -u origin main
   ```

2. **Connect to Cloudflare**:
   - Go to [dash.cloudflare.com](https://dash.cloudflare.com/) (Sign up for free if you don't have an account).
   - In the left sidebar, click **Compute (Workers) > Workers & Pages**.
   - Click **Create application** > Select the **Pages** tab > **Connect to Git**.
   - Authorize GitHub and select your `elan-jewels` repository.

3. **Configure Build Settings**:
   - **Project Name**: `elan-jewels` (or your choice)
   - **Production Branch**: `main`
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Build Output Directory**: `dist`
   - **Environment Variables**: None required! All client variables and assets are self-contained.

4. **Click "Save and Deploy"**:
   - Cloudflare will build your application in ~45 seconds.
   - Your site is immediately live at: `https://elan-jewels.pages.dev`
   - You can connect a custom domain for free with 1 click in the **Custom domains** tab!

---

## Method 2: Direct CLI Deployment (Using Wrangler)

If you do not want to connect a Git repository, you can deploy directly from your computer using Cloudflare's CLI:

1. Build the production assets:
   ```bash
   npm run build
   ```

2. Deploy directly with Wrangler:
   ```bash
   npx wrangler pages deploy dist --project-name elan-jewels
   ```

---

## Why This Works Flawlessly on Cloudflare Pages:
1. **SPA Routing**: `public/_redirects` contains `/*  /index.html  200` to prevent 404s when refreshing subpages or navigating.
2. **Security Headers**: `public/_headers` adds strict modern security headers (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`).
3. **Serverless Worker API**: `functions/api/health.ts` and `functions/api/newsletter.ts` run on Cloudflare Workers edge runtime (100,000 free requests/day).
4. **All Features Intact**: Complete storefront, catalog, quick view modal, shopping cart, customer checkout, orders, and the full Admin Console (`/admin`) run without needing any Google Cloud billing account!
