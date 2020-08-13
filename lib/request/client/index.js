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
var _request_1 = require("../_request");
var utils_1 = require("../../utils/utils");
var config_1 = require("../../config");
var urls_1 = require("../../config/urls");
exports.getTradeTokenList = function () { return __awaiter(_this, void 0, void 0, function () {
    var tokens;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, _request_1.jsonrpc.get(urls_1.getExchangeUrl(), {}, 'tokenlon.getTradeTokenList', {})
                // 做处理 过滤跨链内容
            ];
            case 1:
                tokens = _a.sent();
                // 做处理 过滤跨链内容
                return [2 /*return*/, tokens.filter(function (t) {
                        t.opposites = t.opposites.join('_').replace(/(ATOM|EOS)/g, '').split('_').filter(function (str) { return !!str; });
                        return t.xChainType !== 'EOS' && t.xChainType !== 'COSMOS';
                    })];
        }
    });
}); };
var getTokenFromServer = function (_a) {
    var timestamp = _a.timestamp, signature = _a.signature;
    return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_b) {
            return [2 /*return*/, _request_1.jsonrpc.get(urls_1.getWebsocketUrl(), {}, 'auth.getSdkJwtToken', {
                    timestamp: timestamp,
                    signature: signature,
                })];
        });
    });
};
exports.getSdkJwtToken = function () { return __awaiter(_this, void 0, void 0, function () {
    var timestamp, signature;
    return __generator(this, function (_a) {
        timestamp = utils_1.getTimestamp();
        signature = config_1.getConfig().personalSignFn(timestamp.toString());
        return [2 /*return*/, getTokenFromServer({ timestamp: timestamp, signature: signature })];
    });
}); };
exports.getMobileAppConfig = function () {
    return _request_1.jsonrpc.get(urls_1.getExchangeUrl(), {}, 'tokenlon.getMobileAppConfig', {});
};
exports.placeOrder = function (params) {
    return _request_1.jsonrpc.get(urls_1.getExchangeUrl(), {}, 'tokenlon.placeOrder', params);
};
exports.getOrderState = function (executeTxHash) { return __awaiter(_this, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, _request_1.jsonrpc.get(urls_1.getExchangeUrl(), {}, 'tokenlon.getOrderState', {
                    executeTxHash: executeTxHash,
                })];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
exports.getOrdersHistory = function (params) { return __awaiter(_this, void 0, void 0, function () {
    var orders;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, _request_1.jsonrpc.get(urls_1.getExchangeUrl(), {}, 'tokenlon.getOrdersHistory', params)];
            case 1:
                orders = _a.sent();
                return [2 /*return*/, orders];
        }
    });
}); };
exports.getMarketPrice = function (symbol) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, _request_1.jsonrpc.get(urls_1.getTokenlonMarketUrl(), {}, 'api.getMarketPrice', {
                base: symbol,
                quote: 'USDT',
            })];
    });
}); };
//# sourceMappingURL=index.js.map