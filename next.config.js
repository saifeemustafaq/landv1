/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['portfoliostorage2024.blob.core.windows.net'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'portfoliostorage2024.blob.core.windows.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig; 