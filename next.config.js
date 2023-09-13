/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  // distDir: "build",
  experimental: {
    serverActions: true,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/main",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
