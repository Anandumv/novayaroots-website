/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: '/blog',
        destination: 'https://medium.com/@novayaroots',
        permanent: true,
        basePath: false,
      },
      {
        source: '/products',
        destination: '/order',
        permanent: true,
      },
      {
        source: '/about',
        destination: '/#why-novayaroots',
        permanent: true,
      },
      {
        source: '/contact',
        destination: '/#contact',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig