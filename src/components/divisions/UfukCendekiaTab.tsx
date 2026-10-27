import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  UfukArticleReview,
  UfukLibraryItem,
  UfukActivityKanban,
  DivisionFinancialPlan,
  TaskPriority
} from '../../types';
import {
  BookOpen,
  Globe,
  Edit3,
  MessageSquare,
  Library,
  Layers,
  Calendar,
  DollarSign,
  Plus,
  ExternalLink,
  CheckCircle2,
  Clock,
  Send,
  Save,
  Search,
  Filter,
  FileText,
  Bookmark,
  Share2,
  Eye,
  RefreshCw,
  FolderOpen
} from 'lucide-react';

interface UfukCendekiaTabProps {
  onOpenCalendarModal: () => void;
}

export const UfukCendekiaTab: React.FC<UfukCendekiaTabProps> = ({ onOpenCalendarModal }) => {
  const {
    ufukMediaFeed,
    ufukArticles,
    libraryItems,
    ufukActivities,
    addArticleComment,
    updateArticleReview,
    addLibraryItem,
    updateLibraryItem,
    addUfukActivity,
    updateUfukActivityStatus,
    calendarEvents,
    financialPlans,
    addFinancialExpense,
    currentUser,
    isWorkspaceSyncing,
    triggerWorkspaceSync
  } = useApp();

  // Active review article selection
  const [selectedArticleId, setSelectedArticleId] = useState<string>(ufukArticles[0]?.id || '');
  const activeArticle = ufukArticles.find(a => a.id === selectedArticleId) || ufukArticles[0];

  // Article inline editing state
  const [isEditingArticle, setIsEditingArticle] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editCategory, setEditCategory] = useState<UfukArticleReview['category']>('Jurnal Cendekia');
  const [editContent, setEditContent] = useState('');
  const [editStatus, setEditStatus] = useState<UfukArticleReview['status']>('In Review');

  // Comment input state
  const [newCommentText, setNewCommentText] = useState('');

  // Library search & filter
  const [librarySearch, setLibrarySearch] = useState('');
  const [libraryCategoryFilter, setLibraryCategoryFilter] = useState('all');

  // Modal states
  const [showAddLibraryModal, setShowAddLibraryModal] = useState(false);
  const [libTitle, setLibTitle] = useState('');
  const [libAuthor, setLibAuthor] = useState('');
  const [libIsbn, setLibIsbn] = useState('');
  const [libPublisher, setLibPublisher] = useState('');
  const [libYear, setLibYear] = useState('2026');
  const [libCategory, setLibCategory] = useState<UfukLibraryItem['category']>('Buku Teori & Filsafat');
  const [libStatus, setLibStatus] = useState<UfukLibraryItem['status']>('Tersedia');
  const [libLocation, setLibLocation] = useState('Rak Utama / Ruang Koleksi');
  const [libDriveUrl, setLibDriveUrl] = useState('');
  const [libSummary, setLibSummary] = useState('');

  // Kanban new activity modal
  const [showAddActivityModal, setShowAddActivityModal] = useState(false);
  const [actTitle, setActTitle] = useState('');
  const [actDesc, setActDesc] = useState('');
  const [actPriority, setActPriority] = useState<TaskPriority>('medium');
  const [actPic, setActPic] = useState('Siti Zahra');
  const [actDueDate, setActDueDate] = useState('2026-11-10');
  const [actDriveUrl, setActDriveUrl] = useState('');

  // Financial expense modal
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [expTitle, setExpTitle] = useState('');
  const [expCategory, setExpCategory] = useState<DivisionFinancialPlan['category']>('penerbitan_buku');
  const [expBudget, setExpBudget] = useState('');
  const [expSpent, setExpSpent] = useState('');
  const [expDesc, setExpDesc] = useState('');
  const [expReceipt, setExpReceipt] = useState('');

  // Filter financial & calendar
  const ufukFinancials = financialPlans.filter(f => f.division === 'ufuk_cendekia');
  const totalUfukBudget = ufukFinancials.reduce((acc, f) => acc + f.budgetedAmount, 0);
  const totalUfukSpent = ufukFinancials.reduce((acc, f) => acc + f.spentAmount, 0);
  const ufukEvents = calendarEvents.filter(
    e => e.division === 'ufuk_cendekia' || e.division === 'all'
  );

  // Setup edit form when selecting an article
  const handleStartEdit = () => {
    if (!activeArticle) return;
    setEditTitle(activeArticle.title);
    setEditCategory(activeArticle.category);
    setEditContent(activeArticle.fullContent);
    setEditStatus(activeArticle.status);
    setIsEditingArticle(true);
  };

  const handleSaveArticleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeArticle) return;
    updateArticleReview(activeArticle.id, editTitle, editCategory, editContent, editStatus);
    setIsEditingArticle(false);
  };

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeArticle || !newCommentText.trim()) return;
    addArticleComment(activeArticle.id, newCommentText);
    setNewCommentText('');
  };

  const handleCreateLibraryItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!libTitle || !libAuthor) return;

    addLibraryItem({
      title: libTitle,
      author: libAuthor,
      isbn: libIsbn || `ISBN-978-623-${Math.floor(10000 + Math.random() * 90000)}`,
      publisher: libPublisher || 'UFUK Press',
      year: parseInt(libYear, 10) || 2026,
      category: libCategory,
      status: libStatus,
      locationOrDriveLink: libLocation,
      googleDriveUrl:
        libDriveUrl || `https://drive.google.com/drive/folders/UFUK-LIB-${Date.now().toString().slice(-4)}`,
      summary: libSummary || 'Ringkasan buku literatur UFUK.Cendekia.'
    });

    setShowAddLibraryModal(false);
    setLibTitle('');
    setLibAuthor('');
    setLibIsbn('');
    setLibLocation('');
    setLibDriveUrl('');
    setLibSummary('');
  };

  const handleCreateActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!actTitle) return;

    addUfukActivity({
      title: actTitle,
      description: actDesc || 'Kegiatan divisi UFUK.Cendekia.',
      status: 'todo',
      priority: actPriority,
      pic: actPic,
      dueDate: actDueDate,
      googleDriveUrl:
        actDriveUrl || `https://drive.google.com/drive/folders/UFUK-ACT-${Date.now().toString().slice(-4)}`,
      checklistCount: { done: 0, total: 3 }
    });

    setShowAddActivityModal(false);
    setActTitle('');
    setActDesc('');
    setActDriveUrl('');
  };

  const handleCreateExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expTitle) return;

    addFinancialExpense({
      division: 'ufuk_cendekia',
      title: expTitle,
      category: expCategory,
      budgetedAmount: expBudget ? parseInt(expBudget.replace(/\D/g, ''), 10) : 15000000,
      spentAmount: expSpent ? parseInt(expSpent.replace(/\D/g, ''), 10) : 0,
      period: '2026',
      description: expDesc,
      date: new Date().toISOString().split('T')[0],
      receiptNumber: expReceipt || `UFUK-${Date.now().toString().slice(-4)}`
    });

    setShowAddExpenseModal(false);
    setExpTitle('');
    setExpBudget('');
    setExpSpent('');
    setExpDesc('');
    setExpReceipt('');
  };

  const filteredLibrary = libraryItems.filter(item => {
    const matchesCat = libraryCategoryFilter === 'all' || item.category === libraryCategoryFilter;
    const matchesSearch =
      !librarySearch ||
      item.title.toLowerCase().includes(librarySearch.toLowerCase()) ||
      item.author.toLowerCase().includes(librarySearch.toLowerCase()) ||
      item.isbn.toLowerCase().includes(librarySearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-semibold mb-1">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Divisi UFUK.Cendekia · Riset, Media & Kepustakaan</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            UFUK.Cendekia: Portal Ufukmedia.co, Review Artikel & Perpustakaan
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Sinergi terintegrasi publikasi artikel di Ufukmedia.co, penelaahan naskah, katalog perpustakaan, dan kegiatan kanban.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={triggerWorkspaceSync}
            disabled={isWorkspaceSyncing}
            className="px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 border border-slate-300 dark:border-slate-700 rounded-lg transition-colors flex items-center gap-1.5"
            title="Sinkronkan data dengan Google Drive & Workspace"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isWorkspaceSyncing ? 'animate-spin text-emerald-500' : ''}`} />
            <span>{isWorkspaceSyncing ? 'Menyinkronkan...' : 'Sinkronkan Google Workspace'}</span>
          </button>

          <button
            onClick={() => setShowAddActivityModal(true)}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-all flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Kegiatan Kanban</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. KOLOM YANG TERSINKRON DENGAN UFUKMEDIA.CO                              */}
      {/* ========================================================================= */}
      <div className="bg-white dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Live Feed Terhubung: Ufukmedia.co
              </h2>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Tersinkron Otomatis</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Artikel opini, kajian sains, filsafat dan riset yang telah terbit atau terjadwal di portal berita Ufukmedia.co.
            </p>
          </div>

          <a
            href="https://ufukmedia.co"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1 shrink-0"
          >
            <span>Kunjungi Portal Ufukmedia.co</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {ufukMediaFeed.map(art => (
            <div
              key={art.id}
              className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-2.5"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-mono">
                    {art.rubrik}
                  </span>
                  <span
                    className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${
                      art.status === 'Tayang'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    }`}
                  >
                    {art.status}
                  </span>
                </div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white leading-snug line-clamp-2">
                  {art.title}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                  {art.excerpt}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800 text-[10px] text-slate-400 space-y-1 font-mono">
                <div className="truncate">Penulis: <strong className="text-slate-700 dark:text-slate-300">{art.author}</strong></div>
                <div className="flex items-center justify-between">
                  <span>{art.publishDate}</span>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-0.5">
                      <Eye className="w-2.5 h-2.5 text-slate-400" />
                      <span>{art.views.toLocaleString('id-ID')}</span>
                    </span>
                    <span className="flex items-center gap-0.5">
                      <Share2 className="w-2.5 h-2.5 text-slate-400" />
                      <span>{art.shares}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. KOLOM REVIEW ARTIKEL BARU (BISA DIKOMENTARI & DIEDIT OLEH PENGGUNA)     */}
      {/* ========================================================================= */}
      <div className="bg-white dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <Edit3 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Ruang Review & Kurasi Artikel Baru
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 rounded font-semibold">
                Interaktif: Edit & Komentar Pengguna
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Pengguna dapat langsung membaca teks, menyunting draf artikel secara real-time, memberi komentar, dan membuka dokumen Google Docs.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {activeArticle && !isEditingArticle && (
              <button
                onClick={handleStartEdit}
                className="px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 border border-emerald-200 dark:border-emerald-800 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Artikel Ini</span>
              </button>
            )}

            {activeArticle && (
              <a
                href={activeArticle.googleDocsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 text-xs font-semibold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 border border-blue-200 dark:border-blue-800 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Buka di Google Docs</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>

        {/* Article Selector Strip */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-400 shrink-0 font-medium">Pilih Naskah:</span>
          {ufukArticles.map(art => (
            <button
              key={art.id}
              onClick={() => {
                setSelectedArticleId(art.id);
                setIsEditingArticle(false);
              }}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all border ${
                activeArticle?.id === art.id
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold border-slate-900 dark:border-white shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
              }`}
            >
              <span className="truncate max-w-[200px] inline-block">{art.title}</span>
            </button>
          ))}
        </div>

        {activeArticle && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-1">
            {/* Left Column (8 cols): Article Reader / Inline Editor */}
            <div className="lg:col-span-8 p-4 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/40 dark:bg-slate-900/40 space-y-3">
              {isEditingArticle ? (
                /* EDITING MODE FORM */
                <form onSubmit={handleSaveArticleEdit} className="space-y-3 text-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
                    <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Edit3 className="w-4 h-4 text-emerald-500" />
                      <span>Mode Sunting / Edit Artikel</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsEditingArticle(false)}
                      className="text-slate-400 hover:text-slate-600 text-xs"
                    >
                      Batal
                    </button>
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Judul Artikel
                    </label>
                    <input
                      type="text"
                      required
                      value={editTitle}
                      onChange={e => setEditTitle(e.target.value)}
                      className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-bold"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Kategori Rubrik
                      </label>
                      <select
                        value={editCategory}
                        onChange={e => setEditCategory(e.target.value as any)}
                        className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                      >
                        <option value="Jurnal Cendekia">Jurnal Cendekia</option>
                        <option value="Esai Budaya">Esai Budaya</option>
                        <option value="Analisis Sosio-Teknologi">Analisis Sosio-Teknologi</option>
                        <option value="Tinjauan Pustaka">Tinjauan Pustaka</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Status Kurasi Review
                      </label>
                      <select
                        value={editStatus}
                        onChange={e => setEditStatus(e.target.value as any)}
                        className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-semibold"
                      >
                        <option value="Draft">Draft</option>
                        <option value="In Review">In Review</option>
                        <option value="Revision Requested">Revision Requested</option>
                        <option value="Editing">Editing</option>
                        <option value="Approved & Ready">Approved & Ready</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Isi Teks Lengkap Naskah
                    </label>
                    <textarea
                      rows={12}
                      required
                      value={editContent}
                      onChange={e => setEditContent(e.target.value)}
                      className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono text-[11px] leading-relaxed"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsEditingArticle(false)}
                      className="px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg flex items-center gap-1.5 shadow-sm"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Simpan Perubahan Artikel</span>
                    </button>
                  </div>
                </form>
              ) : (
                /* READ-ONLY DISPLAY MODE WITH ACTION */
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 dark:border-slate-800 pb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                        {activeArticle.category}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        Status: {activeArticle.status}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">
                      Update: {activeArticle.lastUpdated}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight">
                    {activeArticle.title}
                  </h3>

                  <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
                    <span>Penulis: <strong className="text-slate-700 dark:text-slate-300">{activeArticle.author}</strong></span>
                    <span>({activeArticle.authorInstitution})</span>
                    <span>·</span>
                    <span>Reviewer: <strong>{activeArticle.reviewerPic}</strong></span>
                  </div>

                  {/* Article content box */}
                  <div className="p-3.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200 whitespace-pre-line leading-relaxed max-h-80 overflow-y-auto">
                    {activeArticle.fullContent}
                  </div>

                  {/* Google Drive and Google Docs links */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200/60 dark:border-slate-800 text-xs">
                    <a
                      href={activeArticle.googleDriveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-semibold hover:underline"
                    >
                      <FolderOpen className="w-3.5 h-3.5" />
                      <span>Buka Folder Naskah di Google Drive</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>

                    <span className="text-[11px] text-slate-400 font-mono">
                      {activeArticle.comments.length} Catatan Review
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column (4 cols): Comments and Editorial Thread */}
            <div className="lg:col-span-4 p-4 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/40 dark:bg-slate-900/40 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
                  <span className="font-bold text-slate-900 dark:text-white text-xs flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Kolom Komentar & Catatan Review</span>
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {activeArticle.comments.length} Komentar
                  </span>
                </div>

                <div className="space-y-2.5 mt-3 max-h-72 overflow-y-auto pr-1">
                  {activeArticle.comments.map(c => (
                    <div
                      key={c.id}
                      className="p-2.5 rounded-lg bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <img
                            src={c.userAvatar}
                            alt={c.userName}
                            className="w-5 h-5 rounded-full object-cover shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <span className="font-bold text-slate-800 dark:text-slate-200 text-[11px]">
                            {c.userName}
                          </span>
                        </div>
                        <span className="text-[9px] font-mono text-slate-400">{c.timestamp}</span>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed pl-6">
                        {c.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add Comment Form */}
              <form onSubmit={handleSendComment} className="pt-2 border-t border-slate-200 dark:border-slate-700 space-y-2">
                <textarea
                  rows={2}
                  required
                  value={newCommentText}
                  onChange={e => setNewCommentText(e.target.value)}
                  placeholder="Beri catatan editorial atau revisi..."
                  className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white text-xs focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="submit"
                  className="w-full py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                >
                  <Send className="w-3 h-3" />
                  <span>Kirim Komentar Pengguna</span>
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 3. KOLOM UPDATE INFORMASI PERPUSTAKAAN (KOLEKSI BUKU & RISET)              */}
      {/* ========================================================================= */}
      <div className="bg-white dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <Library className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Sistem Informasi & Katalog Perpustakaan UFUK.Cendekia
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Pusat inventaris koleksi buku cetak, manuskrip kuno, monograf riset, dan e-book dengan tautan Google Drive repository.
            </p>
          </div>

          <button
            onClick={() => setShowAddLibraryModal(true)}
            className="px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 border border-emerald-200 dark:border-emerald-800 rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Update / Tambah Koleksi Buku</span>
          </button>
        </div>

        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={librarySearch}
              onChange={e => setLibrarySearch(e.target.value)}
              placeholder="Cari judul buku, penulis, atau ISBN..."
              className="w-full pl-8 pr-3 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto">
            <span className="text-slate-400 text-[11px]">Kategori:</span>
            {['all', 'Buku Teori & Filsafat', 'Monograf Riset', 'E-Book Kebijakan', 'Arsip Naskah Klasik'].map(cat => (
              <button
                key={cat}
                onClick={() => setLibraryCategoryFilter(cat)}
                className={`px-2 py-1 rounded-md transition-colors whitespace-nowrap ${
                  libraryCategoryFilter === cat
                    ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {cat === 'all' ? 'Semua' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Library Items Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider bg-slate-50 dark:bg-slate-900/50">
                <th className="py-2.5 px-3">Judul Buku / Naskah</th>
                <th className="py-2.5 px-3">Pengarang & Penerbit</th>
                <th className="py-2.5 px-3">ISBN & Tahun</th>
                <th className="py-2.5 px-3">Kategori</th>
                <th className="py-2.5 px-3">Status Ketersediaan</th>
                <th className="py-2.5 px-3">Lokasi / Tautan Google Drive</th>
                <th className="py-2.5 px-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredLibrary.map(item => (
                <tr key={item.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                  <td className="py-3 px-3">
                    <div className="font-bold text-slate-900 dark:text-white max-w-xs">{item.title}</div>
                    <div className="text-[10px] text-slate-400 line-clamp-1">{item.summary}</div>
                  </td>

                  <td className="py-3 px-3">
                    <div className="font-semibold text-slate-800 dark:text-slate-200">{item.author}</div>
                    <div className="text-[10px] text-slate-400">{item.publisher}</div>
                  </td>

                  <td className="py-3 px-3 font-mono text-slate-600 dark:text-slate-400 whitespace-nowrap">
                    <div>{item.isbn}</div>
                    <div className="text-[10px] text-slate-400">Tahun {item.year}</div>
                  </td>

                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {item.category}
                    </span>
                  </td>

                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        item.status === 'Tersedia'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : item.status === 'Dipinjam'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="py-3 px-3">
                    <div className="text-slate-700 dark:text-slate-300 text-[11px] truncate max-w-xs">
                      {item.locationOrDriveLink}
                    </div>
                    {item.googleDriveUrl && (
                      <a
                        href={item.googleDriveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold hover:underline inline-flex items-center gap-1 mt-0.5"
                      >
                        <FolderOpen className="w-2.5 h-2.5" />
                        <span>Google Drive E-Book</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    )}
                  </td>

                  <td className="py-3 px-3 text-right">
                    <select
                      value={item.status}
                      onChange={e =>
                        updateLibraryItem({ ...item, status: e.target.value as any })
                      }
                      className="text-[10px] bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded px-2 py-1"
                    >
                      <option value="Tersedia">Tersedia</option>
                      <option value="Dipinjam">Dipinjam</option>
                      <option value="Dalam Digitalisasi">Digitalisasi</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. KOLOM KEGIATAN ALA KANBAN (TO DO, DOING, DONE)                         */}
      {/* ========================================================================= */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Papan Kegiatan Divisi UFUK.Cendekia (Kanban Board)
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Alur pengerjaan riset, pengadaan naskah, bedah buku, dan digitalisasi arsip seperti di sub divisi lain.
            </p>
          </div>

          <button
            onClick={() => setShowAddActivityModal(true)}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-all flex items-center gap-1.5 shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Kegiatan Baru</span>
          </button>
        </div>

        {/* 3-Column Kanban Board for UFUK */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* TO DO */}
          <div className="bg-slate-50/80 dark:bg-slate-850/60 rounded-xl p-3.5 border border-slate-200/80 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                To Do (Rencana Kegiatan)
              </span>
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                {ufukActivities.filter(a => a.status === 'todo').length}
              </span>
            </div>

            <div className="space-y-2.5">
              {ufukActivities
                .filter(a => a.status === 'todo')
                .map(act => (
                  <UfukActivityCard
                    key={act.id}
                    activity={act}
                    onStatusChange={newStatus => updateUfukActivityStatus(act.id, newStatus)}
                  />
                ))}
            </div>
          </div>

          {/* DOING */}
          <div className="bg-amber-50/40 dark:bg-amber-950/10 rounded-xl p-3.5 border border-amber-200/60 dark:border-amber-900/40 space-y-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-200">
                Doing (Sedang Dikerjakan)
              </span>
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-amber-200/80 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200">
                {ufukActivities.filter(a => a.status === 'doing').length}
              </span>
            </div>

            <div className="space-y-2.5">
              {ufukActivities
                .filter(a => a.status === 'doing')
                .map(act => (
                  <UfukActivityCard
                    key={act.id}
                    activity={act}
                    onStatusChange={newStatus => updateUfukActivityStatus(act.id, newStatus)}
                  />
                ))}
            </div>
          </div>

          {/* DONE */}
          <div className="bg-emerald-50/40 dark:bg-emerald-950/10 rounded-xl p-3.5 border border-emerald-200/60 dark:border-emerald-900/40 space-y-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 dark:text-emerald-200">
                Done (Selesai Dilaksanakan)
              </span>
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-emerald-200/80 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-200">
                {ufukActivities.filter(a => a.status === 'done').length}
              </span>
            </div>

            <div className="space-y-2.5">
              {ufukActivities
                .filter(a => a.status === 'done')
                .map(act => (
                  <UfukActivityCard
                    key={act.id}
                    activity={act}
                    onStatusChange={newStatus => updateUfukActivityStatus(act.id, newStatus)}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. RENCANA FINANSIAL KEGIATAN & IKLAN UFUK.CENDEKIA (SYNCED WITH BUDGET)  */}
      {/* ========================================================================= */}
      <div className="bg-white dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Rencana Finansial: Penerbitan, Kegiatan & Promosi UFUK.Cendekia
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded font-semibold">
                Tersinkronisasi dengan Budget Kolibrinest.id (Plafon Rp 400 Jt)
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Biaya percetakan buku ber-ISBN, honorarium narasumber simposium, lisensi cloud repository, dan ads promosi Ufukmedia.co.
            </p>
          </div>

          <button
            onClick={() => setShowAddExpenseModal(true)}
            className="px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Catat Pengeluaran UFUK</span>
          </button>
        </div>

        {/* Financial overview */}
        <div className="p-3.5 bg-slate-50 dark:bg-slate-900/60 rounded-lg border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="space-y-0.5">
            <span className="text-slate-400 text-[11px]">Anggaran Dianggarkan (UFUK):</span>
            <div className="text-base font-bold font-mono text-slate-900 dark:text-white">
              Rp {totalUfukBudget.toLocaleString('id-ID')}
            </div>
          </div>
          <div className="space-y-0.5">
            <span className="text-slate-400 text-[11px]">Realisasi Terpakai:</span>
            <div className="text-base font-bold font-mono text-emerald-600 dark:text-emerald-400">
              Rp {totalUfukSpent.toLocaleString('id-ID')}
            </div>
          </div>
          <div className="space-y-0.5">
            <span className="text-slate-400 text-[11px]">Sisa Kas UFUK.Cendekia:</span>
            <div className="text-base font-bold font-mono text-slate-900 dark:text-white">
              Rp {(totalUfukBudget - totalUfukSpent).toLocaleString('id-ID')}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="py-2.5 px-3">Uraian Penerbitan / Kegiatan</th>
                <th className="py-2.5 px-3">Kategori</th>
                <th className="py-2.5 px-3">Dianggarkan</th>
                <th className="py-2.5 px-3">Realisasi (Terpakai)</th>
                <th className="py-2.5 px-3">No. Invoice / Kuitansi</th>
                <th className="py-2.5 px-3">Tanggal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {ufukFinancials.map(fin => (
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

      {/* ========================================================================= */}
      {/* 6. KALENDER KHUSUS UFUK.CENDEKIA (SYNCED WITH KOLIBRINEST.ID)             */}
      {/* ========================================================================= */}
      <div className="bg-white dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Kalender Jadwal UFUK.Cendekia (Tersinkronisasi Kolibrinest.id & Google Calendar)
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Jadwal bedah buku, batas akhir penelaahan naskah, simposium pemikiran, dan publikasi artikel.
            </p>
          </div>

          <button
            onClick={onOpenCalendarModal}
            className="px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Jadwal UFUK</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {ufukEvents.map(evt => (
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

      {/* ========================================================================= */}
      {/* MODALS: ADD LIBRARY ITEM, ADD ACTIVITY, ADD EXPENSE                        */}
      {/* ========================================================================= */}

      {/* Modal Add Library Item */}
      {showAddLibraryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Tambah Koleksi Buku / E-Book Perpustakaan Baru
            </h3>
            <form onSubmit={handleCreateLibraryItem} className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Judul Buku / Monograf / E-Book <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={libTitle}
                  onChange={e => setLibTitle(e.target.value)}
                  placeholder="Contoh: Epistemologi Terbuka: Teori & Praktik Riset Digital"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Pengarang / Editor <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={libAuthor}
                    onChange={e => setLibAuthor(e.target.value)}
                    placeholder="Contoh: Dr. Irfan Sanusi"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Penerbit
                  </label>
                  <input
                    type="text"
                    value={libPublisher}
                    onChange={e => setLibPublisher(e.target.value)}
                    placeholder="Contoh: UFUK Press / Kepustakaan Utama"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Nomor ISBN
                  </label>
                  <input
                    type="text"
                    value={libIsbn}
                    onChange={e => setLibIsbn(e.target.value)}
                    placeholder="978-623-..."
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Tahun Terbit
                  </label>
                  <input
                    type="number"
                    value={libYear}
                    onChange={e => setLibYear(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Status Koleksi
                  </label>
                  <select
                    value={libStatus}
                    onChange={e => setLibStatus(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  >
                    <option value="Tersedia">Tersedia</option>
                    <option value="Dipinjam">Dipinjam</option>
                    <option value="Dalam Digitalisasi">Digitalisasi</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Kategori Koleksi
                  </label>
                  <select
                    value={libCategory}
                    onChange={e => setLibCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  >
                    <option value="Buku Teori & Filsafat">Buku Teori & Filsafat</option>
                    <option value="Monograf Riset">Monograf Riset</option>
                    <option value="E-Book Kebijakan">E-Book Kebijakan</option>
                    <option value="Arsip Naskah Klasik">Arsip Naskah Klasik</option>
                    <option value="Prosiding Konferensi">Prosiding Konferensi</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Lokasi Fisik Rak / Catatan
                  </label>
                  <input
                    type="text"
                    value={libLocation}
                    onChange={e => setLibLocation(e.target.value)}
                    placeholder="Contoh: Rak Filosofi B-02"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Tautan File E-Book di Google Drive
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={libDriveUrl}
                    onChange={e => setLibDriveUrl(e.target.value)}
                    placeholder="https://drive.google.com/drive/folders/..."
                    className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono text-[11px]"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setLibDriveUrl(`https://drive.google.com/drive/folders/UFUK-LIB-AUTO-${Date.now().toString().slice(-4)}`)
                    }
                    className="px-2.5 py-1 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg text-[10px] whitespace-nowrap"
                  >
                    Auto Generate Drive
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Abstrak / Sinopsis Koleksi
                </label>
                <textarea
                  rows={2}
                  value={libSummary}
                  onChange={e => setLibSummary(e.target.value)}
                  placeholder="Ringkasan pemikiran atau cakupan kajian..."
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddLibraryModal(false)}
                  className="px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-sm"
                >
                  Simpan ke Katalog Perpustakaan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Add Kanban Activity */}
      {showAddActivityModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Tambah Kegiatan Baru UFUK.Cendekia
            </h3>
            <form onSubmit={handleCreateActivity} className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Nama Kegiatan / Proyek
                </label>
                <input
                  type="text"
                  required
                  value={actTitle}
                  onChange={e => setActTitle(e.target.value)}
                  placeholder="Contoh: Kurasi Naskah Prosiding Simposium Nasional 2026"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Prioritas
                  </label>
                  <select
                    value={actPriority}
                    onChange={e => setActPriority(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  >
                    <option value="urgent">Mendesak (Urgent)</option>
                    <option value="high">Tinggi (High)</option>
                    <option value="medium">Sedang (Medium)</option>
                    <option value="low">Rendah (Low)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    PIC Penanggung Jawab
                  </label>
                  <input
                    type="text"
                    value={actPic}
                    onChange={e => setActPic(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Target Tanggal Tenggat
                </label>
                <input
                  type="date"
                  value={actDueDate}
                  onChange={e => setActDueDate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Tautan Berkas Google Drive Proyek
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={actDriveUrl}
                    onChange={e => setActDriveUrl(e.target.value)}
                    placeholder="https://drive.google.com/drive/folders/..."
                    className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono text-[11px]"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setActDriveUrl(`https://drive.google.com/drive/folders/UFUK-PROJ-${Date.now().toString().slice(-4)}`)
                    }
                    className="px-2.5 py-1 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg text-[10px] whitespace-nowrap"
                  >
                    Generate Drive Link
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Deskripsi Kegiatan
                </label>
                <textarea
                  rows={2}
                  value={actDesc}
                  onChange={e => setActDesc(e.target.value)}
                  placeholder="Rincian koordinasi dan target output..."
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddActivityModal(false)}
                  className="px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-sm"
                >
                  Simpan Kegiatan Kanban
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Add Expense */}
      {showAddExpenseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Catat Rencana / Realisasi Finansial UFUK.Cendekia
            </h3>
            <form onSubmit={handleCreateExpense} className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Uraian Penerbitan / Kegiatan
                </label>
                <input
                  type="text"
                  required
                  value={expTitle}
                  onChange={e => setExpTitle(e.target.value)}
                  placeholder="Contoh: Honorarium Reviewer Eksternal Naskah Jurnal"
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
                  <option value="penerbitan_buku">Penerbitan & Cetak Buku/Jurnal</option>
                  <option value="kegiatan">Kegiatan / Bedah Buku / Simposium</option>
                  <option value="iklan_ads">Iklan & Promosi Ufukmedia.co</option>
                  <option value="peralatan_lisensi">Lisensi Storage Cloud & Software</option>
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
                    placeholder="Contoh: 20000000"
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
                    placeholder="Contoh: 18500000"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Nomor Kuitansi / Invoice Ref
                </label>
                <input
                  type="text"
                  value={expReceipt}
                  onChange={e => setExpReceipt(e.target.value)}
                  placeholder="Contoh: INV-UFUK-2026-99"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddExpenseModal(false)}
                  className="px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-sm"
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

// Reusable Activity Card for UFUK.Cendekia Kanban
interface UfukActivityCardProps {
  activity: UfukActivityKanban;
  onStatusChange: (status: UfukActivityKanban['status']) => void;
}

const UfukActivityCard: React.FC<UfukActivityCardProps> = ({ activity, onStatusChange }) => {
  const priorityColors = {
    urgent: 'text-rose-600 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900',
    high: 'text-amber-600 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900',
    medium: 'text-teal-600 bg-teal-50 dark:bg-teal-950/40 border-teal-200 dark:border-teal-900',
    low: 'text-slate-600 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700'
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all space-y-2">
      <div className="flex items-center justify-between text-[10px]">
        <span className="font-semibold uppercase tracking-wider text-slate-400 font-mono">
          UFUK.Cendekia
        </span>
        <span
          className={`px-1.5 py-0.5 rounded border text-[9px] font-semibold uppercase tracking-wider ${
            priorityColors[activity.priority]
          }`}
        >
          {activity.priority}
        </span>
      </div>

      <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-snug">
        {activity.title}
      </h4>

      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
        {activity.description}
      </p>

      {/* Google Drive Link badge */}
      {activity.googleDriveUrl && (
        <a
          href={activity.googleDriveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold hover:underline"
        >
          <FolderOpen className="w-3 h-3" />
          <span>Folder Google Drive</span>
          <ExternalLink className="w-2.5 h-2.5" />
        </a>
      )}

      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
        <span className="font-mono text-slate-600 dark:text-slate-300">{activity.pic}</span>
        <span className="font-mono text-emerald-600 dark:text-emerald-400">
          Tenggat: {activity.dueDate}
        </span>
      </div>

      {/* Status Switcher Buttons */}
      <div className="flex items-center gap-1 pt-1">
        <span className="text-[10px] text-slate-400 mr-1">Ubah:</span>
        {activity.status !== 'todo' && (
          <button
            onClick={() => onStatusChange('todo')}
            className="px-2 py-0.5 text-[10px] font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 rounded"
          >
            To Do
          </button>
        )}
        {activity.status !== 'doing' && (
          <button
            onClick={() => onStatusChange('doing')}
            className="px-2 py-0.5 text-[10px] font-medium bg-amber-100 dark:bg-amber-950/60 hover:bg-amber-200 text-amber-800 dark:text-amber-300 rounded"
          >
            Doing
          </button>
        )}
        {activity.status !== 'done' && (
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
