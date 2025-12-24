// ===========================================
// MULTI-LANGUAGE TRANSLATION SYSTEM
// Supports English, Gujarati, Hindi
// ===========================================

import type { Language } from './types';

export interface Translations {
  // Common
  welcome: string;
  villageName: string;
  selectVillage: string;
  selectLanguage: string;
  loading: string;
  error: string;
  retry: string;
  viewAll: string;
  learnMore: string;
  submit: string;
  cancel: string;
  save: string;
  close: string;
  search: string;
  filter: string;
  noResults: string;
  
  // Header & Navigation
  home: string;
  schemes: string;
  members: string;
  gramSabha: string;
  development: string;
  complaints: string;
  events: string;
  attractions: string;
  amenities: string;
  announcements: string;
  services: string;
  finance: string;
  tenders: string;
  assets: string;
  taluka: string;
  more: string;
  notifications: string;
  skipToContent: string;
  
  // Site Identity
  gramPanchayat: string;
  digitalVillagePortal: string;
  
  // Hero Section
  welcomeTo: string;
  heroDescription: string;
  exploreSchemes: string;
  fileComplaint: string;
  
  // Stats
  activeSchemes: string;
  developmentWorks: string;
  pendingComplaints: string;
  resolutionRate: string;
  
  // Quick Access
  quickAccess: string;
  governmentSchemes: string;
  panchayatMembers: string;
  localAttractions: string;
  
  // Sections
  latestAnnouncements: string;
  ongoingDevelopment: string;
  upcomingEvents: string;
  popularSchemes: string;
  progress: string;
  budget: string;
  lakh: string;
  
  // Live Counter
  liveUsers: string;
  usersOnline: string;
  
  // Complaints
  newComplaint: string;
  trackComplaint: string;
  complaintStatus: string;
  referenceId: string;
  
  // Status Labels
  statusNew: string;
  statusInReview: string;
  statusInProgress: string;
  statusResolved: string;
  statusRejected: string;
  statusScheduled: string;
  statusCompleted: string;
  statusCancelled: string;
  statusPlanned: string;
  statusApproved: string;
  
  // Categories
  categoryHousing: string;
  categoryEmployment: string;
  categoryHealth: string;
  categoryPension: string;
  categoryEducation: string;
  categoryAgriculture: string;
  categoryOther: string;
  
  // Footer
  allRightsReserved: string;
  privacyPolicy: string;
  termsOfService: string;
  contactUs: string;
  
  // Accessibility
  accessibility: string;
  highContrast: string;
  fontSize: string;
  reduceMotion: string;
  
  // Theme
  theme: string;
  systemThemes: string;
  festivalThemes: string;
  enableAnimations: string;
}

