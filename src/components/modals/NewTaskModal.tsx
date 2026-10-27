import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DivisionType, TaskPriority, TaskStatus } from '../../types';
import { X, Plus, Calendar, Clock, Tag, User, Layers, FolderOpen, ExternalLink, Sparkles } from 'lucide-react';

interface NewTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewTaskModal: React.FC<NewTaskModalProps> = ({ isOpen, onClose }) => {
  const { addTask, users, personnel, currentUser } = useApp();

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [division, setDivision] = useState<DivisionType>(currentUser?.division || 'sales');
  const [status, setStatus] = useState<TaskStatus>('todo');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [assigneeId, setAssigneeId] = useState(currentUser?.id || 'user-sales');
  const [dueDate, setDueDate] = useState('2026-11-05');
  const [estimatedHours, setEstimatedHours] = useState('6');
  const [tags, setTags] = useState('Project, Q4');
  const [googleDriveUrl, setGoogleDriveUrl] = useState('');

  if (!isOpen) return null;

  const handleGenerateDriveLink = () => {
    const slug = title
      ? title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .slice(0, 24)
      : 'project-folder';
    const generated = `https://drive.google.com/drive/folders/KNB-${division.toUpperCase()}-${slug}-${Date.now().toString().slice(-4)}`;
    setGoogleDriveUrl(generated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const assignedPerson =
      personnel.find(p => p.id === assigneeId) ||
      users.find(u => u.id === assigneeId) || { name: 'Ahmad Pratama' };

    addTask({
      title,
      description: desc || 'Pekerjaan baru yang dialokasikan dalam dashboard Kolibrinest.id.',
      division,
      status,
      priority,
      assigneeId,
      assigneeName: assignedPerson.name,
      dueDate,
      estimatedHours: parseInt(estimatedHours, 10) || 4,
      tags: tags.split(',').map(t => t.trim()),
      googleDriveUrl:
        googleDriveUrl ||
        `https://drive.google.com/drive/folders/KNB-${division.toUpperCase()}-${Date.now().toString().slice(-4)}`,
      checklist: [
        { id: 'chk-1', text: 'Brief & persiapan dokumen di Google Drive', completed: false },
        { id: 'chk-2', text: 'Eksekusi & koordinasi divisi', completed: false }
      ],
      progressPercent: status === 'done' ? 100 : status === 'doing' ? 50 : 0
    });

    onClose();
    setTitle('');
    setDesc('');
    setGoogleDriveUrl('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center">
              <Plus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Input Proyek & Pekerjaan Baru
              </h3>
              <p className="text-[11px] text-slate-400">
                Terhubung otomatis dengan Google Drive & Google Workspace
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
              Judul Proyek / Pekerjaan <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Contoh: Kurasi Naskah Monograf Sains Kebudayaan 2026"
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-red-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                Divisi Penanggung Jawab
              </label>
              <select
                value={division}
                onChange={e => setDivision(e.target.value as DivisionType)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-medium"
              >
                <option value="ufuk_cendekia">Divisi UFUK.Cendekia</option>
                <option value="sales">Divisi Sales</option>
                <option value="marketing">Divisi Marketing</option>
                <option value="cross-division">Kolaborasi Antar Divisi</option>
                <option value="management">Management & Ops</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                Personel yang Ditugaskan
              </label>
              <select
                value={assigneeId}
                onChange={e => setAssigneeId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-medium"
              >
                {personnel.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.division === 'ufuk_cendekia' ? 'UFUK' : p.division.toUpperCase()})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Tautan ke Google Drive untuk setiap project baru */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-red-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5 text-xs">
                <FolderOpen className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                <span>Tautan Folder Google Drive Proyek</span>
              </label>
              <button
                type="button"
                onClick={handleGenerateDriveLink}
                className="text-[10px] text-red-600 dark:text-red-400 font-bold hover:underline flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3" />
                <span>Buat Tautan Otomatis</span>
              </button>
            </div>
            <input
              type="url"
              value={googleDriveUrl}
              onChange={e => setGoogleDriveUrl(e.target.value)}
              placeholder="https://drive.google.com/drive/folders/..."
              className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono text-[11px]"
            />
            <p className="text-[10px] text-slate-500">
              Folder repositori dokumen, naskah, brief, dan aset digital tersinkron dengan akun Google Workspace Kolibrinest.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                Status Alur
              </label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value as TaskStatus)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              >
                <option value="todo">To Do</option>
                <option value="doing">Doing</option>
                <option value="done">Done</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                Tingkat Prioritas
              </label>
              <select
                value={priority}
                onChange={e => setPriority(e.target.value as TaskPriority)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              >
                <option value="urgent">Urgent</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                Tenggat Waktu
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={e => setDueDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                Estimasi Jam Kerja
              </label>
              <input
                type="number"
                min="1"
                max="40"
                value={estimatedHours}
                onChange={e => setEstimatedHours(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                Tag / Kategori
              </label>
              <input
                type="text"
                value={tags}
                onChange={e => setTags(e.target.value)}
                placeholder="Riset, Dokumen, Q4"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
              Deskripsi Pekerjaan
            </label>
            <textarea
              rows={2}
              value={desc}
              onChange={e => setDesc(e.target.value)}
              placeholder="Rincian tujuan dan materi pendukung..."
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-semibold rounded-lg shadow-sm transition-all"
            >
              Simpan Proyek & Buat Tautan Drive
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
