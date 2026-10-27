import React, { createContext, useContext, useState, useEffect } from 'react';
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
  DivisionType,
  TaskStatus,
  UfukMediaArticle,
  UfukArticleReview,
  UfukLibraryItem,
  UfukActivityKanban,
  ArticleComment
} from '../types';
import {
  INITIAL_USERS,
  INITIAL_PERSONNEL,
  INITIAL_TASKS,
  INITIAL_COLLABORATIONS,
  INITIAL_PROJECTIONS,
  INITIAL_CALENDAR_EVENTS,
  INITIAL_SALES_PLANS,
  INITIAL_SALES_METRICS,
  INITIAL_MARKETING_CAMPAIGNS,
  INITIAL_WEEKLY_CONTENT,
  INITIAL_MARKETING_METRIC,
  INITIAL_UFUK_MEDIA_FEED,
  INITIAL_UFUK_ARTICLE_REVIEWS,
  INITIAL_UFUK_LIBRARY,
  INITIAL_UFUK_ACTIVITIES,
  INITIAL_FINANCIAL_PLANS,
  INITIAL_ORDERS,
  INITIAL_ANNUAL_BUDGET,
  INITIAL_SETTINGS
} from '../data/initialData';

export type MainTabType = 'overview' | 'divisions' | 'personal' | 'orders' | 'budget' | 'settings';
export type DivisionSubTabType = 'sales' | 'marketing' | 'ufuk_cendekia';

interface AppContextType {
  currentUser: User | null;
  users: User[];
  tasks: TaskItem[];
  personnel: PersonnelWorkload[];
  collaborations: CrossDivisionCollab[];
  projections: WorkProjection[];
  calendarEvents: CalendarEvent[];
  salesPlans: SalesPlan[];
  salesMetrics: SalesMetric[];
  marketingCampaigns: MarketingCampaign[];
  weeklyContent: WeeklyContentItem[];
  marketingMetric: MarketingMetric;
  financialPlans: DivisionFinancialPlan[];
  orders: OrderRequest[];
  annualBudget: AnnualBudgetState;
  settings: AppSettings;
  activeTab: MainTabType;
  selectedDivisionSubTab: DivisionSubTabType;
  searchQuery: string;

  // UFUK.Cendekia specific state
  ufukMediaFeed: UfukMediaArticle[];
  ufukArticles: UfukArticleReview[];
  libraryItems: UfukLibraryItem[];
  ufukActivities: UfukActivityKanban[];

  // Google Workspace sync status
  isWorkspaceSyncing: boolean;
  lastWorkspaceSync: string;
  triggerWorkspaceSync: () => void;

  // Actions
  loginWithEmail: (email: string) => boolean;
  logout: () => void;
  switchUser: (userId: string) => void;
  setActiveTab: (tab: MainTabType) => void;
  setSelectedDivisionSubTab: (subTab: DivisionSubTabType) => void;
  setSearchQuery: (query: string) => void;
  addTask: (task: Omit<TaskItem, 'id' | 'createdAt'>) => void;
  updateTaskStatus: (taskId: string, status: TaskStatus) => void;
  updateTask: (task: TaskItem) => void;
  deleteTask: (taskId: string) => void;
  submitGuestOrder: (order: Omit<OrderRequest, 'id' | 'trackingCode' | 'submittedAt'>) => string;
  updateOrderStatus: (orderId: string, status: OrderRequest['status'], notes?: string, assignedPic?: string) => void;
  addCalendarEvent: (event: Omit<CalendarEvent, 'id'>) => void;
  addFinancialExpense: (expense: Omit<DivisionFinancialPlan, 'id'>) => void;
  updateAnnualBudgetAllocation: (division: keyof AnnualBudgetState['divisionAllocations'], amount: number) => void;
  addSalesPlan: (plan: Omit<SalesPlan, 'id'>) => void;
  updateSalesPlan: (plan: SalesPlan) => void;
  addMarketingCampaign: (campaign: Omit<MarketingCampaign, 'id'>) => void;
  addWeeklyContent: (content: Omit<WeeklyContentItem, 'id'>) => void;
  updateWeeklyContentStatus: (id: string, status: WeeklyContentItem['status']) => void;

