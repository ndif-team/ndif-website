import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import BackgroundCanvas from "components/BackgroundCanvas";
import { SettingsProvider } from "components/SettingsProvider";
import "styles/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });

export const metadata: Metadata = {
  title: "NSF | National Deep Inference Fabric",
  description: "Cracking open the mysteries inside large-scale Artificial Intelligence systems.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased selection:bg-accent-500 selection:text-white bg-white dark:bg-[#020617] text-slate-900 dark:text-slate-50 overflow-x-hidden transition-colors duration-300`}>
        <SettingsProvider>
          <BackgroundCanvas />
          {children}
        </SettingsProvider>
      </body>
    </html>
  );
}
