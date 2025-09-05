"use client";

import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { MetricsGrid } from "@/components/Dashboard/MetricsGrid";
import { ChartsSection } from "@/components/Dashboard/ChartsSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const financeMetrics = [
  {
    id: 'total-revenue',
    title: 'Total Revenue',
    value: '$2,456,789',
    change: '+15.3%',
    changeType: 'increase' as const,
    icon: '💰',
    description: 'This quarter'
  },
  {
    id: 'profit-margin',
    title: 'Profit Margin',
    value: '23.4%',
    change: '+2.1%',
    changeType: 'increase' as const,
    icon: '📊',
    description: 'Net profit margin'
  },
  {
    id: 'expenses',
    title: 'Total Expenses',
    value: '$1,879,234',
    change: '+8.7%',
    changeType: 'increase' as const,
    icon: '📉',
    description: 'Operating expenses'
  },
  {
    id: 'cash-flow',
    title: 'Cash Flow',
    value: '$577,555',
    change: '+12.8%',
    changeType: 'increase' as const,
    icon: '💸',
    description: 'Net cash flow'
  }
];

const financeCharts = [
  {
    id: 'revenue-vs-expenses',
    title: 'Revenue vs Expenses',
    type: 'bar' as const,
    data: [
      { label: 'Q1', value: 580000, expenses: 420000 },
      { label: 'Q2', value: 650000, expenses: 480000 },
      { label: 'Q3', value: 720000, expenses: 510000 },
      { label: 'Q4', value: 790000, expenses: 520000 },
    ],
    description: 'Quarterly comparison',
    period: 'This year',
    growth: '+23.5%',
    color: '#10b981'
  },
  {
    id: 'cash-flow-trend',
    title: 'Cash Flow Trend',
    type: 'line' as const,
    data: [
      { label: 'Jan', value: 45000 },
      { label: 'Feb', value: 52000 },
      { label: 'Mar', value: 48000 },
      { label: 'Apr', value: 61000 },
      { label: 'May', value: 58000 },
      { label: 'Jun', value: 65000 },
    ],
    description: 'Monthly cash flow progression',
    period: 'Last 6 months',
    growth: '+18.2%',
    color: '#3b82f6'
  }
];

const invoiceData = [
  {
    id: 'INV-2024-001',
    customer: 'Acme Corporation',
    amount: '$15,750.00',
    status: 'Paid',
    dueDate: '2024-05-15',
    issueDate: '2024-04-15'
  },
  {
    id: 'INV-2024-002',
    customer: 'Global Industries',
    amount: '$28,900.00',
    status: 'Pending',
    dueDate: '2024-05-20',
    issueDate: '2024-04-20'
  },
  {
    id: 'INV-2024-003',
    customer: 'Tech Solutions LLC',
    amount: '$12,400.00',
    status: 'Overdue',
    dueDate: '2024-05-10',
    issueDate: '2024-04-10'
  },
];

export default function FinancePage() {
  return (
    <DashboardLayout>
      <div className="space-y-6 p-4 md:p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Finance Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Track revenue, expenses, and financial performance
            </p>
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              📊 Reports
            </Button>
            <Button variant="outline" size="sm">
              📥 Export
            </Button>
            <Button size="sm" className="bg-green-600 hover:bg-green-700">
              📄 New Invoice
            </Button>
          </div>
        </div>

        {/* Financial Metrics */}
        <MetricsGrid metrics={financeMetrics} />

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartsSection chartData={financeCharts} />
        </div>

        {/* Financial Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Invoices */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-lg font-semibold">Recent Invoices</CardTitle>
              <Button variant="ghost" size="sm">
                View All →
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {invoiceData.map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium text-sm">{invoice.id}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{invoice.customer}</p>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="font-semibold text-sm">{invoice.amount}</p>
                      <Badge 
                        variant={
                          invoice.status === 'Paid' ? 'default' : 
                          invoice.status === 'Pending' ? 'secondary' : 'destructive'
                        }
                        className="text-xs"
                      >
                        {invoice.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Financial Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start" size="lg">
                <span className="mr-3 text-lg">💳</span>
                <div className="text-left">
                  <div className="font-medium">Process Payment</div>
                  <div className="text-xs text-gray-500">Record incoming payment</div>
                </div>
              </Button>
              
              <Button variant="outline" className="w-full justify-start" size="lg">
                <span className="mr-3 text-lg">📊</span>
                <div className="text-left">
                  <div className="font-medium">Financial Report</div>
                  <div className="text-xs text-gray-500">Generate P&L statement</div>
                </div>
              </Button>
              
              <Button variant="outline" className="w-full justify-start" size="lg">
                <span className="mr-3 text-lg">💰</span>
                <div className="text-left">
                  <div className="font-medium">Budget Planning</div>
                  <div className="text-xs text-gray-500">Create budget forecast</div>
                </div>
              </Button>
              
              <Button variant="outline" className="w-full justify-start" size="lg">
                <span className="mr-3 text-lg">🧾</span>
                <div className="text-left">
                  <div className="font-medium">Tax Calculations</div>
                  <div className="text-xs text-gray-500">Calculate tax obligations</div>
                </div>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Financial Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Accounts Receivable</p>
                  <p className="text-2xl font-bold">$456,789</p>
                </div>
                <div className="text-3xl">📈</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Accounts Payable</p>
                  <p className="text-2xl font-bold">$234,567</p>
                </div>
                <div className="text-3xl">📉</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Working Capital</p>
                  <p className="text-2xl font-bold">$222,222</p>
                </div>
                <div className="text-3xl">⚖️</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}