import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BrandLogo } from '../common/BrandLogo';
import { OrderRequest } from '../../types';
import {
  LogIn,
  Send,
  Search,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Building,
  User,
  Mail,
  Phone,
  FileText,
  Calendar,
  Sparkles,
  FolderGit2,
  ExternalLink,
  Inbox
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { loginWithEmail, users, submitGuestOrder, orders } = useApp();

  // Login form state
  const [customEmail, setCustomEmail] = useState('');
  const [loginError, setLoginError] = useState('');

  // Request form state (No "Divisi yang Dituju")
  const [requestMode, setRequestMode] = useState<'create' | 'track'>('create');
  const [guestName, setGuestName] = useState('');
  const [guestOrg, setGuestOrg] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [orderTitle, setOrderTitle] = useState('');
  const [orderDesc, setOrderDesc] = useState('');
  const [requestedDeadline, setRequestedDeadline] = useState('');
  const [estimatedBudget, setEstimatedBudget] = useState('');
  const [guestDriveUrl, setGuestDriveUrl] = useState('');

  // Modal success state
  const [submittedCode, setSubmittedCode] = useState<string | null>(null);

  // Guest tracking search state
  const [trackCodeInput, setTrackCodeInput] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<OrderRequest | null | undefined>(undefined);

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customEmail) {
      setLoginError('Silakan masukkan alamat email Gmail / Kolibrinest.id Anda');
      return;
    }
    setLoginError('');
    loginWithEmail(customEmail);
  };

  const handleGuestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestEmail || !orderTitle || !orderDesc) {
      alert('Mohon lengkapi Nama, Email, Judul Kebutuhan, dan Deskripsi Pekerjaan.');
      return;
    }

    const code = submitGuestOrder({
      requesterType: 'guest',
      requesterName: guestName,
      requesterOrg: guestOrg || 'Tamu / Eksternal',
      requesterEmail: guestEmail,
      requesterPhone: guestPhone,
      targetDivision: 'cross-division', // Automatically handled centrally
      title: orderTitle,
      description: orderDesc,
      requestedDeadline: requestedDeadline || '2026-11-20',
      estimatedBudget: estimatedBudget ? parseInt(estimatedBudget.replace(/\D/g, ''), 10) : undefined,
      status: 'submitted',
      googleDriveUrl: guestDriveUrl.trim() || `https://drive.google.com/drive/folders/kolibrinest-request-${Date.now()}`
    });

    setSubmittedCode(code);
    // Reset form
    setGuestName('');
    setGuestOrg('');
    setGuestEmail('');
    setGuestPhone('');
    setOrderTitle('');
    setOrderDesc('');
    setRequestedDeadline('');
    setEstimatedBudget('');
    setGuestDriveUrl('');
  };

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackCodeInput.trim()) return;
    const found = orders.find(
      o => o.trackingCode.toUpperCase() === trackCodeInput.trim().toUpperCase()
    );
    setSearchedOrder(found || null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-red-600 selection:text-white">
      {/* Top Navbar */}
      <header className="px-5 sm:px-8 py-3.5 border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between">
        <BrandLogo size="md" showLogo={false} showSubtitle={false} />
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
          <span className="hidden sm:inline font-mono text-[11px] text-slate-300">Google Workspace SSO Active</span>
          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-semibold border border-slate-700">
            Kolibrinest Portal
          </span>
        </div>
      </header>

      {/* Main Content Area: Stacked Atas-Bawah Layout */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-8 space-y-6">
        {/* ========================================================= */}
        {/* 1. BAGIAN ATAS: LOG IN                                    */}
        {/* ========================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-2xl space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-red-950/60 border border-red-500/30 text-red-500 flex items-center justify-center shadow-xs">
                <LogIn className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-white tracking-tight">
                  LOG IN
                </h2>
                <p className="text-[11px] text-slate-400">
                  Akses Tim Internal Kolibrinest.id
                </p>
              </div>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-red-950/70 text-red-400 border border-red-800/60 font-mono">
              Internal Auth
            </span>
          </div>

          {/* 1-Click Persona Access */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-semibold text-slate-300">Pilih Personel untuk Masuk Instan:</span>
              <span className="text-[10px] text-slate-500 font-mono">1-Click Login</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {users.map(u => (
                <button
                  key={u.id}
                  onClick={() => loginWithEmail(u.email)}
                  className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-850 hover:bg-slate-800 border border-slate-800 hover:border-red-500/40 transition-all text-left group"
                >
                  <img
                    src={u.avatar}
                    alt={u.name}
                    className="w-7 h-7 rounded-full object-cover shrink-0 border border-slate-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold text-slate-200 group-hover:text-red-400 transition-colors truncate">
                      {u.name}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate">
                      <span className="uppercase font-semibold text-red-400 font-mono">
                        {u.division === 'ufuk_cendekia' ? 'UFUK' : u.division}
                      </span>
                      {' · '}{u.role}
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-red-400 group-hover:translate-x-0.5 transition-all shrink-0" />
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2.5 bg-slate-900 text-slate-400 text-[11px]">
                Atau ketik email Google Workspace
              </span>
            </div>
          </div>

          {/* Manual Email Input */}
          <form onSubmit={handleCustomLogin} className="space-y-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                Email Akun Gmail / Kolibrinest.id
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                </div>
                <input
                  type="email"
                  value={customEmail}
                  onChange={e => setCustomEmail(e.target.value)}
                  placeholder="nama@kolibrinest.id"
                  className="w-full pl-8 pr-3 py-2 text-xs bg-slate-950 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-red-500 font-mono"
                />
              </div>
              {loginError && <p className="text-[11px] text-rose-400 mt-1">{loginError}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 text-xs font-bold text-white bg-red-600 hover:bg-red-700 active:bg-red-800 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Masuk ke Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Footer Footnote */}
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-red-500" />
              <span>Google Workspace SSO Terenkripsi</span>
            </span>
            <span>v2.6 Enterprise</span>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 2. BAGIAN BAWAH: REQUEST (BERSUSUN LANGSUNG DI BAWAH)     */}
        {/* ========================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-2xl space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-red-950/40 border border-red-500/20 text-red-500 flex items-center justify-center shadow-xs">
                <Inbox className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-white tracking-tight">
                  REQUEST
                </h2>
                <p className="text-[11px] text-slate-400">
                  Order Permintaan Proyek (Tamu & Mitra)
                </p>
              </div>
            </div>

            {/* Sub-mode switcher */}
            <div className="flex items-center bg-slate-800 p-0.5 rounded-lg border border-slate-700/80 text-[10px]">
              <button
                type="button"
                onClick={() => setRequestMode('create')}
                className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
                  requestMode === 'create'
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                + Buat Request
              </button>
              <button
                type="button"
                onClick={() => setRequestMode('track')}
                className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
                  requestMode === 'track'
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Cek Status Tiket
              </button>
            </div>
          </div>

          {/* REQUEST SUB-MODE: CREATE REQUEST */}
          {requestMode === 'create' ? (
            <form onSubmit={handleGuestSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Nama Pemohon / PIC <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={e => setGuestName(e.target.value)}
                    placeholder="Contoh: Budi Santoso"
                    className="w-full px-2.5 py-1.5 text-xs bg-slate-950 border border-slate-700/80 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Email Pemohon <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={guestEmail}
                    onChange={e => setGuestEmail(e.target.value)}
                    placeholder="budi@instansi.com"
                    className="w-full px-2.5 py-1.5 text-xs bg-slate-950 border border-slate-700/80 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-red-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Instansi / Perusahaan
                  </label>
                  <input
                    type="text"
                    value={guestOrg}
                    onChange={e => setGuestOrg(e.target.value)}
                    placeholder="PT Mitra Sukses / Personal"
                    className="w-full px-2.5 py-1.5 text-xs bg-slate-950 border border-slate-700/80 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    WhatsApp / Telp
                  </label>
                  <input
                    type="tel"
                    value={guestPhone}
                    onChange={e => setGuestPhone(e.target.value)}
                    placeholder="+62 812-3456-7890"
                    className="w-full px-2.5 py-1.5 text-xs bg-slate-950 border border-slate-700/80 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-red-500 font-mono"
                  />
                </div>
              </div>

              {/* Judul Kebutuhan Pekerjaan */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Judul Kebutuhan Pekerjaan <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={orderTitle}
                  onChange={e => setOrderTitle(e.target.value)}
                  placeholder="Contoh: Pembuatan Naskah Buku Riset & Digitalisasi Dokumen"
                  className="w-full px-2.5 py-1.5 text-xs bg-slate-950 border border-slate-700/80 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                />
              </div>

              {/* Deskripsi Kebutuhan Detail */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Rincian / Deskripsi Pekerjaan <span className="text-red-400">*</span>
                </label>
                <textarea
                  rows={2}
                  required
                  value={orderDesc}
                  onChange={e => setOrderDesc(e.target.value)}
                  placeholder="Jelaskan spesifikasi, target output, materi acuan, dan detail kebutuhan Anda..."
                  className="w-full px-2.5 py-1.5 text-xs bg-slate-950 border border-slate-700/80 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Target Tenggat Waktu
                  </label>
                  <input
                    type="date"
                    value={requestedDeadline}
                    onChange={e => setRequestedDeadline(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-slate-950 border border-slate-700/80 rounded-lg text-white focus:outline-none focus:border-red-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Estimasi Anggaran / Budget (Rp)
                  </label>
                  <input
                    type="text"
                    value={estimatedBudget}
                    onChange={e => setEstimatedBudget(e.target.value)}
                    placeholder="Contoh: 15.000.000"
                    className="w-full px-2.5 py-1.5 text-xs bg-slate-950 border border-slate-700/80 rounded-lg text-white placeholder-slate-500 font-mono focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              {/* Google Drive Link Proyek */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-semibold text-slate-300 flex items-center gap-1">
                    <FolderGit2 className="w-3 h-3 text-red-400" />
                    <span>Tautan Google Drive Acuan (Opsional)</span>
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setGuestDriveUrl(`https://drive.google.com/drive/folders/kolibrinest-req-${Date.now()}`)
                    }
                    className="text-[10px] text-red-400 hover:underline"
                  >
                    + Generate Link
                  </button>
                </div>
                <input
                  type="url"
                  value={guestDriveUrl}
                  onChange={e => setGuestDriveUrl(e.target.value)}
                  placeholder="https://drive.google.com/drive/folders/..."
                  className="w-full px-2.5 py-1.5 text-xs bg-slate-950 border border-slate-700/80 rounded-lg text-white placeholder-slate-500 font-mono focus:outline-none focus:border-red-500 text-[11px]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 text-xs font-bold text-white bg-red-600 hover:bg-red-700 active:bg-red-800 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Kirim Permintaan (Order Request)</span>
              </button>
            </form>
          ) : (
            /* REQUEST SUB-MODE: TRACK TICKET */
            <div className="space-y-4 py-2">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <label className="block text-xs font-semibold text-slate-300">
                  Masukkan Nomor Tiket Pelacakan:
                </label>
                <form onSubmit={handleTrackOrder} className="flex gap-2">
                  <input
                    type="text"
                    value={trackCodeInput}
                    onChange={e => setTrackCodeInput(e.target.value)}
                    placeholder="Contoh: KNB-REQ-8492"
                    className="flex-1 px-3 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 font-mono uppercase focus:outline-none focus:border-red-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <Search className="w-3.5 h-3.5" />
                    <span>Cek</span>
                  </button>
                </form>
              </div>

              {searchedOrder !== undefined && (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                  {searchedOrder ? (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-red-400 font-bold text-sm">
                          {searchedOrder.trackingCode}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-800 text-slate-200 border border-slate-700">
                          {searchedOrder.status.replace('_', ' ')}
                        </span>
                      </div>
                      <h4 className="font-bold text-white text-sm">{searchedOrder.title}</h4>
                      <p className="text-slate-300 text-xs">{searchedOrder.description}</p>
                      <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex flex-wrap gap-x-4 gap-y-1">
                        <span>Diajukan: {searchedOrder.submittedAt}</span>
                        <span>Tenggat: {searchedOrder.requestedDeadline || '-'}</span>
                        {searchedOrder.assignedPic && (
                          <span>PIC Tim: <strong className="text-white">{searchedOrder.assignedPic}</strong></span>
                        )}
                      </div>
                      {searchedOrder.googleDriveUrl && (
                        <div className="pt-1">
                          <a
                            href={searchedOrder.googleDriveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] text-red-400 hover:underline font-semibold"
                          >
                            <FolderGit2 className="w-3 h-3" />
                            <span>Folder Google Drive Proyek</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        </div>
                      )}
                      {searchedOrder.internalNotes && (
                        <div className="p-2 rounded bg-slate-900 border border-slate-800 text-[11px] text-red-300">
                          Catatan PIC: {searchedOrder.internalNotes}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-4 text-rose-400 text-xs">
                      Kode tiket tidak ditemukan. Pastikan format penulisan sesuai (contoh: KNB-REQ-8492).
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Footer Footnote */}
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
            <span>Respon Tim PIC: 1x24 Jam Kerja</span>
            <span className="text-slate-400 font-medium">Tiket Terverifikasi Otomatis</span>
          </div>
        </section>
      </main>

      {/* Confirmation Modal when Guest submits */}
      {submittedCode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-red-500/40 rounded-2xl max-w-md w-full p-6 text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-red-950/60 border border-red-500/50 flex items-center justify-center text-red-400 mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-white">Order Request Berhasil Diajukan!</h3>
            <p className="text-xs text-slate-300">
              Permintaan pekerjaan Anda telah tercatat ke antrian manajemen Kolibrinest.id. Simpan nomor tiket berikut untuk pelacakan:
            </p>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">
                Nomor Tiket Pelacakan Anda
              </div>
              <div className="text-2xl font-black text-red-400 font-mono tracking-wider select-all">
                {submittedCode}
              </div>
            </div>

            <p className="text-[11px] text-slate-400">
              Tim manajemen Kolibrinest.id akan meninjau dan menghubungi Anda melalui email atau WhatsApp.
            </p>

            <button
              onClick={() => setSubmittedCode(null)}
              className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-colors"
            >
              Tutup & Selesai
            </button>
          </div>
        </div>
      )}

      {/* Clean Footer */}
      <footer className="px-6 py-3 border-t border-slate-800/80 text-center text-[11px] text-slate-500 bg-slate-950">
        © 2026 KOLIBRINEST.ID · Enterprise Project, Division & Budget Management Platform
      </footer>
    </div>
  );
};
