import { TokenlonToken, TokenlonConfig } from '../global';
export declare const getCachedTokenList: () => Promise<TokenlonToken[]>;
export declare const getCachedAppConfig: () => Promise<TokenlonConfig>;
export declare const getCachedSdkJwtToken: () => Promise<string>;
