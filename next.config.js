/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'i.scdn.co',
            port: '',
            pathname: './**',
          },
        ],
    },
    experimental: {
      serverActions: true,
    },
}

module.exports = nextConfig