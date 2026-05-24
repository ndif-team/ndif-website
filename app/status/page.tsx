import type { Metadata } from "next";
import Header from "components/Header";
import Footer from "components/Footer";
import StatusDashboard from "components/status/StatusDashboard";

export const metadata: Metadata = {
  title: "Status",
  description:
    "Live status dashboard for the NDIF cluster — view model availability, deployment levels, GPU utilization, and system health in real time.",
};

export default function StatusPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <StatusDashboard />
      </main>
      <Footer />
    </div>
  );
}
