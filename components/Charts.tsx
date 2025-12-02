import React from 'react';
import {
  AreaChart,
  Area,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';
import { TrendPoint, DistributionPoint } from '../types';

interface TrendChartProps {
  data: TrendPoint[];
  color?: string;
  gradientColors?: [string, string];
}

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const dataPoint = payload[0];
    return (
      <div className="rounded-lg border border-white/10 bg-[#09090b]/80 px-3 py-2 shadow-xl backdrop-blur-md ring-1 ring-black/50">
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-gray-500">
          {label}
        </p>
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
          <p className="text-sm font-bold text-white">
            {dataPoint.value} <span className="font-normal text-gray-400">dias</span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export const TrendChart: React.FC<TrendChartProps> = ({ data, color = '#6366f1', gradientColors = ['#6366f1', '#a855f7'] }) => {
  return (
    <div className="h-32 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={gradientColors[0]} stopOpacity={0.4} />
              <stop offset="100%" stopColor={gradientColors[1]} stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <Tooltip 
            content={<CustomTooltip />}
            cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke={gradientColors[0]}
            strokeWidth={2}
            fill={`url(#gradient-${color})`}
            fillOpacity={1}
            isAnimationActive={true}
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

interface DistributionBarProps {
  data: DistributionPoint[];
  maxVal: number;
}

export const DistributionBar: React.FC<DistributionBarProps> = ({ data, maxVal }) => {
  return (
    <div className="space-y-5">
      {data.map((item, idx) => (
        <div key={idx} className="group grid grid-cols-[100px_1fr_60px] items-center gap-4">
          <p className="truncate text-xs font-medium text-gray-500 transition-colors group-hover:text-gray-300" title={item.name}>
            {item.name}
          </p>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5 ring-1 ring-white/5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 shadow-[0_0_10px_rgba(6,182,212,0.5)] transition-all duration-700 ease-out group-hover:from-cyan-400 group-hover:to-blue-500"
              style={{ width: `${(item.value / maxVal) * 100}%` }}
            />
          </div>
          <p className="text-right text-xs font-bold text-gray-300 group-hover:text-white">
            {item.value} d
          </p>
        </div>
      ))}
    </div>
  );
};