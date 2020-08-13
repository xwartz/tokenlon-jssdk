import { GetTickerParams, Ticker, GetTickerHistoryParams, TickerHistoryItem, GetTradeCapParams, GetTradeCapResult, GetTradeCapHistoryParams, TradeCapHistoryItem } from './interface';
export declare const getPairs: () => Promise<string[]>;
export declare const getTicker: (params: GetTickerParams) => Promise<Ticker[]>;
export declare const getTickerHistory: (params: GetTickerHistoryParams) => Promise<TickerHistoryItem[]>;
export declare const getTradeCap: (params: GetTradeCapParams) => Promise<GetTradeCapResult>;
export declare const getTradeCapHistory: (params: GetTradeCapHistoryParams) => Promise<TradeCapHistoryItem[]>;
