/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { HeroHeadline } from './components/HeroHeadline';
import { CategoryNav } from './components/CategoryNav';
import { IndicesOverview } from './components/IndicesOverview';
import { WorldIndicesTable } from './components/WorldIndicesTable';
import { USStocksMovers } from './components/USStocksMovers';
import { QuickAssetClassDashboard } from './components/QuickAssetClassDashboard';
import { AssetDetailModal } from './components/AssetDetailModal';
import { SearchModal } from './components/SearchModal';
import { WatchlistDrawer } from './components/WatchlistDrawer';
import { MarketHeatmap } from './components/MarketHeatmap';
import { ScreenerView } from './components/ScreenerView';
import { EconomicCalendar } from './components/EconomicCalendar';
import { GovernmentBondsView } from './components/GovernmentBondsView';
import { ETFsView } from './components/ETFsView';
import { GetStartedModal } from './components/GetStartedModal';
import { Footer } from './components/Footer';

import {
  INDICES_OVERVIEW_CARDS,
  WORLD_INDICES_DATA,
  US_STOCKS_DATA,
  CRYPTO_DATA,
  COMMODITIES_DATA,
  FOREX_DATA,
  BONDS_DATA,
  ETFS_DATA,
} from './data/mockMarketData';
import {
  MarketItem,
  IndexOverviewCard,
  MainCategoryTab,
  ScreenView,
} from './types/market';

