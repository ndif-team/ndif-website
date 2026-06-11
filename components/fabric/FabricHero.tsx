"use client";

import AnimateOnScroll from "../AnimateOnScroll";

export default function FabricHero() {
  return (
    <section className="pt-28 pb-16 lg:pt-36 lg:pb-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <AnimateOnScroll>
            <div className="mb-6">
              <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white">
                The <span className="text-gradient">Fabric</span>
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-brand-500 to-accent-500 mx-auto rounded-full" />
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll delay={0.1}>
            <div className="relative max-w-3xl mx-auto">
              <div className="absolute inset-0 bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm rounded-2xl -mx-4 -my-2 border border-white/20 dark:border-slate-800/20" />
              <p className="relative z-10 text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed px-2 py-2">
                Developed by Northeastern University in partnership with the NSF
                Delta high-performance computing cluster at the NCSA at University
                of Illinois Urbana-Champaign, NDIF consists of three major
                components.
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
