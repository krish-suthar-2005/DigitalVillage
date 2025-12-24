import React, { useState } from 'react';
import { HardHat, Calendar, IndianRupee, Filter } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { PageHeader, StatusBadge, EmptyState } from '@/components/common/PageComponents';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';
import { mockDevelopmentWorks } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import type { DevelopmentWork } from '@/lib/types';

export default function DevelopmentPage() {
  const { t } = useTranslation();
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const workTypes = [
    { value: '', label: t('allTypes') },
    { value: 'ROAD', label: t('categoryRoadWork') },
    { value: 'WATER', label: t('categoryWaterWork') },
    { value: 'ELECTRIC', label: t('categoryElectricWork') },
    { value: 'BUILDING', label: t('categoryBuilding') },
    { value: 'DRAINAGE', label: t('categoryDrainage') },
  ];

  const statuses = [
    { value: '', label: t('allStatus') },
    { value: 'PLANNED', label: t('statusPlanned') },
    { value: 'APPROVED', label: t('statusApproved') },
    { value: 'IN_PROGRESS', label: t('statusInProgress') },
    { value: 'COMPLETED', label: t('statusCompleted') },
  ];

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
        <PageHeader title={t('developmentWorks')} description={t('trackDevelopment')} icon={HardHat} />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="card-elevated p-4 text-center"><p className="text-2xl font-bold text-foreground">{stats.total}</p><p className="text-sm text-muted-foreground">{t('totalProjects')}</p></div>
          <div className="card-elevated p-4 text-center"><p className="text-2xl font-bold text-warning">{stats.inProgress}</p><p className="text-sm text-muted-foreground">{t('inProgress')}</p></div>
          <div className="card-elevated p-4 text-center"><p className="text-2xl font-bold text-success">{stats.completed}</p><p className="text-sm text-muted-foreground">{t('completed')}</p></div>
          <div className="card-elevated p-4 text-center"><p className="text-2xl font-bold text-primary">₹{(stats.totalBudget / 100000).toFixed(1)}L</p><p className="text-sm text-muted-foreground">{t('totalBudget')}</p></div>
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mr-2"><Filter className="w-4 h-4" /><span>{t('filter')}:</span></div>
          {workTypes.map((type) => <Button key={type.value} variant={typeFilter === type.value ? 'default' : 'outline'} size="sm" onClick={() => setTypeFilter(type.value)}>{type.label}</Button>)}
          <div className="w-px h-6 bg-border mx-2" />
          {statuses.map((status) => <Button key={status.value} variant={statusFilter === status.value ? 'secondary' : 'ghost'} size="sm" onClick={() => setStatusFilter(status.value)}>{status.label}</Button>)}
        </div>
        {filteredWorks.length > 0 ? <div className="space-y-4">{filteredWorks.map((work) => <WorkCard key={work.id} work={work} t={t} />)}</div> : <EmptyState icon={HardHat} title={t('noDevelopmentWorks')} description={t('adjustFilters')} action={<Button variant="outline" onClick={() => { setTypeFilter(''); setStatusFilter(''); }}>{t('clearFilters')}</Button>} />}
      </div>
    </MainLayout>
  );
}

function WorkCard({ work, t }: { work: DevelopmentWork; t: any }) {
  const typeColors: Record<string, string> = { ROAD: 'bg-amber-100 text-amber-700', WATER: 'bg-blue-100 text-blue-700', ELECTRIC: 'bg-yellow-100 text-yellow-700', BUILDING: 'bg-purple-100 text-purple-700', DRAINAGE: 'bg-green-100 text-green-700', OTHER: 'bg-gray-100 text-gray-700' };
  return (
    <article className="card-elevated overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          <div className={cn('w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0', typeColors[work.work_type] || typeColors.OTHER)}><HardHat className="w-6 h-6" /></div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2"><h3 className="font-semibold text-foreground">{work.title}</h3><StatusBadge status={work.status} /></div>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{work.description}</p>
            {work.progress_percentage !== undefined && work.status === 'IN_PROGRESS' && (
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-1"><span className="text-muted-foreground">{t('progress')}</span><span className="font-medium text-foreground">{work.progress_percentage}%</span></div>
                <div className="h-2.5 bg-muted rounded-full overflow-hidden"><div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${work.progress_percentage}%` }} /></div>
              </div>
            )}
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className={cn('px-2 py-0.5 rounded text-xs', typeColors[work.work_type])}>{work.work_type}</span>
              <div className="flex items-center gap-1"><IndianRupee className="w-3.5 h-3.5" /><span>{t('budget')}: ₹{((work.approved_budget || work.estimated_cost) / 100000).toFixed(1)} {t('lakh')}</span></div>
              {work.funding_scheme_name && <span>{t('scheme')}: {work.funding_scheme_name}</span>}
              {work.start_date && <div className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /><span>{new Date(work.start_date).toLocaleDateString()}{work.end_date && ` - ${new Date(work.end_date).toLocaleDateString()}`}</span></div>}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
