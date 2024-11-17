const fs = require('fs');
const path = require('path');

function generateSitemap() {
  const baseUrl = 'https://novayaroots.com';
  const pages = [
    { url: '/', lastMod: new Date(), changeFreq: 'daily', priority: 1 },
    { url: '/products', lastMod: new Date(), changeFreq: 'weekly', priority: 0.8 },
    { url: '/about', lastMod: new Date(), changeFreq: 'monthly', priority: 0.7 },
    { url: '/blog', lastMod: new Date(), changeFreq: 'weekly', priority: 0.6 },
    { url: '/contact', lastMod: new Date(), changeFreq: 'monthly', priority: 0.5 },
    { url: '/order', lastMod: new Date(), changeFreq: 'daily', priority: 0.9 },
  ];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastMod.toISOString()}</lastmod>
    <changefreq>${page.changeFreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  // Ensure the public directory exists
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }

  // Create sitemap directory inside public
  const sitemapDir = path.join(publicDir, 'sitemap');
  if (!fs.existsSync(sitemapDir)) {
    fs.mkdirSync(sitemapDir);
  }

  // Write the sitemap file
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml);
  // Also write it to the sitemap directory
  fs.writeFileSync(path.join(sitemapDir, 'sitemap.xml'), sitemapXml);

  console.log('Sitemap generated successfully in public/sitemap.xml and public/sitemap/sitemap.xml!');
}

generateSitemap();