import React from 'react';
import Navigation from '@/components/Navigation';
import NewHeroSection from '@/components/home/NewHeroSection';
import ProblemSection from '@/components/home/ProblemSection';
import AgentOpsHQ from '@/components/home/AgentOpsHQ';
import SupportedAgentModel from '@/components/home/SupportedAgentModel';
import ProofSection from '@/components/home/ProofSection';
import FreeResourceSection from '@/components/home/FreeResourceSection';
import PersonalInvitation from '@/components/home/PersonalInvitation';
import SoftClose from '@/components/home/SoftClose';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navigation />
      <main>
        <NewHeroSection />
        <ProblemSection />
        <AgentOpsHQ />
        <SupportedAgentModel />
        <ProofSection />
        <FreeResourceSection />
        <PersonalInvitation />
        <SoftClose />
      </main>
    </div>
  );
};

export default Index;