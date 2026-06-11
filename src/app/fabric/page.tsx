import type { Metadata } from "next";
import Header from "components/Header";
import Footer from "components/Footer";
import FabricHero from "components/fabric/FabricHero";
import FabricParts from "components/fabric/FabricParts";
import FabricFAQ from "components/fabric/FabricFAQ";
import FabricCitation from "components/fabric/FabricCitation";

export const metadata: Metadata = {
  title: "The Fabric",
  description:
    "Learn about the three parts of NDIF: the HPC fabric powered by NCSA's Delta, the NNsight open-source library, and our nationwide training program.",
};

export default function FabricPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <FabricHero />
        <FabricParts />
        <FabricFAQ />
        <FabricCitation />
      </main>
      <Footer />
    </div>
  );
}
