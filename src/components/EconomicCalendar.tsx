import React from 'react';
import { ECONOMY_DATA } from '../data/mockMarketData';
import { Calendar, TrendingUp, AlertCircle, CheckCircle, Info } from 'lucide-react';

interface EconomicCalendarProps {
  onBackToOverview: () => void;
}

export const EconomicCalendar: React.FC<EconomicCalendarProps> = ({ onBackToOverview }) => {
  return (
    <section className="bg-white dark:bg-[#1e222d] border border-[#e0e3eb] dark:border-[#2a2e39] rounded-2xl p-5 sm:p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#f0f3fa] dark:border-[#2a2e39]">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-[#131722] dark:text-white">
              Global Economic Indicators
            </h2>
            <span className="text-xs bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-bold px-2 py-0.5 rounded">
              Macro Data
            </span>
          </div>
          <p className="text-xs text-[#787b86] dark:text-[#868993] mt-1">
            Federal Reserve interest rates, US inflation metrics, employment, and gross domestic product
          </p>
        </div>

        <button
          onClick={onBackToOverview}
          className="text-xs font-semibold text-[#2962ff] px-3 py-1.5 hover:underline whitespace-nowrap"
        >
          Back to Overview
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-[#fafbfd] dark:bg-[#171b26] border-b border-[#f0f3fa] dark:border-[#2a2e39] text-xs font-semibold text-[#787b86] dark:text-[#868993]">
            <tr>
              <th className="py-3 pl-6 pr-4">Macro Indicator</th>
              <th className="py-3 px-4 text-right">Latest Value</th>
              <th className="py-3 px-4 text-right">Previous</th>
              <th className="py-3 px-4 text-right">Net Change</th>
              <th className="py-3 px-4 text-center">Market Impact</th>
              <th className="py-3 pr-6 pl-4 text-right">Release Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f0f3fa] dark:divide-[#2a2e39]">
            {ECONOMY_DATA.map((row, idx) => (
              <tr key={idx} className="hover:bg-[#f8f9fd] dark:hover:bg-[#262b3d]/60 transition-colors">
                <td className="py-4 pl-6 pr-4 font-bold text-[#131722] dark:text-white">
                  {row.indicator}
                </td>
                <td className="py-4 px-4 text-right font-extrabold text-[#131722] dark:text-white num-tabular">
                  {row.value}
                </td>
                <td className="py-4 px-4 text-right text-[#787b86] dark:text-[#868993] num-tabular">
                  {row.previous}
                </td>
                <td className="py-4 px-4 text-right font-semibold num-tabular text-[#089981]">
                  {row.change}
                </td>
                <td className="py-4 px-4 text-center">
                  <span
                    className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                      row.status === 'Positive'
                        ? 'bg-emerald-100 text-[#089981] dark:bg-emerald-950/40'
                        : row.status === 'Cautious'
                        ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/40'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="py-4 pr-6 pl-4 text-right text-xs text-[#787b86] dark:text-[#868993]">
                  {row.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
