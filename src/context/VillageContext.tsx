import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Village, Language, LanguageOption } from '@/lib/types';
import { mockVillages } from '@/lib/mock-data';

interface VillageContextType {
  selectedVillage: Village | null;
  setSelectedVillage: (village: Village | null) => void;
  villages: Village[];
  isLoading: boolean;
  language: Language;
  setLanguage: (lang: Language) => void;
  languages: LanguageOption[];
  detectNearestVillage: () => Promise<void>;
}

const VillageContext = createContext<VillageContextType | undefined>(undefined);

const STORAGE_KEY = 'village-portal-selected-village';
const LANG_STORAGE_KEY = 'village-portal-language';

const availableLanguages: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
];

export function VillageProvider({ children }: { children: ReactNode }) {
  const [selectedVillage, setSelectedVillageState] = useState<Village | null>(null);
  const [villages, setVillages] = useState<Village[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem(LANG_STORAGE_KEY) as Language) || 'en';
  });

  useEffect(() => {
    // Load villages (mock data for now, replace with API call)
    setVillages(mockVillages);
    
    // Load stored village preference
    const storedVillageId = localStorage.getItem(STORAGE_KEY);
    if (storedVillageId) {
      const village = mockVillages.find(v => v.id === parseInt(storedVillageId));
      if (village) {
        setSelectedVillageState(village);
      }
    }
    
    setIsLoading(false);
  }, []);

  const setSelectedVillage = (village: Village | null) => {
    setSelectedVillageState(village);
    if (village) {
      localStorage.setItem(STORAGE_KEY, village.id.toString());
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(LANG_STORAGE_KEY, lang);
  };

  const detectNearestVillage = async () => {
    if (!navigator.geolocation) {
      console.warn('Geolocation not supported');
      return;
    }

    return new Promise<void>((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          
          // Simple distance calculation (for demo, would use API in production)
          let nearest = villages[0];
          let minDistance = Infinity;
          
          villages.forEach(village => {
            const dist = Math.sqrt(
              Math.pow(village.latitude - latitude, 2) +
              Math.pow(village.longitude - longitude, 2)
            );
            if (dist < minDistance) {
              minDistance = dist;
              nearest = village;
            }
          });
          
          setSelectedVillage(nearest);
          resolve();
        },
        (error) => {
          console.warn('Geolocation error:', error);
          resolve();
        }
      );
    });
  };

  return (
    <VillageContext.Provider
      value={{
        selectedVillage,
        setSelectedVillage,
        villages,
        isLoading,
        language,
        setLanguage,
        languages: availableLanguages,
        detectNearestVillage,
      }}
    >
      {children}
    </VillageContext.Provider>
  );
}

export function useVillage() {
  const context = useContext(VillageContext);
  if (context === undefined) {
    throw new Error('useVillage must be used within a VillageProvider');
  }
  return context;
}
