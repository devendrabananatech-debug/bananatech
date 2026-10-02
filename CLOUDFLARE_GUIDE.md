# 🍌 BananaTech (bananatech.in) — Cloudflare Free Hosting & Deployment Guide

This guide will walk you through hosting your **BananaTech** agency website completely **FREE** on **Cloudflare Pages**. 

Cloudflare's Free Tier includes:
- ✅ **Unlimited Bandwidth & Requests** (No bandwidth caps)
- ✅ **Global Edge CDN across 330+ cities worldwide** (Sub-50ms latency)
- ✅ **Automatic Free SSL Certificate** (HTTPS encryption)
- ✅ **Enterprise-Grade DDoS Protection**
- ✅ **Custom Domain support** (`bananatech.in` & `www.bananatech.in`)
- ✅ **100% Free Forever** (No credit card or paid server fees required)

---

## 🚀 Deployment Options (Pick the easiest for you)

### Option A: Drag-and-Drop via Cloudflare Dashboard (Fastest — 60 Seconds)
1. Go to **[https://dash.cloudflare.com/](https://dash.cloudflare.com/)** and log in (or create a free account).
2. On the left sidebar, click **Workers & Pages**.
3. Click the **Create application** button.
4. Select the **Pages** tab, then click **Upload assets**.
5. Set your Project Name to: `bananatech`
6. Click **Select folder** (or drag and drop):
   - Select the directory: `/Users/devendra/.gemini/antigravity/scratch/bananatech-website`
7. Click **Deploy site**.
8. Cloudflare will upload your assets and give you a live URL like: `https://bananatech.pages.dev`!

---

### Option B: Connect to GitHub (Best for ongoing updates)
1. Push this folder to a GitHub repository:
   ```bash
   cd /Users/devendra/.gemini/antigravity/scratch/bananatech-website
   # Create a new repository on https://github.com/new named 'bananatech-website'
   git remote add origin https://github.com/YOUR_GITHUB_USERNAME/bananatech-website.git
   git branch -M main
   git push -u origin main
   ```
2. In Cloudflare Dashboard:
   - Go to **Workers & Pages** -> **Create application** -> **Pages** -> **Connect to Git**.
   - Authorize GitHub and choose your `bananatech-website` repository.
   - Build settings:
     - **Framework preset**: None
     - **Build command**: (leave empty)
     - **Build output directory**: `.`
   - Click **Save and Deploy**.
3. Every time you push changes to GitHub, Cloudflare automatically rebuilds and deploys in seconds!

---

### Option C: Instant Terminal Deployment via Wrangler CLI
If you have Node.js / npx installed on your system:
```bash
cd /Users/devendra/.gemini/antigravity/scratch/bananatech-website
npx wrangler pages deploy . --project-name=bananatech
```
Follow the one-time browser login prompt to authorize Cloudflare.

---

## 🌐 Linking Your Custom Domain: `bananatech.in`

Once your project is deployed on Cloudflare Pages:

1. Inside your Cloudflare Dashboard, open your **bananatech** Pages project.
2. Click on the **Custom domains** tab at the top.
3. Click **Set up a custom domain**.
4. Enter: `bananatech.in` (and repeat for `www.bananatech.in`).
5. **DNS Setup**:
   - **If your domain is managed by Cloudflare DNS**: Cloudflare automatically adds the CNAME record for you with 1 click!
   - **If your domain is at another registrar (GoDaddy, Namecheap, Hostinger, etc.)**:
     Add this DNS CNAME record in your registrar's DNS management:
     - **Type**: `CNAME`
     - **Name / Host**: `@` (or `bananatech.in`)
     - **Target / Value**: `bananatech.pages.dev`
     - **Proxy status**: Proxied (Orange cloud on Cloudflare)
6. Cloudflare will automatically generate and renew an SSL certificate for `https://bananatech.in/`.

---

## 💻 Local Testing & Preview

To preview the website on your local machine right now:
```bash
cd /Users/devendra/.gemini/antigravity/scratch/bananatech-website
python3 -m http.server 8080
```
Open **[http://localhost:8080](http://localhost:8080)** in your web browser!

---

## 📁 Project Structure

```
bananatech-website/
├── index.html              # Homepage with Hero, Calculator, Case Studies, FAQs & Lead Form
├── services.html           # In-depth breakdown of the 5 agency pillars
├── portfolio.html          # Case studies with metrics (Hospitals, FoodTech, Profiling, Apps)
├── about.html              # Agency story, mission, and operating principles
├── contact.html            # Inquiry form with auto-service selection and budget estimator
├── 404.html                # Branded 404 error fallback
├── _headers                # Cloudflare Pages security & 1-year asset cache headers
├── _redirects              # Clean URL routing rules
├── robots.txt              # Search engine crawler permissions
├── sitemap.xml             # XML sitemap for SEO
├── wrangler.toml           # Cloudflare Pages project configuration
├── deploy-cloudflare.sh    # Fast deployment helper script
└── assets/
    ├── css/
    │   └── styles.css      # Dark obsidian theme, glassmorphism, animations & custom sliders
    ├── js/
    │   └── main.js         # Interactive cost estimator, portfolio filter, demo modals & forms
    └── images/
        ├── logo.svg        # Official BananaTech vector logo
        └── favicon.svg     # Matching favicon
```
