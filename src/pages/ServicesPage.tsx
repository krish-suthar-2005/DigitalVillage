import React from 'react';
import { Link2, ExternalLink } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { PageHeader } from '@/components/common/PageComponents';
import { mockServiceLinks } from '@/lib/mock-data';

const categoryEmojis: Record<string, string> = { BIRTH_CERTIFICATE: '📜', LICENSE: '📋', VOTER: '🗳️', LAND_RECORD: '🏞️', JOBS: '💼', BUS_TRAIN: '🚃', LIVE_STREAM: '📺', OTHER: '🔗' };

export default function ServicesPage() {
  return (
    <MainLayout>
      <div className="page-container py-8">
        <PageHeader title="Service Links" description="Quick access to government services and portals" icon={Link2} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockServiceLinks.map((link) => (
            <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="card-elevated p-5 hover:shadow-lg transition-all group no-highlight">
              <div className="flex items-start gap-4">
                <span className="text-3xl">{categoryEmojis[link.category] || '🔗'}</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-2">{link.title}<ExternalLink className="w-4 h-4 opacity-50" /></h3>
                  <p className="text-sm text-muted-foreground mt-1">{link.description}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
