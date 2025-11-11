import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import NewIndex from "./pages/NewIndex";
import Index from "./pages/Index";
import JumpStart from "./pages/JumpStart";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Resources from "./pages/Resources";
import Resource from "./pages/Resource";
import ResourceThankYou from "./pages/ResourceThankYou";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminBlogPosts from "./pages/admin/BlogPosts";
import AdminBlogPostEditor from "./pages/admin/BlogPostEditor";
import AdminResourcesManager from "./pages/admin/ResourcesManager";
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
        <Route path="/" element={<NewIndex />} />
        <Route path="/old" element={<Index />} />
        <Route path="/jump-start" element={<JumpStart />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/resources/:slug" element={<Resource />} />
        <Route path="/resources/thank-you" element={<ResourceThankYou />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/blog-posts" element={<AdminBlogPosts />} />
        <Route path="/admin/blog-posts/:id" element={<AdminBlogPostEditor />} />
        <Route path="/admin/resources" element={<AdminResourcesManager />} />
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
