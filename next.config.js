/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/shop',
        destination: 'https://www.musicamatics.com/',
        permanent: true,
      },
    ]
  },
};

module.exports = nextConfig;
