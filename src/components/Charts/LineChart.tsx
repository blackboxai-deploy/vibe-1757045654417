"use client";

interface LineChartData {
  label: string;
  value: number;
}

interface LineChartProps {
  data: LineChartData[];
  color?: string;
  height?: number;
}

export function LineChart({ data, color = "#3b82f6", height = 300 }: LineChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
        <div className="text-center">
          <div className="text-4xl mb-2">📈</div>
          <p>No data available</p>
        </div>
      </div>
    );
  }

  const maxValue = Math.max(...data.map(item => item.value));
  const minValue = Math.min(...data.map(item => item.value));
  const range = maxValue - minValue;
  const padding = 40;
  const chartWidth = 600;
  const stepX = (chartWidth - padding * 2) / (data.length - 1);

  const getY = (value: number) => {
    const normalizedValue = (value - minValue) / (range || 1);
    return height - padding - normalizedValue * (height - padding * 2);
  };

  const pathData = data
    .map((item, index) => {
      const x = padding + index * stepX;
      const y = getY(item.value);
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');

  const areaPath = `${pathData} L ${padding + (data.length - 1) * stepX} ${height - padding} L ${padding} ${height - padding} Z`;

  return (
    <div className="h-full w-full flex flex-col">
      {/* Chart Area */}
      <div className="flex-1 relative">
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${chartWidth} ${height}`}
          className="overflow-visible"
        >
          {/* Grid Lines */}
          {[0.25, 0.5, 0.75, 1].map((ratio, index) => {
            const y = height - padding - ratio * (height - padding * 2);
            const value = minValue + range * ratio;
            return (
              <g key={index}>
                <line
                  x1={padding}
                  y1={y}
                  x2={chartWidth - padding}
                  y2={y}
                  stroke="currentColor"
                  strokeOpacity="0.1"
                  strokeDasharray="2,2"
                  className="text-gray-400"
                />
                <text
                  x={padding - 10}
                  y={y + 4}
                  className="text-xs fill-gray-500 dark:fill-gray-400"
                  textAnchor="end"
                >
                  {Math.round(value).toLocaleString()}
                </text>
              </g>
            );
          })}

          {/* Area Fill */}
          <path
            d={areaPath}
            fill={color}
            fillOpacity="0.1"
            className="transition-all duration-300"
          />

          {/* Line */}
          <path
            d={pathData}
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-all duration-300"
          />

          {/* Data Points */}
          {data.map((item, index) => {
            const x = padding + index * stepX;
            const y = getY(item.value);

            return (
              <g key={index}>
                {/* Point Shadow */}
                <circle
                  cx={x + 1}
                  cy={y + 1}
                  r="6"
                  fill="rgba(0,0,0,0.1)"
                />
                
                {/* Main Point */}
                <circle
                  cx={x}
                  cy={y}
                  r="6"
                  fill="white"
                  stroke={color}
                  strokeWidth="3"
                  className="transition-all duration-300 hover:r-8 cursor-pointer"
                />

                {/* Value Label on Hover */}
                <g className="opacity-0 hover:opacity-100 transition-opacity duration-200">
                  <rect
                    x={x - 25}
                    y={y - 35}
                    width="50"
                    height="20"
                    fill="rgba(0,0,0,0.8)"
                    rx="4"
                  />
                  <text
                    x={x}
                    y={y - 22}
                    className="text-xs fill-white font-medium"
                    textAnchor="middle"
                  >
                    {item.value.toLocaleString()}
                  </text>
                </g>
              </g>
            );
          })}

          {/* X-axis Labels */}
          {data.map((item, index) => {
            const x = padding + index * stepX;
            return (
              <text
                key={index}
                x={x}
                y={height - 10}
                className="text-xs fill-gray-600 dark:fill-gray-400"
                textAnchor="middle"
              >
                {item.label}
              </text>
            );
          })}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex justify-center mt-4 space-x-4 text-xs text-gray-600 dark:text-gray-400">
        <div className="flex items-center space-x-2">
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: color }}
          ></div>
          <span>Trend</span>
        </div>
      </div>
    </div>
  );
}