import React from 'react';
import { ChevronRight } from 'lucide-react';
import { IndexOverviewCard } from '../types/market';

interface IndicesOverviewProps {
  indices: IndexOverviewCard[];
  onSelectIndex: (index: IndexOverviewCard) => void;
  priceFlashMap?: Record<string, 'up' | 'down'>;
}

export const IndicesOverview: React.FC<IndicesOverviewProps> = ({
  indices,
  onSelectIndex,
  priceFlashMap = {},
}) => {
  return (
    <section id="indices" className="scroll-mt-24">
      {/* Section Title with arrow & Market Open badge */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => indices.length > 0 && onSelectIndex(indices[0])}
          className="group inline-flex items-center text-2xl font-bold text-[#131722] dark:text-[#f0f3fa] hover:text-[#2962ff] transition-colors focus:outline-none"
        >
          <span>Indices</span>
          <ChevronRight className="w-5 h-5 ml-1 stroke-[3] group-hover:translate-x-1 transition-transform" />
        </button>

        <div className="text-xs font-semibold text-[#787b86] dark:text-[#868993] uppercase tracking-wider flex items-center gap-1.5 cursor-pointer hover:text-[#131722] dark:hover:text-white transition-colors">
          <span>Market Open</span>
          <span className="w-2 h-2 rounded-full bg-[#089981] inline-block animate-pulse"></span>
        </div>
      </div>

      {/* Indices Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {indices.map((idx) => {
          const flash = priceFlashMap[idx.id];
          return (
            <div
              key={idx.id}
              onClick={() => onSelectIndex(idx)}
              className={`bg-[#f0f3fa]/50 dark:bg-[#1e222d]/60 hover:bg-[#f0f3fa] dark:hover:bg-[#1e222d] border border-[#e0e3eb]/60 dark:border-[#2a2e39] rounded-2xl p-5 transition-all hover:shadow-md cursor-pointer flex flex-col justify-between group ${
                flash === 'up' ? 'flash-up' : flash === 'down' ? 'flash-down' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span
                      style={{ backgroundColor: idx.badgeBg }}
                      className="w-8 h-8 rounded-full text-white font-bold text-xs flex items-center justify-center shadow-sm select-none"
                    >
                      {idx.badgeText}
                    </span>
                    <div>
                      <h3 className="font-bold text-base text-[#131722] dark:text-white leading-snug group-hover:text-[#2962ff] transition-colors">
                        {idx.name}
                      </h3>
                      <span className="text-xs font-medium text-[#787b86] dark:text-[#868993]">
                        {idx.symbol} • {idx.exchange}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full border ${
                      idx.isPositive
                        ? 'text-[#089981] bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800'
                        : 'text-[#f23645] bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800'
                    }`}
                  >
                    {idx.isPositive ? `+${idx.changePercent}%` : `${idx.changePercent}%`}
                  </span>
                </div>

                <div className="flex items-baseline space-x-3 mt-1">
                  <span className="text-2xl font-bold text-[#131722] dark:text-white num-tabular tracking-tight">
                    {idx.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <span
                    className={`text-sm font-semibold num-tabular ${
                      idx.isPositive ? 'text-[#089981]' : 'text-[#f23645]'
                    }`}
                  >
                    {idx.change > 0 ? `+${idx.change.toFixed(2)}` : idx.change.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Sparkline SVG */}
              <div className="mt-4 pt-2">
                <svg className="w-full h-12 sparkline-svg" preserveAspectRatio="none" viewBox="0 0 200 40">
                  <path
                    d={idx.sparklineSvgPath}
                    fill="none"
                    stroke={idx.isPositive ? '#089981' : '#f23645'}
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d={idx.sparklineFillPath}
                    fill={idx.isPositive ? 'rgba(8, 153, 129, 0.08)' : 'rgba(242, 54, 69, 0.08)'}
                  />
                </svg>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
