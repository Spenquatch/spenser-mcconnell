/** @type {import('next').NextConfig} */
const nextConfig = {
  // Standard page extensions (removed MDX since we're using Strapi)
  pageExtensions: ["js", "jsx", "ts", "tsx"],
  
  // Image domains for Strapi media
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
    ],
  },
};

module.exports = nextConfig;
