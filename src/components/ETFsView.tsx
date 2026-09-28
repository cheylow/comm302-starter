import React from 'react';
import { ETFS_DATA } from '../data/mockMarketData';
import { MarketItem } from '../types/market';
import { ArrowUpRight } from 'lucide-react';

interface ETFsViewProps {
  onSelectItem: (item: MarketItem) => void;
  onBackToOverview: () => void;
}

export const ETFsView: React.FC<ETFsViewProps> = ({ onSelectItem, onBackToOverview }) => {
  return (
    <section className="bg-white dark:bg-[#1e222d] border border-[#e0e3eb] dark:border-[#2a2e39] rounded-2xl p-5 sm:p-6 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#f0f3fa] dark:border-[#2a2e39]">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-[#131722] dark:text-white">
              Exchange Traded Funds (ETFs)
            </h2>
            <span className="text-xs bg-emerald-100 dark:bg-emerald-950/60 text-[#089981] font-bold px-2 py-0.5 rounded">
              Index Trackers
            </span>
          </div>
          <p className="text-xs text-[#787b86] dark:text-[#868993] mt-1">
            Top broad market, technology, semiconductor, and dividend ETFs
          </p>
        </div>

        <button
          onClick={onBackToOverview}
          className="text-xs font-semibold text-[#2962ff] px-3 py-1.5 hover:underline whitespace-nowrap"
        >
          Back to Overview
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {ETFS_DATA.map((etf) => {
          const isPositive = etf.change >= 0;
          return (
            <div
              key={etf.id}
              onClick={() => onSelectItem(etf)}
              className="p-4 bg-[#fafbfd] dark:bg-[#171b26] border border-[#e0e3eb] dark:border-[#2a2e39] hover:border-[#2962ff]/50 rounded-xl cursor-pointer group transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-extrabold text-base text-[#131722] dark:text-white group-hover:text-[#2962ff] transition-colors flex items-center gap-1">
                  <span>{etf.symbol}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </span>
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded ${
                    isPositive ? 'bg-emerald-50 text-[#089981]' : 'bg-rose-50 text-[#f23645]'
                  }`}
                >
                  {isPositive ? `+${etf.changePercent.toFixed(2)}%` : `${etf.changePercent.toFixed(2)}%`}
                </span>
              </div>
              <div className="text-xs text-[#787b86] truncate mb-3">{etf.name}</div>
              <div className="flex items-baseline justify-between">
                <span className="text-lg font-bold text-[#131722] dark:text-white num-tabular">
                  ${etf.price.toFixed(2)}
                </span>
                <span className="text-xs text-[#787b86] num-tabular">
                  AUM: {etf.marketCap}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
