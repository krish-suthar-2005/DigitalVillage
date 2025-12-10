import React from 'react';
import { AlertTriangle, CloudRain, Info, X } from 'lucide-react';
import { mockAlerts } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export function AlertBanner() {
  const [dismissed, setDismissed] = useState<number[]>([]);
  
  const activeAlerts = mockAlerts.filter(
    (alert) => !dismissed.includes(alert.id)
  );

  if (activeAlerts.length === 0) return null;

  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case 'CRITICAL':
        return 'bg-destructive text-destructive-foreground';
      case 'WARNING':
        return 'bg-warning text-warning-foreground';
      default:
        return 'bg-info text-info-foreground';
    }
  };

  const getSeverityIcon = (type: string) => {
    switch (type) {
      case 'WEATHER':
        return <CloudRain className="w-5 h-5" />;
      case 'EMERGENCY':
        return <AlertTriangle className="w-5 h-5" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  return (
    <div className="w-full">
      {activeAlerts.map((alert) => (
        <div
          key={alert.id}
          className={cn(
            'px-4 py-2 flex items-center justify-between gap-4',
            getSeverityStyles(alert.severity)
          )}
          role="alert"
        >
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {getSeverityIcon(alert.type)}
            <div className="flex-1 min-w-0">
              <span className="font-medium">{alert.title}:</span>{' '}
              <span className="opacity-90">{alert.message}</span>
            </div>
          </div>
          <button
            onClick={() => setDismissed([...dismissed, alert.id])}
            className="p-1 hover:bg-foreground/10 rounded transition-colors flex-shrink-0"
            aria-label="Dismiss alert"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
