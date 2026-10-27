import React, { useState } from 'react';
import { useApp, MainTabType, DivisionSubTabType } from '../../context/AppContext';
import { BrandLogo } from './BrandLogo';
import {
  LayoutDashboard,
  Layers,
  UserCheck,
  Inbox,
  Wallet,
  Settings,
  ChevronDown,
  TrendingUp,
  Megaphone,
  BookOpen,
  Calendar,
  Sparkles,
  Users
} from 'lucide-react';

interface SidebarProps {
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, onCloseMobile }) => {
  const {
    activeTab,
    setActiveTab,
    selectedDivisionSubTab,
    setSelectedDivisionSubTab,
    tasks,
    orders,
    annualBudget,
    financialPlans,
    currentUser
  } = useApp();

  const [divisionAccordionOpen, setDivisionAccordionOpen] = useState(true);

  // Compute stats for badges
  const pendingTasksCount = tasks.filter(t => t.status === 'todo').length;
  const pendingOrdersCount = orders.filter(o => o.status === 'submitted' || o.status === 'reviewing').length;

  const totalSpent = financialPlans.reduce((acc, f) => acc + f.spentAmount, 0);
  const budgetUtilization = Math.round((totalSpent / annualBudget.totalAnnualBudget) * 100);

  const handleNav = (tab: MainTabType, subTab?: DivisionSubTabType) => {
    setActiveTab(tab);
    if (subTab) {
      setSelectedDivisionSubTab(subTab);
    }
    onCloseMobile();
  };

  const navItems = [
    {
      id: 'overview' as MainTabType,
      label: 'Overview',
      icon: LayoutDashboard,
      badge: `${tasks.length} Task`
    },
    {
      id: 'personal' as MainTabType,
      label: 'Pribadi',
      icon: UserCheck,
      badge: currentUser
        ? `${
            tasks.filter(
              t =>
                t.assigneeId === currentUser.id ||
                t.assigneeName.toLowerCase().includes(currentUser.name.toLowerCase().split(' ')[0])
            ).filter(t => t.status !== 'done').length
          }`
        : undefined
    },
    {
      id: 'orders' as MainTabType,
      label: 'Order Request',
      icon: Inbox,
      badge: pendingOrdersCount > 0 ? `${pendingOrdersCount} Baru` : undefined,
      badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
    },
    {
      id: 'budget' as MainTabType,
      label: 'Budget Tahunan',
      icon: Wallet,
      badge: `${budgetUtilization}%`
    },
    {
      id: 'settings' as MainTabType,
      label: 'Pengaturan',
      icon: Settings
    }
  ];

  const divisionSubItems = [
    {
      id: 'sales' as DivisionSubTabType,
      label: 'Divisi Sales',
      icon: TrendingUp,
      desc: 'Target & Finansial Iklan'
    },
    {
      id: 'marketing' as DivisionSubTabType,
      label: 'Divisi Marketing',
      icon: Megaphone,
      desc: 'Kampanye & Rilis Konten'
    },
    {
      id: 'ufuk_cendekia' as DivisionSubTabType,
      label: 'UFUK.Cendekia',
      icon: BookOpen,
      desc: 'Ufukmedia & Perpustakaan'
    }
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-slate-900 text-slate-200 select-none">
      {/* Brand Zone */}
      <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between">
        <BrandLogo size="md" showSubtitle />
      </div>

      {/* Nav List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <div className="px-3 pb-2 text-[10px] font-semibold tracking-wider uppercase text-slate-400">
          Menu Utama
        </div>

        {/* Overview Link */}
        <button
          onClick={() => handleNav('overview')}
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
            activeTab === 'overview'
              ? 'bg-red-600 text-white shadow-sm font-semibold'
              : 'text-slate-300 hover:bg-slate-800 hover:text-white'
          }`}
        >
          <div className="flex items-center gap-3">
            <LayoutDashboard className="w-4 h-4 shrink-0" />
            <span className="whitespace-nowrap">Overview Proyek</span>
          </div>
          <span className="text-[10px] tabular-nums px-1.5 py-0.5 rounded bg-slate-800/80 text-slate-300 font-mono">
            {pendingTasksCount} to-do
          </span>
        </button>

        {/* Divisi Accordion with Sub-Pages */}
        <div className="pt-2">
          <div className="flex items-center justify-between px-3 py-1.5 text-[10px] font-semibold tracking-wider uppercase text-slate-400">
            <span>Divisi Kolibrinest</span>
            <button
              onClick={() => setDivisionAccordionOpen(!divisionAccordionOpen)}
              className="text-slate-400 hover:text-slate-200"
              aria-label="Toggle divisions"
            >
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform ${
                  divisionAccordionOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>

          {divisionAccordionOpen && (
            <div className="space-y-0.5 mt-1 pl-2">
              {divisionSubItems.map(item => {
                const isSelected = activeTab === 'divisions' && selectedDivisionSubTab === item.id;
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNav('divisions', item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors ${
                      isSelected
                        ? 'bg-slate-800 text-red-400 font-semibold border-l-2 border-red-500'
                        : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </div>
                    <span className="text-[9px] uppercase tracking-wider text-slate-500 font-mono">
                      Sub
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Remaining Nav Items */}
        <div className="pt-3 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-semibold tracking-wider uppercase text-slate-400">
            Fokus & Operasional
          </div>

          {navItems
            .filter(item => item.id !== 'overview')
            .map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-red-600 text-white shadow-sm font-semibold'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="whitespace-nowrap">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                        item.badgeColor || (isActive ? 'bg-red-700 text-white' : 'bg-slate-800 text-slate-300')
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
        </div>
      </div>

      {/* Annual Budget Quick Widget in Sidebar Footer */}
      <div className="p-4 mx-3 mb-3 bg-slate-800/80 rounded-xl border border-slate-700/60 text-xs">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] text-slate-400 font-medium">Serapan Budget 2026</span>
          <span className="text-[11px] font-mono text-red-400 font-semibold">{budgetUtilization}%</span>
        </div>
        <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden mb-2">
          <div
            className="h-full bg-red-500 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(100, budgetUtilization)}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-[10px] text-slate-400 tabular-nums font-mono">
          <span>Terpakai: Rp {(totalSpent / 1000000).toFixed(0)} Jt</span>
          <span>Pagu: 1.5 M</span>
        </div>
      </div>

      {/* Active User mini card */}
      {currentUser && (
        <div className="p-3 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-700 shrink-0">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="truncate">
              <div className="text-xs font-semibold text-white truncate">{currentUser.name}</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider truncate">
                {currentUser.role}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-64 xl:w-72 h-screen sticky top-0 shrink-0 border-r border-slate-800">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onCloseMobile} />
          <div className="relative w-72 max-w-[85vw] h-full shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
