import React, { useState } from 'react';
import { MarketItem, TechnicalRating } from '../types/market';
import { Filter, ArrowUpDown } from 'lucide-react';

interface ScreenerViewProps {
  items: MarketItem[];
  onSelectItem: (item: MarketItem) => void;
  onBackToOverview: () => void;
}

export const ScreenerView: React.FC<ScreenerViewProps> = ({
  items,
  onSelectItem,
  onBackToOverview,
}) => {
  const [selectedRating, setSelectedRating] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'changePercent' | 'price' | 'volume'>('changePercent');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const filteredItems = items
    .filter((item) => {
      if (selectedRating !== 'All' && item.technicalRating !== selectedRating) return false;
      if (selectedCategory !== 'All' && item.category !== selectedCategory.toLowerCase()) return false;
      return true;
    })
    .sort((a, b) => {
      const valA = a[sortBy] ?? 0;
      const valB = b[sortBy] ?? 0;
      return sortOrder === 'desc' ? (valB > valA ? 1 : -1) : valA > valB ? 1 : -1;
    });

  return (
    <section className="bg-white dark:bg-[#1e222d] border border-[#e0e3eb] dark:border-[#2a2e39] rounded-2xl p-5 sm:p-6 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#f0f3fa] dark:border-[#2a2e39]">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-[#131722] dark:text-white">
              Global Financial Screener
            </h2>
            <span className="text-xs bg-blue-100 dark:bg-blue-950/60 text-[#2962ff] font-bold px-2 py-0.5 rounded">
              {filteredItems.length} Instruments
            </span>
          </div>
          <p className="text-xs text-[#787b86] dark:text-[#868993] mt-1">
            Filter equities, currencies, commodities and indices by technical ratings and performance
          </p>
        </div>

        <button
          onClick={onBackToOverview}
          className="text-xs font-semibold text-[#2962ff] px-3 py-1.5 hover:underline whitespace-nowrap"
        >
          Back to Overview
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-wrap items-center gap-3 text-xs">
        <div className="flex items-center space-x-2">
          <span className="text-[#787b86] font-semibold">Technical Rating:</span>
          {['All', 'Strong Buy', 'Buy', 'Neutral', 'Sell'].map((r) => (
            <button
              key={r}
              onClick={() => setSelectedRating(r)}
              className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
                selectedRating === r
                  ? 'bg-[#131722] text-white dark:bg-white dark:text-[#131722]'
                  : 'bg-[#f0f3fa] dark:bg-[#2a2e39] text-[#787b86] hover:text-[#131722]'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2 ml-auto">
          <span className="text-[#787b86] font-semibold">Sort By:</span>
          <button
            onClick={() => {
              if (sortBy === 'changePercent') setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
              else {
                setSortBy('changePercent');
                setSortOrder('desc');
              }
            }}
            className={`px-2.5 py-1 rounded-md font-semibold transition-colors flex items-center gap-1 ${
              sortBy === 'changePercent'
                ? 'bg-[#2962ff] text-white'
                : 'bg-[#f0f3fa] dark:bg-[#2a2e39] text-[#787b86]'
            }`}
          >
            <span>% Change</span>
            <ArrowUpDown className="w-3 h-3" />
          </button>
          <button
            onClick={() => {
              if (sortBy === 'price') setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
              else {
                setSortBy('price');
                setSortOrder('desc');
              }
            }}
            className={`px-2.5 py-1 rounded-md font-semibold transition-colors flex items-center gap-1 ${
              sortBy === 'price'
                ? 'bg-[#2962ff] text-white'
                : 'bg-[#f0f3fa] dark:bg-[#2a2e39] text-[#787b86]'
            }`}
          >
            <span>Price</span>
            <ArrowUpDown className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Results Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-[#fafbfd] dark:bg-[#171b26] border-b border-[#f0f3fa] dark:border-[#2a2e39] text-xs font-semibold text-[#787b86]">
            <tr>
              <th className="py-3 pl-6 pr-4">Symbol / Name</th>
              <th className="py-3 px-4">Market Class</th>
              <th className="py-3 px-4 text-right">Last Price</th>
              <th className="py-3 px-4 text-right">Net Change</th>
              <th className="py-3 px-4 text-right">% Chg</th>
              <th className="py-3 px-4 text-right">52W Range</th>
              <th className="py-3 pr-6 pl-4 text-center">Technical Rating</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f0f3fa] dark:divide-[#2a2e39]">
            {filteredItems.map((item) => {
              const isPositive = item.change >= 0;
              return (
                <tr
                  key={item.id}
                  onClick={() => onSelectItem(item)}
                  className="hover:bg-[#f8f9fd] dark:hover:bg-[#262b3d]/60 cursor-pointer group transition-colors"
                >
                  <td className="py-4 pl-6 pr-4 flex items-center space-x-3">
                    <span
                      className={`w-7 h-7 rounded-full ${item.badgeColor || 'bg-gray-800'} ${
                        item.badgeTextColor || 'text-white'
                      } text-[10px] font-bold flex items-center justify-center`}
                    >
                      {item.badgeText || item.symbol.slice(0, 3)}
                    </span>
                    <div>
                      <span className="font-bold text-[#131722] dark:text-white group-hover:text-[#2962ff]">
                        {item.symbol}
                      </span>
                      <span className="text-xs text-[#787b86] block">{item.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-xs font-semibold uppercase text-[#787b86]">
                    {item.category}
                  </td>
                  <td className="py-4 px-4 text-right font-bold text-[#131722] dark:text-white num-tabular">
                    ${item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td
                    className={`py-4 px-4 text-right font-medium num-tabular ${
                      isPositive ? 'text-[#089981]' : 'text-[#f23645]'
                    }`}
                  >
                    {isPositive ? `+${item.change.toFixed(2)}` : item.change.toFixed(2)}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded num-tabular ${
                        isPositive ? 'bg-emerald-50 text-[#089981]' : 'bg-rose-50 text-[#f23645]'
                      }`}
                    >
                      {isPositive ? `+${item.changePercent.toFixed(2)}%` : `${item.changePercent.toFixed(2)}%`}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right text-xs text-[#787b86] num-tabular">
                    {item.range52W || 'N/A'}
                  </td>
                  <td className="py-4 pr-6 pl-4 text-center">
                    <span
                      className={`text-xs font-semibold px-2.5 py-0.5 rounded ${
                        item.technicalRating === 'Strong Buy'
                          ? 'bg-blue-100 text-blue-800'
                          : item.technicalRating === 'Buy'
                          ? 'bg-emerald-100 text-emerald-800'
                          : item.technicalRating === 'Neutral'
                          ? 'bg-gray-100 text-gray-700'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {item.technicalRating}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};
