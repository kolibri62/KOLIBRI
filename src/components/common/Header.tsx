import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BrandLogo } from './BrandLogo';
import {
  Search,
  Plus,
  LogOut,
  ChevronDown,
  Calendar,
  CheckCircle2,
  Menu,
  X,
  RefreshCw,
  FolderOpen,
  FileText,
  Sheet,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

interface HeaderProps {
  onOpenNewTaskModal: () => void;
  onOpenCalendarModal: () => void;
  onToggleMobileSidebar: () => void;
  mobileSidebarOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenNewTaskModal,
  onOpenCalendarModal,
  onToggleMobileSidebar,
  mobileSidebarOpen
}) => {
  const {
    currentUser,
    users,
    activeTab,
    selectedDivisionSubTab,
    searchQuery,
    setSearchQuery,
    switchUser,
    logout,
    isWorkspaceSyncing,
    lastWorkspaceSync,
    triggerWorkspaceSync
  } = useApp();

  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [showWorkspaceModal, setShowWorkspaceModal] = useState(false);

  const getBreadcrumbTitle = () => {
    switch (activeTab) {
      case 'overview':
        return 'Overview / Ruang Kendali Proyek';
      case 'divisions':
        if (selectedDivisionSubTab === 'ufuk_cendekia') {
          return 'Divisi / UFUK.Cendekia (Ufukmedia.co & Perpustakaan)';
        }
        return `Divisi / ${selectedDivisionSubTab.charAt(0).toUpperCase() + selectedDivisionSubTab.slice(1)}`;
      case 'personal':
        return 'Pribadi / Ruang Kerja Saya';
      case 'orders':
        return 'Order / Permintaan Masuk';
      case 'budget':
        return 'Budget / Anggaran Tahunan';
      case 'settings':
        return 'Pengaturan / Sistem & Profil';
      default:
        return 'Dashboard';
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="flex items-center justify-between gap-3 px-4 lg:px-8 h-16">
        {/* Zone 1: Mobile toggle & Breadcrumb Trail */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onToggleMobileSidebar}
            aria-label="Toggle navigation menu"
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="lg:hidden">
            <BrandLogo size="sm" />
          </div>

          <div className="hidden lg:flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
            <span className="font-bold text-red-600 dark:text-red-500">KOLIBRINEST.ID</span>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">/</span>
            <span className="text-red-600 dark:text-red-400 font-medium truncate max-w-sm">
              {getBreadcrumbTitle()}
            </span>
          </div>
        </div>

        {/* Zone 2: Live Search input */}
        <div className="flex-1 max-w-md mx-2 hidden sm:block">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Cari proyek, artikel UFUK, tiket order, atau personel..."
              className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-100 dark:bg-slate-800/80 border border-transparent focus:border-red-500 rounded-lg text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Zone 3: Google Workspace Indicator & Primary Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Google Workspace Live Sync Pill */}
          <button
            onClick={() => setShowWorkspaceModal(true)}
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Klik untuk membuka status sinkronisasi Google Workspace"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-slate-700 dark:text-slate-300">Google Workspace</span>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-semibold">
              Terhubung
            </span>
          </button>

          {/* Quick Schedule button */}
          <button
            onClick={onOpenCalendarModal}
            className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors whitespace-nowrap"
            title="Tambah Agenda Kalender Kolibrinest"
          >
            <Calendar className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
            <span>Agenda</span>
          </button>

          {/* Quick New Task Primary Button */}
          <button
            onClick={onOpenNewTaskModal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 active:bg-red-800 rounded-lg shadow-sm transition-all whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Project Baru</span>
            <span className="sm:hidden">Baru</span>
          </button>

          {/* User Profile zone & Switcher */}
          {currentUser && (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1 pl-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
              >
                <div className="w-7 h-7 rounded-full overflow-hidden bg-slate-200 shrink-0 border border-slate-300 dark:border-slate-600">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="hidden xl:flex flex-col text-left">
                  <span className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate max-w-[120px] leading-tight">
                    {currentUser.name}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider leading-tight">
                    {currentUser.division === 'ufuk_cendekia' ? 'UFUK' : currentUser.division}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </button>

              {userDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl py-2 z-50 text-xs"
                  onClick={() => setUserDropdownOpen(false)}
                >
                  <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                    <p className="font-semibold text-slate-900 dark:text-slate-100">{currentUser.name}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{currentUser.email}</p>
                    <div className="mt-1 flex items-center gap-1.5">
                      <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
                      <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-medium capitalize">
                        {currentUser.role}
                      </span>
                    </div>
                  </div>

                  <div className="py-1">
                    <p className="px-3 py-1 text-[10px] font-semibold uppercase text-slate-400 tracking-wider">
                      Ganti Akun Personel Kolibrinest:
                    </p>
                    {users.map(u => (
                      <button
                        key={u.id}
                        onClick={() => switchUser(u.id)}
                        className={`w-full flex items-center justify-between px-3 py-1.5 text-left hover:bg-slate-50 dark:hover:bg-slate-800 ${
                          u.id === currentUser.id
                            ? 'bg-red-50/70 dark:bg-red-950/30 text-red-700 dark:text-red-400 font-medium'
                            : 'text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <img
                            src={u.avatar}
                            alt={u.name}
                            className="w-5 h-5 rounded-full object-cover shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <span className="truncate">{u.name}</span>
                        </div>
                        {u.id === currentUser.id && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="border-t border-slate-100 dark:border-slate-800 pt-1 mt-1">
                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-2 px-3 py-2 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 text-left font-medium"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Keluar (Halaman Login / Order Tamu)</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Google Workspace Sync Status Modal */}
      {showWorkspaceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Status Sinkronisasi Google Workspace
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Akun: <strong>management@kolibrinest.id</strong>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowWorkspaceModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              {/* Google Drive Status */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <FolderOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">Google Drive Project Storage</div>
                    <div className="text-[10px] text-slate-500">Tautan folder untuk setiap project & riset UFUK</div>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded">
                  AKTIF
                </span>
              </div>

              {/* Google Calendar Status */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">Google Calendar Sync</div>
                    <div className="text-[10px] text-slate-500">Jadwal rapat, deadline, bedah buku & rilis artikel</div>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded">
                  AKTIF
                </span>
              </div>

              {/* Google Docs Review */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">Google Docs Article Review</div>
                    <div className="text-[10px] text-slate-500">Kolaborasi naskah editorial UFUK.Cendekia</div>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded">
                  AKTIF
                </span>
              </div>

              {/* Google Sheets Budget Ledger */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Sheet className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">Google Sheets Budget Sync</div>
                    <div className="text-[10px] text-slate-500">Ekspor buku kas Rp 1.5 Miliar terintegrasi</div>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded">
                  AKTIF
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-400 font-mono">
                Sinkron terakhir: {lastWorkspaceSync}
              </span>
              <button
                onClick={triggerWorkspaceSync}
                disabled={isWorkspaceSyncing}
                className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isWorkspaceSyncing ? 'animate-spin' : ''}`} />
                <span>{isWorkspaceSyncing ? 'Menyinkronkan...' : 'Sinkronkan Sekarang'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
