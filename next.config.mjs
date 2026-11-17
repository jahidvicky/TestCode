/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  logging: {
    browserToTerminal: false,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
