import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TaskStatus, DivisionType } from '../../types';
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  Users,
  Calendar,
  Layers,
  ArrowRight,
  TrendingUp,
  Flame,
  Check,
  ChevronRight,
  Plus,
  Briefcase,
  Target,
  Sparkles,
  Search,
  FolderOpen,
  ExternalLink
} from 'lucide-react';

interface OverviewTabProps {
  onOpenNewTaskModal: () => void;
  onOpenCalendarModal: () => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  onOpenNewTaskModal,
  onOpenCalendarModal
}) => {
  const {
    tasks,
    updateTaskStatus,
    personnel,
    calendarEvents,
    collaborations,
    projections,
    financialPlans,
    annualBudget,
    searchQuery
  } = useApp();

  const [divisionFilter, setDivisionFilter] = useState<string>('all');
  const [selectedCalendarDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  // Filter tasks based on division and global/local search
  const filteredTasks = tasks.filter(t => {
    const matchesDiv = divisionFilter === 'all' || t.division === divisionFilter;
    const matchesSearch =
      !searchQuery ||
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.assigneeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesDiv && matchesSearch;
  });

  const todoTasks = filteredTasks.filter(t => t.status === 'todo');
  const doingTasks = filteredTasks.filter(t => t.status === 'doing');
  const doneTasks = filteredTasks.filter(t => t.status === 'done');

  // Stats calculation
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'done').length;
  const inProgressTasks = tasks.filter(t => t.status === 'doing').length;
  const activePersonnel = personnel.length;
  const avgUtilization = Math.round(
    personnel.reduce((acc, p) => acc + p.utilizationPercent, 0) / (personnel.length || 1)
  );
  const totalSpent = financialPlans.reduce((acc, f) => acc + f.spentAmount, 0);

  // Upcoming calendar events
  const upcomingEvents = [...calendarEvents].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Banner & High-Level KPIs */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Ruang Kendali & Overview Proyek
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Pemantauan terpadu status pekerjaan, tautan Google Drive proyek, kalender Kolibrinest.id, beban kerja personel, dan proyeksi masa depan.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenNewTaskModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 active:bg-red-800 rounded-lg shadow-sm transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Input Project Baru</span>
            </button>
          </div>
        </div>

        {/* 4 Primary Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
              <span className="text-xs font-medium">Sedang Dikerjakan</span>
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">
              {inProgressTasks}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              dari {totalTasks} total pekerjaan terdaftar
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
              <span className="text-xs font-medium">Pekerjaan Selesai</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-bold font-mono tabular-nums text-emerald-600 dark:text-emerald-400">
              {completedTasks}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Tingkat penyelesaian: {Math.round((completedTasks / (totalTasks || 1)) * 100)}%
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
              <span className="text-xs font-medium">Personel & Beban Kerja</span>
              <Users className="w-4 h-4 text-red-500" />
            </div>
            <div className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">
              {avgUtilization}%
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Rata-rata utilisasi dari {activePersonnel} personel aktif
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
              <span className="text-xs font-medium">Serapan Anggaran</span>
              <TrendingUp className="w-4 h-4 text-red-600 dark:text-red-400" />
            </div>
            <div className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">
              Rp {(totalSpent / 1000000).toFixed(0)} Jt
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Pagu tahunan: Rp {(annualBudget.totalAnnualBudget / 1000000000).toFixed(1)} Miliar
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 1: WORK BOARD (TO DO, DOING, DONE) */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-red-600 dark:text-red-400" />
              <span>Status Alur Kerja (To Do, Doing, Done) & Tautan Google Drive</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Setiap proyek dilengkapi tautan Google Drive untuk sinkronisasi dokumen & aset.
            </p>
          </div>

          {/* Division Filter Segmented Control */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-x-auto max-w-full">
            {[
              { id: 'all', label: 'Semua' },
              { id: 'sales', label: 'Sales' },
              { id: 'marketing', label: 'Marketing' },
              { id: 'ufuk_cendekia', label: 'UFUK.Cendekia' },
              { id: 'cross-division', label: 'Kolaborasi' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setDivisionFilter(tab.id)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  divisionFilter === tab.id
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3-Column Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* TO DO COLUMN */}
          <div className="bg-slate-50/80 dark:bg-slate-850/60 rounded-xl p-3.5 border border-slate-200/80 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  To Do (Perlu Dikerjakan)
                </span>
              </div>
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                {todoTasks.length}
              </span>
            </div>

            <div className="space-y-2.5">
              {todoTasks.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-400 border border-dashed border-slate-300 dark:border-slate-700 rounded-lg">
                  Tidak ada pekerjaan To Do pada filter ini.
                </div>
              ) : (
                todoTasks.map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onStatusChange={newStatus => updateTaskStatus(task.id, newStatus)}
                  />
                ))
              )}
            </div>
          </div>

          {/* DOING COLUMN */}
          <div className="bg-amber-50/40 dark:bg-amber-950/10 rounded-xl p-3.5 border border-amber-200/60 dark:border-amber-900/40 space-y-3">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-200">
                  Doing (Sedang Dilakukan)
                </span>
              </div>
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-amber-200/80 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200">
                {doingTasks.length}
              </span>
            </div>

            <div className="space-y-2.5">
              {doingTasks.length === 0 ? (
                <div className="p-6 text-center text-xs text-amber-700/60 dark:text-amber-400/60 border border-dashed border-amber-300 dark:border-amber-800 rounded-lg">
                  Tidak ada pekerjaan sedang berjalan.
                </div>
              ) : (
                doingTasks.map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onStatusChange={newStatus => updateTaskStatus(task.id, newStatus)}
                  />
                ))
              )}
            </div>
          </div>

          {/* DONE COLUMN */}
          <div className="bg-emerald-50/40 dark:bg-emerald-950/10 rounded-xl p-3.5 border border-emerald-200/60 dark:border-emerald-900/40 space-y-3">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 dark:text-emerald-200">
                  Done (Telah Diselesaikan)
                </span>
              </div>
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-emerald-200/80 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-200">
                {doneTasks.length}
              </span>
            </div>

            <div className="space-y-2.5">
              {doneTasks.length === 0 ? (
                <div className="p-6 text-center text-xs text-emerald-700/60 dark:text-emerald-400/60 border border-dashed border-emerald-300 dark:border-emerald-800 rounded-lg">
                  Belum ada pekerjaan yang diselesaikan pada filter ini.
                </div>
              ) : (
                doneTasks.map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onStatusChange={newStatus => updateTaskStatus(task.id, newStatus)}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: KALENDER SINKRONISASI KOLIBRINEST.ID & AGENDA */}
      <div className="bg-white dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-red-600 dark:text-red-400" />
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Kalender Kerja Terpadu Kolibrinest.id
              </h2>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-red-100 dark:bg-red-950/60 text-red-800 dark:text-red-300 font-semibold">
                Sinkron Google Calendar
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Jadwal rapat, tenggat waktu tender, rilis kampanye marketing, simposium bedah buku, dan publikasi UFUK.Cendekia.
            </p>
          </div>

          <button
            onClick={onOpenCalendarModal}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-lg transition-colors shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Agenda Baru</span>
          </button>
        </div>

        {/* Calendar Event Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {upcomingEvents.map(evt => (
            <div
              key={evt.id}
              className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 hover:border-red-500/40 transition-colors space-y-2"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono font-medium text-red-700 dark:text-red-400">
                  {evt.date}
                </span>
                <span className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider">
                  {evt.division === 'ufuk_cendekia' ? 'UFUK.Cendekia' : evt.division}
                </span>
              </div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-snug">
                {evt.title}
              </h3>
              {evt.time && (
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>{evt.time}</span>
                </div>
              )}
              {evt.location && (
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                  Lokasi: {evt.location}
                </p>
              )}
              {evt.googleCalendarUrl && (
                <a
                  href={evt.googleCalendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-blue-600 dark:text-blue-400 font-medium hover:underline inline-flex items-center gap-1 pt-1"
                >
                  <span>Buka di Google Calendar</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: BEBAN KERJA PERSONEL (WORKLOAD MONITOR) */}
      <div className="bg-white dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-red-600 dark:text-red-400" />
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Beban Kerja Personel & Anggota Tim
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Pantau alokasi jam kerja, kapasitas per minggu, dan fokus utama masing-masing anggota.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="py-2.5 px-3">Personel / Anggota</th>
                <th className="py-2.5 px-3">Divisi</th>
                <th className="py-2.5 px-3">Tugas Aktif</th>
                <th className="py-2.5 px-3">Alokasi Jam</th>
                <th className="py-2.5 px-3">Utilisasi Beban</th>
                <th className="py-2.5 px-3">Fokus Pekerjaan Saat Ini</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {personnel.map(p => (
                <tr key={p.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={p.avatar}
                        alt={p.name}
                        className="w-7 h-7 rounded-full object-cover shrink-0 border border-slate-200 dark:border-slate-700"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="font-bold text-slate-900 dark:text-slate-100">{p.name}</div>
                        <div className="text-[10px] text-slate-400">{p.role}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3 font-semibold uppercase text-[10px] text-slate-500">
                    {p.division === 'ufuk_cendekia' ? 'UFUK.Cendekia' : p.division}
                  </td>
                  <td className="py-3 px-3 font-mono tabular-nums font-semibold text-slate-700 dark:text-slate-300">
                    {p.activeTasks} aktif
                  </td>
                  <td className="py-3 px-3 font-mono tabular-nums text-slate-600 dark:text-slate-400">
                    {p.allocatedHoursWeek} / {p.capacityHoursWeek} jam
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            p.utilizationPercent > 90
                              ? 'bg-rose-500'
                              : p.utilizationPercent >= 75
                              ? 'bg-emerald-500'
                              : 'bg-teal-500'
                          }`}
                          style={{ width: `${Math.min(100, p.utilizationPercent)}%` }}
                        />
                      </div>
                      <span className="font-mono font-semibold tabular-nums text-[11px]">
                        {p.utilizationPercent}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-slate-600 dark:text-slate-300 max-w-xs truncate">
                    {p.currentFocus}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 4: KOLABORASI ANTAR DIVISI & PROYEKSI KERJA MENDATANG */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Kolaborasi Antar Divisi */}
        <div className="bg-white dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 p-5 space-y-4">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Target className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Kolaborasi Antar Divisi (Cross-Division)</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Inisiatif strategis gabungan antara Sales, Marketing, dan UFUK.Cendekia.
            </p>
          </div>

          <div className="space-y-3.5">
            {collaborations.map(collab => (
              <div
                key={collab.id}
                className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 space-y-2"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900 dark:text-white">{collab.title}</span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                    {collab.progress}%
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">{collab.description}</p>
                <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                    style={{ width: `${collab.progress}%` }}
                  />
                </div>
                <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 pt-1">
                  <span>Target: {collab.targetMilestone}</span>
                  {collab.googleDriveUrl && (
                    <a
                      href={collab.googleDriveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-600 dark:text-emerald-400 font-semibold inline-flex items-center gap-1 hover:underline"
                    >
                      <FolderOpen className="w-3 h-3" />
                      <span>Folder Drive</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Proyeksi Kerja Masa Mendatang */}
        <div className="bg-white dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 p-5 space-y-4">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Proyeksi Kerja di Masa Mendatang</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Roadmap strategis Q4 2026 s/d 2027 untuk estimasi output dan pendapatan.
            </p>
          </div>

          <div className="space-y-3">
            {projections.map(proj => (
              <div
                key={proj.id}
                className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {proj.period}
                    </span>
                    <span className="text-[10px] uppercase font-semibold text-emerald-600 dark:text-emerald-400">
                      {proj.division === 'ufuk_cendekia' ? 'UFUK' : proj.division}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-medium text-slate-500">
                    Confidence: {proj.confidence}
                  </span>
                </div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white">{proj.title}</h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">{proj.strategicGoal}</p>
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-700 dark:text-slate-300 pt-1 border-t border-slate-200/60 dark:border-slate-800">
                  <span>Output: {proj.projectedOutput}</span>
                  {proj.projectedRevenue && (
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                      Est. Rp {(proj.projectedRevenue / 1000000).toFixed(0)} Jt
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable TaskCard Component for Kanban with Google Drive Link
interface TaskCardProps {
  task: any;
  onStatusChange: (status: TaskStatus) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onStatusChange }) => {
  const priorityColors = {
    urgent: 'text-rose-600 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900',
    high: 'text-amber-600 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900',
    medium: 'text-teal-600 bg-teal-50 dark:bg-teal-950/40 border-teal-200 dark:border-teal-900',
    low: 'text-slate-600 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700'
  };

  const divisionDisplay =
    task.division === 'ufuk_cendekia' ? 'UFUK.Cendekia' : task.division.toUpperCase();

  return (
    <div className="bg-white dark:bg-slate-900 p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all space-y-2.5">
      <div className="flex items-center justify-between text-[10px]">
        <span className="font-semibold uppercase tracking-wider text-slate-400 font-mono">
          {divisionDisplay}
        </span>
        <span
          className={`px-1.5 py-0.5 rounded border text-[10px] font-semibold uppercase tracking-wider ${
            priorityColors[task.priority as keyof typeof priorityColors]
          }`}
        >
          {task.priority}
        </span>
      </div>

      <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-snug">
        {task.title}
      </h4>

      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
        {task.description}
      </p>

      {/* Google Drive Link for this Project */}
      {task.googleDriveUrl && (
        <div className="pt-0.5">
          <a
            href={task.googleDriveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-slate-50 dark:bg-slate-800/80 hover:bg-red-50 dark:hover:bg-red-950/30 border border-slate-200 dark:border-slate-700 hover:border-red-500/40 text-[10px] text-red-700 dark:text-red-400 font-medium transition-colors"
          >
            <FolderOpen className="w-3 h-3 text-red-600 dark:text-red-400 shrink-0" />
            <span className="truncate max-w-[170px]">Google Drive Proyek</span>
            <ExternalLink className="w-2.5 h-2.5 shrink-0" />
          </a>
        </div>
      )}

      {/* Progress & due date */}
      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
        <span className="font-mono text-slate-600 dark:text-slate-300">{task.assigneeName}</span>
        <span className="font-mono text-red-600 dark:text-red-400">
          Tenggat: {task.dueDate}
        </span>
      </div>

      {/* Interactive Status Switcher Buttons */}
      <div className="flex items-center gap-1 pt-1">
        <span className="text-[10px] text-slate-400 mr-1">Ubah ke:</span>
        {task.status !== 'todo' && (
          <button
            onClick={() => onStatusChange('todo')}
            className="px-2 py-0.5 text-[10px] font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 rounded"
          >
            To Do
          </button>
        )}
        {task.status !== 'doing' && (
          <button
            onClick={() => onStatusChange('doing')}
            className="px-2 py-0.5 text-[10px] font-medium bg-amber-100 dark:bg-amber-950/60 hover:bg-amber-200 text-amber-800 dark:text-amber-300 rounded"
          >
            Doing
          </button>
        )}
        {task.status !== 'done' && (
          <button
            onClick={() => onStatusChange('done')}
            className="px-2 py-0.5 text-[10px] font-medium bg-emerald-100 dark:bg-emerald-950/60 hover:bg-emerald-200 text-emerald-800 dark:text-emerald-300 rounded"
          >
            Done
          </button>
        )}
      </div>
    </div>
  );
};
