import React from 'react';
import { Wallet, FileCheck, Package, Landmark } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { PageHeader, EmptyState } from '@/components/common/PageComponents';
import { mockTenders, mockAssets } from '@/lib/mock-data';

export function FinancePage() {
  return (
    <MainLayout>
      <div className="page-container py-8">
        <PageHeader title="Finance Dashboard" description="Village budget and expenditure transparency" icon={Wallet} />
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card-elevated p-6"><h3 className="font-semibold mb-4">Budget Overview</h3><p className="text-muted-foreground">Financial data will be displayed here when connected to backend.</p></div>
          <div className="card-elevated p-6"><h3 className="font-semibold mb-4">Expenditure Summary</h3><p className="text-muted-foreground">Scheme-wise spending charts will appear here.</p></div>
        </div>
      </div>
    </MainLayout>
  );
}

export function TendersPage() {
  return (
    <MainLayout>
      <div className="page-container py-8">
        <PageHeader title="e-Tenders" description="Open tenders and work allotment notices" icon={FileCheck} />
        <div className="space-y-4">
          {mockTenders.map((t) => (
            <article key={t.id} className="card-elevated p-5">
              <div className="flex justify-between items-start gap-4 mb-2">
                <h3 className="font-semibold text-foreground">{t.title}</h3>
                <span className={`text-xs px-2 py-1 rounded ${t.status === 'OPEN' ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'}`}>{t.status}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{t.description}</p>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span>Est. Cost: ₹{(t.estimated_cost/100000).toFixed(1)}L</span>
                <span>Last Date: {new Date(t.last_date).toLocaleDateString()}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}

export function AssetsPage() {
  return (
    <MainLayout>
      <div className="page-container py-8">
        <PageHeader title="Village Assets" description="Inventory of panchayat-owned assets" icon={Package} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockAssets.map((a) => (
            <article key={a.id} className="card-elevated p-5">
              <h3 className="font-semibold text-foreground mb-2">{a.name}</h3>
              <span className={`text-xs px-2 py-0.5 rounded ${a.condition_status === 'GOOD' ? 'bg-success/10 text-success' : a.condition_status === 'NEEDS_REPAIR' ? 'bg-warning/10 text-warning' : 'bg-destructive/10 text-destructive'}`}>{a.condition_status.replace('_', ' ')}</span>
              <p className="text-sm text-muted-foreground mt-2">{a.location_description}</p>
            </article>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}

export function TalukaPage() {
  return (
    <MainLayout>
      <div className="page-container py-8">
        <PageHeader title="Taluka Panchayat" description="Taluka-level administration information" icon={Landmark} />
        <div className="card-elevated p-6">
          <h3 className="font-semibold text-foreground mb-4">Dholka Taluka Panchayat</h3>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p><strong>HQ Address:</strong> Taluka Panchayat Office, Dholka, Ahmedabad</p>
            <p><strong>Contact:</strong> 079-XXXXXXXX</p>
            <p><strong>Vision:</strong> Empowering rural communities through transparent governance</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
