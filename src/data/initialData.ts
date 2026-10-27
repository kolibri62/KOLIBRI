import {
  User,
  TaskItem,
  PersonnelWorkload,
  CrossDivisionCollab,
  WorkProjection,
  CalendarEvent,
  SalesPlan,
  SalesMetric,
  MarketingCampaign,
  WeeklyContentItem,
  MarketingMetric,
  DivisionFinancialPlan,
  OrderRequest,
  AnnualBudgetState,
  AppSettings,
  UfukMediaArticle,
  UfukArticleReview,
  UfukLibraryItem,
  UfukActivityKanban
} from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: 'user-mgmt',
    name: 'Ahmad Pratama',
    email: 'management@kolibrinest.id',
    role: 'Operations & Project Director',
    division: 'management',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    phone: '+62 812-9876-5432',
    status: 'active',
    tasksCount: 4
  },
  {
    id: 'user-sales',
    name: 'Rina Kusuma',
    email: 'sales@kolibrinest.id',
    role: 'Lead Sales & Partnership',
    division: 'sales',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    phone: '+62 813-2211-9988',
    status: 'active',
    tasksCount: 5
  },
  {
    id: 'user-mkt',
    name: 'Dimas Aditya',
    email: 'marketing@kolibrinest.id',
    role: 'Head of Growth Marketing',
    division: 'marketing',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    phone: '+62 815-3344-5566',
    status: 'busy',
    tasksCount: 6
  },
  {
    id: 'user-ufuk',
    name: 'Siti Zahra',
    email: 'ufuk.cendekia@kolibrinest.id',
    role: 'Editorial Director & Head of UFUK.Cendekia',
    division: 'ufuk_cendekia',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    phone: '+62 819-7788-2233',
    status: 'active',
    tasksCount: 6
  }
];

export const INITIAL_PERSONNEL: PersonnelWorkload[] = [
  {
    id: 'user-mgmt',
    name: 'Ahmad Pratama',
    role: 'Operations & Project Director',
    division: 'management',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    email: 'management@kolibrinest.id',
    activeTasks: 4,
    completedTasks: 18,
    capacityHoursWeek: 40,
    allocatedHoursWeek: 32,
    utilizationPercent: 80,
    currentFocus: 'Sinkronisasi Google Workspace & Audit Pagu Anggaran Tahunan',
    status: 'optimal'
  },
  {
    id: 'user-sales',
    name: 'Rina Kusuma',
    role: 'Lead Sales & Partnership',
    division: 'sales',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    email: 'sales@kolibrinest.id',
    activeTasks: 5,
    completedTasks: 24,
    capacityHoursWeek: 40,
    allocatedHoursWeek: 36,
    utilizationPercent: 90,
    currentFocus: 'Penutupan Deal B2B Enterprise Q4 & Pitching Konsorsium',
    status: 'optimal'
  },
  {
    id: 'user-sales-2',
    name: 'Bagus Wicaksono',
    role: 'Key Account Executive',
    division: 'sales',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    email: 'bagus.sales@kolibrinest.id',
    activeTasks: 4,
    completedTasks: 14,
    capacityHoursWeek: 40,
    allocatedHoursWeek: 28,
    utilizationPercent: 70,
    currentFocus: 'Follow-up proposal tender & demo platform ke 6 klien',
    status: 'available'
  },
  {
    id: 'user-mkt',
    name: 'Dimas Aditya',
    role: 'Head of Growth Marketing',
    division: 'marketing',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    email: 'marketing@kolibrinest.id',
    activeTasks: 6,
    completedTasks: 31,
    capacityHoursWeek: 40,
    allocatedHoursWeek: 38,
    utilizationPercent: 95,
    currentFocus: 'Optimasi Meta Ads Campaign & Webinar Lead Magnet',
    status: 'overloaded'
  },
  {
    id: 'user-mkt-2',
    name: 'Nadya Putri',
    role: 'Social Media & Community Specialist',
    division: 'marketing',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    email: 'nadya.mkt@kolibrinest.id',
    activeTasks: 5,
    completedTasks: 22,
    capacityHoursWeek: 40,
    allocatedHoursWeek: 30,
    utilizationPercent: 75,
    currentFocus: 'Distribusi konten mingguan TikTok & sinergi Ufukmedia.co',
    status: 'optimal'
  },
  {
    id: 'user-ufuk',
    name: 'Siti Zahra',
    role: 'Editorial Director & Head of UFUK.Cendekia',
    division: 'ufuk_cendekia',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    email: 'ufuk.cendekia@kolibrinest.id',
    activeTasks: 6,
    completedTasks: 28,
    capacityHoursWeek: 40,
    allocatedHoursWeek: 37,
    utilizationPercent: 92,
    currentFocus: 'Kurasi Artikel Jurnal Cendekia, Sinkronisasi Ufukmedia.co & Digitalisasi Perpustakaan',
    status: 'optimal'
  },
  {
    id: 'user-ufuk-2',
    name: 'Fajar Nugraha',
    role: 'Research Fellow & Library Archivist',
    division: 'ufuk_cendekia',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
    email: 'fajar.ufuk@kolibrinest.id',
    activeTasks: 4,
    completedTasks: 19,
    capacityHoursWeek: 40,
    allocatedHoursWeek: 34,
    utilizationPercent: 85,
    currentFocus: 'Pengindeksan Katalog Buku Perpustakaan & Review Naskah Sains Budaya',
    status: 'optimal'
  }
];

