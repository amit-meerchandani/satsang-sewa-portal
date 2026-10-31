import type { Metadata } from 'next';
import './globals.css';
import Sidebar from '@/components/layout/Sidebar';
import { ChevronDown } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Management Portal',
  description: 'Records Management System',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body 
        className="min-h-screen bg-[#F8F9FA] flex flex-col md:flex-row text-[#1F2937] antialiased"
        suppressHydrationWarning
      >
        {/* Responsive Sidebar (Drawer on mobile, fixed column on desktop) */}
        <Sidebar />

        {/* Main View Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto pt-14 md:pt-0">
          {/* Top Bar for Desktop */}
          <header className="hidden md:flex h-14 bg-white border-b border-[#E5E7EB] px-8 items-center justify-between sticky top-0 z-20">
            <div>
              <h2 className="text-base font-semibold text-[#1F2937]">Records Overview</h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#374151] cursor-pointer hover:text-[#7A1315]">
                <span>Admin User</span>
                <ChevronDown size={14} className="text-[#6B7280]" />
              </div>
            </div>
          </header>

          {/* Dynamic Content */}
          <main className="p-4 sm:p-6 lg:p-8 flex-1">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}