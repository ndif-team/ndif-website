import type { Metadata } from "next";
import Header from "components/Header";
import Footer from "components/Footer";
import HighlightIndex from "components/research/HighlightIndex";

export const metadata: Metadata = {
  title: "Research Highlights",
  description:
    "Long-form looks at high-impact research built with NNsight — what the authors found, and the interventions that got them there.",
  openGraph: {
    title: "Research Highlights",
    description:
      "Long-form looks at high-impact research built with NNsight — what the authors found, and the interventions that got them there.",
    url: "/research/highlights",
  },
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
