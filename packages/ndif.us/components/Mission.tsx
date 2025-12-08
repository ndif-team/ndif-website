export default function Mission() {
  return (
    <section id="mission" className="py-24 bg-slate-50 dark:bg-slate-900/50 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-600 to-accent-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative p-8 bg-white dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-800 rounded-xl leading-none flex items-center justify-center aspect-square md:aspect-video lg:aspect-square transition-colors duration-300">
                {/* Simple SVG Visualization of "Black Box" */}
                <svg
                  viewBox="0 0 200 200"
                  className="w-full h-full text-slate-400 dark:text-slate-600 group-hover:text-brand-500 transition-colors duration-500"
                >
                  <defs>
                    <pattern
                      id="grid"
                      width="20"
                      height="20"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 20 0 L 0 0 0 20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="0.5"
                        strokeOpacity="0.3"
                      />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                  <rect
                    x="60"
                    y="60"
                    width="80"
                    height="80"
                    rx="4"
                    fill="currentColor"
                    fillOpacity="0.1"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M20 100 H60 M140 100 H180"
                    stroke="currentColor"
                    strokeWidth="2"
                    markerEnd="url(#arrow)"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="20"
                    fill="currentColor"
                    className="animate-pulse"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 text-slate-900 dark:text-white">
              Our Mission
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-6">
              Powerful large-scale Artificial Intelligence (AI) systems such as{" "}
              <span className="text-brand-600 dark:text-brand-400 font-semibold">
                Large Language Models (LLMs)
              </span>{" "}
              herald a new era of AI that is poised to reshape society, but
              scientists cannot explain their predictions. The NSF National Deep
              Inference Fabric (NDIF) is a research computing project that will
              enable researchers and students to crack open the mysteries inside
              these enormous neural networks.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              Because large-scale AI systems are trained automatically using
              massive amounts of data—instead of being designed line-by-line by a
              programmer—the internal workings of the current generation of AI are
              inscrutable to humans. Understanding how these systems work is an
              emerging science. But performing science on the internals of such
              large-scale AI systems requires substantial computational resources
              that are not practical at institutional scale, because the
              infrastructure required to study the detailed computations of AI
              differs from the computing systems used for ordinary commercial
              deployment of AI.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              NDIF addresses this critical need by creating a unique nationwide
              research computing fabric that enables scientists to perform
              transparent and reproducible experiments on the largest-scale open
              AI systems. NDIF will advance our nation’s understanding of the
              capabilities of large-scale AI systems, as well as their
              limitations, robustness, safety issues, and impacts on human
              society.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
