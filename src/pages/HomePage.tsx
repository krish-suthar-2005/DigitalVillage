import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Users,
  Calendar,
  HardHat,
  MessageSquare,
  PartyPopper,
  MapPinned,
  Building2,
  Megaphone,
  ArrowRight,
  ChevronRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  MapPin,
} from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { useVillage } from '@/context/VillageContext';
import { useTranslation } from '@/hooks/useTranslation';
import { VillageSelectorModal } from '@/components/common/VillageSelectorModal';
import { StatCard, StatusBadge } from '@/components/common/PageComponents';
import { Button } from '@/components/ui/button';
import {
  mockAnnouncements,
  mockDevelopmentWorks,
  mockComplaints,
  mockEvents,
  mockSchemes,
} from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { getStoredOnboarding } from '@/lib/location-data';

const quickLinks = [
  { to: '/schemes', labelKey: 'governmentSchemes', icon: FileText, color: 'bg-info/10 text-info' },
  { to: '/members', labelKey: 'panchayatMembers', icon: Users, color: 'bg-success/10 text-success' },
  { to: '/gram-sabha', labelKey: 'gramSabha', icon: Calendar, color: 'bg-warning/10 text-warning' },
  { to: '/development', labelKey: 'developmentWorks', icon: HardHat, color: 'bg-primary/10 text-primary' },
  { to: '/complaints', labelKey: 'fileComplaint', icon: MessageSquare, color: 'bg-destructive/10 text-destructive' },
  { to: '/events', labelKey: 'events', icon: PartyPopper, color: 'bg-accent/10 text-accent-foreground' },
  { to: '/attractions', labelKey: 'localAttractions', icon: MapPinned, color: 'bg-secondary/10 text-secondary-foreground' },
  { to: '/amenities', labelKey: 'amenities', icon: Building2, color: 'bg-info/10 text-info' },
] as const;

