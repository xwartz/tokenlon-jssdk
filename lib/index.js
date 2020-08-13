"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
require("babel-polyfill");
var config_1 = require("./config");
var market_1 = require("./request/market");
var client_1 = require("./request/client");
var cacheUtils_1 = require("./utils/cacheUtils");
var trade_1 = require("./utils/trade");
var gen_1 = require("./utils/sign/gen");
exports.genPersonalSign = gen_1.genPersonalSign;
exports.genSignRawTransaction = gen_1.genSignRawTransaction;
var balance_1 = require("./utils/balance");
var allowance_1 = require("./utils/allowance");
var JssdkClient = function (config) {
    config_1.setConfig(config);
    return {
        // 基础 market API
        getPairs: market_1.getPairs, getTicker: market_1.getTicker, getTickerHistory: market_1.getTickerHistory, getTradeCap: market_1.getTradeCap, getTradeCapHistory: market_1.getTradeCapHistory,
        // 使用缓存数据
        getTokens: cacheUtils_1.getCachedTokenList,
        getOrderState: client_1.getOrderState,
        getOrdersHistory: function (data) {
            return client_1.getOrdersHistory(__assign({}, data, { userAddr: config.address }));
        },
        // trade API
        getPrice: trade_1.getPrice,
        getQuote: trade_1.getQuote,
        trade: trade_1.trade,
        // balance API
        getBalance: balance_1.getBalanceAsync,
        getBalances: balance_1.getBalancesAsync,
        // allowance API
        getAllowance: allowance_1.getAllowanceAsync,
        isAllowanceEnough: allowance_1.isAllowanceEnoughAsync,
        setAllowance: allowance_1.setAllowanceAsync,
        setUnlimitedAllowance: allowance_1.setUnlimitedAllowanceAsync,
        closeAllowance: allowance_1.closeAllowanceAsync,
    };
};
JssdkClient.genPersonalSign = gen_1.genPersonalSign;
JssdkClient.genSignRawTransaction = gen_1.genSignRawTransaction;
exports.default = JssdkClient;
//# sourceMappingURL=index.js.map