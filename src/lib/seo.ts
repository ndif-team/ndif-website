import type { Metadata } from "next";

// Next replaces (not merges) openGraph/twitter when a page sets them, so every
// page carries the full block. `path` must keep its trailing slash.
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const OG_IMAGE_PATH = `${BASE_PATH}/og-image.png`;
export const SITE_NAME = "NDIF";
export const SITE_TITLE = "NSF | National Deep Inference Fabric";
export const SITE_DESCRIPTION =
  "Cracking open the mysteries inside large-scale Artificial Intelligence systems.";

export function pageSeo(
  path: string,
  title = SITE_TITLE,
  description = SITE_DESCRIPTION,
): Pick<Metadata, "alternates" | "openGraph" | "twitter"> {
  return {
    alternates: { canonical: `${BASE_PATH}${path}` },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title,
      description,
      url: `${BASE_PATH}${path}`,
      locale: "en_US",
      images: [{ url: OG_IMAGE_PATH, width: 1200, height: 630, alt: SITE_TITLE }],
    },
    twitter: {
      // title/description deliberately stay the site defaults.
      card: "summary_large_image",
      site: "@ndif_team",
      creator: "@ndif_team",
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
      images: [OG_IMAGE_PATH],
    },
  };
}
