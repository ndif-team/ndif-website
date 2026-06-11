/**
 * Prefix for asset URLs when deployed under a subpath (e.g. GitHub Pages).
 * Set via NEXT_PUBLIC_BASE_PATH in next.config.production.js.
 * next/image does not add basePath to src, so we must prefix public paths ourselves.
 */
const basePath = typeof process.env.NEXT_PUBLIC_BASE_PATH === "string"
  ? process.env.NEXT_PUBLIC_BASE_PATH
  : "";

export function getAssetPath(path: string): string {
  if (!path) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${normalized}`;
}
