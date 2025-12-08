import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import BackgroundCanvas from "components/BackgroundCanvas";
import "styles/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });

export const metadata: Metadata = {
  title: "NDIF | National Deep Inference Fabric",
  description: "Cracking open the mysteries inside large-scale Artificial Intelligence systems.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased selection:bg-accent-500 selection:text-white bg-[#020617] text-slate-50 overflow-x-hidden`}>
        <BackgroundCanvas />
        {children}
      </body>
    </html>
  );
}
