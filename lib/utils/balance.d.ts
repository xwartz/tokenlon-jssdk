export declare const getBalancesAsync: () => Promise<{
    symbol: string;
    balance: number;
}[]>;
export declare const getBalanceAsync: (symbol: string) => Promise<number>;
