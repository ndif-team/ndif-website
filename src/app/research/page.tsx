import type { Metadata } from "next";
import { Suspense } from "react";
import Header from "components/Header";
import Footer from "components/Footer";
import ResearchCitation from "components/research/ResearchCitation";
import ResearchTabs from "components/research/ResearchTabs";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Citing NDIF in your research. Browse published papers and open-source repos using or referencing NDIF and NNsight.",
};

export default function ResearchPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <ResearchCitation />
        <Suspense fallback={null}>
          <ResearchTabs />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
