import type { Metadata } from "next";
import { pageSeo } from "lib/seo";
import Header from "components/Header";
import Footer from "components/Footer";
import HighlightIndex from "components/research/HighlightIndex";

const DESC =
  "Long-form looks at high-impact research built with NNsight — what the authors found, and the interventions that got them there.";

export const metadata: Metadata = {
  title: "Research Highlights",
  description: DESC,
  ...pageSeo("/research/highlights/", "Research Highlights", DESC),
};

export default function ResearchHighlightsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <HighlightIndex />
      </main>
      <Footer />
    </div>
  );
}
