export default function MissionCards() {
  return (
    <section id="mission" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Our Mission
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-brand-500 to-accent-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="card-glass p-8 rounded-2xl">
            <div className="w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center mb-6 text-brand-400 border border-slate-700">
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">
              Enable Deep Inference
            </h3>
            <p className="text-slate-400 leading-relaxed">
              NDIF provides the infrastructure to "crack open" neural networks,
              allowing researchers to observe and intervene in the inference
              process in real-time.
            </p>
          </div>

          {/* Card 2 */}
          <div className="card-glass p-8 rounded-2xl">
            <div className="w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center mb-6 text-accent-400 border border-slate-700">
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">
              Empower Researchers
            </h3>
            <p className="text-slate-400 leading-relaxed">
              We democratize access to the computational power needed to analyze
              LLMs, supporting students and scientists across the nation.
            </p>
          </div>

          {/* Card 3 */}
          <div className="card-glass p-8 rounded-2xl">
            <div className="w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center mb-6 text-teal-400 border border-slate-700">
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">
              Ensure Interpretability
            </h3>
            <p className="text-slate-400 leading-relaxed">
              Moving from black-box alchemy to engineered understanding. We aim to
              make AI predictions transparent, explainable, and safer for society.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
