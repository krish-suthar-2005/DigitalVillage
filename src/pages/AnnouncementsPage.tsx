import React from 'react';
import { Megaphone, Clock, AlertTriangle, Calendar, Info } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { PageHeader } from '@/components/common/PageComponents';
import { mockAnnouncements } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export default function AnnouncementsPage() {
  return (
    <MainLayout>
      <div className="page-container py-8">
        <PageHeader title="Announcements" description="Official notices and announcements" icon={Megaphone} />
        <div className="space-y-4">
          {mockAnnouncements.map((a) => (
            <article key={a.id} className={cn('card-elevated p-5 border-l-4', a.type === 'EMERGENCY' ? 'border-l-destructive' : a.type === 'MEETING' ? 'border-l-warning' : 'border-l-info')}>
              <div className="flex items-start gap-4">
                <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center', a.type === 'EMERGENCY' ? 'bg-destructive/10 text-destructive' : a.type === 'MEETING' ? 'bg-warning/10 text-warning' : 'bg-info/10 text-info')}>
                  {a.type === 'EMERGENCY' ? <AlertTriangle className="w-5 h-5" /> : a.type === 'MEETING' ? <Calendar className="w-5 h-5" /> : <Info className="w-5 h-5" />}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">{a.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{a.description}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" />{new Date(a.start_date).toLocaleDateString()}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
