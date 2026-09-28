import React, { useState, useMemo } from 'react';
import {
  X,
  Star,
  TrendingUp,
  TrendingDown,
  Maximize2,
  Share2,
  DollarSign,
  BarChart2,
  Activity,
  Layers,
  Check
} from 'lucide-react';
import { MarketItem, IndexOverviewCard, CandlePoint } from '../types/market';
import { generateCandleHistory } from '../data/mockMarketData';

interface AssetDetailModalProps {
  item: MarketItem | IndexOverviewCard | null;
  onClose: () => void;
  isWatchlisted: boolean;
  onToggleWatchlist: (symbol: string) => void;
  onSimulateTrade?: (symbol: string, type: 'buy' | 'sell', shares: number, price: number) => void;
}

export const AssetDetailModal: React.FC<AssetDetailModalProps> = ({
  item,
  onClose,
  isWatchlisted,
  onToggleWatchlist,
  onSimulateTrade,
}) => {
  const [timeframe, setTimeframe] = useState<'1D' | '5D' | '1M' | '6M' | '1Y' | 'ALL'>('1M');
  const [chartType, setChartType] = useState<'area' | 'candles'>('area');
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [tradeShares, setTradeShares] = useState(10);
  const [tradeSuccessMsg, setTradeSuccessMsg] = useState<string | null>(null);

  if (!item) return null;

  const isPositive = item.change >= 0;

  // Generate historical points for the chart
  const historyData: CandlePoint[] = useMemo(() => {
    if ('history' in item && item.history && item.history.length > 0) {
      return item.history;
    }
    const days = timeframe === '1D' ? 12 : timeframe === '5D' ? 20 : timeframe === '1M' ? 30 : 60;
    return generateCandleHistory(item.price, isPositive ? 'up' : 'down', days);
  }, [item, timeframe, isPositive]);

  // Compute SVG coordinates for the area / line chart
  const prices = historyData.map((d) => d.close);
  const minPrice = Math.min(...prices) * 0.995;
  const maxPrice = Math.max(...prices) * 1.005;
  const priceRange = maxPrice - minPrice || 1;

  const width = 640;
  const height = 260;

  const points = historyData.map((d, i) => {
    const x = (i / (historyData.length - 1 || 1)) * width;
    const y = height - ((d.close - minPrice) / priceRange) * (height - 30) - 15;
    return { x, y, data: d };
  });

  const pathD = points.reduce((acc, p, i) => {
    return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, '');

  const areaD = `${pathD} L ${width} ${height} L 0 ${height} Z`;

  const activePoint = hoverIndex !== null ? points[hoverIndex] : points[points.length - 1];
  const displayPrice = activePoint?.data.close ?? item.price;

  const rating = ('technicalRating' in item && item.technicalRating) ? item.technicalRating : 'Buy';
  const dayLow = ('low' in item && typeof item.low === 'number') ? item.low : item.price * 0.985;
  const dayHigh = ('high' in item && typeof item.high === 'number') ? item.high : item.price * 1.015;

  const handleTrade = (type: 'buy' | 'sell') => {
    if (onSimulateTrade) {
      onSimulateTrade(item.symbol, type, tradeShares, item.price);
    }
    setTradeSuccessMsg(`Successfully executed ${type.toUpperCase()} order for ${tradeShares} shares of ${item.symbol}!`);
    setTimeout(() => setTradeSuccessMsg(null), 3500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-[#1e222d] border border-[#e0e3eb] dark:border-[#2a2e39] rounded-2xl shadow-2xl w-full max-w-4xl max-h-[92vh] overflow-y-auto flex flex-col text-[#131722] dark:text-gray-100"
      >
        {/* Modal Top Header */}
        <div className="p-4 sm:p-6 border-b border-[#f0f3fa] dark:border-[#2a2e39] flex items-start justify-between">
          <div className="flex items-center space-x-3 sm:space-x-4">
            {'badgeText' in item && item.badgeText && (
              <span
                style={{ backgroundColor: ('badgeBg' in item ? item.badgeBg : undefined) || '#2962ff' }}
                className="w-10 h-10 rounded-full text-white font-bold text-sm flex items-center justify-center shadow select-none shrink-0"
              >
                {item.badgeText}
              </span>
            )}
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">{item.name}</h2>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#f0f3fa] dark:bg-[#2a2e39] text-[#787b86]">
                  {item.symbol} • {item.exchange}
                </span>
              </div>
              <div className="flex items-baseline space-x-3 mt-1">
                <span className="text-3xl font-extrabold num-tabular">
                  ${displayPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span
                  className={`text-base font-bold num-tabular flex items-center gap-1 ${
                    isPositive ? 'text-[#089981]' : 'text-[#f23645]'
                  }`}
                >
                  {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {item.change > 0 ? `+${item.change.toFixed(2)}` : item.change.toFixed(2)} (
                  {isPositive ? `+${item.changePercent.toFixed(2)}%` : `${item.changePercent.toFixed(2)}%`})
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => onToggleWatchlist(item.symbol)}
              className={`p-2 rounded-full border transition-colors ${
                isWatchlisted
                  ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 text-amber-500'
                  : 'border-[#e0e3eb] dark:border-[#2a2e39] text-[#787b86] hover:text-amber-500 hover:bg-[#f8f9fd] dark:hover:bg-[#2a2e39]'
              }`}
              title={isWatchlisted ? 'Remove from Watchlist' : 'Add to Watchlist'}
            >
              <Star className="w-5 h-5 fill-current" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full border border-[#e0e3eb] dark:border-[#2a2e39] text-[#787b86] hover:text-[#131722] dark:hover:text-white hover:bg-[#f0f3fa] dark:hover:bg-[#2a2e39] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Trade Success Message Banner */}
        {tradeSuccessMsg && (
          <div className="bg-emerald-50 dark:bg-emerald-950/40 text-[#089981] px-6 py-2.5 text-sm font-semibold border-b border-emerald-200 dark:border-emerald-800 flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>{tradeSuccessMsg}</span>
          </div>
        )}

        {/* Chart Controls Bar */}
        <div className="px-6 py-3 bg-[#fafbfd] dark:bg-[#171b26] border-b border-[#f0f3fa] dark:border-[#2a2e39] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-1">
            {(['1D', '5D', '1M', '6M', '1Y', 'ALL'] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-2.5 py-1 rounded font-semibold transition-colors ${
                  timeframe === tf
                    ? 'bg-[#2962ff] text-white'
                    : 'text-[#787b86] dark:text-gray-400 hover:bg-[#f0f3fa] dark:hover:bg-[#2a2e39]'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex items-center bg-[#f0f3fa] dark:bg-[#2a2e39] p-0.5 rounded-lg">
              <button
                onClick={() => setChartType('area')}
                className={`px-2 py-1 rounded text-xs font-semibold ${
                  chartType === 'area'
                    ? 'bg-white dark:bg-[#1e222d] text-[#2962ff] shadow-sm'
                    : 'text-[#787b86]'
                }`}
              >
                Line / Area
              </button>
              <button
                onClick={() => setChartType('candles')}
                className={`px-2 py-1 rounded text-xs font-semibold ${
                  chartType === 'candles'
                    ? 'bg-white dark:bg-[#1e222d] text-[#2962ff] shadow-sm'
                    : 'text-[#787b86]'
                }`}
              >
                Candles
              </button>
            </div>
            <span className="text-[#787b86] font-mono">
              Hover point: {activePoint?.data.time} · Vol: {(activePoint?.data.volume / 1000000).toFixed(1)}M
            </span>
          </div>
        </div>

        {/* Chart Viewport */}
        <div className="p-4 sm:p-6 relative bg-white dark:bg-[#1e222d]">
          {chartType === 'area' ? (
            <div className="w-full relative h-64 sm:h-72">
              <svg
                viewBox={`0 0 ${width} ${height}`}
                className="w-full h-full"
                preserveAspectRatio="none"
                onMouseLeave={() => setHoverIndex(null)}
              >
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor={isPositive ? '#089981' : '#f23645'}
                      stopOpacity="0.25"
                    />
                    <stop
                      offset="100%"
                      stopColor={isPositive ? '#089981' : '#f23645'}
                      stopOpacity="0.0"
                    />
                  </linearGradient>
                </defs>

                {/* Horizontal reference grid lines */}
                {[0.2, 0.4, 0.6, 0.8].map((ratio) => (
                  <line
                    key={ratio}
                    x1="0"
                    y1={height * ratio}
                    x2={width}
                    y2={height * ratio}
                    stroke="currentColor"
                    className="text-[#f0f3fa] dark:text-[#2a2e39]"
                    strokeDasharray="4 4"
                  />
                ))}

                {/* Area and Line */}
                <path d={areaD} fill="url(#chartGradient)" />
                <path
                  d={pathD}
                  fill="none"
                  stroke={isPositive ? '#089981' : '#f23645'}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Interactive cursor line */}
                {hoverIndex !== null && (
                  <>
                    <line
                      x1={points[hoverIndex].x}
                      y1="0"
                      x2={points[hoverIndex].x}
                      y2={height}
                      stroke="#2962ff"
                      strokeWidth="1.5"
                      strokeDasharray="3 3"
                    />
                    <circle
                      cx={points[hoverIndex].x}
                      cy={points[hoverIndex].y}
                      r="5"
                      fill="#2962ff"
                      stroke="#ffffff"
                      strokeWidth="2"
                    />
                  </>
                )}

                {/* Invisible hover capture slices */}
                {points.map((p, idx) => {
                  const sliceWidth = width / points.length;
                  return (
                    <rect
                      key={idx}
                      x={p.x - sliceWidth / 2}
                      y="0"
                      width={sliceWidth}
                      height={height}
                      fill="transparent"
                      className="cursor-crosshair"
                      onMouseEnter={() => setHoverIndex(idx)}
                    />
                  );
                })}
              </svg>
            </div>
          ) : (
            /* Candlestick simulation view */
            <div className="w-full h-64 sm:h-72 flex items-end justify-between gap-1 pt-4">
              {historyData.slice(-24).map((c, i) => {
                const candleIsUp = c.close >= c.open;
                const bodyTop = Math.max(c.open, c.close);
                const bodyBottom = Math.min(c.open, c.close);
                const heightPct = Math.max(2, ((bodyTop - bodyBottom) / priceRange) * 100);
                const bottomPct = Math.max(0, ((bodyBottom - minPrice) / priceRange) * 100);
                const wickTopPct = ((c.high - minPrice) / priceRange) * 100;
                const wickBottomPct = ((c.low - minPrice) / priceRange) * 100;

                return (
                  <div
                    key={i}
                    className="flex-1 h-full relative flex items-center justify-center cursor-pointer group"
                    title={`${c.time}: Open ${c.open} High ${c.high} Low ${c.low} Close ${c.close}`}
                  >
                    {/* Wick */}
                    <div
                      style={{ bottom: `${wickBottomPct}%`, height: `${wickTopPct - wickBottomPct}%` }}
                      className={`absolute w-[1.5px] ${candleIsUp ? 'bg-[#089981]' : 'bg-[#f23645]'}`}
                    />
                    {/* Candle Body */}
                    <div
                      style={{ bottom: `${bottomPct}%`, height: `${heightPct}%` }}
                      className={`absolute w-full rounded-xs ${
                        candleIsUp ? 'bg-[#089981]' : 'bg-[#f23645]'
                      }`}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Statistics & Technical Analysis Grid */}
        <div className="p-4 sm:p-6 border-t border-[#f0f3fa] dark:border-[#2a2e39] bg-[#fafbfd] dark:bg-[#171b26] grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Column 1: Key Statistics */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#787b86]">Key Statistics</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-[#787b86]">Day Range</span>
                <span className="font-semibold num-tabular">
                  ${dayLow.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} - ${dayHigh.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#787b86]">52-Week Range</span>
                <span className="font-semibold num-tabular">
                  {'range52W' in item && item.range52W ? item.range52W : '$120 - $220'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#787b86]">Volume</span>
                <span className="font-semibold num-tabular">
                  {'volume' in item && item.volume ? item.volume : '42.5M'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#787b86]">Market Cap</span>
                <span className="font-semibold num-tabular">
                  {'marketCap' in item && item.marketCap ? item.marketCap : '$2.1T'}
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Technical Rating Meter */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#787b86]">Technical Gauge</h4>
            <div className="p-3 bg-white dark:bg-[#1e222d] border border-[#e0e3eb] dark:border-[#2a2e39] rounded-xl text-center">
              <div className="text-xs text-[#787b86] mb-1">Oscillators &amp; Moving Averages</div>
              <div
                className={`text-base font-bold mb-2 ${
                  rating === 'Strong Buy'
                    ? 'text-[#2962ff]'
                    : rating === 'Buy'
                    ? 'text-[#089981]'
                    : rating === 'Neutral'
                    ? 'text-gray-500'
                    : 'text-[#f23645]'
                }`}
              >
                {rating}
              </div>

              {/* Gauge Bar */}
              <div className="h-2 w-full bg-gradient-to-r from-[#f23645] via-amber-400 to-[#089981] rounded-full relative">
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white border-2 border-black rounded-full shadow transition-all"
                  style={{
                    left:
                      rating === 'Strong Sell'
                        ? '10%'
                        : rating === 'Sell'
                        ? '28%'
                        : rating === 'Neutral'
                        ? '50%'
                        : rating === 'Buy'
                        ? '75%'
                        : '92%',
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-[#787b86] mt-1.5 font-medium">
                <span>Strong Sell</span>
                <span>Neutral</span>
                <span>Strong Buy</span>
              </div>
            </div>
          </div>

          {/* Column 3: Paper Trading Simulator */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#787b86]">Paper Order Execution</h4>
            <div className="p-3 bg-white dark:bg-[#1e222d] border border-[#e0e3eb] dark:border-[#2a2e39] rounded-xl space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#787b86]">Order Quantity</span>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => setTradeShares(Math.max(1, tradeShares - 5))}
                    className="w-6 h-6 rounded bg-[#f0f3fa] dark:bg-[#2a2e39] font-bold text-center"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-bold num-tabular">{tradeShares}</span>
                  <button
                    onClick={() => setTradeShares(tradeShares + 5)}
                    className="w-6 h-6 rounded bg-[#f0f3fa] dark:bg-[#2a2e39] font-bold text-center"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs font-medium text-[#787b86]">
                <span>Est. Total:</span>
                <span className="font-bold text-[#131722] dark:text-white num-tabular">
                  ${(tradeShares * item.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => handleTrade('buy')}
                  className="w-full py-2 bg-[#089981] hover:bg-[#067a67] text-white rounded-lg font-bold text-xs shadow-sm transition-all active:scale-[0.98]"
                >
                  BUY
                </button>
                <button
                  onClick={() => handleTrade('sell')}
                  className="w-full py-2 bg-[#f23645] hover:bg-[#c92533] text-white rounded-lg font-bold text-xs shadow-sm transition-all active:scale-[0.98]"
                >
                  SELL
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sector & Description footer if present */}
        {'description' in item && item.description && (
          <div className="px-6 py-4 border-t border-[#f0f3fa] dark:border-[#2a2e39] text-xs text-[#787b86] dark:text-[#868993] flex flex-col gap-1">
            {'sector' in item && item.sector && (
              <span className="font-semibold text-[#131722] dark:text-gray-300">{item.sector}</span>
            )}
            <p>{item.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};
