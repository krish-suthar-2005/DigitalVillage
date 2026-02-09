// ===========================================
// HIERARCHICAL LOCATION DATA WITH COORDINATES
// Country → State → District → Taluka → Village
// ===========================================

export interface LocationCoords {
  lat: number;
  lon: number;
  height: number; // Camera height for zoom level
}

export interface LocationNode {
  id: string;
  name: string;
  nameGu?: string;
  nameHi?: string;
  coords: LocationCoords;
  children?: Record<string, LocationNode>;
}

// Full hierarchy: Country → State → District → Taluka → Village
export const locationData: Record<string, LocationNode> = {
  india: {
    id: 'india',
    name: 'India',
    nameGu: 'ભારત',
    nameHi: 'भारत',
    coords: { lat: 20.5937, lon: 78.9629, height: 7000000 },
    children: {
      gujarat: {
        id: 'gujarat',
        name: 'Gujarat',
        nameGu: 'ગુજરાત',
        nameHi: 'गुजरात',
        coords: { lat: 22.2587, lon: 71.1924, height: 2500000 },
        children: {
          ahmedabad: {
            id: 'ahmedabad',
            name: 'Ahmedabad',
            nameGu: 'અમદાવાદ',
            nameHi: 'अहमदाबाद',
            coords: { lat: 23.0225, lon: 72.5714, height: 800000 },
            children: {
              dholka: {
                id: 'dholka',
                name: 'Dholka',
                nameGu: 'ધોળકા',
                nameHi: 'ढोलका',
                coords: { lat: 22.7196, lon: 72.4377, height: 150000 },
                children: {
                  rajpur: {
                    id: 'rajpur',
                    name: 'Rajpur',
                    nameGu: 'રાજપુર',
                    nameHi: 'राजपुर',
                    coords: { lat: 22.7196, lon: 72.5797, height: 1200 },
                  },
                  vasna: {
                    id: 'vasna',
                    name: 'Vasna',
                    nameGu: 'વાસણા',
                    nameHi: 'वासना',
                    coords: { lat: 22.7396, lon: 72.5597, height: 1200 },
                  },
                  koth: {
                    id: 'koth',
                    name: 'Koth',
                    nameGu: 'કોઠ',
                    nameHi: 'कोठ',
                    coords: { lat: 22.6850, lon: 72.4200, height: 1200 },
                  },
                },
              },
              bavla: {
                id: 'bavla',
                name: 'Bavla',
                nameGu: 'બાવળા',
                nameHi: 'बावला',
                coords: { lat: 22.8296, lon: 72.3697, height: 150000 },
                children: {
                  bavla_village: {
                    id: 'bavla_village',
                    name: 'Bavla',
                    nameGu: 'બાવળા',
                    nameHi: 'बावला',
                    coords: { lat: 22.8296, lon: 72.3697, height: 1200 },
                  },
                  sanathal: {
                    id: 'sanathal',
                    name: 'Sanathal',
                    nameGu: 'સાણંદ',
                    nameHi: 'सानाथल',
                    coords: { lat: 22.8500, lon: 72.3800, height: 1200 },
                  },
                },
              },
              sanand: {
                id: 'sanand',
                name: 'Sanand',
                nameGu: 'સાણંદ',
                nameHi: 'साणंद',
                coords: { lat: 22.9917, lon: 72.3800, height: 150000 },
                children: {
                  sanand_village: {
                    id: 'sanand_village',
                    name: 'Sanand',
                    nameGu: 'સાણંદ',
                    nameHi: 'साणंद',
                    coords: { lat: 22.9917, lon: 72.3800, height: 1200 },
                  },
                },
              },
            },
          },
          sabarkantha: {
            id: 'sabarkantha',
            name: 'Sabarkantha',
            nameGu: 'સાબરકાંઠા',
            nameHi: 'साबरकांठा',
            coords: { lat: 23.5935, lon: 72.9557, height: 800000 },
            children: {
              himatnagar: {
                id: 'himatnagar',
                name: 'Himatnagar',
                nameGu: 'હિંમતનગર',
                nameHi: 'हिम्मतनगर',
                coords: { lat: 23.5935, lon: 72.9660, height: 150000 },
                children: {
                  himatnagar_village: {
                    id: 'himatnagar_village',
                    name: 'Himatnagar',
                    nameGu: 'હિંમતનગર',
                    nameHi: 'हिम्मतनगर',
                    coords: { lat: 23.5958, lon: 72.9689, height: 1200 },
                  },
                  gambhoi: {
                    id: 'gambhoi',
                    name: 'Gambhoi',
                    nameGu: 'ગંભોઈ',
                    nameHi: 'गंभोई',
                    coords: { lat: 23.5800, lon: 72.9400, height: 1200 },
                  },
                },
              },
              idar: {
                id: 'idar',
                name: 'Idar',
                nameGu: 'ઈડર',
                nameHi: 'ईडर',
                coords: { lat: 23.8281, lon: 73.0008, height: 150000 },
                children: {
                  idar_village: {
                    id: 'idar_village',
                    name: 'Idar',
                    nameGu: 'ઈડર',
                    nameHi: 'ईडर',
                    coords: { lat: 23.8281, lon: 73.0008, height: 1200 },
                  },
                },
              },
            },
          },
          gandhinagar: {
            id: 'gandhinagar',
            name: 'Gandhinagar',
            nameGu: 'ગાંધીનગર',
            nameHi: 'गांधीनगर',
            coords: { lat: 23.2156, lon: 72.6369, height: 800000 },
            children: {
              gandhinagar_taluka: {
                id: 'gandhinagar_taluka',
                name: 'Gandhinagar',
                nameGu: 'ગાંધીનગર',
                nameHi: 'गांधीनगर',
                coords: { lat: 23.2156, lon: 72.6369, height: 150000 },
                children: {
                  pethapur: {
                    id: 'pethapur',
                    name: 'Pethapur',
                    nameGu: 'પેથાપુર',
                    nameHi: 'पेथापुर',
                    coords: { lat: 23.2100, lon: 72.6200, height: 1200 },
                  },
                  kalol: {
                    id: 'kalol',
                    name: 'Kalol',
                    nameGu: 'કલોલ',
                    nameHi: 'कलोल',
                    coords: { lat: 23.2451, lon: 72.5100, height: 1200 },
                  },
                },
              },
            },
          },
        },
      },
      rajasthan: {
        id: 'rajasthan',
        name: 'Rajasthan',
        nameGu: 'રાજસ્થાન',
        nameHi: 'राजस्थान',
        coords: { lat: 27.0238, lon: 74.2179, height: 2500000 },
        children: {
          jaipur: {
            id: 'jaipur',
            name: 'Jaipur',
            nameGu: 'જયપુર',
            nameHi: 'जयपुर',
            coords: { lat: 26.9124, lon: 75.7873, height: 800000 },
            children: {
              jaipur_taluka: {
                id: 'jaipur_taluka',
                name: 'Jaipur',
                nameGu: 'જયપુર',
                nameHi: 'जयपुर',
                coords: { lat: 26.9124, lon: 75.7873, height: 150000 },
                children: {
                  sanganer: {
                    id: 'sanganer',
                    name: 'Sanganer',
                    nameGu: 'સાંગાનેર',
                    nameHi: 'सांगानेर',
                    coords: { lat: 26.8293, lon: 75.7879, height: 1200 },
                  },
                },
              },
            },
          },
        },
      },
      maharashtra: {
        id: 'maharashtra',
        name: 'Maharashtra',
        nameGu: 'મહારાષ્ટ્ર',
        nameHi: 'महाराष्ट्र',
        coords: { lat: 19.7515, lon: 75.7139, height: 2500000 },
        children: {
          pune: {
            id: 'pune',
            name: 'Pune',
            nameGu: 'પુણે',
            nameHi: 'पुणे',
            coords: { lat: 18.5204, lon: 73.8567, height: 800000 },
            children: {
              haveli: {
                id: 'haveli',
                name: 'Haveli',
                nameGu: 'હવેલી',
                nameHi: 'हवेली',
                coords: { lat: 18.5204, lon: 73.8567, height: 150000 },
                children: {
                  wagholi: {
                    id: 'wagholi',
                    name: 'Wagholi',
                    nameGu: 'વાઘોલી',
                    nameHi: 'वाघोली',
                    coords: { lat: 18.5800, lon: 73.9800, height: 1200 },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

// Zoom path for the continent-level start
export const CONTINENT_ZOOM: LocationCoords = {
  lat: 30,
  lon: 60,
  height: 18000000,
};

export const WORLD_VIEW: LocationCoords = {
  lat: 0,
  lon: 0,
  height: 30000000,
};

// Helper: Get options list from a level
export function getLocationOptions(
  parentPath: string[]
): { id: string; name: string; nameGu?: string; nameHi?: string }[] {
  if (parentPath.length === 0) {
    return Object.values(locationData).map((n) => ({
      id: n.id,
      name: n.name,
      nameGu: n.nameGu,
      nameHi: n.nameHi,
    }));
  }

  let current: LocationNode | undefined = locationData[parentPath[0]];
  for (let i = 1; i < parentPath.length; i++) {
    current = current?.children?.[parentPath[i]];
  }

  if (!current?.children) return [];
  return Object.values(current.children).map((n) => ({
    id: n.id,
    name: n.name,
    nameGu: n.nameGu,
    nameHi: n.nameHi,
  }));
}

// Helper: Get coordinate path for animation
export function getZoomPath(selections: string[]): LocationCoords[] {
  const path: LocationCoords[] = [CONTINENT_ZOOM];

  let current: LocationNode | undefined = locationData[selections[0]];
  if (current) {
    path.push(current.coords);

    for (let i = 1; i < selections.length; i++) {
      current = current?.children?.[selections[i]];
      if (current) {
        path.push(current.coords);
      }
    }
  }

  return path;
}

// Helper: Get village node
export function getVillageNode(selections: string[]): LocationNode | undefined {
  let current: LocationNode | undefined = locationData[selections[0]];
  for (let i = 1; i < selections.length; i++) {
    current = current?.children?.[selections[i]];
  }
  return current;
}

// Storage keys
export const ONBOARDING_STORAGE_KEY = 'village-portal-onboarding';

export interface OnboardingData {
  country: string;
  state: string;
  district: string;
  taluka: string;
  village: string;
  villageName: string;
  talukaName: string;
  districtName: string;
  stateName: string;
  countryName: string;
  lat: number;
  lon: number;
  completedAt: string;
}

export function getStoredOnboarding(): OnboardingData | null {
  try {
    const stored = localStorage.getItem(ONBOARDING_STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored) as OnboardingData;
  } catch {
    return null;
  }
}

export function storeOnboarding(data: OnboardingData): void {
  try {
    localStorage.setItem(ONBOARDING_STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to store onboarding data:', e);
  }
}
