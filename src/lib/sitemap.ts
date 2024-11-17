export async function getSitemapXml() {
  const pages = [
    { url: 'https://novayaroots.com', lastMod: new Date(), changeFreq: 'daily', priority: 1 },
    { url: 'https://novayaroots.com/products', lastMod: new Date(), changeFreq: 'weekly', priority: 0.8 },
    { url: 'https://novayaroots.com/about', lastMod: new Date(), changeFreq: 'monthly', priority: 0.7 },
    { url: 'https://novayaroots.com/blog', lastMod: new Date(), changeFreq: 'weekly', priority: 0.6 },
    { url: 'https://novayaroots.com/contact', lastMod: new Date(), changeFreq: 'monthly', priority: 0.5 },
  ]

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages.map(page => `
    <url>
      <loc>${page.url}</loc>
      <lastmod>${page.lastMod.toISOString()}</lastmod>
      <changefreq>${page.changeFreq}</changefreq>
      <priority>${page.priority}</priority>
    </url>
  `).join('')}
</urlset>`

  return sitemapXml
}