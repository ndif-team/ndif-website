export default function Research() {
  return (
    <section id="research" className="py-24 bg-gradient-to-b from-slate-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-slate-800/30 border border-slate-700/50">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-accent-600/20 rounded-full blur-[80px]"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-10 md:p-16 flex flex-col justify-center">
              <h3 className="font-display text-3xl font-bold mb-6 text-white">
                What is a Deep Inference Fabric?
              </h3>
              <p className="text-slate-300 mb-6 leading-relaxed">
                A deep inference fabric is a high-performance computing fabric
                designed to support scientific experiments on running AI systems.
              </p>
              <p className="text-slate-300 leading-relaxed">
                The NSF National Deep Inference Fabric consists of a unique
                combination of hardware and software that provides a
                remotely-accessible computing resource for scientists and students
                to perform detailed and reproducible experiments on large
                pretrained AI models, such as open large language models.
              </p>
            </div>
            <div className="bg-slate-900/50 p-10 md:p-16 flex items-center justify-center border-t lg:border-t-0 lg:border-l border-slate-700/50">
              <div className="text-center">
                <div className="text-5xl font-bold text-white mb-2">100+</div>
                <div className="text-brand-400 font-medium mb-8">
                  Universities & Labs
                </div>

                <div className="text-5xl font-bold text-white mb-2">PB</div>
                <div className="text-brand-400 font-medium mb-8">
                  Scale Data Processing
                </div>

                <div className="text-5xl font-bold text-white mb-2">Open</div>
                <div className="text-brand-400 font-medium">
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