  // UFUK.Cendekia actions
  addArticleComment: (articleId: string, commentText: string) => void;
  updateArticleReview: (
    articleId: string,
    title: string,
    category: UfukArticleReview['category'],
    fullContent: string,
    status: UfukArticleReview['status']
  ) => void;
  addLibraryItem: (item: Omit<UfukLibraryItem, 'id' | 'lastUpdated' | 'borrowersCount'>) => void;
  updateLibraryItem: (item: UfukLibraryItem) => void;
  addUfukActivity: (activity: Omit<UfukActivityKanban, 'id'>) => void;
  updateUfukActivityStatus: (activityId: string, status: UfukActivityKanban['status']) => void;

  updateSettings: (newSettings: Partial<AppSettings>) => void;
  resetToInitialData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = 'kolibrinest_pm_v2';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const loadStored = <T,>(key: string, defaultValue: T): T => {
    try {
      const stored = localStorage.getItem(`${STORAGE_KEY}_${key}`);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch {
      return defaultValue;
    }
  };

  const [currentUser, setCurrentUser] = useState<User | null>(() =>
    loadStored<User | null>('user', INITIAL_USERS[0])
  );
  const [users] = useState<User[]>(INITIAL_USERS);
  const [tasks, setTasks] = useState<TaskItem[]>(() => loadStored('tasks', INITIAL_TASKS));
  const [personnel, setPersonnel] = useState<PersonnelWorkload[]>(() => loadStored('personnel', INITIAL_PERSONNEL));
  const [collaborations] = useState<CrossDivisionCollab[]>(() => loadStored('collabs', INITIAL_COLLABORATIONS));
  const [projections] = useState<WorkProjection[]>(() => loadStored('projections', INITIAL_PROJECTIONS));
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(() => loadStored('calendar', INITIAL_CALENDAR_EVENTS));
  const [salesPlans, setSalesPlans] = useState<SalesPlan[]>(() => loadStored('salesPlans', INITIAL_SALES_PLANS));
  const [salesMetrics] = useState<SalesMetric[]>(() => loadStored('salesMetrics', INITIAL_SALES_METRICS));
  const [marketingCampaigns, setMarketingCampaigns] = useState<MarketingCampaign[]>(() => loadStored('mktCampaigns', INITIAL_MARKETING_CAMPAIGNS));
  const [weeklyContent, setWeeklyContent] = useState<WeeklyContentItem[]>(() => loadStored('weeklyContent', INITIAL_WEEKLY_CONTENT));
  const [marketingMetric] = useState<MarketingMetric>(() => loadStored('mktMetric', INITIAL_MARKETING_METRIC));
  const [financialPlans, setFinancialPlans] = useState<DivisionFinancialPlan[]>(() => loadStored('financialPlans', INITIAL_FINANCIAL_PLANS));
  const [orders, setOrders] = useState<OrderRequest[]>(() => loadStored('orders', INITIAL_ORDERS));
  const [annualBudget, setAnnualBudget] = useState<AnnualBudgetState>(() => loadStored('annualBudget', INITIAL_ANNUAL_BUDGET));
  const [settings, setSettings] = useState<AppSettings>(() => loadStored('settings', INITIAL_SETTINGS));

  // UFUK.Cendekia states
  const [ufukMediaFeed] = useState<UfukMediaArticle[]>(() => loadStored('ufukFeed', INITIAL_UFUK_MEDIA_FEED));
  const [ufukArticles, setUfukArticles] = useState<UfukArticleReview[]>(() => loadStored('ufukArticles', INITIAL_UFUK_ARTICLE_REVIEWS));
  const [libraryItems, setLibraryItems] = useState<UfukLibraryItem[]>(() => loadStored('ufukLibrary', INITIAL_UFUK_LIBRARY));
  const [ufukActivities, setUfukActivities] = useState<UfukActivityKanban[]>(() => loadStored('ufukActivities', INITIAL_UFUK_ACTIVITIES));

  // Google Workspace live sync state
  const [isWorkspaceSyncing, setIsWorkspaceSyncing] = useState(false);
  const [lastWorkspaceSync, setLastWorkspaceSync] = useState('Hari ini, 15:30 WIB');

  const [activeTab, setActiveTab] = useState<MainTabType>('overview');
  const [selectedDivisionSubTab, setSelectedDivisionSubTab] = useState<DivisionSubTabType>('sales');
  const [searchQuery, setSearchQuery] = useState('');

  // Persist states to localStorage
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_user`, JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_tasks`, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_personnel`, JSON.stringify(personnel));
  }, [personnel]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_calendar`, JSON.stringify(calendarEvents));
  }, [calendarEvents]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_salesPlans`, JSON.stringify(salesPlans));
  }, [salesPlans]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_mktCampaigns`, JSON.stringify(marketingCampaigns));
  }, [marketingCampaigns]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_weeklyContent`, JSON.stringify(weeklyContent));
  }, [weeklyContent]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_ufukArticles`, JSON.stringify(ufukArticles));
  }, [ufukArticles]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_ufukLibrary`, JSON.stringify(libraryItems));
  }, [libraryItems]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_ufukActivities`, JSON.stringify(ufukActivities));
  }, [ufukActivities]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_financialPlans`, JSON.stringify(financialPlans));
  }, [financialPlans]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_orders`, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_annualBudget`, JSON.stringify(annualBudget));
  }, [annualBudget]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_settings`, JSON.stringify(settings));
    if (settings.themeMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    if (settings.fontFamily === 'outfit') {
      document.body.style.fontFamily = "'Outfit', sans-serif";
    } else if (settings.fontFamily === 'system') {
      document.body.style.fontFamily = "system-ui, -apple-system, sans-serif";
    } else {
      document.body.style.fontFamily = "'Plus Jakarta Sans', sans-serif";
    }
  }, [settings]);

  // Google Workspace sync trigger
  const triggerWorkspaceSync = () => {
    setIsWorkspaceSyncing(true);
    setTimeout(() => {
      setIsWorkspaceSyncing(false);
      const now = new Date();
      setLastWorkspaceSync(
        `Hari ini, ${now.getHours().toString().padStart(2, '0')}:${now
          .getMinutes()
          .toString()
          .padStart(2, '0')} WIB`
      );
    }, 1200);
  };

  // Auth actions
  const loginWithEmail = (email: string): boolean => {
    const cleanEmail = email.trim().toLowerCase();
    const existing = INITIAL_USERS.find(u => u.email.toLowerCase() === cleanEmail);
    if (existing) {
      setCurrentUser(existing);
      return true;
    }

    const username = cleanEmail.split('@')[0] || 'Member';
    const formattedName = username.charAt(0).toUpperCase() + username.slice(1);
    let division: DivisionType = 'management';
    if (cleanEmail.includes('sales')) division = 'sales';
    else if (cleanEmail.includes('marketing') || cleanEmail.includes('mkt')) division = 'marketing';
    else if (cleanEmail.includes('ufuk') || cleanEmail.includes('cendekia') || cleanEmail.includes('pub'))
      division = 'ufuk_cendekia';

    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: `${formattedName} Kolibri`,
      email: cleanEmail,
      role: 'Staff Kolibrinest.id',
      division,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      status: 'active',
      tasksCount: 2
    };
    setCurrentUser(newUser);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const switchUser = (userId: string) => {
    const found = INITIAL_USERS.find(u => u.id === userId);
    if (found) {
      setCurrentUser(found);
    }
  };

  // Task actions (with Google Drive support)
  const addTask = (newTaskData: Omit<TaskItem, 'id' | 'createdAt'>) => {
    const id = `tsk-${Date.now().toString().slice(-4)}`;
    // Auto-generate Google Drive Folder URL if not provided
    const driveUrl =
      newTaskData.googleDriveUrl ||
      `https://drive.google.com/drive/folders/KNB-${newTaskData.division.toUpperCase()}-${id}`;

    const createdTask: TaskItem = {
      ...newTaskData,
      id,
      googleDriveUrl: driveUrl,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setTasks(prev => [createdTask, ...prev]);

    // Recalculate personnel workload
    setPersonnel(prev =>
      prev.map(p => {
        if (p.id === createdTask.assigneeId || p.name === createdTask.assigneeName) {
          const newActive = p.activeTasks + 1;
          const newAllocated = p.allocatedHoursWeek + (createdTask.estimatedHours || 4);
          const newUtil = Math.min(100, Math.round((newAllocated / p.capacityHoursWeek) * 100));
          return {
            ...p,
            activeTasks: newActive,
            allocatedHoursWeek: newAllocated,
            utilizationPercent: newUtil,
            status: newUtil > 90 ? 'overloaded' : newUtil >= 60 ? 'optimal' : 'available'
          };
        }
        return p;
      })
    );
  };

  const updateTaskStatus = (taskId: string, newStatus: TaskStatus) => {
    setTasks(prev =>
      prev.map(t => {
        if (t.id === taskId) {
          const isDone = newStatus === 'done';
          return {
            ...t,
            status: newStatus,
            progressPercent: isDone ? 100 : newStatus === 'doing' ? 50 : 20
          };
        }
        return t;
      })
    );
  };

  const updateTask = (updatedTask: TaskItem) => {
    setTasks(prev => prev.map(t => (t.id === updatedTask.id ? updatedTask : t)));
  };

  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  // Guest & Division Order actions
  const submitGuestOrder = (orderData: Omit<OrderRequest, 'id' | 'trackingCode' | 'submittedAt'>): string => {
    const randNum = Math.floor(1000 + Math.random() * 9000);
    const trackingCode = `KNB-REQ-${randNum}`;
    const newOrder: OrderRequest = {
      ...orderData,
      id: `ord-${Date.now()}`,
      trackingCode,
      googleDriveUrl:
        orderData.googleDriveUrl || `https://drive.google.com/drive/folders/${trackingCode}-PROJECT-BRIEF`,
      submittedAt: new Date().toLocaleString('id-ID', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })
    };
    setOrders(prev => [newOrder, ...prev]);
    return trackingCode;
  };

  const updateOrderStatus = (
    orderId: string,
    status: OrderRequest['status'],
    notes?: string,
    assignedPic?: string
  ) => {
    setOrders(prev =>
      prev.map(o => {
        if (o.id === orderId) {
          return {
            ...o,
            status,
            internalNotes: notes !== undefined ? notes : o.internalNotes,
            assignedPic: assignedPic !== undefined ? assignedPic : o.assignedPic
          };
        }
        return o;
      })
    );
  };

  // Calendar actions
  const addCalendarEvent = (eventData: Omit<CalendarEvent, 'id'>) => {
    const id = `evt-${Date.now().toString().slice(-4)}`;
    const newEvent: CalendarEvent = {
      ...eventData,
      id,
      syncKolibrinest: true,
      googleCalendarUrl: `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
        eventData.title
      )}`
    };
    setCalendarEvents(prev => [...prev, newEvent]);
  };

  // Financial and Annual Budget actions
  const addFinancialExpense = (expenseData: Omit<DivisionFinancialPlan, 'id'>) => {
    const id = `fin-${Date.now().toString().slice(-4)}`;
    const newExpense: DivisionFinancialPlan = {
      ...expenseData,
      id,
      googleDriveReceiptUrl: `https://drive.google.com/drive/folders/RECEIPT-${id}`
    };
    setFinancialPlans(prev => [newExpense, ...prev]);
  };

  const updateAnnualBudgetAllocation = (
    division: keyof AnnualBudgetState['divisionAllocations'],
    amount: number
  ) => {
    setAnnualBudget(prev => {
      const updatedAllocations = { ...prev.divisionAllocations, [division]: amount };
      const newTotal = Object.values(updatedAllocations).reduce((acc, curr) => acc + curr, 0);
      return {
        ...prev,
        totalAnnualBudget: newTotal,
        divisionAllocations: updatedAllocations
      };
    });
  };

  // Sales actions
  const addSalesPlan = (planData: Omit<SalesPlan, 'id'>) => {
    const id = `sp-${Date.now().toString().slice(-4)}`;
    setSalesPlans(prev => [{ ...planData, id, googleDriveUrl: `https://drive.google.com/drive/folders/DEAL-${id}` }, ...prev]);
  };

  const updateSalesPlan = (plan: SalesPlan) => {
    setSalesPlans(prev => prev.map(p => (p.id === plan.id ? plan : p)));
  };

  // Marketing actions
  const addMarketingCampaign = (campaignData: Omit<MarketingCampaign, 'id'>) => {
    const id = `cmp-${Date.now().toString().slice(-4)}`;
    setMarketingCampaigns(prev => [{ ...campaignData, id, googleDriveUrl: `https://drive.google.com/drive/folders/CAMPAIGN-${id}` }, ...prev]);
  };

  const addWeeklyContent = (contentData: Omit<WeeklyContentItem, 'id'>) => {
    const id = `cnt-${Date.now().toString().slice(-4)}`;
    setWeeklyContent(prev => [{ ...contentData, id, googleDriveUrl: `https://drive.google.com/drive/folders/CONTENT-${id}` }, ...prev]);
  };

  const updateWeeklyContentStatus = (id: string, status: WeeklyContentItem['status']) => {
    setWeeklyContent(prev => prev.map(c => (c.id === id ? { ...c, status } : c)));
  };

  // UFUK.Cendekia actions
  const addArticleComment = (articleId: string, commentText: string) => {
    if (!commentText.trim()) return;
    const author = currentUser || {
      name: 'Pembaca Cendekia',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      email: 'user@kolibrinest.id'
    };

    const newComment: ArticleComment = {
      id: `cm-${Date.now()}`,
      userName: author.name,
      userAvatar: author.avatar,
      userEmail: author.email,
      text: commentText.trim(),
      timestamp: new Date().toLocaleString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }) + ' WIB'
    };

    setUfukArticles(prev =>
      prev.map(art => {
        if (art.id === articleId) {
          return {
            ...art,
            comments: [...art.comments, newComment],
            lastUpdated: 'Baru saja'
          };
        }
        return art;
      })
    );
  };

  const updateArticleReview = (
    articleId: string,
    title: string,
    category: UfukArticleReview['category'],
    fullContent: string,
    status: UfukArticleReview['status']
  ) => {
    setUfukArticles(prev =>
      prev.map(art => {
        if (art.id === articleId) {
          return {
            ...art,
            title,
            category,
            fullContent,
            contentSnippet: fullContent.slice(0, 140) + '...',
            status,
            lastUpdated: 'Baru saja diperbarui'
          };
        }
        return art;
      })
    );
  };

  const addLibraryItem = (itemData: Omit<UfukLibraryItem, 'id' | 'lastUpdated' | 'borrowersCount'>) => {
    const id = `lib-${Date.now().toString().slice(-4)}`;
    const newItem: UfukLibraryItem = {
      ...itemData,
      id,
      borrowersCount: 0,
      googleDriveUrl: itemData.googleDriveUrl || `https://drive.google.com/drive/folders/LIB-${id}`,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    setLibraryItems(prev => [newItem, ...prev]);
  };

  const updateLibraryItem = (updated: UfukLibraryItem) => {
    setLibraryItems(prev => prev.map(item => (item.id === updated.id ? updated : item)));
  };

  const addUfukActivity = (actData: Omit<UfukActivityKanban, 'id'>) => {
    const id = `act-${Date.now().toString().slice(-4)}`;
    const newAct: UfukActivityKanban = {
      ...actData,
      id,
      googleDriveUrl: actData.googleDriveUrl || `https://drive.google.com/drive/folders/UFUK-ACT-${id}`
    };
    setUfukActivities(prev => [newAct, ...prev]);
  };

  const updateUfukActivityStatus = (activityId: string, status: UfukActivityKanban['status']) => {
    setUfukActivities(prev => prev.map(a => (a.id === activityId ? { ...a, status } : a)));
  };

  // Settings
  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const resetToInitialData = () => {
    localStorage.clear();
    setTasks(INITIAL_TASKS);
    setPersonnel(INITIAL_PERSONNEL);
    setCalendarEvents(INITIAL_CALENDAR_EVENTS);
    setSalesPlans(INITIAL_SALES_PLANS);
    setMarketingCampaigns(INITIAL_MARKETING_CAMPAIGNS);
    setWeeklyContent(INITIAL_WEEKLY_CONTENT);
    setUfukArticles(INITIAL_UFUK_ARTICLE_REVIEWS);
    setLibraryItems(INITIAL_UFUK_LIBRARY);
    setUfukActivities(INITIAL_UFUK_ACTIVITIES);
    setFinancialPlans(INITIAL_FINANCIAL_PLANS);
    setOrders(INITIAL_ORDERS);
    setAnnualBudget(INITIAL_ANNUAL_BUDGET);
    setSettings(INITIAL_SETTINGS);
    setCurrentUser(INITIAL_USERS[0]);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        tasks,
        personnel,
        collaborations,
        projections,
        calendarEvents,
        salesPlans,
        salesMetrics,
        marketingCampaigns,
        weeklyContent,
        marketingMetric,
        financialPlans,
        orders,
        annualBudget,
        settings,
        activeTab,
        selectedDivisionSubTab,
        searchQuery,
        ufukMediaFeed,
        ufukArticles,
        libraryItems,
        ufukActivities,
        isWorkspaceSyncing,
        lastWorkspaceSync,
        triggerWorkspaceSync,
        loginWithEmail,
        logout,
        switchUser,
        setActiveTab,
        setSelectedDivisionSubTab,
        setSearchQuery,
        addTask,
        updateTaskStatus,
        updateTask,
        deleteTask,
        submitGuestOrder,
        updateOrderStatus,
        addCalendarEvent,
        addFinancialExpense,
        updateAnnualBudgetAllocation,
        addSalesPlan,
        updateSalesPlan,
        addMarketingCampaign,
        addWeeklyContent,
        updateWeeklyContentStatus,
        addArticleComment,
        updateArticleReview,
        addLibraryItem,
        updateLibraryItem,
        addUfukActivity,
        updateUfukActivityStatus,
        updateSettings,
        resetToInitialData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
