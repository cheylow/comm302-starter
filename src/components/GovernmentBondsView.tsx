import React from 'react';
import { BONDS_DATA } from '../data/mockMarketData';
import { MarketItem } from '../types/market';
import { TrendingUp, TrendingDown, Layers, ArrowUpRight } from 'lucide-react';

interface GovernmentBondsViewProps {
  onSelectItem: (item: MarketItem) => void;
  onBackToOverview: () => void;
}

export const GovernmentBondsView: React.FC<GovernmentBondsViewProps> = ({
  onSelectItem,
  onBackToOverview,
}) => {
  return (
    <section className="bg-white dark:bg-[#1e222d] border border-[#e0e3eb] dark:border-[#2a2e39] rounded-2xl p-5 sm:p-6 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#f0f3fa] dark:border-[#2a2e39]">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-[#131722] dark:text-white">
              Sovereign &amp; Government Bond Yields
            </h2>
            <span className="text-xs bg-blue-100 dark:bg-blue-950/60 text-[#2962ff] font-bold px-2 py-0.5 rounded">
              Yield Curve
            </span>
          </div>
          <p className="text-xs text-[#787b86] dark:text-[#868993] mt-1">
            Global interest rate benchmarks, yield curve inversion tracking, and monetary expectations
          </p>
        </div>

        <button
          onClick={onBackToOverview}
          className="text-xs font-semibold text-[#2962ff] px-3 py-1.5 hover:underline whitespace-nowrap"
        >
          Back to Overview
        </button>
      </div>

      {/* Yield Curve Inversion Metric Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-[#fafbfd] dark:bg-[#171b26] border border-[#e0e3eb] dark:border-[#2a2e39] rounded-xl">
          <span className="text-xs text-[#787b86] font-medium block">US 10Y - 2Y Yield Spread</span>
          <span className="text-2xl font-extrabold text-[#f23645] num-tabular block mt-1">-0.407%</span>
          <span className="text-[11px] text-[#787b86] mt-0.5 block">Curve Inverted (Historical recession indicator)</span>
        </div>
        <div className="p-4 bg-[#fafbfd] dark:bg-[#171b26] border border-[#e0e3eb] dark:border-[#2a2e39] rounded-xl">
          <span className="text-xs text-[#787b86] font-medium block">US 10-Year Benchmark</span>
          <span className="text-2xl font-extrabold text-[#131722] dark:text-white num-tabular block mt-1">4.285%</span>
          <span className="text-[11px] text-[#089981] mt-0.5 block">-0.035 bps today (-0.81%)</span>
        </div>
        <div className="p-4 bg-[#fafbfd] dark:bg-[#171b26] border border-[#e0e3eb] dark:border-[#2a2e39] rounded-xl">
          <span className="text-xs text-[#787b86] font-medium block">Germany 10Y Bund (EU Anchor)</span>
          <span className="text-2xl font-extrabold text-[#131722] dark:text-white num-tabular block mt-1">2.450%</span>
          <span className="text-[11px] text-[#089981] mt-0.5 block">+0.012 bps (+0.49%)</span>
        </div>
      </div>

      {/* Table of Bonds */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-[#fafbfd] dark:bg-[#171b26] border-b border-[#f0f3fa] dark:border-[#2a2e39] text-xs font-semibold text-[#787b86] dark:text-[#868993]">
            <tr>
              <th className="py-3 pl-6 pr-4">Bond Name</th>
              <th className="py-3 px-4 text-right">Yield (%)</th>
              <th className="py-3 px-4 text-right">Change (bps)</th>
              <th className="py-3 px-4 text-right">% Chg</th>
              <th className="py-3 px-4 text-right">52W Range</th>
              <th className="py-3 pr-6 pl-4 text-center">Issuer Authority</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f0f3fa] dark:divide-[#2a2e39]">
            {BONDS_DATA.map((bond) => {
              const isPositive = bond.change >= 0;
              return (
                <tr
                  key={bond.id}
                  onClick={() => onSelectItem(bond)}
                  className="hover:bg-[#f8f9fd] dark:hover:bg-[#262b3d]/60 cursor-pointer group transition-colors"
                >
                  <td className="py-4 pl-6 pr-4 flex items-center space-x-3">
                    <div>
                      <div className="font-bold text-[#131722] dark:text-white group-hover:text-[#2962ff] transition-colors flex items-center gap-1.5">
                        <span>{bond.name}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <span className="text-xs text-[#787b86]">{bond.symbol}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right font-bold text-base text-[#131722] dark:text-white num-tabular">
                    {bond.price.toFixed(3)}%
                  </td>
                  <td
                    className={`py-4 px-4 text-right font-medium num-tabular ${
                      isPositive ? 'text-[#089981]' : 'text-[#f23645]'
                    }`}
                  >
                    {isPositive ? `+${bond.change.toFixed(3)}` : bond.change.toFixed(3)}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded num-tabular ${
                        isPositive ? 'bg-emerald-50 text-[#089981]' : 'bg-rose-50 text-[#f23645]'
                      }`}
                    >
                      {isPositive ? `+${bond.changePercent.toFixed(2)}%` : `${bond.changePercent.toFixed(2)}%`}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right text-xs text-[#787b86] num-tabular">
                    {bond.range52W || '3.50% - 5.00%'}
                  </td>
                  <td className="py-4 pr-6 pl-4 text-center text-xs font-semibold text-[#787b86]">
                    {bond.exchange}
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
