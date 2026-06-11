"use client";

import Link from "next/link";
import AnimateOnScroll, { StaggerContainer, StaggerItem } from "./AnimateOnScroll";
import { featuredModels, deploymentLevelMeta } from "data/models";

export default function ModelCards() {
  return (
    <section id="remote-model-access" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-white/50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 backdrop-blur-sm shadow-xl dark:shadow-none">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-brand-400/10 dark:bg-brand-600/20 rounded-full blur-[80px]" />

          <div className="grid grid-cols-1 lg:grid-cols-2">
            <AnimateOnScroll className="p-10 md:p-16 flex flex-col justify-center">
              <h3 className="font-display text-3xl md:text-4xl font-bold mb-6 text-slate-900 dark:text-white">
                Remote Model Access
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                Access and inspect open-source model internals remotely on NDIF with the NNsight API. Deploy models on-demand with full transparency into their computations.
              </p>
              <p className="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                All models are free for research use — no GPU required on your end.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/status"
                  className="px-5 py-2.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  View All Models
                </Link>
                <a
                  href="https://nnsight.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full bg-white/80 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm font-medium hover:border-brand-500 hover:text-brand-600 dark:hover:text-brand-400 transition-all hover:-translate-y-0.5"
                >
                  NNsight Docs ↗
                </a>
              </div>
            </AnimateOnScroll>

            <div className="bg-slate-50/50 dark:bg-slate-900/50 p-8 md:p-12 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-700/50">
              <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4" staggerDelay={0.08}>
                {featuredModels.map((model) => {
                  const meta = deploymentLevelMeta[model.level];
                  return (
                    <StaggerItem key={model.id}>
                      <div className="card-spotlight surface-glass p-5 rounded-xl border border-slate-200 dark:border-slate-700/50 hover:border-brand-400 dark:hover:border-brand-500/50 transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 focus-visible:outline-none">
                        <div className="flex items-center justify-between mb-3">
                          <span
                            className="inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded-full"
                            style={{
                              backgroundColor: `${meta.color}18`,
                              color: meta.color,
                            }}
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ backgroundColor: meta.color }}
                            />
                            {meta.label}
                          </span>
                          {model.parameters && (
                            <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
                              {model.parameters}
                            </span>
                          )}
                        </div>
                        <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-1">
                          {model.name}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-mono truncate">
                          {model.repoId}
                        </p>
                      </div>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
