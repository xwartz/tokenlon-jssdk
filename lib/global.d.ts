export declare type fn = (...args: any[]) => any;
export declare type PersonalSignFn = (msg: string) => string;
export interface SignRawTransactionFnParams {
    to: string;
    data: string;
    from: string;
    nonce: string;
    gasLimit: string;
    gasPrice: string;
    value: string;
}
export declare type signRawTransactionFn = (rawTxData: SignRawTransactionFnParams) => string;
export interface IConfig {
    debug?: boolean;
    address: string;
    providerUrl: string;
    personalSignFn: PersonalSignFn;
    signRawTransactionFn: signRawTransactionFn;
}
export interface TokenlonConfig {
    networkId: number;
    erc20ProxyContractAddress: string;
    exchangeContractAddress: string;
    forwarderContractAddress: string;
    zrxContractAddress: string;
    tokenlonExchangeContractAddress: string;
    wethContractAddress: string;
    userProxyContractAddress: string;
}
export interface TokenlonToken {
    symbol: string;
    logo: string;
    contractAddress: string;
    decimal: number;
    maxTradeAmount?: number;
    minTradeAmount?: number;
    precision?: number;
    opposites?: string[];
}
export interface TokenlonMakerOrderBNToString {
    makerAddress: string;
    makerAssetAmount: string;
    makerAssetData: string;
    makerFee: string;
    takerAddress: string;
    takerAssetAmount: string;
    takerAssetData: string;
    takerFee: string;
    senderAddress: string;
    feeRecipientAddress: string;
    expirationTimeSeconds: string;
    exchangeAddress: string;
    salt: string;
    makerWalletSignature: string;
    quoteId: string;
    feeFactor: number;
}
export interface TokenlonOrderBNToString extends TokenlonMakerOrderBNToString {
    signedTxSalt: string;
    executeTxHash: string;
    signedTxData: string;
    takerWalletSignature: string;
}
export declare type SignTransactionResult = {
    sign: string;
    hash: string;
};
