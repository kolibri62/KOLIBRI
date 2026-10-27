import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SalesPlan, DivisionFinancialPlan } from '../../types';
import {
  TrendingUp,
  DollarSign,
  Calendar,
  CheckCircle2,
  Clock,
  Plus,
  Briefcase,
  Layers,
  ArrowUpRight,
  Filter,
  BarChart3,
  Receipt,
  FolderGit2,
  ExternalLink
} from 'lucide-react';

interface SalesDivisionTabProps {
  onOpenCalendarModal: () => void;
}

export const SalesDivisionTab: React.FC<SalesDivisionTabProps> = ({ onOpenCalendarModal }) => {
  const {
    salesPlans,
    addSalesPlan,
    updateSalesPlan,
    salesMetrics,
    calendarEvents,
    financialPlans,
    addFinancialExpense
  } = useApp();

  // Filter financial plans for Sales division
  const salesFinancials = financialPlans.filter(f => f.division === 'sales');
  const totalSalesBudget = salesFinancials.reduce((acc, f) => acc + f.budgetedAmount, 0);
  const totalSalesSpent = salesFinancials.reduce((acc, f) => acc + f.spentAmount, 0);
  const salesEvents = calendarEvents.filter(e => e.division === 'sales' || e.division === 'all');

  // Modal state for new sales plan
  const [showAddPlanModal, setShowAddPlanModal] = useState(false);
  const [newPlanTitle, setNewPlanTitle] = useState('');
  const [newPlanClient, setNewPlanClient] = useState('');
  const [newPlanValue, setNewPlanValue] = useState('');
  const [newPlanClosing, setNewPlanClosing] = useState('');
  const [newPlanStage, setNewPlanStage] = useState<SalesPlan['stage']>('Pitching');
  const [newPlanPic, setNewPlanPic] = useState('Rina Kusuma');
  const [newPlanNotes, setNewPlanNotes] = useState('');

  // Modal state for new sales expense
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [expenseTitle, setExpenseTitle] = useState('');
  const [expenseCategory, setExpenseCategory] = useState<DivisionFinancialPlan['category']>('iklan_ads');
  const [expenseBudget, setExpenseBudget] = useState('');
  const [expenseSpent, setExpenseSpent] = useState('');
  const [expenseDesc, setExpenseDesc] = useState('');
  const [expenseReceipt, setExpenseReceipt] = useState('');

  const currentMetric = salesMetrics[0] || {
    revenueTarget: 450000000,
    revenueAchieved: 385000000,
    dealsTarget: 10,
    dealsClosed: 8,
    leadsGenerated: 142,
    conversionRate: 24.5
  };

  const achievementRate = Math.round((currentMetric.revenueAchieved / currentMetric.revenueTarget) * 100);

  const handleCreatePlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlanTitle || !newPlanClient) return;

    addSalesPlan({
      title: newPlanTitle,
      clientOrSector: newPlanClient,
      potentialValue: newPlanValue ? parseInt(newPlanValue.replace(/\D/g, ''), 10) : 50000000,
      targetClosingDate: newPlanClosing || '2026-11-30',
      stage: newPlanStage,
      pic: newPlanPic,
      notes: newPlanNotes
    });

    setShowAddPlanModal(false);
    setNewPlanTitle('');
    setNewPlanClient('');
    setNewPlanValue('');
    setNewPlanNotes('');
  };

  const handleCreateExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expenseTitle) return;

    addFinancialExpense({
      division: 'sales',
      title: expenseTitle,
      category: expenseCategory,
      budgetedAmount: expenseBudget ? parseInt(expenseBudget.replace(/\D/g, ''), 10) : 10000000,
      spentAmount: expenseSpent ? parseInt(expenseSpent.replace(/\D/g, ''), 10) : 0,
      period: '2026',
      description: expenseDesc,
      date: new Date().toISOString().split('T')[0],
      receiptNumber: expenseReceipt || `SLS-${Date.now().toString().slice(-4)}`
    });

    setShowAddExpenseModal(false);
    setExpenseTitle('');
    setExpenseBudget('');
    setExpenseSpent('');
    setExpenseDesc('');
    setExpenseReceipt('');
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-semibold mb-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Sub Halaman Divisi Sales</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Rencana Kerja, Target & Pengaturan Finansial Sales
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Monitoring performa revenue, pipeline deal klien, alokasi anggaran kegiatan/iklan, dan sinkronisasi kalender.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddPlanModal(true)}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-all flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Rencana Kerja Sales</span>
          </button>
        </div>
      </div>

      {/* KPI Target Bulanan vs Pencapaian Real */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Target Revenue Bulanan</div>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
            Rp {(currentMetric.revenueTarget / 1000000).toFixed(0)} Juta
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Periode {currentMetric.month}</div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Pencapaian Diraih</div>
          <div className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400 tabular-nums">
            Rp {(currentMetric.revenueAchieved / 1000000).toFixed(0)} Juta
          </div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
            {achievementRate}% dari target tercapai
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Deals Closed vs Target</div>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
            {currentMetric.dealsClosed} / {currentMetric.dealsTarget}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Win Rate: {currentMetric.conversionRate}%</div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Pipeline Leads Aktif</div>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
            {currentMetric.leadsGenerated}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Inbound & outbound qualification</div>
        </div>
      </div>

      {/* SECTION: RENCANA KERJA SALES & PIPELINE DEALS */}
      <div className="bg-white dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Daftar Rencana Kerja & Pipeline Klien Sales</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Prospek penawaran kontrak enterprise, target closing, dan status tahapan negosiasi.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="py-2.5 px-3">Inisiatif / Rencana Kerja</th>
                <th className="py-2.5 px-3">Klien / Sektor Industri</th>
                <th className="py-2.5 px-3">Potensi Nilai (Rp)</th>
                <th className="py-2.5 px-3">Target Closing</th>
                <th className="py-2.5 px-3">Tahapan (Stage)</th>
                <th className="py-2.5 px-3">PIC Sales</th>
                <th className="py-2.5 px-3">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {salesPlans.map(plan => {
                const stageColor =
                  plan.stage === 'Closed Won'
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    : plan.stage === 'Negotiation'
                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';

                return (
                  <tr key={plan.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                    <td className="py-3 px-3">
                      <div className="font-bold text-slate-900 dark:text-white">{plan.title}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{plan.notes}</div>
                      {plan.googleDriveUrl && (
                        <div className="mt-1">
                          <a
                            href={plan.googleDriveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-[10px] text-blue-600 dark:text-blue-400 hover:underline font-semibold bg-blue-50 dark:bg-blue-950/40 px-1.5 py-0.5 rounded"
                          >
                            <FolderGit2 className="w-2.5 h-2.5" />
                            <span>Drive Dokumen SPH/Kontrak</span>
                            <ExternalLink className="w-2 h-2" />
                          </a>
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-3 font-medium text-slate-700 dark:text-slate-300">
                      {plan.clientOrSector}
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-slate-900 dark:text-white tabular-nums">
                      Rp {(plan.potentialValue / 1000000).toFixed(0)} Jt
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-600 dark:text-slate-400">
                      {plan.targetClosingDate}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${stageColor}`}>
                        {plan.stage}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-600 dark:text-slate-300">{plan.pic}</td>
                    <td className="py-3 px-3">
                      <select
                        value={plan.stage}
                        onChange={e =>
                          updateSalesPlan({ ...plan, stage: e.target.value as SalesPlan['stage'] })
                        }
                        className="text-[11px] bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded px-2 py-1"
                      >
                        <option value="Prospecting">Prospecting</option>
                        <option value="Pitching">Pitching</option>
                        <option value="Negotiation">Negotiation</option>
                        <option value="Closed Won">Closed Won</option>
                        <option value="Closed Lost">Closed Lost</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION: RENCANA PENGATURAN FINANSIAL KEGIATAN & IKLAN SALES (SYNCED TO BUDGET) */}
      <div className="bg-white dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Rencana Finansial: Kegiatan & Iklan Sales
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded font-semibold">
                Tersinkronisasi dengan Budget Kolibrinest.id
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Alokasi dan realisasi pengeluaran networking, pitching dinner, tools outreach, dan iklan penawaran B2B.
            </p>
          </div>

          <button
            onClick={() => setShowAddExpenseModal(true)}
            className="px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Catat Pengeluaran Finansial</span>
          </button>
        </div>

        {/* Financial summary banner */}
        <div className="p-3.5 bg-slate-50 dark:bg-slate-900/60 rounded-lg border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="space-y-0.5">
            <span className="text-slate-400 text-[11px]">Total Anggaran Dianggarkan (Sales):</span>
            <div className="text-base font-bold font-mono text-slate-900 dark:text-white">
              Rp {totalSalesBudget.toLocaleString('id-ID')}
            </div>
          </div>
          <div className="space-y-0.5">
            <span className="text-slate-400 text-[11px]">Realisasi Terpakai:</span>
            <div className="text-base font-bold font-mono text-emerald-600 dark:text-emerald-400">
              Rp {totalSalesSpent.toLocaleString('id-ID')}
            </div>
          </div>
          <div className="space-y-0.5">
            <span className="text-slate-400 text-[11px]">Sisa Alokasi Kas Sales:</span>
            <div className="text-base font-bold font-mono text-slate-900 dark:text-white">
              Rp {(totalSalesBudget - totalSalesSpent).toLocaleString('id-ID')}
            </div>
          </div>
        </div>

        {/* Expense log table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="py-2.5 px-3">Uraian Kegiatan / Iklan</th>
                <th className="py-2.5 px-3">Kategori</th>
                <th className="py-2.5 px-3">Dianggarkan</th>
                <th className="py-2.5 px-3">Realisasi (Terpakai)</th>
                <th className="py-2.5 px-3">No. Kuitansi/Ref</th>
                <th className="py-2.5 px-3">Tanggal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {salesFinancials.map(fin => (
                <tr key={fin.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                  <td className="py-3 px-3">
                    <div className="font-semibold text-slate-900 dark:text-white">{fin.title}</div>
                    <div className="text-[11px] text-slate-400">{fin.description}</div>
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {fin.category.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono font-medium text-slate-700 dark:text-slate-300 tabular-nums">
                    Rp {fin.budgetedAmount.toLocaleString('id-ID')}
                  </td>
                  <td className="py-3 px-3 font-mono font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                    Rp {fin.spentAmount.toLocaleString('id-ID')}
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-500">{fin.receiptNumber || '-'}</td>
                  <td className="py-3 px-3 font-mono text-slate-500">{fin.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION: KALENDER KHUSUS SALES (SYNCED WITH KOLIBRINEST.ID) */}
      <div className="bg-white dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Kalender Jadwal Sales (Tersinkronisasi Kolibrinest.id)
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Jadwal temu klien, batas akhir tender, presentasi SPH, dan evaluasi performa kuartalan.
            </p>
          </div>

          <button
            onClick={onOpenCalendarModal}
            className="px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Jadwal Sales</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {salesEvents.map(evt => (
            <div
              key={evt.id}
              className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 space-y-2"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  {evt.date}
                </span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {evt.type.replace('_', ' ')}
                </span>
              </div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-snug">
                {evt.title}
              </h4>
              {evt.time && <p className="text-[11px] text-slate-500">Waktu: {evt.time}</p>}
              {evt.location && <p className="text-[11px] text-slate-500 truncate">Lokasi: {evt.location}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Modal Add Sales Plan */}
      {showAddPlanModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Tambah Rencana Kerja Sales Baru
            </h3>
            <form onSubmit={handleCreatePlan} className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Judul Inisiatif / Penawaran
                </label>
                <input
                  type="text"
                  required
                  value={newPlanTitle}
                  onChange={e => setNewPlanTitle(e.target.value)}
                  placeholder="Contoh: Paket Retainer Social Media & Ads 1 Tahun"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Calon Klien / Sektor Industri
                </label>
                <input
                  type="text"
                  required
                  value={newPlanClient}
                  onChange={e => setNewPlanClient(e.target.value)}
                  placeholder="Contoh: PT Telekomunikasi Seluler"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Potensi Nilai Kontrak (Rp)
                  </label>
                  <input
                    type="text"
                    value={newPlanValue}
                    onChange={e => setNewPlanValue(e.target.value)}
                    placeholder="Contoh: 150000000"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Target Tanggal Closing
                  </label>
                  <input
                    type="date"
                    value={newPlanClosing}
                    onChange={e => setNewPlanClosing(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Tahapan (Stage)
                  </label>
                  <select
                    value={newPlanStage}
                    onChange={e => setNewPlanStage(e.target.value as SalesPlan['stage'])}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  >
                    <option value="Prospecting">Prospecting</option>
                    <option value="Pitching">Pitching</option>
                    <option value="Negotiation">Negotiation</option>
                    <option value="Closed Won">Closed Won</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    PIC Sales Rep
                  </label>
                  <input
                    type="text"
                    value={newPlanPic}
                    onChange={e => setNewPlanPic(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Catatan Progres
                </label>
                <textarea
                  rows={2}
                  value={newPlanNotes}
                  onChange={e => setNewPlanNotes(e.target.value)}
                  placeholder="Kebutuhan khusus klien, timeline evaluasi..."
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddPlanModal(false)}
                  className="px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg"
                >
                  Simpan Rencana Kerja
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Add Sales Financial Expense */}
      {showAddExpenseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Catat Rencana / Realisasi Finansial Sales
            </h3>
            <form onSubmit={handleCreateExpense} className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Uraian Kegiatan / Iklan
                </label>
                <input
                  type="text"
                  required
                  value={expenseTitle}
                  onChange={e => setExpenseTitle(e.target.value)}
                  placeholder="Contoh: LinkedIn Ads Retargeting B2B Q4"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Kategori
                </label>
                <select
                  value={expenseCategory}
                  onChange={e => setExpenseCategory(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                >
                  <option value="iklan_ads">Iklan / Ads Digital</option>
                  <option value="kegiatan">Kegiatan / Meeting / Networking</option>
                  <option value="peralatan_lisensi">Peralatan / Software Lisensi</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Anggaran Dialokasikan (Rp)
                  </label>
                  <input
                    type="text"
                    required
                    value={expenseBudget}
                    onChange={e => setExpenseBudget(e.target.value)}
                    placeholder="Contoh: 15000000"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Realisasi Terpakai (Rp)
                  </label>
                  <input
                    type="text"
                    value={expenseSpent}
                    onChange={e => setExpenseSpent(e.target.value)}
                    placeholder="Contoh: 12500000"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Nomor Kuitansi / Invoice / Ref
                </label>
                <input
                  type="text"
                  value={expenseReceipt}
                  onChange={e => setExpenseReceipt(e.target.value)}
                  placeholder="Contoh: INV-SLS-2026-11"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Deskripsi Singkat
                </label>
                <textarea
                  rows={2}
                  value={expenseDesc}
                  onChange={e => setExpenseDesc(e.target.value)}
                  placeholder="Keterangan alokasi belanja..."
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddExpenseModal(false)}
                  className="px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg"
                >
                  Simpan & Sinkronkan ke Budget
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
