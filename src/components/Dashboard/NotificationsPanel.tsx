"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

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

interface NotificationsPanelProps {
  notifications: Notification[];
  isOpen?: boolean;
  onToggle?: () => void;
  className?: string;
}

export function NotificationsPanel({ 
  notifications, 
  isOpen = true, 
  onToggle, 
  className 
}: NotificationsPanelProps) {
  const getNotificationColor = (type: string, priority: string) => {
    if (priority === 'urgent') return 'border-red-500 bg-red-50 dark:bg-red-900/10';
    switch (type) {
      case 'error':
        return 'border-red-200 bg-red-50 dark:bg-red-900/10';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50 dark:bg-yellow-900/10';
      case 'success':
        return 'border-green-200 bg-green-50 dark:bg-green-900/10';
      default:
        return 'border-blue-200 bg-blue-50 dark:bg-blue-900/10';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-500 text-white';
      case 'high':
        return 'bg-orange-500 text-white';
      case 'medium':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-gray-500 text-white';
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

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Card className={cn("", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center space-x-2">
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
            Notifications
          </CardTitle>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="h-5 px-2 text-xs">
              {unreadCount}
            </Badge>
          )}
        </div>
        
        <div className="flex space-x-1">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0"
            onClick={() => console.log("Mark all as read")}
            title="Mark all as read"
          >
            ✓
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0"
            onClick={onToggle}
            title="Toggle panel"
          >
            {isOpen ? "−" : "+"}
          </Button>
        </div>
      </CardHeader>

      {isOpen && (
        <CardContent className="p-0">
          <ScrollArea className="h-80">
            <div className="space-y-2 p-4 pt-0">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "relative p-3 rounded-lg border-l-4 transition-all duration-200 hover:shadow-sm cursor-pointer",
                    getNotificationColor(notification.type, notification.priority),
                    !notification.read && "font-medium",
                    notification.read && "opacity-75"
                  )}
                  onClick={() => console.log("Mark as read:", notification.id)}
                >
                  {/* Unread Indicator */}
                  {!notification.read && (
                    <div className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full"></div>
                  )}

                  {/* Header */}
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{notification.icon}</span>
                      <h4 className={cn(
                        "text-sm font-medium text-gray-900 dark:text-white",
                        !notification.read && "font-semibold"
                      )}>
                        {notification.title}
                      </h4>
                    </div>
                    
                    <Badge 
                      className={cn("text-xs h-5", getPriorityBadge(notification.priority))}
                    >
                      {notification.priority}
                    </Badge>
                  </div>

                  {/* Message */}
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
                    {notification.message}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {getTimeAgo(notification.timestamp)}
                    </span>
                    
                    {notification.actionable && (
                      <div className="flex space-x-1">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 px-2 text-xs hover:bg-white dark:hover:bg-gray-800"
                        >
                          View
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 px-2 text-xs hover:bg-white dark:hover:bg-gray-800"
                        >
                          Action
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {notifications.length === 0 && (
              <div className="flex flex-col items-center justify-center h-48 text-gray-500 dark:text-gray-400">
                <div className="text-4xl mb-2">🔔</div>
                <p className="text-sm">No notifications</p>
                <p className="text-xs mt-1">You're all caught up!</p>
              </div>
            )}
          </ScrollArea>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="border-t border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {unreadCount} unread of {notifications.length} total
                </div>
                <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                  View all →
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
}