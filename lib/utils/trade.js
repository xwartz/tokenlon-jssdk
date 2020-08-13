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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var cacheUtils_1 = require("./cacheUtils");
var errors_1 = require("./errors");
var stompClient_1 = require("../stomp/stompClient");
var utils_1 = require("./utils");
var signHandlerAsync_1 = require("./exchange/signHandlerAsync");
var placeOrderAsync_1 = require("./exchange/placeOrderAsync");
var nonce_1 = require("./nonce");
/**
 * @note  初步判断该 币对 是否支持，数量是否满足 imToken 系统默认最大最小代币交易配置
 */
var checkTradeSupported = function (_a) {
    var base = _a.base, quote = _a.quote, amount = _a.amount;
    return __awaiter(_this, void 0, void 0, function () {
        var tokenList, baseToken, quoteTokenExist;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, cacheUtils_1.getCachedTokenList()];
                case 1:
                    tokenList = _b.sent();
                    baseToken = tokenList.find(function (t) { return t.symbol && base && t.symbol.toUpperCase() === base.toUpperCase(); });
                    if (!baseToken)
                        throw errors_1.JSSDK_ERRORS.UNSUPPORTED_TRADE_PAIR;
                    quoteTokenExist = baseToken.opposites && baseToken.opposites.some(function (s) { return s && s.toUpperCase() === quote.toUpperCase(); });
                    if (!quoteTokenExist) {
                        throw errors_1.JSSDK_ERRORS.UNSUPPORTED_TRADE_PAIR;
                    }
                    if (baseToken.minTradeAmount && +amount < baseToken.minTradeAmount) {
                        throw errors_1.JSSDK_ERRORS.LESS_THAN_SYSTEM_MIN_TRADE_AMOUNT;
                    }
                    if (baseToken.maxTradeAmount && +amount > baseToken.maxTradeAmount) {
                        throw errors_1.JSSDK_ERRORS.GREATER_THAN_SYSTEM_MAX_TRADE_AMOUNT;
                    }
                    return [2 /*return*/];
            }
        });
    });
};
var checkStompWsResult = function (amount, result) {
    var exchangeable = result.exchangeable, order = result.order, minAmount = result.minAmount, maxAmount = result.maxAmount, reason = result.reason;
    if (reason) {
        throw reason;
    }
    // 做市商的 message 比较随意，不放出来了
    // if (message) {
    //   throw message
    // }
    if (minAmount && +amount < minAmount) {
        throw errors_1.JSSDK_ERRORS.LESS_THAN_MM_MIN_TRADE_AMOUNT;
    }
    if (maxAmount && +amount > maxAmount) {
        throw errors_1.JSSDK_ERRORS.GREATER_THAN_MM_MAX_TRADE_AMOUNT;
    }
    if (!exchangeable) {
        throw errors_1.JSSDK_ERRORS.CAN_NOT_RESOLVE_EXCHANGE;
    }
    if (!order) {
        throw errors_1.JSSDK_ERRORS.NO_DATA_RESPONSED;
    }
};
var transformStompResultToPriceResult = function (simpleOrder, orderData) { return __awaiter(_this, void 0, void 0, function () {
    var amount, base, quote, side, order, minAmount, maxAmount, tokenList, baseToken, quoteToken, makerToken, takerToken, makerTokenAmountUnit, takerTokenAmountUnit, feeToken, feeAmount, transferToken, receiveToken, quoteAssetAmountUnit, receiveTokenAmountUnit, transferTokenAmountUnit, priceExcludeFee, price;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                amount = simpleOrder.amount, base = simpleOrder.base, quote = simpleOrder.quote, side = simpleOrder.side;
                order = orderData.order, minAmount = orderData.minAmount, maxAmount = orderData.maxAmount;
                return [4 /*yield*/, cacheUtils_1.getCachedTokenList()];
            case 1:
                tokenList = _a.sent();
                baseToken = tokenList.find(function (t) { return t.symbol && base && t.symbol.toUpperCase() === base.toUpperCase(); });
                quoteToken = tokenList.find(function (t) { return t.symbol && quote && t.symbol.toUpperCase() === quote.toUpperCase(); });
                makerToken = side === 'BUY' ? baseToken : quoteToken;
                takerToken = side === 'BUY' ? quoteToken : baseToken;
                makerTokenAmountUnit = utils_1.fromDecimalToUnit(order.makerAssetAmount, makerToken.decimal).toNumber();
                takerTokenAmountUnit = utils_1.fromDecimalToUnit(order.takerAssetAmount, takerToken.decimal).toNumber();
                feeToken = makerToken;
                feeAmount = utils_1.toBN(makerTokenAmountUnit).times(order.feeFactor).dividedBy(10000).toNumber();
                transferToken = takerToken;
                receiveToken = makerToken;
                quoteAssetAmountUnit = null;
                receiveTokenAmountUnit = null;
                transferTokenAmountUnit = null;
                priceExcludeFee = null;
                price = null;
                // 用户买
                // base => order makerToken => user receiveToken => feeToken
                // quote => order takerToken => user transferToken
                if (side === 'BUY') {
                    transferTokenAmountUnit = takerTokenAmountUnit;
                    receiveTokenAmountUnit = utils_1.toBN(makerTokenAmountUnit).minus(feeAmount).toNumber();
                    priceExcludeFee = utils_1.toBN(transferTokenAmountUnit).dividedBy(receiveTokenAmountUnit).toNumber();
                    // price 需要和 （做市商）的 order price 匹配
                    price = utils_1.toBN(takerTokenAmountUnit).dividedBy(makerTokenAmountUnit).toNumber();
                    // 所见即所得功能影响
                    quoteAssetAmountUnit = price * amount;
                    // 用户卖
                    // base => order takerToken => user transferToken
                    // quote => order makerToken => user receiveToken => feeToken
                }
                else {
                    quoteAssetAmountUnit = makerTokenAmountUnit;
                    transferTokenAmountUnit = takerTokenAmountUnit;
                    receiveTokenAmountUnit = utils_1.toBN(makerTokenAmountUnit).minus(feeAmount).toNumber();
                    priceExcludeFee = utils_1.toBN(receiveTokenAmountUnit).dividedBy(transferTokenAmountUnit).toNumber();
                    // price 需要和 （做市商）的 order price 匹配
                    price = utils_1.toBN(makerTokenAmountUnit).dividedBy(takerTokenAmountUnit).toNumber();
                }
                return [2 /*return*/, {
                        base: base,
                        quote: quote,
                        side: side,
                        amount: amount,
                        quoteAmount: quoteAssetAmountUnit,
                        price: price,
                        feeSymbol: feeToken.symbol,
                        feeAmount: feeAmount,
                        transferTokenSymbol: transferToken.symbol,
                        transferTokenAmount: transferTokenAmountUnit,
                        receiveTokenSymbol: receiveToken.symbol,
                        receiveTokenAmount: receiveTokenAmountUnit,
                        priceExcludeFee: priceExcludeFee,
                        minAmount: minAmount,
                        maxAmount: maxAmount,
                    }];
        }
    });
}); };
exports.transformStompResultToQuoteResult = function (simpleOrder, orderData) { return __awaiter(_this, void 0, void 0, function () {
    var order, priceResult;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                order = orderData.order;
                return [4 /*yield*/, transformStompResultToPriceResult(simpleOrder, orderData)];
            case 1:
                priceResult = _a.sent();
                return [2 /*return*/, __assign({}, priceResult, { quoteId: order.quoteId, timestamp: utils_1.getTimestamp() })];
        }
    });
}); };
// 缓存 order
var cachedQuoteDatas = [];
var handleCachedQuoteDatas = function (simpleOrder, order) {
    var now = utils_1.getTimestamp();
    // 订单在 10s 内，保留；超过 10s，移除
    cachedQuoteDatas = cachedQuoteDatas.filter(function (o) {
        return o.timestamp > now - 10;
    });
    if (order) {
        cachedQuoteDatas.push({
            simpleOrder: simpleOrder,
            order: order,
            timestamp: now,
        });
    }
    return cachedQuoteDatas;
};
exports.getPrice = function (params) { return __awaiter(_this, void 0, void 0, function () {
    var base, quote, amount, newOrderData, priceResult;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                base = params.base, quote = params.quote, amount = params.amount;
                return [4 /*yield*/, checkTradeSupported({ base: base, quote: quote, amount: amount })];
            case 1:
                _a.sent();
                stompClient_1.setStompClient();
                return [4 /*yield*/, stompClient_1.setStompConnect()];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                _a.trys.push([3, , 6, 7]);
                return [4 /*yield*/, stompClient_1.getNewOrderAsync(params)];
            case 4:
                newOrderData = _a.sent();
                checkStompWsResult(amount, newOrderData);
                return [4 /*yield*/, transformStompResultToPriceResult(params, newOrderData)];
            case 5:
                priceResult = _a.sent();
                return [2 /*return*/, priceResult];
            case 6:
                // 断开连接
                stompClient_1.unsubscribeStompClientAll();
                stompClient_1.disconnectStompClient();
                return [7 /*endfinally*/];
            case 7: return [2 /*return*/];
        }
    });
}); };
/**
 * @note 不返回 order，返回一个新的数据结构，方便用户使用
 */
