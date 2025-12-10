// Core Entities matching Django DRF models

export interface Village {
  id: number;
  name: string;
  slug: string;
  taluka_id: number;
  taluka_name?: string;
  district: string;
  state: string;
  latitude: number;
  longitude: number;
  default_language: 'gu' | 'hi' | 'en';
  is_active: boolean;
}

export interface Taluka {
  id: number;
  name: string;
  hq_address: string;
  vision: string;
  mission: string;
  contact_email: string;
  contact_phone: string;
}

export interface TalukaOfficer {
  id: number;
  taluka_id: number;
  name: string;
  designation: 'DDO' | 'OFFICER' | 'CLERK';
  email: string;
  phone: string;
  photo?: string;
}

export type UserRole = 'VILLAGER' | 'OPERATOR' | 'ADMIN' | 'GOVT_OFFICER' | 'COMPANY_OFFICER' | 'BUSINESS_OWNER';

export interface User {
  id: number;
  name: string;
  phone: string;
  email?: string;
  role: UserRole;
  village_id?: number;
}

export interface Scheme {
  id: number;
  code?: string;
  department: string;
  category: 'HOUSING' | 'EMPLOYMENT' | 'HEALTH' | 'PENSION' | 'EDUCATION' | 'AGRICULTURE' | 'OTHER';
  is_active: boolean;
  state_level: boolean;
  central_level: boolean;
  created_at: string;
  // Translation fields
  name: string;
  short_description: string;
  full_description: string;
  eligibility_text: string;
  documents_required: string;
}

export interface Member {
  id: number;
  village_id: number;
  name: string;
  role: 'SARPANCH' | 'DEPUTY_SARPANCH' | 'MEMBER' | 'SECRETARY' | 'STAFF';
  ward_no?: number;
  photo?: string;
  phone_public?: string;
  email_public?: string;
  term_start: string;
  term_end: string;
  is_active: boolean;
}

export interface GramSabhaMeeting {
  id: number;
  village_id: number;
  title: string;
  date: string;
  start_time: string;
  end_time: string;
  venue: string;
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
  agenda: string;
  minutes_document?: string;
  created_by_id: number;
}

export interface DevelopmentWork {
  id: number;
  village_id: number;
  title: string;
  description: string;
  work_type: 'ROAD' | 'WATER' | 'ELECTRIC' | 'BUILDING' | 'DRAINAGE' | 'OTHER';
  funding_scheme_id?: number;
  funding_scheme_name?: string;
  estimated_cost: number;
  approved_budget?: number;
  status: 'PLANNED' | 'APPROVED' | 'IN_PROGRESS' | 'COMPLETED';
  lat?: number;
  lng?: number;
  start_date?: string;
  end_date?: string;
  progress_percentage?: number;
  photos?: DevelopmentWorkPhoto[];
}

export interface DevelopmentWorkPhoto {
  id: number;
  work_id: number;
  image: string;
  caption?: string;
  uploaded_at: string;
}

export type ComplaintCategory = 'WATER' | 'ROAD' | 'ELECTRICITY' | 'CORRUPTION' | 'SANITATION' | 'OTHER';
export type ComplaintStatus = 'NEW' | 'IN_REVIEW' | 'IN_PROGRESS' | 'RESOLVED' | 'REJECTED';
export type ComplaintPriority = 'LOW' | 'MEDIUM' | 'HIGH';

export interface Complaint {
  id: number;
  reference_id: string;
  village_id: number;
  user_id?: number;
  name: string;
  phone: string;
  category: ComplaintCategory;
  title: string;
  description: string;
  lat?: number;
  lng?: number;
  status: ComplaintStatus;
  priority: ComplaintPriority;
  created_at: string;
  updated_at: string;
  assigned_to_id?: number;
  assigned_to_name?: string;
  attachments?: ComplaintAttachment[];
}

export interface ComplaintAttachment {
  id: number;
  complaint_id: number;
  file: string;
  uploaded_at: string;
}