export default function HomePage() {
  const { selectedVillage, isLoading } = useVillage();
  const { t } = useTranslation();
  const [showVillageSelector, setShowVillageSelector] = useState(false);
  const onboardingData = getStoredOnboarding();

  useEffect(() => {
    if (!isLoading && !selectedVillage) {
      setShowVillageSelector(true);
    }
  }, [isLoading, selectedVillage]);

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden" style={{ background: 'var(--gradient-hero)' }}>
        <div className="page-container relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground animate-fade-in">
              {t('welcomeTo')}{' '}
              <span className="text-gradient">
                {selectedVillage ? selectedVillage.name : t('villageName')}
              </span>{' '}
              {t('gramPanchayat')}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground animate-slide-up" style={{ animationDelay: '0.1s' }}>
              {t('heroDescription')}
            </p>
            <div className="mt-6 flex flex-wrap gap-3 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Button asChild size="lg">
                <Link to="/schemes">
                  {t('exploreSchemes')}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/complaints">{t('fileComplaint')}</Link>
              </Button>
            </div>
            {/* Location badge from onboarding */}
            {onboardingData && (
              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-card/80 backdrop-blur-sm border border-border px-4 py-2 text-sm text-muted-foreground animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                <span>
                  {onboardingData.villageName}, {onboardingData.talukaName}, {onboardingData.districtName}, {onboardingData.stateName}
                </span>
              </div>
            )}
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <svg viewBox="0 0 400 400" className="w-full h-full">
            <circle cx="300" cy="100" r="80" fill="currentColor" className="text-primary" />
            <circle cx="350" cy="250" r="50" fill="currentColor" className="text-primary" />
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="page-container mt-8 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title={t('activeSchemes')}
            value={mockSchemes.length}
            icon={FileText}
          />
          <StatCard
            title={t('developmentWorks')}
            value={mockDevelopmentWorks.length}
            icon={HardHat}
          />
          <StatCard
            title={t('pendingComplaints')}
            value={mockComplaints.filter(c => c.status !== 'RESOLVED').length}
            icon={AlertCircle}
          />
          <StatCard
            title={t('resolutionRate')}
            value="87%"
            icon={CheckCircle2}
            trend={{ value: 5, isPositive: true }}
          />
        </div>
      </section>

      {/* Quick Links */}
      <section className="page-container py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="section-header mb-0">{t('quickAccess')}</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {quickLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="card-elevated p-4 flex flex-col items-center text-center hover:shadow-lg transition-all duration-300 group no-highlight"
            >
              <div className={cn('w-12 h-12 rounded-lg flex items-center justify-center mb-3', link.color)}>
                <link.icon className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                {t(link.labelKey as keyof typeof t)}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Announcements & Development Works */}
      <section className="page-container pb-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Announcements */}
          <div className="card-elevated p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-primary" />
                {t('latestAnnouncements')}
              </h2>
              <Link to="/announcements" className="text-sm text-primary hover:underline no-highlight">
                {t('viewAll')}
              </Link>
            </div>
            <div className="space-y-4">
              {mockAnnouncements.slice(0, 3).map((announcement) => (
                <article key={announcement.id} className="flex gap-3 pb-4 border-b border-border last:border-0 last:pb-0">
                  <div className={cn(
                    'w-2 rounded-full flex-shrink-0',
                    announcement.type === 'EMERGENCY' ? 'bg-destructive' :
                      announcement.type === 'MEETING' ? 'bg-warning' : 'bg-info'
                  )} />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground text-sm line-clamp-1">
                      {announcement.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {announcement.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(announcement.start_date).toLocaleDateString()}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Development Works */}
          <div className="card-elevated p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <HardHat className="w-5 h-5 text-primary" />
                {t('ongoingDevelopment')}
              </h2>
              <Link to="/development" className="text-sm text-primary hover:underline no-highlight">
                {t('viewAll')}
              </Link>
            </div>
            <div className="space-y-4">
              {mockDevelopmentWorks.filter(w => w.status !== 'COMPLETED').slice(0, 3).map((work) => (
                <article key={work.id} className="pb-4 border-b border-border last:border-0 last:pb-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-medium text-foreground text-sm line-clamp-1">{work.title}</h3>
                    <StatusBadge status={work.status} />
                  </div>
                  {work.progress_percentage !== undefined && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                        <span>{t('progress')}</span>
                        <span>{work.progress_percentage}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all duration-500"
                          style={{ width: `${work.progress_percentage}%` }}
                        />
                      </div>
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground mt-2">
                    {t('budget')}: ₹{(work.estimated_cost / 100000).toFixed(1)} {t('lakh')}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recent Events & Schemes */}
      <section className="page-container pb-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upcoming Events */}
          <div className="card-elevated p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <PartyPopper className="w-5 h-5 text-primary" />
                {t('upcomingEvents')}
              </h2>
              <Link to="/events" className="text-sm text-primary hover:underline no-highlight">
                {t('viewAll')}
              </Link>
            </div>
            <div className="space-y-3">
              {mockEvents.slice(0, 3).map((event) => (
                <Link
                  key={event.id}
                  to={`/events/${event.id}`}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors group no-highlight"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex flex-col items-center justify-center flex-shrink-0">
                    <span className="text-xs text-muted-foreground">
                      {new Date(event.event_date).toLocaleDateString('en', { month: 'short' })}
                    </span>
                    <span className="text-lg font-bold text-primary">
                      {new Date(event.event_date).getDate()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground text-sm line-clamp-1 group-hover:text-primary transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-xs text-muted-foreground capitalize">
                      {event.event_type.replace(/_/g, ' ').toLowerCase()}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </Link>
              ))}
            </div>
          </div>

          {/* Popular Schemes */}
          <div className="card-elevated p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                {t('popularSchemes')}
              </h2>
              <Link to="/schemes" className="text-sm text-primary hover:underline no-highlight">
                {t('viewAll')}
              </Link>
            </div>
            <div className="space-y-3">
              {mockSchemes.slice(0, 3).map((scheme) => (
                <Link
                  key={scheme.id}
                  to={`/schemes/${scheme.id}`}
                  className="block p-3 rounded-lg hover:bg-muted transition-colors group no-highlight"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground text-sm line-clamp-1 group-hover:text-primary transition-colors">
                        {scheme.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {scheme.short_description}
                      </p>
                    </div>
                    <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded capitalize flex-shrink-0">
                      {scheme.category.toLowerCase()}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Village Selector Modal */}
      <VillageSelectorModal
        isOpen={showVillageSelector}
        onClose={() => setShowVillageSelector(false)}
      />
    </MainLayout>
  );
}
