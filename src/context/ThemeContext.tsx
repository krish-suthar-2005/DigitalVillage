import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export interface ThemeSettings {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  borderRadiusScale: number;
  fontSizeScale: number;
  currentThemeName: 'default' | 'dark' | 'high-contrast' | 'image-based';
}

const defaultTheme: ThemeSettings = {
  primaryColor: '199 89% 28%',
  secondaryColor: '158 64% 40%',
  backgroundColor: '210 20% 98%',
  textColor: '215 25% 15%',
  accentColor: '38 92% 50%',
  borderRadiusScale: 1,
  fontSizeScale: 1,
  currentThemeName: 'default',
};

const darkTheme: ThemeSettings = {
  primaryColor: '199 80% 55%',
  secondaryColor: '158 60% 50%',
  backgroundColor: '215 28% 10%',
  textColor: '210 20% 95%',
  accentColor: '38 90% 55%',
  borderRadiusScale: 1,
  fontSizeScale: 1,
  currentThemeName: 'dark',
};

const highContrastTheme: ThemeSettings = {
  primaryColor: '0 0% 0%',
  secondaryColor: '0 0% 20%',
  backgroundColor: '0 0% 100%',
  textColor: '0 0% 0%',
  accentColor: '0 100% 50%',
  borderRadiusScale: 0,
  fontSizeScale: 1.1,
  currentThemeName: 'high-contrast',
};

interface ThemeContextType {
  theme: ThemeSettings;
  setTheme: (theme: ThemeSettings) => void;
  updateThemeProperty: <K extends keyof ThemeSettings>(key: K, value: ThemeSettings[K]) => void;
  applyPresetTheme: (themeName: ThemeSettings['currentThemeName']) => void;
  applyImageBasedTheme: (colors: { primary: string; secondary: string; accent: string }) => void;
  resetTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = 'village-portal-theme';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeSettings>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultTheme;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(theme));
    applyThemeToCss(theme);
  }, [theme]);

  const applyThemeToCss = (t: ThemeSettings) => {
    const root = document.documentElement;
    
    // Remove existing theme classes
    root.classList.remove('dark', 'high-contrast');
    
    if (t.currentThemeName === 'dark') {
      root.classList.add('dark');
    } else if (t.currentThemeName === 'high-contrast') {
      root.classList.add('high-contrast');
    }

    // Apply CSS variables for custom theming
    root.style.setProperty('--color-primary', t.primaryColor);
    root.style.setProperty('--color-secondary', t.secondaryColor);
    root.style.setProperty('--radius', `${0.5 * t.borderRadiusScale}rem`);
    
    // Font scale is handled via accessibility
  };

  const setTheme = (newTheme: ThemeSettings) => {
    setThemeState(newTheme);
  };

  const updateThemeProperty = <K extends keyof ThemeSettings>(key: K, value: ThemeSettings[K]) => {
    setThemeState(prev => ({ ...prev, [key]: value }));
  };

  const applyPresetTheme = (themeName: ThemeSettings['currentThemeName']) => {
    switch (themeName) {
      case 'dark':
        setThemeState(darkTheme);
        break;
      case 'high-contrast':
        setThemeState(highContrastTheme);
        break;
      default:
        setThemeState(defaultTheme);
    }
  };

  const applyImageBasedTheme = (colors: { primary: string; secondary: string; accent: string }) => {
    setThemeState(prev => ({
      ...prev,
      primaryColor: colors.primary,
      secondaryColor: colors.secondary,
      accentColor: colors.accent,
      currentThemeName: 'image-based',
    }));
  };

  const resetTheme = () => {
    setThemeState(defaultTheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        updateThemeProperty,
        applyPresetTheme,
        applyImageBasedTheme,
        resetTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
