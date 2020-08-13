import { SignHandlerResult } from './interface';
export declare const placeOrderAsync: (params: SignHandlerResult) => Promise<import("../../request/client/interface").PlaceOrderResult | {
    txHash: string;
    success: boolean;
}>;
