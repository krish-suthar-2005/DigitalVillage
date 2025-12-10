import React from 'react';
import { Calendar, MapPin, Clock, FileText, Download } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { PageHeader, StatusBadge, EmptyState } from '@/components/common/PageComponents';
import { Button } from '@/components/ui/button';
import { mockGramSabhaMeetings } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import type { GramSabhaMeeting } from '@/lib/types';

export default function GramSabhaPage() {
  const upcomingMeetings = mockGramSabhaMeetings.filter(m => m.status === 'SCHEDULED');
  const pastMeetings = mockGramSabhaMeetings.filter(m => m.status !== 'SCHEDULED');

  return (
    <MainLayout>
      <div className="page-container py-8">
        <PageHeader
          title="Gram Sabha Meetings"
          description="View upcoming meetings, agendas, and past meeting minutes"
          icon={Calendar}
        />

        {/* Upcoming Meetings */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-success rounded-full animate-pulse-soft" />
            Upcoming Meetings
          </h2>
          {upcomingMeetings.length > 0 ? (
            <div className="space-y-4">
              {upcomingMeetings.map((meeting) => (
                <MeetingCard key={meeting.id} meeting={meeting} isUpcoming />
              ))}
            </div>
          ) : (
            <div className="card-elevated p-6 text-center">
              <p className="text-muted-foreground">No upcoming meetings scheduled</p>
            </div>
          )}
        </section>

        {/* Past Meetings */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-4">Past Meetings</h2>
          {pastMeetings.length > 0 ? (
            <div className="space-y-4">
              {pastMeetings.map((meeting) => (
                <MeetingCard key={meeting.id} meeting={meeting} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={Calendar}
              title="No past meetings"
              description="Meeting records will appear here after meetings are completed"
            />
          )}
        </section>
      </div>
    </MainLayout>
  );
}

function MeetingCard({ meeting, isUpcoming }: { meeting: GramSabhaMeeting; isUpcoming?: boolean }) {
  const meetingDate = new Date(meeting.date);

  return (
    <article className={cn(
      'card-elevated overflow-hidden',
      isUpcoming && 'border-l-4 border-l-success'
    )}>
      <div className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Date card */}
          <div className="lg:w-24 flex lg:flex-col items-center lg:items-start gap-3 lg:gap-0">
            <div className={cn(
              'w-16 h-16 rounded-lg flex flex-col items-center justify-center text-center',
              isUpcoming ? 'bg-success/10' : 'bg-muted'
            )}>
              <span className="text-xs text-muted-foreground uppercase">
                {meetingDate.toLocaleDateString('en', { month: 'short' })}
              </span>
              <span className={cn(
                'text-2xl font-bold',
                isUpcoming ? 'text-success' : 'text-foreground'
              )}>
                {meetingDate.getDate()}
              </span>
            </div>
            <span className="text-sm text-muted-foreground lg:mt-2">
              {meetingDate.getFullYear()}
            </span>
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <h3 className="font-semibold text-foreground">{meeting.title}</h3>
              <StatusBadge status={meeting.status} />
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-primary" />
                <span>{meeting.start_time} - {meeting.end_time}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-primary" />
                <span>{meeting.venue}</span>
              </div>
            </div>

            {/* Agenda */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-1.5">
                <FileText className="w-4 h-4" />
                Agenda
              </h4>
              <div className="bg-muted/50 rounded-lg p-4">
                <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-sans">
                  {meeting.agenda}
                </pre>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              {isUpcoming ? (
                <Button variant="outline" size="sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  Add to Calendar
                </Button>
              ) : (
                meeting.minutes_document && (
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download Minutes
                  </Button>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
