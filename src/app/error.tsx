"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error("Unhandled route error:", error);
  }, [error]);

  return (
    <div className="flex flex-col min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8 py-24 bg-white dark:bg-surface-950 text-slate-900 dark:text-slate-50">
      <div className="max-w-2xl mx-auto text-center">
        <p className="font-mono text-sm uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-6">
          500 · Something went wrong
        </p>
        <h1
          className="font-display text-5xl md:text-7xl font-bold mb-6"
          style={{ letterSpacing: "-0.02em", textWrap: "balance" }}
        >
          Unexpected <span className="text-gradient">error</span>.
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-12 leading-relaxed">
          We hit a snag rendering this page. You can try again, or head back to the
          homepage.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            type="button"
            onClick={reset}
            className="px-8 py-4 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-8 py-4 rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 hover:border-brand-500 transition-all font-semibold"
          >
            Back to home
          </Link>
        </div>
        {error.digest && (
          <p className="mt-8 font-mono text-xs text-slate-400 dark:text-slate-600">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
