"use client";

import AnimateOnScroll from "./AnimateOnScroll";

export default function AboutStory() {
  return (
    <section className="pt-28 pb-20 lg:pt-36 lg:pb-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white">
              About <span className="text-gradient">NDIF</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-brand-500 to-accent-500 mx-auto rounded-full" />
          </div>
        </AnimateOnScroll>

          <div className="max-w-4xl mx-auto relative">
            <div className="absolute inset-0 bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm rounded-3xl -mx-4 md:-mx-8 -my-6 z-0 border border-white/20 dark:border-slate-800/20" />
            <div className="relative z-10">
              <AnimateOnScroll delay={0.1}>
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                    Powerful large-scale Artificial Intelligence (AI) systems such as{" "}
                    <span className="text-brand-600 dark:text-brand-400 font-semibold">
                      Large Language Models (LLMs)
                    </span>{" "}
                    herald a new era of AI that is poised to reshape society, but scientists
                    cannot explain their predictions. The NSF National Deep Inference Fabric
                    (NDIF) is a research computing project that enables researchers and
                    students to crack open the mysteries inside these enormous neural networks.
                  </p>
                </div>
              </AnimateOnScroll>

              <AnimateOnScroll delay={0.2}>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6 text-lg">
                  Because large-scale AI systems are trained automatically using massive
                  amounts of data — instead of being designed line-by-line by a programmer —
                  the internal workings of the current generation of AI are inscrutable to
                  humans. Understanding how these systems work is an emerging science. But
                  performing science on the internals of such large-scale AI systems requires
                  substantial computational resources that are not practical at institutional
                  scale, because the infrastructure required to study the detailed
                  computations of AI differs from the computing systems used for ordinary
                  commercial deployment of AI.
                </p>
              </AnimateOnScroll>

              <AnimateOnScroll delay={0.3}>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg mb-10">
                  NDIF addresses this critical need by creating a unique nationwide research
                  computing fabric that enables scientists to perform transparent and
                  reproducible experiments on the largest-scale open AI systems. NDIF will
                  advance our nation&apos;s understanding of the capabilities of large-scale
                  AI systems, as well as their limitations, robustness, safety issues, and
                  impacts on human society.
                </p>
              </AnimateOnScroll>
            </div>
          </div>

          <AnimateOnScroll delay={0.35}>
            <div className="rounded-2xl bg-brand-50 dark:bg-brand-950/30 border border-brand-200 dark:border-brand-800/40 p-6 md:p-8">
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                NDIF is supported by{" "}
                <a
                  href="https://www.nsf.gov/awardsearch/showAward?AWD_ID=2408455"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-600 dark:text-brand-400 font-semibold hover:underline underline-offset-2"
                >
                  a grant
                </a>{" "}
                from the U.S. National Science Foundation. It is developed by a team at{" "}
                <a
                  href="https://www.northeastern.edu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-600 dark:text-brand-400 font-semibold hover:underline underline-offset-2"
                >
                  Northeastern University
                </a>{" "}
                in Boston, Massachusetts. Computing capacity comes from{" "}
                <a
                  href="https://www.ncsa.illinois.edu/research/project-highlights/delta/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-600 dark:text-brand-400 font-semibold hover:underline underline-offset-2"
                >
                  Delta
                </a>{" "}
                at NCSA, University of Illinois Urbana-Champaign. The NDIF community is
                developed in partnership with{" "}
                <a
                  href="https://pitcases.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-600 dark:text-brand-400 font-semibold hover:underline underline-offset-2"
                >
                  PIT-UN
                </a>
                , a consortium of 63 universities and colleges.
              </p>
            </div>
          </AnimateOnScroll>
      </div>
    </section>
  );
}
