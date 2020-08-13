import { PersonalSignFn, signRawTransactionFn } from '../../global';
export declare const genPersonalSign: (privateKey: string) => PersonalSignFn;
export interface SignRawTransactionFnParams {
    to: string;
    data: string;
    from: string;
    nonce: string;
    gasLimit: string;
    gasPrice: string;
    value: string;
}
export declare const genSignRawTransaction: (privateKey: string) => signRawTransactionFn;
