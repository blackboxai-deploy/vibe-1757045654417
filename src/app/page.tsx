"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { MetricsGrid } from "@/components/Dashboard/MetricsGrid";
import { ChartsSection } from "@/components/Dashboard/ChartsSection";
import { RecentActivity } from "@/components/Dashboard/RecentActivity";
import { QuickActions } from "@/components/Dashboard/QuickActions";
import { NotificationsPanel } from "@/components/Dashboard/NotificationsPanel";
import { useDashboardData } from "@/hooks/useDashboardData";
import { useAuth } from "@/hooks/useAuth";

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuth();
  const { dashboardData, loading, refreshData } = useDashboardData();
  const [showNotifications, setShowNotifications] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated && typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading SAP Dashboard...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading dashboard data...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 p-4 md:p-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg text-white p-6 shadow-lg">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            Welcome back, {user?.name || 'User'}!
          </h1>
          <p className="text-blue-100 mb-4">
            Here's your business overview for today
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>All Systems Online</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <span>5 Pending Tasks</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
              <span>Last sync: 2 min ago</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <QuickActions onRefresh={refreshData} />

        {/* Metrics Grid */}
        <MetricsGrid metrics={dashboardData.metrics} />

        {/* Charts Section */}
        <ChartsSection 
          chartData={dashboardData.charts} 
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        />

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RecentActivity activities={dashboardData.activities} />
          </div>
          <div>
            <NotificationsPanel 
              notifications={dashboardData.notifications}
              isOpen={showNotifications}
              onToggle={() => setShowNotifications(!showNotifications)}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}