import { fn, TokenlonMakerOrderBNToString, TokenlonToken } from '../global';
import { SimpleOrder } from '../utils/trade';
export declare const setStompClient: () => void;
export interface UpdateRateAndPriceByStompParams {
    makerToken: TokenlonToken;
    takerToken: TokenlonToken;
    makerTokenAmountUnit: string;
    takerTokenAmountUnit: string;
    operateInputMode: 'maker' | 'taker';
}
export declare const setStompConnect: () => Promise<void>;
export declare const updateRateAndPriceByStomp: ({ base, quote, amount, side, }: SimpleOrder, callback: fn, isLastOrder?: boolean) => void;
export interface StompWsResult {
    exchangeable: boolean;
    order?: TokenlonMakerOrderBNToString;
    rate?: number;
    minAmount?: number;
    maxAmount?: number;
    message?: string;
    reason?: 'NO_DATA' | 'PERMIT_CHECK_FAILED' | 'SLP_FAILED';
}
export declare const getNewOrderAsync: ({ base, quote, amount, side, }: SimpleOrder) => Promise<StompWsResult>;
export declare const getLastOrderAsync: ({ base, quote, amount, side, }: SimpleOrder) => Promise<StompWsResult>;
export declare const disconnectStompClient: () => void;
export declare const unsubscribeStompClientAll: () => void;
