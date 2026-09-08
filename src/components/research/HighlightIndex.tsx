import AnimateOnScroll, { StaggerContainer, StaggerItem } from "../AnimateOnScroll";
import HighlightCard from "./HighlightCard";
import { researchHighlights } from "data/research-highlights";

export default function HighlightIndex() {
  return (
    <section className="pt-28 pb-20 lg:pt-36 lg:pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll className="text-center mb-14">
          <h1
            className="font-display text-4xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white"
            style={{ textWrap: "balance" }}
          >
            Research <span className="text-gradient">Highlights</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-brand mx-auto rounded-full mb-6" aria-hidden="true" />
          <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Closer looks at high-impact work built with NNsight — what the
            authors found, and the interventions that got them there.
          </p>
        </AnimateOnScroll>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6" staggerDelay={0.08}>
          {researchHighlights.map((highlight) => (
            <StaggerItem key={highlight.slug}>
              <HighlightCard highlight={highlight} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
