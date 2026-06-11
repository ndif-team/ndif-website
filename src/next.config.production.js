// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/ndif-website",
  assetPrefix: "/ndif-website",
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BASE_PATH: "/ndif-website",
  },
};

module.exports = nextConfig;
