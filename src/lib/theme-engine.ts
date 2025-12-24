// ===========================================
// PROFESSIONAL THEME ENGINE
// Clean, scalable, production-ready
// ===========================================

export type ThemeId = 
  | 'default' 
  | 'dark'
  | 'republic-day' 
  | 'independence-day' 
  | 'diwali' 
  | 'holi' 
  | 'christmas' 
  | 'new-year' 
  | 'navratri' 
  | 'ganesh-chaturthi' 
  | 'eid';

export type ThemeCategory = 'system' | 'festival';
export type AnimationType = 'none' | 'confetti' | 'snow' | 'fireworks' | 'diyas' | 'petals' | 'stars';

export interface Theme {
  id: ThemeId;
  name: string;
  displayName: string;
  description: string;
  category: ThemeCategory;
  emoji: string;
  isDark: boolean;
  animation: AnimationType;
  schedule?: {
    month: number; // 1-12
    startDay: number;
    endDay: number;
  };
}

// Theme definitions - clean, minimal, focused
export const themes: Theme[] = [
  {
    id: 'default',
    name: 'Default',
    displayName: 'Professional',
    description: 'Clean, professional theme for government use',
    category: 'system',
    emoji: '🏛️',
    isDark: false,
    animation: 'none',
  },
  {
    id: 'dark',
    name: 'Dark',
    displayName: 'Dark Mode',
    description: 'Comfortable dark theme for low-light environments',
    category: 'system',
    emoji: '🌙',
    isDark: true,
    animation: 'none',
  },
  {
    id: 'republic-day',
    name: 'Republic Day',
    displayName: 'Republic Day',
    description: 'Celebrate the spirit of our Republic',
    category: 'festival',
    emoji: '🇮🇳',
    isDark: false,
    animation: 'confetti',
    schedule: { month: 1, startDay: 24, endDay: 28 },
  },
  {
    id: 'independence-day',
    name: 'Independence Day',
    displayName: 'Independence Day',
    description: 'Celebrate freedom and patriotism',
    category: 'festival',
    emoji: '🇮🇳',
    isDark: false,
    animation: 'confetti',
    schedule: { month: 8, startDay: 13, endDay: 17 },
  },
  {
    id: 'diwali',
    name: 'Diwali',
    displayName: 'Diwali',
    description: 'Festival of Lights',
    category: 'festival',
    emoji: '🪔',
    isDark: true,
    animation: 'diyas',
    schedule: { month: 11, startDay: 1, endDay: 5 },
  },
  {
    id: 'holi',
    name: 'Holi',
    displayName: 'Holi',
    description: 'Festival of Colors',
    category: 'festival',
    emoji: '🎨',
    isDark: false,
    animation: 'confetti',
    schedule: { month: 3, startDay: 24, endDay: 27 },
  },
  {
    id: 'christmas',
    name: 'Christmas',
    displayName: 'Christmas',
    description: 'Festive holiday spirit',
    category: 'festival',
    emoji: '🎄',
    isDark: false,
    animation: 'snow',
    schedule: { month: 12, startDay: 20, endDay: 27 },
  },
  {
    id: 'new-year',
    name: 'New Year',
    displayName: 'New Year',
    description: 'Ring in the new year',
    category: 'festival',
    emoji: '🎆',
    isDark: true,
    animation: 'fireworks',
    schedule: { month: 1, startDay: 1, endDay: 3 },
  },
  {
    id: 'navratri',
    name: 'Navratri',
    displayName: 'Navratri',
    description: 'Nine nights of celebration',
    category: 'festival',
    emoji: '🔱',
    isDark: false,
    animation: 'petals',
    schedule: { month: 10, startDay: 3, endDay: 12 },
  },
  {
    id: 'ganesh-chaturthi',
    name: 'Ganesh Chaturthi',
    displayName: 'Ganesh Chaturthi',
    description: 'Celebrate Lord Ganesha',
    category: 'festival',
    emoji: '🐘',
    isDark: false,
    animation: 'petals',
    schedule: { month: 9, startDay: 7, endDay: 17 },
  },
  {
    id: 'eid',
    name: 'Eid',
    displayName: 'Eid Mubarak',
    description: 'Celebrate with joy and blessings',
    category: 'festival',
    emoji: '☪️',
    isDark: false,
    animation: 'stars',
  },
];

// Storage key
const THEME_STORAGE_KEY = 'village-portal-theme';
const ANIMATIONS_DISABLED_KEY = 'village-portal-animations-disabled';

// Get theme by ID with fallback
export function getThemeById(id: string): Theme {
  return themes.find(t => t.id === id) || themes[0];
}

// Get default theme
export function getDefaultTheme(): Theme {
  return themes[0];
}

// Get all system themes
export function getSystemThemes(): Theme[] {
  return themes.filter(t => t.category === 'system');
}

// Get all festival themes
export function getFestivalThemes(): Theme[] {
  return themes.filter(t => t.category === 'festival');
}

// Check if a theme is scheduled for today
export function isThemeScheduledToday(theme: Theme): boolean {
  if (!theme.schedule) return false;
  
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  
  return (
    theme.schedule.month === month &&
    day >= theme.schedule.startDay &&
    day <= theme.schedule.endDay
  );
}

// Get currently scheduled theme (if any)
export function getScheduledTheme(): Theme | null {
  return themes.find(t => isThemeScheduledToday(t)) || null;
}

// Apply theme to DOM
export function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  
  // Remove all theme classes and data attributes
  root.classList.remove('dark', 'high-contrast');
  root.removeAttribute('data-theme');
  
  // Apply dark mode if needed
  if (theme.isDark) {
    root.classList.add('dark');
  }
  
  // Apply theme data attribute for CSS variables
  if (theme.id !== 'default' && theme.id !== 'dark') {
    root.setAttribute('data-theme', theme.id);
  }
  
  // Apply gradient background
  document.body.style.background = '';
}

// Save theme preference
export function saveThemePreference(themeId: ThemeId): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, themeId);
  } catch (e) {
    console.warn('Could not save theme preference');
  }
}

// Load saved theme preference
export function loadThemePreference(): ThemeId | null {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved && themes.some(t => t.id === saved)) {
      return saved as ThemeId;
    }
  } catch (e) {
    console.warn('Could not load theme preference');
  }
  return null;
}

// Check if animations are disabled
export function areAnimationsDisabled(): boolean {
  try {
    return localStorage.getItem(ANIMATIONS_DISABLED_KEY) === 'true';
  } catch {
    return false;
  }
}

// Toggle animations
export function setAnimationsDisabled(disabled: boolean): void {
  try {
    localStorage.setItem(ANIMATIONS_DISABLED_KEY, String(disabled));
  } catch {
    // ignore
  }
}

// Initialize theme on page load
export function initializeTheme(): Theme {
  // Check for saved preference first
  const savedId = loadThemePreference();
  if (savedId) {
    const theme = getThemeById(savedId);
    applyTheme(theme);
    return theme;
  }
  
  // Check for scheduled festival theme
  const scheduled = getScheduledTheme();
  if (scheduled) {
    applyTheme(scheduled);
    return scheduled;
  }
  
  // Fall back to default
  const defaultTheme = getDefaultTheme();
  applyTheme(defaultTheme);
  return defaultTheme;
}
