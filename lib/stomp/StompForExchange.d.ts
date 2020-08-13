export default class StompForExchange {
    stompClient: any;
    _path: any;
    _header: any;
    _callback: any;
    _subscribeName: any;
    tokenlonRateSubscription: any;
    userRateSubscription: any;
    newOrderSubscription: any;
    lastOrderSubscription: any;
    connecting: boolean;
    triedFailedTimes: number;
    connectInterrupt: boolean;
    private tryConnectStompAsync;
    connectStompAsync: () => Promise<void>;
    disconnectStomp: () => void;
    unSubscribeAll: () => void;
    private wsSubscribeJsonHelper;
    getSymbol: ({ base, quote }: {
        base: any;
        quote: any;
    }) => string;
    getNewOrder: ({ base, quote, side, amount, currency, userAddr, }: {
        base: any;
        quote: any;
        side: any;
        amount: any;
        currency: any;
        userAddr: any;
    }, callback: any) => void;
    getLastOrder: ({ base, quote, side, amount, currency, userAddr, }: {
        base: any;
        quote: any;
        side: any;
        amount: any;
        currency: any;
        userAddr: any;
    }, callback: any) => void;
}
