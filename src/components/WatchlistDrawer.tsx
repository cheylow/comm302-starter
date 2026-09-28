import React from 'react';
import { X, Trash2, ArrowUpRight, TrendingUp, TrendingDown, Star } from 'lucide-react';
import { MarketItem } from '../types/market';

interface WatchlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  watchlistSymbols: string[];
  allItems: MarketItem[];
  onSelectItem: (item: MarketItem) => void;
  onRemoveFromWatchlist: (symbol: string) => void;
}

export const WatchlistDrawer: React.FC<WatchlistDrawerProps> = ({
  isOpen,
  onClose,
  watchlistSymbols,
  allItems,
  onSelectItem,
  onRemoveFromWatchlist,
}) => {
  if (!isOpen) return null;

  const watchlistedItems = allItems.filter((item) =>
    watchlistSymbols.includes(item.symbol)
  );

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-in fade-in"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white dark:bg-[#1e222d] h-full shadow-2xl flex flex-col border-l border-[#e0e3eb] dark:border-[#2a2e39] text-[#131722] dark:text-gray-100"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#f0f3fa] dark:border-[#2a2e39] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
            <h2 className="text-lg font-bold">My Watchlist</h2>
            <span className="text-xs bg-blue-100 dark:bg-blue-900/40 text-[#2962ff] font-bold px-2 py-0.5 rounded-full">
              {watchlistedItems.length}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#787b86] hover:text-[#131722] dark:hover:text-white hover:bg-[#f0f3fa] dark:hover:bg-[#2a2e39]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {watchlistedItems.length === 0 ? (
            <div className="text-center py-16 px-4">
              <Star className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
              <h3 className="font-bold text-base mb-1">Your watchlist is empty</h3>
              <p className="text-xs text-[#787b86] max-w-xs mx-auto">
                Click the star icon on any stock, index, crypto, or forex card to track real-time price changes here.
              </p>
            </div>
          ) : (
            watchlistedItems.map((item) => {
              const isPositive = item.change >= 0;
              return (
                <div
                  key={item.id}
                  className="p-3 bg-[#fafbfd] dark:bg-[#171b26] border border-[#e0e3eb] dark:border-[#2a2e39] hover:border-[#2962ff]/50 rounded-xl flex items-center justify-between transition-colors group cursor-pointer"
                  onClick={() => {
                    onSelectItem(item);
                    onClose();
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <span
                      className={`w-9 h-9 rounded-full ${item.badgeColor || 'bg-gray-800'} ${
                        item.badgeTextColor || 'text-white'
                      } text-xs font-bold flex items-center justify-center select-none shadow-sm`}
                    >
                      {item.badgeText || item.symbol.slice(0, 3)}
                    </span>
                    <div>
                      <div className="font-bold text-sm group-hover:text-[#2962ff] transition-colors flex items-center gap-1.5">
                        <span>{item.symbol}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <span className="text-xs text-[#787b86] dark:text-[#868993] line-clamp-1">
                        {item.name}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="text-right num-tabular">
                      <div className="font-bold text-sm">
                        ${item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                      <div
                        className={`text-xs font-semibold ${
                          isPositive ? 'text-[#089981]' : 'text-[#f23645]'
                        }`}
                      >
                        {isPositive ? `+${item.changePercent.toFixed(2)}%` : `${item.changePercent.toFixed(2)}%`}
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveFromWatchlist(item.symbol);
                      }}
                      className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                      title="Remove from watchlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
