import React, { useState } from 'react';
import { Building2, Phone, Clock, MapPin, Search } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { PageHeader, EmptyState } from '@/components/common/PageComponents';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTranslation } from '@/hooks/useTranslation';
import { mockAmenities } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import type { Amenity } from '@/lib/types';

export default function AmenitiesPage() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  const typeFilters = [
    { value: '', label: t('all'), icon: '🏢' },
    { value: 'BANK', label: t('categoryBank'), icon: '🏦' },
    { value: 'CLINIC', label: t('categoryClinic'), icon: '🏥' },
    { value: 'HOSPITAL', label: t('categoryHospital'), icon: '🏨' },
    { value: 'EDUCATION', label: t('categoryEducation'), icon: '🏫' },
    { value: 'MARKET', label: t('categoryMarket'), icon: '🏪' },
    { value: 'SHOP', label: t('categoryShop'), icon: '🛒' },
  ];

  const filteredAmenities = mockAmenities.filter((a) => {
    const matchesSearch = a.name.toLowerCase().includes(searchQuery.toLowerCase()) || a.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !typeFilter || a.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <MainLayout>
      <div className="page-container py-8">
        <PageHeader title={t('localAmenities')} description={t('findAmenities')} icon={Building2} />
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><Input type="search" placeholder={t('searchAmenities')} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" /></div>
          <div className="flex flex-wrap gap-2">{typeFilters.map((type) => <Button key={type.value} variant={typeFilter === type.value ? 'default' : 'outline'} size="sm" onClick={() => setTypeFilter(type.value)}><span className="mr-1.5">{type.icon}</span>{type.label}</Button>)}</div>
        </div>
        {filteredAmenities.length > 0 ? <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{filteredAmenities.map((amenity) => <AmenityCard key={amenity.id} amenity={amenity} t={t} />)}</div> : <EmptyState icon={Building2} title={t('noAmenitiesFound')} description={t('adjustFilters')} action={<Button variant="outline" onClick={() => { setSearchQuery(''); setTypeFilter(''); }}>{t('clearFilters')}</Button>} />}
      </div>
    </MainLayout>
  );
}

function AmenityCard({ amenity, t }: { amenity: Amenity; t: any }) {
  const typeEmojis: Record<string, string> = { BANK: '🏦', CLINIC: '🏥', HOSPITAL: '🏨', EDUCATION: '🏫', MARKET: '🏪', SHOP: '🛒', OTHER: '🏢' };
  const typeColors: Record<string, string> = { BANK: 'bg-blue-100 text-blue-700', CLINIC: 'bg-red-100 text-red-700', HOSPITAL: 'bg-red-100 text-red-700', EDUCATION: 'bg-yellow-100 text-yellow-700', MARKET: 'bg-green-100 text-green-700', SHOP: 'bg-purple-100 text-purple-700', OTHER: 'bg-gray-100 text-gray-700' };
  return (
    <article className="card-elevated p-5">
      <div className="flex items-start gap-4">
        <div className={cn('w-12 h-12 rounded-lg flex items-center justify-center text-2xl flex-shrink-0', typeColors[amenity.type] || typeColors.OTHER)}>{typeEmojis[amenity.type] || '🏢'}</div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground mb-2">{amenity.name}</h3>
          <span className={cn('inline-block text-xs px-2 py-0.5 rounded mb-3', typeColors[amenity.type] || typeColors.OTHER)}>{amenity.type}</span>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" /><span>{amenity.address}</span></div>
            {amenity.contact_phone && <div className="flex items-center gap-2"><Phone className="w-4 h-4 flex-shrink-0 text-primary" /><a href={`tel:${amenity.contact_phone}`} className="hover:text-foreground transition-colors">{amenity.contact_phone}</a></div>}
            {amenity.opening_hours && <div className="flex items-start gap-2"><Clock className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" /><span>{amenity.opening_hours}</span></div>}
            {amenity.contact_person && <p className="text-xs">{t('contact')}: {amenity.contact_person}</p>}
          </div>
        </div>
      </div>
    </article>
  );
}
