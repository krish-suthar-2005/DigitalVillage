import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import {
  Theme,
  ThemeId,
  themes,
  getThemeById,
  getDefaultTheme,
  getScheduledTheme,
  getSystemThemes,
  getFestivalThemes,
  applyTheme,
  saveThemePreference,
  loadThemePreference,
  areAnimationsDisabled,
  setAnimationsDisabled,
  initializeTheme,
} from '@/lib/theme-engine';

interface ThemeEngineContextType {
  // State
  currentTheme: Theme;
  systemThemes: Theme[];
  festivalThemes: Theme[];
  animationsEnabled: boolean;
  
  // Actions
  setTheme: (id: ThemeId) => void;
  resetToDefault: () => void;
  toggleAnimations: () => void;
}

const ThemeEngineContext = createContext<ThemeEngineContextType | undefined>(undefined);

export function ThemeEngineProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
    // Initialize on first render
    if (typeof window !== 'undefined') {
      return initializeTheme();
    }
    return getDefaultTheme();
  });
  
  const [animationsEnabled, setAnimationsEnabled] = useState(() => {
    if (typeof window !== 'undefined') {
      // Check for reduced motion preference
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      return !prefersReduced && !areAnimationsDisabled();
    }
    return true;
  });

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setAnimationsEnabled(false);
      }
    };
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Check for scheduled themes periodically
  useEffect(() => {
    const checkScheduled = () => {
      // Only auto-switch if user hasn't manually selected a theme
      const savedPref = loadThemePreference();
      if (!savedPref) {
        const scheduled = getScheduledTheme();
        if (scheduled && scheduled.id !== currentTheme.id) {
          setCurrentTheme(scheduled);
          applyTheme(scheduled);
        } else if (!scheduled && currentTheme.category === 'festival') {
          // Revert to default when festival ends
          const defaultTheme = getDefaultTheme();
          setCurrentTheme(defaultTheme);
          applyTheme(defaultTheme);
        }
      }
    };

    // Check every hour
    const interval = setInterval(checkScheduled, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, [currentTheme.id, currentTheme.category]);

  const setTheme = useCallback((id: ThemeId) => {
    const theme = getThemeById(id);
    setCurrentTheme(theme);
    applyTheme(theme);
    saveThemePreference(id);
  }, []);

  const resetToDefault = useCallback(() => {
    const defaultTheme = getDefaultTheme();
    setCurrentTheme(defaultTheme);
    applyTheme(defaultTheme);
    saveThemePreference('default');
  }, []);

  const toggleAnimations = useCallback(() => {
    setAnimationsEnabled(prev => {
      const newValue = !prev;
      setAnimationsDisabled(!newValue);
      return newValue;
    });
  }, []);

  return (
    <ThemeEngineContext.Provider
      value={{
        currentTheme,
        systemThemes: getSystemThemes(),
        festivalThemes: getFestivalThemes(),
        animationsEnabled,
        setTheme,
        resetToDefault,
        toggleAnimations,
      }}
    >
      {children}
    </ThemeEngineContext.Provider>
  );
}

export function useThemeEngine() {
  const context = useContext(ThemeEngineContext);
  if (context === undefined) {
    throw new Error('useThemeEngine must be used within a ThemeEngineProvider');
  }
  return context;
}