export interface Event {
  id: number;
  village_id: number;
  title: string;
  description: string;
  event_date: string;
  event_type: 'FESTIVAL' | 'GOVT_PROGRAM' | 'CELEBRITY_VISIT' | 'CULTURAL' | 'OTHER';
  media?: EventMedia[];
}

export interface EventMedia {
  id: number;
  event_id: number;
  media_type: 'IMAGE' | 'VIDEO';
  file?: string;
  external_url?: string;
  caption?: string;
}

export interface Attraction {
  id: number;
  village_id: number;
  name: string;
  description: string;
  type: 'RELIGIOUS' | 'HISTORICAL' | 'NATURE' | 'MARKET' | 'OTHER';
  lat: number;
  lng: number;
  distance_km?: number;
  is_nearby: boolean;
  photos?: AttractionPhoto[];
}

export interface AttractionPhoto {
  id: number;
  attraction_id: number;
  image: string;
  caption?: string;
}

export interface Amenity {
  id: number;
  village_id: number;
  name: string;
  type: 'BANK' | 'SHOP' | 'CLINIC' | 'HOSPITAL' | 'EDUCATION' | 'MARKET' | 'OTHER';
  address: string;
  contact_phone?: string;
  contact_person?: string;
  opening_hours?: string;
  lat?: number;
  lng?: number;
}

export interface Announcement {
  id: number;
  village_id: number;
  type: 'NOTICE' | 'MEETING' | 'EMERGENCY' | 'GENERAL';
  start_date: string;
  end_date?: string;
  is_active: boolean;
  created_at: string;
  // Translation fields
  title: string;
  description: string;
}

export interface ServiceLink {
  id: number;
  village_id?: number;
  title: string;
  category: 'BIRTH_CERTIFICATE' | 'LICENSE' | 'VOTER' | 'LAND_RECORD' | 'JOBS' | 'BUS_TRAIN' | 'LIVE_STREAM' | 'OTHER';
  description: string;
  url: string;
  is_active: boolean;
}

export interface Alert {
  id: number;
  village_id: number;
  type: 'WEATHER' | 'SYSTEM' | 'EMERGENCY';
  title: string;
  message: string;
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  start_time: string;
  end_time?: string;
  created_at: string;
}

export interface Tender {
  id: number;
  village_id?: number;
  title: string;
  description: string;
  work_type: 'ROAD' | 'WATER' | 'BUILDING' | 'GENERAL' | 'OTHER';
  estimated_cost: number;
  status: 'OPEN' | 'CLOSED' | 'AWARDED' | 'CANCELLED';
  publish_date: string;
  last_date: string;
  document?: string;
  external_submission_url?: string;
}

export interface Asset {
  id: number;
  village_id: number;
  name: string;
  asset_type: 'HALL' | 'BOREWELL' | 'PIPELINE' | 'LIGHT' | 'POND' | 'VEHICLE' | 'OTHER';
  location_description: string;
  lat?: number;
  lng?: number;
  installation_date?: string;
  condition_status: 'GOOD' | 'NEEDS_REPAIR' | 'CRITICAL';
  linked_work_id?: number;
}

export interface AccountHead {
  id: number;
  village_id: number;
  name: string;
  code: string;
  type: 'INCOME' | 'EXPENDITURE';
}

export interface AccountTransaction {
  id: number;
  village_id: number;
  head_id: number;
  head_name?: string;
  scheme_id?: number;
  scheme_name?: string;
  development_work_id?: number;
  amount: number;
  transaction_type: 'RECEIPT' | 'PAYMENT';
  transaction_date: string;
  description: string;
}

export interface BudgetAllocation {
  id: number;
  village_id: number;
  head_id: number;
  head_name?: string;
  financial_year: string;
  budget_amount: number;
  spent_amount?: number;
}

// API Response types
export interface PaginatedResponse<T> {
  count: number;
  next?: string;
  previous?: string;
  results: T[];
}

export interface ApiError {
  detail?: string;
  message?: string;
  errors?: Record<string, string[]>;
}

// Language type
export type Language = 'en' | 'gu' | 'hi';

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
}
