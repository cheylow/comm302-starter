import React, { useState } from 'react';
import { MarketItem, WorldIndicesFilter } from '../types/market';

interface WorldIndicesTableProps {
  indicesData: MarketItem[];
  onSelectItem: (item: MarketItem) => void;
  priceFlashMap?: Record<string, 'up' | 'down'>;
}

export const WorldIndicesTable: React.FC<WorldIndicesTableProps> = ({
  indicesData,
  onSelectItem,
  priceFlashMap = {},
}) => {
  const [activeRegion, setActiveRegion] = useState<WorldIndicesFilter>('Major');

  const regions: WorldIndicesFilter[] = ['Major', 'Americas', 'Europe', 'Asia'];

  const filteredItems = indicesData.filter((item) => {
    if (activeRegion === 'Major') return item.region === 'Major';
    return item.region === activeRegion;
  });

  const getCountryBadge = (country?: string) => {
    switch (country) {
      case 'JP':
        return <span className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center font-bold text-[10px]">JP</span>;
      case 'UK':
        return <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-[10px]">UK</span>;
      case 'DE':
        return <span className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center font-bold text-[10px]">DE</span>;
      case 'FR':
        return <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 flex items-center justify-center font-bold text-[10px]">FR</span>;
      case 'HK':
        return <span className="w-6 h-6 rounded-full bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-400 flex items-center justify-center font-bold text-[10px]">HK</span>;
      case 'CA':
        return <span className="w-6 h-6 rounded-full bg-red-100 text-red-700 flex items-center justify-center font-bold text-[10px]">CA</span>;
      case 'BR':
        return <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[10px]">BR</span>;
      case 'IN':
        return <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-800 flex items-center justify-center font-bold text-[10px]">IN</span>;
      case 'AU':
        return <span className="w-6 h-6 rounded-full bg-sky-100 text-sky-800 flex items-center justify-center font-bold text-[10px]">AU</span>;
      default:
        return <span className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 flex items-center justify-center font-bold text-[10px]">{country || 'GL'}</span>;
    }
  };

  const getRatingBadge = (rating: string) => {
    switch (rating) {
      case 'Strong Buy':
        return (
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300">
            Strong Buy
          </span>
        );
      case 'Buy':
        return (
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300">
            Buy
          </span>
        );
      case 'Sell':
      case 'Strong Sell':
        return (
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-rose-100 dark:bg-rose-900/40 text-rose-800 dark:text-rose-300">
            {rating}
          </span>
        );
      default:
        return (
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
            Neutral
          </span>
        );
    }
  };

  return (
    <section className="bg-white dark:bg-[#1e222d] border border-[#e0e3eb] dark:border-[#2a2e39] rounded-2xl overflow-hidden shadow-sm transition-colors">
      <div className="px-6 py-5 border-b border-[#f0f3fa] dark:border-[#2a2e39] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#131722] dark:text-white flex items-center">
            <span>World Indices</span>
            <span className="ml-2 text-xs font-semibold text-[#787b86] dark:text-gray-400 bg-[#f0f3fa] dark:bg-[#131722] px-2 py-1 rounded">
              24h Overview
            </span>
          </h2>
          <p className="text-xs text-[#787b86] dark:text-[#868993] mt-0.5">
            Global benchmark performance and technical indicators
          </p>
        </div>

        {/* Region filter tabs */}
        <div className="flex items-center space-x-1.5 sm:space-x-2">
          {regions.map((region) => {
            const isActive = activeRegion === region;
            return (
              <button
                key={region}
                onClick={() => setActiveRegion(region)}
                className={`text-xs px-3 py-1.5 rounded-lg transition-colors font-semibold ${
                  isActive
                    ? 'bg-[#f0f3fa] dark:bg-[#131722] text-[#131722] dark:text-white'
                    : 'text-[#787b86] dark:text-gray-400 hover:text-[#131722] dark:hover:text-white hover:bg-[#f8f9fd] dark:hover:bg-[#2a2e39]'
                }`}
              >
                {region}
              </button>
            );
          })}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-[#fafbfd] dark:bg-[#171b26] border-b border-[#f0f3fa] dark:border-[#2a2e39] text-xs font-semibold text-[#787b86] dark:text-[#868993]">
            <tr>
              <th scope="col" className="py-3 pl-6 pr-4">Symbol</th>
              <th scope="col" className="py-3 px-4 text-right">Last Price</th>
              <th scope="col" className="py-3 px-4 text-right">Change</th>
              <th scope="col" className="py-3 px-4 text-right">% Chg</th>
              <th scope="col" className="py-3 px-4 text-right hidden md:table-cell">High</th>
              <th scope="col" className="py-3 px-4 text-right hidden md:table-cell">Low</th>
              <th scope="col" className="py-3 pr-6 pl-4 text-center">Technical Rating</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f0f3fa] dark:divide-[#2a2e39]">
            {filteredItems.map((item) => {
              const isPositive = item.change >= 0;
              const flash = priceFlashMap[item.id];
              return (
                <tr
                  key={item.id}
                  onClick={() => onSelectItem(item)}
                  className={`hover:bg-[#f8f9fd] dark:hover:bg-[#262b3d]/60 transition-colors cursor-pointer group ${
                    flash === 'up' ? 'flash-up' : flash === 'down' ? 'flash-down' : ''
                  }`}
                >
                  <td className="py-4 pl-6 pr-4 flex items-center space-x-3">
                    {getCountryBadge(item.country)}
                    <div>
                      <span className="font-bold text-[#131722] dark:text-white group-hover:text-[#2962ff] transition-colors">
                        {item.symbol}
                      </span>
                      <span className="text-xs text-[#787b86] dark:text-[#868993] block">
                        {item.name}
                      </span>
                    </div>
                  </td>

                  <td className="py-4 px-4 text-right font-bold text-[#131722] dark:text-white num-tabular">
                    {item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
                      className={`font-semibold text-xs px-2.5 py-1 rounded-md num-tabular inline-block ${
                        isPositive
                          ? 'bg-emerald-50 dark:bg-emerald-950/50 text-[#089981]'
                          : 'bg-rose-50 dark:bg-rose-950/50 text-[#f23645]'
                      }`}
                    >
                      {isPositive ? `+${item.changePercent.toFixed(2)}%` : `${item.changePercent.toFixed(2)}%`}
                    </span>
                  </td>

                  <td className="py-4 px-4 text-right text-[#787b86] dark:text-gray-400 num-tabular hidden md:table-cell">
                    {item.high.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>

                  <td className="py-4 px-4 text-right text-[#787b86] dark:text-gray-400 num-tabular hidden md:table-cell">
                    {item.low.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>

                  <td className="py-4 pr-6 pl-4 text-center">
                    {getRatingBadge(item.technicalRating)}
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
