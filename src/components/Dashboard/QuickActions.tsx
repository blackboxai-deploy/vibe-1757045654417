"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  hoverColor: string;
  action: () => void;
  badge?: string;
  shortcut?: string;
}

interface QuickActionsProps {
  onRefresh?: () => void;
  className?: string;
}

export function QuickActions({ onRefresh, className }: QuickActionsProps) {
  const actions: QuickAction[] = [
    {
      id: "create-invoice",
      title: "Create Invoice",
      description: "Generate new customer invoice",
      icon: "📄",
      color: "bg-blue-500 hover:bg-blue-600",
      hoverColor: "group-hover:bg-blue-50",
      action: () => console.log("Create Invoice"),
      badge: "New",
      shortcut: "Ctrl+I"
    },
    {
      id: "add-customer",
      title: "Add Customer",
      description: "Register new customer",
      icon: "👤",
      color: "bg-green-500 hover:bg-green-600",
      hoverColor: "group-hover:bg-green-50",
      action: () => console.log("Add Customer"),
      shortcut: "Ctrl+U"
    },
    {
      id: "generate-report",
      title: "Generate Report",
      description: "Create business analytics report",
      icon: "📊",
      color: "bg-purple-500 hover:bg-purple-600",
      hoverColor: "group-hover:bg-purple-50",
      action: () => console.log("Generate Report"),
      badge: "3",
      shortcut: "Ctrl+R"
    },
    {
      id: "manage-inventory",
      title: "Manage Inventory",
      description: "Update stock and products",
      icon: "📦",
      color: "bg-orange-500 hover:bg-orange-600",
      hoverColor: "group-hover:bg-orange-50",
      action: () => console.log("Manage Inventory"),
      badge: "12",
      shortcut: "Ctrl+M"
    },
    {
      id: "process-payment",
      title: "Process Payment",
      description: "Handle customer payments",
      icon: "💳",
      color: "bg-indigo-500 hover:bg-indigo-600",
      hoverColor: "group-hover:bg-indigo-50",
      action: () => console.log("Process Payment"),
      shortcut: "Ctrl+P"
    },
    {
      id: "backup-data",
      title: "Backup Data",
      description: "Secure data backup",
      icon: "💾",
      color: "bg-gray-500 hover:bg-gray-600",
      hoverColor: "group-hover:bg-gray-50",
      action: () => console.log("Backup Data"),
      shortcut: "Ctrl+B"
    }
  ];

  return (
    <Card className={cn("", className)}>
      <CardContent className="p-4 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Quick Actions
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Frequently used business operations
            </p>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onRefresh}
            className="h-8 px-3 text-xs hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            🔄 Refresh
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {actions.map((action) => (
            <Button
              key={action.id}
              variant="ghost"
              onClick={action.action}
              className={cn(
                "group relative h-auto p-4 flex flex-col items-start space-y-2 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 hover:shadow-md",
                action.hoverColor
              )}
            >
              {/* Badge */}
              {action.badge && (
                <Badge 
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs p-0"
                >
                  {action.badge}
                </Badge>
              )}

              {/* Icon & Title Row */}
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-3">
                  <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center text-white text-lg shadow-sm",
                    action.color
                  )}>
                    {action.icon}
                  </div>
                  
                  <div className="text-left">
                    <h3 className="font-medium text-gray-900 dark:text-white text-sm">
                      {action.title}
                    </h3>
                  </div>
                </div>
                
                {/* Shortcut */}
                {action.shortcut && (
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Badge variant="outline" className="text-xs px-2 py-0.5">
                      {action.shortcut}
                    </Badge>
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-xs text-gray-600 dark:text-gray-400 text-left w-full">
                {action.description}
              </p>

              {/* Hover Arrow */}
              <div className="absolute top-1/2 right-4 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200">
                <span className="text-gray-400">→</span>
              </div>
            </Button>
          ))}
        </div>

        {/* Keyboard Shortcuts Info */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>💡 Tip: Use keyboard shortcuts for faster access</span>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-6 px-2 text-xs"
              onClick={() => console.log("Show all shortcuts")}
            >
              View all shortcuts
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}