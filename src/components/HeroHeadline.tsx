import React, { useState, useEffect } from 'react';
import { ChevronDown, Check, Clock, Radio } from 'lucide-react';
import { ScreenView } from '../types/market';

interface HeroHeadlineProps {
  activeScreen: ScreenView;
  onChangeScreen: (screen: ScreenView) => void;
  isLiveSimulationActive: boolean;
  onToggleLiveSimulation: () => void;
}

export const HeroHeadline: React.FC<HeroHeadlineProps> = ({
  activeScreen,
  onChangeScreen,
  isLiveSimulationActive,
  onToggleLiveSimulation,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [nyTime, setNyTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setNyTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'America/New_York',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const screenOptions: { id: ScreenView; label: string; desc: string }[] = [
    { id: 'overview', label: 'Markets, everywhere', desc: 'Global indices, stocks, crypto, commodities & forex overview' },
    { id: 'heatmap', label: 'Market Heatmap', desc: 'Treemap visualizer of S&P 500 performance by market cap' },
    { id: 'screener', label: 'Global Screener', desc: 'Filter stocks and indices by technical rating and gainers' },
    { id: 'economic-calendar', label: 'Economic Calendar', desc: 'Central bank rates, inflation, GDP and macro releases' },
  ];

  const currentOption = screenOptions.find((opt) => opt.id === activeScreen) || screenOptions[0];

  return (
    <section className="pt-8 sm:pt-12 pb-4 px-4 text-center relative max-w-5xl mx-auto">
      {/* Live Market Clock bar */}
      <div className="inline-flex items-center gap-3 text-xs text-[#787b86] dark:text-[#868993] mb-3 bg-[#f0f3fa] dark:bg-[#1e222d] px-3.5 py-1.5 rounded-full border border-[#e0e3eb]/60 dark:border-[#2a2e39]">
        <div className="flex items-center gap-1.5 font-medium">
          <span className="w-2 h-2 rounded-full bg-[#089981] animate-pulse"></span>
          <span className="text-[#131722] dark:text-gray-200 font-semibold">US Markets Open</span>
        </div>
        <span className="text-[#e0e3eb] dark:text-[#363a45]">|</span>
        <div className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 text-[#787b86]" />
          <span className="num-tabular font-mono">NY {nyTime || '09:30:00 EDT'}</span>
        </div>
        <span className="text-[#e0e3eb] dark:text-[#363a45]">|</span>
        <button
          onClick={onToggleLiveSimulation}
          className="flex items-center gap-1 hover:text-[#2962ff] transition-colors cursor-pointer"
          title="Toggle live price ticks simulation"
        >
          <Radio className={`w-3.5 h-3.5 ${isLiveSimulationActive ? 'text-[#089981] animate-pulse' : 'text-gray-400'}`} />
          <span className="hidden sm:inline font-medium">
            {isLiveSimulationActive ? 'Live Ticks: ON' : 'Live Ticks: Paused'}
          </span>
        </button>
      </div>

      {/* Main Headline with Dropdown */}
      <div className="relative inline-block">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="inline-flex items-center justify-center cursor-pointer group focus:outline-none"
        >
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#131722] dark:text-[#f0f3fa] group-hover:text-[#2962ff] transition-colors text-balance">
            {currentOption.label}
          </h1>
          <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8 ml-2 mt-1 sm:mt-2 text-[#131722] dark:text-[#f0f3fa] group-hover:text-[#2962ff] transition-transform duration-200 stroke-[2.5]" />
        </button>

        {dropdownOpen && (
          <div className="absolute left-1/2 -translate-x-1/2 mt-3 w-80 sm:w-96 bg-white dark:bg-[#1e222d] border border-[#e0e3eb] dark:border-[#2a2e39] rounded-2xl shadow-2xl p-2 z-50 text-left animate-in fade-in zoom-in-95">
            <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-[#787b86]">
              Select Market View
            </div>
            {screenOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => {
                  onChangeScreen(opt.id);
                  setDropdownOpen(false);
                }}
                className={`w-full text-left p-3 rounded-xl transition-colors flex items-start justify-between ${
                  activeScreen === opt.id
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-[#2962ff]'
                    : 'hover:bg-[#f0f3fa] dark:hover:bg-[#2a2e39] text-[#131722] dark:text-gray-200'
                }`}
              >
                <div>
                  <div className="font-bold text-sm leading-snug">{opt.label}</div>
                  <div className="text-xs text-[#787b86] mt-0.5">{opt.desc}</div>
                </div>
                {activeScreen === opt.id && <Check className="w-4 h-4 text-[#2962ff] shrink-0 mt-0.5" />}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
