import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Search, Filter, ChevronRight, ExternalLink, Home, Briefcase, Heart, Wallet, GraduationCap, Tractor } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { PageHeader, EmptyState } from '@/components/common/PageComponents';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockSchemes } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import type { Scheme } from '@/lib/types';

const categories = [
  { value: '', label: 'All Categories', icon: FileText },
  { value: 'HOUSING', label: 'Housing', icon: Home },
  { value: 'EMPLOYMENT', label: 'Employment', icon: Briefcase },
  { value: 'HEALTH', label: 'Health', icon: Heart },
  { value: 'PENSION', label: 'Pension', icon: Wallet },
  { value: 'EDUCATION', label: 'Education', icon: GraduationCap },
  { value: 'AGRICULTURE', label: 'Agriculture', icon: Tractor },
];

export default function SchemesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [levelFilter, setLevelFilter] = useState<'all' | 'central' | 'state'>('all');

  const filteredSchemes = mockSchemes.filter((scheme) => {
    const matchesSearch = scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.short_description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || scheme.category === selectedCategory;
    const matchesLevel = levelFilter === 'all' ||
      (levelFilter === 'central' && scheme.central_level) ||
      (levelFilter === 'state' && scheme.state_level);
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <MainLayout>
      <div className="page-container py-8">
        <PageHeader
          title="Government Schemes"
          description="Browse and explore government schemes available for villagers"
          icon={FileText}
        />

        {/* Filters */}
        <div className="mb-8 space-y-4">
          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search schemes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Button
                key={cat.value}
                variant={selectedCategory === cat.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(cat.value)}
                className="gap-1.5"
              >
                <cat.icon className="w-4 h-4" />
                {cat.label}
              </Button>
            ))}
          </div>

          {/* Level filter */}
          <div className="flex gap-2">
            {[
              { value: 'all', label: 'All Levels' },
              { value: 'central', label: 'Central Govt' },
              { value: 'state', label: 'State Govt' },
            ].map((level) => (
              <Button
                key={level.value}
                variant={levelFilter === level.value ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setLevelFilter(level.value as 'all' | 'central' | 'state')}
              >
                {level.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Results */}
        {filteredSchemes.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredSchemes.map((scheme) => (
              <SchemeCard key={scheme.id} scheme={scheme} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={FileText}
            title="No schemes found"
            description="Try adjusting your search or filter criteria"
            action={
              <Button variant="outline" onClick={() => {
                setSearchQuery('');
                setSelectedCategory('');
                setLevelFilter('all');
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

function SchemeCard({ scheme }: { scheme: Scheme }) {
  const CategoryIcon = categories.find(c => c.value === scheme.category)?.icon || FileText;

  return (
    <article className="card-elevated overflow-hidden group">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <CategoryIcon className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {scheme.name}
              </h3>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded capitalize">
                {scheme.category.toLowerCase()}
              </span>
              {scheme.central_level && (
                <span className="text-xs bg-info/10 text-info px-2 py-0.5 rounded">Central</span>
              )}
              {scheme.state_level && (
                <span className="text-xs bg-success/10 text-success px-2 py-0.5 rounded">State</span>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {scheme.short_description}
        </p>

        {/* Code & Department */}
        <div className="text-xs text-muted-foreground mb-4">
          {scheme.code && <span className="font-medium">Code: {scheme.code}</span>}
          {scheme.code && ' • '}
          <span>{scheme.department}</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm" className="flex-1">
            <Link to={`/schemes/${scheme.id}`}>
              View Details
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
          <Button variant="ghost" size="sm">
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </article>
  );
}
