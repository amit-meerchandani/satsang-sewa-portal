'use client';

import React, { useState, useMemo } from 'react';
import { mockSewadars } from '@/data/mockSewadars';
import SewaTabs, { DashboardTab } from '@/components/dashboard/SewaTabs';
import SewadarTable from '@/components/dashboard/SewadarTable';
import { Search, RotateCcw, Filter, SlidersHorizontal } from 'lucide-react';

export default function DashboardPage() {
  const [tick, setTick] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<DashboardTab>('ALL');

  // Filter States
  const [query, setQuery] = useState('');
  const [selectedCentre, setSelectedCentre] = useState<string>('ALL');
  const [selectedArea, setSelectedArea] = useState<string>('ALL');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(true);

  // Extract regular sewadars
  const regularSewadars = useMemo(() => {
    return mockSewadars.filter((item) => item.category === 'Regular');
  }, [tick]);

  // Counts for the 4 Sewa tab buttons
  const counts = useMemo(() => {
    return {
      all: regularSewadars.length,
      sk: regularSewadars.filter((s) => s.sewa === 'SK').length,
      pathi: regularSewadars.filter((s) => s.sewa === 'Pathi').length,
      sr: regularSewadars.filter((s) => s.sewa === 'SR').length,
    };
  }, [regularSewadars]);

  const centres = useMemo(() => {
    return Array.from(new Set(regularSewadars.map((s) => s.centre)));
  }, [regularSewadars]);

  const areas = useMemo(() => {
    return Array.from(new Set(regularSewadars.map((s) => s.area)));
  }, [regularSewadars]);

  const filteredData = useMemo(() => {
    return regularSewadars.filter((item) => {
      if (activeTab !== 'ALL' && item.sewa !== activeTab) {
        return false;
      }
      if (query.trim()) {
        const q = query.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesINo = item.iNo.toLowerCase().includes(q);
        if (!matchesName && !matchesINo) return false;
      }
      if (selectedCentre !== 'ALL' && item.centre !== selectedCentre) {
        return false;
      }
      if (selectedArea !== 'ALL' && item.area !== selectedArea) {
        return false;
      }
      if (dateFrom && item.dateOfJoining < dateFrom) {
        return false;
      }
      if (dateTo && item.dateOfJoining > dateTo) {
        return false;
      }
      return true;
    });
  }, [regularSewadars, activeTab, query, selectedCentre, selectedArea, dateFrom, dateTo]);

  const handleResetFilters = () => {
    setQuery('');
    setSelectedCentre('ALL');
    setSelectedArea('ALL');
    setDateFrom('');
    setDateTo('');
  };

  const isAnyFilterActive = Boolean(
    query || selectedCentre !== 'ALL' || selectedArea !== 'ALL' || dateFrom || dateTo
  );

  return (
    <div className="space-y-6">
      {/* Top Header Section & 4 Sewa Buttons */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 pb-4 border-b border-[#D1D5DB]">
        <div>
          <h1 className="text-xl font-bold text-[#1F2937]">Dashboard</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Maintain Satsang Karta (SK), Pathi, and Satsang Readers (SR) records
          </p>
        </div>

        <SewaTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          counts={counts}
        />
      </div>

      {/* Embedded Search & Filter Card */}
      <div className="bg-white border border-[#D1D5DB] rounded shadow-xs overflow-hidden">
        <div className="px-5 py-3 border-b border-[#E5E7EB] bg-[#FAFAFA] flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#7A1315]">
            <Filter size={15} />
            <h2 className="text-xs font-bold uppercase tracking-wider">Search & Filters</h2>
            {isAnyFilterActive && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#F8EBEB] text-[#7A1315]">
                Active
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {isAnyFilterActive && (
              <button
                onClick={handleResetFilters}
                className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold rounded text-[#7A1315] hover:bg-[#F8EBEB] transition-colors"
              >
                <RotateCcw size={12} />
                <span>Reset Filters</span>
              </button>
            )}

            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold rounded border border-[#D1D5DB] text-[#4B5563] bg-white hover:bg-[#ECECEC] transition-colors"
            >
              <SlidersHorizontal size={12} />
              <span>{isFilterOpen ? 'Hide' : 'Show'} Filters</span>
            </button>
          </div>
        </div>

        {isFilterOpen && (
          <div className="p-5 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-[#374151] mb-1.5">Search Name / I No.</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Type name or I No..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 border border-[#D1D5DB] rounded text-xs focus:outline-none focus:border-[#7A1315] text-[#1F2937]"
                  />
                  <Search size={14} className="absolute left-2.5 top-2.5 text-[#9CA3AF]" />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#374151] mb-1.5">Centre</label>
                <select
                  value={selectedCentre}
                  onChange={(e) => setSelectedCentre(e.target.value)}
                  className="w-full px-3 py-2 border border-[#D1D5DB] rounded text-xs focus:outline-none focus:border-[#7A1315] text-[#1F2937] bg-white"
                >
                  <option value="ALL">All Centres</option>
                  {centres.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-[#374151] mb-1.5">Area</label>
                <select
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  className="w-full px-3 py-2 border border-[#D1D5DB] rounded text-xs focus:outline-none focus:border-[#7A1315] text-[#1F2937] bg-white"
                >
                  <option value="ALL">All Areas</option>
                  {areas.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-[#374151] mb-1.5">From Date</label>
                  <input
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    className="w-full px-2 py-1.5 border border-[#D1D5DB] rounded text-xs focus:outline-none focus:border-[#7A1315] text-[#1F2937] bg-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#374151] mb-1.5">To Date</label>
                  <input
                    type="date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    className="w-full px-2 py-1.5 border border-[#D1D5DB] rounded text-xs focus:outline-none focus:border-[#7A1315] text-[#1F2937] bg-white"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-[#6B7280] flex justify-between items-center border-t border-[#F3F4F6]">
              <span>
                Showing <strong>{filteredData.length}</strong> record{filteredData.length !== 1 ? 's' : ''} under{' '}
                <strong className="text-[#7A1315]">
                  {activeTab === 'ALL' ? 'All Roles' : activeTab}
                </strong>
              </span>
              {isAnyFilterActive && (
                <span className="text-[#7A1315] font-semibold">Active search filters applied</span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Main Sewadar List */}
      <SewadarTable 
        data={filteredData} 
        onDataRefresh={() => setTick((t) => t + 1)} 
      />
    </div>
  );
}