import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-900/30 border border-brand-500/30 text-brand-300 text-xs font-semibold uppercase tracking-wide mb-8 animate-pulse-slow">
          <span className="w-2 h-2 rounded-full bg-brand-400"></span>
          NSF National Deep Inference Fabric
        </div>

        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-tight">
          <span className="text-gradient">NSF National Deep Inference Fabric</span>
        </h1>

        <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-400 leading-relaxed">
          The NSF National Deep Inference Fabric is a research computing project that will enable us to crack open the mysteries inside large-scale Artificial Intelligence systems.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="#mission"
            className="group relative px-8 py-4 rounded-full bg-white text-slate-900 font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden"
          >
            <span className="relative z-10">Discover Our Mission</span>
            <div className="absolute inset-0 bg-gradient-to-r from-brand-200 to-accent-200 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </Link>
          <Link
            href="#research"
            className="px-8 py-4 rounded-full bg-slate-800/50 backdrop-blur-sm border border-slate-700 text-white font-medium text-lg hover:bg-slate-800 transition-all hover:-translate-y-1"
          >
            Read the Research
          </Link>
        </div>
      </div>

      {/* Decorative Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-600/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
    </section>
  );
}
