export type DivisionType = 'sales' | 'marketing' | 'ufuk_cendekia' | 'management' | 'cross-division';

export type TaskStatus = 'todo' | 'doing' | 'done';

export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  division: DivisionType;
  avatar: string;
  phone?: string;
  status: 'active' | 'busy' | 'away';
  tasksCount: number;
}

export interface TaskItem {
  id: string;
  title: string;
  description: string;
  division: DivisionType;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeId: string;
  assigneeName: string;
  dueDate: string; // YYYY-MM-DD
  estimatedHours: number;
  tags: string[];
  checklist: { id: string; text: string; completed: boolean }[];
  createdAt: string;
  progressPercent: number;
  googleDriveUrl?: string; // Tautan ke Google Drive untuk setiap project baru
}

export interface PersonnelWorkload {
  id: string;
  name: string;
  role: string;
  division: DivisionType;
  avatar: string;
  email: string;
  activeTasks: number;
  completedTasks: number;
  capacityHoursWeek: number;
  allocatedHoursWeek: number;
  utilizationPercent: number;
  currentFocus: string;
  status: 'available' | 'optimal' | 'overloaded';
}

export interface CrossDivisionCollab {
  id: string;
  title: string;
  leadDivision: DivisionType;
  involvedDivisions: DivisionType[];
  description: string;
  targetMilestone: string;
  progress: number;
  status: 'on_track' | 'needs_review' | 'completed';
  startDate: string;
  endDate: string;
  budgetAllocated: number;
  googleDriveUrl?: string;
}

export interface WorkProjection {
  id: string;
  period: string;
  quarter: string;
  title: string;
  division: DivisionType | 'all';
  strategicGoal: string;
  projectedRevenue?: number;
  projectedOutput: string;
  confidence: 'High' | 'Medium' | 'Strategic';
  status: 'Planned' | 'In Discussion' | 'Ready';
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  time?: string;
  division: DivisionType | 'all';
  type: 'deadline' | 'meeting' | 'campaign_launch' | 'publication_release' | 'sales_pitch' | 'cendekia_symposium';
  location?: string;
  description?: string;
  syncKolibrinest: boolean;
  googleCalendarUrl?: string;
}

// Sales Sub-Page Types
export interface SalesPlan {
  id: string;
  title: string;
  clientOrSector: string;
  potentialValue: number;
  targetClosingDate: string;
  stage: 'Prospecting' | 'Pitching' | 'Negotiation' | 'Closed Won' | 'Closed Lost';
  pic: string;
  notes: string;
  googleDriveUrl?: string;
}

export interface SalesMetric {
  month: string;
  revenueTarget: number;
  revenueAchieved: number;
  dealsTarget: number;
  dealsClosed: number;
  leadsGenerated: number;
  conversionRate: number;
}

// Marketing Sub-Page Types
export interface MarketingCampaign {
  id: string;
  campaignName: string;
  objective: string;
  platforms: string[];
  startDate: string;
  endDate: string;
  allocatedBudget: number;
  spentBudget: number;
  reach: number;
  clicks: number;
  leads: number;
  status: 'Draft' | 'Active' | 'Optimizing' | 'Completed';
  pic: string;
  googleDriveUrl?: string;
}

export interface WeeklyContentItem {
  id: string;
  day: 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat' | 'Sabtu' | 'Minggu';
  date: string;
  platform: 'Instagram' | 'TikTok' | 'YouTube' | 'LinkedIn' | 'Website' | 'UfukMedia';
  contentType: 'Video Reels' | 'Carousel Edukasi' | 'Artikel Blog' | 'Short Story' | 'Infografis' | 'Opini Cendekia';
  topic: string;
  pic: string;
  status: 'Ide' | 'Produksi' | 'Siap Tayang' | 'Sudah Tayang';
  linkOrAsset?: string;
  googleDriveUrl?: string;
}

