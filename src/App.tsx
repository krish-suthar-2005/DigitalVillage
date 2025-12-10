import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import { AccessibilityProvider } from "@/context/AccessibilityContext";
import { VillageProvider } from "@/context/VillageContext";

import HomePage from "./pages/HomePage";
import SchemesPage from "./pages/SchemesPage";
import MembersPage from "./pages/MembersPage";
import GramSabhaPage from "./pages/GramSabhaPage";
import DevelopmentPage from "./pages/DevelopmentPage";
import ComplaintsPage from "./pages/ComplaintsPage";
import EventsPage from "./pages/EventsPage";
import AttractionsPage from "./pages/AttractionsPage";
import AmenitiesPage from "./pages/AmenitiesPage";
import AnnouncementsPage from "./pages/AnnouncementsPage";
import ServicesPage from "./pages/ServicesPage";
import { FinancePage, TendersPage, AssetsPage, TalukaPage } from "./pages/OtherPages";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AccessibilityProvider>
        <VillageProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/schemes" element={<SchemesPage />} />
                <Route path="/members" element={<MembersPage />} />
                <Route path="/gram-sabha" element={<GramSabhaPage />} />
                <Route path="/development" element={<DevelopmentPage />} />
                <Route path="/complaints" element={<ComplaintsPage />} />
                <Route path="/events" element={<EventsPage />} />
                <Route path="/attractions" element={<AttractionsPage />} />
                <Route path="/amenities" element={<AmenitiesPage />} />
                <Route path="/announcements" element={<AnnouncementsPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/finance" element={<FinancePage />} />
                <Route path="/tenders" element={<TendersPage />} />
                <Route path="/assets" element={<AssetsPage />} />
                <Route path="/taluka" element={<TalukaPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </VillageProvider>
      </AccessibilityProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