export const INITIAL_TASKS: TaskItem[] = [
  // To Do
  {
    id: 'tsk-001',
    title: 'Penyusunan Proposal Pitching B2B Bank Mandiri & BRI',
    description: 'Menyiapkan deck penawaran enterprise solution, kalkulasi ROI, dan terms of service tahun 2027.',
    division: 'sales',
    status: 'todo',
    priority: 'urgent',
    assigneeId: 'user-sales',
    assigneeName: 'Rina Kusuma',
    dueDate: '2026-11-04',
    estimatedHours: 8,
    tags: ['Pitching', 'Enterprise', 'Revenue'],
    checklist: [
      { id: 'c1', text: 'Struktur deck presentasi disetujui', completed: true },
      { id: 'c2', text: 'Kalkulasi simulasi biaya & ROI', completed: false },
      { id: 'c3', text: 'Legal review klausul SLA', completed: false }
    ],
    createdAt: '2026-10-24',
    progressPercent: 35,
    googleDriveUrl: 'https://drive.google.com/drive/folders/KNB-SALES-MANDIRI-2026'
  },
  {
    id: 'tsk-002',
    title: 'Setup Google Search & Display Ads Q4 Retargeting',
    description: 'Memasang konversi tracking pixel, riset keyword high-intent, dan pengujian A/B testing ad copy.',
    division: 'marketing',
    status: 'todo',
    priority: 'high',
    assigneeId: 'user-mkt',
    assigneeName: 'Dimas Aditya',
    dueDate: '2026-11-02',
    estimatedHours: 6,
    tags: ['Ads', 'PPC', 'Traffic'],
    checklist: [
      { id: 'c1', text: 'Keyword research & negative match list', completed: true },
      { id: 'c2', text: 'Copywriting 4 variasi headline', completed: false },
      { id: 'c3', text: 'Budget pacing setup di Google Ads dashboard', completed: false }
    ],
    createdAt: '2026-10-25',
    progressPercent: 30,
    googleDriveUrl: 'https://drive.google.com/drive/folders/KNB-MKT-ADS-Q4-ASSETS'
  },
  {
    id: 'tsk-003',
    title: 'Kurasi & Review Artikel Jurnal Cendekia Edisi November 2026',
    description: 'Penelaahan 6 naskah riset akademisi, proofreading abstrak, dan sinkronisasi ke kanal Ufukmedia.co.',
    division: 'ufuk_cendekia',
    status: 'todo',
    priority: 'high',
    assigneeId: 'user-ufuk',
    assigneeName: 'Siti Zahra',
    dueDate: '2026-11-06',
    estimatedHours: 10,
    tags: ['Jurnal', 'UfukMedia', 'PeerReview'],
    checklist: [
      { id: 'c1', text: 'Konfirmasi catatan reviewer eksternal', completed: true },
      { id: 'c2', text: 'Layout PDF monograf ilmiah', completed: false },
      { id: 'c3', text: 'Sinkronisasi metadata Ufukmedia.co', completed: false }
    ],
    createdAt: '2026-10-25',
    progressPercent: 40,
    googleDriveUrl: 'https://drive.google.com/drive/folders/UFUK-CENDEKIA-JURNAL-NOV'
  },

  // Doing / In Progress
  {
    id: 'tsk-004',
    title: 'Digitalisasi Katalog 50 Buku Klasik Perpustakaan UFUK',
    description: 'Scanning OCR manuskrip langka, entri metadata ISBN & klasifikasi desimal Dewey ke cloud repository.',
    division: 'ufuk_cendekia',
    status: 'doing',
    priority: 'medium',
    assigneeId: 'user-ufuk-2',
    assigneeName: 'Fajar Nugraha',
    dueDate: '2026-11-08',
    estimatedHours: 14,
    tags: ['Perpustakaan', 'Arsip', 'EBook'],
    checklist: [
      { id: 'c1', text: 'Batch 1-25 selesai scanning 600 DPI', completed: true },
      { id: 'c2', text: 'Upload file PDF searchable ke Google Drive', completed: true },
      { id: 'c3', text: 'Update label rak fisik dan status pinjaman', completed: false }
    ],
    createdAt: '2026-10-22',
    progressPercent: 70,
    googleDriveUrl: 'https://drive.google.com/drive/folders/UFUK-LIBRARY-DIGITAL-ARCHIVE'
  },
  {
    id: 'tsk-005',
    title: 'Finalisasi Kampanye Lead Magnet Ebook Solusi Manajemen',
    description: 'Sinkronisasi landing page, email automation sequence, dan integrasi Meta Ads Lead Forms.',
    division: 'marketing',
    status: 'doing',
    priority: 'urgent',
    assigneeId: 'user-mkt',
    assigneeName: 'Dimas Aditya',
    dueDate: '2026-10-30',
    estimatedHours: 12,
    tags: ['Campaign', 'LeadGen', 'Email'],
    checklist: [
      { id: 'c1', text: 'Final PDF Ebook di-export oleh UFUK.Cendekia', completed: true },
      { id: 'c2', text: 'Landing page test responsif di mobile & desktop', completed: true },
      { id: 'c3', text: 'Webhook notifikasi ke tim Sales aktif', completed: false }
    ],
    createdAt: '2026-10-20',
    progressPercent: 80,
    googleDriveUrl: 'https://drive.google.com/drive/folders/KNB-MKT-EBOOK-LEADGEN'
  },
  {
    id: 'tsk-006',
    title: 'Closing Negosiasi Kontrak Tahunan Mitra Logistik',
    description: 'Penyelarasan jadwal onboarding dan penandatanganan perjanjian kerjasama senilai Rp 85 Juta.',
    division: 'sales',
    status: 'doing',
    priority: 'high',
    assigneeId: 'user-sales',
    assigneeName: 'Rina Kusuma',
    dueDate: '2026-10-29',
    estimatedHours: 6,
    tags: ['Closing', 'Contract', 'Enterprise'],
    checklist: [
      { id: 'c1', text: 'Draf kontrak disetujui tim legal mitra', completed: true },
      { id: 'c2', text: 'Penerbitan surat penawaran harga final (SPH)', completed: true },
      { id: 'c3', text: 'Jadwal tanda tangan virtual via PrivyID', completed: false }
    ],
    createdAt: '2026-10-21',
    progressPercent: 75,
    googleDriveUrl: 'https://drive.google.com/drive/folders/KNB-SALES-LOGISTIK-PRIMA'
  },
  {
    id: 'tsk-007',
    title: 'Audit & Penyesuaian Realisasi Budget Semester II',
    description: 'Rekonsiliasi pengeluaran divisi Sales, Marketing, dan UFUK.Cendekia terhadap plafon anggaran Rp 1.5M.',
    division: 'management',
    status: 'doing',
    priority: 'medium',
    assigneeId: 'user-mgmt',
    assigneeName: 'Ahmad Pratama',
    dueDate: '2026-11-01',
    estimatedHours: 8,
    tags: ['Budget', 'Audit', 'Finance'],
    checklist: [
      { id: 'c1', text: 'Kompilasi kuitansi iklan & kegiatan', completed: true },
      { id: 'c2', text: 'Pencocokan mutasi kas operasional', completed: true },
      { id: 'c3', text: 'Penyusunan proyeksi sisa kuartal 4', completed: false }
    ],
    createdAt: '2026-10-18',
    progressPercent: 70,
    googleDriveUrl: 'https://drive.google.com/drive/folders/KNB-FINANCE-BUDGET-AUDIT-2026'
  },

  // Done
  {
    id: 'tsk-008',
    title: 'Peluncuran Jurnal Digital Terpadu Ufukmedia.co & Kolibrinest',
    description: 'Integrasi sistem publikasi artikel ilmiah populer dengan portal berita Ufukmedia.co.',
    division: 'ufuk_cendekia',
    status: 'done',
    priority: 'high',
    assigneeId: 'user-ufuk',
    assigneeName: 'Siti Zahra',
    dueDate: '2026-10-24',
    estimatedHours: 16,
    tags: ['Launch', 'UfukMedia', 'Web'],
    checklist: [
      { id: 'c1', text: 'Integrasi RSS & REST API Ufukmedia.co', completed: true },
      { id: 'c2', text: 'Tes penayangan 15 artikel pembuka', completed: true },
      { id: 'c3', text: 'Persetujuan dewan redaksi', completed: true }
    ],
    createdAt: '2026-10-10',
    progressPercent: 100,
    googleDriveUrl: 'https://drive.google.com/drive/folders/UFUK-JOURNAL-LAUNCH-ASSETS'
  },
  {
    id: 'tsk-009',
    title: 'Webinar Kolaborasi: Modern Workflow & Knowledge Management',
    description: 'Penyelenggaraan simposium daring dengan 420 peserta dan peluncuran seri buku cendekia.',
    division: 'cross-division',
    status: 'done',
    priority: 'high',
    assigneeId: 'user-mkt',
    assigneeName: 'Dimas Aditya',
    dueDate: '2026-10-22',
    estimatedHours: 20,
    tags: ['Webinar', 'Collab', 'Leads'],
    checklist: [
      { id: 'c1', text: 'Promosi multi-channel Meta & Email', completed: true },
      { id: 'c2', text: 'Live streaming Zoom & YouTube Studio', completed: true },
      { id: 'c3', text: 'Handover daftar kontak ke divisi Sales', completed: true }
    ],
    createdAt: '2026-10-08',
    progressPercent: 100,
    googleDriveUrl: 'https://drive.google.com/drive/folders/KNB-CROSS-WEBINAR-KNOWLEDGE'
  }
];

