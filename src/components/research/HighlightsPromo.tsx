import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import AnimateOnScroll, { StaggerContainer, StaggerItem } from "../AnimateOnScroll";
import HighlightCard from "./HighlightCard";
import { researchHighlights } from "data/research-highlights";

/** Entry point to /research/highlights, shown on the Research page. */
export default function HighlightsPromo() {
  return (
    <section className="py-16 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
                Research Highlights
              </h2>
              <p className="max-w-2xl text-slate-600 dark:text-slate-400 leading-relaxed">
                Closer looks at high-impact work built with NNsight — what the
                authors found, and the interventions that got them there.
              </p>
            </div>
            <Link
              href="/research/highlights"
              className="group inline-flex items-center gap-1.5 text-brand-600 dark:text-brand-400 font-semibold text-sm hover:underline underline-offset-4"
            >
              See all highlights
              <FiArrowRight
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        </AnimateOnScroll>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6" staggerDelay={0.08}>
          {researchHighlights.slice(0, 2).map((highlight) => (
            <StaggerItem key={highlight.slug}>
              <HighlightCard highlight={highlight} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
