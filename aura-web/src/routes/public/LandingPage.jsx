import React from "react";
import HeroSection from "../../components/sections/HeroSection";
import FeaturesSection from "../../components/sections/FeaturesSection";
import HowItWorksSection from "../../components/sections/HowItWorksSection";
import ComponentShowcase from "../../components/sections/ComponentShowcase";
import InstallCtaSection from "../../components/sections/InstallCtaSection";

function LandingPage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <ComponentShowcase />
      <InstallCtaSection />
    </>
  );
}

export default LandingPage;
