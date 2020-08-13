import 'babel-polyfill';
import { IConfig } from './global';
import { genPersonalSign, genSignRawTransaction } from './utils/sign/gen';
declare const JssdkClient: {
    (config: IConfig): {
        getPairs: () => Promise<string[]>;
        getTicker: (params: import("./request/market/interface").GetTickerParams) => Promise<import("./request/market/interface").Ticker[]>;
        getTickerHistory: (params: import("./request/market/interface").GetTickerHistoryParams) => Promise<import("./request/market/interface").TickerHistoryItem[]>;
        getTradeCap: (params: import("./request/market/interface").GetTradeCapParams) => Promise<import("./request/market/interface").GetTradeCapResult>;
        getTradeCapHistory: (params: import("./request/market/interface").GetTradeCapHistoryParams) => Promise<import("./request/market/interface").TradeCapHistoryItem[]>;
        getTokens: () => Promise<import("./global").TokenlonToken[]>;
        getOrderState: (executeTxHash: string) => Promise<import("./request/client/interface").GetOrderStateResult>;
        getOrdersHistory(data: any): Promise<any>;
        getPrice: (params: import("./utils/trade").SimpleOrder) => Promise<import("./utils/trade").PriceResult>;
        getQuote: (params: import("./utils/trade").SimpleOrder) => Promise<import("./utils/trade").QuoteResult>;
        trade: (quoteId: string) => Promise<import("./utils/trade").TradeResult>;
        getBalance: (symbol: string) => Promise<number>;
        getBalances: () => Promise<{
            symbol: string;
            balance: number;
        }[]>;
        getAllowance: (symbol: any) => Promise<number>;
        isAllowanceEnough: (symbol: any) => Promise<boolean>;
        setAllowance: (symbol: any, amount: any) => Promise<string>;
        setUnlimitedAllowance: (symbol: any) => Promise<string>;
        closeAllowance: (symbol: any) => Promise<string>;
    };
    genPersonalSign: (privateKey: string) => import("./global").PersonalSignFn;
    genSignRawTransaction: (privateKey: string) => import("./global").signRawTransactionFn;
};
export { genPersonalSign, genSignRawTransaction };
export default JssdkClient;
