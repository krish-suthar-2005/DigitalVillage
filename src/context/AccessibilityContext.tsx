import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export interface AccessibilitySettings {
  fontScale: number; // 0.85 - 1.5
  lineHeightScale: number; // 1.2 - 2.0
  letterSpacing: 'normal' | 'medium' | 'high';
  wordSpacing: 'normal' | 'medium' | 'high';
  highlightLinks: boolean;
  dyslexiaFont: boolean;
  hideImages: boolean;
  cursorMode: 'normal' | 'large';
  colorMode: 'light' | 'dark' | 'inverted';
}

const defaultAccessibility: AccessibilitySettings = {
  fontScale: 1,
  lineHeightScale: 1.5,
  letterSpacing: 'normal',
  wordSpacing: 'normal',
  highlightLinks: false,
  dyslexiaFont: false,
  hideImages: false,
  cursorMode: 'normal',
  colorMode: 'light',
};

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  updateSetting: <K extends keyof AccessibilitySettings>(key: K, value: AccessibilitySettings[K]) => void;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  resetAccessibility: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

const STORAGE_KEY = 'village-portal-accessibility';

const letterSpacingValues = { normal: '0em', medium: '0.05em', high: '0.1em' };
const wordSpacingValues = { normal: '0em', medium: '0.1em', high: '0.2em' };

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultAccessibility;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    applyAccessibilityToCss(settings);
  }, [settings]);

  const applyAccessibilityToCss = (s: AccessibilitySettings) => {
    const root = document.documentElement;
    const body = document.body;

    // Font scale
    root.style.setProperty('--font-scale', s.fontScale.toString());

    // Line height
    root.style.setProperty('--line-height-scale', s.lineHeightScale.toString());

    // Letter spacing
    root.style.setProperty('--letter-spacing', letterSpacingValues[s.letterSpacing]);

    // Word spacing
    root.style.setProperty('--word-spacing', wordSpacingValues[s.wordSpacing]);

    // Dyslexia font
    if (s.dyslexiaFont) {
      body.classList.add('dyslexia-font');
    } else {
      body.classList.remove('dyslexia-font');
    }

    // Highlight links
    if (s.highlightLinks) {
      body.classList.add('highlight-links');
    } else {
      body.classList.remove('highlight-links');
    }

    // Hide images
    if (s.hideImages) {
      body.classList.add('hide-images');
    } else {
      body.classList.remove('hide-images');
    }

    // Large cursor
    if (s.cursorMode === 'large') {
      body.classList.add('large-cursor');
    } else {
      body.classList.remove('large-cursor');
    }

    // Color mode
    body.classList.remove('inverted');
    root.classList.remove('dark');
    
    if (s.colorMode === 'dark') {
      root.classList.add('dark');
    } else if (s.colorMode === 'inverted') {
      body.classList.add('inverted');
    }
  };

  const updateSetting = <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const increaseFontSize = () => {
    setSettings(prev => ({
      ...prev,
      fontScale: Math.min(1.5, prev.fontScale + 0.1),
    }));
  };

  const decreaseFontSize = () => {
    setSettings(prev => ({
      ...prev,
      fontScale: Math.max(0.85, prev.fontScale - 0.1),
    }));
  };

  const resetAccessibility = () => {
    setSettings(defaultAccessibility);
  };

  return (
    <AccessibilityContext.Provider
      value={{
        settings,
        updateSetting,
        increaseFontSize,
        decreaseFontSize,
        resetAccessibility,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
}
