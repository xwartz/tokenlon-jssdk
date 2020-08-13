export declare type GasPriceAdaptor = 'safeLow' | 'average' | 'fast';
export declare const getGasPriceByAdaptor: (adaptor: GasPriceAdaptor) => Promise<string>;
export declare const getGasPriceAsync: (simpleOrder: any) => Promise<any>;