export interface MarketingMetric {
  totalAudienceReach: number;
  avgEngagementRate: number;
  ctrPercent: number;
  monthlyFollowersGrowth: number;
  cplAverageIdr: number;
}

// UFUK.Cendekia Specific Types
export interface UfukMediaArticle {
  id: string;
  title: string;
  rubrik: 'Opini Cendekia' | 'Sains & Teknologi' | 'Filsafat & Budaya' | 'Riset Kebijakan' | 'Wawasan Global';
  author: string;
  publishDate: string;
  views: number;
  shares: number;
  url: string;
  status: 'Tayang' | 'Terjadwal' | 'Diarsipkan';
  excerpt: string;
}

export interface ArticleComment {
  id: string;
  userName: string;
  userAvatar: string;
  userEmail: string;
  text: string;
  timestamp: string;
}

export interface UfukArticleReview {
  id: string;
  title: string;
  author: string;
  authorInstitution: string;
  category: 'Jurnal Cendekia' | 'Esai Budaya' | 'Analisis Sosio-Teknologi' | 'Tinjauan Pustaka' | 'Riset Kebijakan';
  contentSnippet: string;
  fullContent: string;
  status: 'Draft' | 'In Review' | 'Revision Requested' | 'Editing' | 'Approved & Ready';
  googleDocsUrl: string;
  googleDriveUrl: string;
  comments: ArticleComment[];
  lastUpdated: string;
  reviewerPic: string;
}

export interface UfukLibraryItem {
  id: string;
  title: string;
  author: string;
  isbn: string;
  publisher: string;
  year: number;
  category: 'Buku Teori & Filsafat' | 'Monograf Riset' | 'E-Book Kebijakan' | 'Prosiding Konferensi' | 'Arsip Naskah Klasik';
  status: 'Tersedia' | 'Dipinjam' | 'Dalam Digitalisasi';
  locationOrDriveLink: string;
  googleDriveUrl: string;
  coverUrl?: string;
  borrowersCount: number;
  summary: string;
  lastUpdated: string;
}

export interface UfukActivityKanban {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'doing' | 'done';
  priority: TaskPriority;
  pic: string;
  dueDate: string;
  googleDriveUrl?: string;
  checklistCount: { done: number; total: number };
}

// Financial / Expense Item (Synced between Division and Central Budget)
export interface DivisionFinancialPlan {
  id: string;
  division: DivisionType;
  title: string;
  category: 'kegiatan' | 'iklan_ads' | 'peralatan_lisensi' | 'operasional' | 'penerbitan_buku';
  budgetedAmount: number;
  spentAmount: number;
  period: string;
  description: string;
  date: string;
  receiptNumber?: string;
  googleDriveReceiptUrl?: string;
}

// Order Request (from Guest or Cross-Division)
export interface OrderRequest {
  id: string;
  trackingCode: string;
  requesterType: 'guest' | 'internal_division';
  requesterName: string;
  requesterEmail: string;
  requesterPhone?: string;
  requesterOrg?: string;
  targetDivision: DivisionType;
  title: string;
  description: string;
  requestedDeadline: string;
  estimatedBudget?: number;
  status: 'submitted' | 'reviewing' | 'approved' | 'in_progress' | 'completed' | 'rejected';
  assignedPic?: string;
  submittedAt: string;
  internalNotes?: string;
  googleDriveUrl?: string;
}

// Annual Budget
export interface AnnualBudgetState {
  year: number;
  totalAnnualBudget: number; // Rp 1.500.000.000
  divisionAllocations: {
    sales: number;
    marketing: number;
    ufuk_cendekia: number;
    management: number;
  };
}

export interface AppSettings {
  themeMode: 'light' | 'dark' | 'system';
  accentColor: 'red' | 'emerald' | 'indigo' | 'cyan' | 'amber' | 'rose';
  fontFamily: 'plus_jakarta' | 'outfit' | 'system';
  fontSize: 'small' | 'normal' | 'large';
  notificationsEnabled: boolean;
  autoSyncCalendar: boolean;
}
