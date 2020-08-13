import BN from 'bignumber.js';
export declare const toBN: (x: any) => BN;
export declare const isBigNumber: (v: any) => boolean;
export declare const getTimestamp: () => number;
export declare const padLeft: (n: string, width: number, z?: string) => string;
export declare function isHexPrefixed(str: any): boolean;
export declare function addHexPrefix(str: string): string;
export declare function stripHexPrefix(str: string): string;
export declare function fromDecimalToUnit(balance: string | number | BN, decimal: number): BN;
export declare function fromUnitToDecimalBN(balance: string | number, decimal: number): BN;
export declare function fromUnitToDecimal(balance: string | number, decimal: number, base: number): string;
export declare function getTokenBalance(walletAddress: string, contractAddress: string): Promise<string>;
export interface GetTokenAllowanceParams {
    walletAddress: string;
    contractAddress: string;
    spenderAddress: string;
}
export declare function getTokenAllowance(params: GetTokenAllowanceParams): Promise<string>;
export declare function getEtherBalance(walletAddress: string): Promise<any>;
export declare function getNonce(address: string): Promise<number>;
export declare function getGasPrice(): Promise<BN>;
export declare function getEstimateGas(tx: {
    value: string;
    from: string;
    to: string;
    data: string;
}): Promise<number>;
export declare function getBlockNumber(): Promise<number>;
export declare function sendSignedTransaction(rawTx: any): Promise<string>;
interface Receipt {
    blockHash: string;
    blockNumber: number;
    transactionHash: string;
    transactionIndex: number;
    from: string;
    to: string;
    cumulativeGasUsed: number;
    gasUsed: number;
    contractAddress: string;
    logs: Array<object>;
    status?: undefined | null | string | 0 | 1;
}
export declare function getTransactionReceipt(hash: string): Promise<Receipt>;
export declare const isCompeletedTxAsync: (hash: string) => Promise<boolean>;
export declare function compareAddress(first: string, second: string): boolean;
export declare const getTokenBySymbolAsync: (symbol: any) => Promise<import("../global").TokenlonToken>;
export {};
