import React from 'react';
import { Calendar, MapPin, Clock, FileText, Download } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { PageHeader, StatusBadge, EmptyState } from '@/components/common/PageComponents';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';
import { mockGramSabhaMeetings } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import type { GramSabhaMeeting } from '@/lib/types';

export default function GramSabhaPage() {
  const { t } = useTranslation();
  const upcomingMeetings = mockGramSabhaMeetings.filter(m => m.status === 'SCHEDULED');
  const pastMeetings = mockGramSabhaMeetings.filter(m => m.status !== 'SCHEDULED');

  return (
    <MainLayout>
      <div className="page-container py-8">
        <PageHeader title={t('gramSabhaMeetings')} description={t('viewMeetingsAgendas')} icon={Calendar} />
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2"><span className="w-2 h-2 bg-success rounded-full animate-pulse-soft" />{t('upcomingMeetings')}</h2>
          {upcomingMeetings.length > 0 ? <div className="space-y-4">{upcomingMeetings.map((meeting) => <MeetingCard key={meeting.id} meeting={meeting} isUpcoming t={t} />)}</div> : <div className="card-elevated p-6 text-center"><p className="text-muted-foreground">{t('noUpcomingMeetings')}</p></div>}
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-4">{t('pastMeetings')}</h2>
          {pastMeetings.length > 0 ? <div className="space-y-4">{pastMeetings.map((meeting) => <MeetingCard key={meeting.id} meeting={meeting} t={t} />)}</div> : <EmptyState icon={Calendar} title={t('noPastMeetings')} description={t('meetingRecordsAppear')} />}
        </section>
      </div>
    </MainLayout>
  );
}

function MeetingCard({ meeting, isUpcoming, t }: { meeting: GramSabhaMeeting; isUpcoming?: boolean; t: any }) {
  const meetingDate = new Date(meeting.date);
  return (
    <article className={cn('card-elevated overflow-hidden', isUpcoming && 'border-l-4 border-l-success')}>
      <div className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-24 flex lg:flex-col items-center lg:items-start gap-3 lg:gap-0">
            <div className={cn('w-16 h-16 rounded-lg flex flex-col items-center justify-center text-center', isUpcoming ? 'bg-success/10' : 'bg-muted')}>
              <span className="text-xs text-muted-foreground uppercase">{meetingDate.toLocaleDateString('en', { month: 'short' })}</span>
              <span className={cn('text-2xl font-bold', isUpcoming ? 'text-success' : 'text-foreground')}>{meetingDate.getDate()}</span>
            </div>
            <span className="text-sm text-muted-foreground lg:mt-2">{meetingDate.getFullYear()}</span>
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-3"><h3 className="font-semibold text-foreground">{meeting.title}</h3><StatusBadge status={meeting.status} /></div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-primary" /><span>{meeting.start_time} - {meeting.end_time}</span></div>
              <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-primary" /><span>{meeting.venue}</span></div>
            </div>
            <div className="mb-4"><h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-1.5"><FileText className="w-4 h-4" />{t('agenda')}</h4><div className="bg-muted/50 rounded-lg p-4"><pre className="text-sm text-muted-foreground whitespace-pre-wrap font-sans">{meeting.agenda}</pre></div></div>
            <div className="flex flex-wrap gap-3">
              {isUpcoming ? <Button variant="outline" size="sm"><Calendar className="w-4 h-4 mr-2" />{t('addToCalendar')}</Button> : meeting.minutes_document && <Button variant="outline" size="sm"><Download className="w-4 h-4 mr-2" />{t('downloadMinutes')}</Button>}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
