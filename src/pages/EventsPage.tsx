import React from 'react';
import { PartyPopper, Calendar, MapPin, Camera, Video } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { PageHeader, EmptyState } from '@/components/common/PageComponents';
import { mockEvents } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import type { Event } from '@/lib/types';

export default function EventsPage() {
  const now = new Date();
  const upcomingEvents = mockEvents.filter(e => new Date(e.event_date) >= now);
  const pastEvents = mockEvents.filter(e => new Date(e.event_date) < now);

  return (
    <MainLayout>
      <div className="page-container py-8">
        <PageHeader
          title="Events & Gallery"
          description="Explore village events, festivals, and photo gallery"
          icon={PartyPopper}
        />

        {/* Upcoming Events */}
        {upcomingEvents.length > 0 && (
          <section className="mb-10">
            <h2 className="text-lg font-semibold text-foreground mb-4">Upcoming Events</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} isUpcoming />
              ))}
            </div>
          </section>
        )}

        {/* Past Events */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-4">Past Events & Gallery</h2>
          {pastEvents.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={PartyPopper}
              title="No past events"
              description="Event photos and details will appear here"
            />
          )}
        </section>
      </div>
    </MainLayout>
  );
}

function EventCard({ event, isUpcoming }: { event: Event; isUpcoming?: boolean }) {
  const eventDate = new Date(event.event_date);

  const typeColors: Record<string, string> = {
    FESTIVAL: 'bg-accent/10 text-accent',
    GOVT_PROGRAM: 'bg-info/10 text-info',
    CELEBRITY_VISIT: 'bg-warning/10 text-warning',
    CULTURAL: 'bg-success/10 text-success',
    OTHER: 'bg-muted text-muted-foreground',
  };

  const typeEmojis: Record<string, string> = {
    FESTIVAL: '🎉',
    GOVT_PROGRAM: '🏛️',
    CELEBRITY_VISIT: '⭐',
    CULTURAL: '🎭',
    OTHER: '📅',
  };

  return (
    <article className={cn(
      'card-elevated overflow-hidden group',
      isUpcoming && 'border-2 border-primary/20'
    )}>
      {/* Image placeholder */}
      <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center relative">
        <span className="text-6xl">{typeEmojis[event.event_type]}</span>
        {isUpcoming && (
          <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
            Upcoming
          </div>
        )}
        {event.media && event.media.length > 0 && (
          <div className="absolute bottom-3 right-3 flex gap-1">
            <span className="bg-foreground/70 text-background px-2 py-1 rounded text-xs flex items-center gap-1">
              <Camera className="w-3 h-3" />
              {event.media.filter(m => m.media_type === 'IMAGE').length}
            </span>
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex flex-col items-center justify-center flex-shrink-0">
            <span className="text-xs text-muted-foreground">
              {eventDate.toLocaleDateString('en', { month: 'short' })}
            </span>
            <span className="text-lg font-bold text-primary">
              {eventDate.getDate()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
              {event.title}
            </h3>
            <span className={cn(
              'inline-block text-xs px-2 py-0.5 rounded mt-1',
              typeColors[event.event_type]
            )}>
              {event.event_type.replace(/_/g, ' ')}
            </span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {event.description}
        </p>
      </div>
    </article>
  );
}
