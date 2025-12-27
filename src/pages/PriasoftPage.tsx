import React from 'react';
import { ExternalLink, FileText, DollarSign, Users, ClipboardList, Database, Shield, HelpCircle } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';

const priasoftLinks = [
  {
    id: 1,
    icon: DollarSign,
    titleKey: 'priasoftBudget',
    descKey: 'priasoftBudgetDesc',
    url: 'https://pria.gujarat.gov.in/',
    color: 'bg-success/10 text-success',
  },
  {
    id: 2,
    icon: FileText,
    titleKey: 'priasoftAccounts',
    descKey: 'priasoftAccountsDesc',
    url: 'https://pria.gujarat.gov.in/',
    color: 'bg-primary/10 text-primary',
  },
  {
    id: 3,
    icon: Users,
    titleKey: 'priasoftPayroll',
    descKey: 'priasoftPayrollDesc',
    url: 'https://pria.gujarat.gov.in/',
    color: 'bg-warning/10 text-warning',
  },
  {
    id: 4,
    icon: ClipboardList,
    titleKey: 'priasoftWorks',
    descKey: 'priasoftWorksDesc',
    url: 'https://pria.gujarat.gov.in/',
    color: 'bg-info/10 text-info',
  },
  {
    id: 5,
    icon: Database,
    titleKey: 'priasoftAssets',
    descKey: 'priasoftAssetsDesc',
    url: 'https://pria.gujarat.gov.in/',
    color: 'bg-accent/10 text-accent',
  },
  {
    id: 6,
    icon: Shield,
    titleKey: 'priasoftAudit',
    descKey: 'priasoftAuditDesc',
    url: 'https://pria.gujarat.gov.in/',
    color: 'bg-destructive/10 text-destructive',
  },
];

export default function PriasoftPage() {
  const { t } = useTranslation();

  return (
    <MainLayout>
      <main id="main-content" className="page-container">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-2xl mb-4">
            <FileText className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t('priasoft')}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t('priasoftSubtitle')}</p>
        </header>

        {/* What is PRIASOFT */}
        <section className="bg-card border border-border rounded-xl p-8 mb-12">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <HelpCircle className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-2">{t('whatIsPriasoft')}</h2>
              <p className="text-muted-foreground leading-relaxed">{t('priasoftDescription')}</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 mt-8">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="text-3xl font-bold text-primary mb-1">30,000+</p>
              <p className="text-sm text-muted-foreground">{t('panchayatsUsing')}</p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="text-3xl font-bold text-primary mb-1">100%</p>
              <p className="text-sm text-muted-foreground">{t('digitalTransactions')}</p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="text-3xl font-bold text-primary mb-1">24/7</p>
              <p className="text-sm text-muted-foreground">{t('onlineAccess')}</p>
            </div>
          </div>
        </section>

        {/* PRIASOFT Modules */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">{t('priasoftModules')}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {priasoftLinks.map((link) => (
              <article key={link.id} className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${link.color}`}>
                  <link.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{t(link.titleKey)}</h3>
                <p className="text-sm text-muted-foreground mb-4">{t(link.descKey)}</p>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary hover:underline"
                >
                  {t('accessModule')}
                  <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </article>
            ))}
          </div>
        </section>

        {/* Quick Access */}
        <section className="bg-gradient-to-r from-primary to-primary/80 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-semibold text-primary-foreground mb-4">{t('accessPriasoft')}</h2>
          <p className="text-primary-foreground/90 mb-6 max-w-xl mx-auto">{t('accessPriasoftDesc')}</p>
          <Button
            asChild
            variant="secondary"
            size="lg"
            className="gap-2"
          >
            <a href="https://pria.gujarat.gov.in/" target="_blank" rel="noopener noreferrer">
              {t('goToPriasoft')}
              <ExternalLink className="w-4 h-4" />
            </a>
          </Button>
        </section>
      </main>
    </MainLayout>
  );
}
