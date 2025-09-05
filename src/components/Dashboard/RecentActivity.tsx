"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

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

interface RecentActivityProps {
  activities: Activity[];
  className?: string;
}

export function RecentActivity({ activities, className }: RecentActivityProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400';
      case 'warning':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'error':
        return 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400';
    }
  };

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <Card className={cn("", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
            Recent Activity
          </CardTitle>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Latest business transactions and updates
          </p>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm" className="h-8 px-3 text-xs">
            🔄 Refresh
          </Button>
          <Button variant="ghost" size="sm" className="h-8 px-3 text-xs">
            📁 View All
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <ScrollArea className="h-96">
          <div className="space-y-1 p-4 pt-0">
            {activities.map((activity, index) => (
              <div
                key={activity.id}
                className={cn(
                  "group relative flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer",
                  index === 0 && "bg-blue-50/50 dark:bg-blue-900/10"
                )}
              >
                {/* Timeline Line */}
                {index < activities.length - 1 && (
                  <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
                )}

                {/* Icon */}
                <div className={cn(
                  "relative z-10 flex items-center justify-center w-10 h-10 rounded-full text-lg shadow-sm",
                  getStatusColor(activity.status)
                )}>
                  {activity.icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 space-y-1">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {activity.title}
                    </h4>
                    <div className="flex items-center space-x-2">
                      {activity.amount && (
                        <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                          {activity.amount}
                        </span>
                      )}
                      <Badge variant="outline" className="text-xs">
                        {activity.type}
                      </Badge>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {activity.description}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-2">
                      <span>👤 {activity.user}</span>
                      <span>•</span>
                      <span>{getTimeAgo(activity.timestamp)}</span>
                    </div>
                    
                    {/* Actions (shown on hover) */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-1">
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        👁️
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        📋
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {activities.length === 0 && (
            <div className="flex flex-col items-center justify-center h-48 text-gray-500 dark:text-gray-400">
              <div className="text-4xl mb-2">📭</div>
              <p className="text-sm">No recent activity</p>
              <Button variant="ghost" size="sm" className="mt-2 text-xs">
                Refresh to check for updates
              </Button>
            </div>
          )}
        </ScrollArea>

        {/* Footer */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>Showing {activities.length} recent activities</span>
            <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
              View activity log →
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}