exports.getQuote = function (params) { return __awaiter(_this, void 0, void 0, function () {
    var base, quote, amount, newOrderData, lastOrderData, quoteResult;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                base = params.base, quote = params.quote, amount = params.amount;
                return [4 /*yield*/, checkTradeSupported({ base: base, quote: quote, amount: amount })];
            case 1:
                _a.sent();
                stompClient_1.setStompClient();
                return [4 /*yield*/, stompClient_1.setStompConnect()];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                _a.trys.push([3, , 7, 8]);
                return [4 /*yield*/, stompClient_1.getNewOrderAsync(params)];
            case 4:
                newOrderData = _a.sent();
                checkStompWsResult(amount, newOrderData);
                return [4 /*yield*/, stompClient_1.getLastOrderAsync(params)];
            case 5:
                lastOrderData = _a.sent();
                checkStompWsResult(amount, lastOrderData);
                return [4 /*yield*/, exports.transformStompResultToQuoteResult(params, lastOrderData)];
            case 6:
                quoteResult = _a.sent();
                handleCachedQuoteDatas(params, lastOrderData.order);
                return [2 /*return*/, quoteResult];
            case 7:
                // 断开连接
                stompClient_1.unsubscribeStompClientAll();
                stompClient_1.disconnectStompClient();
                return [7 /*endfinally*/];
            case 8: return [2 /*return*/];
        }
    });
}); };
/**
 * @note 通过 quoteId 找到本地缓存的订单，签名、上链（ETH）、挂单
 */
