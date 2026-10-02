#!/usr/bin/env bash
# ==============================================================================
# BananaTech.in — Cloudflare Pages Free Deployment Script
# ==============================================================================
set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$DIR"

echo "=========================================================="
echo "   🚀 Deploying BananaTech (bananatech.in) to Cloudflare  "
echo "=========================================================="
echo ""

# 1. Initialize Git repository if not present
if [ ! -d ".git" ]; then
  echo "📦 Initializing Git repository..."
  git init
  git add .
  git commit -m "feat: initial release of BananaTech agency website"
  echo "✓ Git repository created with initial commit."
else
  echo "✓ Git repository already exists."
fi

echo ""
echo "Choose your preferred deployment method:"
echo "----------------------------------------------------------"
echo "1) Instant CLI Deployment using Wrangler (Cloudflare CLI)"
echo "2) GitHub Continuous Deployment (Recommended)"
echo "3) Direct Upload via Cloudflare Web Dashboard (No CLI needed)"
echo "----------------------------------------------------------"
echo ""

echo "👉 Option 1 (CLI):"
echo "   Run: npx wrangler pages deploy . --project-name=bananatech"
echo ""
echo "👉 Option 2 (GitHub):"
echo "   1. Create a repository on github.com (e.g. 'bananatech-website')"
echo "   2. Push your code:"
echo "      git remote add origin https://github.com/YOUR_USERNAME/bananatech-website.git"
echo "      git branch -M main"
echo "      git push -u origin main"
echo "   3. In Cloudflare Dashboard -> Compute (Workers & Pages) -> Create application -> Pages -> Connect to Git"
echo ""
echo "👉 Option 3 (Direct Drag-and-Drop in Cloudflare Dashboard):"
echo "   1. Go to https://dash.cloudflare.com/"
echo "   2. Click 'Workers & Pages' -> 'Create application' -> 'Pages' -> 'Upload assets'"
echo "   3. Project name: bananatech"
echo "   4. Drag and drop this folder ($DIR) into the browser window!"
echo ""
echo "🌐 Connecting custom domain 'bananatech.in':"
echo "   In Cloudflare Pages -> Custom domains -> Set up a custom domain -> Enter 'bananatech.in'!"
echo "=========================================================="
