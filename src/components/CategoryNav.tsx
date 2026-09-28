import React from 'react';
import { MainCategoryTab } from '../types/market';

interface CategoryNavProps {
  activeTab: MainCategoryTab;
  onSelectTab: (tab: MainCategoryTab) => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({ activeTab, onSelectTab }) => {
  const tabs: MainCategoryTab[] = [
    'US stocks',
    'World stocks',
    'Crypto',
    'Futures',
    'Forex',
    'Government bonds',
    'Corporate bonds',
    'ETFs',
    'Economy',
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 w-full mb-8">
      <div className="flex justify-center">
        <div className="inline-flex items-center overflow-x-auto no-scrollbar py-1 px-1 bg-white dark:bg-[#1e222d] border border-[#e0e3eb] dark:border-[#2a2e39] rounded-full max-w-full shadow-sm text-sm font-semibold">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => onSelectTab(tab)}
                className={`rounded-full px-4 sm:px-5 py-2 whitespace-nowrap transition-all duration-150 focus:outline-none cursor-pointer ${
                  isActive
                    ? 'bg-[#131722] text-white dark:bg-white dark:text-[#131722] shadow-sm'
                    : 'text-[#131722] dark:text-gray-300 hover:text-[#2962ff] dark:hover:text-[#2962ff]'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
