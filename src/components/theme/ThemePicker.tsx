import React, { useState } from 'react';
import { Palette, X, Check, RotateCcw, Sparkles, Moon, Sun, Calendar } from 'lucide-react';
import { useThemeEngine } from '@/context/ThemeEngineContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Theme } from '@/lib/theme-engine';

export function ThemePicker() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    currentTheme,
    systemThemes,
    festivalThemes,
    animationsEnabled,
    setTheme,
    resetToDefault,
    toggleAnimations,
  } = useThemeEngine();

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'fixed right-4 bottom-36 z-50 p-4 rounded-full shadow-lg transition-all duration-200',
          'hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
          'bg-card text-foreground border border-border hover:border-primary/50'
        )}
        aria-label="Open theme settings"
        aria-expanded={isOpen}
      >
        <Palette className="w-9 h-9" />
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-foreground/10 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Theme Panel */}
      <aside
        className={cn(
          'fixed right-0 top-0 h-full w-80 max-w-[90vw] bg-card border-l border-border shadow-xl z-50',
          'transform transition-transform duration-300 ease-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        role="dialog"
        aria-label="Theme settings"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <header className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <h2 className="font-semibold text-foreground">Theme</h2>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 hover:bg-muted rounded-md transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </header>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Current Theme Display */}
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{currentTheme.emoji}</span>
                <div>
                  <p className="font-medium text-foreground">{currentTheme.displayName}</p>
                  <p className="text-xs text-muted-foreground">{currentTheme.description}</p>
                </div>
              </div>
            </div>

            {/* System Themes */}
            <section>
              <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                {currentTheme.isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                System Themes
              </h3>
              <div className="space-y-2">
                {systemThemes.map((theme) => (
                  <ThemeOption
                    key={theme.id}
                    theme={theme}
                    isActive={currentTheme.id === theme.id}
                    onSelect={() => setTheme(theme.id)}
                  />
                ))}
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
                  <ThemeOption
                    key={theme.id}
                    theme={theme}
                    isActive={currentTheme.id === theme.id}
                    onSelect={() => setTheme(theme.id)}
                    compact
                  />
                ))}
              </div>
            </section>

            {/* Animations Toggle */}
            <section className="pt-2 border-t border-border">
              <label className="flex items-center justify-between p-3 bg-muted/30 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                <div>
                  <p className="text-sm font-medium text-foreground">Animations</p>
                  <p className="text-xs text-muted-foreground">
                    {animationsEnabled ? 'Theme effects are enabled' : 'Theme effects are disabled'}
                  </p>
                </div>
                <button
                  role="switch"
                  aria-checked={animationsEnabled}
                  onClick={toggleAnimations}
                  className={cn(
                    'relative w-10 h-6 rounded-full transition-colors',
                    animationsEnabled ? 'bg-primary' : 'bg-muted'
                  )}
                >
                  <span
                    className={cn(
                      'absolute top-1 w-4 h-4 rounded-full transition-transform bg-card',
                      animationsEnabled ? 'translate-x-5' : 'translate-x-1'
                    )}
                  />
                </button>
              </label>
            </section>
          </div>

          {/* Footer */}
          <footer className="p-4 border-t border-border">
            <Button
              variant="outline"
              className="w-full"
              onClick={resetToDefault}
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

interface ThemeOptionProps {
  theme: Theme;
  isActive: boolean;
  onSelect: () => void;
  compact?: boolean;
}

function ThemeOption({ theme, isActive, onSelect, compact }: ThemeOptionProps) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        'relative w-full p-3 rounded-lg border text-left transition-all',
        isActive
          ? 'border-primary bg-primary/5 shadow-sm'
          : 'border-border hover:border-primary/40 hover:bg-muted/30',
        compact && 'p-2.5'
      )}
    >
      <div className={cn('flex items-center', compact ? 'gap-2' : 'gap-3')}>
        <span className={compact ? 'text-lg' : 'text-xl'}>{theme.emoji}</span>
        <div className="flex-1 min-w-0">
          <p className={cn('font-medium text-foreground', compact ? 'text-xs' : 'text-sm')}>
            {theme.name}
          </p>
          {!compact && (
            <p className="text-xs text-muted-foreground truncate">{theme.description}</p>
          )}
        </div>
      </div>

      {/* Active indicator */}
      {isActive && (
        <div className="absolute top-2 right-2 w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
          <Check className="w-3 h-3" />
        </div>
      )}
    </button>
  );
}
