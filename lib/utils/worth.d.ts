import { SimpleOrder } from './trade';
export declare enum OrderWorthLevel {
    low = "low",
    middle = "middle",
    high = "high"
}
export declare const getSimpleOrderWorthLevel: (simpleOrder: SimpleOrder) => Promise<OrderWorthLevel>;
