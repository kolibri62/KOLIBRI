import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TaskStatus, TaskPriority, TaskItem } from '../../types';
import {
  UserCheck,
  CheckCircle2,
  Clock,
  Plus,
  Calendar,
  AlertCircle,
  Tag,
  CheckSquare,
  Sparkles,
  Flame,
  Filter,
  FolderGit2,
  ExternalLink
} from 'lucide-react';

interface PersonalWorkspaceTabProps {
  onOpenNewTaskModal: () => void;
}

export const PersonalWorkspaceTab: React.FC<PersonalWorkspaceTabProps> = ({
  onOpenNewTaskModal
}) => {
  const { currentUser, tasks, addTask, updateTaskStatus, updateTask } = useApp();

  // If no user, fallback
  const user = currentUser || {
    id: 'user-mgmt',
    name: 'Ahmad Pratama',
    email: 'management@kolibrinest.id',
    division: 'management'
  };

  // Filter tasks assigned to current user
  const myTasks = tasks.filter(
    t => t.assigneeId === user.id || t.assigneeName.toLowerCase().includes(user.name.toLowerCase().split(' ')[0])
  );

  const [activeFilter, setActiveFilter] = useState<'all' | 'todo' | 'doing' | 'done' | 'urgent'>('all');

  // Inline quick add task form state
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [taskPriority, setTaskPriority] = useState<TaskPriority>('medium');
  const [taskDueDate, setTaskDueDate] = useState('');
  const [taskHours, setTaskHours] = useState('4');
  const [taskTag, setTaskTag] = useState('');
  const [taskDriveUrl, setTaskDriveUrl] = useState('');

  const handleInlineAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle) return;

    addTask({
      title: taskTitle,
      description: taskDesc || 'Pekerjaan pribadi yang perlu diselesaikan.',
      division: (user.division as any) || 'management',
      status: 'todo',
      priority: taskPriority,
      assigneeId: user.id,
      assigneeName: user.name,
      dueDate: taskDueDate || new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
      estimatedHours: parseInt(taskHours, 10) || 4,
      tags: taskTag ? taskTag.split(',').map(s => s.trim()) : ['Personal', 'Workspace'],
      checklist: [
        { id: 'c1', text: 'Riset & persiapan materi', completed: false },
        { id: 'c2', text: 'Pengerjaan & validasi', completed: false }
      ],
      progressPercent: 0,
      googleDriveUrl: taskDriveUrl.trim() || `https://drive.google.com/drive/folders/kolibrinest-personal-${Date.now()}`
    });

    setTaskTitle('');
    setTaskDesc('');
    setTaskTag('');
    setTaskDriveUrl('');
  };

  const filteredTasks = myTasks.filter(t => {
    if (activeFilter === 'todo') return t.status === 'todo';
    if (activeFilter === 'doing') return t.status === 'doing';
    if (activeFilter === 'done') return t.status === 'done';
    if (activeFilter === 'urgent') return t.priority === 'urgent' || t.priority === 'high';
    return true;
  });

  const todoCount = myTasks.filter(t => t.status === 'todo').length;
  const doingCount = myTasks.filter(t => t.status === 'doing').length;
  const doneCount = myTasks.filter(t => t.status === 'done').length;

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-100 dark:bg-red-950/60 text-red-800 dark:text-red-300 text-xs font-semibold mb-1">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Ruang Kerja Pribadi</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Pekerjaan Saya: {user.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Daftar pekerjaan yang perlu diinput dan dilakukan secara mandiri oleh Anda ({user.email}).
          </p>
        </div>

        <button
          onClick={onOpenNewTaskModal}
          className="px-3.5 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm transition-all flex items-center gap-1.5 shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Input Pekerjaan Baru</span>
        </button>
      </div>

      {/* Overview KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
          <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Total Tugas Saya</div>
          <div className="text-xl font-bold font-mono text-slate-900 dark:text-white tabular-nums mt-0.5">
            {myTasks.length}
          </div>
        </div>
        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
          <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">To Do (Perlu Dikerjakan)</div>
          <div className="text-xl font-bold font-mono text-amber-600 dark:text-amber-400 tabular-nums mt-0.5">
            {todoCount}
          </div>
        </div>
        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
          <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Sedang Berjalan</div>
          <div className="text-xl font-bold font-mono text-blue-600 dark:text-blue-400 tabular-nums mt-0.5">
            {doingCount}
          </div>
        </div>
        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
          <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Diselesaikan</div>
          <div className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400 tabular-nums mt-0.5">
            {doneCount}
          </div>
        </div>
      </div>

      {/* FORM INPUT PEKERJAAN PRIBADI (QUICK TASK INPUT) */}
      <div className="bg-white dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 p-5 space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
          <Plus className="w-4 h-4 text-red-600 dark:text-red-400" />
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Formulir Input Pekerjaan Pribadi yang Perlu Dilakukan
          </h2>
        </div>

        <form onSubmit={handleInlineAddTask} className="space-y-3.5 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="md:col-span-2">
              <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                Judul Pekerjaan / Tugas <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={taskTitle}
                onChange={e => setTaskTitle(e.target.value)}
                placeholder="Contoh: Mengulas draft proposal kolaborasi Q4 sebelum meeting"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                Tenggat Waktu (Due Date)
              </label>
              <input
                type="date"
                value={taskDueDate}
                onChange={e => setTaskDueDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                Prioritas
              </label>
              <select
                value={taskPriority}
                onChange={e => setTaskPriority(e.target.value as TaskPriority)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              >
                <option value="urgent">Mendesak (Urgent)</option>
                <option value="high">Tinggi (High)</option>
                <option value="medium">Sedang (Medium)</option>
                <option value="low">Rendah (Low)</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                Estimasi Alokasi Jam
              </label>
              <input
                type="number"
                min="1"
                max="40"
                value={taskHours}
                onChange={e => setTaskHours(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                Label / Tag (Pisahkan Koma)
              </label>
              <input
                type="text"
                value={taskTag}
                onChange={e => setTaskTag(e.target.value)}
                placeholder="Review, Dokumen, Urgent"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <FolderGit2 className="w-3.5 h-3.5 text-blue-500" />
                Tautan Folder Google Drive (Project Storage)
              </span>
              <button
                type="button"
                onClick={() => setTaskDriveUrl(`https://drive.google.com/drive/folders/kolibrinest-prj-${Date.now()}`)}
                className="text-[10px] text-blue-600 dark:text-blue-400 hover:underline font-normal"
              >
                + Buat Link Drive Otomatis
              </button>
            </label>
            <input
              type="url"
              value={taskDriveUrl}
              onChange={e => setTaskDriveUrl(e.target.value)}
              placeholder="https://drive.google.com/drive/folders/..."
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono text-xs"
            />
          </div>

          <div>
            <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
              Deskripsi & Rincian Instruksi
            </label>
            <textarea
              rows={2}
              value={taskDesc}
              onChange={e => setTaskDesc(e.target.value)}
              placeholder="Catatan detail mengenai hal-hal yang perlu disiapkan atau dikoordinasikan..."
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
            />
          </div>

          <div className="flex justify-end pt-1">
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm transition-all flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Simpan ke Daftar Pekerjaan Saya</span>
            </button>
          </div>
        </form>
      </div>

      {/* FILTER & DAFTAR TUGAS PRIBADI */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-red-600 dark:text-red-400" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Daftar Pekerjaan yang Harus Dilakukan
            </h2>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs">
            {[
              { id: 'all', label: 'Semua' },
              { id: 'todo', label: 'To Do' },
              { id: 'doing', label: 'Doing' },
              { id: 'done', label: 'Done' },
              { id: 'urgent', label: 'Prioritas Tinggi' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as any)}
                className={`px-3 py-1 rounded-md font-medium transition-colors ${
                  activeFilter === tab.id
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {filteredTasks.length === 0 ? (
          <div className="p-8 text-center bg-white dark:bg-slate-850 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 text-xs text-slate-400">
            Tidak ada pekerjaan yang cocok dengan filter ini. Silakan input tugas baru di atas.
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTasks.map(task => (
              <div
                key={task.id}
                className="p-4 rounded-xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/40 transition-colors space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {task.division}
                      </span>
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                          task.priority === 'urgent'
                            ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                            : task.priority === 'high'
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                            : 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300'
                        }`}
                      >
                        {task.priority}
                      </span>
                      <h3
                        className={`text-sm font-bold text-slate-900 dark:text-white ${
                          task.status === 'done' ? 'line-through text-slate-400 dark:text-slate-500' : ''
                        }`}
                      >
                        {task.title}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300">{task.description}</p>
                  </div>

                  {/* Status Toggle Buttons */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => updateTaskStatus(task.id, 'todo')}
                      className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                        task.status === 'todo'
                          ? 'bg-slate-800 text-white font-bold'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                      }`}
                    >
                      To Do
                    </button>
                    <button
                      onClick={() => updateTaskStatus(task.id, 'doing')}
                      className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                        task.status === 'doing'
                          ? 'bg-amber-600 text-white font-bold'
                          : 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 hover:bg-amber-100'
                      }`}
                    >
                      Doing
                    </button>
                    <button
                      onClick={() => updateTaskStatus(task.id, 'done')}
                      className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                        task.status === 'done'
                          ? 'bg-emerald-600 text-white font-bold'
                          : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100'
                      }`}
                    >
                      Done
                    </button>
                  </div>
                </div>

                {/* Checklist items */}
                {task.checklist && task.checklist.length > 0 && (
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 space-y-1.5">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                      Checklist Sub-Pekerjaan:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {task.checklist.map(item => (
                        <label
                          key={item.id}
                          className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300 hover:text-slate-900"
                        >
                          <input
                            type="checkbox"
                            checked={item.completed}
                            onChange={() => {
                              const updatedChecklist = task.checklist.map(c =>
                                c.id === item.id ? { ...c, completed: !c.completed } : c
                              );
                              const completedCount = updatedChecklist.filter(c => c.completed).length;
                              const newProgress = Math.round(
                                (completedCount / updatedChecklist.length) * 100
                              );
                              updateTask({
                                ...task,
                                checklist: updatedChecklist,
                                progressPercent: newProgress,
                                status: newProgress === 100 ? 'done' : task.status
                              });
                            }}
                            className="rounded text-emerald-600 focus:ring-emerald-500"
                          />
                          <span className={item.completed ? 'line-through text-slate-400' : ''}>
                            {item.text}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Footer metadata */}
                <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800 font-mono gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span>Tenggat: <strong className="text-slate-700 dark:text-slate-300">{task.dueDate}</strong></span>
                    <span>·</span>
                    <span>Estimasi: {task.estimatedHours} Jam</span>
                    {task.googleDriveUrl && (
                      <>
                        <span>·</span>
                        <a
                          href={task.googleDriveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline font-semibold bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded"
                          title="Buka Folder Google Drive Project"
                        >
                          <FolderGit2 className="w-3 h-3" />
                          <span>Google Drive Folder</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5">
                    {task.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
