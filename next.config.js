// next.config.js
module.exports = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: '/franchiser/oauth',
        destination: '/franchiser/oauth',
      },
    ];
  }
};
