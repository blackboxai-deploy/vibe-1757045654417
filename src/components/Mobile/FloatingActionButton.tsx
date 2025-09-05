"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface FABAction {
  icon: string;
  label: string;
  action: () => void;
  color?: string;
}

export function FloatingActionButton() {
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useMobile();

  const actions: FABAction[] = [
    {
      icon: "📄",
      label: "Create Invoice",
      action: () => {
        console.log("Create Invoice");
        setIsExpanded(false);
      },
      color: "bg-green-500 hover:bg-green-600"
    },
    {
      icon: "👤",
      label: "Add Customer",
      action: () => {
        console.log("Add Customer");
        setIsExpanded(false);
      },
      color: "bg-blue-500 hover:bg-blue-600"
    },
    {
      icon: "📊",
      label: "Generate Report",
      action: () => {
        console.log("Generate Report");
        setIsExpanded(false);
      },
      color: "bg-purple-500 hover:bg-purple-600"
    },
    {
      icon: "📦",
      label: "Add Product",
      action: () => {
        console.log("Add Product");
        setIsExpanded(false);
      },
      color: "bg-orange-500 hover:bg-orange-600"
    },
  ];

  // Only show on mobile devices
  if (!isMobile) return null;

  return (
    <div className="fixed bottom-20 right-4 z-50">
      {/* Action Items */}
      {isExpanded && (
        <div className="absolute bottom-16 right-0 space-y-2 animate-in slide-in-from-bottom-2 duration-200">
          {actions.map((action, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 animate-in slide-in-from-right-1"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="bg-white dark:bg-gray-800 px-3 py-2 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                <span className="text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">
                  {action.label}
                </span>
              </div>
              <Button
                size="sm"
                onClick={action.action}
                className={cn(
                  "h-12 w-12 rounded-full shadow-lg text-white hover:shadow-xl transition-all duration-200 transform hover:scale-105",
                  action.color
                )}
              >
                <span className="text-lg">{action.icon}</span>
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Backdrop */}
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-20 -z-10"
          onClick={() => setIsExpanded(false)}
        />
      )}

      {/* Main FAB */}
      <Button
        size="lg"
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "h-14 w-14 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700 text-white hover:shadow-xl transition-all duration-200",
          isExpanded && "rotate-45 bg-red-500 hover:bg-red-600"
        )}
      >
        <span className="text-2xl">
          {isExpanded ? "✕" : "+"}
        </span>
      </Button>
    </div>
  );
}