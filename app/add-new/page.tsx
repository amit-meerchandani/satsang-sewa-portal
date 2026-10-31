'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { addNewSewadar } from '@/data/mockSewadars';
import { SewaRole, HistoryRecord } from '@/lib/types';
import { UserPlus, History, CheckCircle2, ArrowRight } from 'lucide-react';

export default function AddNewPage() {
  const router = useRouter();

  // Basic Information States
  const [iNo, setINo] = useState('');
  const [name, setName] = useState('');
  const [centre, setCentre] = useState('');
  const [area, setArea] = useState('');
  const [sewa, setSewa] = useState<SewaRole>('SK');
  const [category, setCategory] = useState<'Regular' | 'Baal Satsang'>('Regular');
  
  // Safe Date initialization (hydrated on client to avoid prerender build errors)
  const [dateOfJoining, setDateOfJoining] = useState('');

  // Initial History Entry States
  const [approvedId, setApprovedId] = useState('APP-01');
  const [status, setStatus] = useState<HistoryRecord['status']>('Approved');
  const [remarks, setRemarks] = useState('Initial record registration and onboarding.');

  // UI States
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    setDateOfJoining(new Date().toISOString().split('T')[0]);
  }, []);

  const handleCategoryChange = (val: 'Regular' | 'Baal Satsang') => {
    setCategory(val);
    if (val === 'Baal Satsang') {
      setSewa('BSK');
    } else {
      setSewa('SK');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Basic Validation
    if (!iNo.trim() || !name.trim() || !centre.trim() || !area.trim()) {
      setErrorMsg('Please fill in all required fields (I No., Name, Centre, and Area).');
      return;
    }

    const effectiveDate = dateOfJoining || new Date().toISOString().split('T')[0];

    const initialHistory: HistoryRecord = {
      id: `h-${Date.now()}`,
      date: effectiveDate,
      approvedId: approvedId.trim() || 'ADMIN-01',
      status: status,
      remarks: remarks.trim() || 'Record created.',
    };

    addNewSewadar({
      iNo: iNo.trim().toUpperCase(),
      name: name.trim(),
      centre: centre.trim(),
      area: area.trim(),
      sewa: sewa,
      category: category,
      dateOfJoining: effectiveDate,
      history: [initialHistory],
    });

    setIsSuccess(true);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="pb-4 border-b border-[#D1D5DB]">
        <h1 className="text-xl font-bold text-[#1F2937]">Add New Sewadar</h1>
        <p className="text-xs text-[#6B7280] mt-0.5">
          Register a new profile for Satsang Karta, Pathi, Satsang Reader, or Baal Satsang Karta
        </p>
      </div>

      {/* Success Notification */}
      {isSuccess ? (
        <div className="bg-white border border-[#D1D5DB] rounded p-6 shadow-xs text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#F8EBEB] text-[#7A1315] flex items-center justify-center mx-auto">
            <CheckCircle2 size={28} />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#1F2937]">Record Created Successfully</h2>
            <p className="text-xs text-[#6B7280] mt-1">
              Member <strong>{name}</strong> ({iNo.toUpperCase()}) has been registered as{' '}
              <strong>{sewa}</strong> ({category}).
            </p>
          </div>
          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => {
                setIsSuccess(false);
                setINo('');
                setName('');
                setCentre('');
                setArea('');
                setCategory('Regular');
                setSewa('SK');
              }}
              className="px-4 py-2 text-xs font-semibold rounded border border-[#D1D5DB] text-[#374151] hover:bg-[#ECECEC]"
            >
              Add Another Member
            </button>
            <button
              onClick={() => router.push(category === 'Baal Satsang' ? '/baal-satsang' : '/')}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded bg-[#7A1315] text-white hover:bg-[#630f11]"
            >
              <span>Go to {category === 'Baal Satsang' ? 'Baal Satsang' : 'Dashboard'}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {errorMsg && (
            <div className="p-3 bg-[#F8EBEB] text-[#7A1315] border border-[#7A1315]/30 rounded text-xs font-semibold">
              {errorMsg}
            </div>
          )}

          {/* Section 1: Member Primary Details */}
          <div className="bg-white border border-[#D1D5DB] rounded p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-[#E5E7EB] text-[#7A1315]">
              <UserPlus size={16} />
              <h2 className="text-xs font-bold uppercase tracking-wider">Primary Member Details</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* Category Selection */}
              <div>
                <label className="block font-semibold text-[#374151] mb-1.5">
                  Category <span className="text-[#7A1315]">*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => handleCategoryChange(e.target.value as 'Regular' | 'Baal Satsang')}
                  className="w-full px-3 py-2 border border-[#D1D5DB] rounded text-xs focus:outline-none focus:border-[#7A1315] text-[#1F2937] bg-white"
                >
                  <option value="Regular">Regular</option>
                  <option value="Baal Satsang">Baal Satsang</option>
                </select>
              </div>

              {/* Sewa Selection */}
              <div>
                <label className="block font-semibold text-[#374151] mb-1.5">
                  Sewa Role <span className="text-[#7A1315]">*</span>
                </label>
                <select
                  value={sewa}
                  disabled={category === 'Baal Satsang'}
                  onChange={(e) => setSewa(e.target.value as SewaRole)}
                  className={`w-full px-3 py-2 border border-[#D1D5DB] rounded text-xs focus:outline-none focus:border-[#7A1315] text-[#1F2937] bg-white ${
                    category === 'Baal Satsang' ? 'opacity-70 bg-slate-100 cursor-not-allowed' : ''
                  }`}
                >
                  {category === 'Baal Satsang' ? (
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

              {/* I No. */}
              <div>
                <label className="block font-semibold text-[#374151] mb-1.5">
                  I No. (Identity Number) <span className="text-[#7A1315]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder={category === 'Baal Satsang' ? 'e.g. BSK-205' : 'e.g. SK-205, PT-110, SR-401'}
                  value={iNo}
                  onChange={(e) => setINo(e.target.value)}
                  className="w-full px-3 py-2 border border-[#D1D5DB] rounded text-xs focus:outline-none focus:border-[#7A1315] text-[#1F2937]"
                />
              </div>

              {/* Full Name */}
              <div>
                <label className="block font-semibold text-[#374151] mb-1.5">
                  Full Name <span className="text-[#7A1315]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Suraj Parkash"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-[#D1D5DB] rounded text-xs focus:outline-none focus:border-[#7A1315] text-[#1F2937]"
                />
              </div>

              {/* Centre */}
              <div>
                <label className="block font-semibold text-[#374151] mb-1.5">
                  Centre <span className="text-[#7A1315]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Central Hub, City East"
                  value={centre}
                  onChange={(e) => setCentre(e.target.value)}
                  className="w-full px-3 py-2 border border-[#D1D5DB] rounded text-xs focus:outline-none focus:border-[#7A1315] text-[#1F2937]"
                />
              </div>

              {/* Area */}
              <div>
                <label className="block font-semibold text-[#374151] mb-1.5">
                  Area / Zone <span className="text-[#7A1315]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. North Zone, West Zone"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="w-full px-3 py-2 border border-[#D1D5DB] rounded text-xs focus:outline-none focus:border-[#7A1315] text-[#1F2937]"
                />
              </div>

              {/* Date of Joining */}
              <div className="md:col-span-2">
                <label className="block font-semibold text-[#374151] mb-1.5">
                  Date of Joining <span className="text-[#7A1315]">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={dateOfJoining}
                  onChange={(e) => setDateOfJoining(e.target.value)}
                  className="w-full px-3 py-1.5 border border-[#D1D5DB] rounded text-xs focus:outline-none focus:border-[#7A1315] text-[#1F2937] bg-white"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Initial History Log Entry */}
          <div className="bg-white border border-[#D1D5DB] rounded p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-[#E5E7EB] text-[#7A1315]">
              <History size={16} />
              <h2 className="text-xs font-bold uppercase tracking-wider">Initial Approval & Remarks</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* Approved ID */}
              <div>
                <label className="block font-semibold text-[#374151] mb-1.5">Approved ID / Badge</label>
                <input
                  type="text"
                  placeholder="e.g. APP-01"
                  value={approvedId}
                  onChange={(e) => setApprovedId(e.target.value)}
                  className="w-full px-3 py-2 border border-[#D1D5DB] rounded text-xs focus:outline-none focus:border-[#7A1315] text-[#1F2937]"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block font-semibold text-[#374151] mb-1.5">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as HistoryRecord['status'])}
                  className="w-full px-3 py-2 border border-[#D1D5DB] rounded text-xs focus:outline-none focus:border-[#7A1315] text-[#1F2937] bg-white"
                >
                  <option value="Approved">Approved</option>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Under Review">Under Review</option>
                </select>
              </div>

              {/* Remarks */}
              <div className="md:col-span-2">
                <label className="block font-semibold text-[#374151] mb-1.5">Remarks / Notes</label>
                <textarea
                  rows={2}
                  placeholder="Enter initial registration remarks..."
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  className="w-full px-3 py-2 border border-[#D1D5DB] rounded text-xs focus:outline-none focus:border-[#7A1315] text-[#1F2937]"
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => router.push('/')}
              className="px-4 py-2 rounded border border-[#D1D5DB] text-xs font-semibold text-[#4B5563] bg-white hover:bg-[#ECECEC]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded text-xs font-semibold bg-[#7A1315] text-white hover:bg-[#630f11] shadow-xs"
            >
              Save Sewadar Record
            </button>
          </div>
        </form>
      )}
    </div>
  );
}