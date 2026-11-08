import Navbar from "./Navbar";
import Footer from "./Footer";
import Hero from "./Hero";
import Features from "./Features";
import HowItWorks from "./HowItWorks";
import Premium from "./Premium";
import DashboardPreview from "./DashboardPreview";
import Testimonials from "./Testimonials";

import CallToAction from "./CallToAction";
import Faq from "./Faq";

import { useEffect } from "react";

function LandingPage() {
  useEffect(() => {
    document.title = "TechDevTinder — Developer Networking Platform";

    const description =
      "Discover developers by stack and interest, send connection requests, chat with your connections and upgrade to Premium for unlimited networking.";

    let metaDescription = document.querySelector('meta[name="description"]');

    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }

    metaDescription.setAttribute("content", description);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Premium />
        <DashboardPreview />
        <Testimonials />
        <Faq />
      </main>
      <CallToAction />
      <Footer />
    </div>
  );
}

export default LandingPage;
