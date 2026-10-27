import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AppSettings } from '../../types';
import {
  Settings,
  Sun,
  Moon,
  Laptop,
  Type,
  Palette,
  Maximize2,
  Bell,
  Calendar,
  User,
  Shield,
  RotateCcw,
  CheckCircle2
} from 'lucide-react';

export const SettingsTab: React.FC = () => {
  const { settings, updateSettings, currentUser, resetToInitialData } = useApp();

  const [savedAlert, setSavedAlert] = useState(false);

  const handleUpdate = (patch: Partial<AppSettings>) => {
    updateSettings(patch);
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 2000);
  };

  const colors = [
    { id: 'red', label: 'Kolibri Crimson', hex: 'bg-red-600', ring: 'ring-red-500' },
    { id: 'emerald', label: 'Sage Emerald', hex: 'bg-emerald-600', ring: 'ring-emerald-500' },
    { id: 'indigo', label: 'Deep Indigo', hex: 'bg-indigo-600', ring: 'ring-indigo-500' },
    { id: 'cyan', label: 'Ocean Cyan', hex: 'bg-cyan-600', ring: 'ring-cyan-500' },
    { id: 'amber', label: 'Sunset Amber', hex: 'bg-amber-600', ring: 'ring-amber-500' },
    { id: 'rose', label: 'Rose Slate', hex: 'bg-rose-600', ring: 'ring-rose-500' }
  ];

  return (
    <div className="space-y-8 pb-12 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-100 dark:bg-red-950/60 text-red-800 dark:text-red-300 text-xs font-semibold mb-1">
            <Settings className="w-3.5 h-3.5" />
            <span>Pengaturan Sistem & Personalisasi</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Pengaturan Tampilan, Font & Warna
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Kustomisasi antarmuka aplikasi KOLIBRINEST.ID sesuai kenyamanan kerja Anda.
          </p>
        </div>

        {savedAlert && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-100 dark:bg-red-950/80 text-red-800 dark:text-red-300 text-xs font-semibold animate-in fade-in">
            <CheckCircle2 className="w-4 h-4" />
            <span>Pengaturan Berhasil Diterapkan!</span>
          </div>
        )}
      </div>

      {/* 1. TAMPILAN TEMA (LIGHT / DARK / SYSTEM) */}
      <div className="bg-white dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 p-5 space-y-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sun className="w-4 h-4 text-red-600 dark:text-red-400" />
            <span>Mode Tampilan (Theme Mode)</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Pilih tema visual yang nyaman untuk mata saat bekerja di siang maupun malam hari.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => handleUpdate({ themeMode: 'light' })}
            className={`p-3.5 rounded-xl border text-center space-y-2 transition-all ${
              settings.themeMode === 'light'
                ? 'border-red-600 bg-red-50/50 dark:bg-red-950/20 text-red-900 dark:text-red-200 font-semibold ring-2 ring-red-500/20'
                : 'border-slate-200 dark:border-slate-700 bg-slate-50/40 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400 hover:bg-slate-100'
            }`}
          >
            <Sun className="w-5 h-5 mx-auto text-amber-500" />
            <div className="text-xs font-bold">Terang (Light)</div>
            <div className="text-[10px] text-slate-400">Latar bersih putih</div>
          </button>

          <button
            onClick={() => handleUpdate({ themeMode: 'dark' })}
            className={`p-3.5 rounded-xl border text-center space-y-2 transition-all ${
              settings.themeMode === 'dark'
                ? 'border-red-600 bg-red-50/50 dark:bg-red-950/20 text-red-900 dark:text-red-200 font-semibold ring-2 ring-red-500/20'
                : 'border-slate-200 dark:border-slate-700 bg-slate-50/40 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400 hover:bg-slate-100'
            }`}
          >
            <Moon className="w-5 h-5 mx-auto text-indigo-400" />
            <div className="text-xs font-bold">Gelap (Dark)</div>
            <div className="text-[10px] text-slate-400">Latar slate gelap</div>
          </button>

          <button
            onClick={() => handleUpdate({ themeMode: 'system' })}
            className={`p-3.5 rounded-xl border text-center space-y-2 transition-all ${
              settings.themeMode === 'system'
                ? 'border-red-600 bg-red-50/50 dark:bg-red-950/20 text-red-900 dark:text-red-200 font-semibold ring-2 ring-red-500/20'
                : 'border-slate-200 dark:border-slate-700 bg-slate-50/40 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400 hover:bg-slate-100'
            }`}
          >
            <Laptop className="w-5 h-5 mx-auto text-teal-500" />
            <div className="text-xs font-bold">Sistem (Auto)</div>
            <div className="text-[10px] text-slate-400">Mengikuti OS</div>
          </button>
        </div>
      </div>

      {/* 2. PILIHAN FONT (TYPOGRAPHY) */}
      <div className="bg-white dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 p-5 space-y-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Type className="w-4 h-4 text-red-600 dark:text-red-400" />
            <span>Pilihan Font Huruf (Typography)</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Pilih keluarga font yang diterapkan pada antarmuka aplikasi.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <button
            onClick={() => handleUpdate({ fontFamily: 'plus_jakarta' })}
            className={`p-3.5 rounded-xl border text-left space-y-1.5 transition-all ${
              settings.fontFamily === 'plus_jakarta'
                ? 'border-red-600 bg-red-50/50 dark:bg-red-950/20 text-red-900 dark:text-red-200 font-semibold ring-2 ring-red-500/20'
                : 'border-slate-200 dark:border-slate-700 bg-slate-50/40 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300'
            }`}
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            <div className="font-bold text-sm">Plus Jakarta Sans</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">
              Modern neo-grotesque, sangat rapi dan elegan untuk software enterprise.
            </div>
          </button>

          <button
            onClick={() => handleUpdate({ fontFamily: 'outfit' })}
            className={`p-3.5 rounded-xl border text-left space-y-1.5 transition-all ${
              settings.fontFamily === 'outfit'
                ? 'border-red-600 bg-red-50/50 dark:bg-red-950/20 text-red-900 dark:text-red-200 font-semibold ring-2 ring-red-500/20'
                : 'border-slate-200 dark:border-slate-700 bg-slate-50/40 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300'
            }`}
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            <div className="font-bold text-sm">Outfit Sans</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">
              Desain geometris dinamis, memberikan nuansa agensi kreatif berenergi tinggi.
            </div>
          </button>

          <button
            onClick={() => handleUpdate({ fontFamily: 'system' })}
            className={`p-3.5 rounded-xl border text-left space-y-1.5 transition-all ${
              settings.fontFamily === 'system'
                ? 'border-red-600 bg-red-50/50 dark:bg-red-950/20 text-red-900 dark:text-red-200 font-semibold ring-2 ring-red-500/20'
                : 'border-slate-200 dark:border-slate-700 bg-slate-50/40 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300'
            }`}
            style={{ fontFamily: "system-ui, sans-serif" }}
          >
            <div className="font-bold text-sm">System UI Native</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">
              Menggunakan font bawaan sistem operasi (San Francisco / Segoe UI / Roboto).
            </div>
          </button>
        </div>
      </div>

      {/* 3. AKSEN WARNA TEMA (COLOR ACCENT) */}
      <div className="bg-white dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 p-5 space-y-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Palette className="w-4 h-4 text-red-600 dark:text-red-400" />
            <span>Aksen Warna Tema (Theme Color Accent)</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Pilih warna primer identitas yang menghiasi tombol aksi, grafik, dan sorotan antarmuka.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
          {colors.map(c => {
            const isSelected = settings.accentColor === c.id;
            return (
              <button
                key={c.id}
                onClick={() => handleUpdate({ accentColor: c.id as any })}
                className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                  isSelected
                    ? 'border-red-600 dark:border-red-500 bg-red-50/40 dark:bg-red-950/30 ring-2 ring-red-500/40 font-bold'
                    : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                <div className={`w-6 h-6 rounded-full ${c.hex} shadow-xs shrink-0`} />
                <span className="text-xs text-slate-800 dark:text-slate-200">{c.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. SKALA UKURAN HURUF (FONT SIZE) */}
      <div className="bg-white dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 p-5 space-y-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Maximize2 className="w-4 h-4 text-red-600 dark:text-red-400" />
            <span>Kepadatan Tampilan & Skala Huruf</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Atur kepadatan informasi agar sesuai dengan resolusi layar monitor Anda.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 text-xs">
          {[
            { id: 'small', label: 'Kompak (Small)', desc: 'Teks padat untuk data analitik luas' },
            { id: 'normal', label: 'Standar (Normal)', desc: 'Ukuran ideal seimbang' },
            { id: 'large', label: 'Lega (Large)', desc: 'Ukuran besar dengan keterbacaan tinggi' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => handleUpdate({ fontSize: f.id as any })}
              className={`p-3.5 rounded-xl border text-center space-y-1 transition-all ${
                settings.fontSize === f.id
                  ? 'border-red-600 bg-red-50/50 dark:bg-red-950/20 text-red-900 dark:text-red-200 font-semibold ring-2 ring-red-500/20'
                  : 'border-slate-200 dark:border-slate-700 bg-slate-50/40 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400'
              }`}
            >
              <div className="font-bold">{f.label}</div>
              <div className="text-[10px] text-slate-400">{f.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 5. PROFIL PENGGUNA & PREFERENSI SISTEM */}
      <div className="bg-white dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 p-5 space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <User className="w-4 h-4 text-red-600 dark:text-red-400" />
          <span>Informasi Profil Personel Aktif</span>
        </h2>

        {currentUser && (
          <div className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-red-500 shrink-0"
              referrerPolicy="no-referrer"
            />
            <div className="space-y-0.5">
              <div className="text-sm font-bold text-slate-900 dark:text-white">{currentUser.name}</div>
              <div className="text-xs text-slate-500">{currentUser.email}</div>
              <div className="text-[11px] font-mono text-red-600 dark:text-red-400 uppercase font-semibold">
                Divisi: {currentUser.division} · {currentUser.role}
              </div>
            </div>
          </div>
        )}

        <div className="space-y-3 pt-2 text-xs">
          <label className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer">
            <div>
              <div className="font-semibold text-slate-900 dark:text-white">
                Sinkronisasi Otomatis Kalender Kolibrinest.id
              </div>
              <div className="text-[11px] text-slate-500">
                Hubungkan setiap jadwal rapat dan deadline divisi ke Google Calendar utama.
              </div>
            </div>
            <input
              type="checkbox"
              checked={settings.autoSyncCalendar}
              onChange={e => handleUpdate({ autoSyncCalendar: e.target.checked })}
              className="rounded text-red-600 focus:ring-red-500 w-4 h-4"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer">
            <div>
              <div className="font-semibold text-slate-900 dark:text-white">
                Notifikasi Pengajuan Order Tamu Masuk
              </div>
              <div className="text-[11px] text-slate-500">
                Kirim alert notifikasi ketika ada pemohon baru mengirim tiket pekerjaan via form login.
              </div>
            </div>
            <input
              type="checkbox"
              checked={settings.notificationsEnabled}
              onChange={e => handleUpdate({ notificationsEnabled: e.target.checked })}
              className="rounded text-red-600 focus:ring-red-500 w-4 h-4"
            />
          </label>
        </div>
      </div>

      {/* 6. RESET DATA AWAL */}
      <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-900/40 bg-rose-50/40 dark:bg-rose-950/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div>
          <div className="font-bold text-rose-900 dark:text-rose-200 flex items-center gap-1.5">
            <RotateCcw className="w-4 h-4 text-rose-600" />
            <span>Reset Data Demo Kolibrinest.id</span>
          </div>
          <div className="text-[11px] text-rose-700/80 dark:text-rose-300/70 mt-0.5">
            Kembalikan seluruh tugas, anggaran Rp 1.5 Miliar, dan tiket order ke kondisi awal.
          </div>
        </div>

        <button
          onClick={() => {
            if (confirm('Apakah Anda yakin ingin mengatur ulang data aplikasi ke setelan awal?')) {
              resetToInitialData();
              alert('Data aplikasi telah dikembalikan ke kondisi awal.');
            }
          }}
          className="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold transition-colors shrink-0"
        >
          Reset Data Awal
        </button>
      </div>
    </div>
  );
};
