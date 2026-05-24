"use client";

import Image from "next/image";
import AnimateOnScroll, { StaggerContainer, StaggerItem } from "./AnimateOnScroll";
import { partners } from "data/partners";
import { getAssetPath } from "../lib/assetPath";

export default function PartnersSection() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
            Our Partners
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-brand-500 to-accent-500 mx-auto rounded-full" />
        </AnimateOnScroll>

        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          staggerDelay={0.15}
        >
          {partners.map((partner) => (
            <StaggerItem key={partner.shortName}>
              <a
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col sm:flex-row items-start gap-6 p-8 rounded-2xl bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 hover:border-brand-400 dark:hover:border-brand-500/50 transition-all hover:-translate-y-1 hover:shadow-lg h-full"
              >
                <div className="flex-shrink-0 w-20 h-20 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center p-3">
                  <Image
                    src={getAssetPath(partner.logo)}
                    alt={partner.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    {partner.name}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {partner.description}
                  </p>
                </div>
              </a>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
