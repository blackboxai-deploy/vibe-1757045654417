"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function MobileBottomNav() {
  const pathname = usePathname();

  const navigationItems = [
    {
      title: "Home",
      href: "/",
      icon: "🏠",
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
      title: "Reports",
      href: "/reports",
      icon: "📋",
      badge: null,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg">
      <div className="flex">
        {navigationItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex-1 flex flex-col items-center justify-center py-2 px-1 min-h-[60px] transition-colors relative",
              pathname === item.href
                ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
            )}
          >
            {/* Active Indicator */}
            {pathname === item.href && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-blue-600 rounded-b-full" />
            )}
            
            {/* Icon with Badge */}
            <div className="relative mb-1">
              <span className="text-lg">{item.icon}</span>
              {item.badge && (
                <Badge 
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-4 w-4 flex items-center justify-center text-xs p-0 min-w-[16px]"
                >
                  {item.badge}
                </Badge>
              )}
            </div>
            
            {/* Label */}
            <span className="text-xs font-medium leading-none">
              {item.title}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
}