export type TechnicalRating = 'Strong Buy' | 'Buy' | 'Neutral' | 'Sell' | 'Strong Sell';

export interface CandlePoint {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface MarketItem {
  id: string;
  symbol: string;
  name: string;
  exchange: string;
  price: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  open?: number;
  previousClose?: number;
  volume?: string;
  marketCap?: string;
  peRatio?: string;
  divYield?: string;
  range52W?: string;
  technicalRating: TechnicalRating;
  category: 'indices' | 'stocks' | 'crypto' | 'futures' | 'forex' | 'bonds' | 'etfs' | 'economy';
  country?: string;
  region?: 'Major' | 'Americas' | 'Europe' | 'Asia';
  badgeColor?: string;
  badgeTextColor?: string;
  badgeText?: string;
  sparkline: number[];
  candles?: CandlePoint[];
  description?: string;
  sector?: string;
}

export interface IndexOverviewCard {
  id: string;
  symbol: string;
  name: string;
  exchange: string;
  badgeText: string;
  badgeBg: string;
  price: number;
  change: number;
  changePercent: number;
  high?: number;
  low?: number;
  technicalRating?: TechnicalRating;
  sparklineSvgPath: string;
  sparklineFillPath: string;
  isPositive: boolean;
  history: CandlePoint[];
}

export type MainCategoryTab =
  | 'US stocks'
  | 'World stocks'
  | 'Crypto'
  | 'Futures'
  | 'Forex'
  | 'Government bonds'
  | 'Corporate bonds'
  | 'ETFs'
  | 'Economy';

export type USStocksFilter = 'Most active' | 'Gainers' | 'Losers';
export type WorldIndicesFilter = 'Major' | 'Americas' | 'Europe' | 'Asia';
export type ScreenView = 'overview' | 'heatmap' | 'screener' | 'economic-calendar';
