import React from 'react';
import { ScreenView } from '../types/market';

interface FooterProps {
  onChangeScreen: (screen: ScreenView) => void;
}

export const Footer: React.FC<FooterProps> = ({ onChangeScreen }) => {
  return (
    <footer className="mt-auto border-t border-[#e0e3eb] dark:border-[#2a2e39] bg-white dark:bg-[#131722] text-[#787b86] py-10 px-4 sm:px-6 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
        {/* Left brand & copyright */}
        <div className="flex items-center space-x-3">
          <svg className="w-6 h-6 text-[#131722] dark:text-white fill-current" viewBox="0 0 36 28">
            <path d="M8 20H0V8h8v12zm14 0h-8V0h8v20zm14 0h-8v-8h8v8z"></path>
          </svg>
          <span className="font-semibold text-[#131722] dark:text-white">TradingView</span>
          <span className="text-xs">© 2024 TradingView, Inc.</span>
        </div>

        {/* Center links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold">
          <button
            onClick={() => onChangeScreen('overview')}
            className="hover:text-[#131722] dark:hover:text-white transition-colors"
          >
            Charts
          </button>
          <button
            onClick={() => onChangeScreen('screener')}
            className="hover:text-[#131722] dark:hover:text-white transition-colors"
          >
            Screeners
          </button>
          <button
            onClick={() => onChangeScreen('economic-calendar')}
            className="hover:text-[#131722] dark:hover:text-white transition-colors"
          >
            Economic Calendar
          </button>
          <button
            onClick={() => onChangeScreen('heatmap')}
            className="hover:text-[#131722] dark:hover:text-white transition-colors"
          >
            Market Heatmaps
          </button>
          <a
            href="#terms"
            onClick={(e) => {
              e.preventDefault();
              alert('TradingView Terms of Use: Informational market data simulated for demonstration.');
            }}
            className="hover:text-[#131722] dark:hover:text-white transition-colors"
          >
            Terms of Use
          </a>
          <a
            href="#privacy"
            onClick={(e) => {
              e.preventDefault();
              alert('TradingView Privacy Policy: Your data and preferences are saved locally.');
            }}
            className="hover:text-[#131722] dark:hover:text-white transition-colors"
          >
            Privacy Policy
          </a>
        </div>

        {/* Right slogan */}
        <div className="text-xs text-[#787b86] dark:text-[#868993] text-center md:text-right font-medium">
          <span>Look first / Then leap.</span>
        </div>
      </div>
    </footer>
  );
};
