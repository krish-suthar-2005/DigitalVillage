import React, { useState } from 'react';
import {
  Palette,
  X,
  Check,
  Eye,
  EyeOff,
  RotateCcw,
  Sparkles,
  Calendar,
  Sun,
  Moon,
  Zap,
  Settings2,
  ChevronDown,
  ChevronUp,
  Info,
} from 'lucide-react';
import { useFestivalTheme } from '@/context/FestivalThemeContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { FestivalTheme } from '@/lib/theme-types';

export function ThemePicker() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [hoveredTheme, setHoveredTheme] = useState<string | null>(null);
  
  const {
    currentTheme,
    previewTheme,
    isPreviewMode,
    availableThemes,
    userPreferences,
    setTheme,
    setPreviewTheme,
    togglePreviewMode,
    revertToDefault,
    updateUserPreferences,
  } = useFestivalTheme();

  const activeTheme = isPreviewMode && previewTheme ? previewTheme : currentTheme;

  const festivalThemes = availableThemes.filter(t => t.category === 'festival');
  const systemThemes = availableThemes.filter(t => t.category === 'system');

  const handleThemeSelect = (theme: FestivalTheme) => {
    if (isPreviewMode) {
      setPreviewTheme(theme);
    } else {
      setTheme(theme.id);
    }
  };

  const handleApplyPreview = () => {
    if (previewTheme) {
      setTheme(previewTheme.id);
      togglePreviewMode(false);
    }
  };

  const getThemeEmoji = (slug: string): string => {
    const emojis: Record<string, string> = {
      default: '🎨',
      diwali: '🪔',
      holi: '🎨',
      'republic-day': '🇮🇳',
      'independence-day': '🇮🇳',
      christmas: '🎄',
      'new-year': '🎆',
      navratri: '🔱',
      'ganesh-chaturthi': '🐘',
      eid: '☪️',
      halloween: '🎃',
    };
    return emojis[slug] || '✨';
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'fixed right-4 top-1/3 z-50 p-3 rounded-full shadow-lg transition-all duration-300',
          'hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
          isOpen ? 'bg-primary text-primary-foreground rotate-180' : 'bg-card text-foreground border border-border'
        )}
        aria-label="Theme settings"
        aria-expanded={isOpen}
      >
        <Palette className="w-6 h-6" />
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Theme Panel */}
      <aside
        className={cn(
          'fixed right-0 top-0 h-full w-96 max-w-[90vw] bg-card border-l border-border shadow-xl z-50',
          'transform transition-transform duration-300',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        role="dialog"
        aria-label="Theme picker"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <header className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <h2 className="font-semibold text-foreground">Festival Themes</h2>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 hover:bg-muted rounded-md transition-colors"
              aria-label="Close theme picker"
            >
              <X className="w-5 h-5" />
            </button>
          </header>

          {/* Preview Mode Banner */}
          {isPreviewMode && (
            <div className="bg-warning/10 border-b border-warning/20 px-4 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <Eye className="w-4 h-4 text-warning" />
                <span className="text-warning font-medium">Preview Mode</span>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="ghost" onClick={() => togglePreviewMode(false)}>
                  Cancel
                </Button>
                <Button size="sm" onClick={handleApplyPreview} disabled={!previewTheme}>
                  <Check className="w-4 h-4 mr-1" />
                  Apply
                </Button>
              </div>
            </div>
          )}

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Current Theme */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-muted-foreground">Current Theme</h3>
                {!isPreviewMode && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => togglePreviewMode(true)}
                    className="text-xs"
                  >
                    <Eye className="w-3 h-3 mr-1" />
                    Preview Mode
                  </Button>
                )}
              </div>
              <div className="p-4 rounded-lg border-2 border-primary bg-primary/5">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getThemeEmoji(activeTheme.slug)}</span>
                  <div>
                    <p className="font-medium text-foreground">{activeTheme.displayName}</p>
                    <p className="text-xs text-muted-foreground">{activeTheme.description}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Festival Themes */}
            <section>
              <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Festival Themes
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {festivalThemes.map((theme) => (
                  <ThemeCard
                    key={theme.id}
                    theme={theme}
                    isActive={activeTheme.id === theme.id}
                    isHovered={hoveredTheme === theme.id}
                    emoji={getThemeEmoji(theme.slug)}
                    onSelect={() => handleThemeSelect(theme)}
                    onHover={(h) => setHoveredTheme(h ? theme.id : null)}
                  />
                ))}
              </div>
            </section>

            {/* System Themes */}
            <section>
              <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                <Settings2 className="w-4 h-4" />
                System Themes
              </h3>
              <div className="space-y-2">
                {systemThemes.map((theme) => (
                  <ThemeCard
                    key={theme.id}
                    theme={theme}
                    isActive={activeTheme.id === theme.id}
                    isHovered={hoveredTheme === theme.id}
                    emoji={getThemeEmoji(theme.slug)}
                    onSelect={() => handleThemeSelect(theme)}
                    onHover={(h) => setHoveredTheme(h ? theme.id : null)}
                    compact
                  />
                ))}
              </div>
            </section>

            {/* User Preferences */}
            <section>
              <button
                onClick={() => setShowPreferences(!showPreferences)}
                className="w-full flex items-center justify-between text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Preferences
                </span>
                {showPreferences ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              
              {showPreferences && (
                <div className="mt-3 space-y-3">
                  <PreferenceToggle
                    label="Disable Animations"
                    description="Turn off all theme animations"
                    checked={userPreferences.disableAnimations}
                    onChange={(v) => updateUserPreferences({ disableAnimations: v })}
                  />
                  <PreferenceToggle
                    label="Use Default Theme"
                    description="Always use the default theme"
                    checked={userPreferences.useDefaultTheme}
                    onChange={(v) => updateUserPreferences({ useDefaultTheme: v })}
                  />
                  {userPreferences.reducedMotion && (
                    <div className="flex items-start gap-2 p-3 bg-info/10 rounded-lg text-sm">
                      <Info className="w-4 h-4 text-info mt-0.5" />
                      <span className="text-muted-foreground">
                        Animations are disabled because your system has reduced motion enabled.
                      </span>
                    </div>
                  )}
                </div>
              )}
            </section>
          </div>

          {/* Footer */}
          <footer className="p-4 border-t border-border">
            <Button
              variant="outline"
              className="w-full"
              onClick={revertToDefault}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset to Default
            </Button>
          </footer>
        </div>
      </aside>
    </>
  );
}