const translations: Record<Language, Translations> = {
  en: {
    // Common
    welcome: 'Welcome',
    villageName: 'Village',
    selectVillage: 'Select Village',
    selectLanguage: 'Select Language',
    loading: 'Loading...',
    error: 'Error',
    retry: 'Retry',
    viewAll: 'View all',
    learnMore: 'Learn More',
    submit: 'Submit',
    cancel: 'Cancel',
    save: 'Save',
    close: 'Close',
    search: 'Search',
    filter: 'Filter',
    noResults: 'No results found',
    
    // Header & Navigation
    home: 'Home',
    schemes: 'Schemes',
    members: 'Members',
    gramSabha: 'Gram Sabha',
    development: 'Development',
    complaints: 'Complaints',
    events: 'Events',
    attractions: 'Attractions',
    amenities: 'Amenities',
    announcements: 'Announcements',
    services: 'Services',
    finance: 'Finance',
    tenders: 'Tenders',
    assets: 'Assets',
    taluka: 'Taluka',
    more: 'More',
    notifications: 'Notifications',
    skipToContent: 'Skip to main content',
    
    // Site Identity
    gramPanchayat: 'Gram Panchayat',
    digitalVillagePortal: 'Digital Village Portal',
    
    // Hero Section
    welcomeTo: 'Welcome to',
    heroDescription: 'Your digital gateway to local governance. Access government schemes, track development projects, and participate in village administration.',
    exploreSchemes: 'Explore Schemes',
    fileComplaint: 'File Complaint',
    
    // Stats
    activeSchemes: 'Active Schemes',
    developmentWorks: 'Development Works',
    pendingComplaints: 'Pending Complaints',
    resolutionRate: 'Resolution Rate',
    
    // Quick Access
    quickAccess: 'Quick Access',
    governmentSchemes: 'Government Schemes',
    panchayatMembers: 'Panchayat Members',
    localAttractions: 'Local Attractions',
    
    // Sections
    latestAnnouncements: 'Latest Announcements',
    ongoingDevelopment: 'Ongoing Development',
    upcomingEvents: 'Upcoming Events',
    popularSchemes: 'Popular Schemes',
    progress: 'Progress',
    budget: 'Budget',
    lakh: 'Lakh',
    
    // Live Counter
    liveUsers: 'Live Users',
    usersOnline: 'users online',
    
    // Complaints
    newComplaint: 'New Complaint',
    trackComplaint: 'Track Complaint',
    complaintStatus: 'Complaint Status',
    referenceId: 'Reference ID',
    
    // Status Labels
    statusNew: 'New',
    statusInReview: 'In Review',
    statusInProgress: 'In Progress',
    statusResolved: 'Resolved',
    statusRejected: 'Rejected',
    statusScheduled: 'Scheduled',
    statusCompleted: 'Completed',
    statusCancelled: 'Cancelled',
    statusPlanned: 'Planned',
    statusApproved: 'Approved',
    
    // Categories
    categoryHousing: 'Housing',
    categoryEmployment: 'Employment',
    categoryHealth: 'Health',
    categoryPension: 'Pension',
    categoryEducation: 'Education',
    categoryAgriculture: 'Agriculture',
    categoryOther: 'Other',
    
    // Footer
    allRightsReserved: 'All Rights Reserved',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    contactUs: 'Contact Us',
    
    // Accessibility
    accessibility: 'Accessibility',
    highContrast: 'High Contrast',
    fontSize: 'Font Size',
    reduceMotion: 'Reduce Motion',
    
    // Theme
    theme: 'Theme',
    systemThemes: 'System Themes',
    festivalThemes: 'Festival Themes',
    enableAnimations: 'Enable Animations',
  },
  
  gu: {
    // Common
    welcome: 'સ્વાગત છે',
    villageName: 'ગામ',
    selectVillage: 'ગામ પસંદ કરો',
    selectLanguage: 'ભાષા પસંદ કરો',
    loading: 'લોડ થઈ રહ્યું છે...',
    error: 'ભૂલ',
    retry: 'ફરી પ્રયાસ કરો',
    viewAll: 'બધું જુઓ',
    learnMore: 'વધુ જાણો',
    submit: 'સબમિટ કરો',
    cancel: 'રદ કરો',
    save: 'સાચવો',
    close: 'બંધ કરો',
    search: 'શોધો',
    filter: 'ફિલ્ટર',
    noResults: 'કોઈ પરિણામ મળ્યું નથી',
    
    // Header & Navigation
    home: 'હોમ',
    schemes: 'યોજનાઓ',
    members: 'સભ્યો',
    gramSabha: 'ગ્રામ સભા',
    development: 'વિકાસ',
    complaints: 'ફરિયાદો',
    events: 'કાર્યક્રમો',
    attractions: 'આકર્ષણો',
    amenities: 'સુવિધાઓ',
    announcements: 'જાહેરાતો',
    services: 'સેવાઓ',
    finance: 'નાણાકીય',
    tenders: 'ટેન્ડર',
    assets: 'અસ્કયામતો',
    taluka: 'તાલુકા',
    more: 'વધુ',
    notifications: 'સૂચનાઓ',
    skipToContent: 'મુખ્ય સામગ્રી પર જાઓ',
    
    // Site Identity
    gramPanchayat: 'ગ્રામ પંચાયત',
    digitalVillagePortal: 'ડિજિટલ ગામ પોર્ટલ',
    
    // Hero Section
    welcomeTo: 'સ્વાગત છે',
    heroDescription: 'સ્થાનિક શાસન માટે તમારું ડિજિટલ ગેટવે. સરકારી યોજનાઓ મેળવો, વિકાસ પ્રોજેક્ટ્સ ટ્રેક કરો અને ગામ વહીવટમાં ભાગ લો.',
    exploreSchemes: 'યોજનાઓ જુઓ',
    fileComplaint: 'ફરિયાદ નોંધાવો',
    
    // Stats
    activeSchemes: 'સક્રિય યોજનાઓ',
    developmentWorks: 'વિકાસ કામો',
    pendingComplaints: 'બાકી ફરિયાદો',
    resolutionRate: 'ઉકેલ દર',
    
    // Quick Access
    quickAccess: 'ઝડપી પહોંચ',
    governmentSchemes: 'સરકારી યોજનાઓ',
    panchayatMembers: 'પંચાયત સભ્યો',
    localAttractions: 'સ્થાનિક આકર્ષણો',
    
    // Sections
    latestAnnouncements: 'તાજી જાહેરાતો',
    ongoingDevelopment: 'ચાલુ વિકાસ',
    upcomingEvents: 'આગામી કાર્યક્રમો',
    popularSchemes: 'લોકપ્રિય યોજનાઓ',
    progress: 'પ્રગતિ',
    budget: 'બજેટ',
    lakh: 'લાખ',
    
    // Live Counter
    liveUsers: 'લાઇવ વપરાશકર્તાઓ',
    usersOnline: 'ઓનલાઇન વપરાશકર્તાઓ',
    
    // Complaints
    newComplaint: 'નવી ફરિયાદ',
    trackComplaint: 'ફરિયાદ ટ્રેક કરો',
    complaintStatus: 'ફરિયાદની સ્થિતિ',
    referenceId: 'સંદર્ભ આઈડી',
    
    // Status Labels
    statusNew: 'નવું',
    statusInReview: 'સમીક્ષામાં',
    statusInProgress: 'પ્રગતિમાં',
    statusResolved: 'ઉકેલાયું',
    statusRejected: 'નામંજૂર',
    statusScheduled: 'સુનિશ્ચિત',
    statusCompleted: 'પૂર્ણ',
    statusCancelled: 'રદ',
    statusPlanned: 'આયોજિત',
    statusApproved: 'મંજૂર',
    
    // Categories
    categoryHousing: 'આવાસ',
    categoryEmployment: 'રોજગાર',
    categoryHealth: 'આરોગ્ય',
    categoryPension: 'પેન્શન',
    categoryEducation: 'શિક્ષણ',
    categoryAgriculture: 'કૃષિ',
    categoryOther: 'અન્ય',
    
    // Footer
    allRightsReserved: 'સર્વ હક્ક અમારી પાસે રાખેલા છે',
    privacyPolicy: 'ગોપનીયતા નીતિ',
    termsOfService: 'સેવાની શરતો',
    contactUs: 'અમારો સંપર્ક કરો',
    
    // Accessibility
    accessibility: 'સુલભતા',
    highContrast: 'ઉચ્ચ વિપરીત',
    fontSize: 'ફોન્ટ સાઈઝ',
    reduceMotion: 'ગતિ ઘટાડો',
    
    // Theme
    theme: 'થીમ',
    systemThemes: 'સિસ્ટમ થીમ્સ',
    festivalThemes: 'તહેવાર થીમ્સ',
    enableAnimations: 'એનિમેશન સક્ષમ કરો',
  },
  
  hi: {
    // Common
    welcome: 'स्वागत है',
    villageName: 'गाँव',
    selectVillage: 'गाँव चुनें',
    selectLanguage: 'भाषा चुनें',
    loading: 'लोड हो रहा है...',
    error: 'त्रुटि',
    retry: 'पुनः प्रयास करें',
    viewAll: 'सभी देखें',
    learnMore: 'और जानें',
    submit: 'जमा करें',
    cancel: 'रद्द करें',
    save: 'सहेजें',
    close: 'बंद करें',
    search: 'खोजें',
    filter: 'फ़िल्टर',
    noResults: 'कोई परिणाम नहीं मिला',
    
    // Header & Navigation
    home: 'होम',
    schemes: 'योजनाएं',
    members: 'सदस्य',
    gramSabha: 'ग्राम सभा',
    development: 'विकास',
    complaints: 'शिकायतें',
    events: 'कार्यक्रम',
    attractions: 'आकर्षण',
    amenities: 'सुविधाएं',
    announcements: 'घोषणाएं',
    services: 'सेवाएं',
    finance: 'वित्त',
    tenders: 'टेंडर',
    assets: 'संपत्ति',
    taluka: 'तालुका',
    more: 'और',
    notifications: 'सूचनाएं',
    skipToContent: 'मुख्य सामग्री पर जाएं',
    
    // Site Identity
    gramPanchayat: 'ग्राम पंचायत',
    digitalVillagePortal: 'डिजिटल ग्राम पोर्टल',
    
    // Hero Section
    welcomeTo: 'स्वागत है',
    heroDescription: 'स्थानीय शासन के लिए आपका डिजिटल गेटवे। सरकारी योजनाएं प्राप्त करें, विकास परियोजनाओं को ट्रैक करें और ग्राम प्रशासन में भाग लें।',
    exploreSchemes: 'योजनाएं देखें',
    fileComplaint: 'शिकायत दर्ज करें',
    
    // Stats
    activeSchemes: 'सक्रिय योजनाएं',
    developmentWorks: 'विकास कार्य',
    pendingComplaints: 'लंबित शिकायतें',
    resolutionRate: 'समाधान दर',
    
    // Quick Access
    quickAccess: 'त्वरित पहुंच',
    governmentSchemes: 'सरकारी योजनाएं',
    panchayatMembers: 'पंचायत सदस्य',
    localAttractions: 'स्थानीय आकर्षण',
    
    // Sections
    latestAnnouncements: 'नवीनतम घोषणाएं',
    ongoingDevelopment: 'जारी विकास',
    upcomingEvents: 'आगामी कार्यक्रम',
    popularSchemes: 'लोकप्रिय योजनाएं',
    progress: 'प्रगति',
    budget: 'बजट',
    lakh: 'लाख',
    
    // Live Counter
    liveUsers: 'लाइव उपयोगकर्ता',
    usersOnline: 'ऑनलाइन उपयोगकर्ता',
    
    // Complaints
    newComplaint: 'नई शिकायत',
    trackComplaint: 'शिकायत ट्रैक करें',
    complaintStatus: 'शिकायत स्थिति',
    referenceId: 'संदर्भ आईडी',
    
    // Status Labels
    statusNew: 'नया',
    statusInReview: 'समीक्षाधीन',
    statusInProgress: 'प्रगति पर',
    statusResolved: 'समाधान हुआ',
    statusRejected: 'अस्वीकृत',
    statusScheduled: 'निर्धारित',
    statusCompleted: 'पूर्ण',
    statusCancelled: 'रद्द',
    statusPlanned: 'नियोजित',
    statusApproved: 'स्वीकृत',
    
    // Categories
    categoryHousing: 'आवास',
    categoryEmployment: 'रोजगार',
    categoryHealth: 'स्वास्थ्य',
    categoryPension: 'पेंशन',
    categoryEducation: 'शिक्षा',
    categoryAgriculture: 'कृषि',
    categoryOther: 'अन्य',
    
    // Footer
    allRightsReserved: 'सर्वाधिकार सुरक्षित',
    privacyPolicy: 'गोपनीयता नीति',
    termsOfService: 'सेवा की शर्तें',
    contactUs: 'संपर्क करें',
    
    // Accessibility
    accessibility: 'सुलभता',
    highContrast: 'उच्च कंट्रास्ट',
    fontSize: 'फ़ॉन्ट आकार',
    reduceMotion: 'गति कम करें',
    
    // Theme
    theme: 'थीम',
    systemThemes: 'सिस्टम थीम',
    festivalThemes: 'त्योहार थीम',
    enableAnimations: 'एनिमेशन सक्षम करें',
  },
};

export function getTranslations(lang: Language): Translations {
  return translations[lang] || translations.en;
}

export function t(key: keyof Translations, lang: Language): string {
  return translations[lang]?.[key] || translations.en[key] || key;
}

export default translations;