export const INITIAL_COLLABORATIONS: CrossDivisionCollab[] = [
  {
    id: 'collab-1',
    title: 'Simposium Riset & Grand Campaign Q4: Kolibri Accelerate x Ufukmedia',
    leadDivision: 'marketing',
    involvedDivisions: ['marketing', 'sales', 'ufuk_cendekia'],
    description: 'Sinergi terpadu: Marketing memimpin kampanye ads, UFUK.Cendekia menyusun 6 artikel riset dan monograf, Sales mengonversi inbound mitra.',
    targetMilestone: '1.500 Inbound B2B Leads & 500 Peserta Simposium Riset',
    progress: 74,
    status: 'on_track',
    startDate: '2026-10-01',
    endDate: '2026-12-15',
    budgetAllocated: 120000000,
    googleDriveUrl: 'https://drive.google.com/drive/folders/KNB-COLLAB-SIMPOSIUM-Q4'
  },
  {
    id: 'collab-2',
    title: 'Penerbitan Buku Studi Kasus Transformasi Industri 2026',
    leadDivision: 'ufuk_cendekia',
    involvedDivisions: ['ufuk_cendekia', 'sales'],
    description: 'UFUK.Cendekia membedah metodologi implementasi klien sukses, Sales menggunakannya sebagai sales kit resmi dan materi negosiasi.',
    targetMilestone: 'Cetak 1.000 Eksemplar & 5 Kontrak Kemitraan Baru',
    progress: 65,
    status: 'on_track',
    startDate: '2026-09-15',
    endDate: '2026-11-20',
    budgetAllocated: 45000000,
    googleDriveUrl: 'https://drive.google.com/drive/folders/UFUK-BOOK-CASE-STUDIES-2026'
  }
];

export const INITIAL_PROJECTIONS: WorkProjection[] = [
  {
    id: 'proj-1',
    period: 'November 2026',
    quarter: 'Q4 2026',
    title: 'Ekspansi Kemitraan Perpustakaan & Jurnal Cendekia dengan Universitas',
    division: 'ufuk_cendekia',
    strategicGoal: 'Memperluas jejaring repositori digital UFUK.Cendekia ke 10 kampus ternama di Indonesia.',
    projectedRevenue: 120000000,
    projectedOutput: '10 Kampus terhubung, 500 naskah riset masuk ke katalog bersama.',
    confidence: 'High',
    status: 'Ready'
  },
  {
    id: 'proj-2',
    period: 'Desember 2026',
    quarter: 'Q4 2026',
    title: 'Peluncuran Kanal Eksklusif Ufukmedia.co x Kolibrinest Insights',
    division: 'ufuk_cendekia',
    strategicGoal: 'Menjadikan Ufukmedia.co sebagai media rujukan literasi pemikiran dan transformasi industri.',
    projectedRevenue: 85000000,
    projectedOutput: '25 Artikel analitis eksklusif & 100.000 pembaca bulanan aktif.',
    confidence: 'High',
    status: 'Ready'
  },
  {
    id: 'proj-3',
    period: 'Januari 2027',
    quarter: 'Q1 2027',
    title: 'Peluncuran Ekosistem Pengetahuan & B2B Knowledge Cloud',
    division: 'all',
    strategicGoal: 'Monetisasi layanan langganan basis data riset dan otomasi alur kerja agensi.',
    projectedRevenue: 650000000,
    projectedOutput: 'Paket SaaS onboarding 50 institusi perdana.',
    confidence: 'Strategic',
    status: 'In Discussion'
  }
];

