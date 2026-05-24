export default function Research() {
  return (
    <section id="research" className="py-24 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-white/50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 backdrop-blur-sm shadow-xl dark:shadow-none">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-accent-500/10 dark:bg-accent-600/20 rounded-full blur-[80px]"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-10 md:p-16 flex flex-col justify-center">
              <h3 className="font-display text-3xl font-bold mb-6 text-slate-900 dark:text-white">
                Featured Research
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                A deep inference fabric is a high-performance computing fabric
                designed to support scientific experiments on running AI systems.
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                A deep inference fabric is a high-performance computing fabric
                designed to support scientific experiments on running AI systems.
              </p>
            </div>
            <div className="bg-slate-50/50 dark:bg-slate-900/50 p-10 md:p-16 flex items-center justify-center border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-700/50">
              <div className="text-center">
                <div className="text-5xl font-bold text-slate-900 dark:text-white mb-2">100+</div>
                <div className="text-brand-600 dark:text-brand-400 font-medium mb-8">
                  Universities & Labs
                </div>

                <div className="text-5xl font-bold text-slate-900 dark:text-white mb-2">1000+</div>
                <div className="text-brand-600 dark:text-brand-400 font-medium mb-8">
                  Research Citations
                </div>

                <div className="text-5xl font-bold text-slate-900 dark:text-white mb-2">Open</div>
                <div className="text-brand-600 dark:text-brand-400 font-medium">
                  Source Ecosystem
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
