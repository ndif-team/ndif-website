import type { Metadata } from "next";
import Header from "components/Header";
import AboutStory from "components/AboutStory";
import FabricParts from "components/fabric/FabricParts";
import FabricFAQ from "components/fabric/FabricFAQ";
import TeamGrid from "components/TeamGrid";
import PartnersSection from "components/PartnersSection";
import AdvisoryBoardGrid from "components/AdvisoryBoardGrid";
import ContactSection from "components/ContactSection";
import Footer from "components/Footer";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about NDIF's mission, its three parts, meet our team, and discover our partners working to democratize access to large-scale AI model internals.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <AboutStory />
        <FabricParts />
        <TeamGrid />
        <PartnersSection />
        <AdvisoryBoardGrid />
        <FabricFAQ />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
