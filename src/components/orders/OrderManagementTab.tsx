import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { OrderRequest, DivisionType } from '../../types';
import {
  Inbox,
  Filter,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus,
  Send,
  Building,
  User,
  Mail,
  Phone,
  FileText,
  DollarSign,
  ArrowRight,
  ShieldAlert,
  Calendar,
  FolderGit2,
  ExternalLink
} from 'lucide-react';

export const OrderManagementTab: React.FC = () => {
  const { orders, updateOrderStatus, submitGuestOrder, currentUser } = useApp();

  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [divisionFilter, setDivisionFilter] = useState<string>('all');
  const [searchCode, setSearchCode] = useState('');

  // Selected order for review modal
  const [selectedOrder, setSelectedOrder] = useState<OrderRequest | null>(null);
  const [reviewStatus, setReviewStatus] = useState<OrderRequest['status']>('reviewing');
  const [reviewNotes, setReviewNotes] = useState('');
  const [assignedPic, setAssignedPic] = useState('');

  // Modal to create internal order
  const [showInternalOrderModal, setShowInternalOrderModal] = useState(false);
  const [internalTargetDiv, setInternalTargetDiv] = useState<DivisionType>('ufuk_cendekia');
  const [internalTitle, setInternalTitle] = useState('');
  const [internalDesc, setInternalDesc] = useState('');
  const [internalDeadline, setInternalDeadline] = useState('2026-11-15');
  const [internalBudget, setInternalBudget] = useState('');
  const [internalDriveUrl, setInternalDriveUrl] = useState('');

  const filteredOrders = orders.filter(o => {
    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
    const matchesDiv = divisionFilter === 'all' || o.targetDivision === divisionFilter;
    const matchesSearch =
      !searchCode ||
      o.trackingCode.toLowerCase().includes(searchCode.toLowerCase()) ||
      o.title.toLowerCase().includes(searchCode.toLowerCase()) ||
      o.requesterName.toLowerCase().includes(searchCode.toLowerCase()) ||
      (o.requesterOrg && o.requesterOrg.toLowerCase().includes(searchCode.toLowerCase()));
    return matchesStatus && matchesDiv && matchesSearch;
  });

  const handleUpdateReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) return;

    updateOrderStatus(selectedOrder.id, reviewStatus, reviewNotes, assignedPic);
    setSelectedOrder(null);
  };

  const handleCreateInternalOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!internalTitle) return;

    const requesterName = currentUser ? currentUser.name : 'Divisi Internal';
    const requesterEmail = currentUser ? currentUser.email : 'internal@kolibrinest.id';
    const requesterOrg = currentUser
      ? `Divisi ${currentUser.division.toUpperCase()} Kolibrinest.id`
      : 'Unit Internal Kolibrinest.id';

    submitGuestOrder({
      requesterType: 'internal_division',
      requesterName,
      requesterEmail,
      requesterOrg,
      targetDivision: internalTargetDiv,
      title: internalTitle,
      description: internalDesc,
      requestedDeadline: internalDeadline,
      estimatedBudget: internalBudget ? parseInt(internalBudget.replace(/\D/g, ''), 10) : undefined,
      status: 'submitted',
      googleDriveUrl: internalDriveUrl.trim() || `https://drive.google.com/drive/folders/kolibrinest-order-${Date.now()}`
    });

    setShowInternalOrderModal(false);
    setInternalTitle('');
    setInternalDesc('');
    setInternalBudget('');
    setInternalDriveUrl('');
  };

  const getStatusBadge = (status: OrderRequest['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300';
      case 'approved':
        return 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300';
      case 'reviewing':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300';
      case 'rejected':
        return 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300';
      default:
        return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-semibold mb-1">
            <Inbox className="w-3.5 h-3.5" />
            <span>Pusat Order Request</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Order Request Tamu & Antar Divisi
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Daftar antrian permintaan pekerjaan dari Guest / Klien luar dan permintaan kolaborasi antar divisi/unit lain.
          </p>
        </div>

        <button
          onClick={() => setShowInternalOrderModal(true)}
          className="px-3.5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-all flex items-center gap-1.5 shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Buat Order Antar Divisi</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 p-4 space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search box */}
          <div className="relative flex-1 max-w-sm">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchCode}
              onChange={e => setSearchCode(e.target.value)}
              placeholder="Cari kode tiket (KNB-REQ-...), pemohon, atau judul..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400"
            />
          </div>

          {/* Division Filter */}
          <div className="flex items-center gap-1 text-xs overflow-x-auto">
            <span className="text-slate-400 mr-1 text-[11px]">Target:</span>
            {[
              { id: 'all', label: 'Semua Divisi' },
              { id: 'sales', label: 'Sales' },
              { id: 'marketing', label: 'Marketing' },
              { id: 'ufuk_cendekia', label: 'UFUK.Cendekia' }
            ].map(div => (
              <button
                key={div.id}
                onClick={() => setDivisionFilter(div.id)}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors whitespace-nowrap ${
                  divisionFilter === div.id
                    ? 'bg-emerald-600 text-white font-semibold'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {div.label}
              </button>
            ))}
          </div>
        </div>

        {/* Status Pills */}
        <div className="flex items-center gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800 overflow-x-auto text-xs">
          <span className="text-slate-400 mr-1 text-[11px]">Status:</span>
          {[
            { id: 'all', label: 'Semua Status' },
            { id: 'submitted', label: 'Diajukan' },
            { id: 'reviewing', label: 'Ditinjau' },
            { id: 'approved', label: 'Disetujui' },
            { id: 'in_progress', label: 'Dikerjakan' },
            { id: 'completed', label: 'Selesai' },
            { id: 'rejected', label: 'Ditolak' }
          ].map(st => (
            <button
              key={st.id}
              onClick={() => setStatusFilter(st.id)}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors whitespace-nowrap ${
                statusFilter === st.id
                  ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider bg-slate-50 dark:bg-slate-900/50">
                <th className="py-3 px-4">Tiket & Tanggal</th>
                <th className="py-3 px-4">Pemohon & Instansi</th>
                <th className="py-3 px-4">Kebutuhan Proyek</th>
                <th className="py-3 px-4">Tenggat</th>
                <th className="py-3 px-4">Estimasi Budget</th>
                <th className="py-3 px-4">Status & PIC</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400 text-xs">
                    Tidak ada order request yang ditemukan pada kriteria filter ini.
                  </td>
                </tr>
              ) : (
                filteredOrders.map(order => (
                  <tr key={order.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                    <td className="py-3.5 px-4">
                      <div className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                        {order.trackingCode}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">{order.submittedAt}</div>
                      <span className="text-[9px] font-semibold uppercase px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                        {order.requesterType === 'guest' ? 'Tamu / Klien' : 'Internal'}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 dark:text-white">
                        {order.requesterName}
                      </div>
                      <div className="text-[11px] text-slate-500">{order.requesterOrg || '-'}</div>
                      <div className="text-[10px] text-slate-400">{order.requesterEmail}</div>
                    </td>

                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="font-semibold text-slate-900 dark:text-white truncate">
                        {order.title}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                        {order.description}
                      </div>
                      {order.googleDriveUrl && (
                        <div className="mt-1">
                          <a
                            href={order.googleDriveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-[10px] text-blue-600 dark:text-blue-400 hover:underline font-semibold bg-blue-50 dark:bg-blue-950/40 px-1.5 py-0.5 rounded"
                          >
                            <FolderGit2 className="w-2.5 h-2.5" />
                            <span>Drive Folder Proyek</span>
                            <ExternalLink className="w-2 h-2" />
                          </a>
                        </div>
                      )}
                    </td>

                    <td className="py-3.5 px-4 font-mono text-slate-600 dark:text-slate-400 whitespace-nowrap">
                      {order.requestedDeadline || '-'}
                    </td>

                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900 dark:text-white tabular-nums whitespace-nowrap">
                      {order.estimatedBudget
                        ? `Rp ${(order.estimatedBudget / 1000000).toFixed(0)} Jt`
                        : '-'}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${getStatusBadge(order.status)}`}>
                        {order.status.replace('_', ' ')}
                      </span>
                      {order.assignedPic && (
                        <div className="text-[10px] text-slate-400 mt-1">
                          PIC: <span className="font-medium text-slate-600 dark:text-slate-300">{order.assignedPic}</span>
                        </div>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => {
                          setSelectedOrder(order);
                          setReviewStatus(order.status);
                          setReviewNotes(order.internalNotes || '');
                          setAssignedPic(order.assignedPic || '');
                        }}
                        className="px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 border border-emerald-200 dark:border-emerald-800 rounded-lg transition-colors whitespace-nowrap"
                      >
                        Kelola
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review & Update Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Tinjau & Kelola Order Request
                </h3>
                <span className="font-mono text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                  {selectedOrder.trackingCode}
                </span>
              </div>
              <span className={`px-2.5 py-1 text-xs font-semibold uppercase rounded ${getStatusBadge(selectedOrder.status)}`}>
                {selectedOrder.status.replace('_', ' ')}
              </span>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Pemohon:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {selectedOrder.requesterName} ({selectedOrder.requesterOrg || 'Tamu'})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Kontak:</span>
                <span className="text-slate-700 dark:text-slate-300">
                  {selectedOrder.requesterEmail} {selectedOrder.requesterPhone && `· ${selectedOrder.requesterPhone}`}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Divisi Target:</span>
                <span className="font-bold uppercase text-emerald-600 dark:text-emerald-400">
                  {selectedOrder.targetDivision === 'ufuk_cendekia' ? 'UFUK.Cendekia' : selectedOrder.targetDivision}
                </span>
              </div>
              {selectedOrder.googleDriveUrl && (
                <div className="flex justify-between items-center pt-1 border-t border-slate-200 dark:border-slate-700">
                  <span className="text-slate-400 flex items-center gap-1">
                    <FolderGit2 className="w-3 h-3 text-blue-500" />
                    Google Drive Folder:
                  </span>
                  <a
                    href={selectedOrder.googleDriveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                  >
                    <span>Buka Folder Drive</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              )}
              <div className="pt-1 border-t border-slate-200 dark:border-slate-700">
                <span className="font-semibold text-slate-800 dark:text-slate-200 block mb-0.5">
                  {selectedOrder.title}
                </span>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {selectedOrder.description}
                </p>
              </div>
            </div>

            <form onSubmit={handleUpdateReview} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Ubah Status Tiket
                  </label>
                  <select
                    value={reviewStatus}
                    onChange={e => setReviewStatus(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-medium"
                  >
                    <option value="submitted">Submitted (Baru Diajukan)</option>
                    <option value="reviewing">Reviewing (Sedang Ditinjau)</option>
                    <option value="approved">Approved (Disetujui)</option>
                    <option value="in_progress">In Progress (Sedang Dikerjakan)</option>
                    <option value="completed">Completed (Selesai)</option>
                    <option value="rejected">Rejected (Ditolak)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Alokasikan PIC Penanggung Jawab
                  </label>
                  <input
                    type="text"
                    value={assignedPic}
                    onChange={e => setAssignedPic(e.target.value)}
                    placeholder="Contoh: Rina Kusuma"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Catatan Review / Feedback Penanganan
                </label>
                <textarea
                  rows={2}
                  value={reviewNotes}
                  onChange={e => setReviewNotes(e.target.value)}
                  placeholder="Keterangan tindak lanjut untuk tim atau pemohon..."
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  className="px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100"
                >
                  Tutup
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg"
                >
                  Simpan Perubahan Status
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Create Internal Order Request */}
      {showInternalOrderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Buat Permintaan Order Antar Divisi
            </h3>
            <p className="text-xs text-slate-500">
              Gunakan formulir ini untuk meminta dukungan pekerjaan dari divisi/unit internal lain di Kolibrinest.id.
            </p>

            <form onSubmit={handleCreateInternalOrder} className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Judul Kebutuhan Pekerjaan <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={internalTitle}
                  onChange={e => setInternalTitle(e.target.value)}
                  placeholder="Contoh: Pembuatan Riset Kebijakan & Digitalisasi Naskah Kolibrinest"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Deskripsi Kebutuhan Detail <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  value={internalDesc}
                  onChange={e => setInternalDesc(e.target.value)}
                  placeholder="Jelaskan spesifikasi detail, output yang diharapkan, dan urgensi pekerjaan..."
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Target Tenggat Waktu
                  </label>
                  <input
                    type="date"
                    value={internalDeadline}
                    onChange={e => setInternalDeadline(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Estimasi Biaya / Budget (Rp)
                  </label>
                  <input
                    type="text"
                    value={internalBudget}
                    onChange={e => setInternalBudget(e.target.value)}
                    placeholder="Contoh: 15000000"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <FolderGit2 className="w-3.5 h-3.5 text-blue-500" />
                    Tautan Folder Google Drive (Storage Proyek)
                  </span>
                  <button
                    type="button"
                    onClick={() => setInternalDriveUrl(`https://drive.google.com/drive/folders/kolibrinest-order-${Date.now()}`)}
                    className="text-[10px] text-blue-600 dark:text-blue-400 hover:underline font-normal"
                  >
                    + Generate Drive Link
                  </button>
                </label>
                <input
                  type="url"
                  value={internalDriveUrl}
                  onChange={e => setInternalDriveUrl(e.target.value)}
                  placeholder="https://drive.google.com/drive/folders/..."
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowInternalOrderModal(false)}
                  className="px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg"
                >
                  Kirim Permintaan Internal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