export default function App() {
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('tv_theme');
    return saved === 'dark';
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('tv_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('tv_theme', 'light');
    }
  }, [isDarkMode]);

  // Screen and Category state
  const [activeScreen, setActiveScreen] = useState<ScreenView>('overview');
  const [activeCategoryTab, setActiveCategoryTab] = useState<MainCategoryTab>('US stocks');

  // Interactive Modals and Drawers
  const [selectedItem, setSelectedItem] = useState<MarketItem | IndexOverviewCard | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWatchlistOpen, setIsWatchlistOpen] = useState(false);
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);

  // Watchlist state
  const [watchlistSymbols, setWatchlistSymbols] = useState<string[]>(() => {
    const saved = localStorage.getItem('tv_watchlist');
    return saved ? JSON.parse(saved) : ['AAPL', 'NVDA', 'BTC/USD', 'SPX'];
  });

  const handleToggleWatchlist = (symbol: string) => {
    setWatchlistSymbols((prev) => {
      const next = prev.includes(symbol) ? prev.filter((s) => s !== symbol) : [...prev, symbol];
      localStorage.setItem('tv_watchlist', JSON.stringify(next));
      return next;
    });
  };

  const handleRemoveFromWatchlist = (symbol: string) => {
    setWatchlistSymbols((prev) => {
      const next = prev.filter((s) => s !== symbol);
      localStorage.setItem('tv_watchlist', JSON.stringify(next));
      return next;
    });
  };

  // Live price tick simulation state
  const [isLiveSimulationActive, setIsLiveSimulationActive] = useState(true);
  const [priceFlashMap, setPriceFlashMap] = useState<Record<string, 'up' | 'down'>>({});
  const [indicesCards, setIndicesCards] = useState<IndexOverviewCard[]>(INDICES_OVERVIEW_CARDS);
  const [worldIndices, setWorldIndices] = useState<MarketItem[]>(WORLD_INDICES_DATA);
  const [usStocks, setUsStocks] = useState(US_STOCKS_DATA);
  const [cryptoList, setCryptoList] = useState<MarketItem[]>(CRYPTO_DATA);
  const [futuresList, setFuturesList] = useState<MarketItem[]>(COMMODITIES_DATA);
  const [forexList, setForexList] = useState<MarketItem[]>(FOREX_DATA);

  // Pool of all searchable items
  const allSearchableItems: MarketItem[] = useMemo(() => {
    return [
      ...worldIndices,
      ...usStocks['Most active'],
      ...usStocks['Gainers'],
      ...usStocks['Losers'],
      ...cryptoList,
      ...futuresList,
      ...forexList,
      ...BONDS_DATA,
      ...ETFS_DATA,
    ].filter(
      (item, index, self) => index === self.findIndex((t) => t.symbol === item.symbol)
    );
  }, [worldIndices, usStocks, cryptoList, futuresList, forexList]);

  // Live ticking simulation effect
  useEffect(() => {
    if (!isLiveSimulationActive) return;

    const interval = setInterval(() => {
      // Pick a random stock or crypto to tick
      const targetPool = ['nvda', 'aapl', 'tsla', 'btc-usd', 'gold-gc', 'spx', 'ni225'];
      const chosenId = targetPool[Math.floor(Math.random() * targetPool.length)];
      const isUp = Math.random() > 0.45;
      const pctDelta = (Math.random() * 0.15 + 0.02) * (isUp ? 1 : -1);

      setPriceFlashMap((prev) => ({ ...prev, [chosenId]: isUp ? 'up' : 'down' }));

      // Clear flash after 1200ms
      setTimeout(() => {
        setPriceFlashMap((prev) => {
          const next = { ...prev };
          delete next[chosenId];
          return next;
        });
      }, 1200);

      // Update state for chosen item
      if (chosenId === 'spx') {
        setIndicesCards((prev) =>
          prev.map((c) =>
            c.id === 'spx'
              ? {
                  ...c,
                  price: Number((c.price * (1 + pctDelta / 100)).toFixed(2)),
                  change: Number((c.change + (pctDelta * c.price) / 100).toFixed(2)),
                }
              : c
          )
        );
      } else if (chosenId === 'nvda' || chosenId === 'aapl' || chosenId === 'tsla') {
        setUsStocks((prev) => {
          const updateArray = (arr: MarketItem[]) =>
            arr.map((s) =>
              s.id === chosenId
                ? {
                    ...s,
                    price: Number((s.price * (1 + pctDelta / 100)).toFixed(2)),
                    change: Number((s.change + (pctDelta * s.price) / 100).toFixed(2)),
                  }
                : s
            );
          return {
            'Most active': updateArray(prev['Most active']),
            Gainers: updateArray(prev.Gainers),
            Losers: updateArray(prev.Losers),
          };
        });
      } else if (chosenId === 'btc-usd') {
        setCryptoList((prev) =>
          prev.map((c) =>
            c.id === 'btc-usd'
              ? {
                  ...c,
                  price: Number((c.price * (1 + pctDelta / 100)).toFixed(2)),
                  change: Number((c.change + (pctDelta * c.price) / 100).toFixed(2)),
                }
              : c
          )
        );
      }
    }, 3200);

    return () => clearInterval(interval);
  }, [isLiveSimulationActive]);

  // Handle Category tab selection
  const handleSelectCategoryTab = (tab: MainCategoryTab) => {
    setActiveCategoryTab(tab);
    if (tab === 'Economy') {
      setActiveScreen('economic-calendar');
    } else if (tab === 'Government bonds' || tab === 'Corporate bonds') {
      setActiveScreen('overview');
      // Scroll to bonds or render bonds view
    } else if (tab === 'ETFs') {
      setActiveScreen('overview');
    } else if (tab === 'US stocks') {
      setActiveScreen('overview');
      const el = document.getElementById('stocks');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === 'World stocks') {
      setActiveScreen('overview');
      const el = document.getElementById('indices');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else {
      setActiveScreen('overview');
    }
  };

  const handleSelectSymbolFromHeatmap = (symbol: string) => {
    const match = allSearchableItems.find((item) => item.symbol === symbol);
    if (match) {
      setSelectedItem(match);
    }
  };

  const handleViewAllCategory = (category: 'crypto' | 'futures' | 'forex') => {
    setActiveScreen('screener');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#131722] text-[#131722] dark:text-[#f0f3fa] transition-colors selection:bg-blue-100 selection:text-[#2962ff]">
      {/* Top Header */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        watchlistCount={watchlistSymbols.length}
        onOpenWatchlist={() => setIsWatchlistOpen(true)}
        activeScreen={activeScreen}
        onChangeScreen={setActiveScreen}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        onOpenGetStarted={() => setIsGetStartedOpen(true)}
      />

      {/* Hero Headline & Live Status */}
      <HeroHeadline
        activeScreen={activeScreen}
        onChangeScreen={setActiveScreen}
        isLiveSimulationActive={isLiveSimulationActive}
        onToggleLiveSimulation={() => setIsLiveSimulationActive(!isLiveSimulationActive)}
      />

      {/* Market Category Pills */}
      <CategoryNav
        activeTab={activeCategoryTab}
        onSelectTab={handleSelectCategoryTab}
      />

      {/* Main Content Area based on Screen View or Active Tab */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 w-full pb-16 space-y-12">
        {activeScreen === 'heatmap' ? (
          <MarketHeatmap
            onSelectSymbol={handleSelectSymbolFromHeatmap}
            onBackToOverview={() => setActiveScreen('overview')}
          />
        ) : activeScreen === 'screener' ? (
          <ScreenerView
            items={allSearchableItems}
            onSelectItem={setSelectedItem}
            onBackToOverview={() => setActiveScreen('overview')}
          />
        ) : activeScreen === 'economic-calendar' || activeCategoryTab === 'Economy' ? (
          <EconomicCalendar onBackToOverview={() => setActiveScreen('overview')} />
        ) : activeCategoryTab === 'Government bonds' || activeCategoryTab === 'Corporate bonds' ? (
          <GovernmentBondsView
            onSelectItem={setSelectedItem}
            onBackToOverview={() => setActiveCategoryTab('US stocks')}
          />
        ) : activeCategoryTab === 'ETFs' ? (
          <ETFsView
            onSelectItem={setSelectedItem}
            onBackToOverview={() => setActiveCategoryTab('US stocks')}
          />
        ) : (
          /* Default Markets Overview View (Matching Screenshot) */
          <>
            {/* Top Indices Cards */}
            <IndicesOverview
              indices={indicesCards}
              onSelectIndex={setSelectedItem}
              priceFlashMap={priceFlashMap}
            />

            {/* World Indices Table */}
            <WorldIndicesTable
              indicesData={worldIndices}
              onSelectItem={setSelectedItem}
              priceFlashMap={priceFlashMap}
            />

            {/* US Stocks Market Movers */}
            <USStocksMovers
              stocksData={usStocks}
              onSelectItem={setSelectedItem}
              priceFlashMap={priceFlashMap}
            />

            {/* Quick Asset Class Dashboard (Crypto, Futures, Forex) */}
            <QuickAssetClassDashboard
              cryptoData={cryptoList}
              futuresData={futuresList}
              forexData={forexList}
              onSelectItem={setSelectedItem}
              onViewAllCategory={handleViewAllCategory}
              priceFlashMap={priceFlashMap}
            />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer onChangeScreen={setActiveScreen} />

      {/* Interactive Instrument Detail Modal */}
      {selectedItem && (
        <AssetDetailModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          isWatchlisted={watchlistSymbols.includes(selectedItem.symbol)}
          onToggleWatchlist={handleToggleWatchlist}
          onSimulateTrade={(symbol, type, shares, price) => {
            console.log(`Executed paper trade: ${type} ${shares} ${symbol} at $${price}`);
          }}
        />
      )}

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        allItems={allSearchableItems}
        onSelectItem={setSelectedItem}
      />

      {/* Watchlist Slide-out Drawer */}
      <WatchlistDrawer
        isOpen={isWatchlistOpen}
        onClose={() => setIsWatchlistOpen(false)}
        watchlistSymbols={watchlistSymbols}
        allItems={allSearchableItems}
        onSelectItem={setSelectedItem}
        onRemoveFromWatchlist={handleRemoveFromWatchlist}
      />

      {/* Get Started / Demo Registration Modal */}
      <GetStartedModal
        isOpen={isGetStartedOpen}
        onClose={() => setIsGetStartedOpen(false)}
      />
    </div>
  );
}
