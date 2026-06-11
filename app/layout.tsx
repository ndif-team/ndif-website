import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import dynamic from "next/dynamic";
import Script from "next/script";
import { SettingsProvider } from "components/SettingsProvider";
import SpotlightEffect from "components/SpotlightEffect";
import "styles/globals.css";

const GA_MEASUREMENT_ID = "G-NQV89E9KBS";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });

// Loaded after first paint so three.js stays out of the shared baseline JS chunk.
const BackgroundCanvas = dynamic(() => import("components/BackgroundCanvas"), {
  ssr: false,
  loading: () => null,
});

// metadataBase MUST be a bare origin (no basePath). Next 14 does NOT prepend
// basePath to relative paths in metadata fields, so include basePath in any
// asset URLs we hand to openGraph/twitter (see OG_IMAGE_PATH below).
const SITE_ORIGIN =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ndif-team.github.io";
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const OG_IMAGE_PATH = `${BASE_PATH}/og-image.png`;
const SITE_NAME = "NDIF";
const SITE_TITLE = "NSF | National Deep Inference Fabric";
const SITE_DESCRIPTION =
  "Cracking open the mysteries inside large-scale Artificial Intelligence systems.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: {
    default: SITE_TITLE,
    template: "%s | NDIF",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  referrer: "strict-origin-when-cross-origin",
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
    locale: "en_US",
    // Static .png file in public/ — see DEFERRED.md "OG / Twitter card image"
    // for how to regenerate. The JSX source was at app/opengraph-image.tsx
    // (kept in git history) and is the canonical design.
    images: [{ url: OG_IMAGE_PATH, width: 1200, height: 630, alt: SITE_TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ndif_team",
    creator: "@ndif_team",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE_PATH],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased selection:bg-brand-600 selection:text-white bg-white dark:bg-surface-950 text-slate-900 dark:text-slate-50 overflow-x-hidden`}>
        <SettingsProvider>
          <BackgroundCanvas />
          <SpotlightEffect />
          {children}
        </SettingsProvider>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`}
        </Script>
      </body>
    </html>
  );
}
