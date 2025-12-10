import React, { useState } from 'react';
import { MessageSquare, Plus, Search, AlertCircle, CheckCircle2, Clock, Filter } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { PageHeader, StatusBadge, EmptyState } from '@/components/common/PageComponents';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockComplaints } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import type { Complaint, ComplaintCategory, ComplaintStatus } from '@/lib/types';

const categories: { value: ComplaintCategory | ''; label: string }[] = [
  { value: '', label: 'All Categories' },
  { value: 'WATER', label: 'Water Supply' },
  { value: 'ROAD', label: 'Roads' },
  { value: 'ELECTRICITY', label: 'Electricity' },
  { value: 'SANITATION', label: 'Sanitation' },
  { value: 'CORRUPTION', label: 'Corruption' },
  { value: 'OTHER', label: 'Other' },
];

export default function ComplaintsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<ComplaintCategory | ''>('');
  const [statusFilter, setStatusFilter] = useState<ComplaintStatus | ''>('');
  const [showForm, setShowForm] = useState(false);

  const filteredComplaints = mockComplaints.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.reference_id.toLowerCase().includes(searchQuery.toLowerCase());
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
        <PageHeader
          title="Complaints & Grievances"
          description="Submit and track your complaints and grievances"
          icon={MessageSquare}
          actions={
            <Button onClick={() => setShowForm(!showForm)}>
              <Plus className="w-4 h-4 mr-2" />
              New Complaint
            </Button>
          }
        />

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="card-elevated p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{stats.total}</p>
            <p className="text-sm text-muted-foreground">Total</p>
          </div>
          <div className="card-elevated p-4 text-center">
            <p className="text-2xl font-bold text-warning">{stats.pending}</p>
            <p className="text-sm text-muted-foreground">Pending</p>
          </div>
          <div className="card-elevated p-4 text-center">
            <p className="text-2xl font-bold text-success">{stats.resolved}</p>
            <p className="text-sm text-muted-foreground">Resolved</p>
          </div>
        </div>

        {/* Complaint Form */}
        {showForm && (
          <ComplaintForm onClose={() => setShowForm(false)} />
        )}

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by title or reference ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as ComplaintCategory | '')}
              className="form-input text-sm"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as ComplaintStatus | '')}
              className="form-input text-sm"
            >
              <option value="">All Status</option>
              <option value="NEW">New</option>
              <option value="IN_REVIEW">In Review</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="RESOLVED">Resolved</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
        </div>

        {/* Complaints List */}
        {filteredComplaints.length > 0 ? (
          <div className="space-y-4">
            {filteredComplaints.map((complaint) => (
              <ComplaintCard key={complaint.id} complaint={complaint} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={MessageSquare}
            title="No complaints found"
            description={searchQuery ? "Try a different search term" : "No complaints have been filed yet"}
            action={
              <Button onClick={() => setShowForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                File New Complaint
              </Button>
            }
          />
        )}
      </div>
    </MainLayout>
  );
}

function ComplaintCard({ complaint }: { complaint: Complaint }) {
  const priorityColors = {
    HIGH: 'border-l-destructive',
    MEDIUM: 'border-l-warning',
    LOW: 'border-l-muted-foreground',
  };

  const categoryIcons = {
    WATER: '💧',
    ROAD: '🛣️',
    ELECTRICITY: '⚡',
    SANITATION: '🧹',
    CORRUPTION: '⚠️',
    OTHER: '📋',
  };

  return (
    <article className={cn(
      'card-elevated overflow-hidden border-l-4',
      priorityColors[complaint.priority]
    )}>
      <div className="p-5">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          {/* Icon */}
          <div className="text-3xl">{categoryIcons[complaint.category]}</div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
              <span className="text-xs font-mono text-muted-foreground">{complaint.reference_id}</span>
              <StatusBadge status={complaint.status} />
              <span className={cn(
                'text-xs px-2 py-0.5 rounded',
                complaint.priority === 'HIGH' ? 'bg-destructive/10 text-destructive' :
                complaint.priority === 'MEDIUM' ? 'bg-warning/10 text-warning' :
                'bg-muted text-muted-foreground'
              )}>
                {complaint.priority} Priority
              </span>
            </div>

            <h3 className="font-semibold text-foreground mb-2">{complaint.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {complaint.description}
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
              <span className="capitalize">{complaint.category.toLowerCase()}</span>
              <span>•</span>
              <span>Filed by: {complaint.name}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {new Date(complaint.created_at).toLocaleDateString()}
              </span>
              {complaint.assigned_to_name && (
                <>
                  <span>•</span>
                  <span>Assigned to: {complaint.assigned_to_name}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function ComplaintForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    category: 'WATER' as ComplaintCategory,
    title: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Would call API here
    console.log('Submitting complaint:', formData);
    onClose();
  };

  return (
    <div className="card-elevated p-6 mb-8 animate-slide-up">
      <h3 className="text-lg font-semibold text-foreground mb-4">File New Complaint</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="form-label">Your Name</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label className="form-label">Phone Number</label>
            <Input
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="Enter phone number"
              required
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="form-label">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as ComplaintCategory })}
              className="form-input w-full"
            >
              {categories.slice(1).map((cat) => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="form-label">Complaint Title</label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Brief title of your complaint"
              required
            />
          </div>
        </div>

        <div>
          <label className="form-label">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Describe your complaint in detail..."
            rows={4}
            className="form-input w-full resize-none"
            required
          />
        </div>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            Submit Complaint
          </Button>
        </div>
      </form>
    </div>
  );
}
