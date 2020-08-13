import { SignTransactionResult } from '../../global';
interface ECSignature {
    v: number;
    r: string;
    s: string;
}
export declare const parseSignatureHexAsVRS: (signatureHex: string) => ECSignature;
export declare const parseSignatureHexAsRSV: (signatureHex: string) => ECSignature;
export interface SignTransactionParams {
    gas: number;
    gasPrice: number;
    to: string;
    data: string;
    nonce: number;
    amount: number | string;
}
export declare const signTransaction: (params: SignTransactionParams) => SignTransactionResult;
export {};
