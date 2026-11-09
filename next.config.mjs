/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      // Root domain -> AI app subdomain (host-scoped, so ai.jobingen.com is unaffected)
      {
        source: '/:path*',
        has: [{ type: 'host', value: '(www\\.)?jobingen\\.com' }],
        destination: 'https://ai.jobingen.com/:path*',
        permanent: false,
      },
      { source: '/pre-launch', destination: '/', permanent: true },
      { source: '/app', destination: '/dashboard', permanent: true },
      { source: '/campus-ambassador', destination: '/jobingen-club', permanent: true },
    ]
  },
}

export default nextConfig
