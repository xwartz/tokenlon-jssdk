"use strict";
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
var index_1 = require("./index");
var utils_1 = require("./utils/utils");
var jssdkClient = index_1.default({
    debug: true,
    address: '',
    personalSignFn: index_1.default.genPersonalSign(''),
    signRawTransactionFn: index_1.default.genSignRawTransaction(''),
    providerUrl: 'https://kovan.infura.io/v3/bf419bb938be4ce18c712080e90c2a26',
});
var testRun = function () { return __awaiter(_this, void 0, void 0, function () {
    var now, pairs, ticker, tickerHistory, tradeCap, tradeCapHistory, tokens, orderState, ordersHistory, balance, balances, allowance, isAllowanceEnough, allowanceTx, closeAllowanceTx, e_1, unlimitedAllowanceTx, priceResult, quoteResult, tradeResult;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                now = utils_1.getTimestamp();
                return [4 /*yield*/, jssdkClient.getPairs()];
            case 1:
                pairs = _a.sent();
                console.log('pairs', pairs);
                return [4 /*yield*/, jssdkClient.getTicker({
                        pairs: 'ETH_USDT',
                        period: '1M',
                    })];
            case 2:
                ticker = _a.sent();
                console.log('ticker', ticker);
                return [4 /*yield*/, jssdkClient.getTickerHistory({
                        pairs: 'KNC_ETH',
                        beginTimestamp: now - 86400 * 30,
                        endTimestamp: now,
                    })];
            case 3:
                tickerHistory = _a.sent();
                console.log('tickerHistory', tickerHistory);
                return [4 /*yield*/, jssdkClient.getTradeCap({
                        currency: 'USD',
                        period: '24H',
                    })];
            case 4:
                tradeCap = _a.sent();
                console.log('tradeCap', tradeCap);
                return [4 /*yield*/, jssdkClient.getTradeCapHistory({
                        currency: 'USD',
                        beginTimestamp: now - 86400 * 7,
                        endTimestamp: now,
                    })];
            case 5:
                tradeCapHistory = _a.sent();
                console.log('tradeCapHistory', tradeCapHistory);
                return [4 /*yield*/, jssdkClient.getTokens()];
            case 6:
                tokens = _a.sent();
                console.log('tokens', tokens);
                return [4 /*yield*/, jssdkClient.getOrderState('0x21755702165de6d55dbab44eeb92d3d4a31a8182ee315c50f86c5db790fdd4fd')];
            case 7:
                orderState = _a.sent();
                console.log('orderState', orderState);
                return [4 /*yield*/, jssdkClient.getOrdersHistory({
                        page: 1,
                        perpage: 10,
                    })];
            case 8:
                ordersHistory = _a.sent();
                console.log('ordersHistory', ordersHistory);
                return [4 /*yield*/, jssdkClient.getBalance('ETH')];
            case 9:
                balance = _a.sent();
                console.log('balance', balance);
                return [4 /*yield*/, jssdkClient.getBalances()];
            case 10:
                balances = _a.sent();
                console.log('balances', balances);
                return [4 /*yield*/, jssdkClient.getAllowance('KNC')];
            case 11:
                allowance = _a.sent();
                console.log('allowance', allowance);
                return [4 /*yield*/, jssdkClient.isAllowanceEnough('KNC')];
            case 12:
                isAllowanceEnough = _a.sent();
                console.log('isAllowanceEnough', isAllowanceEnough);
                return [4 /*yield*/, jssdkClient.setAllowance('KNC', 100)];
            case 13:
                allowanceTx = _a.sent();
                console.log('allowanceTx', allowanceTx);
                _a.label = 14;
            case 14:
                _a.trys.push([14, 16, , 17]);
                return [4 /*yield*/, jssdkClient.closeAllowance('KNC')];
            case 15:
                closeAllowanceTx = _a.sent();
                console.log('closeAllowanceTx', closeAllowanceTx);
                return [3 /*break*/, 17];
            case 16:
                e_1 = _a.sent();
                console.log('closeAllowanceTx nonce conflict', e_1);
                return [3 /*break*/, 17];
            case 17: return [4 /*yield*/, new Promise(function (resolve) {
                    console.log('wait 30s');
                    setTimeout(resolve, 30 * 1000);
                })];
            case 18:
                _a.sent();
                return [4 /*yield*/, jssdkClient.setUnlimitedAllowance('KNC')];
            case 19:
                unlimitedAllowanceTx = _a.sent();
                console.log('unlimitedAllowanceTx', unlimitedAllowanceTx);
                return [4 /*yield*/, new Promise(function (resolve) {
                        console.log('wait 30s');
                        setTimeout(resolve, 30 * 1000);
                    })];
            case 20:
                _a.sent();
                return [4 /*yield*/, jssdkClient.getPrice({
                        base: 'ETH',
                        quote: 'KNC',
                        side: 'BUY',
                        amount: 0.011,
                    })];
            case 21:
                priceResult = _a.sent();
                console.log('getPrice result', priceResult);
                return [4 /*yield*/, jssdkClient.getQuote({
                        base: 'ETH',
                        quote: 'KNC',
                        side: 'BUY',
                        amount: 0.011,
                    })];
            case 22:
                quoteResult = _a.sent();
                console.log('getQuote result', quoteResult);
                console.log('getQuote usedTimestamp', utils_1.getTimestamp() - now, 's');
                return [4 /*yield*/, jssdkClient.trade(quoteResult.quoteId)];
            case 23:
                tradeResult = _a.sent();
                console.log('tradeResult', tradeResult);
                return [2 /*return*/];
        }
    });
}); };
testRun();
//# sourceMappingURL=test.js.map