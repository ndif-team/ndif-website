import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="flex w-full justify-center gap-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100/50 dark:bg-brand-900/30 border border-brand-200 dark:border-brand-500/30 text-brand-700 dark:text-brand-300 text-xs font-semibold uppercase tracking-wide mb-8 animate-pulse-slow backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-brand-500 dark:bg-brand-400"></span>
            Check out our Workbench!
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100/50 dark:bg-brand-900/30 border border-brand-200 dark:border-brand-500/30 text-brand-700 dark:text-brand-300 text-xs font-semibold uppercase tracking-wide mb-8 animate-pulse-slow backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-brand-500 dark:bg-brand-400"></span>
            Check out our status page!
          </div>
        </div>


        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-tight text-slate-900 dark:text-white">
          <span className="text-gradient">Unlock the mysteries inside large-scale AI</span>
        </h1>

        <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
          The NSF National Deep Inference Fabric is a research computing project that enables researchers to crack open large-scale Artificial Intelligence systems.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="#mission"
            className="group relative px-8 py-4 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden"
          >
            <span className="relative z-10">Our Mission</span>
            <div className="absolute inset-0 bg-gradient-to-r from-brand-600 to-accent-600 dark:from-brand-200 dark:to-accent-200 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </Link>
          <Link
            href="#research"
            className="px-8 py-4 rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white font-medium text-lg hover:bg-white dark:hover:bg-slate-800 transition-all hover:-translate-y-1"
          >
            Read the Research
          </Link>
        </div>
      </div>

      {/* Decorative Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-400/10 dark:bg-brand-600/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
    </section>
  );
}