export const INITIAL_CALENDAR_EVENTS: CalendarEvent[] = [
  {
    id: 'evt-1',
    title: 'Kickoff Rapat Pleno Koordinasi Lintas Divisi',
    date: '2026-10-27',
    time: '09:30 - 11:00 WIB',
    division: 'all',
    type: 'meeting',
    location: 'Ruang Rapat Utama & Google Meet',
    description: 'Evaluasi mingguan pencapaian target dan sinkronisasi beban kerja tim.',
    syncKolibrinest: true,
    googleCalendarUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Kickoff+Rapat+Pleno+Kolibrinest'
  },
  {
    id: 'evt-2',
    title: 'Batas Akhir Review Naskah Jurnal UFUK.Cendekia Nov 2026',
    date: '2026-10-29',
    time: '17:00 WIB',
    division: 'ufuk_cendekia',
    type: 'deadline',
    location: 'Google Docs Review & Portal Ufuk',
    description: 'Batas akhir editor mengesahkan naskah siap tayang di Ufukmedia.co.',
    syncKolibrinest: true,
    googleCalendarUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Deadline+Review+Naskah+UFUK'
  },
  {
    id: 'evt-3',
    title: 'Jadwal Rilis Kampanye Meta Ads Weekend Booster',
    date: '2026-10-30',
    time: '18:00 WIB',
    division: 'marketing',
    type: 'campaign_launch',
    location: 'Meta Ads Manager',
    description: 'Peluncuran materi iklan video reels target profesional Jabodetabek.',
    syncKolibrinest: true,
    googleCalendarUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Meta+Ads+Weekend+Booster'
  },
  {
    id: 'evt-4',
    title: 'Bedah Buku & Diskusi Literasi Perpustakaan Cendekia',
    date: '2026-10-31',
    time: '14:00 - 16:30 WIB',
    division: 'ufuk_cendekia',
    type: 'cendekia_symposium',
    location: 'Ruang Perpustakaan UFUK & Live YouTube Ufukmedia',
    description: 'Bedah buku filsafat teknologi dan pengenalan koleksi naskah digital.',
    syncKolibrinest: true,
    googleCalendarUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Bedah+Buku+UFUK+Cendekia'
  },
  {
    id: 'evt-5',
    title: 'Executive Pitching ke Klien Korporat Sinar Mas Group',
    date: '2026-11-03',
    time: '13:30 - 15:30 WIB',
    division: 'sales',
    type: 'sales_pitch',
    location: 'Plaza BII Thamrin Jakarta Pusat',
    description: 'Presentasi langsung solusi manajemen proyek dan penerbitan publikasi korporat.',
    syncKolibrinest: true,
    googleCalendarUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Executive+Pitching+Sinar+Mas'
  }
];

export const INITIAL_SALES_PLANS: SalesPlan[] = [
  {
    id: 'sp-1',
    title: 'Pengembangan Layanan Enterprise Digital Transformation',
    clientOrSector: 'PT Bank Central Asia Tbk',
    potentialValue: 180000000,
    targetClosingDate: '2026-11-15',
    stage: 'Negotiation',
    pic: 'Rina Kusuma',
    notes: 'Klien meminta penyesuaian modul training dan garansi SLA 99.9%.',
    googleDriveUrl: 'https://drive.google.com/drive/folders/BCA-ENTERPRISE-PROPOSAL'
  },
  {
    id: 'sp-2',
    title: 'Paket Annual Retainer Creative & Social Management',
    clientOrSector: 'Nutrifood Indonesia Brands',
    potentialValue: 120000000,
    targetClosingDate: '2026-11-20',
    stage: 'Pitching',
    pic: 'Bagus Wicaksono',
    notes: 'Sudah presentasi tahap 1, menunggu jadwal evaluasi komite procurement.',
    googleDriveUrl: 'https://drive.google.com/drive/folders/NUTRIFOOD-RETAINER-2026'
  }
];

export const INITIAL_SALES_METRICS: SalesMetric[] = [
  {
    month: 'Oktober 2026',
    revenueTarget: 450000000,
    revenueAchieved: 385000000,
    dealsTarget: 10,
    dealsClosed: 8,
    leadsGenerated: 142,
    conversionRate: 24.5
  }
];

export const INITIAL_MARKETING_CAMPAIGNS: MarketingCampaign[] = [
  {
    id: 'cmp-1',
    campaignName: 'Kolibri Accelerate Q4: Solusi Kerja Efisien',
    objective: 'Lead Generation & Brand Awareness B2B',
    platforms: ['Meta Ads', 'LinkedIn Ads', 'Google Search'],
    startDate: '2026-10-01',
    endDate: '2026-11-30',
    allocatedBudget: 35000000,
    spentBudget: 24500000,
    reach: 485000,
    clicks: 14200,
    leads: 285,
    status: 'Active',
    pic: 'Dimas Aditya',
    googleDriveUrl: 'https://drive.google.com/drive/folders/MKT-CAMPAIGN-ACCELERATE'
  }
];

export const INITIAL_WEEKLY_CONTENT: WeeklyContentItem[] = [
  {
    id: 'cnt-1',
    day: 'Senin',
    date: '2026-10-26',
    platform: 'UfukMedia',
    contentType: 'Opini Cendekia',
    topic: 'Paradoks Otomasi: Bagaimana Kecerdasan Buatan Mengubah Disiplin Riset Kemanusiaan',
    pic: 'Siti Zahra',
    status: 'Sudah Tayang',
    linkOrAsset: 'ufukmedia.co/opini/paradoks-otomasi-riset',
    googleDriveUrl: 'https://drive.google.com/drive/folders/UFUK-CONTENT-MON-01'
  },
  {
    id: 'cnt-2',
    day: 'Selasa',
    date: '2026-10-27',
    platform: 'Instagram',
    contentType: 'Carousel Edukasi',
    topic: 'Checklist Alokasi Anggaran Iklan Tahunan untuk Bisnis Berkembang (Slide 1-7)',
    pic: 'Nadya Putri',
    status: 'Siap Tayang',
    googleDriveUrl: 'https://drive.google.com/drive/folders/MKT-IG-CAROUSEL-02'
  },
  {
    id: 'cnt-3',
    day: 'Rabu',
    date: '2026-10-28',
    platform: 'UfukMedia',
    contentType: 'Artikel Blog',
    topic: 'Resensi Kritis: Meninjau Epistemologi Sains Terbuka di Era Komputasi Awan',
    pic: 'Fajar Nugraha',
    status: 'Produksi',
    googleDriveUrl: 'https://drive.google.com/drive/folders/UFUK-RESENSI-SAINS-03'
  }
];

export const INITIAL_MARKETING_METRIC: MarketingMetric = {
  totalAudienceReach: 1480000,
  avgEngagementRate: 5.4,
  ctrPercent: 3.8,
  monthlyFollowersGrowth: 18500,
  cplAverageIdr: 32000
};

// ==========================================
// UFUK.CENDEKIA INITIAL DATA
// ==========================================

