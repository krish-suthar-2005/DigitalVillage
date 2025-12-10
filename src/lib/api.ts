import type {
  Village,
  Taluka,
  TalukaOfficer,
  Scheme,
  Member,
  GramSabhaMeeting,
  DevelopmentWork,
  Complaint,
  Event,
  Attraction,
  Amenity,
  Announcement,
  ServiceLink,
  Alert,
  Tender,
  Asset,
  AccountTransaction,
  BudgetAllocation,
  PaginatedResponse,
  ApiError,
  Language,
} from './types';

// Base API configuration - update this when connecting to Django DRF
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

// API Client wrapper with typed responses
class ApiClient {
  private baseUrl: string;
  private language: Language = 'en';

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  setLanguage(lang: Language) {
    this.language = lang;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Accept-Language': this.language,
      ...options.headers,
    };

    // Add auth token if available
    const token = localStorage.getItem('auth_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error: ApiError = await response.json().catch(() => ({
        detail: 'An error occurred',
      }));
      throw new Error(error.detail || error.message || 'Request failed');
    }

    return response.json();
  }

  // Village endpoints
  async getVillages(): Promise<Village[]> {
    return this.request<Village[]>('/villages/');
  }

  async getVillageBySlug(slug: string): Promise<Village> {
    return this.request<Village>(`/villages/by-slug/${slug}/`);
  }

  async getNearestVillage(lat: number, lng: number): Promise<Village> {
    return this.request<Village>(`/villages/nearest/?lat=${lat}&lng=${lng}`);
  }

  // Taluka endpoints
  async getTaluka(id: number): Promise<Taluka> {
    return this.request<Taluka>(`/taluka/${id}/`);
  }

  async getTalukaOfficers(talukaId: number): Promise<TalukaOfficer[]> {
    return this.request<TalukaOfficer[]>(`/taluka/${talukaId}/officers/`);
  }

  // Schemes
  async getSchemes(villageId?: number, category?: string): Promise<Scheme[]> {
    const params = new URLSearchParams();
    if (villageId) params.append('village_id', villageId.toString());
    if (category) params.append('category', category);
    params.append('active', 'true');
    return this.request<Scheme[]>(`/schemes/?${params}`);
  }

  async getScheme(id: number): Promise<Scheme> {
    return this.request<Scheme>(`/schemes/${id}/`);
  }

  // Members
  async getMembers(villageId: number): Promise<Member[]> {
    return this.request<Member[]>(`/villages/${villageId}/members/`);
  }

  // Gram Sabha
  async getGramSabhaMeetings(villageId: number): Promise<GramSabhaMeeting[]> {
    return this.request<GramSabhaMeeting[]>(`/gram-sabha/?village_id=${villageId}`);
  }

  async getGramSabhaMeeting(id: number): Promise<GramSabhaMeeting> {
    return this.request<GramSabhaMeeting>(`/gram-sabha/${id}/`);
  }

  // Development Work
  async getDevelopmentWorks(villageId: number, status?: string): Promise<DevelopmentWork[]> {
    const params = new URLSearchParams({ village_id: villageId.toString() });
    if (status) params.append('status', status);
    return this.request<DevelopmentWork[]>(`/development-work/?${params}`);
  }

  async getDevelopmentWork(id: number): Promise<DevelopmentWork> {
    return this.request<DevelopmentWork>(`/development-work/${id}/`);
  }

  // Complaints
  async getComplaints(villageId: number, status?: string): Promise<Complaint[]> {
    const params = new URLSearchParams({ village_id: villageId.toString() });
    if (status) params.append('status', status);
    return this.request<Complaint[]>(`/complaints/?${params}`);
  }

  async getComplaint(id: number): Promise<Complaint> {
    return this.request<Complaint>(`/complaints/${id}/`);
  }

  async getComplaintByReference(referenceId: string): Promise<Complaint> {
    return this.request<Complaint>(`/complaints/by-reference/${referenceId}/`);
  }

  async createComplaint(data: Partial<Complaint>): Promise<Complaint> {
    return this.request<Complaint>('/complaints/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Events
  async getEvents(villageId: number): Promise<Event[]> {
    return this.request<Event[]>(`/events/?village_id=${villageId}`);
  }

  async getEvent(id: number): Promise<Event> {
    return this.request<Event>(`/events/${id}/`);
  }

  // Attractions
  async getAttractions(villageId: number, type?: string): Promise<Attraction[]> {
    const params = new URLSearchParams({ village_id: villageId.toString() });
    if (type) params.append('type', type);
    return this.request<Attraction[]>(`/attractions/?${params}`);
  }

  // Amenities
  async getAmenities(villageId: number, type?: string): Promise<Amenity[]> {
    const params = new URLSearchParams({ village_id: villageId.toString() });
    if (type) params.append('type', type);
    return this.request<Amenity[]>(`/amenities/?${params}`);
  }

  // Announcements
  async getAnnouncements(villageId: number): Promise<Announcement[]> {
    return this.request<Announcement[]>(`/announcements/?village_id=${villageId}&active=true`);
  }

  // Service Links
  async getServiceLinks(villageId?: number, category?: string): Promise<ServiceLink[]> {
    const params = new URLSearchParams();
    if (villageId) params.append('village_id', villageId.toString());
    if (category) params.append('category', category);
    return this.request<ServiceLink[]>(`/service-links/?${params}`);
  }

  // Alerts
  async getAlerts(villageId: number): Promise<Alert[]> {
    return this.request<Alert[]>(`/alerts/?village_id=${villageId}`);
  }

  // Tenders
  async getTenders(villageId?: number, status?: string): Promise<Tender[]> {
    const params = new URLSearchParams();
    if (villageId) params.append('village_id', villageId.toString());
    if (status) params.append('status', status);
    return this.request<Tender[]>(`/tenders/?${params}`);
  }

  // Assets
  async getAssets(villageId: number): Promise<Asset[]> {
    return this.request<Asset[]>(`/assets/?village_id=${villageId}`);
  }

  // Finance
  async getTransactions(villageId: number): Promise<AccountTransaction[]> {
    return this.request<AccountTransaction[]>(`/accounting/transactions/?village_id=${villageId}`);
  }

  async getBudgetAllocations(villageId: number, financialYear?: string): Promise<BudgetAllocation[]> {
    const params = new URLSearchParams({ village_id: villageId.toString() });
    if (financialYear) params.append('financial_year', financialYear);
    return this.request<BudgetAllocation[]>(`/accounting/budget/?${params}`);
  }
}

export const api = new ApiClient(API_BASE_URL);
export default api;
