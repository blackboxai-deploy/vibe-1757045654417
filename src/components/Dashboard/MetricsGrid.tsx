"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Metric {
  id: string;
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease' | 'neutral';
  icon: string;
  description: string;
  color?: string;
}

interface MetricsGridProps {
  metrics: Metric[];
  className?: string;
}

export function MetricsGrid({ metrics, className }: MetricsGridProps) {
  const getChangeColor = (type: string) => {
    switch (type) {
      case 'increase':
        return 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400';
      case 'decrease':
        return 'text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'text-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getChangeIcon = (type: string) => {
    switch (type) {
      case 'increase':
        return '📈';
      case 'decrease':
        return '📉';
      default:
        return '➖';
    }
  };

  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6", className)}>
      {metrics.map((metric) => (
        <Card 
          key={metric.id} 
          className="relative overflow-hidden hover:shadow-lg transition-shadow duration-200"
        >
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 -mt-4 -mr-4 opacity-10">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full"></div>
          </div>

          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <span className="text-lg">{metric.icon}</span>
              </div>
              <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {metric.title}
              </CardTitle>
            </div>
          </CardHeader>

          <CardContent className="space-y-3">
            {/* Main Value */}
            <div className="space-y-1">
              <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                {metric.value}
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {metric.description}
              </p>
            </div>

            {/* Change Indicator */}
            <div className="flex items-center space-x-2">
              <Badge 
                variant="secondary"
                className={cn(
                  "flex items-center space-x-1 text-xs font-medium px-2 py-1",
                  getChangeColor(metric.changeType)
                )}
              >
                <span>{getChangeIcon(metric.changeType)}</span>
                <span>{metric.change}</span>
              </Badge>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                vs last period
              </span>
            </div>
          </CardContent>

          {/* Hover Effect Border */}
          <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></div>
        </Card>
      ))}
    </div>
  );
}