import React, { useState, useEffect, useCallback } from 'react';
import { OnboardingModal } from './OnboardingModal';
import { CesiumGlobe } from './CesiumGlobe';
import { getStoredOnboarding, type OnboardingData } from '@/lib/location-data';

type FlowPhase = 'idle' | 'modal' | 'globe' | 'complete';

interface OnboardingFlowProps {
  children: React.ReactNode;
}

export function OnboardingFlow({ children }: OnboardingFlowProps) {
  const [phase, setPhase] = useState<FlowPhase>('idle');
  const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(null);
  const [zoomPath, setZoomPath] = useState<{ lat: number; lon: number; height: number }[]>([]);

  useEffect(() => {
    // Check if onboarding already completed
    const stored = getStoredOnboarding();
    if (stored) {
      setOnboardingData(stored);
      setPhase('complete');
    } else {
      setPhase('modal');
    }
  }, []);

  const handleModalComplete = useCallback(
    (data: OnboardingData, path: { lat: number; lon: number; height: number }[]) => {
      setOnboardingData(data);
      setZoomPath(path);
      setPhase('globe');
    },
    []
  );

  const handleAnimationComplete = useCallback(() => {
    setPhase('complete');
  }, []);

  // Loading state
  if (phase === 'idle') {
    return null;
  }

  // Show modal
  if (phase === 'modal') {
    return (
      <>
        {/* Render homepage dimmed behind */}
        <div className="pointer-events-none opacity-30" aria-hidden="true">
          {children}
        </div>
        <OnboardingModal onComplete={handleModalComplete} />
      </>
    );
  }

  // Show globe animation
  if (phase === 'globe' && onboardingData) {
    return (
      <CesiumGlobe
        zoomPath={zoomPath}
        villageName={onboardingData.villageName}
        onAnimationComplete={handleAnimationComplete}
      />
    );
  }

  // Complete — show normal app
  return <>{children}</>;
}
