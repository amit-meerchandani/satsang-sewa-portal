'use client';

import React, { useState, useEffect } from 'react';
import { Sewadar } from '@/lib/types';
import { updateSewadarRecord } from '@/data/mockSewadars';
import EditSewadarModal from '@/components/dashboard/EditSewadarModal';
import { Plus, Minus, History, ChevronLeft, ChevronRight, Edit2 } from 'lucide-react';

interface SewadarTableProps {
  data: Sewadar[];
  onDataRefresh?: () => void;
}

export default function SewadarTable({ data, onDataRefresh }: SewadarTableProps) {
  const [expandedRows, setExpandedRows] = useState<Record<number, boolean>>({});
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Edit Modal State
  const [editingSewadar, setEditingSewadar] = useState<Sewadar | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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
    if (onDataRefresh) {
      onDataRefresh();
    }
  };

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);
  const currentRecords = data.slice(startIndex, endIndex);

  return (
    <>
      <div className="bg-white border border-[#D1D5DB] rounded shadow-xs overflow-hidden">
        {/* Horizontal scroll container with touch scroll styling */}
        <div className="overflow-x-auto -webkit-overflow-scrolling-touch">
          <table className="w-full text-left border-collapse text-xs sm:text-sm min-w-[680px]">
            {/* Table Header */}
            <thead>
              <tr className="bg-[#ECECEC] border-b border-[#D1D5DB] text-[#374151] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
                <th className="py-2.5 sm:py-3 px-2 sm:px-3 w-10 sm:w-12 text-center"></th>
                <th className="py-2.5 sm:py-3 px-3 sm:px-4">SR No.</th>
                <th className="py-2.5 sm:py-3 px-3 sm:px-4">I No.</th>
                <th className="py-2.5 sm:py-3 px-3 sm:px-4">Name</th>
                <th className="py-2.5 sm:py-3 px-3 sm:px-4">Centre</th>
                <th className="py-2.5 sm:py-3 px-3 sm:px-4">Area</th>
                <th className="py-2.5 sm:py-3 px-3 sm:px-4">Sewa</th>
                <th className="py-2.5 sm:py-3 px-3 sm:px-4">Date of Joining</th>
                <th className="py-2.5 sm:py-3 px-3 sm:px-4 text-center w-16 sm:w-20">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-[#E5E7EB]">
              {totalItems === 0 ? (
                <tr>
                  <td colSpan={9} className="py-8 sm:py-10 text-center text-[#6B7280]">
                    No records match the selected criteria.
                  </td>
                </tr>
              ) : (
                currentRecords.map((item) => {
                  const isExpanded = !!expandedRows[item.srNo];

                  return (
                    <React.Fragment key={item.srNo}>
                      {/* Primary Data Row */}
                      <tr
                        className={`transition-colors ${
                          isExpanded ? 'bg-[#F8EBEB]/40' : 'hover:bg-[#F9FAFB]'
                        }`}
                      >
                        <td className="py-2.5 sm:py-3 px-2 sm:px-3 text-center">
                          <button
                            onClick={() => toggleRow(item.srNo)}
                            aria-label="Toggle history details"
                            className={`w-6 h-6 rounded flex items-center justify-center border transition-all ${
                              isExpanded
                                ? 'bg-[#7A1315] text-white border-[#7A1315]'
                                : 'bg-white text-[#4B5563] border-[#D1D5DB] hover:border-[#7A1315] hover:text-[#7A1315]'
                            }`}
                          >
                            {isExpanded ? <Minus size={13} /> : <Plus size={13} />}
                          </button>
                        </td>

                        <td className="py-2.5 sm:py-3 px-3 sm:px-4 font-medium text-[#1F2937]">{item.srNo}</td>
                        <td className="py-2.5 sm:py-3 px-3 sm:px-4 font-semibold text-[#7A1315]">{item.iNo}</td>
                        <td className="py-2.5 sm:py-3 px-3 sm:px-4 font-medium text-[#111827]">{item.name}</td>
                        <td className="py-2.5 sm:py-3 px-3 sm:px-4 text-[#4B5563]">{item.centre}</td>
                        <td className="py-2.5 sm:py-3 px-3 sm:px-4 text-[#4B5563]">{item.area}</td>
                        <td className="py-2.5 sm:py-3 px-3 sm:px-4">
                          <span className="px-2 py-0.5 sm:py-1 text-[11px] sm:text-xs font-semibold rounded bg-[#F8EBEB] text-[#7A1315] border border-[#7A1315]/20">
                            {item.sewa}
                          </span>
                        </td>
                        <td className="py-2.5 sm:py-3 px-3 sm:px-4 text-[#4B5563]">{item.dateOfJoining}</td>

                        <td className="py-2.5 sm:py-3 px-3 sm:px-4 text-center">
                          <button
                            onClick={() => handleEditClick(item)}
                            title="Edit this record"
                            className="p-1 sm:p-1.5 rounded text-[#4B5563] hover:text-[#7A1315] hover:bg-[#F8EBEB] border border-transparent hover:border-[#7A1315]/30 transition-colors"
                          >
                            <Edit2 size={13} />
                          </button>
                        </td>
                      </tr>

                      {/* Expandable History Detail Card */}
                      {isExpanded && (
                        <tr className="bg-[#F8EBEB]/20">
                          <td colSpan={9} className="p-3 sm:p-4 pl-8 sm:pl-14">
                            <div className="bg-white border border-[#D1D5DB] rounded p-3 sm:p-4 shadow-2xs">
                              <div className="flex items-center gap-2 mb-2 sm:mb-3 pb-2 border-b border-[#E5E7EB]">
                                <History size={15} className="text-[#7A1315]" />
                                <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#7A1315]">
                                  History Logs for {item.name} ({item.iNo})
                                </h4>
                              </div>

                              {item.history && item.history.length > 0 ? (
                                <div className="overflow-x-auto">
                                  <table className="w-full text-left border-collapse text-[11px] sm:text-xs min-w-[500px]">
                                    <thead>
                                      <tr className="bg-[#ECECEC] text-[#374151] border-b border-[#D1D5DB]">
                                        <th className="py-1.5 sm:py-2 px-2 sm:px-3 font-semibold">Date</th>
                                        <th className="py-1.5 sm:py-2 px-2 sm:px-3 font-semibold">Approved Id</th>
                                        <th className="py-1.5 sm:py-2 px-2 sm:px-3 font-semibold">Status</th>
                                        <th className="py-1.5 sm:py-2 px-2 sm:px-3 font-semibold">Remarks</th>
                                      </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#E5E7EB]">
                                      {item.history.map((hist) => (
                                        <tr key={hist.id} className="hover:bg-[#F9FAFB]">
                                          <td className="py-1.5 sm:py-2 px-2 sm:px-3 text-[#4B5563]">{hist.date}</td>
                                          <td className="py-1.5 sm:py-2 px-2 sm:px-3 font-medium text-[#1F2937]">{hist.approvedId}</td>
                                          <td className="py-1.5 sm:py-2 px-2 sm:px-3">
                                            <span
                                              className={`px-1.5 sm:px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-semibold ${
                                                hist.status === 'Approved'
                                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                                  : hist.status === 'Pending'
                                                  ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                                  : 'bg-slate-100 text-slate-700 border border-slate-200'
                                              }`}
                                            >
                                              {hist.status}
                                            </span>
                                          </td>
                                          <td className="py-1.5 sm:py-2 px-2 sm:px-3 text-[#374151]">{hist.remarks}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              ) : (
                                <p className="text-xs text-[#6B7280]">No history records logged yet.</p>
                              )}
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

        {/* Responsive Pagination Footer */}
        {totalItems > 0 && (
          <div className="px-3 sm:px-5 py-3 bg-[#FAFAFA] border-t border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#4B5563]">
            <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto gap-3">
              <span>
                Showing <strong>{startIndex + 1}</strong>–<strong>{endIndex}</strong> of{' '}
                <strong>{totalItems}</strong>
              </span>
              <div className="flex items-center gap-1.5 border-l border-[#D1D5DB] pl-3">
                <span>Show:</span>
                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="px-2 py-1 border border-[#D1D5DB] rounded bg-white text-xs text-[#1F2937] focus:outline-none focus:border-[#7A1315]"
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
                <ChevronLeft size={14} />
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
                      className={`w-7 h-7 rounded text-xs font-semibold border transition-all ${
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
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Edit Modal */}
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