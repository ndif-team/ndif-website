// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/ndif-website",
  assetPrefix: "/ndif-website",
  images: { unoptimized: true },
  // Emit directory-style pages (research/index.html, not research.html) so
  // deep links like /research resolve on any plain static file server.
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: "/ndif-website",
  },
};

module.exports = nextConfig;
