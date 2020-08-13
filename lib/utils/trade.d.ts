import { StompWsResult } from '../stomp/stompClient';
import { TokenlonMakerOrderBNToString } from '../global';
export interface SimpleOrder {
    base: string;
    quote: string;
    side: 'BUY' | 'SELL';
    amount: number;
}
export interface PriceResult {
    base: string;
    quote: string;
    side: 'BUY' | 'SELL';
    amount: number;
    quoteAmount: number;
    price: number;
    feeSymbol: string;
    feeAmount: number;
    transferTokenSymbol: string;
    transferTokenAmount: number;
    receiveTokenSymbol: string;
    receiveTokenAmount: number;
    priceExcludeFee: number;
    minAmount?: number;
    maxAmount?: number;
}
export interface QuoteResult extends PriceResult {
    timestamp: number;
    quoteId: string;
}
export declare const transformStompResultToQuoteResult: (simpleOrder: SimpleOrder, orderData: StompWsResult) => Promise<QuoteResult>;
export interface CachedQuoteData {
    simpleOrder: SimpleOrder;
    order: TokenlonMakerOrderBNToString;
    timestamp: number;
}
export declare const getPrice: (params: SimpleOrder) => Promise<PriceResult>;
/**
 * @note 不返回 order，返回一个新的数据结构，方便用户使用
 */
export declare const getQuote: (params: SimpleOrder) => Promise<QuoteResult>;
export interface TradeResult {
    success: boolean;
    executeTxHash: string;
    txHash?: string;
}
/**
 * @note 通过 quoteId 找到本地缓存的订单，签名、上链（ETH）、挂单
 */
export declare const trade: (quoteId: string) => Promise<TradeResult>;
