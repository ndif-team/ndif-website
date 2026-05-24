import type { Metadata } from "next";
import Link from "next/link";
import Header from "components/Header";
import Footer from "components/Footer";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-mono text-sm uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-6">
            404 · Page Not Found
          </p>
          <h1
            className="font-display text-5xl md:text-7xl font-bold mb-6 text-slate-900 dark:text-white"
            style={{ letterSpacing: "-0.02em", textWrap: "balance" }}
          >
            We can&apos;t find that <span className="text-gradient">page</span>.
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-12 leading-relaxed">
            The link you followed may be broken, or the page may have been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-8 py-4 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
            >
              Back to home
            </Link>
            <Link
              href="/get-started"
              className="px-8 py-4 rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 hover:border-brand-500 transition-all text-slate-900 dark:text-white font-semibold"
            >
              Get started with NDIF
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
