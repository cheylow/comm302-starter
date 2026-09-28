import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { MarketItem, USStocksFilter } from '../types/market';

interface USStocksMoversProps {
  stocksData: Record<USStocksFilter, MarketItem[]>;
  onSelectItem: (item: MarketItem) => void;
  priceFlashMap?: Record<string, 'up' | 'down'>;
}

export const USStocksMovers: React.FC<USStocksMoversProps> = ({
  stocksData,
  onSelectItem,
  priceFlashMap = {},
}) => {
  const [filter, setFilter] = useState<USStocksFilter>('Most active');

  const filters: USStocksFilter[] = ['Most active', 'Gainers', 'Losers'];
  const currentStocks = stocksData[filter] || [];

  return (
    <section id="stocks">
      {/* Header with Title and Filter Pills */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => currentStocks.length > 0 && onSelectItem(currentStocks[0])}
          className="group inline-flex items-center text-2xl font-bold text-[#131722] dark:text-[#f0f3fa] hover:text-[#2962ff] transition-colors focus:outline-none"
        >
          <span>US stocks</span>
          <ChevronRight className="w-5 h-5 ml-1 stroke-[3] group-hover:translate-x-1 transition-transform" />
        </button>

        <div className="flex items-center space-x-1 sm:space-x-2 text-xs font-semibold">
          {filters.map((f) => {
            const isActive = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-full transition-colors ${
                  isActive
                    ? 'bg-[#131722] dark:bg-white text-white dark:text-[#131722]'
                    : 'text-[#787b86] dark:text-gray-400 hover:text-[#131722] dark:hover:text-white'
                }`}
              >
                {f}
              </button>
            );
          })}
        </div>
      </div>

      {/* Stocks Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentStocks.map((stock) => {
          const isPositive = stock.change >= 0;
          const flash = priceFlashMap[stock.id];
          return (
            <div
              key={stock.id}
              onClick={() => onSelectItem(stock)}
              className={`p-4 bg-white dark:bg-[#1e222d] border border-[#e0e3eb] dark:border-[#2a2e39] hover:border-[#2962ff]/40 dark:hover:border-[#2962ff]/60 rounded-xl transition-all shadow-sm hover:shadow flex items-center justify-between cursor-pointer group ${
                flash === 'up' ? 'flash-up' : flash === 'down' ? 'flash-down' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-10 h-10 rounded-full ${stock.badgeColor || 'bg-gray-800'} ${
                    stock.badgeTextColor || 'text-white'
                  } font-bold flex items-center justify-center text-xs shadow-inner select-none shrink-0`}
                >
                  {stock.badgeText || stock.symbol.slice(0, 4)}
                </div>

                <div className="min-w-0">
                  <div className="font-bold text-sm text-[#131722] dark:text-white flex items-center gap-1.5 group-hover:text-[#2962ff] transition-colors">
                    <span>{stock.symbol}</span>
                    <span className="text-[11px] font-normal text-[#787b86] dark:text-[#868993]">
                      {stock.exchange}
                    </span>
                  </div>
                  <div className="text-xs text-[#787b86] dark:text-[#868993] truncate max-w-[130px] sm:max-w-[150px]">
                    {stock.name}
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0">
                <div className="font-bold text-sm text-[#131722] dark:text-white num-tabular">
                  ${stock.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div
                  className={`text-xs font-semibold num-tabular ${
                    isPositive ? 'text-[#089981]' : 'text-[#f23645]'
                  }`}
                >
                  {isPositive ? `+${stock.changePercent.toFixed(2)}%` : `${stock.changePercent.toFixed(2)}%`}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
