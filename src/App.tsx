import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import JumpStart from "./pages/JumpStart";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import LegalDisclaimer from "./pages/LegalDisclaimer";
import AnnouncementBar from "./components/AnnouncementBar";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const showAnnouncementBar = location.pathname !== '/jump-start';
  
  return (
    <>
      {showAnnouncementBar && <AnnouncementBar />}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/jump-start" element={<JumpStart />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/legal-disclaimer" element={<LegalDisclaimer />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
