import React, { useState, memo } from 'react';
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
  Eye,
} from 'lucide-react';
import { useVillage } from '@/context/VillageContext';
import { useTranslation } from '@/hooks/useTranslation';
import { useLiveUserCount } from '@/hooks/useLiveUserCount';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/', labelKey: 'home', icon: Home },
  { path: '/schemes', labelKey: 'schemes', icon: FileText },
  { path: '/members', labelKey: 'members', icon: Users },
  { path: '/gram-sabha', labelKey: 'gramSabha', icon: Calendar },
  { path: '/development', labelKey: 'development', icon: HardHat },
  { path: '/complaints', labelKey: 'complaints', icon: MessageSquare },
  { path: '/events', labelKey: 'events', icon: PartyPopper },
  { path: '/attractions', labelKey: 'attractions', icon: MapPinned },
  { path: '/amenities', labelKey: 'amenities', icon: Building2 },
  { path: '/announcements', labelKey: 'announcements', icon: Megaphone },
  { path: '/services', labelKey: 'services', icon: Link2 },
  { path: '/finance', labelKey: 'finance', icon: Wallet },
  { path: '/tenders', labelKey: 'tenders', icon: FileCheck },
  { path: '/assets', labelKey: 'assets', icon: Package },
  { path: '/taluka', labelKey: 'taluka', icon: Landmark },
] as const;

// Live User Counter Component
const LiveUserCounter = memo(function LiveUserCounter() {
  const { count, isLoading } = useLiveUserCount();
  const { t } = useTranslation();
  
  if (isLoading) {
    return (
      <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-muted rounded-full animate-pulse">
        <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
        <span className="text-xs text-muted-foreground">--</span>
      </div>
    );
  }
  
  return (
    <div 
      className="flex items-center gap-1.5 px-2.5 py-1.5 bg-success/10 rounded-full border border-success/20"
      title={t('usersOnline')}
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
      </span>
      <Eye className="w-3.5 h-3.5 text-success" />
      <span className="text-xs font-medium text-success">
        {count.toLocaleString()}
      </span>
    </div>
  );
});

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [villageDropdownOpen, setVillageDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const { selectedVillage, setSelectedVillage, villages, language, setLanguage, languages } = useVillage();
  const { t } = useTranslation();
  const location = useLocation();

  const closeAllDropdowns = () => {
    setVillageDropdownOpen(false);
    setLangDropdownOpen(false);
  };

  const getNavLabel = (labelKey: string) => {
    return t(labelKey as keyof typeof t);
  };

  return (
    <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-sm border-b border-border shadow-sm">
      {/* Skip link for accessibility */}
      <a href="#main-content" className="skip-link">
        {t('skipToContent')}
      </a>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <Link to="/" className="flex items-center gap-3 no-highlight" onClick={closeAllDropdowns}>
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Landmark className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold text-foreground">{t('gramPanchayat')}</h1>
              <p className="text-xs text-muted-foreground">{t('digitalVillagePortal')}</p>
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
                aria-expanded={villageDropdownOpen}
                aria-haspopup="listbox"
              >
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">
                  {selectedVillage ? selectedVillage.name : t('selectVillage')}
                </span>
                <ChevronDown className={cn("w-4 h-4 text-muted-foreground transition-transform", villageDropdownOpen && "rotate-180")} />
              </button>

              {villageDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setVillageDropdownOpen(false)}
                  />
                  <div className="absolute top-full mt-2 left-0 w-48 bg-card border border-border rounded-lg shadow-lg z-20 py-1 max-h-64 overflow-y-auto">
                    {villages.map((village) => (
                      <button
                        key={village.id}
                        onClick={() => {
                          setSelectedVillage(village);
                          setVillageDropdownOpen(false);
                        }}
                        className={cn(
                          'w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors',
                          selectedVillage?.id === village.id && 'bg-muted font-medium text-primary'
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
                aria-expanded={langDropdownOpen}
                aria-haspopup="listbox"
              >
                <Globe className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">
                  {languages.find(l => l.code === language)?.nativeName}
                </span>
                <ChevronDown className={cn("w-4 h-4 text-muted-foreground transition-transform", langDropdownOpen && "rotate-180")} />
              </button>

              {langDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setLangDropdownOpen(false)}
                  />
                  <div className="absolute top-full mt-2 left-0 w-44 bg-card border border-border rounded-lg shadow-lg z-20 py-1">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setLangDropdownOpen(false);
                        }}
                        className={cn(
                          'w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors',
                          language === lang.code && 'bg-muted font-medium text-primary'
                        )}
                      >
                        <span className="font-medium">{lang.nativeName}</span>
                        <span className="text-muted-foreground ml-1">({lang.name})</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right: Live Counter, Notifications & Mobile menu toggle */}
          <div className="flex items-center gap-2">
            {/* Live User Counter */}
            <div className="hidden sm:block">
              <LiveUserCounter />
            </div>
            
            <button
              className="relative p-2 hover:bg-muted rounded-lg transition-colors"
              aria-label={t('notifications')}
            >
              <Bell className="w-5 h-5 text-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                closeAllDropdowns();
              }}
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
        <nav className="hidden md:flex items-center gap-1 py-2 overflow-x-auto scrollbar-none">
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
              {getNavLabel(item.labelKey)}
            </Link>
          ))}
          {/* More dropdown for remaining items */}
          <div className="relative group">
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
              {t('more')}
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
                  {getNavLabel(item.labelKey)}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-card animate-fade-in">
          {/* Mobile Live Counter */}
          <div className="p-4 border-b border-border flex justify-center">
            <LiveUserCounter />
          </div>
          
          {/* Mobile Village & Language */}
          <div className="p-4 border-b border-border grid grid-cols-2 gap-3">
            <select
              value={selectedVillage?.id || ''}
              onChange={(e) => {
                const village = villages.find(v => v.id === parseInt(e.target.value));
                if (village) setSelectedVillage(village);
              }}
              className="form-input text-sm"
              aria-label={t('selectVillage')}
            >
              <option value="">{t('selectVillage')}</option>
              {villages.map((v) => (
                <option key={v.id} value={v.id}>{v.name}</option>
              ))}
            </select>

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as 'en' | 'gu' | 'hi')}
              className="form-input text-sm"
              aria-label={t('selectLanguage')}
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
                {getNavLabel(item.labelKey)}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
