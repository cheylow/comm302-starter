import React, { useState } from 'react';
import { S_P_HEATMAP_DATA, HeatmapItem } from '../data/mockMarketData';
import { MarketItem } from '../types/market';

interface MarketHeatmapProps {
  onSelectSymbol: (symbol: string) => void;
  onBackToOverview: () => void;
}

export const MarketHeatmap: React.FC<MarketHeatmapProps> = ({
  onSelectSymbol,
  onBackToOverview,
}) => {
  const [selectedSector, setSelectedSector] = useState<string>('All');
  const [hoveredItem, setHoveredItem] = useState<HeatmapItem | null>(null);

  const sectors = ['All', 'Technology', 'Communication', 'Consumer Discretionary', 'Financials', 'Healthcare', 'Energy'];

  const filteredItems = S_P_HEATMAP_DATA.filter(
    (item) => selectedSector === 'All' || item.sector === selectedSector
  );

  const getColorClass = (pct: number) => {
    if (pct >= 3.0) return 'bg-[#087f6b] hover:bg-[#076b5a] text-white';
    if (pct >= 1.5) return 'bg-[#089981] hover:bg-[#078873] text-white';
    if (pct >= 0) return 'bg-[#1cb097] hover:bg-[#189b85] text-white';
    if (pct >= -1.0) return 'bg-[#f45865] hover:bg-[#e04553] text-white';
    if (pct >= -2.0) return 'bg-[#f23645] hover:bg-[#d92231] text-white';
    return 'bg-[#c91826] hover:bg-[#ab101d] text-white';
  };

  return (
    <section className="bg-white dark:bg-[#1e222d] border border-[#e0e3eb] dark:border-[#2a2e39] rounded-2xl p-5 sm:p-6 shadow-sm">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#f0f3fa] dark:border-[#2a2e39]">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-[#131722] dark:text-white">
              S&amp;P 500 Market Heatmap
            </h2>
            <span className="text-xs bg-emerald-100 dark:bg-emerald-950/60 text-[#089981] font-bold px-2 py-0.5 rounded">
              Live
            </span>
          </div>
          <p className="text-xs text-[#787b86] dark:text-[#868993] mt-1">
            Visualized by Market Capitalization weight and today's percentage change
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 overflow-x-auto no-scrollbar py-1">
            {sectors.map((sec) => (
              <button
                key={sec}
                onClick={() => setSelectedSector(sec)}
                className={`text-xs px-3 py-1.5 rounded-lg whitespace-nowrap font-semibold transition-colors ${
                  selectedSector === sec
                    ? 'bg-[#131722] text-white dark:bg-white dark:text-[#131722]'
                    : 'text-[#787b86] hover:bg-[#f0f3fa] dark:hover:bg-[#2a2e39]'
                }`}
              >
                {sec}
              </button>
            ))}
          </div>

          <button
            onClick={onBackToOverview}
            className="text-xs font-semibold text-[#2962ff] px-3 py-1.5 hover:underline whitespace-nowrap"
          >
            Back to Overview
          </button>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 min-h-[420px]">
        {filteredItems.map((stock) => {
          const isPositive = stock.changePercent >= 0;
          return (
            <div
              key={stock.symbol}
              onClick={() => onSelectSymbol(stock.symbol)}
              onMouseEnter={() => setHoveredItem(stock)}
              onMouseLeave={() => setHoveredItem(null)}
              className={`${getColorClass(
                stock.changePercent
              )} p-3.5 rounded-xl cursor-pointer transition-all duration-200 shadow-sm flex flex-col justify-between select-none relative overflow-hidden group hover:scale-[1.02]`}
              style={{
                minHeight: stock.weight > 4 ? '130px' : '95px',
              }}
            >
              <div className="flex justify-between items-start">
                <span className="font-extrabold text-base tracking-tight">{stock.symbol}</span>
                <span className="text-[11px] opacity-80 font-medium">{stock.weight}%</span>
              </div>

              <div>
                <div className="text-xs opacity-90 truncate max-w-[120px]">{stock.name}</div>
                <div className="flex items-baseline justify-between mt-1">
                  <span className="text-sm font-extrabold num-tabular">
                    ${stock.price.toFixed(2)}
                  </span>
                  <span className="text-xs font-bold num-tabular">
                    {isPositive ? `+${stock.changePercent.toFixed(2)}%` : `${stock.changePercent.toFixed(2)}%`}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Heatmap legend */}
      <div className="mt-6 pt-4 border-t border-[#f0f3fa] dark:border-[#2a2e39] flex flex-wrap items-center justify-between text-xs text-[#787b86] gap-3">
        <div className="flex items-center space-x-2">
          <span>Performance:</span>
          <div className="flex items-center space-x-1 font-semibold text-[10px] text-white">
            <span className="px-2 py-0.5 rounded bg-[#c91826]">-3%</span>
            <span className="px-2 py-0.5 rounded bg-[#f23645]">-1.5%</span>
            <span className="px-2 py-0.5 rounded bg-gray-400">0%</span>
            <span className="px-2 py-0.5 rounded bg-[#089981]">+1.5%</span>
            <span className="px-2 py-0.5 rounded bg-[#087f6b]">+3%</span>
          </div>
        </div>

        <div>
          {hoveredItem ? (
            <span className="font-medium text-[#131722] dark:text-gray-200">
              Selected: <strong className="font-bold">{hoveredItem.symbol}</strong> ({hoveredItem.name}) · Sector: {hoveredItem.sector} · Price: ${hoveredItem.price.toFixed(2)}
            </span>
          ) : (
            <span>Click any tile to open technical analysis and superchart</span>
          )}
        </div>
      </div>
    </section>
  );
};