export const INITIAL_UFUK_MEDIA_FEED: UfukMediaArticle[] = [
  {
    id: 'ufk-art-1',
    title: 'Etika Humaniora dalam Algoritma Generatif: Masa Depan Kepenulisan Kreatif',
    rubrik: 'Opini Cendekia',
    author: 'Prof. Dr. Irfan Sanusi & Siti Zahra',
    publishDate: '26 Okt 2026, 08:30 WIB',
    views: 14250,
    shares: 840,
    url: 'https://ufukmedia.co/opini/etika-humaniora-algoritma-generatif',
    status: 'Tayang',
    excerpt: 'Telaah kritis mengenai relasi kuasa antara mesin penalaran dan orisinalitas pemikiran intelektual nusantara di abad ke-21.'
  },
  {
    id: 'ufk-art-2',
    title: 'Restorasi Naskah Kuno dan Urgensi Repositori Digital Terbuka di Asia Tenggara',
    rubrik: 'Riset Kebijakan',
    author: 'Fajar Nugraha & Tim Preservasi UFUK',
    publishDate: '24 Okt 2026, 14:15 WIB',
    views: 9820,
    shares: 512,
    url: 'https://ufukmedia.co/riset/restorasi-naskah-kuno-digital-asia-tenggara',
    status: 'Tayang',
    excerpt: 'Metodologi konservasi naskah lontar dan kertas daluang melalui teknologi pemindaian multispektral.'
  },
  {
    id: 'ufk-art-3',
    title: 'Transformasi Ruang Baca Publik: Menghidupkan Kembali Minat Baca Komunitas',
    rubrik: 'Filsafat & Budaya',
    author: 'Ahmad Pratama',
    publishDate: '22 Okt 2026, 10:00 WIB',
    views: 18400,
    shares: 1240,
    url: 'https://ufukmedia.co/budaya/transformasi-ruang-baca-publik-komunitas',
    status: 'Tayang',
    excerpt: 'Eksperimen perpustakaan hibrida yang memadukan buku fisik, ruang diskusi dialektis, dan akses cloud.'
  },
  {
    id: 'ufk-art-4',
    title: 'Kedaulatan Sains dan Kemandirian Ekosistem Jurnal Akademik Mandiri',
    rubrik: 'Sains & Teknologi',
    author: 'Dr. Hendra Gunawan',
    publishDate: '28 Okt 2026 (Terjadwal)',
    views: 0,
    shares: 0,
    url: 'https://ufukmedia.co/sains/kedaulatan-sains-ekosistem-jurnal-mandiri',
    status: 'Terjadwal',
    excerpt: 'Strategi mengatasi oligopoli penerbitan akademik global menuju sains berkeadilan.'
  }
];

export const INITIAL_UFUK_ARTICLE_REVIEWS: UfukArticleReview[] = [
  {
    id: 'rev-001',
    title: 'Dialektika Kosmologi Nusantara: Kearifan Mitologis vs Rasionalitas Modern',
    author: 'Dr. Raden Mas Danang',
    authorInstitution: 'Pusat Studi Filsafat Nusantara',
    category: 'Jurnal Cendekia',
    contentSnippet: 'Penelitian ini menggali sintesis antara mitos penciptaan dalam tradisi lisan maritim dan pemahaman astronomi kontemporer...',
    fullContent: `PENDAHULUAN
Penelitian ini bertujuan untuk merekonstruksi kosmologi tradisional masyarakat maritim kepulauan nusantara dalam kacamata filsafat ilmu modern. Berbagai kajian terdahulu cenderung memisahkan antara narasi mitologis dengan temuan empiris navigasi bintang.

METODOLOGI
Kajian menggunakan pendekatan hermeneutika kritis dengan menelaah manuskrip pelayaran abad ke-17 yang tersimpan dalam koleksi khusus Perpustakaan UFUK.Cendekia.

TEMUAN & DISKUSI
Masyarakat maritim nusantara tidak melihat kosmos sebagai objek mekanis terpisah, melainkan jejaring relasi kehidupan yang menuntut etika keseimbangan ekologis.

KESIMPULAN
Rekonstruksi ini penting untuk merumuskan pedagogi sains berwawasan kearifan lokal yang relevan bagi generasi muda cendekiawan hari ini.`,
    status: 'In Review',
    googleDocsUrl: 'https://docs.google.com/document/d/1UFUK-DOC-KOSMOLOGI-REVIEW/edit',
    googleDriveUrl: 'https://drive.google.com/drive/folders/UFUK-DRAFTS-KOSMOLOGI',
    lastUpdated: '2026-10-26 15:40 WIB',
    reviewerPic: 'Siti Zahra',
    comments: [
      {
        id: 'cm-1',
        userName: 'Siti Zahra',
        userAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
        userEmail: 'ufuk.cendekia@kolibrinest.id',
        text: 'Naskah sangat berbobot! Mohon perjelas rujukan bab 3 terkait translasi teks lontar pelayaran agar kutipannya lebih presisi.',
        timestamp: '26 Okt 2026, 11:20 WIB'
      },
      {
        id: 'cm-2',
        userName: 'Ahmad Pratama',
        userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        userEmail: 'management@kolibrinest.id',
        text: 'Setuju untuk dipublikasikan di rubrik Filsafat & Budaya Ufukmedia.co setelah revisi daftar pustaka selesai.',
        timestamp: '26 Okt 2026, 14:05 WIB'
      }
    ]
  },
  {
    id: 'rev-002',
    title: 'Ekonomi Sirkular dan Masa Depan Industri Penerbitan Buku Berkelanjutan',
    author: 'Siti Zahra & Maya Indira, M.Si',
    authorInstitution: 'Divisi Riset UFUK.Cendekia',
    category: 'Analisis Sosio-Teknologi',
    contentSnippet: 'Kajian komparatif pemanfaatan kertas daur ulang non-kayu, efisiensi cetak print-on-demand, dan integrasi e-book...',
    fullContent: `ABSTRAK
Industri penerbitan menghadapi tantangan ganda: krisis bahan baku pulp dan pergeseran cepat menuju platform digital. Artikel ini menawarkan model rantai pasok sirkular yang menurunkan jejak karbon hingga 48% tanpa mengorbankan kualitas cetak arsip perpustakaan.

ANALISIS EKONOMI SIRKULAR
Penerapan sistem cetak berbasis permintaan (print-on-demand) yang terintegrasi dengan Google Drive repository memungkinkan zero-inventory waste.`,
    status: 'Editing',
    googleDocsUrl: 'https://docs.google.com/document/d/1UFUK-DOC-EKONOMI-SIRKULAR/edit',
    googleDriveUrl: 'https://drive.google.com/drive/folders/UFUK-RESEARCH-CIRCULAR-PAPER',
    lastUpdated: '2026-10-25 18:20 WIB',
    reviewerPic: 'Fajar Nugraha',
    comments: [
      {
        id: 'cm-3',
        userName: 'Fajar Nugraha',
        userAvatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
        userEmail: 'fajar.ufuk@kolibrinest.id',
        text: 'Tabel perbandingan biaya cetak konvensional vs digital print-on-demand sudah saya masukkan di Google Docs. Siap difinalisasi.',
        timestamp: '25 Okt 2026, 16:30 WIB'
      }
    ]
  },
  {
    id: 'rev-003',
    title: 'Studi Kebijakan: Model Literasi Kritis Generasi Digital di Kawasan Urban',
    author: 'Tim Laboratorium Sosial Ufuk',
    authorInstitution: 'UFUK.Cendekia Research Group',
    category: 'Riset Kebijakan',
    contentSnippet: 'Survei terhadap 1.200 responden mengenai verifikasi informasi dan kapabilitas pencarian literatur primer...',
    fullContent: `RINGKASAN EKSEKUTIF
Temuan utama riset ini menunjukkan bahwa 68% responden mengandalkan media sosial sebagai sumber informasi utama, namun hanya 14% yang melakukan verifikasi silang ke pangkalan data perpustakaan atau arsip primer. Disusun rekomendasi kebijakan literasi sekolah dan ruang publik.`,
    status: 'Approved & Ready',
    googleDocsUrl: 'https://docs.google.com/document/d/1UFUK-DOC-LITERASI-URBAN/edit',
    googleDriveUrl: 'https://drive.google.com/drive/folders/UFUK-POLICY-LITERASI-URBAN',
    lastUpdated: '2026-10-24 10:15 WIB',
    reviewerPic: 'Siti Zahra',
    comments: [
      {
        id: 'cm-4',
        userName: 'Siti Zahra',
        userAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
        userEmail: 'ufuk.cendekia@kolibrinest.id',
        text: 'Disetujui penuh oleh Dewan Editorial. Jadwalkan rilis serentak di Ufukmedia.co dan Google Drive library.',
        timestamp: '24 Okt 2026, 10:15 WIB'
      }
    ]
  }
];

