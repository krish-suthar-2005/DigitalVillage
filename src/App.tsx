import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import { AccessibilityProvider } from "@/context/AccessibilityContext";
import { VillageProvider } from "@/context/VillageContext";
import { ThemeEngineProvider } from "@/context/ThemeEngineContext";
import { ThemePicker } from "@/components/theme/ThemePicker";
import { ThemeAnimations } from "@/components/theme/ThemeAnimations";

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
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ContactPage from "./pages/ContactPage";
import GalleryPage from "./pages/GalleryPage";
import MarketPage from "./pages/MarketPage";
import PriasoftPage from "./pages/PriasoftPage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeEngineProvider>
      <ThemeProvider>
        <AccessibilityProvider>
          <VillageProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <ThemeAnimations />
              <ThemePicker />
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
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/gallery" element={<GalleryPage />} />
                  <Route path="/market" element={<MarketPage />} />
                  <Route path="/priasoft" element={<PriasoftPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </VillageProvider>
        </AccessibilityProvider>
      </ThemeProvider>
    </ThemeEngineProvider>
  </QueryClientProvider>
);

export default App;