interface ThemeCardProps {
  theme: FestivalTheme;
  isActive: boolean;
  isHovered: boolean;
  emoji: string;
  onSelect: () => void;
  onHover: (hovered: boolean) => void;
  compact?: boolean;
}

function ThemeCard({ theme, isActive, isHovered, emoji, onSelect, onHover, compact }: ThemeCardProps) {
  const isScheduled = theme.schedule?.startDate;
  
  return (
    <button
      onClick={onSelect}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      className={cn(
        'relative p-3 rounded-lg border transition-all text-left w-full',
        isActive 
          ? 'border-primary bg-primary/10 shadow-sm' 
          : 'border-border hover:border-primary/50 hover:bg-muted/50',
        compact && 'flex items-center gap-3'
      )}
    >
      {/* Color preview dots */}
      <div className={cn('flex gap-1', compact ? 'order-2 ml-auto' : 'absolute top-2 right-2')}>
        <div 
          className="w-3 h-3 rounded-full border border-border/50" 
          style={{ backgroundColor: `hsl(${theme.colors.primary})` }} 
        />
        <div 
          className="w-3 h-3 rounded-full border border-border/50" 
          style={{ backgroundColor: `hsl(${theme.colors.secondary})` }} 
        />
        <div 
          className="w-3 h-3 rounded-full border border-border/50" 
          style={{ backgroundColor: `hsl(${theme.colors.accent})` }} 
        />
      </div>

      <div className={cn('flex items-center gap-2', compact && 'flex-1')}>
        <span className={compact ? 'text-xl' : 'text-2xl mb-1'}>{emoji}</span>
        <div className={compact ? '' : 'mt-1'}>
          <p className="font-medium text-foreground text-sm">{theme.name}</p>
          {!compact && (
            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
              {theme.description}
            </p>
          )}
        </div>
      </div>

      {/* Active indicator */}
      {isActive && (
        <div className={cn(
          'absolute bg-primary text-primary-foreground rounded-full p-0.5',
          compact ? 'top-1/2 -translate-y-1/2 left-2' : 'top-2 left-2'
        )}>
          <Check className="w-3 h-3" />
        </div>
      )}

      {/* Scheduled indicator */}
      {isScheduled && !compact && (
        <div className="absolute bottom-2 right-2">
          <Calendar className="w-3 h-3 text-muted-foreground" />
        </div>
      )}
    </button>
  );
}

interface PreferenceToggleProps {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

function PreferenceToggle({ label, description, checked, onChange }: PreferenceToggleProps) {
  return (
    <label className="flex items-start justify-between p-3 bg-muted/50 rounded-lg cursor-pointer hover:bg-muted transition-colors">
      <div>
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative w-10 h-6 rounded-full transition-colors flex-shrink-0 ml-3',
          checked ? 'bg-primary' : 'bg-border'
        )}
      >
        <span
          className={cn(
            'absolute top-1 w-4 h-4 bg-primary-foreground rounded-full transition-transform',
            checked ? 'translate-x-5' : 'translate-x-1'
          )}
        />
      </button>
    </label>
  );
}
