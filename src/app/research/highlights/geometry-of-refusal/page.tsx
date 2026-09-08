import type { Metadata } from "next";
import Header from "components/Header";
import Footer from "components/Footer";
import HighlightArticle from "components/research/HighlightArticle";
import { getHighlight } from "data/research-highlights";

const highlight = getHighlight("geometry-of-refusal")!;

export const metadata: Metadata = {
  title: `${highlight.headline.lead} ${highlight.headline.accent}`,
  description: highlight.subhead,
  openGraph: {
    title: `${highlight.headline.lead} ${highlight.headline.accent}`,
    description: highlight.subhead,
    url: `/research/highlights/${highlight.slug}`,
  },
};

export default function GeometryOfRefusalHighlightPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <HighlightArticle highlight={highlight} />
      </main>
      <Footer />
    </div>
  );
}
