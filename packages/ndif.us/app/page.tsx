import Header from "components/Header";
import Hero from "components/Hero";
import Mission from "components/Mission";
import MissionCards from "components/MissionCards";
import Research from "components/Research";
import Footer from "components/Footer";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <Hero />
        <Mission />
        <MissionCards />
        <Research />
      </main>
      <Footer />
    </div>
  );
}
