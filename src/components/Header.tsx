import React, { useState, useEffect } from 'react';
import {
  Search,
  Globe,
  User,
  Star,
  Moon,
  Sun,
  Menu,
  X,
  TrendingUp,
  Sliders,
  DollarSign,
  ChevronDown
} from 'lucide-react';
import { ScreenView } from '../types/market';

interface HeaderProps {
  onOpenSearch: () => void;
  watchlistCount: number;
  onOpenWatchlist: () => void;
  activeScreen: ScreenView;
  onChangeScreen: (screen: ScreenView) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenGetStarted: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  watchlistCount,
  onOpenWatchlist,
  activeScreen,
  onChangeScreen,
  isDarkMode,
  onToggleDarkMode,
  onOpenGetStarted,
}) => {
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('EN');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsMenuOpen, setProductsMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const languages = ['EN', 'ES', 'DE', 'FR', 'JA', 'ZH', 'PT'];

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        onOpenSearch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onOpenSearch]);

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-[#131722] border-b border-[#f0f3fa] dark:border-[#2a2e39] h-16 flex items-center justify-between px-4 lg:px-6 transition-colors">
      {/* Left branding & search */}
      <div className="flex items-center space-x-4 flex-1 max-w-2xl">
        {/* TradingView Logo Mark */}
        <button
          onClick={() => onChangeScreen('overview')}
          className="flex items-center text-[#131722] dark:text-[#f0f3fa] hover:opacity-80 transition-opacity focus:outline-none"
          title="TradingView Home"
        >
          <svg className="w-8 h-8 fill-current" viewBox="0 0 36 28" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 20H0V8h8v12zm14 0h-8V0h8v20zm14 0h-8v-8h8v8z"></path>
          </svg>
        </button>

        {/* Pill Search Bar with shortcut hint */}
        <div
          onClick={onOpenSearch}
          className="relative w-full max-w-xs hidden sm:block cursor-pointer group"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onOpenSearch()}
        >
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#787b86]">
            <Search className="w-4 h-4 group-hover:text-[#2962ff] transition-colors" />
          </div>
          <div className="w-full bg-[#f0f3fa] dark:bg-[#1e222d] group-hover:bg-[#e8ebf2] dark:group-hover:bg-[#2a2e39] text-sm text-[#787b86] pl-10 pr-4 py-2 rounded-full border border-transparent group-hover:border-[#2962ff]/30 transition-all flex items-center justify-between select-none">
            <span>Search (Ctrl+K)</span>
            <kbd className="hidden md:inline-block text-[10px] font-mono bg-white dark:bg-[#131722] px-1.5 py-0.5 rounded border border-[#e0e3eb] dark:border-[#363a45] text-[#787b86]">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-7 pl-3 font-semibold text-[15px] tracking-tight text-[#131722] dark:text-[#d1d4dc]">
          {/* Products Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProductsMenuOpen(!productsMenuOpen)}
              onBlur={() => setTimeout(() => setProductsMenuOpen(false), 200)}
              className="flex items-center gap-1 hover:text-[#2962ff] transition-colors"
            >
              <span>Products</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </button>
            {productsMenuOpen && (
              <div className="absolute left-0 mt-2 w-52 bg-white dark:bg-[#1e222d] rounded-xl shadow-xl border border-[#e0e3eb] dark:border-[#2a2e39] py-2 z-50 animate-in fade-in zoom-in-95">
                <button
                  onClick={() => onChangeScreen('overview')}
                  className="w-full text-left px-4 py-2 text-sm text-[#131722] dark:text-gray-200 hover:bg-[#f0f3fa] dark:hover:bg-[#2a2e39] flex items-center gap-2"
                >
                  <TrendingUp className="w-4 h-4 text-[#2962ff]" />
                  <span>Supercharts</span>
                </button>
                <button
                  onClick={() => onChangeScreen('screener')}
                  className="w-full text-left px-4 py-2 text-sm text-[#131722] dark:text-gray-200 hover:bg-[#f0f3fa] dark:hover:bg-[#2a2e39] flex items-center gap-2"
                >
                  <Sliders className="w-4 h-4 text-[#089981]" />
                  <span>Stock Screener</span>
                </button>
                <button
                  onClick={() => onChangeScreen('heatmap')}
                  className="w-full text-left px-4 py-2 text-sm text-[#131722] dark:text-gray-200 hover:bg-[#f0f3fa] dark:hover:bg-[#2a2e39] flex items-center gap-2"
                >
                  <span className="w-4 h-4 text-center font-bold text-amber-500">▦</span>
                  <span>Market Heatmap</span>
                </button>
                <button
                  onClick={() => onChangeScreen('economic-calendar')}
                  className="w-full text-left px-4 py-2 text-sm text-[#131722] dark:text-gray-200 hover:bg-[#f0f3fa] dark:hover:bg-[#2a2e39] flex items-center gap-2"
                >
                  <DollarSign className="w-4 h-4 text-purple-500" />
                  <span>Economic Calendar</span>
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => onChangeScreen('economic-calendar')}
            className="hover:text-[#2962ff] transition-colors"
          >
            Community
          </button>

          <button
            onClick={() => onChangeScreen('overview')}
            className={`transition-colors ${
              activeScreen === 'overview'
                ? 'text-[#2962ff] font-bold'
                : 'hover:text-[#2962ff]'
            }`}
          >
            Markets
          </button>

          <button
            onClick={() => onChangeScreen('screener')}
            className="hover:text-[#2962ff] transition-colors"
          >
            Brokers
          </button>

          <div className="relative">
            <button
              onClick={() => onChangeScreen('heatmap')}
              className={`hover:text-[#2962ff] transition-colors ${
                activeScreen === 'heatmap' ? 'text-[#2962ff] font-bold' : ''
              }`}
            >
              Heatmaps
            </button>
          </div>
        </nav>
      </div>

      {/* Right utility controls & CTA */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* Mobile search icon */}
        <button
          onClick={onOpenSearch}
          className="sm:hidden p-2 text-[#131722] dark:text-gray-300 hover:bg-[#f0f3fa] dark:hover:bg-[#1e222d] rounded-full transition-colors"
          title="Search symbols"
        >
          <Search className="w-5 h-5" />
        </button>

        {/* Watchlist toggle button */}
        <button
          onClick={onOpenWatchlist}
          className="relative p-2 text-[#131722] dark:text-gray-300 hover:text-[#2962ff] hover:bg-[#f0f3fa] dark:hover:bg-[#1e222d] rounded-full transition-colors"
          title="Open Watchlist"
        >
          <Star className="w-5 h-5" />
          {watchlistCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-[#2962ff] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {watchlistCount}
            </span>
          )}
        </button>

        {/* Dark/Light mode toggle */}
        <button
          onClick={onToggleDarkMode}
          className="p-2 text-[#131722] dark:text-gray-300 hover:text-[#2962ff] hover:bg-[#f0f3fa] dark:hover:bg-[#1e222d] rounded-full transition-colors"
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Language Picker */}
        <div className="relative">
          <button
            onClick={() => setLangDropdownOpen(!langDropdownOpen)}
            className="flex items-center space-x-1.5 text-[#131722] dark:text-gray-300 hover:text-[#2962ff] font-semibold text-sm px-2.5 py-1.5 rounded-md hover:bg-[#f8f9fd] dark:hover:bg-[#1e222d] transition-colors"
            title="Change Language"
          >
            <Globe className="w-4 h-4" />
            <span>{selectedLang}</span>
          </button>

          {langDropdownOpen && (
            <div className="absolute right-0 mt-1 w-32 bg-white dark:bg-[#1e222d] rounded-xl shadow-lg border border-[#e0e3eb] dark:border-[#2a2e39] py-1 z-50 animate-in fade-in">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    setSelectedLang(lang);
                    setLangDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-1.5 text-xs font-semibold ${
                    selectedLang === lang
                      ? 'text-[#2962ff] bg-blue-50 dark:bg-blue-900/20'
                      : 'text-[#131722] dark:text-gray-300 hover:bg-[#f0f3fa] dark:hover:bg-[#2a2e39]'
                  }`}
                >
                  {lang === 'EN' && 'English'}
                  {lang === 'ES' && 'Español'}
                  {lang === 'DE' && 'Deutsch'}
                  {lang === 'FR' && 'Français'}
                  {lang === 'JA' && '日本語'}
                  {lang === 'ZH' && '中文'}
                  {lang === 'PT' && 'Português'}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* User Profile Avatar */}
        <div className="relative">
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="p-2 text-[#131722] dark:text-gray-300 hover:bg-[#f8f9fd] dark:hover:bg-[#1e222d] rounded-full transition-colors"
            title="Trading Profile"
          >
            <User className="w-5 h-5" />
          </button>
          {userMenuOpen && (
            <div className="absolute right-0 mt-1 w-56 bg-white dark:bg-[#1e222d] rounded-xl shadow-xl border border-[#e0e3eb] dark:border-[#2a2e39] py-2 z-50 animate-in fade-in">
              <div className="px-4 py-2 border-b border-[#f0f3fa] dark:border-[#2a2e39]">
                <p className="text-xs text-[#787b86]">Paper Trading Balance</p>
                <p className="text-sm font-bold text-[#131722] dark:text-white num-tabular">$100,000.00 USD</p>
              </div>
              <button
                onClick={() => {
                  setUserMenuOpen(false);
                  onOpenWatchlist();
                }}
                className="w-full text-left px-4 py-2 text-xs font-medium text-[#131722] dark:text-gray-300 hover:bg-[#f0f3fa] dark:hover:bg-[#2a2e39] flex items-center justify-between"
              >
                <span>My Watchlist</span>
                <span className="text-[10px] bg-blue-100 dark:bg-blue-900/40 text-[#2962ff] px-1.5 py-0.5 rounded font-bold">
                  {watchlistCount}
                </span>
              </button>
              <button
                onClick={() => {
                  setUserMenuOpen(false);
                  onChangeScreen('heatmap');
                }}
                className="w-full text-left px-4 py-2 text-xs font-medium text-[#131722] dark:text-gray-300 hover:bg-[#f0f3fa] dark:hover:bg-[#2a2e39]"
              >
                Market Heatmaps
              </button>
            </div>
          )}
        </div>

        {/* Gradient CTA Button */}
        <button
          onClick={onOpenGetStarted}
          className="bg-gradient-to-r from-[#2962ff] to-[#9c27b0] hover:from-[#1e4bd8] hover:to-[#831fa0] text-white font-medium text-sm px-4 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-sm hover:shadow transition-all active:scale-[0.98] whitespace-nowrap"
        >
          Get started
        </button>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#131722] dark:text-gray-300 hover:bg-[#f0f3fa] dark:hover:bg-[#1e222d] rounded-md"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-16 bg-white dark:bg-[#131722] border-b border-[#e0e3eb] dark:border-[#2a2e39] p-4 shadow-xl z-50 flex flex-col space-y-3">
          <button
            onClick={() => {
              onChangeScreen('overview');
              setMobileMenuOpen(false);
            }}
            className="text-left font-semibold text-sm py-2 px-3 rounded-lg hover:bg-[#f0f3fa] dark:hover:bg-[#1e222d] text-[#131722] dark:text-white"
          >
            Markets Overview
          </button>
          <button
            onClick={() => {
              onChangeScreen('heatmap');
              setMobileMenuOpen(false);
            }}
            className="text-left font-semibold text-sm py-2 px-3 rounded-lg hover:bg-[#f0f3fa] dark:hover:bg-[#1e222d] text-[#131722] dark:text-white"
          >
            S&P 500 Heatmap
          </button>
          <button
            onClick={() => {
              onChangeScreen('screener');
              setMobileMenuOpen(false);
            }}
            className="text-left font-semibold text-sm py-2 px-3 rounded-lg hover:bg-[#f0f3fa] dark:hover:bg-[#1e222d] text-[#131722] dark:text-white"
          >
            Market Screener
          </button>
          <button
            onClick={() => {
              onChangeScreen('economic-calendar');
              setMobileMenuOpen(false);
            }}
            className="text-left font-semibold text-sm py-2 px-3 rounded-lg hover:bg-[#f0f3fa] dark:hover:bg-[#1e222d] text-[#131722] dark:text-white"
          >
            Economic Calendar
          </button>
        </div>
      )}
    </header>
  );
};
