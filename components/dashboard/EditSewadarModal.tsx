'use client';

import React, { useState } from 'react';
import { Sewadar, SewaRole, HistoryRecord } from '@/lib/types';
import { X, Edit3, Plus, History } from 'lucide-react';

interface EditSewadarModalProps {
  sewadar: Sewadar | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updated: Sewadar) => void;
}

export default function EditSewadarModal({
  sewadar,
  isOpen,
  onClose,
  onSave,
}: EditSewadarModalProps) {
  if (!isOpen || !sewadar) return null;

  // Editable Form Fields
  const [name, setName] = useState(sewadar.name);
  const [centre, setCentre] = useState(sewadar.centre);
  const [area, setArea] = useState(sewadar.area);
  const [sewa, setSewa] = useState<SewaRole>(sewadar.sewa);
  const [dateOfJoining, setDateOfJoining] = useState(sewadar.dateOfJoining);

  // New History Entry Fields
  const [showAddHistory, setShowAddHistory] = useState(false);
  const [newHistDate, setNewHistDate] = useState(new Date().toISOString().split('T')[0]);
  const [newHistApprovedId, setNewHistApprovedId] = useState('APP-01');
  const [newHistStatus, setNewHistStatus] = useState<HistoryRecord['status']>('Approved');
  const [newHistRemarks, setNewHistRemarks] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let updatedHistory = [...sewadar.history];

    // If new remark/history was added
    if (showAddHistory && newHistRemarks.trim()) {
      const entry: HistoryRecord = {
        id: `h-${Date.now()}`,
        date: newHistDate,
        approvedId: newHistApprovedId.trim() || 'ADMIN-01',
        status: newHistStatus,
        remarks: newHistRemarks.trim(),
      };
      updatedHistory = [entry, ...updatedHistory];
    }

    const updated: Sewadar = {
      ...sewadar,
      name: name.trim(),
      centre: centre.trim(),
      area: area.trim(),
      sewa: sewa,
      dateOfJoining: dateOfJoining,
      history: updatedHistory,
    };

    onSave(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="bg-white rounded border border-[#D1D5DB] w-full max-w-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-[#ECECEC] px-6 py-3.5 border-b border-[#D1D5DB] flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#7A1315]">
            <Edit3 size={17} />
            <h3 className="text-sm font-bold uppercase tracking-wider">
              Edit Sewadar Details ({sewadar.iNo})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#6B7280] hover:text-[#111827] p-1 rounded hover:bg-white/60 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto text-xs">
          {/* Identity Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-[#374151] mb-1">I No. (Identity)</label>
              <input
                type="text"
                disabled
                value={sewadar.iNo}
                className="w-full px-3 py-2 border border-[#D1D5DB] rounded bg-slate-100 text-[#6B7280] cursor-not-allowed font-semibold"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#374151] mb-1">
                Full Name <span className="text-[#7A1315]">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-[#D1D5DB] rounded focus:outline-none focus:border-[#7A1315] text-[#1F2937]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#374151] mb-1">
                Centre <span className="text-[#7A1315]">*</span>
              </label>
              <input
                type="text"
                required
                value={centre}
                onChange={(e) => setCentre(e.target.value)}
                className="w-full px-3 py-2 border border-[#D1D5DB] rounded focus:outline-none focus:border-[#7A1315] text-[#1F2937]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#374151] mb-1">
                Area / Zone <span className="text-[#7A1315]">*</span>
              </label>
              <input
                type="text"
                required
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full px-3 py-2 border border-[#D1D5DB] rounded focus:outline-none focus:border-[#7A1315] text-[#1F2937]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#374151] mb-1">Sewa Role</label>
              <select
                value={sewa}
                disabled={sewadar.category === 'Baal Satsang'}
                onChange={(e) => setSewa(e.target.value as SewaRole)}
                className="w-full px-3 py-2 border border-[#D1D5DB] rounded focus:outline-none focus:border-[#7A1315] text-[#1F2937] bg-white disabled:bg-slate-100 disabled:text-[#6B7280]"
              >
                {sewadar.category === 'Baal Satsang' ? (
                  <option value="BSK">Baal Satsang Karta (BSK)</option>
                ) : (
                  <>
                    <option value="SK">Satsang Karta (SK)</option>
                    <option value="Pathi">Pathi</option>
                    <option value="SR">Satsang Readers (SR)</option>
                  </>
                )}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-[#374151] mb-1">Date of Joining</label>
              <input
                type="date"
                required
                value={dateOfJoining}
                onChange={(e) => setDateOfJoining(e.target.value)}
                className="w-full px-3 py-1.5 border border-[#D1D5DB] rounded focus:outline-none focus:border-[#7A1315] text-[#1F2937] bg-white"
              />
            </div>
          </div>

          {/* Section: Append New History / Remark */}
          <div className="pt-2 border-t border-[#E5E7EB]">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-[#7A1315] uppercase tracking-wider flex items-center gap-1.5">
                <History size={14} />
                <span>History Log Update</span>
              </span>
              <button
                type="button"
                onClick={() => setShowAddHistory(!showAddHistory)}
                className="flex items-center gap-1 text-[11px] font-semibold text-[#7A1315] hover:underline"
              >
                <Plus size={12} />
                <span>{showAddHistory ? 'Cancel Entry' : '+ Add New History Remark'}</span>
              </button>
            </div>

            {showAddHistory && (
              <div className="p-3 bg-[#F8EBEB]/40 border border-[#D1D5DB] rounded space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold text-[#374151] mb-1">Date</label>
                    <input
                      type="date"
                      value={newHistDate}
                      onChange={(e) => setNewHistDate(e.target.value)}
                      className="w-full px-2 py-1.5 border border-[#D1D5DB] rounded bg-white text-[#1F2937]"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-[#374151] mb-1">Approved ID</label>
                    <input
                      type="text"
                      placeholder="e.g. APP-09"
                      value={newHistApprovedId}
                      onChange={(e) => setNewHistApprovedId(e.target.value)}
                      className="w-full px-2 py-1.5 border border-[#D1D5DB] rounded bg-white text-[#1F2937]"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-[#374151] mb-1">Status</label>
                    <select
                      value={newHistStatus}
                      onChange={(e) => setNewHistStatus(e.target.value as HistoryRecord['status'])}
                      className="w-full px-2 py-1.5 border border-[#D1D5DB] rounded bg-white text-[#1F2937]"
                    >
                      <option value="Approved">Approved</option>
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                      <option value="Under Review">Under Review</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block font-semibold text-[#374151] mb-1">New Remarks</label>
                  <textarea
                    rows={2}
                    placeholder="Enter approval details or rotation update..."
                    value={newHistRemarks}
                    onChange={(e) => setNewHistRemarks(e.target.value)}
                    className="w-full px-2 py-1.5 border border-[#D1D5DB] rounded bg-white text-[#1F2937]"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Modal Actions */}
          <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded border border-[#D1D5DB] font-semibold text-[#4B5563] bg-white hover:bg-[#ECECEC] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded font-semibold bg-[#7A1315] text-white hover:bg-[#630f11] shadow-xs transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}