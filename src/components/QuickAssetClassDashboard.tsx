import React from 'react';
import { MarketItem } from '../types/market';

interface QuickAssetClassDashboardProps {
  cryptoData: MarketItem[];
  futuresData: MarketItem[];
  forexData: MarketItem[];
  onSelectItem: (item: MarketItem) => void;
  onViewAllCategory: (category: 'crypto' | 'futures' | 'forex') => void;
  priceFlashMap?: Record<string, 'up' | 'down'>;
}

export const QuickAssetClassDashboard: React.FC<QuickAssetClassDashboardProps> = ({
  cryptoData,
  futuresData,
  forexData,
  onSelectItem,
  onViewAllCategory,
  priceFlashMap = {},
}) => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Crypto Column */}
      <div className="border border-[#e0e3eb] dark:border-[#2a2e39] rounded-2xl p-5 bg-white dark:bg-[#1e222d] shadow-sm transition-colors">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#f0f3fa] dark:border-[#2a2e39]">
          <h3 className="font-bold text-lg text-[#131722] dark:text-white flex items-center">
            <span>Crypto</span>
          </h3>
          <button
            onClick={() => onViewAllCategory('crypto')}
            className="text-xs font-semibold text-[#2962ff] hover:underline focus:outline-none"
          >
            View all
          </button>
        </div>

        <div className="space-y-3.5">
          {cryptoData.slice(0, 3).map((item) => {
            const isPositive = item.change >= 0;
            const flash = priceFlashMap[item.id];
            return (
              <div
                key={item.id}
                onClick={() => onSelectItem(item)}
                className={`flex items-center justify-between text-sm cursor-pointer p-1.5 -mx-1.5 rounded-lg hover:bg-[#f8f9fd] dark:hover:bg-[#262b3d] transition-colors ${
                  flash === 'up' ? 'flash-up' : flash === 'down' ? 'flash-down' : ''
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <span
                    className={`w-6 h-6 rounded-full ${item.badgeColor || 'bg-amber-500'} ${
                      item.badgeTextColor || 'text-white'
                    } text-[10px] font-bold flex items-center justify-center select-none shadow-sm`}
                  >
                    {item.badgeText || item.symbol.slice(0, 2)}
                  </span>
                  <div>
                    <span className="font-bold text-[#131722] dark:text-white block leading-tight">
                      {item.symbol}
                    </span>
                    <span className="text-[11px] text-[#787b86] dark:text-[#868993]">
                      {item.name}
                    </span>
                  </div>
                </div>

                <div className="text-right num-tabular">
                  <span className="font-bold block text-[#131722] dark:text-white">
                    ${item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <span
                    className={`text-xs font-semibold ${
                      isPositive ? 'text-[#089981]' : 'text-[#f23645]'
                    }`}
                  >
                    {isPositive ? `+${item.changePercent.toFixed(2)}%` : `${item.changePercent.toFixed(2)}%`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Futures Column */}
      <div className="border border-[#e0e3eb] dark:border-[#2a2e39] rounded-2xl p-5 bg-white dark:bg-[#1e222d] shadow-sm transition-colors">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#f0f3fa] dark:border-[#2a2e39]">
          <h3 className="font-bold text-lg text-[#131722] dark:text-white flex items-center">
            <span>Futures &amp; Commodities</span>
          </h3>
          <button
            onClick={() => onViewAllCategory('futures')}
            className="text-xs font-semibold text-[#2962ff] hover:underline focus:outline-none"
          >
            View all
          </button>
        </div>

        <div className="space-y-3.5">
          {futuresData.slice(0, 3).map((item) => {
            const isPositive = item.change >= 0;
            const flash = priceFlashMap[item.id];
            return (
              <div
                key={item.id}
                onClick={() => onSelectItem(item)}
                className={`flex items-center justify-between text-sm cursor-pointer p-1.5 -mx-1.5 rounded-lg hover:bg-[#f8f9fd] dark:hover:bg-[#262b3d] transition-colors ${
                  flash === 'up' ? 'flash-up' : flash === 'down' ? 'flash-down' : ''
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <span
                    className={`w-6 h-6 rounded-full ${item.badgeColor || 'bg-yellow-500'} ${
                      item.badgeTextColor || 'text-white'
                    } text-[10px] font-bold flex items-center justify-center select-none shadow-sm`}
                  >
                    {item.badgeText || item.symbol.slice(0, 2)}
                  </span>
                  <div>
                    <span className="font-bold text-[#131722] dark:text-white block leading-tight">
                      {item.symbol}
                    </span>
                    <span className="text-[11px] text-[#787b86] dark:text-[#868993]">
                      {item.name}
                    </span>
                  </div>
                </div>

                <div className="text-right num-tabular">
                  <span className="font-bold block text-[#131722] dark:text-white">
                    {item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <span
                    className={`text-xs font-semibold ${
                      isPositive ? 'text-[#089981]' : 'text-[#f23645]'
                    }`}
                  >
                    {isPositive ? `+${item.changePercent.toFixed(2)}%` : `${item.changePercent.toFixed(2)}%`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Forex Column */}
      <div className="border border-[#e0e3eb] dark:border-[#2a2e39] rounded-2xl p-5 bg-white dark:bg-[#1e222d] shadow-sm transition-colors">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#f0f3fa] dark:border-[#2a2e39]">
          <h3 className="font-bold text-lg text-[#131722] dark:text-white flex items-center">
            <span>Currencies (Forex)</span>
          </h3>
          <button
            onClick={() => onViewAllCategory('forex')}
            className="text-xs font-semibold text-[#2962ff] hover:underline focus:outline-none"
          >
            View all
          </button>
        </div>

        <div className="space-y-3.5">
          {forexData.slice(0, 3).map((item) => {
            const isPositive = item.change >= 0;
            const flash = priceFlashMap[item.id];
            return (
              <div
                key={item.id}
                onClick={() => onSelectItem(item)}
                className={`flex items-center justify-between text-sm cursor-pointer p-1.5 -mx-1.5 rounded-lg hover:bg-[#f8f9fd] dark:hover:bg-[#262b3d] transition-colors ${
                  flash === 'up' ? 'flash-up' : flash === 'down' ? 'flash-down' : ''
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <span
                    className={`w-6 h-6 rounded-full ${item.badgeColor || 'bg-blue-600'} ${
                      item.badgeTextColor || 'text-white'
                    } text-[10px] font-bold flex items-center justify-center select-none shadow-sm`}
                  >
                    {item.badgeText || item.symbol.slice(0, 2)}
                  </span>
                  <div>
                    <span className="font-bold text-[#131722] dark:text-white block leading-tight">
                      {item.symbol}
                    </span>
                    <span className="text-[11px] text-[#787b86] dark:text-[#868993]">
                      {item.name}
                    </span>
                  </div>
                </div>

                <div className="text-right num-tabular">
                  <span className="font-bold block text-[#131722] dark:text-white">
                    {item.price > 10 ? item.price.toFixed(3) : item.price.toFixed(5)}
                  </span>
                  <span
                    className={`text-xs font-semibold ${
                      isPositive ? 'text-[#089981]' : 'text-[#f23645]'
                    }`}
                  >
                    {isPositive ? `+${item.changePercent.toFixed(2)}%` : `${item.changePercent.toFixed(2)}%`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
