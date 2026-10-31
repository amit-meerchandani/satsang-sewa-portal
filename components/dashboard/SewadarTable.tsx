'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Sewadar, HistoryRecord } from '@/lib/types';
import { updateSewadarRecord, deleteHistoryLog } from '@/data/mockSewadars';
import EditSewadarModal from '@/components/dashboard/EditSewadarModal';
import { 
  Plus, 
  Minus, 
  History, 
  ChevronLeft, 
  ChevronRight, 
  Edit2, 
  Trash2, 
  User, 
  BookOpen, 
  PlusCircle, 
  X, 
  Check 
} from 'lucide-react';

interface SewadarTableProps {
  data: Sewadar[];
  onDataRefresh?: () => void;
}

export default function SewadarTable({ data, onDataRefresh }: SewadarTableProps) {
  const [expandedRows, setExpandedRows] = useState<Record<number, boolean>>({});
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Edit Sewadar Modal State
  const [editingSewadar, setEditingSewadar] = useState<Sewadar | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Inline History Editing States
  const [editingHistoryId, setEditingHistoryId] = useState<string | null>(null);
  const [activeHistoryForm, setActiveHistoryForm] = useState<HistoryRecord | null>(null);

  useEffect(() => {
    setCurrentPage(1);
  }, [data.length]);

  const toggleRow = (srNo: number) => {
    setExpandedRows((prev) => ({
      ...prev,
      [srNo]: !prev[srNo],
    }));
  };

  const handleEditClick = (item: Sewadar) => {
    setEditingSewadar(item);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (updated: Sewadar) => {
    updateSewadarRecord(updated);
    if (onDataRefresh) onDataRefresh();
  };

  const handleDeleteHistory = (srNo: number, historyId: string) => {
    if (confirm('Are you sure you want to delete this history log?')) {
      deleteHistoryLog(srNo, historyId);
      if (onDataRefresh) onDataRefresh();
    }
  };

  const startEditHistory = (h: HistoryRecord) => {
    setEditingHistoryId(h.id);
    setActiveHistoryForm({ ...h });
  };

  const cancelEditHistory = () => {
    setEditingHistoryId(null);
    setActiveHistoryForm(null);
  };

  const saveEditedHistory = (srNo: number) => {
    if (!activeHistoryForm) return;
    const member = data.find((s) => s.srNo === srNo);
    if (member) {
      member.history = member.history.map((h) => 
        h.id === activeHistoryForm.id ? { ...activeHistoryForm } : h
      );
      updateSewadarRecord(member);
      setEditingHistoryId(null);
      setActiveHistoryForm(null);
      if (onDataRefresh) onDataRefresh();
    }
  };

  const handleAddQuickHistory = (srNo: number) => {
    const member = data.find((s) => s.srNo === srNo);
    if (!member) return;
    const newEntry: HistoryRecord = {
      id: `h-${Date.now()}`,
      centre: member.centre,
      area: member.area,
      designation: member.sewa,
      status: 'Extension',
      letterId: `SCI/RAJ/${new Date().getFullYear()}/001`,
      fromDate: new Date().toISOString().split('T')[0],
      tillDate: new Date(new Date().setFullYear(new Date().getFullYear() + 5)).toISOString().split('T')[0],
      remarks: 'Extension for 5 Years',
    };
    member.history = [newEntry, ...member.history];
    updateSewadarRecord(member);
    if (onDataRefresh) onDataRefresh();
  };

  // Pagination Calculations
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);
  const currentRecords = data.slice(startIndex, endIndex);

  return (
    <>
      <div className="bg-white border border-[#D1D5DB] rounded shadow-xs overflow-hidden">
        <div className="overflow-x-auto -webkit-overflow-scrolling-touch">
          <table className="w-full text-left border-collapse text-sm min-w-[760px]">
            {/* Main Table Header */}
            <thead>
              <tr className="bg-[#ECECEC] border-b border-[#D1D5DB] text-[#1F2937] text-xs font-bold uppercase tracking-wider">
                <th className="py-3 px-3 w-12 text-center"></th>
                <th className="py-3 px-4">SR NO.</th>
                <th className="py-3 px-4">I NO.</th>
                <th className="py-3 px-4">NAME</th>
                <th className="py-3 px-4">CENTRE</th>
                <th className="py-3 px-4">AREA</th>
                <th className="py-3 px-4">SEWA</th>
                <th className="py-3 px-4">DATE OF JOINING</th>
                <th className="py-3 px-4 text-center w-20">ACTIONS</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-[#E5E7EB]">
              {totalItems === 0 ? (
                <tr>
                  <td colSpan={9} className="py-10 text-center text-[#4B5563] text-sm">
                    No records match the selected criteria.
                  </td>
                </tr>
              ) : (
                currentRecords.map((item) => {
                  const isExpanded = !!expandedRows[item.srNo];

                  return (
                    <React.Fragment key={item.srNo}>
                      {/* Main Data Row */}
                      <tr
                        className={`transition-colors ${
                          isExpanded ? 'bg-[#F8EBEB]/40' : 'hover:bg-[#F9FAFB]'
                        }`}
                      >
                        <td className="py-3 px-3 text-center">
                          <button
                            onClick={() => toggleRow(item.srNo)}
                            aria-label="Toggle details & history"
                            className={`w-6 h-6 rounded flex items-center justify-center border transition-all ${
                              isExpanded
                                ? 'bg-[#7A1315] text-white border-[#7A1315]'
                                : 'bg-white text-[#4B5563] border-[#D1D5DB] hover:border-[#7A1315] hover:text-[#7A1315]'
                            }`}
                          >
                            {isExpanded ? <Minus size={13} /> : <Plus size={13} />}
                          </button>
                        </td>

                        <td className="py-3 px-4 font-semibold text-[#1F2937]">{item.srNo}</td>
                        <td className="py-3 px-4 font-bold text-[#7A1315]">{item.iNo}</td>
                        <td className="py-3 px-4 font-bold text-[#111827]">{item.name}</td>
                        <td className="py-3 px-4 text-[#374151] font-medium">{item.centre}</td>
                        <td className="py-3 px-4 text-[#374151] font-medium">{item.area}</td>
                        <td className="py-3 px-4">
                          <span className="px-2.5 py-1 text-xs font-bold rounded bg-[#F8EBEB] text-[#7A1315] border border-[#7A1315]/20">
                            {item.sewa}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-[#374151] font-medium">{item.dateOfJoining}</td>

                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => handleEditClick(item)}
                            title="Edit this record"
                            className="p-1.5 rounded text-[#4B5563] hover:text-[#7A1315] hover:bg-[#F8EBEB] border border-transparent hover:border-[#7A1315]/30 transition-colors"
                          >
                            <Edit2 size={15} />
                          </button>
                        </td>
                      </tr>

                      {/* ========================================================= */}
                      {/* ACCORDION EXPANSION: High-Contrast Key-Value Dossier Card */}
                      {/* ========================================================= */}
                      {isExpanded && (
                        <tr className="bg-[#F8EBEB]/20">
                          <td colSpan={9} className="p-4 sm:p-6 pl-4 sm:pl-12">
                            <div className="space-y-5">
                              {/* --- Upper Layout: 75% Left Card & 25% Right Card --- */}
                              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                                {/* LEFT CARD (75% / lg:col-span-9) */}
                                <div className="lg:col-span-9 bg-white border border-[#D1D5DB] rounded-lg p-5 shadow-xs">
                                  {/* Section Header */}
                                  <div className="flex items-center gap-2 pb-3 mb-4 border-b border-[#E5E7EB] text-[#7A1315]">
                                    <User size={18} />
                                    <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#7A1315]">
                                      Personal & Contact Dossier
                                    </h4>
                                    <span className="text-xs font-bold text-[#4B5563]">
                                      &mdash; {item.name} ({item.beasId || 'No Beas ID'})
                                    </span>
                                  </div>

                                  <div className="flex flex-col sm:flex-row items-start gap-5">
                                    {/* SEWADAR PHOTOGRAPH / PLACEHOLDER FRAME */}
                                    <div className="flex flex-col items-center flex-shrink-0 self-center sm:self-start">
                                      <div className="w-28 h-36 sm:w-32 sm:h-40 rounded-lg border-2 border-dashed border-[#7A1315]/40 bg-[#FAFAFA] shadow-xs relative overflow-hidden flex flex-col items-center justify-center group transition-colors hover:border-[#7A1315]">
                                        {item.photoUrl ? (
                                          <Image
                                            src={item.photoUrl}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                          />
                                        ) : (
                                          <div className="flex flex-col items-center justify-center p-3 text-center select-none">
                                            <div className="w-12 h-12 rounded-full bg-[#F8EBEB] border border-[#7A1315]/20 flex items-center justify-center text-[#7A1315] mb-2 shadow-2xs">
                                              <User size={24} className="text-[#7A1315]" />
                                            </div>
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A1315]">
                                              Photo
                                            </span>
                                            <span className="text-[9px] text-[#6B7280] font-medium mt-0.5">
                                              Not Uploaded
                                            </span>
                                          </div>
                                        )}
                                      </div>
                                      <span className="mt-2 text-[11px] font-bold text-[#7A1315] bg-[#F8EBEB] px-2.5 py-0.5 rounded-full border border-[#7A1315]/20 font-mono shadow-2xs">
                                        {item.iNo}
                                      </span>
                                    </div>

                                    {/* STRUCTURED KEY-VALUE GRID WITH SHARP DISTINCTION */}
                                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 w-full">
                                      {/* Name & Beas ID */}
                                      <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-md p-2.5">
                                        <div className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] mb-1">
                                          Name & Beas ID
                                        </div>
                                        <div className="text-xs font-bold text-[#0F172A] leading-tight">
                                          {item.name}
                                          <span className="ml-1 text-[#7A1315] font-extrabold font-mono">
                                            ({item.beasId})
                                          </span>
                                        </div>
                                      </div>

                                      {/* Gender */}
                                      <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-md p-2.5">
                                        <div className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] mb-1">
                                          Gender
                                        </div>
                                        <div className="text-xs font-semibold text-[#0F172A]">
                                          {item.gender}
                                        </div>
                                      </div>

                                      {/* DOB & Age */}
                                      <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-md p-2.5">
                                        <div className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] mb-1">
                                          DOB & Age
                                        </div>
                                        <div className="text-xs font-semibold text-[#0F172A]">
                                          {item.dob} <span className="text-[#64748B] font-bold">({item.age} yrs)</span>
                                        </div>
                                      </div>

                                      {/* Father Name */}
                                      <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-md p-2.5">
                                        <div className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] mb-1">
                                          Father Name
                                        </div>
                                        <div className="text-xs font-semibold text-[#0F172A] truncate" title={item.fatherName}>
                                          {item.fatherName}
                                        </div>
                                      </div>

                                      {/* Mother Name */}
                                      <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-md p-2.5">
                                        <div className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] mb-1">
                                          Mother Name
                                        </div>
                                        <div className="text-xs font-semibold text-[#0F172A] truncate" title={item.motherName}>
                                          {item.motherName}
                                        </div>
                                      </div>

                                      {/* Marital Status & Spouse */}
                                      <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-md p-2.5">
                                        <div className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] mb-1">
                                          Marital Status & Spouse
                                        </div>
                                        <div className="text-xs font-semibold text-[#0F172A]">
                                          {item.marriageStatus} {item.spouseName ? `(${item.spouseName})` : ''}
                                        </div>
                                      </div>

                                      {/* Aadhar Number */}
                                      <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-md p-2.5">
                                        <div className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] mb-1">
                                          Aadhar Number
                                        </div>
                                        <div className="text-xs font-bold text-[#0F172A] font-mono tracking-wider">
                                          {item.aadharNumber}
                                        </div>
                                      </div>

                                      {/* Phone Number */}
                                      <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-md p-2.5">
                                        <div className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] mb-1">
                                          Phone Number
                                        </div>
                                        <div className="text-xs font-bold text-[#0F172A] font-mono">
                                          {item.phone}
                                        </div>
                                      </div>

                                      {/* Email */}
                                      <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-md p-2.5">
                                        <div className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] mb-1">
                                          Email Address
                                        </div>
                                        <div className="text-xs font-semibold text-[#0F172A] truncate" title={item.email}>
                                          {item.email}
                                        </div>
                                      </div>

                                      {/* Full Residential Address */}
                                      <div className="sm:col-span-2 md:col-span-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-md p-2.5">
                                        <div className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] mb-1">
                                          Residential Address
                                        </div>
                                        <div className="text-xs font-medium text-[#0F172A] leading-relaxed">
                                          {item.address}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* RIGHT CARD (25% / lg:col-span-3) */}
                                <div className="lg:col-span-3 bg-white border border-[#D1D5DB] rounded-lg p-5 shadow-xs flex flex-col justify-between">
                                  <div>
                                    <div className="flex items-center gap-2 pb-3 mb-4 border-b border-[#E5E7EB] text-[#7A1315]">
                                      <BookOpen size={18} />
                                      <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#7A1315]">
                                        Sewa & Status
                                      </h4>
                                    </div>

                                    <div className="space-y-2.5">
                                      <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-md p-2.5">
                                        <div className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] mb-1">
                                          Initiation Date
                                        </div>
                                        <div className="text-xs font-bold text-[#0F172A]">
                                          {item.initiationDate}
                                        </div>
                                      </div>

                                      <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-md p-2.5 flex items-center justify-between">
                                        <div>
                                          <div className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] mb-0.5">
                                            Current Status
                                          </div>
                                          <div className="text-xs font-semibold text-[#0F172A]">{item.status}</div>
                                        </div>
                                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                                          {item.status}
                                        </span>
                                      </div>

                                      <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-md p-2.5">
                                        <div className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] mb-1">
                                          Qualification
                                        </div>
                                        <div className="text-xs font-semibold text-[#0F172A]">
                                          {item.qualification}
                                        </div>
                                      </div>

                                      <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-md p-2.5">
                                        <div className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] mb-1">
                                          Profession
                                        </div>
                                        <div className="text-xs font-semibold text-[#0F172A]">
                                          {item.profession}
                                        </div>
                                      </div>

                                      <div className="grid grid-cols-2 gap-2">
                                        <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-md p-2">
                                          <div className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] mb-1">
                                            Joining Date
                                          </div>
                                          <div className="text-xs font-bold text-[#0F172A]">
                                            {item.dateOfJoining}
                                          </div>
                                        </div>
                                        <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-md p-2">
                                          <div className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] mb-1">
                                            Exit Date
                                          </div>
                                          <div className="text-xs font-semibold text-[#64748B]">
                                            {item.exitDate || '-'}
                                          </div>
                                        </div>
                                      </div>

                                      <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-md p-2.5">
                                        <div className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] mb-1">
                                          Remarks
                                        </div>
                                        <p className="text-xs text-[#334155] italic leading-tight">
                                          &ldquo;{item.remarks}&rdquo;
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* --- LOWER SECTION: History Logs Table --- */}
                              <div className="bg-white border border-[#D1D5DB] rounded-lg p-5 shadow-xs">
                                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E5E7EB]">
                                  <div className="flex items-center gap-2 text-[#7A1315]">
                                    <History size={18} />
                                    <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#7A1315]">
                                      History & Appointment Logs ({item.history?.length || 0})
                                    </h4>
                                  </div>
                                  <button
                                    onClick={() => handleAddQuickHistory(item.srNo)}
                                    className="flex items-center gap-1.5 text-xs font-bold text-[#7A1315] hover:text-[#5a0c0e] bg-[#F8EBEB] hover:bg-[#ebdada] px-3 py-1.5 rounded transition-colors border border-[#7A1315]/20"
                                  >
                                    <PlusCircle size={15} />
                                    <span>+ Add Appointment / Extension</span>
                                  </button>
                                </div>

                                {item.history && item.history.length > 0 ? (
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse text-sm min-w-[700px]">
                                      <thead>
                                        <tr className="bg-[#ECECEC] text-[#1F2937] border-b border-[#D1D5DB] text-xs font-bold uppercase">
                                          <th className="py-2.5 px-3">Center</th>
                                          <th className="py-2.5 px-3">Area</th>
                                          <th className="py-2.5 px-3">Designation</th>
                                          <th className="py-2.5 px-3">Status</th>
                                          <th className="py-2.5 px-3">Letter ID</th>
                                          <th className="py-2.5 px-3">From</th>
                                          <th className="py-2.5 px-3">Till</th>
                                          <th className="py-2.5 px-3">Remarks</th>
                                          <th className="py-2.5 px-3 text-center w-24">Action</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-[#E5E7EB]">
                                        {item.history.map((hist) => {
                                          const isRowEditing = editingHistoryId === hist.id;

                                          if (isRowEditing && activeHistoryForm) {
                                            return (
                                              <tr key={hist.id} className="bg-amber-50/70">
                                                <td className="py-1.5 px-1.5">
                                                  <input
                                                    type="text"
                                                    value={activeHistoryForm.centre}
                                                    onChange={(e) => setActiveHistoryForm({ ...activeHistoryForm, centre: e.target.value })}
                                                    className="w-full p-1.5 border rounded text-xs bg-white text-[#111827] font-medium"
                                                  />
                                                </td>
                                                <td className="py-1.5 px-1.5">
                                                  <input
                                                    type="text"
                                                    value={activeHistoryForm.area}
                                                    onChange={(e) => setActiveHistoryForm({ ...activeHistoryForm, area: e.target.value })}
                                                    className="w-full p-1.5 border rounded text-xs bg-white text-[#111827] font-medium"
                                                  />
                                                </td>
                                                <td className="py-1.5 px-1.5">
                                                  <select
                                                    value={activeHistoryForm.designation}
                                                    onChange={(e) => setActiveHistoryForm({ ...activeHistoryForm, designation: e.target.value as any })}
                                                    className="w-full p-1.5 border rounded text-xs bg-white text-[#111827] font-medium"
                                                  >
                                                    <option value="SK">SK</option>
                                                    <option value="Pathi">Pathi</option>
                                                    <option value="SR">SR</option>
                                                    <option value="BSK">BSK</option>
                                                  </select>
                                                </td>
                                                <td className="py-1.5 px-1.5">
                                                  <select
                                                    value={activeHistoryForm.status}
                                                    onChange={(e) => setActiveHistoryForm({ ...activeHistoryForm, status: e.target.value as any })}
                                                    className="w-full p-1.5 border rounded text-xs bg-white text-[#111827] font-medium"
                                                  >
                                                    <option value="Appointed">Appointed</option>
                                                    <option value="Extension">Extension</option>
                                                    <option value="Completed">Completed</option>
                                                    <option value="Under Review">Under Review</option>
                                                  </select>
                                                </td>
                                                <td className="py-1.5 px-1.5">
                                                  <input
                                                    type="text"
                                                    value={activeHistoryForm.letterId}
                                                    onChange={(e) => setActiveHistoryForm({ ...activeHistoryForm, letterId: e.target.value })}
                                                    className="w-full p-1.5 border rounded text-xs bg-white text-[#111827] font-medium"
                                                  />
                                                </td>
                                                <td className="py-1.5 px-1.5">
                                                  <input
                                                    type="date"
                                                    value={activeHistoryForm.fromDate}
                                                    onChange={(e) => setActiveHistoryForm({ ...activeHistoryForm, fromDate: e.target.value })}
                                                    className="w-full p-1.5 border rounded text-xs bg-white text-[#111827]"
                                                  />
                                                </td>
                                                <td className="py-1.5 px-1.5">
                                                  <input
                                                    type="date"
                                                    value={activeHistoryForm.tillDate}
                                                    onChange={(e) => setActiveHistoryForm({ ...activeHistoryForm, tillDate: e.target.value })}
                                                    className="w-full p-1.5 border rounded text-xs bg-white text-[#111827]"
                                                  />
                                                </td>
                                                <td className="py-1.5 px-1.5">
                                                  <input
                                                    type="text"
                                                    value={activeHistoryForm.remarks}
                                                    onChange={(e) => setActiveHistoryForm({ ...activeHistoryForm, remarks: e.target.value })}
                                                    className="w-full p-1.5 border rounded text-xs bg-white text-[#111827] font-medium"
                                                  />
                                                </td>
                                                <td className="py-1.5 px-1.5 text-center">
                                                  <div className="flex items-center justify-center gap-1.5">
                                                    <button
                                                      onClick={() => saveEditedHistory(item.srNo)}
                                                      className="p-1.5 rounded bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs"
                                                      title="Save"
                                                    >
                                                      <Check size={14} />
                                                    </button>
                                                    <button
                                                      onClick={cancelEditHistory}
                                                      className="p-1.5 rounded bg-slate-200 text-slate-800 hover:bg-slate-300"
                                                      title="Cancel"
                                                    >
                                                      <X size={14} />
                                                    </button>
                                                  </div>
                                                </td>
                                              </tr>
                                            );
                                          }

                                          return (
                                            <tr key={hist.id} className="hover:bg-[#F9FAFB] text-sm">
                                              <td className="py-3 px-3 font-semibold text-[#111827]">{hist.centre}</td>
                                              <td className="py-3 px-3 font-medium text-[#374151]">{hist.area}</td>
                                              <td className="py-3 px-3">
                                                <span className="px-2 py-0.5 rounded text-xs font-bold bg-[#F8EBEB] text-[#7A1315] border border-[#7A1315]/20">
                                                  {hist.designation}
                                                </span>
                                              </td>
                                              <td className="py-3 px-3">
                                                <span
                                                  className={`px-2.5 py-1 rounded text-xs font-bold ${
                                                    hist.status === 'Appointed'
                                                      ? 'bg-blue-50 text-blue-800 border border-blue-200'
                                                      : hist.status === 'Extension'
                                                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                                      : 'bg-slate-100 text-slate-800 border border-slate-200'
                                                  }`}
                                                >
                                                  {hist.status}
                                                </span>
                                              </td>
                                              <td className="py-3 px-3 font-mono text-xs font-bold text-[#1F2937]">{hist.letterId}</td>
                                              <td className="py-3 px-3 text-[#374151] font-semibold">{hist.fromDate}</td>
                                              <td className="py-3 px-3 text-[#374151] font-semibold">{hist.tillDate}</td>
                                              <td className="py-3 px-3 text-[#111827] font-semibold">{hist.remarks}</td>
                                              <td className="py-3 px-3 text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                  <button
                                                    onClick={() => startEditHistory(hist)}
                                                    className="p-1.5 rounded text-[#4B5563] hover:text-[#7A1315] hover:bg-[#F8EBEB]"
                                                    title="Edit history log"
                                                  >
                                                    <Edit2 size={14} />
                                                  </button>
                                                  <button
                                                    onClick={() => handleDeleteHistory(item.srNo, hist.id)}
                                                    className="p-1.5 rounded text-[#4B5563] hover:text-rose-600 hover:bg-rose-50"
                                                    title="Delete history log"
                                                  >
                                                    <Trash2 size={14} />
                                                  </button>
                                                </div>
                                              </td>
                                            </tr>
                                          );
                                        })}
                                      </tbody>
                                    </table>
                                  </div>
                                ) : (
                                  <p className="text-sm text-[#4B5563]">No history appointments logged yet.</p>
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {totalItems > 0 && (
          <div className="px-5 py-4 bg-[#FAFAFA] border-t border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#374151] font-medium">
            <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto gap-3">
              <span>
                Showing <strong>{startIndex + 1}</strong>&ndash;<strong>{endIndex}</strong> of{' '}
                <strong>{totalItems}</strong> entries
              </span>
              <div className="flex items-center gap-1.5 border-l border-[#D1D5DB] pl-3">
                <span>Show:</span>
                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="px-2 py-1 border border-[#D1D5DB] rounded bg-white text-xs font-semibold text-[#111827] focus:outline-none focus:border-[#7A1315]"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                  <option value={25}>25</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded border border-[#D1D5DB] bg-white text-[#374151] hover:bg-[#F8EBEB] hover:text-[#7A1315] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                aria-label="Previous page"
              >
                <ChevronLeft size={16} />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                if (
                  pageNum === 1 ||
                  pageNum === totalPages ||
                  (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-8 h-8 rounded text-xs font-bold border transition-all ${
                        currentPage === pageNum
                          ? 'bg-[#7A1315] text-white border-[#7A1315]'
                          : 'bg-white text-[#374151] border-[#D1D5DB] hover:bg-[#ECECEC]'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                }
                if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                  return (
                    <span key={pageNum} className="px-1 text-[#9CA3AF]">
                      ...
                    </span>
                  );
                }
                return null;
              })}

              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded border border-[#D1D5DB] bg-white text-[#374151] hover:bg-[#F8EBEB] hover:text-[#7A1315] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                aria-label="Next page"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Edit Sewadar Modal Component */}
      <EditSewadarModal
        sewadar={editingSewadar}
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingSewadar(null);
        }}
        onSave={handleSaveEdit}
      />
    </>
  );
}