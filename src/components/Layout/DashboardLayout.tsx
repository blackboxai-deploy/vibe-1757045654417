"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Navigation/Sidebar";
import { TopHeader } from "@/components/Navigation/TopHeader";
import { MobileBottomNav } from "@/components/Navigation/MobileBottomNav";
import { FloatingActionButton } from "@/components/Mobile/FloatingActionButton";
import { useMobile } from "@/hooks/use-mobile";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useMobile();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Desktop Sidebar */}
      {!isMobile && (
        <Sidebar 
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />
      )}

      {/* Mobile Sidebar Overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      {isMobile && (
        <div className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <Sidebar 
            isOpen={sidebarOpen}
            onToggle={() => setSidebarOpen(!sidebarOpen)}
          />
        </div>
      )}

      {/* Main Content Area */}
      <div className={`transition-all duration-300 ${
        !isMobile && sidebarOpen ? 'ml-64' : !isMobile ? 'ml-16' : 'ml-0'
      }`}>
        {/* Top Header */}
        <TopHeader 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
        />

        {/* Main Content */}
        <main className={`min-h-screen pt-16 ${isMobile ? 'pb-20' : 'pb-6'}`}>
          {children}
        </main>

        {/* Mobile Bottom Navigation */}
        {isMobile && <MobileBottomNav />}
      </div>

      {/* Floating Action Button */}
      <FloatingActionButton />
    </div>
  );
}