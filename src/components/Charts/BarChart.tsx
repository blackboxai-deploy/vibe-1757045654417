"use client";

interface BarChartData {
  label: string;
  value: number;
  color?: string;
}

interface BarChartProps {
  data: BarChartData[];
  color?: string;
  height?: number;
}

export function BarChart({ data, color = "#3b82f6", height = 300 }: BarChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
        <div className="text-center">
          <div className="text-4xl mb-2">📊</div>
          <p>No data available</p>
        </div>
      </div>
    );
  }

  const maxValue = Math.max(...data.map(item => item.value));
  const barWidth = Math.max(40, Math.min(80, 300 / data.length));

  return (
    <div className="h-full w-full flex flex-col">
      {/* Chart Area */}
      <div className="flex-1 relative">
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${data.length * (barWidth + 20)} ${height}`}
          className="overflow-visible"
        >
          {/* Grid Lines */}
          {[0.25, 0.5, 0.75, 1].map((ratio, index) => (
            <g key={index}>
              <line
                x1="0"
                y1={height * (1 - ratio)}
                x2={data.length * (barWidth + 20)}
                y2={height * (1 - ratio)}
                stroke="currentColor"
                strokeOpacity="0.1"
                strokeDasharray="2,2"
                className="text-gray-400"
              />
              <text
                x="-10"
                y={height * (1 - ratio) + 4}
                className="text-xs fill-gray-500 dark:fill-gray-400"
                textAnchor="end"
              >
                {Math.round(maxValue * ratio).toLocaleString()}
              </text>
            </g>
          ))}

          {/* Bars */}
          {data.map((item, index) => {
            const barHeight = (item.value / maxValue) * (height - 40);
            const x = index * (barWidth + 20) + 10;
            const y = height - barHeight - 20;

            return (
              <g key={index}>
                {/* Bar Shadow */}
                <rect
                  x={x + 2}
                  y={y + 2}
                  width={barWidth}
                  height={barHeight}
                  fill="rgba(0,0,0,0.1)"
                  rx="4"
                />
                
                {/* Main Bar */}
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  fill={item.color || color}
                  rx="4"
                  className="transition-all duration-300 hover:opacity-80 cursor-pointer"
                />

                {/* Value Label */}
                <text
                  x={x + barWidth / 2}
                  y={y - 8}
                  className="text-xs fill-gray-700 dark:fill-gray-300 font-medium"
                  textAnchor="middle"
                >
                  {item.value.toLocaleString()}
                </text>

                {/* X-axis Label */}
                <text
                  x={x + barWidth / 2}
                  y={height - 5}
                  className="text-xs fill-gray-600 dark:fill-gray-400"
                  textAnchor="middle"
                >
                  {item.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex justify-center mt-4 space-x-4 text-xs text-gray-600 dark:text-gray-400">
        <div className="flex items-center space-x-2">
          <div 
            className="w-3 h-3 rounded"
            style={{ backgroundColor: color }}
          ></div>
          <span>Values</span>
        </div>
      </div>
    </div>
  );
}