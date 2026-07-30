import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  reactStrictMode: false,
  turbopack: {},

  async redirects() {
    return [
      // Old knowledge routes → new /knowledge/ prefix
      { source: '/languages/:path*', destination: '/knowledge/languages/:path*', permanent: true },
      { source: '/principles/:path*', destination: '/knowledge/principles/:path*', permanent: true },
      { source: '/patterns/:path*', destination: '/knowledge/patterns/:path*', permanent: true },
      { source: '/tools/:path*', destination: '/knowledge/tools/:path*', permanent: true },
      { source: '/technologies/:path*', destination: '/knowledge/technologies/:path*', permanent: true },
    ];
  },
};

export default nextConfig;