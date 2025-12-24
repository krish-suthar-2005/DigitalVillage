import React from 'react';
import { Users, Phone, Mail, Calendar } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { PageHeader } from '@/components/common/PageComponents';
import { useTranslation } from '@/hooks/useTranslation';
import { mockMembers } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import type { Member } from '@/lib/types';

const roleOrder = ['SARPANCH', 'DEPUTY_SARPANCH', 'SECRETARY', 'STAFF', 'MEMBER'];

export default function MembersPage() {
  const { t } = useTranslation();
  const sortedMembers = [...mockMembers].sort((a, b) => roleOrder.indexOf(a.role) - roleOrder.indexOf(b.role));
  const sarpanch = sortedMembers.find(m => m.role === 'SARPANCH');
  const otherLeaders = sortedMembers.filter(m => ['DEPUTY_SARPANCH', 'SECRETARY'].includes(m.role));
  const wardMembers = sortedMembers.filter(m => m.role === 'MEMBER');
  const staff = sortedMembers.filter(m => m.role === 'STAFF');

  return (
    <MainLayout>
      <div className="page-container py-8">
        <PageHeader title={t('panchayatMembersStaff')} description={t('meetRepresentatives')} icon={Users} />
        {sarpanch && <section className="mb-8"><h2 className="text-lg font-semibold text-muted-foreground mb-4">{t('sarpanch')}</h2><FeaturedMemberCard member={sarpanch} t={t} /></section>}
        {otherLeaders.length > 0 && <section className="mb-8"><h2 className="text-lg font-semibold text-muted-foreground mb-4">{t('panchayatLeadership')}</h2><div className="grid md:grid-cols-2 gap-6">{otherLeaders.map((member) => <MemberCard key={member.id} member={member} t={t} />)}</div></section>}
        {wardMembers.length > 0 && <section className="mb-8"><h2 className="text-lg font-semibold text-muted-foreground mb-4">{t('wardMembers')}</h2><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{wardMembers.map((member) => <MemberCard key={member.id} member={member} compact t={t} />)}</div></section>}
        {staff.length > 0 && <section><h2 className="text-lg font-semibold text-muted-foreground mb-4">{t('panchayatStaff')}</h2><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{staff.map((member) => <MemberCard key={member.id} member={member} compact t={t} />)}</div></section>}
      </div>
    </MainLayout>
  );
}

function FeaturedMemberCard({ member, t }: { member: Member; t: any }) {
  return (
    <article className="card-elevated overflow-hidden">
      <div className="md:flex">
        <div className="md:w-48 lg:w-64 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center p-8">
          <div className="w-32 h-32 bg-primary/20 rounded-full flex items-center justify-center"><span className="text-4xl font-bold text-primary">{member.name.split(' ').map(n => n[0]).join('')}</span></div>
        </div>
        <div className="flex-1 p-6">
          <div className="mb-4"><span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded uppercase font-medium">{member.role.replace('_', ' ')}</span></div>
          <h3 className="text-2xl font-bold text-foreground mb-2">{member.name}</h3>
          <div className="space-y-2 text-sm text-muted-foreground mt-4">
            {member.phone_public && <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary" /><a href={`tel:${member.phone_public}`} className="hover:text-foreground transition-colors">{member.phone_public}</a></div>}
            {member.email_public && <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary" /><a href={`mailto:${member.email_public}`} className="hover:text-foreground transition-colors">{member.email_public}</a></div>}
            <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-primary" /><span>{t('term')}: {new Date(member.term_start).getFullYear()} - {new Date(member.term_end).getFullYear()}</span></div>
          </div>
        </div>
      </div>
    </article>
  );
}

function MemberCard({ member, compact, t }: { member: Member; compact?: boolean; t: any }) {
  const roleColors: Record<string, string> = { DEPUTY_SARPANCH: 'bg-success/10 text-success', SECRETARY: 'bg-info/10 text-info', MEMBER: 'bg-secondary text-secondary-foreground', STAFF: 'bg-muted text-muted-foreground' };
  return (
    <article className={cn('card-elevated p-4', compact ? '' : 'p-5')}>
      <div className="flex items-start gap-4">
        <div className={cn('bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0', compact ? 'w-12 h-12' : 'w-14 h-14')}><span className={cn('font-bold text-primary', compact ? 'text-sm' : 'text-lg')}>{member.name.split(' ').map(n => n[0]).join('')}</span></div>
        <div className="flex-1 min-w-0">
          <h3 className={cn('font-semibold text-foreground', compact ? 'text-sm' : 'text-base')}>{member.name}</h3>
          <span className={cn('inline-block text-xs px-2 py-0.5 rounded mt-1', roleColors[member.role] || 'bg-muted text-muted-foreground')}>{member.role.replace('_', ' ')}</span>
          {member.ward_no && <p className="text-xs text-muted-foreground mt-1">{t('ward')} {member.ward_no}</p>}
          {!compact && member.phone_public && <div className="flex items-center gap-1.5 mt-2 text-sm text-muted-foreground"><Phone className="w-3.5 h-3.5" /><a href={`tel:${member.phone_public}`} className="hover:text-foreground">{member.phone_public}</a></div>}
        </div>
      </div>
    </article>
  );
}
