import type { MetadataRoute } from "next";

const SITE_ORIGIN =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ndif-team.github.io";
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_ORIGIN}${BASE_PATH}/sitemap.xml`,
  };
}
