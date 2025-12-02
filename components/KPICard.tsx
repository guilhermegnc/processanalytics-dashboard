import React from 'react';
import { ArrowDown, ArrowUp, Minus, Activity, Clock, CheckCircle2, TrendingUp } from 'lucide-react';
import { MetricComparison } from '../types';

interface KPICardProps {
  title: string;
  metric: MetricComparison;
  inverse?: boolean;
  iconType?: 'clock' | 'activity' | 'check' | 'trend';
}

const IconMap = {
  clock: Clock,
  activity: Activity,
  check: CheckCircle2,
  trend: TrendingUp,
};

export const KPICard: React.FC<KPICardProps> = ({ title, metric, inverse = true, iconType = 'activity' }) => {
  const { current, changePercent, trend } = metric;
  const CardIcon = IconMap[iconType];

  let trendColor = 'text-gray-500';
  let TrendIcon = Minus;
  let trendBg = 'bg-gray-500/10';

  if (trend === 'up') {
    TrendIcon = ArrowUp;
    trendColor = inverse ? 'text-rose-400' : 'text-emerald-400';
    trendBg = inverse ? 'bg-rose-500/10' : 'bg-emerald-500/10';
  } else if (trend === 'down') {
    TrendIcon = ArrowDown;
    trendColor = inverse ? 'text-emerald-400' : 'text-rose-400';
    trendBg = inverse ? 'bg-emerald-500/10' : 'bg-rose-500/10';
  }

  return (
    <div className="glass-panel group relative flex flex-col justify-between gap-4 rounded-2xl p-6 transition-all duration-300 hover:border-white/10 hover:shadow-2xl hover:shadow-indigo-500/10">
      {/* Decorative gradient glow on hover */}
      <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-indigo-500/0 via-indigo-500/0 to-purple-500/0 opacity-0 transition-opacity duration-500 group-hover:from-indigo-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 group-hover:opacity-100 blur-xl"></div>
      
      <div className="relative z-10 flex items-start justify-between">
        <p className="text-sm font-medium text-gray-400">{title}</p>
        <div className="rounded-lg bg-white/5 p-2 text-indigo-400 shadow-inner ring-1 ring-white/10">
            <CardIcon className="h-4 w-4" />
        </div>
      </div>
      
      <div className="relative z-10">
        <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold tracking-tight text-white drop-shadow-sm">
              {current}
            </span>
            <span className="text-sm font-medium text-gray-500">dias</span>
        </div>

        <div className={`mt-3 flex items-center gap-2 text-xs font-medium ${trendColor}`}>
            <div className={`flex items-center justify-center rounded-full px-1.5 py-0.5 ${trendBg} border border-white/5`}>
                <TrendIcon className="mr-1 h-3 w-3" />
                <span>{changePercent}%</span>
            </div>
            <span className="text-gray-500">vs. mês anterior</span>
        </div>
      </div>
    </div>
  );
};