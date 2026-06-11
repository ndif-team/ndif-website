import type { Metadata } from "next";
import Header from "components/Header";
import Footer from "components/Footer";
import GetStartedHero from "components/get-started/GetStartedHero";
import GetStartedIntro from "components/get-started/GetStartedIntro";
import GetStartedSteps from "components/get-started/GetStartedSteps";
import GetStartedFollow from "components/get-started/GetStartedFollow";

export const metadata: Metadata = {
  title: "Get Started",
  description:
    "Get started with NDIF and NNsight — install the library, register for a free API key, access LLM internals remotely, and join the community.",
};

export default function GetStartedPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <GetStartedHero />
        <GetStartedIntro />
        <GetStartedSteps />
        <GetStartedFollow />
      </main>
      <Footer />
    </div>
  );
}
