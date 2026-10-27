import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MarketingCampaign, WeeklyContentItem, DivisionFinancialPlan } from '../../types';
import {
  Megaphone,
  Calendar,
  Users,
  Eye,
  MousePointerClick,
  Plus,
  Share2,
  DollarSign,
  TrendingUp,
  Flame,
  CheckCircle2,
  Globe,
  Instagram,
  Linkedin,
  Video,
  FolderGit2,
  ExternalLink
} from 'lucide-react';

interface MarketingDivisionTabProps {
  onOpenCalendarModal: () => void;
}

export const MarketingDivisionTab: React.FC<MarketingDivisionTabProps> = ({ onOpenCalendarModal }) => {
  const {
    marketingCampaigns,
    addMarketingCampaign,
    weeklyContent,
    addWeeklyContent,
    updateWeeklyContentStatus,
    marketingMetric,
    calendarEvents,
    financialPlans,
    addFinancialExpense
  } = useApp();

  const marketingFinancials = financialPlans.filter(f => f.division === 'marketing');
  const totalMktBudget = marketingFinancials.reduce((acc, f) => acc + f.budgetedAmount, 0);
  const totalMktSpent = marketingFinancials.reduce((acc, f) => acc + f.spentAmount, 0);
  const marketingEvents = calendarEvents.filter(e => e.division === 'marketing' || e.division === 'all');

  // Modal states
  const [showAddCampaignModal, setShowAddCampaignModal] = useState(false);
  const [cmpName, setCmpName] = useState('');
  const [cmpObjective, setCmpObjective] = useState('');
  const [cmpPlatforms, setCmpPlatforms] = useState('Meta Ads, Google Search');
  const [cmpBudget, setCmpBudget] = useState('');
  const [cmpStart, setCmpStart] = useState('');
  const [cmpEnd, setCmpEnd] = useState('');
  const [cmpPic, setCmpPic] = useState('Dimas Aditya');

  const [showAddContentModal, setShowAddContentModal] = useState(false);
  const [cntDay, setCntDay] = useState<WeeklyContentItem['day']>('Senin');
  const [cntDate, setCntDate] = useState('2026-11-02');
  const [cntPlatform, setCntPlatform] = useState<WeeklyContentItem['platform']>('Instagram');
  const [cntType, setCntType] = useState<WeeklyContentItem['contentType']>('Video Reels');
  const [cntTopic, setCntTopic] = useState('');
  const [cntPic, setCntPic] = useState('Nadya Putri');

  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [expTitle, setExpTitle] = useState('');
  const [expCategory, setExpCategory] = useState<DivisionFinancialPlan['category']>('iklan_ads');
  const [expBudget, setExpBudget] = useState('');
  const [expSpent, setExpSpent] = useState('');
  const [expDesc, setExpDesc] = useState('');
  const [expReceipt, setExpReceipt] = useState('');

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cmpName) return;

    addMarketingCampaign({
      campaignName: cmpName,
      objective: cmpObjective || 'Lead Generation & Brand Awareness',
      platforms: cmpPlatforms.split(',').map(s => s.trim()),
      startDate: cmpStart || '2026-11-01',
      endDate: cmpEnd || '2026-11-30',
      allocatedBudget: cmpBudget ? parseInt(cmpBudget.replace(/\D/g, ''), 10) : 20000000,
      spentBudget: 0,
      reach: 0,
      clicks: 0,
      leads: 0,
      status: 'Active',
      pic: cmpPic
    });

    setShowAddCampaignModal(false);
    setCmpName('');
    setCmpObjective('');
    setCmpBudget('');
  };

  const handleCreateContent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cntTopic) return;

    addWeeklyContent({
      day: cntDay,
      date: cntDate,
      platform: cntPlatform,
      contentType: cntType,
      topic: cntTopic,
      pic: cntPic,
      status: 'Ide'
    });

    setShowAddContentModal(false);
    setCntTopic('');
  };

  const handleCreateExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expTitle) return;

    addFinancialExpense({
      division: 'marketing',
      title: expTitle,
      category: expCategory,
      budgetedAmount: expBudget ? parseInt(expBudget.replace(/\D/g, ''), 10) : 15000000,
      spentAmount: expSpent ? parseInt(expSpent.replace(/\D/g, ''), 10) : 0,
      period: '2026',
      description: expDesc,
      date: new Date().toISOString().split('T')[0],
      receiptNumber: expReceipt || `MKT-${Date.now().toString().slice(-4)}`
    });

    setShowAddExpenseModal(false);
    setExpTitle('');
    setExpBudget('');
    setExpSpent('');
    setExpDesc('');
    setExpReceipt('');
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-semibold mb-1">
            <Megaphone className="w-3.5 h-3.5" />
            <span>Sub Halaman Divisi Marketing</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Kampanye, Metrik Audiens & Jadwal Rilis Konten
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Manajemen kampanye berbayar & organik, kalender rilis mingguan, keterlibatan audiens, dan anggaran iklan.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddCampaignModal(true)}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-all flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Kampanye Marketing</span>
          </button>
        </div>
      </div>

      {/* METRIK KETERLIBATAN AUDIENS (AUDIENCE ENGAGEMENT METRICS) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Metrik Keterlibatan Audiens (Audience Engagement)
          </h2>
          <span className="text-xs text-slate-400">Pembaruan 30 hari terakhir</span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          <div className="p-4 rounded-xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
              <span className="text-xs">Jangkauan (Reach)</span>
              <Eye className="w-3.5 h-3.5 text-teal-500" />
            </div>
            <div className="text-xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
              {(marketingMetric.totalAudienceReach / 1000000).toFixed(2)}M
            </div>
            <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
              +24% vs bulan lalu
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
              <span className="text-xs">Engagement Rate</span>
              <Flame className="w-3.5 h-3.5 text-amber-500" />
            </div>
            <div className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400 tabular-nums">
              {marketingMetric.avgEngagementRate}%
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Standar industri: 3.2%</div>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
              <span className="text-xs">Click-Through (CTR)</span>
              <MousePointerClick className="w-3.5 h-3.5 text-indigo-500" />
            </div>
            <div className="text-xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
              {marketingMetric.ctrPercent}%
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Performa iklan ads</div>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
              <span className="text-xs">Followers Baru</span>
              <Users className="w-3.5 h-3.5 text-purple-500" />
            </div>
            <div className="text-xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
              +{(marketingMetric.monthlyFollowersGrowth / 1000).toFixed(1)}K
            </div>
            <div className="text-[11px] text-slate-400 mt-1">IG, TikTok, LinkedIn</div>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
              <span className="text-xs">Rata-rata CPL (Ads)</span>
              <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
            </div>
            <div className="text-xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
              Rp {(marketingMetric.cplAverageIdr / 1000).toFixed(0)}K
            </div>
            <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
              Biaya akuisisi efisien
            </div>
          </div>
        </div>
      </div>

      {/* SECTION: RENCANA KERJA KAMPANYE (CAMPAIGNS ROADMAP) */}
      <div className="bg-white dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Rencana Kerja Kampanye (Marketing Campaigns)</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Pemantauan performa real-time jangkauan, klik, perolehan leads, dan serapan budget kampanye.
            </p>
          </div>
        </div>

        <div className="space-y-3.5">
          {marketingCampaigns.map(cmp => (
            <div
              key={cmp.id}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      {cmp.campaignName}
                    </h3>
                    <span className="px-2 py-0.5 text-[10px] font-semibold uppercase rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                      {cmp.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Tujuan: {cmp.objective} · PIC: <span className="font-semibold">{cmp.pic}</span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-xs font-mono text-slate-500">
                    {cmp.startDate} s/d {cmp.endDate}
                  </div>
                  {cmp.googleDriveUrl && (
                    <a
                      href={cmp.googleDriveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[10px] text-blue-600 dark:text-blue-400 hover:underline font-semibold bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded"
                      title="Buka Folder Aset Kampanye di Google Drive"
                    >
                      <FolderGit2 className="w-2.5 h-2.5" />
                      <span>Drive Aset</span>
                      <ExternalLink className="w-2 h-2" />
                    </a>
                  )}
                </div>
              </div>

              {/* Progress and KPIs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-200/60 dark:border-slate-800 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase">Platform</span>
                  <div className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                    {cmp.platforms.join(', ')}
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase">Budget Terpakai</span>
                  <div className="font-mono font-bold text-slate-900 dark:text-white tabular-nums">
                    Rp {(cmp.spentBudget / 1000000).toFixed(1)}M / {(cmp.allocatedBudget / 1000000).toFixed(0)}M
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase">Jangkauan & Klik</span>
                  <div className="font-mono text-slate-800 dark:text-slate-200 tabular-nums">
                    {(cmp.reach / 1000).toFixed(0)}K Reach · {(cmp.clicks / 1000).toFixed(1)}K Klik
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase">Leads Diperoleh</span>
                  <div className="font-mono font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                    {cmp.leads} Inbound Leads
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION: JADWAL RILIS KONTEN MINGGUAN (WEEKLY CONTENT RELEASE SCHEDULE) */}
      <div className="bg-white dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Share2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Jadwal Rilis Konten Mingguan (Senin s/d Minggu)</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Distribusi editorial across Instagram, TikTok, LinkedIn, YouTube, dan Website Kolibrinest.
            </p>
          </div>

          <button
            onClick={() => setShowAddContentModal(true)}
            className="px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Jadwal Konten</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="py-2.5 px-3">Hari & Tanggal</th>
                <th className="py-2.5 px-3">Platform</th>
                <th className="py-2.5 px-3">Format Konten</th>
                <th className="py-2.5 px-3">Topik / Tema Utama</th>
                <th className="py-2.5 px-3">PIC</th>
                <th className="py-2.5 px-3">Status Rilis</th>
                <th className="py-2.5 px-3">Ubah Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {weeklyContent.map(cnt => {
                const statusColor =
                  cnt.status === 'Sudah Tayang'
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    : cnt.status === 'Siap Tayang'
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                    : cnt.status === 'Produksi'
                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';

                return (
                  <tr key={cnt.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                    <td className="py-3 px-3">
                      <div className="font-bold text-slate-900 dark:text-white">{cnt.day}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{cnt.date}</div>
                    </td>
                    <td className="py-3 px-3 font-semibold text-slate-700 dark:text-slate-300">
                      {cnt.platform}
                    </td>
                    <td className="py-3 px-3 text-slate-600 dark:text-slate-400">{cnt.contentType}</td>
                    <td className="py-3 px-3 font-medium text-slate-900 dark:text-white max-w-sm">
                      <div>{cnt.topic}</div>
                      {cnt.googleDriveUrl && (
                        <div className="mt-1">
                          <a
                            href={cnt.googleDriveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-[10px] text-blue-600 dark:text-blue-400 hover:underline font-semibold bg-blue-50 dark:bg-blue-950/40 px-1.5 py-0.5 rounded"
                          >
                            <FolderGit2 className="w-2.5 h-2.5" />
                            <span>Drive Materi</span>
                            <ExternalLink className="w-2 h-2" />
                          </a>
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-3 text-slate-600 dark:text-slate-300">{cnt.pic}</td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${statusColor}`}>
                        {cnt.status}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <select
                        value={cnt.status}
                        onChange={e =>
                          updateWeeklyContentStatus(
                            cnt.id,
                            e.target.value as WeeklyContentItem['status']
                          )
                        }
                        className="text-[11px] bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded px-2 py-1"
                      >
                        <option value="Ide">Ide</option>
                        <option value="Produksi">Produksi</option>
                        <option value="Siap Tayang">Siap Tayang</option>
                        <option value="Sudah Tayang">Sudah Tayang</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION: RENCANA FINANSIAL KEGIATAN & IKLAN MARKETING (SYNCED WITH BUDGET) */}
      <div className="bg-white dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Rencana Finansial: Kegiatan & Iklan Marketing
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded font-semibold">
                Tersinkronisasi dengan Budget Kolibrinest.id
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Alokasi Meta Ads, TikTok Spark Ads, kolaborasi kreator/influencer, serta biaya penyelenggaraan event & webinar.
            </p>
          </div>

          <button
            onClick={() => setShowAddExpenseModal(true)}
            className="px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Catat Pengeluaran Marketing</span>
          </button>
        </div>

        {/* Financial overview numbers */}
        <div className="p-3.5 bg-slate-50 dark:bg-slate-900/60 rounded-lg border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="space-y-0.5">
            <span className="text-slate-400 text-[11px]">Anggaran Dianggarkan (Marketing):</span>
            <div className="text-base font-bold font-mono text-slate-900 dark:text-white">
              Rp {totalMktBudget.toLocaleString('id-ID')}
            </div>
          </div>
          <div className="space-y-0.5">
            <span className="text-slate-400 text-[11px]">Realisasi Terpakai:</span>
            <div className="text-base font-bold font-mono text-emerald-600 dark:text-emerald-400">
              Rp {totalMktSpent.toLocaleString('id-ID')}
            </div>
          </div>
          <div className="space-y-0.5">
            <span className="text-slate-400 text-[11px]">Sisa Kas Marketing:</span>
            <div className="text-base font-bold font-mono text-slate-900 dark:text-white">
              Rp {(totalMktBudget - totalMktSpent).toLocaleString('id-ID')}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="py-2.5 px-3">Uraian Kegiatan / Iklan</th>
                <th className="py-2.5 px-3">Kategori</th>
                <th className="py-2.5 px-3">Dianggarkan</th>
                <th className="py-2.5 px-3">Realisasi (Terpakai)</th>
                <th className="py-2.5 px-3">No. Invoice / Ref</th>
                <th className="py-2.5 px-3">Tanggal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {marketingFinancials.map(fin => (
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

      {/* SECTION: KALENDER KHUSUS MARKETING (SYNCED WITH KOLIBRINEST.ID) */}
      <div className="bg-white dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Kalender Jadwal Marketing (Tersinkronisasi Kolibrinest.id)
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Jadwal peluncuran ads, kickoff campaign, live streaming webinar, dan review audiens bulanan.
            </p>
          </div>

          <button
            onClick={onOpenCalendarModal}
            className="px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Agenda Marketing</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {marketingEvents.map(evt => (
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
              {evt.location && <p className="text-[11px] text-slate-500 truncate">Platform: {evt.location}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Modal Add Campaign */}
      {showAddCampaignModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Tambah Rencana Kampanye Marketing Baru
            </h3>
            <form onSubmit={handleCreateCampaign} className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Nama Kampanye
                </label>
                <input
                  type="text"
                  required
                  value={cmpName}
                  onChange={e => setCmpName(e.target.value)}
                  placeholder="Contoh: Kampanye Liburan Akhir Tahun 2026"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Objektif / Sasaran Utama
                </label>
                <input
                  type="text"
                  value={cmpObjective}
                  onChange={e => setCmpObjective(e.target.value)}
                  placeholder="Contoh: Mengakuisisi 500 email lead baru dan 50.000 web visits"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Platform Channel (Pisahkan Koma)
                  </label>
                  <input
                    type="text"
                    value={cmpPlatforms}
                    onChange={e => setCmpPlatforms(e.target.value)}
                    placeholder="Meta Ads, TikTok, Google"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Anggaran Dialokasikan (Rp)
                  </label>
                  <input
                    type="text"
                    value={cmpBudget}
                    onChange={e => setCmpBudget(e.target.value)}
                    placeholder="Contoh: 25000000"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Tanggal Mulai
                  </label>
                  <input
                    type="date"
                    value={cmpStart}
                    onChange={e => setCmpStart(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Tanggal Selesai
                  </label>
                  <input
                    type="date"
                    value={cmpEnd}
                    onChange={e => setCmpEnd(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  PIC Kampanye
                </label>
                <input
                  type="text"
                  value={cmpPic}
                  onChange={e => setCmpPic(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddCampaignModal(false)}
                  className="px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg"
                >
                  Simpan Kampanye
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Add Weekly Content */}
      {showAddContentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Tambah Jadwal Konten Mingguan
            </h3>
            <form onSubmit={handleCreateContent} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Hari</label>
                  <select
                    value={cntDay}
                    onChange={e => setCntDay(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  >
                    <option value="Senin">Senin</option>
                    <option value="Selasa">Selasa</option>
                    <option value="Rabu">Rabu</option>
                    <option value="Kamis">Kamis</option>
                    <option value="Jumat">Jumat</option>
                    <option value="Sabtu">Sabtu</option>
                    <option value="Minggu">Minggu</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Tanggal</label>
                  <input
                    type="date"
                    value={cntDate}
                    onChange={e => setCntDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Platform</label>
                  <select
                    value={cntPlatform}
                    onChange={e => setCntPlatform(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  >
                    <option value="Instagram">Instagram</option>
                    <option value="TikTok">TikTok</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="YouTube">YouTube</option>
                    <option value="Website">Website</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Format Konten</label>
                  <select
                    value={cntType}
                    onChange={e => setCntType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  >
                    <option value="Video Reels">Video Reels / Shorts</option>
                    <option value="Carousel Edukasi">Carousel Edukasi</option>
                    <option value="Artikel Blog">Artikel Blog</option>
                    <option value="Infografis">Infografis</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Topik / Judul Konten
                </label>
                <input
                  type="text"
                  required
                  value={cntTopic}
                  onChange={e => setCntTopic(e.target.value)}
                  placeholder="Contoh: 3 Formula Mengatur Anggaran Ads Tanpa Boncos"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">PIC Kreator</label>
                <input
                  type="text"
                  value={cntPic}
                  onChange={e => setCntPic(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddContentModal(false)}
                  className="px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg"
                >
                  Simpan Jadwal Rilis
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Add Marketing Expense */}
      {showAddExpenseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Catat Rencana / Realisasi Finansial Marketing
            </h3>
            <form onSubmit={handleCreateExpense} className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Uraian Kegiatan / Iklan
                </label>
                <input
                  type="text"
                  required
                  value={expTitle}
                  onChange={e => setExpTitle(e.target.value)}
                  placeholder="Contoh: Meta Ads Retargeting Weekend Promo"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Kategori
                </label>
                <select
                  value={expCategory}
                  onChange={e => setExpCategory(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                >
                  <option value="iklan_ads">Iklan / Ads Digital</option>
                  <option value="kegiatan">Kegiatan / Event / Webinar</option>
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
                    value={expBudget}
                    onChange={e => setExpBudget(e.target.value)}
                    placeholder="Contoh: 18000000"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Realisasi Terpakai (Rp)
                  </label>
                  <input
                    type="text"
                    value={expSpent}
                    onChange={e => setExpSpent(e.target.value)}
                    placeholder="Contoh: 15400000"
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
                  value={expReceipt}
                  onChange={e => setExpReceipt(e.target.value)}
                  placeholder="Contoh: INV-META-2026-11"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono"
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
