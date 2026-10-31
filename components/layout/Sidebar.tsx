'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  UserPlus, 
  Baby,
  Menu,
  X
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', href: '/', icon: LayoutDashboard },
  { label: 'Add new', href: '/add-new', icon: UserPlus },
  { label: 'Baal Satsang', href: '/baal-satsang', icon: Baby },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [imageError, setImageError] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleMobileNav = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    setIsMobileOpen((prev) => !prev);
  };

  const closeMobileNav = () => {
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* 1. Mobile Fixed Top Bar */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-14 bg-[#ECECEC] border-b border-[#D1D5DB] px-4 flex items-center justify-between z-40 select-none">
        <div className="flex items-center gap-2">
          {/* Touch-optimized button */}
          <button
            type="button"
            onClick={toggleMobileNav}
            className="w-10 h-10 flex items-center justify-center rounded text-[#1F2937] hover:bg-[#DCDCDC] active:bg-[#D1D5DB] cursor-pointer touch-manipulation"
            aria-label="Open navigation menu"
          >
            <Menu size={24} className="pointer-events-none text-[#1F2937]" />
          </button>
          <span className="text-xs font-bold uppercase tracking-wider text-[#7A1315]">
            Portal Management
          </span>
        </div>
      </header>

      {/* 2. Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          onClick={closeMobileNav}
          className="fixed inset-0 bg-black/60 z-50 md:hidden touch-manipulation backdrop-blur-xs transition-opacity duration-200"
          aria-hidden="true"
        />
      )}

      {/* 3. Mobile Slide-Out Drawer */}
      <aside
        className={`fixed top-0 bottom-0 left-0 w-72 max-w-[80vw] bg-[#ECECEC] border-r border-[#D1D5DB] z-50 flex flex-col justify-between shadow-2xl transition-transform duration-300 ease-in-out md:hidden select-none touch-manipulation ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div> 
          {/* Header inside drawer */}
          <div className="pt-6 pb-4 px-4 flex flex-col items-center justify-center text-center relative border-b border-[#D1D5DB]/60">
            <button
              type="button"
              onClick={closeMobileNav}
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full text-[#4B5563] hover:text-[#7A1315] hover:bg-[#DCDCDC] cursor-pointer touch-manipulation"
              aria-label="Close menu"
            >
              <X size={20} className="pointer-events-none" />
            </button>

            <div className="w-14 h-14 rounded overflow-hidden flex items-center justify-center mb-2 shadow-xs border border-[#D1D5DB] bg-white relative">
              {!imageError ? (
                <Image 
                  src="/logo.jpg" 
                  alt="Logo" 
                  width={56} 
                  height={56} 
                  priority
                  className="object-contain w-full h-full p-0.5"
                  onError={() => setImageError(true)} 
                />
              ) : (
                <span className="text-xs font-bold text-[#7A1315]">LOGO</span>
              )}
            </div>
            <h1 className="text-xs font-bold tracking-wider text-[#1F2937] uppercase">
              Portal Management
            </h1>
          </div>

          {/* Maroon Accent Stripe */}
          <div className="h-[3px] bg-[#7A1315] w-full mb-3" />

          {/* Navigation Links */}
          <nav className="px-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileNav}
                  className={`flex items-center gap-3 px-3.5 py-3 rounded text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#F8EBEB] text-[#7A1315] font-semibold'
                      : 'text-[#374151] hover:bg-[#E2E2E2] hover:text-[#111827]'
                  }`}
                >
                  <Icon 
                    size={20} 
                    className={`pointer-events-none ${isActive ? 'text-[#7A1315]' : 'text-[#4B5563]'}`} 
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#DCDCDC] text-xs text-[#6B7280]">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            <span className="font-semibold text-[#374151]">System Ready</span>
          </div>
          <p className="text-[11px] text-[#6B7280]">Next.js Full-Stack App</p>
        </div>
      </aside>

      {/* 4. Desktop Persistent Sidebar */}
      <aside className="hidden md:flex w-64 bg-[#ECECEC] border-r border-[#D1D5DB] flex-col justify-between h-screen sticky top-0 select-none z-30 flex-shrink-0">
        <div>
          <div className="pt-6 pb-4 px-4 flex flex-col items-center justify-center text-center">
            <div className="w-14 h-14 rounded overflow-hidden flex items-center justify-center mb-2 shadow-xs border border-[#D1D5DB] bg-white relative">
              {!imageError ? (
                <Image 
                  src="/logo.jpg" 
                  alt="Logo" 
                  width={56} 
                  height={56} 
                  priority
                  className="object-contain w-full h-full p-0.5"
                  onError={() => setImageError(true)} 
                />
              ) : (
                <span className="text-xs font-bold text-[#7A1315]">LOGO</span>
              )}
            </div>
            <h1 className="text-xs font-bold tracking-wider text-[#1F2937] uppercase">
              Portal Management
            </h1>
          </div>

          <div className="h-[3px] bg-[#7A1315] w-full mb-3" />

          <nav className="px-2 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#F8EBEB] text-[#7A1315] font-semibold'
                      : 'text-[#374151] hover:bg-[#E2E2E2] hover:text-[#111827]'
                  }`}
                >
                  <Icon 
                    size={18} 
                    className={isActive ? 'text-[#7A1315]' : 'text-[#4B5563]'} 
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-[#DCDCDC] text-xs text-[#6B7280]">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            <span className="font-semibold text-[#374151]">System Ready</span>
          </div>
          <p className="text-[11px] text-[#6B7280]">Next.js Full-Stack App</p>
        </div>
      </aside>
    </>
  );
}