export const INITIAL_UFUK_LIBRARY: UfukLibraryItem[] = [
  {
    id: 'lib-001',
    title: 'Ensiklopedi Pemikiran Cendekiawan Nusantara: Jilid I - Filsafat & Kosmologi',
    author: 'Dewan Pakar UFUK.Cendekia (Editor: Siti Zahra)',
    isbn: '978-623-98210-1-4',
    publisher: 'Penerbit UFUK Pustaka Utama',
    year: 2025,
    category: 'Buku Teori & Filsafat',
    status: 'Tersedia',
    locationOrDriveLink: 'Rak Utama A-04 / Ruang Referensi',
    googleDriveUrl: 'https://drive.google.com/drive/folders/UFUK-LIB-ENSIKLOPEDI-JILID1',
    borrowersCount: 28,
    summary: 'Kompilasi komprehensif 40 esai pemikiran filosofis tokoh nusantara lintas abad, dilengkapi glosarium istilah arkais.',
    lastUpdated: '2026-10-25'
  },
  {
    id: 'lib-002',
    title: 'Monograf Riset: Kecerdasan Kolektif Komunitas Pengetahuan Tradisional',
    author: 'Dr. Ilham Ramadhan',
    isbn: '978-623-98210-4-5',
    publisher: 'UFUK.Cendekia Press',
    year: 2026,
    category: 'Monograf Riset',
    status: 'Dipinjam',
    locationOrDriveLink: 'Dipinjam oleh: Bagus Wicaksono (Jatuh tempo: 5 Nov 2026)',
    googleDriveUrl: 'https://drive.google.com/drive/folders/UFUK-LIB-MONOGRAF-KECERDASAN',
    borrowersCount: 42,
    summary: 'Studi etnografi atas transmisi pengetahuan agrikultur dan pranata mangsa di Jawa dan Bali.',
    lastUpdated: '2026-10-24'
  },
  {
    id: 'lib-003',
    title: 'E-Book Kebijakan: Ekosistem Hak Cipta dan Lisensi Creative Commons di Indonesia',
    author: 'Adv. Nurul Hidayat, LL.M & Tim Hukum UFUK',
    isbn: '978-623-98210-8-3 (E-Book)',
    publisher: 'UFUK Digital Repository',
    year: 2026,
    category: 'E-Book Kebijakan',
    status: 'Tersedia',
    locationOrDriveLink: 'Digital Cloud Repository (Akses Terbuka)',
    googleDriveUrl: 'https://drive.google.com/drive/folders/UFUK-LIB-EBOOK-CREATIVECOMMONS',
    borrowersCount: 156,
    summary: 'Panduan praktis perlindungan kekayaan intelektual bagi periset independen, kreator konten, dan pustakawan.',
    lastUpdated: '2026-10-22'
  },
  {
    id: 'lib-004',
    title: 'Manuskrip Lontar Babad Maritim Pesisir Utara (Alih Aksara & Faksimili)',
    author: 'Koleksi Pusaka Pangeran Aria (Digitalisasi 2026)',
    isbn: 'N/A (Naskah Klasik Terdaftar Reg-8841)',
    publisher: 'Perpustakaan Khusus UFUK.Cendekia',
    year: 1842,
    category: 'Arsip Naskah Klasik',
    status: 'Dalam Digitalisasi',
    locationOrDriveLink: 'Ruang Suhu Terkontrol Lab Konservasi Lt. 2',
    googleDriveUrl: 'https://drive.google.com/drive/folders/UFUK-LIB-MANUSKRIP-MARITIM',
    borrowersCount: 6,
    summary: 'Naskah bertulisan aksara Jawa kawi mengenai peta pelabuhan, hukum laut, dan astronomi perbintangan bahari.',
    lastUpdated: '2026-10-26'
  }
];

