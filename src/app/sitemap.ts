import type { MetadataRoute } from "next";

const SITE_ORIGIN =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ndif-team.github.io";
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const SITE_URL = `${SITE_ORIGIN}${BASE_PATH}`;

const routes = [
  { path: "/", priority: 1.0, changeFrequency: "monthly" as const },
  { path: "/fabric", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/research", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/community", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/status", priority: 0.6, changeFrequency: "daily" as const },
  { path: "/get-started", priority: 0.9, changeFrequency: "monthly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
