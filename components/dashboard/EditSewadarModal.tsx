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

  // Basic Information
  const [name, setName] = useState(sewadar.name);
  const [beasId, setBeasId] = useState(sewadar.beasId || '');
  const [gender, setGender] = useState(sewadar.gender || 'Male');
  const [dob, setDob] = useState(sewadar.dob || '');
  const [age, setAge] = useState(sewadar.age || 0);
  const [fatherName, setFatherName] = useState(sewadar.fatherName || '');
  const [motherName, setMotherName] = useState(sewadar.motherName || '');
  const [marriageStatus, setMarriageStatus] = useState(sewadar.marriageStatus || 'Married');
  const [spouseName, setSpouseName] = useState(sewadar.spouseName || '');
  const [aadharNumber, setAadharNumber] = useState(sewadar.aadharNumber || '');
  const [address, setAddress] = useState(sewadar.address || '');
  const [phone, setPhone] = useState(sewadar.phone || '');
  const [email, setEmail] = useState(sewadar.email || '');

  // Sewa Details
  const [centre, setCentre] = useState(sewadar.centre);
  const [area, setArea] = useState(sewadar.area);
  const [sewa, setSewa] = useState<SewaRole>(sewadar.sewa);
  const [initiationDate, setInitiationDate] = useState(sewadar.initiationDate || '');
  const [status, setStatus] = useState(sewadar.status || 'Active');
  const [qualification, setQualification] = useState(sewadar.qualification || '');
  const [profession, setProfession] = useState(sewadar.profession || '');
  const [dateOfJoining, setDateOfJoining] = useState(sewadar.dateOfJoining);
  const [exitDate, setExitDate] = useState(sewadar.exitDate || '');
  const [remarks, setRemarks] = useState(sewadar.remarks || '');

  // Add History Record Form
  const [showAddHistory, setShowAddHistory] = useState(false);
  const [histStatus, setHistStatus] = useState<HistoryRecord['status']>('Extension');
  const [histLetterId, setHistLetterId] = useState('');
  const [histFromDate, setHistFromDate] = useState(new Date().toISOString().split('T')[0]);
  const [histTillDate, setHistTillDate] = useState('');
  const [histRemarks, setHistRemarks] = useState('Extension for 5 Years');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let updatedHistory = [...sewadar.history];

    if (showAddHistory && histRemarks.trim()) {
      const entry: HistoryRecord = {
        id: `h-${Date.now()}`,
        centre: centre.trim(),
        area: area.trim(),
        designation: sewa,
        status: histStatus,
        letterId: histLetterId.trim() || `SCI/RAJ/${new Date().getFullYear()}/001`,
        fromDate: histFromDate,
        tillDate: histTillDate || histFromDate,
        remarks: histRemarks.trim(),
      };
      updatedHistory = [entry, ...updatedHistory];
    }

    const updated: Sewadar = {
      ...sewadar,
      name: name.trim(),
      beasId: beasId.trim(),
      gender,
      dob,
      age: Number(age) || 0,
      fatherName: fatherName.trim(),
      motherName: motherName.trim(),
      marriageStatus,
      spouseName: spouseName.trim(),
      aadharNumber: aadharNumber.trim(),
      address: address.trim(),
      phone: phone.trim(),
      email: email.trim(),
      centre: centre.trim(),
      area: area.trim(),
      sewa,
      initiationDate,
      status,
      qualification: qualification.trim(),
      profession: profession.trim(),
      dateOfJoining,
      exitDate: exitDate.trim(),
      remarks: remarks.trim(),
      history: updatedHistory,
    };

    onSave(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2 sm:p-4 backdrop-blur-xs">
      <div className="bg-white rounded border border-[#D1D5DB] w-full max-w-4xl max-h-[92vh] flex flex-col shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="bg-[#ECECEC] px-4 sm:px-6 py-3 sm:py-3.5 border-b border-[#D1D5DB] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2 text-[#7A1315]">
            <Edit3 size={16} />
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider truncate">
              Edit Dossier &mdash; {sewadar.name} ({sewadar.iNo})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#6B7280] hover:text-[#111827] p-1 rounded hover:bg-white/60 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 overflow-y-auto text-xs flex-1">
          {/* Section 1: Personal Dossier */}
          <div className="space-y-3">
            <h4 className="font-bold text-[#7A1315] uppercase tracking-wider pb-1 border-b border-[#E5E7EB]">
              1. Personal & Contact Information
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block font-semibold text-[#374151] mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-2.5 py-1.5 border rounded focus:border-[#7A1315] outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-[#374151] mb-1">Beas ID</label>
                <input
                  type="text"
                  value={beasId}
                  onChange={(e) => setBeasId(e.target.value)}
                  className="w-full px-2.5 py-1.5 border rounded focus:border-[#7A1315] outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-[#374151] mb-1">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as any)}
                  className="w-full px-2.5 py-1.5 border rounded bg-white outline-none"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-[#374151] mb-1">DOB</label>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full px-2.5 py-1.5 border rounded bg-white outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-[#374151] mb-1">Age</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 border rounded outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-[#374151] mb-1">Marital Status</label>
                <select
                  value={marriageStatus}
                  onChange={(e) => setMarriageStatus(e.target.value as any)}
                  className="w-full px-2.5 py-1.5 border rounded bg-white outline-none"
                >
                  <option value="Married">Married</option>
                  <option value="Unmarried">Unmarried</option>
                  <option value="Widowed">Widowed</option>
                  <option value="Divorced">Divorced</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-[#374151] mb-1">Father Name</label>
                <input
                  type="text"
                  value={fatherName}
                  onChange={(e) => setFatherName(e.target.value)}
                  className="w-full px-2.5 py-1.5 border rounded outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-[#374151] mb-1">Mother Name</label>
                <input
                  type="text"
                  value={motherName}
                  onChange={(e) => setMotherName(e.target.value)}
                  className="w-full px-2.5 py-1.5 border rounded outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-[#374151] mb-1">Spouse Name</label>
                <input
                  type="text"
                  value={spouseName}
                  onChange={(e) => setSpouseName(e.target.value)}
                  className="w-full px-2.5 py-1.5 border rounded outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-[#374151] mb-1">Aadhar Number</label>
                <input
                  type="text"
                  value={aadharNumber}
                  onChange={(e) => setAadharNumber(e.target.value)}
                  className="w-full px-2.5 py-1.5 border rounded outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-[#374151] mb-1">Phone Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-2.5 py-1.5 border rounded outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-[#374151] mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-2.5 py-1.5 border rounded outline-none"
                />
              </div>
              <div className="sm:col-span-3">
                <label className="block font-semibold text-[#374151] mb-1">Residential Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-2.5 py-1.5 border rounded outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Sewa & Qualifications */}
          <div className="space-y-3 pt-2">
            <h4 className="font-bold text-[#7A1315] uppercase tracking-wider pb-1 border-b border-[#E5E7EB]">
              2. Sewa, Profession & Status
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block font-semibold text-[#374151] mb-1">Centre</label>
                <input
                  type="text"
                  value={centre}
                  onChange={(e) => setCentre(e.target.value)}
                  className="w-full px-2.5 py-1.5 border rounded outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-[#374151] mb-1">Area</label>
                <input
                  type="text"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="w-full px-2.5 py-1.5 border rounded outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-[#374151] mb-1">Designation / Role</label>
                <select
                  value={sewa}
                  disabled={sewadar.category === 'Baal Satsang'}
                  onChange={(e) => setSewa(e.target.value as SewaRole)}
                  className="w-full px-2.5 py-1.5 border rounded bg-white outline-none"
                >
                  <option value="SK">Satsang Karta (SK)</option>
                  <option value="Pathi">Pathi</option>
                  <option value="SR">Satsang Reader (SR)</option>
                  <option value="BSK">Baal Satsang Karta (BSK)</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-[#374151] mb-1">Initiation Date</label>
                <input
                  type="date"
                  value={initiationDate}
                  onChange={(e) => setInitiationDate(e.target.value)}
                  className="w-full px-2.5 py-1.5 border rounded bg-white outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-[#374151] mb-1">Current Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="w-full px-2.5 py-1.5 border rounded bg-white outline-none"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="On Leave">On Leave</option>
                  <option value="Transferred">Transferred</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-[#374151] mb-1">Qualification</label>
                <input
                  type="text"
                  value={qualification}
                  onChange={(e) => setQualification(e.target.value)}
                  className="w-full px-2.5 py-1.5 border rounded outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-[#374151] mb-1">Profession</label>
                <input
                  type="text"
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                  className="w-full px-2.5 py-1.5 border rounded outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-[#374151] mb-1">Joining Date</label>
                <input
                  type="date"
                  value={dateOfJoining}
                  onChange={(e) => setDateOfJoining(e.target.value)}
                  className="w-full px-2.5 py-1.5 border rounded bg-white outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-[#374151] mb-1">Exit Date</label>
                <input
                  type="text"
                  placeholder="e.g. -"
                  value={exitDate}
                  onChange={(e) => setExitDate(e.target.value)}
                  className="w-full px-2.5 py-1.5 border rounded outline-none"
                />
              </div>
              <div className="sm:col-span-3">
                <label className="block font-semibold text-[#374151] mb-1">Remarks</label>
                <input
                  type="text"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  className="w-full px-2.5 py-1.5 border rounded outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Add Appointment / Extension Record */}
          <div className="pt-2 border-t border-[#E5E7EB]">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-[#7A1315] uppercase tracking-wider flex items-center gap-1.5">
                <History size={14} />
                <span>Append Appointment / Extension Log</span>
              </span>
              <button
                type="button"
                onClick={() => setShowAddHistory(!showAddHistory)}
                className="flex items-center gap-1 text-[11px] font-semibold text-[#7A1315] hover:underline"
              >
                <Plus size={12} />
                <span>{showAddHistory ? 'Cancel' : '+ Add Log Entry'}</span>
              </button>
            </div>

            {showAddHistory && (
              <div className="p-3 bg-[#F8EBEB]/40 border border-[#D1D5DB] rounded space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block font-semibold text-[#374151] mb-1">Status</label>
                    <select
                      value={histStatus}
                      onChange={(e) => setHistStatus(e.target.value as any)}
                      className="w-full px-2 py-1.5 border rounded bg-white"
                    >
                      <option value="Appointed">Appointed</option>
                      <option value="Extension">Extension</option>
                      <option value="Completed">Completed</option>
                      <option value="Under Review">Under Review</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-[#374151] mb-1">Letter ID</label>
                    <input
                      type="text"
                      placeholder="e.g. SCI/RAJ/2024/091"
                      value={histLetterId}
                      onChange={(e) => setHistLetterId(e.target.value)}
                      className="w-full px-2 py-1.5 border rounded bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-[#374151] mb-1">From Date</label>
                    <input
                      type="date"
                      value={histFromDate}
                      onChange={(e) => setHistFromDate(e.target.value)}
                      className="w-full px-2 py-1.5 border rounded bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-[#374151] mb-1">Till Date</label>
                    <input
                      type="date"
                      value={histTillDate}
                      onChange={(e) => setHistTillDate(e.target.value)}
                      className="w-full px-2 py-1.5 border rounded bg-white"
                    />
                  </div>
                  <div className="sm:col-span-4">
                    <label className="block font-semibold text-[#374151] mb-1">Remarks</label>
                    <input
                      type="text"
                      placeholder="e.g. Extension for 5 Years or Appointed by SCI"
                      value={histRemarks}
                      onChange={(e) => setHistRemarks(e.target.value)}
                      className="w-full px-2 py-1.5 border rounded bg-white"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

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
              Save Dossier Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}