export const INITIAL_UFUK_ACTIVITIES: UfukActivityKanban[] = [
  // To Do
  {
    id: 'act-001',
    title: 'Perekrutan Dewan Pakar Tamu untuk Edisi Khusus Cendekia 2027',
    description: 'Menyusun daftar akademisi dan praktisi kebudayaan untuk menjadi peer-reviewer independen.',
    status: 'todo',
    priority: 'high',
    pic: 'Siti Zahra',
    dueDate: '2026-11-12',
    googleDriveUrl: 'https://drive.google.com/drive/folders/UFUK-ACT-PEER-REVIEWERS',
    checklistCount: { done: 1, total: 4 }
  },
  {
    id: 'act-002',
    title: 'Pengadaan Scanner Buku Overhead Non-Destruktif',
    description: 'Pengadaan alat scanner V-shape untuk memproses naskah rapuh perpustakaan tanpa merusak jilidan fisik.',
    status: 'todo',
    priority: 'medium',
    pic: 'Fajar Nugraha',
    dueDate: '2026-11-20',
    googleDriveUrl: 'https://drive.google.com/drive/folders/UFUK-ACT-SCANNER-PROCUREMENT',
    checklistCount: { done: 2, total: 3 }
  },

  // Doing
  {
    id: 'act-003',
    title: 'Penyuntingan Akhir & Proofreading Monograf Kebijakan AI',
    description: 'Harmonisasi sitasi format APA 7th edition dan pengecekan plagiarisme Turnitin untuk 8 bab buku.',
    status: 'doing',
    priority: 'urgent',
    pic: 'Siti Zahra',
    dueDate: '2026-11-02',
    googleDriveUrl: 'https://drive.google.com/drive/folders/UFUK-ACT-MONOGRAF-AI-EDIT',
    checklistCount: { done: 5, total: 7 }
  },
  {
    id: 'act-004',
    title: 'Sinkronisasi Otomatis API Feed dengan Portal Ufukmedia.co',
    description: 'Pengujian endpoint webhook artikel baru agar langsung terindeks di mesin pencari dan feed pembaca.',
    status: 'doing',
    priority: 'high',
    pic: 'Fajar Nugraha',
    dueDate: '2026-10-31',
    googleDriveUrl: 'https://drive.google.com/drive/folders/UFUK-ACT-API-INTEGRATION',
    checklistCount: { done: 3, total: 4 }
  },

  // Done
  {
    id: 'act-005',
    title: 'Penyelenggaraan Bedah Buku: Paradoks Sains Modern',
    description: 'Diskusi hybrid dihadiri 180 peserta luring & daring, sukses mengarsipkan rekaman ke YouTube Ufukmedia.',
    status: 'done',
    priority: 'medium',
    pic: 'Siti Zahra',
    dueDate: '2026-10-24',
    googleDriveUrl: 'https://drive.google.com/drive/folders/UFUK-ACT-BEDAH-BUKU-RECORDING',
    checklistCount: { done: 5, total: 5 }
  }
];

export const INITIAL_FINANCIAL_PLANS: DivisionFinancialPlan[] = [
  // Sales Financials
  {
    id: 'fin-s-1',
    division: 'sales',
    title: 'Langganan LinkedIn Sales Navigator & Zoom Enterprise',
    category: 'peralatan_lisensi',
    budgetedAmount: 28000000,
    spentAmount: 26500000,
    period: '2026',
    description: 'Tools outreach B2B dan video conferencing untuk presentasi proposal.',
    date: '2026-09-10',
    receiptNumber: 'INV-LSN-2026-09',
    googleDriveReceiptUrl: 'https://drive.google.com/drive/folders/KNB-FIN-SALES-RECEIPTS'
  },
  {
    id: 'fin-s-2',
    division: 'sales',
    title: 'Kegiatan Networking & Client Executive Luncheon',
    category: 'kegiatan',
    budgetedAmount: 45000000,
    spentAmount: 34000000,
    period: '2026',
    description: 'Pertemuan tatap muka dengan 12 C-level calon klien enterprise di Jakarta.',
    date: '2026-10-12',
    receiptNumber: 'RCP-NET-8821',
    googleDriveReceiptUrl: 'https://drive.google.com/drive/folders/KNB-FIN-SALES-RECEIPTS'
  },

  // Marketing Financials
  {
    id: 'fin-m-1',
    division: 'marketing',
    title: 'Meta Ads (Instagram & Facebook) Brand Awareness Q4',
    category: 'iklan_ads',
    budgetedAmount: 90000000,
    spentAmount: 68500000,
    period: '2026',
    description: 'Kampanye berbayar untuk menjangkau pengambil keputusan bisnis di 5 kota besar.',
    date: '2026-10-18',
    receiptNumber: 'META-INV-44120',
    googleDriveReceiptUrl: 'https://drive.google.com/drive/folders/KNB-FIN-MKT-ADS'
  },
  {
    id: 'fin-m-2',
    division: 'marketing',
    title: 'TikTok Ads Boost & Kreator Collaboration',
    category: 'iklan_ads',
    budgetedAmount: 45000000,
    spentAmount: 32000000,
    period: '2026',
    description: 'Pemasangan Spark Ads dan kerja sama dengan 4 micro-influencer produktivitas.',
    date: '2026-10-14',
    receiptNumber: 'TT-ADS-7731',
    googleDriveReceiptUrl: 'https://drive.google.com/drive/folders/KNB-FIN-MKT-ADS'
  },

  // UFUK.Cendekia Financials
  {
    id: 'fin-u-1',
    division: 'ufuk_cendekia',
    title: 'Penerbitan & Cetak Seri Ensiklopedi Pemikiran Cendekiawan',
    category: 'penerbitan_buku',
    budgetedAmount: 85000000,
    spentAmount: 72000000,
    period: '2026',
    description: 'Biaya cetak hardcover kertas bookpaper ramah lingkungan 1.000 eksemplar & pendaftaran ISBN.',
    date: '2026-09-20',
    receiptNumber: 'INV-UFUK-CETAK-81',
    googleDriveReceiptUrl: 'https://drive.google.com/drive/folders/UFUK-FINANCE-RECEIPTS'
  },
  {
    id: 'fin-u-2',
    division: 'ufuk_cendekia',
    title: 'Honorarium Peer-Reviewer & Penulis Naskah Ufukmedia.co',
    category: 'kegiatan',
    budgetedAmount: 65000000,
    spentAmount: 48500000,
    period: '2026',
    description: 'Apresiasi karya intelektual untuk 24 akademisi & peneliti penulis rubrik sains budaya.',
    date: '2026-10-15',
    receiptNumber: 'RCP-UFUK-HONOR-26',
    googleDriveReceiptUrl: 'https://drive.google.com/drive/folders/UFUK-FINANCE-RECEIPTS'
  },
  {
    id: 'fin-u-3',
    division: 'ufuk_cendekia',
    title: 'Iklan Promosi & Distribusi Artikel Ufukmedia.co & Simposium',
    category: 'iklan_ads',
    budgetedAmount: 40000000,
    spentAmount: 26000000,
    period: '2026',
    description: 'Distribusi berbayar Google Discovery & Meta Sponsored Readers untuk memperluas jangkauan pembaca.',
    date: '2026-10-20',
    receiptNumber: 'INV-UFUK-ADS-99',
    googleDriveReceiptUrl: 'https://drive.google.com/drive/folders/UFUK-FINANCE-RECEIPTS'
  },
  {
    id: 'fin-u-4',
    division: 'ufuk_cendekia',
    title: 'Lisensi Perangkat Lunak Preservasi & Repositori Digital',
    category: 'peralatan_lisensi',
    budgetedAmount: 30000000,
    spentAmount: 24000000,
    period: '2026',
    description: 'Langganan Google Workspace Enterprise Storage, OCR Abbyy FineReader & Crossref DOI registry.',
    date: '2026-08-15',
    receiptNumber: 'LIC-UFUK-STORAGE-26',
    googleDriveReceiptUrl: 'https://drive.google.com/drive/folders/UFUK-FINANCE-RECEIPTS'
  },

  // Management & Operasional
  {
    id: 'fin-o-1',
    division: 'management',
    title: 'Infrastruktur Cloud Hosting, Server API & Domain Kolibrinest.id',
    category: 'operasional',
    budgetedAmount: 40000000,
    spentAmount: 32000000,
    period: '2026',
    description: 'Biaya komputasi Google Cloud Platform, domain registry, dan sertifikat SSL.',
    date: '2026-09-01',
    receiptNumber: 'GCP-INV-2026-9',
    googleDriveReceiptUrl: 'https://drive.google.com/drive/folders/KNB-FINANCE-GCP-RECEIPTS'
  }
];

