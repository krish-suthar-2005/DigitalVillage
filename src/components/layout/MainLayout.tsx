import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { AccessibilityToolbar } from '@/components/accessibility/AccessibilityToolbar';
import { AlertBanner } from '@/components/common/AlertBanner';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AlertBanner />
      <Header />
      <main id="main-content" className="flex-1" role="main">
        {children}
      </main>
      <Footer />
      <AccessibilityToolbar />
    </div>
  );
}
