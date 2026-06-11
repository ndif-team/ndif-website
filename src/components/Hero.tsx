"use client";

import Link from "next/link";
import AnimateOnScroll from "./AnimateOnScroll";

export default function Hero() {
  return (
    <section className="relative pt-28 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <AnimateOnScroll variant="fadeIn" duration={0.6}>
          <div className="flex w-full justify-center gap-3 mb-8">
            <a href="https://workbench.ndif.us" target="_blank" rel="noopener noreferrer">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100/50 dark:bg-brand-900/30 border border-brand-200 dark:border-brand-500/30 text-brand-700 dark:text-brand-300 text-xs font-semibold uppercase tracking-wide backdrop-blur-sm hover:bg-brand-100 dark:hover:bg-brand-900/50 transition-colors">
                <span className="w-2 h-2 rounded-full bg-brand-500 dark:bg-brand-400 animate-pulse" />
                Workbench UI
              </span>
            </a>
            <Link href="/status">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-status-success/10 border border-status-success/30 text-emerald-700 dark:text-emerald-300 text-xs font-semibold uppercase tracking-wide backdrop-blur-sm hover:bg-status-success/20 transition-colors">
                <span className="w-2 h-2 rounded-full bg-status-success animate-pulse" />
                System Status
              </span>
            </Link>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll variant="fadeUp" duration={0.7} delay={0.1}>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-[1.05]" style={{ textWrap: 'balance' }}>
            <span className="text-gradient" style={{ letterSpacing: '-0.02em' }}>Cracking open</span>
            <br />
            <span className="text-slate-900 dark:text-white" style={{ letterSpacing: '-0.01em' }}>AI&apos;s black box</span>
          </h1>
        </AnimateOnScroll>

        <AnimateOnScroll variant="fadeUp" duration={0.6} delay={0.25}>
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-0 bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm rounded-2xl -mx-4 -my-2 border border-white/20 dark:border-slate-800/20" />
            <p className="relative z-10 mt-4 text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed px-2 py-2">
              The NSF National Deep Inference Fabric provides free remote access to
              large-scale AI models, enabling researchers and students to perform
              transparent, reproducible experiments on model internals.
            </p>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll variant="fadeUp" duration={0.5} delay={0.4}>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/get-started"
              className="group relative px-8 py-4 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-lg shadow-lg hover:shadow-card-hover transition-all hover:-translate-y-0.5 overflow-hidden"
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-brand-600 to-accent-600 dark:from-brand-400 dark:to-accent-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            <Link
              href="/fabric"
              className="px-8 py-4 rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white font-medium text-lg hover:border-brand-500 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-white dark:hover:bg-slate-800 transition-all hover:-translate-y-0.5"
            >
              Learn About the Fabric
            </Link>
          </div>
        </AnimateOnScroll>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-400/10 dark:bg-brand-600/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
    </section>
  );
}
