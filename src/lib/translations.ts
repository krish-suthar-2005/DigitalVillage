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
  clearFilters: string;
  total: string;
  pending: string;
  resolved: string;
  all: string;
  allCategories: string;
  allStatus: string;
  allTypes: string;
  allLevels: string;
  previous: string;
  next: string;
  
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
  login: string;
  register: string;
  gallery: string;
  market: string;
  priasoft: string;
  profile: string;
  
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
  
  // Complaints Page
  newComplaint: string;
  trackComplaint: string;
  complaintStatus: string;
  referenceId: string;
  complaintsGrievances: string;
  submitTrackComplaints: string;
  fileNewComplaint: string;
  yourName: string;
  phoneNumber: string;
  category: string;
  complaintTitle: string;
  description: string;
  submitComplaint: string;
  filedBy: string;
  assignedTo: string;
  priority: string;
  highPriority: string;
  mediumPriority: string;
  lowPriority: string;
  
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
  statusOpen: string;
  statusClosed: string;
  
  // Categories - Schemes
  categoryHousing: string;
  categoryEmployment: string;
  categoryHealth: string;
  categoryPension: string;
  categoryEducation: string;
  categoryAgriculture: string;
  categoryOther: string;
  
  // Categories - Complaints
  categoryWater: string;
  categoryRoad: string;
  categoryElectricity: string;
  categorySanitation: string;
  categoryCorruption: string;
  
  // Categories - Development
  categoryRoadWork: string;
  categoryWaterWork: string;
  categoryElectricWork: string;
  categoryBuilding: string;
  categoryDrainage: string;
  
  // Categories - Attractions
  categoryReligious: string;
  categoryHistorical: string;
  categoryNature: string;
  categoryMarket: string;
  
  // Categories - Amenities
  categoryBank: string;
  categoryClinic: string;
  categoryHospital: string;
  categoryShop: string;
  
  // Schemes Page
  browseSchemes: string;
  searchSchemes: string;
  centralGovt: string;
  stateGovt: string;
  viewDetails: string;
  noSchemesFound: string;
  adjustFilters: string;
  department: string;
  
  // Members Page
  panchayatMembersStaff: string;
  meetRepresentatives: string;
  sarpanch: string;
  deputySarpanch: string;
  secretary: string;
  member: string;
  staff: string;
  panchayatLeadership: string;
  wardMembers: string;
  panchayatStaff: string;
  ward: string;
  term: string;
  
  // Gram Sabha Page
  gramSabhaMeetings: string;
  viewMeetingsAgendas: string;
  upcomingMeetings: string;
  pastMeetings: string;
  noUpcomingMeetings: string;
  noPastMeetings: string;
  meetingRecordsAppear: string;
  agenda: string;
  addToCalendar: string;
  downloadMinutes: string;
  venue: string;
  time: string;
  
  // Development Page
  trackDevelopment: string;
  totalProjects: string;
  inProgress: string;
  completed: string;
  totalBudget: string;
  noDevelopmentWorks: string;
  scheme: string;
  
  // Events Page
  eventsGallery: string;
  exploreEvents: string;
  pastEventsGallery: string;
  noPastEvents: string;
  eventPhotosAppear: string;
  upcoming: string;
  
  // Attractions Page
  exploreAttractions: string;
  inVillage: string;
  nearbyAttractions: string;
  nearbyOnly: string;
  noAttractionsFound: string;
  kmAway: string;
  
  // Amenities Page
  localAmenities: string;
  findAmenities: string;
  searchAmenities: string;
  noAmenitiesFound: string;
  openingHours: string;
  contact: string;
  
  // Announcements Page
  officialNotices: string;
  
  // Services Page
  serviceLinks: string;
  quickAccessServices: string;
  
  // Finance Page
  financeDashboard: string;
  budgetTransparency: string;
  budgetOverview: string;
  expenditureSummary: string;
  
  // Tenders Page
  eTenders: string;
  openTenders: string;
  estimatedCost: string;
  lastDate: string;
  
  // Assets Page
  villageAssets: string;
  assetInventory: string;
  
  // Taluka Page
  talukaPanchayat: string;
  talukaAdmin: string;
  hqAddress: string;
  vision: string;
  
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
  
  // Login Page
  loginSubtitle: string;
  email: string;
  password: string;
  enterEmail: string;
  enterPassword: string;
  showPassword: string;
  hidePassword: string;
  forgotPassword: string;
  loggingIn: string;
  loginSuccess: string;
  welcomeBack: string;
  noAccount: string;
  registerNow: string;
  
  // Register Page
  registerSubtitle: string;
  fullName: string;
  enterFullName: string;
  enterPhone: string;
  confirmPassword: string;
  confirmYourPassword: string;
  registering: string;
  registrationSuccess: string;
  accountCreated: string;
  alreadyHaveAccount: string;
  loginNow: string;
  
  // Contact Page
  contactSubtitle: string;
  contactInfo: string;
  address: string;
  officeHours: string;
  mondayToFriday: string;
  saturday: string;
  needHelp: string;
  needHelpDesc: string;
  callNow: string;
  sendMessage: string;
  subject: string;
  enterSubject: string;
  message: string;
  enterMessage: string;
  sending: string;
  messageSent: string;
  messageSuccessDesc: string;
  
  // Gallery Page
  gallerySubtitle: string;
  galleryEvents: string;
  galleryHeritage: string;
  galleryNature: string;
  noPhotosFound: string;
  
  // Market Page
  villageMarket: string;
  marketSubtitle: string;
  marketLocation: string;
  villageChowk: string;
  marketTiming: string;
  helplineNumber: string;
  searchProducts: string;
  vegetables: string;
  grains: string;
  dairy: string;
  handicrafts: string;
  outOfStock: string;
  available: string;
  soldBy: string;
  call: string;
  noProductsFound: string;
  
  // Priasoft Page
  priasoftSubtitle: string;
  whatIsPriasoft: string;
  priasoftDescription: string;
  panchayatsUsing: string;
  digitalTransactions: string;
  onlineAccess: string;
  priasoftModules: string;
  priasoftBudget: string;
  priasoftBudgetDesc: string;
  priasoftAccounts: string;
  priasoftAccountsDesc: string;
  priasoftPayroll: string;
  priasoftPayrollDesc: string;
  priasoftWorks: string;
  priasoftWorksDesc: string;
  priasoftAssets: string;
  priasoftAssetsDesc: string;
  priasoftAudit: string;
  priasoftAuditDesc: string;
  accessModule: string;
  accessPriasoft: string;
  accessPriasoftDesc: string;
  goToPriasoft: string;
  
  // Profile Page
  changePhoto: string;
  memberSince: string;
  editProfile: string;
  logout: string;
  yourActivity: string;
  quickLinks: string;
  myComplaints: string;
  appliedSchemes: string;
  settings: string;
  personalInformation: string;
  profileUpdated: string;
  profileUpdateSuccess: string;
  saveChanges: string;
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
    clearFilters: 'Clear filters',
    total: 'Total',
    pending: 'Pending',
    resolved: 'Resolved',
    all: 'All',
    allCategories: 'All Categories',
    allStatus: 'All Status',
    allTypes: 'All Types',
    allLevels: 'All Levels',
    
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
    
    // Complaints Page
    newComplaint: 'New Complaint',
    trackComplaint: 'Track Complaint',
    complaintStatus: 'Complaint Status',
    referenceId: 'Reference ID',
    complaintsGrievances: 'Complaints & Grievances',
    submitTrackComplaints: 'Submit and track your complaints and grievances',
    fileNewComplaint: 'File New Complaint',
    yourName: 'Your Name',
    phoneNumber: 'Phone Number',
    category: 'Category',
    complaintTitle: 'Complaint Title',
    description: 'Description',
    submitComplaint: 'Submit Complaint',
    filedBy: 'Filed by',
    assignedTo: 'Assigned to',
    priority: 'Priority',
    highPriority: 'HIGH Priority',
    mediumPriority: 'MEDIUM Priority',
    lowPriority: 'LOW Priority',
    
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
    statusOpen: 'Open',
    statusClosed: 'Closed',
    
    // Categories - Schemes
    categoryHousing: 'Housing',
    categoryEmployment: 'Employment',
    categoryHealth: 'Health',
    categoryPension: 'Pension',
    categoryEducation: 'Education',
    categoryAgriculture: 'Agriculture',
    categoryOther: 'Other',
    
    // Categories - Complaints
    categoryWater: 'Water Supply',
    categoryRoad: 'Roads',
    categoryElectricity: 'Electricity',
    categorySanitation: 'Sanitation',
    categoryCorruption: 'Corruption',
    
    // Categories - Development
    categoryRoadWork: 'Road',
    categoryWaterWork: 'Water',
    categoryElectricWork: 'Electric',
    categoryBuilding: 'Building',
    categoryDrainage: 'Drainage',
    
    // Categories - Attractions
    categoryReligious: 'Religious',
    categoryHistorical: 'Historical',
    categoryNature: 'Nature',
    categoryMarket: 'Market',
    
    // Categories - Amenities
    categoryBank: 'Banks',
    categoryClinic: 'Clinics',
    categoryHospital: 'Hospitals',
    categoryShop: 'Shops',
    
    // Schemes Page
    browseSchemes: 'Browse and explore government schemes available for villagers',
    searchSchemes: 'Search schemes...',
    centralGovt: 'Central Govt',
    stateGovt: 'State Govt',
    viewDetails: 'View Details',
    noSchemesFound: 'No schemes found',
    adjustFilters: 'Try adjusting your search or filter criteria',
    department: 'Department',
    
    // Members Page
    panchayatMembersStaff: 'Panchayat Members & Staff',
    meetRepresentatives: 'Meet your elected representatives and panchayat staff',
    sarpanch: 'Sarpanch',
    deputySarpanch: 'Deputy Sarpanch',
    secretary: 'Secretary',
    member: 'Member',
    staff: 'Staff',
    panchayatLeadership: 'Panchayat Leadership',
    wardMembers: 'Ward Members',
    panchayatStaff: 'Panchayat Staff',
    ward: 'Ward',
    term: 'Term',
    
    // Gram Sabha Page
    gramSabhaMeetings: 'Gram Sabha Meetings',
    viewMeetingsAgendas: 'View upcoming meetings, agendas, and past meeting minutes',
    upcomingMeetings: 'Upcoming Meetings',
    pastMeetings: 'Past Meetings',
    noUpcomingMeetings: 'No upcoming meetings scheduled',
    noPastMeetings: 'No past meetings',
    meetingRecordsAppear: 'Meeting records will appear here after meetings are completed',
    agenda: 'Agenda',
    addToCalendar: 'Add to Calendar',
    downloadMinutes: 'Download Minutes',
    venue: 'Venue',
    time: 'Time',
    
    // Development Page
    trackDevelopment: 'Track ongoing and completed development projects in the village',
    totalProjects: 'Total Projects',
    inProgress: 'In Progress',
    completed: 'Completed',
    totalBudget: 'Total Budget',
    noDevelopmentWorks: 'No development works found',
    scheme: 'Scheme',
    
    // Events Page
    eventsGallery: 'Events & Gallery',
    exploreEvents: 'Explore village events, festivals, and photo gallery',
    pastEventsGallery: 'Past Events & Gallery',
    noPastEvents: 'No past events',
    eventPhotosAppear: 'Event photos and details will appear here',
    upcoming: 'Upcoming',
    
    // Attractions Page
    exploreAttractions: 'Explore tourist spots and interesting places in and around the village',
    inVillage: 'In Village',
    nearbyAttractions: 'Nearby Attractions',
    nearbyOnly: 'Nearby Only',
    noAttractionsFound: 'No attractions found',
    kmAway: 'km away',
    
    // Amenities Page
    localAmenities: 'Local Amenities',
    findAmenities: 'Find banks, hospitals, shops, and other essential services',
    searchAmenities: 'Search amenities...',
    noAmenitiesFound: 'No amenities found',
    openingHours: 'Opening Hours',
    contact: 'Contact',
    
    // Announcements Page
    officialNotices: 'Official notices and announcements',
    
    // Services Page
    serviceLinks: 'Service Links',
    quickAccessServices: 'Quick access to government services and portals',
    
    // Finance Page
    financeDashboard: 'Finance Dashboard',
    budgetTransparency: 'Village budget and expenditure transparency',
    budgetOverview: 'Budget Overview',
    expenditureSummary: 'Expenditure Summary',
    
    // Tenders Page
    eTenders: 'e-Tenders',
    openTenders: 'Open tenders and work allotment notices',
    estimatedCost: 'Estimated Cost',
    lastDate: 'Last Date',
    
    // Assets Page
    villageAssets: 'Village Assets',
    assetInventory: 'Inventory of panchayat-owned assets',
    
    // Taluka Page
    talukaPanchayat: 'Taluka Panchayat',
    talukaAdmin: 'Taluka-level administration information',
    hqAddress: 'HQ Address',
    vision: 'Vision',
    
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
    
    // New keys
    previous: 'Previous',
    next: 'Next',
    login: 'Login',
    register: 'Register',
    gallery: 'Gallery',
    market: 'Market',
    priasoft: 'PRIASOFT',
    profile: 'Profile',
    
    // Login Page
    loginSubtitle: 'Sign in to access your account',
    email: 'Email',
    password: 'Password',
    enterEmail: 'Enter your email',
    enterPassword: 'Enter your password',
    showPassword: 'Show password',
    hidePassword: 'Hide password',
    forgotPassword: 'Forgot password?',
    loggingIn: 'Logging in...',
    loginSuccess: 'Login Successful',
    welcomeBack: 'Welcome back!',
    noAccount: "Don't have an account?",
    registerNow: 'Register now',
    
    // Register Page
    registerSubtitle: 'Create your account to get started',
    fullName: 'Full Name',
    enterFullName: 'Enter your full name',
    enterPhone: 'Enter your phone number',
    confirmPassword: 'Confirm Password',
    confirmYourPassword: 'Confirm your password',
    registering: 'Registering...',
    registrationSuccess: 'Registration Successful',
    accountCreated: 'Your account has been created',
    alreadyHaveAccount: 'Already have an account?',
    loginNow: 'Login now',
    
    // Contact Page
    contactSubtitle: 'Get in touch with the Gram Panchayat office',
    contactInfo: 'Contact Information',
    address: 'Address',
    officeHours: 'Office Hours',
    mondayToFriday: 'Monday to Friday',
    saturday: 'Saturday',
    needHelp: 'Need Immediate Help?',
    needHelpDesc: 'Call our helpline for urgent matters',
    callNow: 'Call Now',
    sendMessage: 'Send Message',
    subject: 'Subject',
    enterSubject: 'Enter subject',
    message: 'Message',
    enterMessage: 'Write your message here...',
    sending: 'Sending...',
    messageSent: 'Message Sent',
    messageSuccessDesc: 'We will get back to you soon',
    
    // Gallery Page
    gallerySubtitle: 'Explore photos from village events, heritage sites, and nature',
    galleryEvents: 'Events',
    galleryHeritage: 'Heritage',
    galleryNature: 'Nature',
    noPhotosFound: 'No photos found',
    
    // Market Page
    villageMarket: 'Village Market',
    marketSubtitle: 'Buy fresh produce and local products from village farmers and artisans',
    marketLocation: 'Market Location',
    villageChowk: 'Village Chowk',
    marketTiming: 'Market Timing',
    helplineNumber: 'Helpline Number',
    searchProducts: 'Search products...',
    vegetables: 'Vegetables',
    grains: 'Grains',
    dairy: 'Dairy',
    handicrafts: 'Handicrafts',
    outOfStock: 'Out of Stock',
    available: 'Available',
    soldBy: 'Sold by',
    call: 'Call',
    noProductsFound: 'No products found',
    
    // Priasoft Page
    priasoftSubtitle: 'Panchayati Raj Institutions Accounting Software',
    whatIsPriasoft: 'What is PRIASOFT?',
    priasoftDescription: 'PRIASOFT is an integrated accounting software for Panchayati Raj Institutions developed by the Government of Gujarat. It enables transparent financial management, budget tracking, and digital governance at the grassroots level.',
    panchayatsUsing: 'Panchayats Using',
    digitalTransactions: 'Digital Transactions',
    onlineAccess: 'Online Access',
    priasoftModules: 'PRIASOFT Modules',
    priasoftBudget: 'Budget Management',
    priasoftBudgetDesc: 'Prepare and manage annual budgets online',
    priasoftAccounts: 'Accounts',
    priasoftAccountsDesc: 'Maintain books of accounts digitally',
    priasoftPayroll: 'Payroll',
    priasoftPayrollDesc: 'Manage staff salaries and payments',
    priasoftWorks: 'Works Management',
    priasoftWorksDesc: 'Track development works and expenditure',
    priasoftAssets: 'Asset Management',
    priasoftAssetsDesc: 'Inventory and manage panchayat assets',
    priasoftAudit: 'Audit Trail',
    priasoftAuditDesc: 'Complete audit trail for all transactions',
    accessModule: 'Access Module',
    accessPriasoft: 'Access PRIASOFT Portal',
    accessPriasoftDesc: 'Login to the official PRIASOFT portal to manage your panchayat finances',
    goToPriasoft: 'Go to PRIASOFT',
    
    // Profile Page
    changePhoto: 'Change Photo',
    memberSince: 'Member Since',
    editProfile: 'Edit Profile',
    logout: 'Logout',
    yourActivity: 'Your Activity',
    quickLinks: 'Quick Links',
    myComplaints: 'My Complaints',
    appliedSchemes: 'Applied Schemes',
    settings: 'Settings',
    personalInformation: 'Personal Information',
    profileUpdated: 'Profile Updated',
    profileUpdateSuccess: 'Your profile has been updated successfully',
    saveChanges: 'Save Changes',
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
    clearFilters: 'ફિલ્ટર સાફ કરો',
    total: 'કુલ',
    pending: 'બાકી',
    resolved: 'ઉકેલાયું',
    all: 'બધા',
    allCategories: 'બધી શ્રેણીઓ',
    allStatus: 'બધી સ્થિતિ',
    allTypes: 'બધા પ્રકાર',
    allLevels: 'બધા સ્તર',
    
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
    
    // Complaints Page
    newComplaint: 'નવી ફરિયાદ',
    trackComplaint: 'ફરિયાદ ટ્રેક કરો',
    complaintStatus: 'ફરિયાદની સ્થિતિ',
    referenceId: 'સંદર્ભ આઈડી',
    complaintsGrievances: 'ફરિયાદો અને ફરિયાદ',
    submitTrackComplaints: 'તમારી ફરિયાદો સબમિટ કરો અને ટ્રેક કરો',
    fileNewComplaint: 'નવી ફરિયાદ નોંધાવો',
    yourName: 'તમારું નામ',
    phoneNumber: 'ફોન નંબર',
    category: 'શ્રેણી',
    complaintTitle: 'ફરિયાદ શીર્ષક',
    description: 'વર્ણન',
    submitComplaint: 'ફરિયાદ સબમિટ કરો',
    filedBy: 'દ્વારા દાખલ',
    assignedTo: 'ને સોંપેલ',
    priority: 'પ્રાથમિકતા',
    highPriority: 'ઉચ્ચ પ્રાથમિકતા',
    mediumPriority: 'મધ્યમ પ્રાથમિકતા',
    lowPriority: 'ઓછી પ્રાથમિકતા',
    
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
    statusOpen: 'ખુલ્લું',
    statusClosed: 'બંધ',
    
    // Categories - Schemes
    categoryHousing: 'આવાસ',
    categoryEmployment: 'રોજગાર',
    categoryHealth: 'આરોગ્ય',
    categoryPension: 'પેન્શન',
    categoryEducation: 'શિક્ષણ',
    categoryAgriculture: 'કૃષિ',
    categoryOther: 'અન્ય',
    
    // Categories - Complaints
    categoryWater: 'પાણી પુરવઠો',
    categoryRoad: 'રસ્તાઓ',
    categoryElectricity: 'વીજળી',
    categorySanitation: 'સ્વચ્છતા',
    categoryCorruption: 'ભ્રષ્ટાચાર',
    
    // Categories - Development
    categoryRoadWork: 'રસ્તો',
    categoryWaterWork: 'પાણી',
    categoryElectricWork: 'વીજળી',
    categoryBuilding: 'બિલ્ડિંગ',
    categoryDrainage: 'ગટર',
    
    // Categories - Attractions
    categoryReligious: 'ધાર્મિક',
    categoryHistorical: 'ઐતિહાસિક',
    categoryNature: 'પ્રકૃતિ',
    categoryMarket: 'બજાર',
    
    // Categories - Amenities
    categoryBank: 'બેંકો',
    categoryClinic: 'ક્લિનિક',
    categoryHospital: 'હોસ્પિટલ',
    categoryShop: 'દુકાનો',
    
    // Schemes Page
    browseSchemes: 'ગ્રામજનો માટે ઉપલબ્ધ સરકારી યોજનાઓ બ્રાઉઝ કરો',
    searchSchemes: 'યોજનાઓ શોધો...',
    centralGovt: 'કેન્દ્ર સરકાર',
    stateGovt: 'રાજ્ય સરકાર',
    viewDetails: 'વિગતો જુઓ',
    noSchemesFound: 'કોઈ યોજના મળી નથી',
    adjustFilters: 'તમારી શોધ અથવા ફિલ્ટર માપદંડ બદલવાનો પ્રયાસ કરો',
    department: 'વિભાગ',
    
    // Members Page
    panchayatMembersStaff: 'પંચાયત સભ્યો અને સ્ટાફ',
    meetRepresentatives: 'તમારા ચૂંટાયેલા પ્રતિનિધિઓ અને પંચાયત સ્ટાફને મળો',
    sarpanch: 'સરપંચ',
    deputySarpanch: 'ઉપ-સરપંચ',
    secretary: 'સચિવ',
    member: 'સભ્ય',
    staff: 'સ્ટાફ',
    panchayatLeadership: 'પંચાયત નેતૃત્વ',
    wardMembers: 'વોર્ડ સભ્યો',
    panchayatStaff: 'પંચાયત સ્ટાફ',
    ward: 'વોર્ડ',
    term: 'કાર્યકાળ',
    
    // Gram Sabha Page
    gramSabhaMeetings: 'ગ્રામ સભા બેઠકો',
    viewMeetingsAgendas: 'આગામી બેઠકો, એજન્ડા અને ભૂતકાળની બેઠકની મિનિટ્સ જુઓ',
    upcomingMeetings: 'આગામી બેઠકો',
    pastMeetings: 'ભૂતકાળની બેઠકો',
    noUpcomingMeetings: 'કોઈ આગામી બેઠક સુનિશ્ચિત નથી',
    noPastMeetings: 'કોઈ ભૂતકાળની બેઠક નથી',
    meetingRecordsAppear: 'બેઠક પૂર્ણ થયા પછી રેકોર્ડ્સ અહીં દેખાશે',
    agenda: 'એજન્ડા',
    addToCalendar: 'કેલેન્ડરમાં ઉમેરો',
    downloadMinutes: 'મિનિટ્સ ડાઉનલોડ કરો',
    venue: 'સ્થળ',
    time: 'સમય',
    
    // Development Page
    trackDevelopment: 'ગામમાં ચાલુ અને પૂર્ણ વિકાસ પ્રોજેક્ટ્સ ટ્રેક કરો',
    totalProjects: 'કુલ પ્રોજેક્ટ્સ',
    inProgress: 'પ્રગતિમાં',
    completed: 'પૂર્ણ',
    totalBudget: 'કુલ બજેટ',
    noDevelopmentWorks: 'કોઈ વિકાસ કામો મળ્યા નથી',
    scheme: 'યોજના',
    
    // Events Page
    eventsGallery: 'કાર્યક્રમો અને ગેલેરી',
    exploreEvents: 'ગામના કાર્યક્રમો, તહેવારો અને ફોટો ગેલેરી અન્વેષણ કરો',
    pastEventsGallery: 'ભૂતકાળના કાર્યક્રમો અને ગેલેરી',
    noPastEvents: 'કોઈ ભૂતકાળના કાર્યક્રમો નથી',
    eventPhotosAppear: 'ઇવેન્ટ ફોટા અને વિગતો અહીં દેખાશે',
    upcoming: 'આગામી',
    
    // Attractions Page
    exploreAttractions: 'ગામ અને આસપાસના પ્રવાસન સ્થળો અને રસપ્રદ સ્થળો અન્વેષણ કરો',
    inVillage: 'ગામમાં',
    nearbyAttractions: 'નજીકના આકર્ષણો',
    nearbyOnly: 'ફક્ત નજીકના',
    noAttractionsFound: 'કોઈ આકર્ષણો મળ્યા નથી',
    kmAway: 'કિમી દૂર',
    
    // Amenities Page
    localAmenities: 'સ્થાનિક સુવિધાઓ',
    findAmenities: 'બેંકો, હોસ્પિટલો, દુકાનો અને અન્ય આવશ્યક સેવાઓ શોધો',
    searchAmenities: 'સુવિધાઓ શોધો...',
    noAmenitiesFound: 'કોઈ સુવિધાઓ મળી નથી',
    openingHours: 'ખુલવાનો સમય',
    contact: 'સંપર્ક',
    
    // Announcements Page
    officialNotices: 'સત્તાવાર નોટિસ અને જાહેરાતો',
    
    // Services Page
    serviceLinks: 'સેવા લિંક્સ',
    quickAccessServices: 'સરકારી સેવાઓ અને પોર્ટલ્સની ઝડપી પહોંચ',
    
    // Finance Page
    financeDashboard: 'નાણાકીય ડેશબોર્ડ',
    budgetTransparency: 'ગામનું બજેટ અને ખર્ચ પારદર્શિતા',
    budgetOverview: 'બજેટ ઝાંખી',
    expenditureSummary: 'ખર્ચ સારાંશ',
    
    // Tenders Page
    eTenders: 'ઇ-ટેન્ડર',
    openTenders: 'ખુલ્લા ટેન્ડર અને કામ ફાળવણી નોટિસ',
    estimatedCost: 'અંદાજિત ખર્ચ',
    lastDate: 'છેલ્લી તારીખ',
    
    // Assets Page
    villageAssets: 'ગામની અસ્કયામતો',
    assetInventory: 'પંચાયત-માલિકીની અસ્કયામતોની યાદી',
    
    // Taluka Page
    talukaPanchayat: 'તાલુકા પંચાયત',
    talukaAdmin: 'તાલુકા-સ્તરની વહીવટી માહિતી',
    hqAddress: 'મુખ્ય કાર્યાલય સરનામું',
    vision: 'વિઝન',
    
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
    
    // New keys
    previous: 'પાછલું',
    next: 'આગળ',
    login: 'લૉગિન',
    register: 'નોંધણી',
    gallery: 'ગેલેરી',
    market: 'બજાર',
    priasoft: 'પ્રિયાસોફ્ટ',
    profile: 'પ્રોફાઇલ',
    
    // Login Page
    loginSubtitle: 'તમારા ખાતામાં પ્રવેશ કરો',
    email: 'ઇમેઇલ',
    password: 'પાસવર્ડ',
    enterEmail: 'તમારો ઇમેઇલ દાખલ કરો',
    enterPassword: 'તમારો પાસવર્ડ દાખલ કરો',
    showPassword: 'પાસવર્ડ બતાવો',
    hidePassword: 'પાસવર્ડ છુપાવો',
    forgotPassword: 'પાસવર્ડ ભૂલી ગયા?',
    loggingIn: 'લૉગિન થઈ રહ્યું છે...',
    loginSuccess: 'લૉગિન સફળ',
    welcomeBack: 'પાછા આવવા બદલ આભાર!',
    noAccount: 'ખાતું નથી?',
    registerNow: 'હમણાં નોંધણી કરો',
    
    // Register Page
    registerSubtitle: 'શરૂ કરવા માટે તમારું ખાતું બનાવો',
    fullName: 'પૂરું નામ',
    enterFullName: 'તમારું પૂરું નામ દાખલ કરો',
    enterPhone: 'તમારો ફોન નંબર દાખલ કરો',
    confirmPassword: 'પાસવર્ડ પુષ્ટિ કરો',
    confirmYourPassword: 'તમારો પાસવર્ડ પુષ્ટિ કરો',
    registering: 'નોંધણી થઈ રહી છે...',
    registrationSuccess: 'નોંધણી સફળ',
    accountCreated: 'તમારું ખાતું બનાવવામાં આવ્યું છે',
    alreadyHaveAccount: 'પહેલેથી ખાતું છે?',
    loginNow: 'હમણાં લૉગિન કરો',
    
    // Contact Page
    contactSubtitle: 'ગ્રામ પંચાયત કાર્યાલય સાથે સંપર્ક કરો',
    contactInfo: 'સંપર્ક માહિતી',
    address: 'સરનામું',
    officeHours: 'કાર્યાલય સમય',
    mondayToFriday: 'સોમવાર થી શુક્રવાર',
    saturday: 'શનિવાર',
    needHelp: 'તાત્કાલિક મદદની જરૂર છે?',
    needHelpDesc: 'તાત્કાલિક બાબતો માટે અમારી હેલ્પલાઇન પર કૉલ કરો',
    callNow: 'હમણાં કૉલ કરો',
    sendMessage: 'સંદેશ મોકલો',
    subject: 'વિષય',
    enterSubject: 'વિષય દાખલ કરો',
    message: 'સંદેશ',
    enterMessage: 'તમારો સંદેશ અહીં લખો...',
    sending: 'મોકલી રહ્યું છે...',
    messageSent: 'સંદેશ મોકલ્યો',
    messageSuccessDesc: 'અમે ટૂંક સમયમાં તમારો સંપર્ક કરીશું',
    
    // Gallery Page
    gallerySubtitle: 'ગામના કાર્યક્રમો, વારસા સ્થળો અને પ્રકૃતિના ફોટા જુઓ',
    galleryEvents: 'કાર્યક્રમો',
    galleryHeritage: 'વારસો',
    galleryNature: 'પ્રકૃતિ',
    noPhotosFound: 'કોઈ ફોટા મળ્યા નથી',
    
    // Market Page
    villageMarket: 'ગામનું બજાર',
    marketSubtitle: 'ગામના ખેડૂતો અને કારીગરો પાસેથી તાજી પેદાશો અને સ્થાનિક ઉત્પાદનો ખરીદો',
    marketLocation: 'બજારનું સ્થળ',
    villageChowk: 'ગામ ચોક',
    marketTiming: 'બજારનો સમય',
    helplineNumber: 'હેલ્પલાઇન નંબર',
    searchProducts: 'ઉત્પાદનો શોધો...',
    vegetables: 'શાકભાજી',
    grains: 'અનાજ',
    dairy: 'ડેરી',
    handicrafts: 'હસ્તકલા',
    outOfStock: 'સ્ટોકમાં નથી',
    available: 'ઉપલબ્ધ',
    soldBy: 'વેચનાર',
    call: 'કૉલ',
    noProductsFound: 'કોઈ ઉત્પાદનો મળ્યા નથી',
    
    // Priasoft Page
    priasoftSubtitle: 'પંચાયતી રાજ સંસ્થાઓ એકાઉન્ટિંગ સોફ્ટવેર',
    whatIsPriasoft: 'PRIASOFT શું છે?',
    priasoftDescription: 'PRIASOFT એ ગુજરાત સરકાર દ્વારા વિકસાવવામાં આવેલ પંચાયતી રાજ સંસ્થાઓ માટે એકીકૃત એકાઉન્ટિંગ સોફ્ટવેર છે. તે પાયાના સ્તરે પારદર્શક નાણાકીય વ્યવસ્થાપન, બજેટ ટ્રેકિંગ અને ડિજિટલ ગવર્નન્સ સક્ષમ કરે છે.',
    panchayatsUsing: 'ઉપયોગ કરતી પંચાયતો',
    digitalTransactions: 'ડિજિટલ વ્યવહારો',
    onlineAccess: 'ઓનલાઇન એક્સેસ',
    priasoftModules: 'PRIASOFT મોડ્યુલ્સ',
    priasoftBudget: 'બજેટ વ્યવસ્થાપન',
    priasoftBudgetDesc: 'વાર્ષિક બજેટ ઓનલાઇન તૈયાર અને વ્યવસ્થાપિત કરો',
    priasoftAccounts: 'ખાતા',
    priasoftAccountsDesc: 'ડિજિટલ રીતે હિસાબના પુસ્તકો જાળવો',
    priasoftPayroll: 'પેરોલ',
    priasoftPayrollDesc: 'સ્ટાફના પગાર અને ચુકવણીઓનું વ્યવસ્થાપન કરો',
    priasoftWorks: 'કામ વ્યવસ્થાપન',
    priasoftWorksDesc: 'વિકાસ કામો અને ખર્ચ ટ્રેક કરો',
    priasoftAssets: 'અસ્કયામત વ્યવસ્થાપન',
    priasoftAssetsDesc: 'પંચાયત અસ્કયામતોની યાદી અને વ્યવસ્થાપન',
    priasoftAudit: 'ઓડિટ ટ્રેલ',
    priasoftAuditDesc: 'તમામ વ્યવહારો માટે સંપૂર્ણ ઓડિટ ટ્રેલ',
    accessModule: 'મોડ્યુલ એક્સેસ કરો',
    accessPriasoft: 'PRIASOFT પોર્ટલ એક્સેસ કરો',
    accessPriasoftDesc: 'તમારી પંચાયતના નાણા વ્યવસ્થાપન માટે સત્તાવાર PRIASOFT પોર્ટલમાં લૉગિન કરો',
    goToPriasoft: 'PRIASOFT પર જાઓ',
    
    // Profile Page
    changePhoto: 'ફોટો બદલો',
    memberSince: 'સભ્ય છે ત્યારથી',
    editProfile: 'પ્રોફાઇલ સંપાદિત કરો',
    logout: 'લૉગઆઉટ',
    yourActivity: 'તમારી પ્રવૃત્તિ',
    quickLinks: 'ઝડપી લિંક્સ',
    myComplaints: 'મારી ફરિયાદો',
    appliedSchemes: 'લાગુ કરેલ યોજનાઓ',
    settings: 'સેટિંગ્સ',
    personalInformation: 'વ્યક્તિગત માહિતી',
    profileUpdated: 'પ્રોફાઇલ અપડેટ થયું',
    profileUpdateSuccess: 'તમારી પ્રોફાઇલ સફળતાપૂર્વક અપડેટ થઈ છે',
    saveChanges: 'ફેરફારો સાચવો',
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
    clearFilters: 'फ़िल्टर साफ़ करें',
    total: 'कुल',
    pending: 'लंबित',
    resolved: 'समाधान हुआ',
    all: 'सभी',
    allCategories: 'सभी श्रेणियां',
    allStatus: 'सभी स्थिति',
    allTypes: 'सभी प्रकार',
    allLevels: 'सभी स्तर',
    
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
    
    // Complaints Page
    newComplaint: 'नई शिकायत',
    trackComplaint: 'शिकायत ट्रैक करें',
    complaintStatus: 'शिकायत स्थिति',
    referenceId: 'संदर्भ आईडी',
    complaintsGrievances: 'शिकायतें और समस्याएं',
    submitTrackComplaints: 'अपनी शिकायतें जमा करें और ट्रैक करें',
    fileNewComplaint: 'नई शिकायत दर्ज करें',
    yourName: 'आपका नाम',
    phoneNumber: 'फ़ोन नंबर',
    category: 'श्रेणी',
    complaintTitle: 'शिकायत शीर्षक',
    description: 'विवरण',
    submitComplaint: 'शिकायत जमा करें',
    filedBy: 'द्वारा दर्ज',
    assignedTo: 'को सौंपा गया',
    priority: 'प्राथमिकता',
    highPriority: 'उच्च प्राथमिकता',
    mediumPriority: 'मध्यम प्राथमिकता',
    lowPriority: 'कम प्राथमिकता',
    
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
    statusOpen: 'खुला',
    statusClosed: 'बंद',
    
    // Categories - Schemes
    categoryHousing: 'आवास',
    categoryEmployment: 'रोजगार',
    categoryHealth: 'स्वास्थ्य',
    categoryPension: 'पेंशन',
    categoryEducation: 'शिक्षा',
    categoryAgriculture: 'कृषि',
    categoryOther: 'अन्य',
    
    // Categories - Complaints
    categoryWater: 'जल आपूर्ति',
    categoryRoad: 'सड़कें',
    categoryElectricity: 'बिजली',
    categorySanitation: 'स्वच्छता',
    categoryCorruption: 'भ्रष्टाचार',
    
    // Categories - Development
    categoryRoadWork: 'सड़क',
    categoryWaterWork: 'पानी',
    categoryElectricWork: 'बिजली',
    categoryBuilding: 'भवन',
    categoryDrainage: 'नाली',
    
    // Categories - Attractions
    categoryReligious: 'धार्मिक',
    categoryHistorical: 'ऐतिहासिक',
    categoryNature: 'प्रकृति',
    categoryMarket: 'बाज़ार',
    
    // Categories - Amenities
    categoryBank: 'बैंक',
    categoryClinic: 'क्लिनिक',
    categoryHospital: 'अस्पताल',
    categoryShop: 'दुकानें',
    
    // Schemes Page
    browseSchemes: 'ग्रामीणों के लिए उपलब्ध सरकारी योजनाएं ब्राउज़ करें',
    searchSchemes: 'योजनाएं खोजें...',
    centralGovt: 'केंद्र सरकार',
    stateGovt: 'राज्य सरकार',
    viewDetails: 'विवरण देखें',
    noSchemesFound: 'कोई योजना नहीं मिली',
    adjustFilters: 'अपनी खोज या फ़िल्टर मानदंड बदलने का प्रयास करें',
    department: 'विभाग',
    
    // Members Page
    panchayatMembersStaff: 'पंचायत सदस्य और स्टाफ',
    meetRepresentatives: 'अपने चुने हुए प्रतिनिधियों और पंचायत स्टाफ से मिलें',
    sarpanch: 'सरपंच',
    deputySarpanch: 'उप-सरपंच',
    secretary: 'सचिव',
    member: 'सदस्य',
    staff: 'स्टाफ',
    panchayatLeadership: 'पंचायत नेतृत्व',
    wardMembers: 'वार्ड सदस्य',
    panchayatStaff: 'पंचायत स्टाफ',
    ward: 'वार्ड',
    term: 'कार्यकाल',
    
    // Gram Sabha Page
    gramSabhaMeetings: 'ग्राम सभा बैठकें',
    viewMeetingsAgendas: 'आगामी बैठकें, एजेंडा और पिछली बैठक के मिनट्स देखें',
    upcomingMeetings: 'आगामी बैठकें',
    pastMeetings: 'पिछली बैठकें',
    noUpcomingMeetings: 'कोई आगामी बैठक निर्धारित नहीं',
    noPastMeetings: 'कोई पिछली बैठक नहीं',
    meetingRecordsAppear: 'बैठक पूर्ण होने के बाद रिकॉर्ड यहां दिखाई देंगे',
    agenda: 'एजेंडा',
    addToCalendar: 'कैलेंडर में जोड़ें',
    downloadMinutes: 'मिनट्स डाउनलोड करें',
    venue: 'स्थान',
    time: 'समय',
    
    // Development Page
    trackDevelopment: 'गांव में चल रहे और पूर्ण विकास परियोजनाओं को ट्रैक करें',
    totalProjects: 'कुल परियोजनाएं',
    inProgress: 'प्रगति पर',
    completed: 'पूर्ण',
    totalBudget: 'कुल बजट',
    noDevelopmentWorks: 'कोई विकास कार्य नहीं मिला',
    scheme: 'योजना',
    
    // Events Page
    eventsGallery: 'कार्यक्रम और गैलरी',
    exploreEvents: 'गांव के कार्यक्रम, त्योहार और फोटो गैलरी देखें',
    pastEventsGallery: 'पिछले कार्यक्रम और गैलरी',
    noPastEvents: 'कोई पिछले कार्यक्रम नहीं',
    eventPhotosAppear: 'इवेंट फोटो और विवरण यहां दिखाई देंगे',
    upcoming: 'आगामी',
    
    // Attractions Page
    exploreAttractions: 'गांव और आसपास के पर्यटन स्थल और दिलचस्प जगहें खोजें',
    inVillage: 'गांव में',
    nearbyAttractions: 'आसपास के आकर्षण',
    nearbyOnly: 'केवल आसपास',
    noAttractionsFound: 'कोई आकर्षण नहीं मिला',
    kmAway: 'किमी दूर',
    
    // Amenities Page
    localAmenities: 'स्थानीय सुविधाएं',
    findAmenities: 'बैंक, अस्पताल, दुकानें और अन्य आवश्यक सेवाएं खोजें',
    searchAmenities: 'सुविधाएं खोजें...',
    noAmenitiesFound: 'कोई सुविधाएं नहीं मिलीं',
    openingHours: 'खुलने का समय',
    contact: 'संपर्क',
    
    // Announcements Page
    officialNotices: 'आधिकारिक नोटिस और घोषणाएं',
    
    // Services Page
    serviceLinks: 'सेवा लिंक',
    quickAccessServices: 'सरकारी सेवाओं और पोर्टल्स तक त्वरित पहुंच',
    
    // Finance Page
    financeDashboard: 'वित्त डैशबोर्ड',
    budgetTransparency: 'गांव का बजट और व्यय पारदर्शिता',
    budgetOverview: 'बजट अवलोकन',
    expenditureSummary: 'व्यय सारांश',
    
    // Tenders Page
    eTenders: 'ई-टेंडर',
    openTenders: 'खुले टेंडर और कार्य आवंटन नोटिस',
    estimatedCost: 'अनुमानित लागत',
    lastDate: 'अंतिम तिथि',
    
    // Assets Page
    villageAssets: 'गांव की संपत्तियां',
    assetInventory: 'पंचायत-स्वामित्व वाली संपत्तियों की सूची',
    
    // Taluka Page
    talukaPanchayat: 'तालुका पंचायत',
    talukaAdmin: 'तालुका-स्तर प्रशासन जानकारी',
    hqAddress: 'मुख्यालय पता',
    vision: 'विज़न',
    
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
    
    // New keys
    previous: 'पिछला',
    next: 'अगला',
    login: 'लॉग इन',
    register: 'पंजीकरण',
    gallery: 'गैलरी',
    market: 'बाज़ार',
    priasoft: 'प्रियासॉफ्ट',
    profile: 'प्रोफ़ाइल',
    
    // Login Page
    loginSubtitle: 'अपने खाते में प्रवेश करें',
    email: 'ईमेल',
    password: 'पासवर्ड',
    enterEmail: 'अपना ईमेल दर्ज करें',
    enterPassword: 'अपना पासवर्ड दर्ज करें',
    showPassword: 'पासवर्ड दिखाएं',
    hidePassword: 'पासवर्ड छुपाएं',
    forgotPassword: 'पासवर्ड भूल गए?',
    loggingIn: 'लॉग इन हो रहा है...',
    loginSuccess: 'लॉग इन सफल',
    welcomeBack: 'वापस स्वागत है!',
    noAccount: 'खाता नहीं है?',
    registerNow: 'अभी पंजीकरण करें',
    
    // Register Page
    registerSubtitle: 'शुरू करने के लिए अपना खाता बनाएं',
    fullName: 'पूरा नाम',
    enterFullName: 'अपना पूरा नाम दर्ज करें',
    enterPhone: 'अपना फोन नंबर दर्ज करें',
    confirmPassword: 'पासवर्ड की पुष्टि करें',
    confirmYourPassword: 'अपने पासवर्ड की पुष्टि करें',
    registering: 'पंजीकरण हो रहा है...',
    registrationSuccess: 'पंजीकरण सफल',
    accountCreated: 'आपका खाता बना दिया गया है',
    alreadyHaveAccount: 'पहले से खाता है?',
    loginNow: 'अभी लॉग इन करें',
    
    // Contact Page
    contactSubtitle: 'ग्राम पंचायत कार्यालय से संपर्क करें',
    contactInfo: 'संपर्क जानकारी',
    address: 'पता',
    officeHours: 'कार्यालय समय',
    mondayToFriday: 'सोमवार से शुक्रवार',
    saturday: 'शनिवार',
    needHelp: 'तुरंत मदद चाहिए?',
    needHelpDesc: 'जरूरी मामलों के लिए हमारी हेल्पलाइन पर कॉल करें',
    callNow: 'अभी कॉल करें',
    sendMessage: 'संदेश भेजें',
    subject: 'विषय',
    enterSubject: 'विषय दर्ज करें',
    message: 'संदेश',
    enterMessage: 'अपना संदेश यहां लिखें...',
    sending: 'भेज रहे हैं...',
    messageSent: 'संदेश भेजा गया',
    messageSuccessDesc: 'हम जल्द ही आपसे संपर्क करेंगे',
    
    // Gallery Page
    gallerySubtitle: 'गांव के कार्यक्रमों, विरासत स्थलों और प्रकृति की तस्वीरें देखें',
    galleryEvents: 'कार्यक्रम',
    galleryHeritage: 'विरासत',
    galleryNature: 'प्रकृति',
    noPhotosFound: 'कोई फ़ोटो नहीं मिली',
    
    // Market Page
    villageMarket: 'गांव का बाज़ार',
    marketSubtitle: 'गांव के किसानों और कारीगरों से ताज़ी उपज और स्थानीय उत्पाद खरीदें',
    marketLocation: 'बाज़ार का स्थान',
    villageChowk: 'गांव चौक',
    marketTiming: 'बाज़ार का समय',
    helplineNumber: 'हेल्पलाइन नंबर',
    searchProducts: 'उत्पाद खोजें...',
    vegetables: 'सब्जियां',
    grains: 'अनाज',
    dairy: 'डेयरी',
    handicrafts: 'हस्तशिल्प',
    outOfStock: 'स्टॉक में नहीं',
    available: 'उपलब्ध',
    soldBy: 'विक्रेता',
    call: 'कॉल',
    noProductsFound: 'कोई उत्पाद नहीं मिला',
    
    // Priasoft Page
    priasoftSubtitle: 'पंचायती राज संस्थाएं अकाउंटिंग सॉफ्टवेयर',
    whatIsPriasoft: 'PRIASOFT क्या है?',
    priasoftDescription: 'PRIASOFT गुजरात सरकार द्वारा विकसित पंचायती राज संस्थाओं के लिए एकीकृत अकाउंटिंग सॉफ्टवेयर है। यह जमीनी स्तर पर पारदर्शी वित्तीय प्रबंधन, बजट ट्रैकिंग और डिजिटल शासन सक्षम करता है।',
    panchayatsUsing: 'उपयोग करने वाली पंचायतें',
    digitalTransactions: 'डिजिटल लेनदेन',
    onlineAccess: 'ऑनलाइन एक्सेस',
    priasoftModules: 'PRIASOFT मॉड्यूल',
    priasoftBudget: 'बजट प्रबंधन',
    priasoftBudgetDesc: 'वार्षिक बजट ऑनलाइन तैयार और प्रबंधित करें',
    priasoftAccounts: 'खाते',
    priasoftAccountsDesc: 'डिजिटल रूप से खातों की पुस्तकें रखें',
    priasoftPayroll: 'पेरोल',
    priasoftPayrollDesc: 'कर्मचारियों के वेतन और भुगतान प्रबंधित करें',
    priasoftWorks: 'कार्य प्रबंधन',
    priasoftWorksDesc: 'विकास कार्यों और व्यय को ट्रैक करें',
    priasoftAssets: 'संपत्ति प्रबंधन',
    priasoftAssetsDesc: 'पंचायत संपत्तियों की सूची और प्रबंधन',
    priasoftAudit: 'ऑडिट ट्रेल',
    priasoftAuditDesc: 'सभी लेनदेन के लिए पूर्ण ऑडिट ट्रेल',
    accessModule: 'मॉड्यूल एक्सेस करें',
    accessPriasoft: 'PRIASOFT पोर्टल एक्सेस करें',
    accessPriasoftDesc: 'अपनी पंचायत के वित्त प्रबंधन के लिए आधिकारिक PRIASOFT पोर्टल में लॉग इन करें',
    goToPriasoft: 'PRIASOFT पर जाएं',
    
    // Profile Page
    changePhoto: 'फोटो बदलें',
    memberSince: 'सदस्य है तब से',
    editProfile: 'प्रोफ़ाइल संपादित करें',
    logout: 'लॉग आउट',
    yourActivity: 'आपकी गतिविधि',
    quickLinks: 'त्वरित लिंक',
    myComplaints: 'मेरी शिकायतें',
    appliedSchemes: 'आवेदित योजनाएं',
    settings: 'सेटिंग्स',
    personalInformation: 'व्यक्तिगत जानकारी',
    profileUpdated: 'प्रोफ़ाइल अपडेट हुई',
    profileUpdateSuccess: 'आपकी प्रोफ़ाइल सफलतापूर्वक अपडेट हो गई है',
    saveChanges: 'परिवर्तन सहेजें',
  },
};

export function getTranslations(lang: Language): Translations {
  return translations[lang] || translations.en;
}

export function t(key: keyof Translations, lang: Language): string {
  return translations[lang]?.[key] || translations.en[key] || key;
}

export default translations;
