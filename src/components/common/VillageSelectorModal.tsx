import React from 'react';
import { useVillage } from '@/context/VillageContext';
import { MapPin, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface VillageSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VillageSelectorModal({ isOpen, onClose }: VillageSelectorModalProps) {
  const { villages, selectedVillage, setSelectedVillage, detectNearestVillage } = useVillage();

  if (!isOpen) return null;

  const handleDetectLocation = async () => {
    await detectNearestVillage();
    onClose();
  };

  const handleSelectVillage = (villageId: number) => {
    const village = villages.find(v => v.id === villageId);
    if (village) {
      setSelectedVillage(village);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-card rounded-xl shadow-xl max-w-md w-full mx-4 animate-scale-in">
        <div className="p-6">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-foreground">Select Your Village</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Choose your village to see relevant information
            </p>
          </div>

          {/* Auto-detect button */}
          <Button
            onClick={handleDetectLocation}
            variant="outline"
            className="w-full mb-4"
          >
            <Navigation className="w-4 h-4 mr-2" />
            Detect My Location
          </Button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">or select manually</span>
            </div>
          </div>

          {/* Village list */}
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {villages.map((village) => (
              <button
                key={village.id}
                onClick={() => handleSelectVillage(village.id)}
                className={cn(
                  'w-full text-left p-3 rounded-lg border transition-colors',
                  selectedVillage?.id === village.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50 hover:bg-muted'
                )}
              >
                <div className="font-medium text-foreground">{village.name}</div>
                <div className="text-sm text-muted-foreground">
                  {village.taluka_name}, {village.district}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
