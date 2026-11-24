import type { Metadata } from "next";
import { pageSeo } from "lib/seo";
import Header from "components/Header";
import Footer from "components/Footer";
import CareersHero from "components/careers/CareersHero";
import CommunityJobs from "components/community/CommunityJobs";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Open roles at NDIF across science, engineering, communication, and operations, based at Northeastern University's Khoury College of Computer Sciences.",
  ...pageSeo("/careers/"),
};

// The role listing is the same component (and data/jobs.ts source) the
// Community page renders, so a role only ever needs editing in one place.
export default function CareersPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <CareersHero />
        <CommunityJobs />
      </main>
      <Footer />
    </div>
  );
}
