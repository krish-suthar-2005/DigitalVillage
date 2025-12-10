import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  ChevronDown,
  MapPin,
  Globe,
  Bell,
  Home,
  FileText,
  Users,
  Calendar,
  HardHat,
  MessageSquare,
  PartyPopper,
  MapPinned,
  Building2,
  Megaphone,
  Link2,
  Wallet,
  FileCheck,
  Package,
  Landmark,
} from 'lucide-react';
import { useVillage } from '@/context/VillageContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/schemes', label: 'Schemes', icon: FileText },
  { path: '/members', label: 'Members', icon: Users },
  { path: '/gram-sabha', label: 'Gram Sabha', icon: Calendar },
  { path: '/development', label: 'Development', icon: HardHat },
  { path: '/complaints', label: 'Complaints', icon: MessageSquare },
  { path: '/events', label: 'Events', icon: PartyPopper },
  { path: '/attractions', label: 'Attractions', icon: MapPinned },
  { path: '/amenities', label: 'Amenities', icon: Building2 },
  { path: '/announcements', label: 'Announcements', icon: Megaphone },
  { path: '/services', label: 'Services', icon: Link2 },
  { path: '/finance', label: 'Finance', icon: Wallet },
  { path: '/tenders', label: 'Tenders', icon: FileCheck },
  { path: '/assets', label: 'Assets', icon: Package },
  { path: '/taluka', label: 'Taluka', icon: Landmark },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [villageDropdownOpen, setVillageDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const { selectedVillage, setSelectedVillage, villages, language, setLanguage, languages } = useVillage();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-sm border-b border-border shadow-sm">
      {/* Skip link for accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <Link to="/" className="flex items-center gap-3 no-highlight">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Landmark className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold text-foreground">Gram Panchayat</h1>
              <p className="text-xs text-muted-foreground">Digital Village Portal</p>
            </div>
          </Link>

          {/* Center: Village & Language selectors (desktop) */}
          <div className="hidden md:flex items-center gap-3">
            {/* Village Selector */}
            <div className="relative">
              <button
                onClick={() => {
                  setVillageDropdownOpen(!villageDropdownOpen);
                  setLangDropdownOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
              >
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">
                  {selectedVillage ? selectedVillage.name : 'Select Village'}
                </span>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </button>

              {villageDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setVillageDropdownOpen(false)}
                  />
                  <div className="absolute top-full mt-2 left-0 w-48 bg-card border border-border rounded-lg shadow-lg z-20 py-1">
                    {villages.map((village) => (
                      <button
                        key={village.id}
                        onClick={() => {
                          setSelectedVillage(village);
                          setVillageDropdownOpen(false);
                        }}
                        className={cn(
                          'w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors',
                          selectedVillage?.id === village.id && 'bg-muted font-medium'
                        )}
                      >
                        {village.name}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => {
                  setLangDropdownOpen(!langDropdownOpen);
                  setVillageDropdownOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
              >
                <Globe className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">
                  {languages.find(l => l.code === language)?.nativeName}
                </span>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </button>

              {langDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setLangDropdownOpen(false)}
                  />
                  <div className="absolute top-full mt-2 left-0 w-40 bg-card border border-border rounded-lg shadow-lg z-20 py-1">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setLangDropdownOpen(false);
                        }}
                        className={cn(
                          'w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors',
                          language === lang.code && 'bg-muted font-medium'
                        )}
                      >
                        {lang.nativeName} ({lang.name})
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right: Notifications & Mobile menu toggle */}
          <div className="flex items-center gap-2">
            <button
              className="relative p-2 hover:bg-muted rounded-lg transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 text-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 py-2 overflow-x-auto">
          {navItems.slice(0, 8).map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md transition-colors whitespace-nowrap no-highlight',
                location.pathname === item.path
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
          {/* More dropdown for remaining items */}
          <div className="relative group">
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
              More
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute top-full left-0 mt-1 w-48 bg-card border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all py-1 z-20">
              {navItems.slice(8).map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted transition-colors no-highlight',
                    location.pathname === item.path && 'bg-muted font-medium'
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-card">
          {/* Mobile Village & Language */}
          <div className="p-4 border-b border-border grid grid-cols-2 gap-3">
            <select
              value={selectedVillage?.id || ''}
              onChange={(e) => {
                const village = villages.find(v => v.id === parseInt(e.target.value));
                if (village) setSelectedVillage(village);
              }}
              className="form-input text-sm"
            >
              <option value="">Select Village</option>
              {villages.map((v) => (
                <option key={v.id} value={v.id}>{v.name}</option>
              ))}
            </select>

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as 'en' | 'gu' | 'hi')}
              className="form-input text-sm"
            >
              {languages.map((l) => (
                <option key={l.code} value={l.code}>{l.nativeName}</option>
              ))}
            </select>
          </div>

          {/* Mobile Nav */}
          <nav className="p-4 grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'flex items-center gap-2 px-3 py-2.5 text-sm rounded-lg transition-colors no-highlight',
                  location.pathname === item.path
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-muted-foreground hover:bg-muted'
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
