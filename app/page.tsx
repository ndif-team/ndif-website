import Header from "components/Header";
import Hero from "components/Hero";
import SupportedBy from "components/SupportedBy";
import Stats from "components/Stats";
import WhatIsNDIF from "components/WhatIsNDIF";
import ModelCards from "components/ModelCards";
import FeaturedResearch from "components/FeaturedResearch";
import FeaturedCode from "components/FeaturedCode";
import GetStarted from "components/GetStarted";
import CommunityCTA from "components/CommunityCTA";
import Footer from "components/Footer";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <Hero />
        <SupportedBy />
        <Stats />
        <WhatIsNDIF />
        <ModelCards />
        <FeaturedResearch />
        <FeaturedCode />
        <GetStarted />
        <CommunityCTA />
      </main>
      <Footer />
    </div>
  );
}
