module.exports = {
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config;
  },
  images: {
    domains: ['ew7afpe1clbr.usemoralis.com', 'localhost', 'crypto-vk-server.herokuapp.com'],
  },
};
