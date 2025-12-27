import React, { useState } from 'react';
import {
  Accessibility,
  ZoomIn,
  ZoomOut,
  Type,
  Link2,
  Eye,
  EyeOff,
  MousePointer,
  Sun,
  Moon,
  Contrast,
  RotateCcw,
  X,
  ChevronDown,
} from 'lucide-react';
import { useAccessibility } from '@/context/AccessibilityContext';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function AccessibilityToolbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { settings, updateSetting, increaseFontSize, decreaseFontSize, resetAccessibility } = useAccessibility();
  const { resetTheme } = useTheme();

  const handleReset = () => {
    resetAccessibility();
    resetTheme();
  };

  return (
    <>
      {/* Floating trigger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-4 bottom-0 -translate-y-1/2 z-50 bg-primary text-primary-foreground p-4 rounded-full shadow-lg hover:shadow-glow transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        aria-label="Open accessibility menu"
        aria-expanded={isOpen}
      >
        <img src="icons/gujarat_map.svg" className="w-9 h-9" alt="gujarat map svg" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 z-40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Panel */}
      <aside
        className={cn(
          'fixed right-0 top-0 h-full w-80 bg-card border-l border-border shadow-xl z-50 transform transition-transform duration-300',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        role="dialog"
        aria-label="Accessibility settings"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <header className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <Accessibility className="w-5 h-5 text-primary" />
              <h2 className="font-semibold text-foreground">Accessibility</h2>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-muted rounded-md transition-colors"
              aria-label="Close accessibility menu"
            >
              <X className="w-5 h-5" />
            </button>
          </header>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Text Size */}
            <section>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Text Size</h3>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={decreaseFontSize}
                  disabled={settings.fontScale <= 0.85}
                  className="flex-1"
                >
                  <ZoomOut className="w-4 h-4 mr-1" />
                  Smaller
                </Button>
                <span className="text-sm font-medium w-12 text-center">
                  {Math.round(settings.fontScale * 100)}%
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={increaseFontSize}
                  disabled={settings.fontScale >= 1.5}
                  className="flex-1"
                >
                  <ZoomIn className="w-4 h-4 mr-1" />
                  Bigger
                </Button>
              </div>
            </section>

            {/* Line Height */}
            <section>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Line Height</h3>
              <div className="flex gap-2">
                {[
                  { value: 1.2, label: 'Compact' },
                  { value: 1.5, label: 'Normal' },
                  { value: 2.0, label: 'Relaxed' },
                ].map((opt) => (
                  <Button
                    key={opt.value}
                    variant={settings.lineHeightScale === opt.value ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => updateSetting('lineHeightScale', opt.value)}
                    className="flex-1"
                  >
                    {opt.label}
                  </Button>
                ))}
              </div>
            </section>

            {/* Text Spacing */}
            <section>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Text Spacing</h3>
              <div className="flex gap-2">
                {(['normal', 'medium', 'high'] as const).map((value) => (
                  <Button
                    key={value}
                    variant={settings.letterSpacing === value ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => updateSetting('letterSpacing', value)}
                    className="flex-1 capitalize"
                  >
                    {value}
                  </Button>
                ))}
              </div>
            </section>

            {/* Toggle Options */}
            <section className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Display Options</h3>

              <ToggleOption
                icon={<Link2 className="w-4 h-4" />}
                label="Highlight Links"
                checked={settings.highlightLinks}
                onChange={(v) => updateSetting('highlightLinks', v)}
              />

              <ToggleOption
                icon={<Type className="w-4 h-4" />}
                label="Dyslexia-Friendly Font"
                checked={settings.dyslexiaFont}
                onChange={(v) => updateSetting('dyslexiaFont', v)}
              />

              <ToggleOption
                icon={settings.hideImages ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                label="Hide Images"
                checked={settings.hideImages}
                onChange={(v) => updateSetting('hideImages', v)}
              />

              <ToggleOption
                icon={<MousePointer className="w-4 h-4" />}
                label="Large Cursor"
                checked={settings.cursorMode === 'large'}
                onChange={(v) => updateSetting('cursorMode', v ? 'large' : 'normal')}
              />
            </section>

            {/* Color Mode */}
            <section>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Color Mode</h3>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={settings.colorMode === 'light' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => updateSetting('colorMode', 'light')}
                  className="flex-col h-auto py-3"
                >
                  <Sun className="w-5 h-5 mb-1" />
                  Light
                </Button>
                <Button
                  variant={settings.colorMode === 'dark' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => updateSetting('colorMode', 'dark')}
                  className="flex-col h-auto py-3"
                >
                  <Moon className="w-5 h-5 mb-1" />
                  Dark
                </Button>
                <Button
                  variant={settings.colorMode === 'inverted' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => updateSetting('colorMode', 'inverted')}
                  className="flex-col h-auto py-3"
                >
                  <Contrast className="w-5 h-5 mb-1" />
                  Invert
                </Button>
              </div>
            </section>
          </div>

          {/* Footer */}
          <footer className="p-4 border-t border-border">
            <Button
              variant="outline"
              className="w-full"
              onClick={handleReset}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset to Defaults
            </Button>
          </footer>
        </div>
      </aside>
    </>
  );
}

interface ToggleOptionProps {
  icon: React.ReactNode;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

function ToggleOption({ icon, label, checked, onChange }: ToggleOptionProps) {
  return (
    <label className="flex items-center justify-between p-3 bg-muted/50 rounded-lg cursor-pointer hover:bg-muted transition-colors">
      <span className="flex items-center gap-2 text-sm text-foreground">
        {icon}
        {label}
      </span>
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative w-10 h-6 rounded-full transition-colors',
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
