import React, { useState } from 'react';
import { Building2, Phone, Clock, MapPin, Filter, Search } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { PageHeader, EmptyState } from '@/components/common/PageComponents';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockAmenities } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import type { Amenity } from '@/lib/types';

const typeFilters = [
  { value: '', label: 'All', icon: '🏢' },
  { value: 'BANK', label: 'Banks', icon: '🏦' },
  { value: 'CLINIC', label: 'Clinics', icon: '🏥' },
  { value: 'HOSPITAL', label: 'Hospitals', icon: '🏨' },
  { value: 'EDUCATION', label: 'Education', icon: '🏫' },
  { value: 'MARKET', label: 'Markets', icon: '🏪' },
  { value: 'SHOP', label: 'Shops', icon: '🛒' },
];

export default function AmenitiesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  const filteredAmenities = mockAmenities.filter((a) => {
    const matchesSearch = a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !typeFilter || a.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <MainLayout>
      <div className="page-container py-8">
        <PageHeader
          title="Local Amenities"
          description="Find banks, hospitals, shops, and other essential services"
          icon={Building2}
        />

        {/* Search & Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search amenities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {typeFilters.map((type) => (
              <Button
                key={type.value}
                variant={typeFilter === type.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTypeFilter(type.value)}
              >
                <span className="mr-1.5">{type.icon}</span>
                {type.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Amenities Grid */}
        {filteredAmenities.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAmenities.map((amenity) => (
              <AmenityCard key={amenity.id} amenity={amenity} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={Building2}
            title="No amenities found"
            description="Try adjusting your search or filters"
            action={
              <Button variant="outline" onClick={() => {
                setSearchQuery('');
                setTypeFilter('');
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

function AmenityCard({ amenity }: { amenity: Amenity }) {
  const typeEmojis: Record<string, string> = {
    BANK: '🏦',
    CLINIC: '🏥',
    HOSPITAL: '🏨',
    EDUCATION: '🏫',
    MARKET: '🏪',
    SHOP: '🛒',
    OTHER: '🏢',
  };

  const typeColors: Record<string, string> = {
    BANK: 'bg-blue-100 text-blue-700',
    CLINIC: 'bg-red-100 text-red-700',
    HOSPITAL: 'bg-red-100 text-red-700',
    EDUCATION: 'bg-yellow-100 text-yellow-700',
    MARKET: 'bg-green-100 text-green-700',
    SHOP: 'bg-purple-100 text-purple-700',
    OTHER: 'bg-gray-100 text-gray-700',
  };

  return (
    <article className="card-elevated p-5">
      <div className="flex items-start gap-4">
        <div className={cn(
          'w-12 h-12 rounded-lg flex items-center justify-center text-2xl flex-shrink-0',
          typeColors[amenity.type] || typeColors.OTHER
        )}>
          {typeEmojis[amenity.type] || '🏢'}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-semibold text-foreground">{amenity.name}</h3>
          </div>

          <span className={cn(
            'inline-block text-xs px-2 py-0.5 rounded mb-3',
            typeColors[amenity.type] || typeColors.OTHER
          )}>
            {amenity.type}
          </span>

          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
              <span>{amenity.address}</span>
            </div>

            {amenity.contact_phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0 text-primary" />
                <a 
                  href={`tel:${amenity.contact_phone}`}
                  className="hover:text-foreground transition-colors"
                >
                  {amenity.contact_phone}
                </a>
              </div>
            )}

            {amenity.opening_hours && (
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                <span>{amenity.opening_hours}</span>
              </div>
            )}

            {amenity.contact_person && (
              <p className="text-xs">Contact: {amenity.contact_person}</p>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
