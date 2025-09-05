"use client";

import { useState, useEffect } from 'react';

interface Metric {
  id: string;
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease' | 'neutral';
  icon: string;
  description: string;
}

interface ChartData {
  id: string;
  title: string;
  type: 'bar' | 'line' | 'pie';
  data: any[];
  description?: string;
  period?: string;
  growth?: string;
  color?: string;
}

interface Activity {
  id: string;
  type: 'invoice' | 'payment' | 'customer' | 'order' | 'report' | 'inventory';
  title: string;
  description: string;
  timestamp: string;
  user: string;
  amount?: string;
  status: 'success' | 'warning' | 'error' | 'info';
  icon: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  timestamp: string;
  read: boolean;
  actionable?: boolean;
  icon: string;
}

interface DashboardData {
  metrics: Metric[];
  charts: ChartData[];
  activities: Activity[];
  notifications: Notification[];
}

export function useDashboardData() {
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    metrics: [],
    charts: [],
    activities: [],
    notifications: []
  });
  const [loading, setLoading] = useState(true);

  const mockData: DashboardData = {
    metrics: [
      {
        id: 'revenue',
        title: 'Total Revenue',
        value: '$124,563',
        change: '+12.5%',
        changeType: 'increase',
        icon: '💰',
        description: 'Monthly revenue'
      },
      {
        id: 'orders',
        title: 'New Orders',
        value: '1,234',
        change: '+8.2%',
        changeType: 'increase',
        icon: '📦',
        description: 'Orders this month'
      },
      {
        id: 'customers',
        title: 'Active Customers',
        value: '8,945',
        change: '+3.1%',
        changeType: 'increase',
        icon: '👥',
        description: 'Active user base'
      },
      {
        id: 'conversion',
        title: 'Conversion Rate',
        value: '3.2%',
        change: '-0.5%',
        changeType: 'decrease',
        icon: '📈',
        description: 'Sales conversion'
      }
    ],
    charts: [
      {
        id: 'revenue-trend',
        title: 'Revenue Trend',
        type: 'line',
        data: [
          { label: 'Jan', value: 95000 },
          { label: 'Feb', value: 102000 },
          { label: 'Mar', value: 98000 },
          { label: 'Apr', value: 115000 },
          { label: 'May', value: 124563 },
        ],
        description: 'Monthly revenue progression',
        period: 'Last 5 months',
        growth: '+15.2%',
        color: '#3b82f6'
      },
      {
        id: 'sales-by-region',
        title: 'Sales by Region',
        type: 'bar',
        data: [
          { label: 'North', value: 45000 },
          { label: 'South', value: 32000 },
          { label: 'East', value: 28000 },
          { label: 'West', value: 38000 },
        ],
        description: 'Regional sales distribution',
        period: 'This month',
        color: '#10b981'
      },
      {
        id: 'product-mix',
        title: 'Product Mix',
        type: 'pie',
        data: [
          { label: 'Software', value: 45, color: '#3b82f6' },
          { label: 'Hardware', value: 30, color: '#10b981' },
          { label: 'Services', value: 15, color: '#f59e0b' },
          { label: 'Support', value: 10, color: '#ef4444' },
        ],
        description: 'Revenue by product category',
        period: 'Current quarter'
      }
    ],
    activities: [
      {
        id: '1',
        type: 'invoice',
        title: 'Invoice #INV-2024-001 created',
        description: 'New invoice generated for Acme Corp - $15,750',
        timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
        user: 'Sarah Johnson',
        amount: '$15,750',
        status: 'success',
        icon: '📄'
      },
      {
        id: '2',
        type: 'payment',
        title: 'Payment received',
        description: 'Payment of $8,500 received from Global Industries',
        timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
        user: 'System',
        amount: '$8,500',
        status: 'success',
        icon: '💳'
      },
      {
        id: '3',
        type: 'inventory',
        title: 'Low stock alert',
        description: 'Product SKU-12345 is running low (5 units remaining)',
        timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
        user: 'System',
        status: 'warning',
        icon: '⚠️'
      },
      {
        id: '4',
        type: 'customer',
        title: 'New customer registered',
        description: 'Tech Solutions LLC joined as a new customer',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        user: 'Mike Chen',
        status: 'info',
        icon: '👤'
      },
      {
        id: '5',
        type: 'report',
        title: 'Monthly report generated',
        description: 'Sales report for April 2024 has been generated',
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        user: 'Emma Davis',
        status: 'info',
        icon: '📊'
      }
    ],
    notifications: [
      {
        id: '1',
        title: 'System Maintenance',
        message: 'Scheduled maintenance will occur tonight from 12:00 AM to 2:00 AM EST.',
        type: 'info',
        priority: 'medium',
        timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        read: false,
        actionable: true,
        icon: '🔧'
      },
      {
        id: '2',
        title: 'Security Alert',
        message: 'Unusual login activity detected from IP 192.168.1.100',
        type: 'warning',
        priority: 'high',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        read: false,
        actionable: true,
        icon: '🔒'
      },
      {
        id: '3',
        title: 'Backup Completed',
        message: 'Daily data backup completed successfully at 3:00 AM',
        type: 'success',
        priority: 'low',
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
        read: true,
        icon: '✅'
      },
      {
        id: '4',
        title: 'License Expiring',
        message: 'Your software license will expire in 15 days. Please renew to avoid service interruption.',
        type: 'warning',
        priority: 'urgent',
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        read: false,
        actionable: true,
        icon: '⚠️'
      }
    ]
  };

  const refreshData = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setDashboardData(mockData);
    setLoading(false);
  };

  useEffect(() => {
    refreshData();
  }, []);

  return {
    dashboardData,
    loading,
    refreshData
  };
}