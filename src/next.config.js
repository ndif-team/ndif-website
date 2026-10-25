// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ndif.us is served as plain static files from the repo's root `public/`
  // directory (see Makefile). `next dev` is unaffected by `output: "export"`.
  output: "export",
  images: { unoptimized: true },
  // Emit directory-style pages (research/index.html, not research.html) so
  // deep links like /research resolve on any plain static file server.
  trailingSlash: true,
  // Deterministic build id: same inputs → byte-identical export, so CI skips
  // the publish commit when nothing actually changed. CI sets BUILD_ID to a
  // hash of src/; local builds use a fixed id.
  generateBuildId: async () => process.env.BUILD_ID || "local",
  // Single static-generation worker: with several, the numbering of shared
  // client-module references in the RSC .txt payloads races between runs.
  experimental: { cpus: 1 },
};

module.exports = nextConfig;
