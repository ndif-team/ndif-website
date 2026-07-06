import type { Metadata } from "next";
import Header from "components/Header";
import Footer from "components/Footer";
import ToolsSection from "components/ToolsSection";

export const metadata: Metadata = {
  title: "Tools",
  description:
    "The NDIF ecosystem of open-source tools for interpretability research: the NDIF remote inference fabric, the NNsight library, NNterp, and NDIF Workbench.",
};

export default function ToolsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <ToolsSection />
      </main>
      <Footer />
    </div>
  );
}