exports.trade = function (quoteId) { return __awaiter(_this, void 0, void 0, function () {
    var cachedQuoteData, _a, base, quote, side, upperCasedSide, userOutTokenSymbol, isMakerEth, signedResult, placeOrderResult;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                cachedQuoteData = cachedQuoteDatas.find(function (item) { return item.order && item.order.quoteId.toUpperCase() === quoteId.toUpperCase(); });
                if (!cachedQuoteData || !cachedQuoteData.order) {
                    throw errors_1.JSSDK_ERRORS.INVALID_QUOTE_ID_PARAM;
                }
                if (cachedQuoteData.timestamp < utils_1.getTimestamp() - 10) {
                    throw errors_1.JSSDK_ERRORS.QUOTE_DATA_10S_EXPIRED;
                }
                _a = cachedQuoteData.simpleOrder, base = _a.base, quote = _a.quote, side = _a.side;
                upperCasedSide = side.toUpperCase();
                userOutTokenSymbol = upperCasedSide === 'SELL' ? base : quote;
                isMakerEth = userOutTokenSymbol === 'ETH';
                return [4 /*yield*/, signHandlerAsync_1.signHandlerAsync({
                        simpleOrder: cachedQuoteData.simpleOrder,
                        makerOrder: cachedQuoteData.order,
                        isMakerEth: isMakerEth,
                    })];
            case 1:
                signedResult = _b.sent();
                return [4 /*yield*/, placeOrderAsync_1.placeOrderAsync(__assign({}, signedResult, { isMakerEth: isMakerEth }))
                    // 交易发送成功后，缓存 nonce
                ];
            case 2:
                placeOrderResult = _b.sent();
                // 交易发送成功后，缓存 nonce
                nonce_1.cacheUsedNonce(signedResult.nonce);
                return [2 /*return*/, __assign({}, placeOrderResult, { executeTxHash: signedResult.order.executeTxHash })];
        }
    });
}); };
//# sourceMappingURL=trade.js.map