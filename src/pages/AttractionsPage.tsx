import React, { useState } from 'react';
import { MapPinned, Navigation, Mountain, Church, Store, Trees, Filter } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { PageHeader, EmptyState } from '@/components/common/PageComponents';
import { Button } from '@/components/ui/button';
import { mockAttractions } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import type { Attraction } from '@/lib/types';

const typeFilters = [
  { value: '', label: 'All', icon: MapPinned },
  { value: 'RELIGIOUS', label: 'Religious', icon: Church },
  { value: 'HISTORICAL', label: 'Historical', icon: Mountain },
  { value: 'NATURE', label: 'Nature', icon: Trees },
  { value: 'MARKET', label: 'Market', icon: Store },
];

export default function AttractionsPage() {
  const [typeFilter, setTypeFilter] = useState('');
  const [showNearby, setShowNearby] = useState(false);

  const filteredAttractions = mockAttractions.filter((a) => {
    const matchesType = !typeFilter || a.type === typeFilter;
    const matchesNearby = !showNearby || a.is_nearby;
    return matchesType && matchesNearby;
  });

  const localAttractions = filteredAttractions.filter(a => !a.is_nearby);
  const nearbyAttractions = filteredAttractions.filter(a => a.is_nearby);

  return (
    <MainLayout>
      <div className="page-container py-8">
        <PageHeader
          title="Local Attractions"
          description="Explore tourist spots and interesting places in and around the village"
          icon={MapPinned}
        />

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {typeFilters.map((type) => (
            <Button
              key={type.value}
              variant={typeFilter === type.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTypeFilter(type.value)}
              className="gap-1.5"
            >
              <type.icon className="w-4 h-4" />
              {type.label}
            </Button>
          ))}
          <div className="w-px h-6 bg-border mx-2 self-center" />
          <Button
            variant={showNearby ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setShowNearby(!showNearby)}
          >
            <Navigation className="w-4 h-4 mr-1.5" />
            Nearby Only
          </Button>
        </div>

        {/* Local Attractions */}
        {localAttractions.length > 0 && (
          <section className="mb-10">
            <h2 className="text-lg font-semibold text-foreground mb-4">In Village</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {localAttractions.map((attraction) => (
                <AttractionCard key={attraction.id} attraction={attraction} />
              ))}
            </div>
          </section>
        )}

        {/* Nearby Attractions */}
        {nearbyAttractions.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-4">Nearby Attractions</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {nearbyAttractions.map((attraction) => (
                <AttractionCard key={attraction.id} attraction={attraction} />
              ))}
            </div>
          </section>
        )}

        {filteredAttractions.length === 0 && (
          <EmptyState
            icon={MapPinned}
            title="No attractions found"
            description="Try adjusting your filters"
            action={
              <Button variant="outline" onClick={() => {
                setTypeFilter('');
                setShowNearby(false);
              }}>
                Clear filters
              </Button>
            }
          />
        )}
      </div>
    </MainLayout>
  );
}

function AttractionCard({ attraction }: { attraction: Attraction }) {
  const typeIcons: Record<string, React.ReactNode> = {
    RELIGIOUS: <Church className="w-6 h-6" />,
    HISTORICAL: <Mountain className="w-6 h-6" />,
    NATURE: <Trees className="w-6 h-6" />,
    MARKET: <Store className="w-6 h-6" />,
    OTHER: <MapPinned className="w-6 h-6" />,
  };

  const typeColors: Record<string, string> = {
    RELIGIOUS: 'bg-amber-100 text-amber-700',
    HISTORICAL: 'bg-purple-100 text-purple-700',
    NATURE: 'bg-green-100 text-green-700',
    MARKET: 'bg-blue-100 text-blue-700',
    OTHER: 'bg-gray-100 text-gray-700',
  };

  return (
    <article className="card-elevated overflow-hidden group">
      {/* Image placeholder */}
      <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
        <div className={cn('w-16 h-16 rounded-full flex items-center justify-center', typeColors[attraction.type])}>
          {typeIcons[attraction.type]}
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
            {attraction.name}
          </h3>
          <span className={cn('text-xs px-2 py-0.5 rounded flex-shrink-0', typeColors[attraction.type])}>
            {attraction.type}
          </span>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {attraction.description}
        </p>

        {attraction.distance_km && (
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Navigation className="w-4 h-4 text-primary" />
            <span>{attraction.distance_km} km away</span>
          </div>
        )}
      </div>
    </article>
  );
}
