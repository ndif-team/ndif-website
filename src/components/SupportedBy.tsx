"use client";

import Image from "next/image";
import AnimateOnScroll, { StaggerContainer, StaggerItem } from "./AnimateOnScroll";
import { supporters } from "data/partners";
import { getAssetPath } from "../lib/assetPath";

export default function SupportedBy() {
  return (
    <section className="py-12 border-y border-slate-200 dark:border-slate-800 bg-white/30 dark:bg-slate-900/30 backdrop-blur-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll variant="fadeIn">
          <p className="text-center text-sm font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-8">
            Supported by
          </p>
        </AnimateOnScroll>
        <StaggerContainer
          className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 md:gap-x-16"
          staggerDelay={0.1}
        >
          {supporters.map((s) => (
            <StaggerItem key={s.name}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                title={s.name}
              >
                <Image
                  src={getAssetPath(s.logo)}
                  alt={s.name}
                  width={120}
                  height={48}
                  className={`w-auto object-contain transition-all duration-300 ${
                    s.name === "National Science Foundation"
                      ? "h-14 md:h-16"
                      : s.name === "PIT-UN"
                      ? "h-7 md:h-9"
                      : s.name === "NAIRR"
                      ? "h-6 md:h-8"
                      : "h-10 md:h-12"
                  }`}
                />
              </a>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
