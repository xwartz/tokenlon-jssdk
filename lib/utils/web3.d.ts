declare type Handler = (web3: any) => Promise<any>;
export declare const web3RequestWrap: (handler: Handler) => Promise<any>;
export {};
