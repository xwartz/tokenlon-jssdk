import { SimpleOrder } from '../trade';
import { SignHandlerResult } from './interface';
import { TokenlonMakerOrderBNToString } from '../../global';
export interface SignHandlerParams {
    isMakerEth?: boolean;
    simpleOrder: SimpleOrder;
    makerOrder: TokenlonMakerOrderBNToString;
}
export declare const signHandlerAsync: (params: SignHandlerParams) => Promise<SignHandlerResult>;
