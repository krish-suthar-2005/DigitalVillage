// Theme System Types for Festival & Custom Themes

export type ThemeCategory = 'festival' | 'system' | 'custom';
export type ThemeStatus = 'draft' | 'active' | 'scheduled' | 'archived';
export type AnimationType = 'confetti' | 'snow' | 'fireworks' | 'diyas' | 'petals' | 'hearts' | 'leaves' | 'stars' | 'none';

export interface ThemeColors {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  secondary: string;
  secondaryLight: string;
  accent: string;
  accentLight: string;
  background: string;
  backgroundAlt: string;
  surface: string;
  surfaceAlt: string;
  border: string;
  borderLight: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  link: string;
  linkHover: string;
  success: string;
  warning: string;
  error: string;
  info: string;
}

export interface ThemeTypography {
  fontFamily: string;
  fontFamilyHeading: string;
  fontWeightNormal: number;
  fontWeightMedium: number;
  fontWeightBold: number;
  headingLetterSpacing: string;
  lineHeight: number;
}

export interface ThemeAssets {
  logoOverride?: string;
  headerDecoration?: string;
  footerDecoration?: string;
  heroBackground?: string;
  patternOverlay?: string;
  favicon?: string;
  iconPack?: string;
}

export interface ThemeBackground {
  type: 'solid' | 'gradient' | 'image' | 'pattern';
  value: string;
  overlay?: string;
  position?: string;
  size?: string;
}

export interface ThemeAnimation {
  type: AnimationType;
  enabled: boolean;
  intensity: 'low' | 'medium' | 'high';
  duration: number;
  respectReducedMotion: boolean;
}

export interface ThemeSchedule {
  startDate?: string; // ISO date
  endDate?: string;
  recurringYearly: boolean;
  priority: number; // Higher = more important
}

export interface FestivalTheme {
  id: string;
  slug: string;
  name: string;
  displayName: string;
  description: string;
  category: ThemeCategory;
  status: ThemeStatus;
  colors: ThemeColors;
  typography: ThemeTypography;
  assets: ThemeAssets;
  background: ThemeBackground;
  animation: ThemeAnimation;
  schedule?: ThemeSchedule;
  borderRadius: number;
  shadowIntensity: 'none' | 'subtle' | 'medium' | 'strong';
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
  year?: number;
}

export interface ThemeActivationLog {
  id: string;
  themeId: string;
  themeName: string;
  activatedAt: string;
  activatedBy: 'system' | 'admin' | 'schedule';
  deactivatedAt?: string;
  reason?: string;
}

export interface ThemeEngineState {
  currentTheme: FestivalTheme;
  previousTheme?: FestivalTheme;
  previewTheme?: FestivalTheme;
  isPreviewMode: boolean;
  availableThemes: FestivalTheme[];
  activationLogs: ThemeActivationLog[];
  userPreferences: {
    disableAnimations: boolean;
    useDefaultTheme: boolean;
    reducedMotion: boolean;
  };
}
