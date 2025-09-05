"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const pathname = usePathname();

  const navigationItems = [
    {
      title: "Dashboard",
      href: "/",
      icon: "📊",
      badge: null,
    },
    {
      title: "Finance",
      href: "/finance",
      icon: "💰",
      badge: "3",
    },
    {
      title: "Sales",
      href: "/sales",
      icon: "📈",
      badge: null,
    },
    {
      title: "Inventory",
      href: "/inventory",
      icon: "📦",
      badge: "12",
    },
    {
      title: "HR",
      href: "/hr",
      icon: "👥",
      badge: null,
    },
    {
      title: "Reports",
      href: "/reports",
      icon: "📋",
      badge: "New",
    },
  ];

  const quickActions = [
    { title: "Create Invoice", icon: "📄", action: () => console.log("Create Invoice") },
    { title: "Add Customer", icon: "➕", action: () => console.log("Add Customer") },
    { title: "Generate Report", icon: "📊", action: () => console.log("Generate Report") },
    { title: "Backup Data", icon: "💾", action: () => console.log("Backup Data") },
  ];

  return (
    <div className={cn(
      "fixed inset-y-0 left-0 z-50 flex flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 shadow-lg",
      isOpen ? "w-64" : "w-16"
    )}>
      {/* Logo Section */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        {isOpen ? (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              SAP
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                SAP Dashboard
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Business Intelligence
              </p>
            </div>
          </div>
        ) : (
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-white font-bold text-sm mx-auto">
            SAP
          </div>
        )}
        
        {isOpen && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            ←
          </Button>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {navigationItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
              pathname === item.href
                ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
            )}
          >
            <span className="text-lg mr-3 flex-shrink-0">
              {item.icon}
            </span>
            {isOpen && (
              <>
                <span className="flex-1">{item.title}</span>
                {item.badge && (
                  <Badge 
                    variant={pathname === item.href ? "default" : "secondary"}
                    className="ml-2 text-xs"
                  >
                    {item.badge}
                  </Badge>
                )}
              </>
            )}
          </Link>
        ))}
      </nav>

      {/* Quick Actions */}
      {isOpen && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
            Quick Actions
          </h3>
          <div className="space-y-1">
            {quickActions.map((action) => (
              <Button
                key={action.title}
                variant="ghost"
                size="sm"
                onClick={action.action}
                className="w-full justify-start text-left font-normal"
              >
                <span className="mr-2">{action.icon}</span>
                {action.title}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Collapse Button for Desktop */}
      {!isOpen && (
        <div className="p-2 border-t border-gray-200 dark:border-gray-700">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="w-full p-2"
            title="Expand Sidebar"
          >
            →
          </Button>
        </div>
      )}
    </div>
  );
}