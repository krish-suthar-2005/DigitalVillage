import React, { useState } from 'react';
import { MessageSquare, Plus, Search, Clock } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { PageHeader, StatusBadge, EmptyState } from '@/components/common/PageComponents';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTranslation } from '@/hooks/useTranslation';
import { mockComplaints } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import type { Complaint, ComplaintCategory, ComplaintStatus } from '@/lib/types';

export default function ComplaintsPage() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<ComplaintCategory | ''>('');
  const [statusFilter, setStatusFilter] = useState<ComplaintStatus | ''>('');
  const [showForm, setShowForm] = useState(false);

  const categories: { value: ComplaintCategory | ''; label: string }[] = [
    { value: '', label: t('allCategories') },
    { value: 'WATER', label: t('categoryWater') },
    { value: 'ROAD', label: t('categoryRoad') },
    { value: 'ELECTRICITY', label: t('categoryElectricity') },
    { value: 'SANITATION', label: t('categorySanitation') },
    { value: 'CORRUPTION', label: t('categoryCorruption') },
    { value: 'OTHER', label: t('categoryOther') },
  ];

  const filteredComplaints = mockComplaints.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.reference_id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !categoryFilter || c.category === categoryFilter;
    const matchesStatus = !statusFilter || c.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const stats = {
    total: mockComplaints.length,
    pending: mockComplaints.filter(c => ['NEW', 'IN_REVIEW', 'IN_PROGRESS'].includes(c.status)).length,
    resolved: mockComplaints.filter(c => c.status === 'RESOLVED').length,
  };

  return (
    <MainLayout>
      <div className="page-container py-8">
        <PageHeader title={t('complaintsGrievances')} description={t('submitTrackComplaints')} icon={MessageSquare} actions={<Button onClick={() => setShowForm(!showForm)}><Plus className="w-4 h-4 mr-2" />{t('newComplaint')}</Button>} />
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="card-elevated p-4 text-center"><p className="text-2xl font-bold text-foreground">{stats.total}</p><p className="text-sm text-muted-foreground">{t('total')}</p></div>
          <div className="card-elevated p-4 text-center"><p className="text-2xl font-bold text-warning">{stats.pending}</p><p className="text-sm text-muted-foreground">{t('pending')}</p></div>
          <div className="card-elevated p-4 text-center"><p className="text-2xl font-bold text-success">{stats.resolved}</p><p className="text-sm text-muted-foreground">{t('resolved')}</p></div>
        </div>
        {showForm && <ComplaintForm onClose={() => setShowForm(false)} t={t} categories={categories} />}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input type="search" placeholder={t('search')} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
          </div>
          <div className="flex flex-wrap gap-2">
            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value as ComplaintCategory | '')} className="form-input text-sm">
              {categories.map((cat) => <option key={cat.value} value={cat.value}>{cat.label}</option>)}
            </select>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as ComplaintStatus | '')} className="form-input text-sm">
              <option value="">{t('allStatus')}</option>
              <option value="NEW">{t('statusNew')}</option>
              <option value="IN_REVIEW">{t('statusInReview')}</option>
              <option value="IN_PROGRESS">{t('statusInProgress')}</option>
              <option value="RESOLVED">{t('statusResolved')}</option>
              <option value="REJECTED">{t('statusRejected')}</option>
            </select>
          </div>
        </div>
        {filteredComplaints.length > 0 ? (
          <div className="space-y-4">{filteredComplaints.map((complaint) => <ComplaintCard key={complaint.id} complaint={complaint} t={t} />)}</div>
        ) : (
          <EmptyState icon={MessageSquare} title={t('noResults')} action={<Button onClick={() => setShowForm(true)}><Plus className="w-4 h-4 mr-2" />{t('fileNewComplaint')}</Button>} />
        )}
      </div>
    </MainLayout>
  );
}

function ComplaintCard({ complaint, t }: { complaint: Complaint; t: any }) {
  const priorityColors = { HIGH: 'border-l-destructive', MEDIUM: 'border-l-warning', LOW: 'border-l-muted-foreground' };
  const categoryIcons = { WATER: '💧', ROAD: '🛣️', ELECTRICITY: '⚡', SANITATION: '🧹', CORRUPTION: '⚠️', OTHER: '📋' };
  return (
    <article className={cn('card-elevated overflow-hidden border-l-4', priorityColors[complaint.priority])}>
      <div className="p-5">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          <div className="text-3xl">{categoryIcons[complaint.category]}</div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
              <span className="text-xs font-mono text-muted-foreground">{complaint.reference_id}</span>
              <StatusBadge status={complaint.status} />
              <span className={cn('text-xs px-2 py-0.5 rounded', complaint.priority === 'HIGH' ? 'bg-destructive/10 text-destructive' : complaint.priority === 'MEDIUM' ? 'bg-warning/10 text-warning' : 'bg-muted text-muted-foreground')}>{complaint.priority}</span>
            </div>
            <h3 className="font-semibold text-foreground mb-2">{complaint.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{complaint.description}</p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
              <span className="capitalize">{complaint.category.toLowerCase()}</span><span>•</span>
              <span>{t('filedBy')}: {complaint.name}</span><span>•</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{new Date(complaint.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function ComplaintForm({ onClose, t, categories }: { onClose: () => void; t: any; categories: any[] }) {
  const [formData, setFormData] = useState({ name: '', phone: '', category: 'WATER' as ComplaintCategory, title: '', description: '' });
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); onClose(); };
  return (
    <div className="card-elevated p-6 mb-8 animate-slide-up">
      <h3 className="text-lg font-semibold text-foreground mb-4">{t('fileNewComplaint')}</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div><label className="form-label">{t('yourName')}</label><Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required /></div>
          <div><label className="form-label">{t('phoneNumber')}</label><Input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required /></div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div><label className="form-label">{t('category')}</label><select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value as ComplaintCategory })} className="form-input w-full">{categories.slice(1).map((cat) => <option key={cat.value} value={cat.value}>{cat.label}</option>)}</select></div>
          <div><label className="form-label">{t('complaintTitle')}</label><Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required /></div>
        </div>
        <div><label className="form-label">{t('description')}</label><textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={4} className="form-input w-full resize-none" required /></div>
        <div className="flex justify-end gap-3"><Button type="button" variant="outline" onClick={onClose}>{t('cancel')}</Button><Button type="submit">{t('submitComplaint')}</Button></div>
      </form>
    </div>
  );
}
