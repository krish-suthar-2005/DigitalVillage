import React from 'react';
import { Wallet, FileCheck, Package, Landmark } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { PageHeader } from '@/components/common/PageComponents';
import { useTranslation } from '@/hooks/useTranslation';
import { mockTenders, mockAssets } from '@/lib/mock-data';

export function FinancePage() {
  const { t } = useTranslation();
  return (
    <MainLayout>
      <div className="page-container py-8">
        <PageHeader title={t('financeDashboard')} description={t('budgetTransparency')} icon={Wallet} />
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card-elevated p-6"><h3 className="font-semibold mb-4">{t('budgetOverview')}</h3><p className="text-muted-foreground">Financial data will be displayed here when connected to backend.</p></div>
          <div className="card-elevated p-6"><h3 className="font-semibold mb-4">{t('expenditureSummary')}</h3><p className="text-muted-foreground">Scheme-wise spending charts will appear here.</p></div>
        </div>
      </div>
    </MainLayout>
  );
}

export function TendersPage() {
  const { t } = useTranslation();
  return (
    <MainLayout>
      <div className="page-container py-8">
        <PageHeader title={t('eTenders')} description={t('openTenders')} icon={FileCheck} />
        <div className="space-y-4">
          {mockTenders.map((tender) => (
            <article key={tender.id} className="card-elevated p-5">
              <div className="flex justify-between items-start gap-4 mb-2">
                <h3 className="font-semibold text-foreground">{tender.title}</h3>
                <span className={`text-xs px-2 py-1 rounded ${tender.status === 'OPEN' ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'}`}>{tender.status === 'OPEN' ? t('statusOpen') : t('statusClosed')}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{tender.description}</p>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span>{t('estimatedCost')}: ₹{(tender.estimated_cost/100000).toFixed(1)}L</span>
                <span>{t('lastDate')}: {new Date(tender.last_date).toLocaleDateString()}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}

export function AssetsPage() {
  const { t } = useTranslation();
  return (
    <MainLayout>
      <div className="page-container py-8">
        <PageHeader title={t('villageAssets')} description={t('assetInventory')} icon={Package} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockAssets.map((asset) => (
            <article key={asset.id} className="card-elevated p-5">
              <h3 className="font-semibold text-foreground mb-2">{asset.name}</h3>
              <span className={`text-xs px-2 py-0.5 rounded ${asset.condition_status === 'GOOD' ? 'bg-success/10 text-success' : asset.condition_status === 'NEEDS_REPAIR' ? 'bg-warning/10 text-warning' : 'bg-destructive/10 text-destructive'}`}>{asset.condition_status.replace('_', ' ')}</span>
              <p className="text-sm text-muted-foreground mt-2">{asset.location_description}</p>
            </article>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}

export function TalukaPage() {
  const { t } = useTranslation();
  return (
    <MainLayout>
      <div className="page-container py-8">
        <PageHeader title={t('talukaPanchayat')} description={t('talukaAdmin')} icon={Landmark} />
        <div className="card-elevated p-6">
          <h3 className="font-semibold text-foreground mb-4">Dholka {t('talukaPanchayat')}</h3>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p><strong>{t('hqAddress')}:</strong> Taluka Panchayat Office, Dholka, Ahmedabad</p>
            <p><strong>{t('contact')}:</strong> 079-XXXXXXXX</p>
            <p><strong>{t('vision')}:</strong> Empowering rural communities through transparent governance</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
