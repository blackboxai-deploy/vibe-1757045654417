"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart } from "@/components/Charts/BarChart";
import { LineChart } from "@/components/Charts/LineChart";
import { PieChart } from "@/components/Charts/PieChart";
import { cn } from "@/lib/utils";

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

interface ChartsSectionProps {
  chartData: ChartData[];
  className?: string;
}

export function ChartsSection({ chartData, className }: ChartsSectionProps) {
  const renderChart = (chart: ChartData) => {
    switch (chart.type) {
      case 'bar':
        return <BarChart data={chart.data} color={chart.color} />;
      case 'line':
        return <LineChart data={chart.data} color={chart.color} />;
      case 'pie':
        return <PieChart data={chart.data} />;
      default:
        return <div className="h-64 flex items-center justify-center text-gray-500">Chart not available</div>;
    }
  };

  return (
    <div className={cn("space-y-6", className)}>
      {chartData.map((chart) => (
        <Card key={chart.id} className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div className="space-y-1">
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                {chart.title}
              </CardTitle>
              {chart.description && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {chart.description}
                </p>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              {chart.growth && (
                <Badge 
                  variant="secondary"
                  className="bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                >
                  📈 {chart.growth}
                </Badge>
              )}
              
              {chart.period && (
                <Badge variant="outline" className="text-xs">
                  {chart.period}
                </Badge>
              )}
              
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                ⋯
              </Button>
            </div>
          </CardHeader>

          <CardContent className="pb-6">
            <div className="h-64 md:h-80">
              {renderChart(chart)}
            </div>
          </CardContent>

          {/* Interactive Elements */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="flex space-x-1">
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-gray-100 dark:hover:bg-gray-700">
                📊
              </Button>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-gray-100 dark:hover:bg-gray-700">
                📥
              </Button>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-gray-100 dark:hover:bg-gray-700">
                🔍
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}