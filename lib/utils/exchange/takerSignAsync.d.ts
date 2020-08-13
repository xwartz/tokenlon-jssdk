import { BigNumber } from './0xv2-lib';
import { TokenlonMakerOrderBNToString } from '../../global';
interface SignedTakerData {
    executeTxHash: string;
    fillData: string;
    salt: BigNumber;
    signature: string;
}
/**
 * @author Xaber
 * @param orderHash
 * @param signerAddress
 */
export declare const ecSignOrderHash: (signerAddress: string, orderHash: string) => string;
export declare const takerSignAsync: (userAddr: string, makerOrder: TokenlonMakerOrderBNToString) => Promise<SignedTakerData>;
export {};
