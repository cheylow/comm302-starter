import React, { useState, useEffect, useRef } from 'react';
import { Search, X, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { MarketItem } from '../types/market';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  allItems: MarketItem[];
  onSelectItem: (item: MarketItem) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  allItems,
  onSelectItem,
}) => {
  const [query, setQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const categories = ['All', 'Stocks', 'Indices', 'Crypto', 'Forex', 'Futures'];

  const filteredItems = allItems.filter((item) => {
    const matchesQuery =
      item.symbol.toLowerCase().includes(query.toLowerCase()) ||
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      (item.exchange && item.exchange.toLowerCase().includes(query.toLowerCase()));

    if (!matchesQuery) return false;

    if (categoryFilter === 'All') return true;
    if (categoryFilter === 'Stocks' && item.category === 'stocks') return true;
    if (categoryFilter === 'Indices' && item.category === 'indices') return true;
    if (categoryFilter === 'Crypto' && item.category === 'crypto') return true;
    if (categoryFilter === 'Forex' && item.category === 'forex') return true;
    if (categoryFilter === 'Futures' && item.category === 'futures') return true;

    return false;
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-black/60 backdrop-blur-sm animate-in fade-in"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-[#1e222d] border border-[#e0e3eb] dark:border-[#2a2e39] rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[80vh]"
      >
        {/* Search input header */}
        <div className="p-4 border-b border-[#f0f3fa] dark:border-[#2a2e39] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#787b86]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search symbol, company, crypto, or forex (e.g. NVDA, SPX, BTC)..."
            className="flex-1 bg-transparent border-none text-[#131722] dark:text-white placeholder-[#787b86] text-base focus:ring-0 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-[#787b86] hover:text-[#131722] dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block text-[11px] font-mono bg-[#f0f3fa] dark:bg-[#131722] px-2 py-1 rounded border border-[#e0e3eb] dark:border-[#363a45] text-[#787b86]">
            ESC
          </kbd>
        </div>

        {/* Categories Bar */}
        <div className="px-4 py-2 border-b border-[#f0f3fa] dark:border-[#2a2e39] bg-[#fafbfd] dark:bg-[#171b26] flex items-center space-x-1.5 overflow-x-auto no-scrollbar text-xs font-semibold">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors ${
                categoryFilter === cat
                  ? 'bg-[#2962ff] text-white'
                  : 'text-[#787b86] dark:text-gray-400 hover:bg-[#f0f3fa] dark:hover:bg-[#2a2e39]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="overflow-y-auto divide-y divide-[#f0f3fa] dark:divide-[#2a2e39] p-2">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center text-sm text-[#787b86]">
              No instruments found for "{query}". Try searching for Apple, Bitcoin, or S&amp;P.
            </div>
          ) : (
            filteredItems.slice(0, 10).map((item) => {
              const isPositive = item.change >= 0;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectItem(item);
                    onClose();
                  }}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-[#f8f9fd] dark:hover:bg-[#262b3d] cursor-pointer group transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <span
                      className={`w-8 h-8 rounded-full ${item.badgeColor || 'bg-blue-600'} ${
                        item.badgeTextColor || 'text-white'
                      } text-xs font-bold flex items-center justify-center select-none shadow-sm`}
                    >
                      {item.badgeText || item.symbol.slice(0, 2)}
                    </span>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-sm text-[#131722] dark:text-white group-hover:text-[#2962ff] transition-colors">
                          {item.symbol}
                        </span>
                        <span className="text-[11px] text-[#787b86] bg-[#f0f3fa] dark:bg-[#131722] px-1.5 py-0.5 rounded">
                          {item.exchange}
                        </span>
                      </div>
                      <span className="text-xs text-[#787b86] dark:text-[#868993] line-clamp-1">
                        {item.name}
                      </span>
                    </div>
                  </div>

                  <div className="text-right num-tabular">
                    <div className="font-bold text-sm text-[#131722] dark:text-white">
                      ${item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <div
                      className={`text-xs font-semibold flex items-center justify-end gap-0.5 ${
                        isPositive ? 'text-[#089981]' : 'text-[#f23645]'
                      }`}
                    >
                      {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      <span>{isPositive ? `+${item.changePercent.toFixed(2)}%` : `${item.changePercent.toFixed(2)}%`}</span>
                    </div>
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
