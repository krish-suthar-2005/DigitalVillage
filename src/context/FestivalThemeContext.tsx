import React, { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import type { FestivalTheme, ThemeActivationLog } from '@/lib/theme-types';
import { festivalThemes, getDefaultTheme, getScheduledTheme, getThemeById } from '@/lib/festival-themes';

interface UserThemePreferences {
  disableAnimations: boolean;
  useDefaultTheme: boolean;
  reducedMotion: boolean;
}

interface FestivalThemeContextType {
  currentTheme: FestivalTheme;
  previewTheme: FestivalTheme | null;
  isPreviewMode: boolean;
  availableThemes: FestivalTheme[];
  activationLogs: ThemeActivationLog[];
  userPreferences: UserThemePreferences;
  
  // Actions
  setTheme: (themeId: string, activatedBy?: 'admin' | 'system' | 'schedule') => void;
  setPreviewTheme: (theme: FestivalTheme | null) => void;
  togglePreviewMode: (enabled: boolean) => void;
  revertToDefault: () => void;
  updateUserPreferences: (prefs: Partial<UserThemePreferences>) => void;
  checkScheduledThemes: () => void;
}

const FestivalThemeContext = createContext<FestivalThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'festival-theme-active';
const THEME_PREFS_KEY = 'festival-theme-prefs';
const THEME_LOGS_KEY = 'festival-theme-logs';

export function FestivalThemeProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<FestivalTheme>(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored) {
      const theme = getThemeById(stored);
      if (theme) return theme;
    }
    // Check for scheduled theme
    const scheduled = getScheduledTheme();
    return scheduled || getDefaultTheme();
  });
  
  const [previewTheme, setPreviewTheme] = useState<FestivalTheme | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [activationLogs, setActivationLogs] = useState<ThemeActivationLog[]>(() => {
    const stored = localStorage.getItem(THEME_LOGS_KEY);
    return stored ? JSON.parse(stored) : [];
  });
  
  const [userPreferences, setUserPreferences] = useState<UserThemePreferences>(() => {
    const stored = localStorage.getItem(THEME_PREFS_KEY);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return stored ? { ...JSON.parse(stored), reducedMotion: prefersReducedMotion } : {
      disableAnimations: false,
      useDefaultTheme: false,
      reducedMotion: prefersReducedMotion,
    };
  });

  // Apply theme to CSS variables
  const applyThemeToCss = useCallback((theme: FestivalTheme) => {
    const root = document.documentElement;
    const { colors, typography, borderRadius, background } = theme;

    // Apply colors
    root.style.setProperty('--primary', colors.primary);
    root.style.setProperty('--primary-light', colors.primaryLight);
    root.style.setProperty('--primary-dark', colors.primaryDark);
    root.style.setProperty('--secondary', colors.secondary);
    root.style.setProperty('--secondary-light', colors.secondaryLight);
    root.style.setProperty('--accent', colors.accent);
    root.style.setProperty('--accent-light', colors.accentLight);
    root.style.setProperty('--background', colors.background);
    root.style.setProperty('--background-alt', colors.backgroundAlt);
    root.style.setProperty('--card', colors.surface);
    root.style.setProperty('--card-alt', colors.surfaceAlt);
    root.style.setProperty('--popover', colors.surface);
    root.style.setProperty('--border', colors.border);
    root.style.setProperty('--border-light', colors.borderLight);
    root.style.setProperty('--foreground', colors.textPrimary);
    root.style.setProperty('--muted-foreground', colors.textSecondary);
    root.style.setProperty('--muted', colors.textMuted);
    root.style.setProperty('--link', colors.link);
    root.style.setProperty('--link-hover', colors.linkHover);
    root.style.setProperty('--success', colors.success);
    root.style.setProperty('--warning', colors.warning);
    root.style.setProperty('--destructive', colors.error);
    root.style.setProperty('--info', colors.info);

    // Apply typography
    root.style.setProperty('--font-sans', typography.fontFamily);
    root.style.setProperty('--font-heading', typography.fontFamilyHeading);
    
    // Apply border radius
    root.style.setProperty('--radius', `${0.5 * borderRadius}rem`);

    // Apply background
    if (background.type === 'gradient' || background.type === 'image') {
      document.body.style.background = background.value;
    } else {
      document.body.style.background = `hsl(${background.value})`;
    }

    // Set theme attribute for CSS selectors
    root.setAttribute('data-theme', theme.slug);
  }, []);

  // Effect to apply theme changes
  useEffect(() => {
    const themeToApply = isPreviewMode && previewTheme ? previewTheme : currentTheme;
    
    // Respect user preferences
    if (userPreferences.useDefaultTheme) {
      applyThemeToCss(getDefaultTheme());
    } else {
      applyThemeToCss(themeToApply);
    }
  }, [currentTheme, previewTheme, isPreviewMode, userPreferences.useDefaultTheme, applyThemeToCss]);

  // Save logs to localStorage
  useEffect(() => {
    localStorage.setItem(THEME_LOGS_KEY, JSON.stringify(activationLogs.slice(-100))); // Keep last 100 logs
  }, [activationLogs]);

  // Save preferences to localStorage
  useEffect(() => {
    localStorage.setItem(THEME_PREFS_KEY, JSON.stringify(userPreferences));
  }, [userPreferences]);

  // Check for scheduled themes periodically
  const checkScheduledThemes = useCallback(() => {
    if (userPreferences.useDefaultTheme) return;
    
    const scheduled = getScheduledTheme();
    if (scheduled && scheduled.id !== currentTheme.id) {
      setCurrentTheme(scheduled);
      localStorage.setItem(THEME_STORAGE_KEY, scheduled.id);
      
      // Log activation
      const log: ThemeActivationLog = {
        id: Date.now().toString(),
        themeId: scheduled.id,
        themeName: scheduled.name,
        activatedAt: new Date().toISOString(),
        activatedBy: 'schedule',
        reason: 'Scheduled theme auto-activation',
      };
      setActivationLogs(prev => [...prev, log]);
    } else if (!scheduled && currentTheme.category === 'festival') {
      // Revert to default if scheduled theme has ended
      const defaultTheme = getDefaultTheme();
      setCurrentTheme(defaultTheme);
      localStorage.setItem(THEME_STORAGE_KEY, defaultTheme.id);
      
      const log: ThemeActivationLog = {
        id: Date.now().toString(),
        themeId: defaultTheme.id,
        themeName: defaultTheme.name,
        activatedAt: new Date().toISOString(),
        activatedBy: 'system',
        reason: 'Scheduled theme expired, reverted to default',
      };
      setActivationLogs(prev => [...prev, log]);
    }
  }, [currentTheme.id, currentTheme.category, userPreferences.useDefaultTheme]);

  // Check scheduled themes on mount and every hour
  useEffect(() => {
    checkScheduledThemes();
    const interval = setInterval(checkScheduledThemes, 60 * 60 * 1000); // Every hour
    return () => clearInterval(interval);
  }, [checkScheduledThemes]);

  // Listen for reduced motion preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => {
      setUserPreferences(prev => ({ ...prev, reducedMotion: e.matches }));
    };
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const setTheme = useCallback((themeId: string, activatedBy: 'admin' | 'system' | 'schedule' = 'admin') => {
    const theme = getThemeById(themeId);
    if (!theme) return;

    setCurrentTheme(theme);
    localStorage.setItem(THEME_STORAGE_KEY, themeId);

    const log: ThemeActivationLog = {
      id: Date.now().toString(),
      themeId: theme.id,
      themeName: theme.name,
      activatedAt: new Date().toISOString(),
      activatedBy,
      reason: activatedBy === 'admin' ? 'Manual admin activation' : 'System activation',
    };
    setActivationLogs(prev => [...prev, log]);
  }, []);

  const togglePreviewMode = useCallback((enabled: boolean) => {
    setIsPreviewMode(enabled);
    if (!enabled) {
      setPreviewTheme(null);
    }
  }, []);

  const revertToDefault = useCallback(() => {
    const defaultTheme = getDefaultTheme();
    setCurrentTheme(defaultTheme);
    localStorage.setItem(THEME_STORAGE_KEY, defaultTheme.id);
    setPreviewTheme(null);
    setIsPreviewMode(false);

    const log: ThemeActivationLog = {
      id: Date.now().toString(),
      themeId: defaultTheme.id,
      themeName: defaultTheme.name,
      activatedAt: new Date().toISOString(),
      activatedBy: 'admin',
      reason: 'Manual revert to default',
    };
    setActivationLogs(prev => [...prev, log]);
  }, []);

  const updateUserPreferences = useCallback((prefs: Partial<UserThemePreferences>) => {
    setUserPreferences(prev => ({ ...prev, ...prefs }));
  }, []);

  return (
    <FestivalThemeContext.Provider
      value={{
        currentTheme,
        previewTheme,
        isPreviewMode,
        availableThemes: festivalThemes,
        activationLogs,
        userPreferences,
        setTheme,
        setPreviewTheme,
        togglePreviewMode,
        revertToDefault,
        updateUserPreferences,
        checkScheduledThemes,
      }}
    >
      {children}
    </FestivalThemeContext.Provider>
  );
}

export function useFestivalTheme() {
  const context = useContext(FestivalThemeContext);
  if (context === undefined) {
    throw new Error('useFestivalTheme must be used within a FestivalThemeProvider');
  }
  return context;
}
