'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { addNewSewadar } from '@/data/mockSewadars';
import { SewaRole, HistoryRecord } from '@/lib/types';
import { UserPlus, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function AddNewPage() {
  const router = useRouter();

  // Basic Form Fields
  const [name, setName] = useState('');
  const [iNo, setINo] = useState('');
  const [centre, setCentre] = useState('');
  const [area, setArea] = useState('');
  const [sewa, setSewa] = useState<SewaRole>('SK');
  const [dateOfJoining, setDateOfJoining] = useState('');

  // Extended Details
  const [beasId, setBeasId] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  // Initial Appointment History Log Fields (Status must match HistoryRecord['status'])
  const [historyStatus, setHistoryStatus] = useState<HistoryRecord['status']>('Appointed');
  const [letterId, setLetterId] = useState('');
  const [remarks, setRemarks] = useState('Appointed by SCI');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    setDateOfJoining(new Date().toISOString().split('T')[0]);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const category = sewa === 'BSK' ? 'Baal Satsang' : 'Regular';
    const currentYear = new Date().getFullYear();

    const initialHistory: HistoryRecord = {
      id: `h-${Date.now()}`,
      centre: centre.trim(),
      area: area.trim(),
      designation: sewa,
      status: historyStatus,
      letterId: letterId.trim() || `SCI/RAJ/${currentYear}/001`,
      fromDate: dateOfJoining || new Date().toISOString().split('T')[0],
      tillDate: new Date(new Date().setFullYear(currentYear + 5)).toISOString().split('T')[0],
      remarks: remarks.trim() || 'Appointed for 5 Years by SCI',
    };

    addNewSewadar({
      iNo: iNo.trim().toUpperCase(),
      name: name.trim(),
      centre: centre.trim(),
      area: area.trim(),
      sewa,
      category,
      dateOfJoining: dateOfJoining || new Date().toISOString().split('T')[0],
      beasId: beasId.trim() || `B-${Math.floor(10000 + Math.random() * 90000)}`,
      gender: 'Male',
      dob: '1985-01-01',
      age: 41,
      fatherName: '-',
      motherName: '-',
      marriageStatus: 'Married',
      aadharNumber: 'XXXX-XXXX-0000',
      address: `${centre.trim()}, ${area.trim()}, Rajasthan`,
      phone: phone.trim() || '+91 98000 00000',
      email: email.trim() || 'member@example.com',
      initiationDate: dateOfJoining || new Date().toISOString().split('T')[0],
      status: 'Active',
      qualification: 'Graduate',
      profession: 'Private Sector',
      exitDate: '-',
      remarks: remarks.trim() || 'Initial appointment record created.',
      history: [initialHistory],
    });

    setIsSuccess(true);
    setTimeout(() => {
      if (category === 'Baal Satsang') {
        router.push('/baal-satsang');
      } else {
        router.push('/');
      }
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-[#D1D5DB]">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-[#F8EBEB] text-[#7A1315]">
              <UserPlus size={18} />
            </span>
            <h1 className="text-xl font-bold text-[#1F2937]">Add New Sewadar Record</h1>
          </div>
          <p className="text-xs text-[#6B7280] mt-1">
            Create an entry with initial appointment history
          </p>
        </div>

        <Link
          href="/"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-[#D1D5DB] text-xs font-semibold text-[#4B5563] bg-white hover:bg-[#ECECEC] transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to Dashboard</span>
        </Link>
      </div>

      {isSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 size={18} className="text-emerald-600" />
          <span>Record created successfully! Redirecting to dashboard...</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white border border-[#D1D5DB] rounded shadow-xs p-6 space-y-6">
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#7A1315] pb-2 border-b border-[#E5E7EB] mb-4">
            1. Core Member Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-[#374151] mb-1.5">
                Full Name <span className="text-[#7A1315]">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Ramesh Kumar"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-[#D1D5DB] rounded focus:outline-none focus:border-[#7A1315] text-[#1F2937]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#374151] mb-1.5">
                Identity No. (I No.) <span className="text-[#7A1315]">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. SK-116 or BSK-216"
                value={iNo}
                onChange={(e) => setINo(e.target.value)}
                className="w-full px-3 py-2 border border-[#D1D5DB] rounded focus:outline-none focus:border-[#7A1315] text-[#1F2937]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#374151] mb-1.5">Beas ID (Optional)</label>
              <input
                type="text"
                placeholder="e.g. B-99214"
                value={beasId}
                onChange={(e) => setBeasId(e.target.value)}
                className="w-full px-3 py-2 border border-[#D1D5DB] rounded focus:outline-none focus:border-[#7A1315] text-[#1F2937]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#374151] mb-1.5">
                Centre <span className="text-[#7A1315]">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Jhotwara"
                value={centre}
                onChange={(e) => setCentre(e.target.value)}
                className="w-full px-3 py-2 border border-[#D1D5DB] rounded focus:outline-none focus:border-[#7A1315] text-[#1F2937]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#374151] mb-1.5">
                Area / Zone <span className="text-[#7A1315]">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Jaipur"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full px-3 py-2 border border-[#D1D5DB] rounded focus:outline-none focus:border-[#7A1315] text-[#1F2937]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#374151] mb-1.5">
                Sewa Role <span className="text-[#7A1315]">*</span>
              </label>
              <select
                value={sewa}
                onChange={(e) => setSewa(e.target.value as SewaRole)}
                className="w-full px-3 py-2 border border-[#D1D5DB] rounded focus:outline-none focus:border-[#7A1315] text-[#1F2937] bg-white"
              >
                <option value="SK">Satsang Karta (SK)</option>
                <option value="Pathi">Pathi</option>
                <option value="SR">Satsang Readers (SR)</option>
                <option value="BSK">Baal Satsang Karta (BSK)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-[#374151] mb-1.5">Phone Number</label>
              <input
                type="text"
                placeholder="+91 98290 00000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 border border-[#D1D5DB] rounded focus:outline-none focus:border-[#7A1315] text-[#1F2937]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#374151] mb-1.5">Email Address</label>
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-[#D1D5DB] rounded focus:outline-none focus:border-[#7A1315] text-[#1F2937]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#374151] mb-1.5">Date of Joining</label>
              <input
                type="date"
                required
                value={dateOfJoining}
                onChange={(e) => setDateOfJoining(e.target.value)}
                className="w-full px-3 py-1.5 border border-[#D1D5DB] rounded focus:outline-none focus:border-[#7A1315] text-[#1F2937] bg-white"
              />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#7A1315] pb-2 border-b border-[#E5E7EB] mb-4">
            2. Initial Appointment Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-[#374151] mb-1.5">Appointment Status</label>
              <select
                value={historyStatus}
                onChange={(e) => setHistoryStatus(e.target.value as HistoryRecord['status'])}
                className="w-full px-3 py-2 border border-[#D1D5DB] rounded focus:outline-none focus:border-[#7A1315] text-[#1F2937] bg-white"
              >
                <option value="Appointed">Appointed</option>
                <option value="Extension">Extension</option>
                <option value="Completed">Completed</option>
                <option value="Under Review">Under Review</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-[#374151] mb-1.5">Letter ID</label>
              <input
                type="text"
                placeholder="e.g. SCI/RAJ/2026/045"
                value={letterId}
                onChange={(e) => setLetterId(e.target.value)}
                className="w-full px-3 py-2 border border-[#D1D5DB] rounded focus:outline-none focus:border-[#7A1315] text-[#1F2937]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#374151] mb-1.5">Appointment Remarks</label>
              <input
                type="text"
                placeholder="e.g. Appointed for 5 Years by SCI"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                className="w-full px-3 py-2 border border-[#D1D5DB] rounded focus:outline-none focus:border-[#7A1315] text-[#1F2937]"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-end gap-3">
          <Link
            href="/"
            className="px-4 py-2 rounded border border-[#D1D5DB] text-xs font-semibold text-[#4B5563] bg-white hover:bg-[#ECECEC] transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-5 py-2 rounded text-xs font-semibold bg-[#7A1315] text-white hover:bg-[#630f11] shadow-xs transition-colors"
          >
            Save Record
          </button>
        </div>
      </form>
    </div>
  );
}