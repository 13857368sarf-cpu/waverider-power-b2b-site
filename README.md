# WaveRider Power B2B Website

Static English B2B independent website for outboard motors and marine spare parts.

## Deploy to Vercel
1. Create a GitHub repository and upload this folder.
2. In Vercel, import the repo.
3. Framework preset: `Other` or static site.
4. Build command: leave empty.
5. Output directory: `/`.
6. Add your domain from Namecheap and point DNS through Cloudflare.

## Deploy to Cloudflare Pages
1. Push this folder to GitHub.
2. Cloudflare Pages > Create project > Connect GitHub.
3. Framework preset: None.
4. Build command: leave empty.
5. Output directory: `/`.

## Required edits before launch
- Replace WhatsApp number in `assets/js/main.js` and all `https://wa.me/8613800000000` links.
- Replace email `sales@waveriderpower.com`.
- Replace canonical domain in HTML files and `sitemap.xml` after final domain is confirmed.
- Upload larger catalog PDFs or manuals to Cloudflare R2 and link them from product pages.

## Structure
- `index.html` Home
- `products/` Product category pages
- `blog/` SEO / AEO guide articles
- `contact.html` WhatsApp quote form
- `assets/images/products/` Product photos
- `robots.txt` and `sitemap.xml` for Google indexing
