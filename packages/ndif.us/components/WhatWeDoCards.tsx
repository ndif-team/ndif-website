export default function WhatWeDoCards() {
  return (
    <section id="what-we-do" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
            What We Do
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-brand-500 to-accent-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Democratize AI Access */}
          <div className="card-glass p-8 rounded-2xl">
            <div className="w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6 text-brand-600 dark:text-brand-400 border border-slate-200 dark:border-slate-700">
              <img
                src="https://cdn.jsdelivr.net/npm/heroicons@latest/24/outline/book-open.svg"
                alt="Book Open"
                className="w-7 h-7"
              />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Democratize AI Access</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Access and modify very large open-source model internals remotely. We offer a shared,
              high-performance computational infrastructure so researchers can inspect and modify
              the internal calculations of open neural networks without needing to host their own copies.
            </p>
          </div>

          {/* Card 2: Support AI Research */}
          <div className="card-glass p-8 rounded-2xl">
            <div className="w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6 text-accent-600 dark:text-accent-400 border border-slate-200 dark:border-slate-700">
              <img
                src="https://cdn.jsdelivr.net/npm/heroicons@latest/24/outline/magnifying-glass.svg"
                alt="Magnifying Glass"
                className="w-7 h-7"
              />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Support AI Research</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Foster a collaborative research environment supporting interdisciplinary and public-interest work.
              NDIF partners with universities and research teams to advance responsible, transparent, and
              reproducible AI research together.
            </p>
          </div>

          {/* Card 3: Illuminate Deep Neural Networks */}
          <div className="card-glass p-8 rounded-2xl">
            <div className="w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6 text-teal-600 dark:text-teal-400 border border-slate-200 dark:border-slate-700">
              <img
                src="https://cdn.jsdelivr.net/npm/heroicons@latest/24/outline/light-bulb.svg"
                alt="Light Bulb"
                className="w-7 h-7"
              />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Illuminate Deep Neural Networks</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              In the era of large-scale deep learning, the most interesting AI models are massive black boxes.
              We illuminate how these systems process inputs and make demystifying the "black box" of AI inference possible,
              enabling clearer, safer, and more explainable systems.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
