'use client';

import React from 'react';
import { SewaRole } from '@/lib/types';

export type DashboardTab = 'ALL' | SewaRole;

interface SewaTabsProps {
  activeTab: DashboardTab;
  onTabChange: (tab: DashboardTab) => void;
  counts: {
    all: number;
    sk: number;
    pathi: number;
    sr: number;
  };
}

export default function SewaTabs({ activeTab, onTabChange, counts }: SewaTabsProps) {
  const tabs: { key: DashboardTab; label: string; count: number }[] = [
    { key: 'ALL', label: 'All Sewadars', count: counts.all },
    { key: 'SK', label: 'Satsang Karta (SK)', count: counts.sk },
    { key: 'Pathi', label: 'Pathi', count: counts.pathi },
    { key: 'SR', label: 'Satsang Readers (SR)', count: counts.sr },
  ];

  return (
    <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 w-full sm:w-auto">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={`flex items-center justify-between sm:justify-center gap-1.5 px-3 sm:px-4 py-2 rounded text-xs sm:text-sm font-semibold transition-all shadow-xs border ${
              isActive
                ? 'bg-[#7A1315] text-white border-[#7A1315]'
                : 'bg-white text-[#374151] border-[#D1D5DB] hover:bg-[#F8EBEB] hover:text-[#7A1315] hover:border-[#7A1315]'
            }`}
          >
            <span className="truncate">{tab.label}</span>
            <span
              className={`text-[10px] sm:text-xs px-1.5 py-0.5 rounded-full font-bold flex-shrink-0 ${
                isActive
                  ? 'bg-white text-[#7A1315]'
                  : 'bg-[#ECECEC] text-[#4B5563]'
              }`}
            >
              {tab.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}