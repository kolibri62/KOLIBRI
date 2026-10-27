import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DivisionType, DivisionFinancialPlan } from '../../types';
import {
  Wallet,
  TrendingUp,
  PieChart,
  DollarSign,
  Plus,
  Sliders,
  ArrowUpRight,
  Receipt,
  Download,
  AlertTriangle,
  CheckCircle2,
  Filter,
  FolderGit2,
  ExternalLink
} from 'lucide-react';

export const BudgetManagementTab: React.FC = () => {
  const {
    annualBudget,
    financialPlans,
    addFinancialExpense,
    updateAnnualBudgetAllocation
  } = useApp();

  const [divisionFilter, setDivisionFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Modal to add expense
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [expenseTitle, setExpenseTitle] = useState('');
  const [expenseDiv, setExpenseDiv] = useState<DivisionType>('marketing');
  const [expenseCategory, setExpenseCategory] = useState<DivisionFinancialPlan['category']>('iklan_ads');
  const [expenseBudget, setExpenseBudget] = useState('');
  const [expenseSpent, setExpenseSpent] = useState('');
  const [expenseDesc, setExpenseDesc] = useState('');
  const [expenseReceipt, setExpenseReceipt] = useState('');

  // Modal to adjust annual division allocation
  const [showAdjustAllocationModal, setShowAdjustAllocationModal] = useState(false);
  const [salesAlloc, setSalesAlloc] = useState(annualBudget.divisionAllocations.sales.toString());
  const [marketingAlloc, setMarketingAlloc] = useState(annualBudget.divisionAllocations.marketing.toString());
  const [ufukAlloc, setUfukAlloc] = useState(annualBudget.divisionAllocations.ufuk_cendekia.toString());
  const [mgmtAlloc, setMgmtAlloc] = useState(annualBudget.divisionAllocations.management.toString());

  // Aggregate stats per division
  const calcDivisionSpent = (div: DivisionType) =>
    financialPlans.filter(f => f.division === div).reduce((acc, f) => acc + f.spentAmount, 0);

  const spentSales = calcDivisionSpent('sales');
  const spentMarketing = calcDivisionSpent('marketing');
  const spentUfuk = calcDivisionSpent('ufuk_cendekia');
  const spentMgmt = calcDivisionSpent('management');

  const totalSpent = spentSales + spentMarketing + spentUfuk + spentMgmt;
  const remainingBudget = annualBudget.totalAnnualBudget - totalSpent;
  const totalUtilization = Math.round((totalSpent / annualBudget.totalAnnualBudget) * 100);

  // Category sums
  const spentKegiatan = financialPlans
    .filter(f => f.category === 'kegiatan')
    .reduce((acc, f) => acc + f.spentAmount, 0);
  const spentIklan = financialPlans
    .filter(f => f.category === 'iklan_ads')
    .reduce((acc, f) => acc + f.spentAmount, 0);
  const spentLisensi = financialPlans
    .filter(f => f.category === 'peralatan_lisensi')
    .reduce((acc, f) => acc + f.spentAmount, 0);
  const spentOps = financialPlans
    .filter(f => f.category === 'operasional')
    .reduce((acc, f) => acc + f.spentAmount, 0);

  const filteredPlans = financialPlans.filter(f => {
    const matchesDiv = divisionFilter === 'all' || f.division === divisionFilter;
    const matchesCat = categoryFilter === 'all' || f.category === categoryFilter;
    return matchesDiv && matchesCat;
  });

  const handleCreateExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expenseTitle) return;

    addFinancialExpense({
      division: expenseDiv,
      title: expenseTitle,
      category: expenseCategory,
      budgetedAmount: expenseBudget ? parseInt(expenseBudget.replace(/\D/g, ''), 10) : 10000000,
      spentAmount: expenseSpent ? parseInt(expenseSpent.replace(/\D/g, ''), 10) : 0,
      period: '2026',
      description: expenseDesc,
      date: new Date().toISOString().split('T')[0],
      receiptNumber: expenseReceipt || `KNB-FIN-${Date.now().toString().slice(-4)}`
    });

    setShowAddExpenseModal(false);
    setExpenseTitle('');
    setExpenseBudget('');
    setExpenseSpent('');
    setExpenseDesc('');
    setExpenseReceipt('');
  };

  const handleSaveAllocations = (e: React.FormEvent) => {
    e.preventDefault();
    updateAnnualBudgetAllocation('sales', parseInt(salesAlloc.replace(/\D/g, ''), 10) || 0);
    updateAnnualBudgetAllocation('marketing', parseInt(marketingAlloc.replace(/\D/g, ''), 10) || 0);
    updateAnnualBudgetAllocation('ufuk_cendekia', parseInt(ufukAlloc.replace(/\D/g, ''), 10) || 0);
    updateAnnualBudgetAllocation('management', parseInt(mgmtAlloc.replace(/\D/g, ''), 10) || 0);
    setShowAdjustAllocationModal(false);
  };

  const handleExportCSV = () => {
    const headers = 'ID,Divisi,Uraian,Kategori,Dianggarkan,Terpakai,No. Ref,Tanggal\n';
    const rows = financialPlans
      .map(
        f =>
          `"${f.id}","${f.division}","${f.title}","${f.category}","${f.budgetedAmount}","${f.spentAmount}","${f.receiptNumber || ''}","${f.date}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `kolibrinest_budget_2026_${Date.now()}.csv`;
    link.click();
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-semibold mb-1">
            <Wallet className="w-3.5 h-3.5" />
            <span>Pusat Anggaran Tahunan 2026</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Plafon Anggaran Rp {(annualBudget.totalAnnualBudget / 1000000000).toFixed(1)} Miliar Terintegrasi
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Sinkronisasi otomatis dengan seluruh pencatatan biaya kegiatan & iklan dari Divisi Sales, Marketing, Publikasi, dan Operasional.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 border border-slate-300 dark:border-slate-700 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => setShowAdjustAllocationModal(true)}
            className="px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 border border-slate-300 dark:border-slate-700 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Sesuaikan Plafon Divisi</span>
          </button>

          <button
            onClick={() => setShowAddExpenseModal(true)}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-all flex items-center gap-1.5 shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Catat Pengeluaran Baru</span>
          </button>
        </div>
      </div>

      {/* TOP MASTER CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400">Total Pagu Anggaran 1 Tahun</div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-900 dark:text-white tabular-nums">
            Rp {annualBudget.totalAnnualBudget.toLocaleString('id-ID')}
          </div>
          <p className="text-[11px] text-slate-400">Alokasi resmi tahun anggaran 2026</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400">
            <span>Realisasi Serapan Anggaran</span>
            <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{totalUtilization}%</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400 tabular-nums">
            Rp {totalSpent.toLocaleString('id-ID')}
          </div>
          <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, totalUtilization)}%` }}
            />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400">Sisa Anggaran Belum Terpakai</div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-900 dark:text-white tabular-nums">
            Rp {remainingBudget.toLocaleString('id-ID')}
          </div>
          <p className="text-[11px] text-slate-400">
            Tersedia untuk operasional Q4 & mitigasi kontingensi
          </p>
        </div>
      </div>

      {/* BREAKDOWN PER DIVISI (SALES, MARKETING, PUBLICATION, OPERASIONAL) */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
          Alokasi & Penyerapan Anggaran per Divisi
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Divisi Sales */}
          <div className="p-4 rounded-xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Divisi Sales
              </span>
              <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                {Math.round((spentSales / annualBudget.divisionAllocations.sales) * 100)}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full"
                style={{
                  width: `${Math.min(100, Math.round((spentSales / annualBudget.divisionAllocations.sales) * 100))}%`
                }}
              />
            </div>
            <div className="flex justify-between text-[11px] font-mono text-slate-500 pt-1">
              <span>Terpakai: Rp {(spentSales / 1000000).toFixed(0)} Jt</span>
              <span>Plafon: {(annualBudget.divisionAllocations.sales / 1000000).toFixed(0)} Jt</span>
            </div>
          </div>

          {/* Divisi Marketing */}
          <div className="p-4 rounded-xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Divisi Marketing
              </span>
              <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                {Math.round((spentMarketing / annualBudget.divisionAllocations.marketing) * 100)}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full"
                style={{
                  width: `${Math.min(100, Math.round((spentMarketing / annualBudget.divisionAllocations.marketing) * 100))}%`
                }}
              />
            </div>
            <div className="flex justify-between text-[11px] font-mono text-slate-500 pt-1">
              <span>Terpakai: Rp {(spentMarketing / 1000000).toFixed(0)} Jt</span>
              <span>Plafon: {(annualBudget.divisionAllocations.marketing / 1000000).toFixed(0)} Jt</span>
            </div>
          </div>

          {/* Divisi UFUK.Cendekia */}
          <div className="p-4 rounded-xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Divisi UFUK.Cendekia
              </span>
              <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                {Math.round((spentUfuk / annualBudget.divisionAllocations.ufuk_cendekia) * 100)}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full"
                style={{
                  width: `${Math.min(100, Math.round((spentUfuk / annualBudget.divisionAllocations.ufuk_cendekia) * 100))}%`
                }}
              />
            </div>
            <div className="flex justify-between text-[11px] font-mono text-slate-500 pt-1">
              <span>Terpakai: Rp {(spentUfuk / 1000000).toFixed(0)} Jt</span>
              <span>Plafon: {(annualBudget.divisionAllocations.ufuk_cendekia / 1000000).toFixed(0)} Jt</span>
            </div>
          </div>

          {/* Operasional & Manajemen */}
          <div className="p-4 rounded-xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Operasional & Umum
              </span>
              <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                {Math.round((spentMgmt / annualBudget.divisionAllocations.management) * 100)}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full"
                style={{
                  width: `${Math.min(100, Math.round((spentMgmt / annualBudget.divisionAllocations.management) * 100))}%`
                }}
              />
            </div>
            <div className="flex justify-between text-[11px] font-mono text-slate-500 pt-1">
              <span>Terpakai: Rp {(spentMgmt / 1000000).toFixed(0)} Jt</span>
              <span>Plafon: {(annualBudget.divisionAllocations.management / 1000000).toFixed(0)} Jt</span>
            </div>
          </div>
        </div>
      </div>

      {/* BREAKDOWN BERDASARKAN KATEGORI PENGELUARAN */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-4">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
          Distribusi Realisasi Berdasarkan Kategori
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <span className="text-slate-400">Belanja Iklan / Ads</span>
            <div className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-0.5">
              Rp {(spentIklan / 1000000).toFixed(1)} Jt
            </div>
            <span className="text-[10px] text-slate-400">Meta, Google, TikTok Ads</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <span className="text-slate-400">Kegiatan & Acara</span>
            <div className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-0.5">
              Rp {(spentKegiatan / 1000000).toFixed(1)} Jt
            </div>
            <span className="text-[10px] text-slate-400">Webinar, Networking, Shooting</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <span className="text-slate-400">Alat, Lisensi & Software</span>
            <div className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-0.5">
              Rp {(spentLisensi / 1000000).toFixed(1)} Jt
            </div>
            <span className="text-[10px] text-slate-400">Adobe, Zoom, LinkedIn Sales</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <span className="text-slate-400">Infrastruktur & Ops</span>
            <div className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-0.5">
              Rp {(spentOps / 1000000).toFixed(1)} Jt
            </div>
            <span className="text-[10px] text-slate-400">GCP, Server, Domain</span>
          </div>
        </div>
      </div>

      {/* TABEL BUKU KAS TRANSAKSI FINANSIAL TERPADU */}
      <div className="bg-white dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden space-y-3 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Receipt className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Buku Kas & Riwayat Transaksi Finansial Terpadu</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Log pengeluaran yang diinput oleh setiap divisi dan langsung memotong pagu anggaran tahunan.
            </p>
          </div>

          {/* Table Filters */}
          <div className="flex items-center gap-2 text-xs">
            <select
              value={divisionFilter}
              onChange={e => setDivisionFilter(e.target.value)}
              className="px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200"
            >
              <option value="all">Semua Divisi</option>
              <option value="sales">Sales</option>
              <option value="marketing">Marketing</option>
              <option value="ufuk_cendekia">UFUK.Cendekia</option>
              <option value="management">Management/Operasional</option>
            </select>

            <select
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              className="px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200"
            >
              <option value="all">Semua Kategori</option>
              <option value="iklan_ads">Iklan / Ads</option>
              <option value="kegiatan">Kegiatan</option>
              <option value="peralatan_lisensi">Alat & Lisensi</option>
              <option value="operasional">Operasional</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider bg-slate-50 dark:bg-slate-900/50">
                <th className="py-3 px-4">Tanggal & Ref</th>
                <th className="py-3 px-4">Divisi Pemakai</th>
                <th className="py-3 px-4">Uraian Transaksi</th>
                <th className="py-3 px-4">Kategori</th>
                <th className="py-3 px-4 text-right">Dianggarkan</th>
                <th className="py-3 px-4 text-right">Realisasi (Terpakai)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredPlans.map(plan => (
                <tr key={plan.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                  <td className="py-3.5 px-4 font-mono">
                    <div className="text-slate-900 dark:text-white font-medium">{plan.date}</div>
                    <div className="text-[10px] text-slate-400">{plan.receiptNumber || '-'}</div>
                    {plan.googleDriveReceiptUrl && (
                      <a
                        href={plan.googleDriveReceiptUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[9px] text-blue-600 dark:text-blue-400 hover:underline font-semibold mt-0.5"
                      >
                        <FolderGit2 className="w-2.5 h-2.5" />
                        <span>Drive Bukti</span>
                        <ExternalLink className="w-2 h-2" />
                      </a>
                    )}
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="font-bold uppercase text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {plan.division === 'ufuk_cendekia' ? 'UFUK.Cendekia' : plan.division}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-900 dark:text-white">{plan.title}</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">{plan.description}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {plan.category.replace('_', ' ')}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-mono font-medium text-slate-600 dark:text-slate-300 text-right tabular-nums">
                    Rp {plan.budgetedAmount.toLocaleString('id-ID')}
                  </td>

                  <td className="py-3.5 px-4 font-mono font-bold text-emerald-600 dark:text-emerald-400 text-right tabular-nums">
                    Rp {plan.spentAmount.toLocaleString('id-ID')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add Expense */}
      {showAddExpenseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Catat Transaksi Pengeluaran Anggaran
            </h3>
            <form onSubmit={handleCreateExpense} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Divisi Pengguna
                  </label>
                  <select
                    value={expenseDiv}
                    onChange={e => setExpenseDiv(e.target.value as DivisionType)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  >
                    <option value="sales">Divisi Sales</option>
                    <option value="marketing">Divisi Marketing</option>
                    <option value="ufuk_cendekia">Divisi UFUK.Cendekia</option>
                    <option value="management">Management & Operasional</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Kategori Pengeluaran
                  </label>
                  <select
                    value={expenseCategory}
                    onChange={e => setExpenseCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  >
                    <option value="iklan_ads">Iklan / Ads Digital</option>
                    <option value="kegiatan">Kegiatan / Acara</option>
                    <option value="peralatan_lisensi">Peralatan & Lisensi Software</option>
                    <option value="operasional">Operasional Kantor & Server</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Uraian Belanja / Kegiatan
                </label>
                <input
                  type="text"
                  required
                  value={expenseTitle}
                  onChange={e => setExpenseTitle(e.target.value)}
                  placeholder="Contoh: Pembayaran Google Ads Search Campaign Q4"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Jumlah Dianggarkan (Rp)
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
                    placeholder="Contoh: 14200000"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Nomor Referensi / Invoice
                </label>
                <input
                  type="text"
                  value={expenseReceipt}
                  onChange={e => setExpenseReceipt(e.target.value)}
                  placeholder="Contoh: INV-GGL-8821"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Keterangan Tambahan
                </label>
                <textarea
                  rows={2}
                  value={expenseDesc}
                  onChange={e => setExpenseDesc(e.target.value)}
                  placeholder="Rincian peruntukan belanja..."
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
                  Simpan Transaksi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Adjust Allocation */}
      {showAdjustAllocationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Sesuaikan Plafon Anggaran Divisi
            </h3>
            <p className="text-xs text-slate-500">
              Ubah batas maksimal alokasi dana belanja tahunan untuk masing-masing divisi.
            </p>

            <form onSubmit={handleSaveAllocations} className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Plafon Divisi Sales (Rp)
                </label>
                <input
                  type="text"
                  value={salesAlloc}
                  onChange={e => setSalesAlloc(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Plafon Divisi Marketing (Rp)
                </label>
                <input
                  type="text"
                  value={marketingAlloc}
                  onChange={e => setMarketingAlloc(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Plafon Divisi UFUK.Cendekia (Rp)
                </label>
                <input
                  type="text"
                  value={ufukAlloc}
                  onChange={e => setUfukAlloc(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Plafon Operasional & Management (Rp)
                </label>
                <input
                  type="text"
                  value={mgmtAlloc}
                  onChange={e => setMgmtAlloc(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAdjustAllocationModal(false)}
                  className="px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg"
                >
                  Simpan Plafon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
