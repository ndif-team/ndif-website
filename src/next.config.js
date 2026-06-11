// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ndif.us is served as plain static files from the repo's root `public/`
  // directory (see Makefile). `next dev` is unaffected by `output: "export"`.
  output: "export",
  images: { unoptimized: true },
  // Deterministic build id: same source tree → byte-identical export, so CI
  // skips the publish commit when nothing actually changed. CI stamps the
  // triggering commit's SHA; local builds use a fixed id.
  generateBuildId: async () => process.env.GITHUB_SHA ?? "local",
};

module.exports = nextConfig;
