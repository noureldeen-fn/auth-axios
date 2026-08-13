import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

/**
 * Reusable StatCard for Admin Dashboard Metrics
 */
export const StatCard = ({
  title,
  value,
  subtitle,
  change,
  isPositive = true,
  icon: Icon,
  iconBgColor = 'bg-brand-50 text-brand-600',
  prefix = '',
  suffix = '',
}) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-soft hover:shadow-card transition-all duration-300 flex flex-col justify-between">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">{title}</p>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
            {prefix}{value}{suffix}
          </h3>
        </div>

        {Icon && (
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${iconBgColor}`}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
        {change && (
          <div
            className={`inline-flex items-center space-x-1 font-semibold ${
              isPositive ? 'text-emerald-600' : 'text-red-600'
            }`}
          >
            {isPositive ? (
              <TrendingUp className="w-3.5 h-3.5" />
            ) : (
              <TrendingDown className="w-3.5 h-3.5" />
            )}
            <span>{change}</span>
          </div>
        )}
        {subtitle && <span className="text-stone-400">{subtitle}</span>}
      </div>
    </div>
  );
};

export default StatCard;
