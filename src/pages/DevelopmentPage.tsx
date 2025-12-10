import React, { useState } from 'react';
import { HardHat, MapPin, Calendar, IndianRupee, Filter } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { PageHeader, StatusBadge, EmptyState } from '@/components/common/PageComponents';
import { Button } from '@/components/ui/button';
import { mockDevelopmentWorks } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import type { DevelopmentWork } from '@/lib/types';

const workTypes = [
  { value: '', label: 'All Types' },
  { value: 'ROAD', label: 'Road' },
  { value: 'WATER', label: 'Water' },
  { value: 'ELECTRIC', label: 'Electric' },
  { value: 'BUILDING', label: 'Building' },
  { value: 'DRAINAGE', label: 'Drainage' },
];

const statuses = [
  { value: '', label: 'All Status' },
  { value: 'PLANNED', label: 'Planned' },
  { value: 'APPROVED', label: 'Approved' },
  { value: 'IN_PROGRESS', label: 'In Progress' },
  { value: 'COMPLETED', label: 'Completed' },
];

export default function DevelopmentPage() {
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredWorks = mockDevelopmentWorks.filter((work) => {
    const matchesType = !typeFilter || work.work_type === typeFilter;
    const matchesStatus = !statusFilter || work.status === statusFilter;
    return matchesType && matchesStatus;
  });

  const stats = {
    total: mockDevelopmentWorks.length,
    inProgress: mockDevelopmentWorks.filter(w => w.status === 'IN_PROGRESS').length,
    completed: mockDevelopmentWorks.filter(w => w.status === 'COMPLETED').length,
    totalBudget: mockDevelopmentWorks.reduce((sum, w) => sum + (w.approved_budget || w.estimated_cost), 0),
  };

  return (
    <MainLayout>
      <div className="page-container py-8">
        <PageHeader
          title="Development Works"
          description="Track ongoing and completed development projects in the village"
          icon={HardHat}
        />

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="card-elevated p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{stats.total}</p>
            <p className="text-sm text-muted-foreground">Total Projects</p>
          </div>
          <div className="card-elevated p-4 text-center">
            <p className="text-2xl font-bold text-warning">{stats.inProgress}</p>
            <p className="text-sm text-muted-foreground">In Progress</p>
          </div>
          <div className="card-elevated p-4 text-center">
            <p className="text-2xl font-bold text-success">{stats.completed}</p>
            <p className="text-sm text-muted-foreground">Completed</p>
          </div>
          <div className="card-elevated p-4 text-center">
            <p className="text-2xl font-bold text-primary">₹{(stats.totalBudget / 100000).toFixed(1)}L</p>
            <p className="text-sm text-muted-foreground">Total Budget</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mr-2">
            <Filter className="w-4 h-4" />
            <span>Filter:</span>
          </div>
          {workTypes.map((type) => (
            <Button
              key={type.value}
              variant={typeFilter === type.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTypeFilter(type.value)}
            >
              {type.label}
            </Button>
          ))}
          <div className="w-px h-6 bg-border mx-2" />
          {statuses.map((status) => (
            <Button
              key={status.value}
              variant={statusFilter === status.value ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setStatusFilter(status.value)}
            >
              {status.label}
            </Button>
          ))}
        </div>

        {/* Works List */}
        {filteredWorks.length > 0 ? (
          <div className="space-y-4">
            {filteredWorks.map((work) => (
              <WorkCard key={work.id} work={work} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={HardHat}
            title="No development works found"
            description="Try adjusting your filters"
            action={
              <Button variant="outline" onClick={() => {
                setTypeFilter('');
                setStatusFilter('');
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

function WorkCard({ work }: { work: DevelopmentWork }) {
  const typeColors: Record<string, string> = {
    ROAD: 'bg-amber-100 text-amber-700',
    WATER: 'bg-blue-100 text-blue-700',
    ELECTRIC: 'bg-yellow-100 text-yellow-700',
    BUILDING: 'bg-purple-100 text-purple-700',
    DRAINAGE: 'bg-green-100 text-green-700',
    OTHER: 'bg-gray-100 text-gray-700',
  };

  return (
    <article className="card-elevated overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          {/* Type icon */}
          <div className={cn(
            'w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0',
            typeColors[work.work_type] || typeColors.OTHER
          )}>
            <HardHat className="w-6 h-6" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
              <h3 className="font-semibold text-foreground">{work.title}</h3>
              <StatusBadge status={work.status} />
            </div>

            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {work.description}
            </p>

            {/* Progress bar */}
            {work.progress_percentage !== undefined && work.status === 'IN_PROGRESS' && (
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium text-foreground">{work.progress_percentage}%</span>
                </div>
                <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${work.progress_percentage}%` }}
                  />
                </div>
              </div>
            )}

            {/* Meta info */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className={cn('px-2 py-0.5 rounded text-xs', typeColors[work.work_type])}>
                {work.work_type}
              </span>
              <div className="flex items-center gap-1">
                <IndianRupee className="w-3.5 h-3.5" />
                <span>Budget: ₹{((work.approved_budget || work.estimated_cost) / 100000).toFixed(1)} Lakh</span>
              </div>
              {work.funding_scheme_name && (
                <span>Scheme: {work.funding_scheme_name}</span>
              )}
              {work.start_date && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>
                    {new Date(work.start_date).toLocaleDateString()} 
                    {work.end_date && ` - ${new Date(work.end_date).toLocaleDateString()}`}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
