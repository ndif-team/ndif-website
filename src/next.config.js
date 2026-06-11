// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ndif.us is served as plain static files from the repo's root `public/`
  // directory (see Makefile). `next dev` is unaffected by `output: "export"`.
  output: "export",
  images: { unoptimized: true },
};

module.exports = nextConfig;
