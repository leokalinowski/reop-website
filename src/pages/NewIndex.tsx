import Navigation from "@/components/Navigation";
import Hero from "@/components/sections/Hero";
import ProblemSection from "@/components/sections/ProblemSection";
import AgentOpsHQ from "@/components/sections/AgentOpsHQ";
import ComparisonTable from "@/components/sections/ComparisonTable";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FreeResourceSection from "@/components/sections/FreeResourceSection";
import PersonalInvitation from "@/components/sections/PersonalInvitation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const NewIndex = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Real Estate on Purpose® | Build a Business that Loves You Back"
        description="Everything you need to build a thriving, referral-based business — whether you want to do it yourself or have us do it for you."
      />
      
      <Navigation />
      
      <main>
        <Hero />
        <ProblemSection />
        <AgentOpsHQ />
        <ComparisonTable />
        <TestimonialsSection />
        <FreeResourceSection />
        <PersonalInvitation />
      </main>
      
      <Footer />
    </div>
  );
};

export default NewIndex;
