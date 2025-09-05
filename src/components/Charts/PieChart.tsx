"use client";

interface PieChartData {
  label: string;
  value: number;
  color: string;
}

interface PieChartProps {
  data: PieChartData[];
  size?: number;
}

export function PieChart({ data, size = 250 }: PieChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
        <div className="text-center">
          <div className="text-4xl mb-2">🍕</div>
          <p>No data available</p>
        </div>
      </div>
    );
  }

  const total = data.reduce((sum, item) => sum + item.value, 0);
  const centerX = size / 2;
  const centerY = size / 2;
  const radius = size / 2 - 20;

  let cumulativeAngle = -90; // Start from top

  const segments = data.map((item) => {
    const percentage = (item.value / total) * 100;
    const angle = (item.value / total) * 360;
    
    const startAngle = cumulativeAngle;
    const endAngle = cumulativeAngle + angle;
    
    const x1 = centerX + radius * Math.cos((startAngle * Math.PI) / 180);
    const y1 = centerY + radius * Math.sin((startAngle * Math.PI) / 180);
    const x2 = centerX + radius * Math.cos((endAngle * Math.PI) / 180);
    const y2 = centerY + radius * Math.sin((endAngle * Math.PI) / 180);

    const largeArcFlag = angle > 180 ? 1 : 0;

    const pathData = [
      `M ${centerX} ${centerY}`,
      `L ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      'Z'
    ].join(' ');

    // Calculate label position
    const labelAngle = startAngle + angle / 2;
    const labelRadius = radius * 0.7;
    const labelX = centerX + labelRadius * Math.cos((labelAngle * Math.PI) / 180);
    const labelY = centerY + labelRadius * Math.sin((labelAngle * Math.PI) / 180);

    cumulativeAngle += angle;

    return {
      ...item,
      pathData,
      percentage: percentage.toFixed(1),
      labelX,
      labelY,
      startAngle,
      endAngle,
    };
  });

  return (
    <div className="h-full w-full flex flex-col lg:flex-row items-center justify-center space-y-4 lg:space-y-0 lg:space-x-8">
      {/* Pie Chart */}
      <div className="relative">
        <svg width={size} height={size} className="drop-shadow-lg">
          {/* Background Circle */}
          <circle
            cx={centerX}
            cy={centerY}
            r={radius}
            fill="rgba(0,0,0,0.05)"
            className="dark:fill-gray-700"
          />

          {/* Segments */}
          {segments.map((segment, index) => (
            <g key={index}>
              {/* Segment Shadow */}
              <path
                d={segment.pathData}
                fill="rgba(0,0,0,0.1)"
                transform="translate(2,2)"
              />
              
              {/* Main Segment */}
              <path
                d={segment.pathData}
                fill={segment.color}
                className="transition-all duration-300 hover:opacity-80 cursor-pointer"
                style={{
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                }}
              />

              {/* Percentage Label */}
              {parseFloat(segment.percentage) > 5 && (
                <text
                  x={segment.labelX}
                  y={segment.labelY}
                  className="text-xs font-medium fill-white"
                  textAnchor="middle"
                  dominantBaseline="central"
                  style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
                >
                  {segment.percentage}%
                </text>
              )}
            </g>
          ))}

          {/* Center Circle */}
          <circle
            cx={centerX}
            cy={centerY}
            r={radius * 0.4}
            fill="white"
            className="dark:fill-gray-800 drop-shadow-md"
          />
          
          {/* Total Value */}
          <text
            x={centerX}
            y={centerY - 5}
            className="text-lg font-bold fill-gray-900 dark:fill-white"
            textAnchor="middle"
            dominantBaseline="central"
          >
            {total.toLocaleString()}
          </text>
          
          <text
            x={centerX}
            y={centerY + 15}
            className="text-xs fill-gray-500 dark:fill-gray-400"
            textAnchor="middle"
            dominantBaseline="central"
          >
            Total
          </text>
        </svg>
      </div>

      {/* Legend */}
      <div className="space-y-2 max-w-xs">
        <h4 className="font-medium text-gray-900 dark:text-white mb-3">
          Distribution
        </h4>
        {segments.map((segment, index) => (
          <div key={index} className="flex items-center justify-between space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer">
            <div className="flex items-center space-x-3">
              <div 
                className="w-4 h-4 rounded-full flex-shrink-0"
                style={{ backgroundColor: segment.color }}
              ></div>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {segment.label}
              </span>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                {segment.value.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {segment.percentage}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}