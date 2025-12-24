import { useCallback, useMemo } from 'react';
import { useVillage } from '@/context/VillageContext';
import { getTranslations, type Translations } from '@/lib/translations';

export function useTranslation() {
  const { language } = useVillage();
  
  const translations = useMemo(() => getTranslations(language), [language]);
  
  const t = useCallback((key: keyof Translations): string => {
    return translations[key] || key;
  }, [translations]);
  
  return { t, language, translations };
}

export default useTranslation;
