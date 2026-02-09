import React, { useState, useMemo, useCallback } from 'react';
import { MapPin, ChevronDown, Globe2, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  getLocationOptions,
  getZoomPath,
  getVillageNode,
  storeOnboarding,
  type OnboardingData,
} from '@/lib/location-data';
import { useTranslation } from '@/hooks/useTranslation';
import { useVillage } from '@/context/VillageContext';

interface OnboardingModalProps {
  onComplete: (data: OnboardingData, zoomPath: { lat: number; lon: number; height: number }[]) => void;
}

type SelectionLevel = 'country' | 'state' | 'district' | 'taluka' | 'village';

const LEVELS: SelectionLevel[] = ['country', 'state', 'district', 'taluka', 'village'];

export function OnboardingModal({ onComplete }: OnboardingModalProps) {
  const { t } = useTranslation();
  const { language } = useVillage();

  const [selections, setSelections] = useState<Record<SelectionLevel, string>>({
    country: '',
    state: '',
    district: '',
    taluka: '',
    village: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const getLabel = useCallback(
    (node: { name: string; nameGu?: string; nameHi?: string }) => {
      if (language === 'gu' && node.nameGu) return node.nameGu;
      if (language === 'hi' && node.nameHi) return node.nameHi;
      return node.name;
    },
    [language]
  );

  const countryOptions = useMemo(() => getLocationOptions([]), []);

  const stateOptions = useMemo(
    () => (selections.country ? getLocationOptions([selections.country]) : []),
    [selections.country]
  );

  const districtOptions = useMemo(
    () =>
      selections.state
        ? getLocationOptions([selections.country, selections.state])
        : [],
    [selections.country, selections.state]
  );

  const talukaOptions = useMemo(
    () =>
      selections.district
        ? getLocationOptions([selections.country, selections.state, selections.district])
        : [],
    [selections.country, selections.state, selections.district]
  );

  const villageOptions = useMemo(
    () =>
      selections.taluka
        ? getLocationOptions([
            selections.country,
            selections.state,
            selections.district,
            selections.taluka,
          ])
        : [],
    [selections.country, selections.state, selections.district, selections.taluka]
  );

  const handleSelect = useCallback((level: SelectionLevel, value: string) => {
    setSelections((prev) => {
      const levelIdx = LEVELS.indexOf(level);
      const updated = { ...prev, [level]: value };
      // Clear child selections
      for (let i = levelIdx + 1; i < LEVELS.length; i++) {
        updated[LEVELS[i]] = '';
      }
      return updated;
    });
  }, []);

  const isFormValid = Object.values(selections).every((v) => v !== '');

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!isFormValid) return;

      setIsSubmitting(true);

      const path = [
        selections.country,
        selections.state,
        selections.district,
        selections.taluka,
        selections.village,
      ];

      const villageNode = getVillageNode(path);
      const zoomPath = getZoomPath(path);

      // Get display names
      const countryOpt = countryOptions.find((o) => o.id === selections.country);
      const stateOpt = stateOptions.find((o) => o.id === selections.state);
      const districtOpt = districtOptions.find((o) => o.id === selections.district);
      const talukaOpt = talukaOptions.find((o) => o.id === selections.taluka);
      const villageOpt = villageOptions.find((o) => o.id === selections.village);

      const data: OnboardingData = {
        country: selections.country,
        state: selections.state,
        district: selections.district,
        taluka: selections.taluka,
        village: selections.village,
        countryName: countryOpt?.name || selections.country,
        stateName: stateOpt?.name || selections.state,
        districtName: districtOpt?.name || selections.district,
        talukaName: talukaOpt?.name || selections.taluka,
        villageName: villageOpt?.name || selections.village,
        lat: villageNode?.coords.lat || 0,
        lon: villageNode?.coords.lon || 0,
        completedAt: new Date().toISOString(),
      };

      storeOnboarding(data);
      onComplete(data, zoomPath);
    },
    [isFormValid, selections, countryOptions, stateOptions, districtOptions, talukaOptions, villageOptions, onComplete]
  );

  const levelLabels: Record<SelectionLevel, string> = {
    country: t('selectVillage').includes('Village') ? 'Country' : 'દેશ',
    state: language === 'gu' ? 'રાજ્ય' : language === 'hi' ? 'राज्य' : 'State',
    district: language === 'gu' ? 'જિલ્લો' : language === 'hi' ? 'जिला' : 'District',
    taluka: language === 'gu' ? 'તાલુકો' : language === 'hi' ? 'तालुका' : 'Taluka',
    village: language === 'gu' ? 'ગામ' : language === 'hi' ? 'गाँव' : 'Village',
  };

  const placeholders: Record<SelectionLevel, string> = {
    country: language === 'gu' ? 'દેશ પસંદ કરો' : language === 'hi' ? 'देश चुनें' : 'Select Country',
    state: language === 'gu' ? 'રાજ્ય પસંદ કરો' : language === 'hi' ? 'राज्य चुनें' : 'Select State',
    district: language === 'gu' ? 'જિલ્લો પસંદ કરો' : language === 'hi' ? 'जिला चुनें' : 'Select District',
    taluka: language === 'gu' ? 'તાલુકો પસંદ કરો' : language === 'hi' ? 'तालुका चुनें' : 'Select Taluka',
    village: language === 'gu' ? 'ગામ પસંદ કરો' : language === 'hi' ? 'गाँव चुनें' : 'Select Village',
  };

  const optionsMap: Record<SelectionLevel, { id: string; name: string; nameGu?: string; nameHi?: string }[]> = {
    country: countryOptions,
    state: stateOptions,
    district: districtOptions,
    taluka: talukaOptions,
    village: villageOptions,
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-lg rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl p-6 sm:p-8 animate-scale-in"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.2)',
        }}
      >
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/20 mb-4">
            <Globe2 className="w-7 h-7 text-primary" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            {language === 'gu' ? 'તમારું ગામ પસંદ કરો' : language === 'hi' ? 'अपना गाँव चुनें' : 'Select Your Village'}
          </h2>
          <p className="mt-2 text-sm text-white/70">
            {language === 'gu'
              ? 'તમારા ગામ સુધી પહોંચવા માટે સ્થાન પસંદ કરો'
              : language === 'hi'
              ? 'अपने गाँव तक पहुँचने के लिए स्थान चुनें'
              : 'Choose your location to navigate to your village'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {LEVELS.map((level, idx) => {
            const options = optionsMap[level];
            const isDisabled = idx > 0 && !selections[LEVELS[idx - 1]];

            return (
              <div key={level}>
                <label
                  htmlFor={`onboarding-${level}`}
                  className="block text-xs font-semibold uppercase tracking-wider text-white/80 mb-1.5"
                >
                  {levelLabels[level]}
                </label>
                <div className="relative">
                  <select
                    id={`onboarding-${level}`}
                    value={selections[level]}
                    onChange={(e) => handleSelect(level, e.target.value)}
                    disabled={isDisabled}
                    className={cn(
                      'w-full appearance-none rounded-lg border px-4 py-3 pr-10 text-sm transition-all duration-200',
                      'bg-white/10 border-white/20 text-white placeholder-white/50',
                      'focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary/40',
                      'disabled:opacity-40 disabled:cursor-not-allowed',
                      '[&>option]:bg-gray-900 [&>option]:text-white'
                    )}
                    aria-label={levelLabels[level]}
                  >
                    <option value="" disabled>
                      {placeholders[level]}
                    </option>
                    {options.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {getLabel(opt)}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50 pointer-events-none" />
                </div>
              </div>
            );
          })}

          {/* Submit */}
          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className={cn(
              'w-full flex items-center justify-center gap-2 rounded-lg px-6 py-3.5 mt-6 text-sm font-semibold transition-all duration-300',
              'bg-primary text-primary-foreground',
              'hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25',
              'focus:outline-none focus:ring-2 focus:ring-primary/60 focus:ring-offset-2 focus:ring-offset-transparent',
              'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none'
            )}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {language === 'gu' ? 'લોડ થઈ રહ્યું છે...' : language === 'hi' ? 'लोड हो रहा है...' : 'Loading...'}
              </>
            ) : (
              <>
                <MapPin className="w-4 h-4" />
                {language === 'gu' ? 'આગળ વધો' : language === 'hi' ? 'आगे बढ़ें' : 'Continue'}
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
