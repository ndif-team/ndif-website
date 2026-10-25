import type { Metadata } from "next";
import { pageSeo } from "lib/seo";
import Header from "components/Header";
import Footer from "components/Footer";
import HighlightArticle from "components/research/HighlightArticle";
import { getHighlight } from "data/research-highlights";

const highlight = getHighlight("interplm")!;

const title = `${highlight.headline.lead} ${highlight.headline.accent}`;

export const metadata: Metadata = {
  title,
  description: highlight.subhead,
  ...pageSeo(`/research/highlights/${highlight.slug}/`, title, highlight.subhead),
};

export default function InterPLMHighlightPage() {
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
