/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://novayaroots.com',
  generateRobotsTxt: true,
  outDir: 'dist',
}