export const INITIAL_ORDERS: OrderRequest[] = [
  {
    id: 'ord-001',
    trackingCode: 'KNB-REQ-8492',
    requesterType: 'guest',
    requesterName: 'Budi Santoso',
    requesterEmail: 'budi.santoso@nusantaratech.co.id',
    requesterPhone: '+62 811-2345-6789',
    requesterOrg: 'PT Nusantara Teknologi Mandiri',
    targetDivision: 'sales',
    title: 'Permintaan Penawaran Paket Enterprise & Konsultasi Manajemen Workflow',
    description: 'Kami ingin menjadwalkan presentasi demo implementasi Kolibrinest.id untuk 85 staf kami di cabang Jakarta dan Surabaya.',
    requestedDeadline: '2026-11-10',
    estimatedBudget: 95000000,
    status: 'in_progress',
    assignedPic: 'Rina Kusuma',
    submittedAt: '2026-10-25 14:20',
    internalNotes: 'Sudah dihubungi via WhatsApp, jadwal demo Zoom telah disepakati untuk 2 November.',
    googleDriveUrl: 'https://drive.google.com/drive/folders/KNB-REQ-8492-DOCS'
  },
  {
    id: 'ord-002',
    trackingCode: 'KNB-REQ-7104',
    requesterType: 'guest',
    requesterName: 'Dewi Anggraini',
    requesterEmail: 'dewi@artisanbrand.id',
    requesterPhone: '+62 817-8899-0011',
    requesterOrg: 'Lembaga Kajian Kebudayaan Nusantara',
    targetDivision: 'ufuk_cendekia',
    title: 'Permintaan Penerbitan Monograf Riset & Penayangan Artikel di Ufukmedia.co',
    description: 'Kami ingin menerbitkan hasil studi etnografi tenun ikat tradisional ke dalam seri buku perpustakaan UFUK dan artikel opini di Ufukmedia.',
    requestedDeadline: '2026-11-25',
    estimatedBudget: 42000000,
    status: 'approved',
    assignedPic: 'Siti Zahra',
    submittedAt: '2026-10-24 10:15',
    internalNotes: 'Naskah masuk kurasi dewan editorial, berkas riset telah diunggah ke Google Drive.',
    googleDriveUrl: 'https://drive.google.com/drive/folders/KNB-REQ-7104-UFUK-TENUN'
  },
  {
    id: 'ord-003',
    trackingCode: 'KNB-INT-2026-01',
    requesterType: 'internal_division',
    requesterName: 'Rina Kusuma (Divisi Sales)',
    requesterEmail: 'sales@kolibrinest.id',
    requesterOrg: 'Divisi Sales Kolibrinest.id',
    targetDivision: 'ufuk_cendekia',
    title: 'Permintaan Kajian Teoretis & Whitepaper Nilai Ekonomi Solusi Kolibri',
    description: 'Divisi Sales membutuhkan 1 artikel monograf riset dari tim UFUK.Cendekia untuk meyakinkan calon klien sektor perbankan.',
    requestedDeadline: '2026-11-03',
    estimatedBudget: 15000000,
    status: 'in_progress',
    assignedPic: 'Fajar Nugraha',
    submittedAt: '2026-10-23 16:00',
    internalNotes: 'Draf bab 1 telah disusun di Google Docs review.',
    googleDriveUrl: 'https://drive.google.com/drive/folders/KNB-INT-01-WHITEPAPER-SALES'
  }
];

export const INITIAL_ANNUAL_BUDGET: AnnualBudgetState = {
  year: 2026,
  totalAnnualBudget: 1500000000, // Rp 1.5 Miliar
  divisionAllocations: {
    sales: 350000000,         // 350 Juta
    marketing: 550000000,     // 550 Juta
    ufuk_cendekia: 400000000, // 400 Juta (UFUK.Cendekia)
    management: 200000000     // 200 Juta (Operasional & Infrastruktur)
  }
};

export const INITIAL_SETTINGS: AppSettings = {
  themeMode: 'light',
  accentColor: 'red',
  fontFamily: 'plus_jakarta',
  fontSize: 'normal',
  notificationsEnabled: true,
  autoSyncCalendar: true
};
