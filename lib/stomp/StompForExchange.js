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
Object.defineProperty(exports, "__esModule", { value: true });
var SockJS = require("sockjs-client");
var stomp_1 = require("stompjs/lib/stomp");
var cacheUtils_1 = require("../utils/cacheUtils");
var errors_1 = require("../utils/errors");
var urls_1 = require("../config/urls");
var MAX_TRIED_TIMES = 3;
var TRY_CONNECT_INTERVAL = 1000;
// 提供ws服务的端点名称
var endpoint = 'exchange';
var StompForExchange = /** @class */ (function () {
    function StompForExchange() {
        var _this = this;
        this.stompClient = null;
        this._path = null;
        this._header = null;
        this._callback = null;
        this._subscribeName = null;
        this.tokenlonRateSubscription = null;
        this.userRateSubscription = null;
        this.newOrderSubscription = null;
        this.lastOrderSubscription = null;
        this.connecting = false;
        this.triedFailedTimes = 0;
        // 避免页面退出后仍一直重连
        this.connectInterrupt = false;
        this.tryConnectStompAsync = function () { return __awaiter(_this, void 0, void 0, function () {
            var token, Authorization, host;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, cacheUtils_1.getCachedSdkJwtToken()];
                    case 1:
                        token = _a.sent();
                        Authorization = "JSSDK " + token;
                        host = urls_1.getWebsocketUrl().replace(/\/rpc$/, '');
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                try {
                                    var socket = new SockJS(host + "/" + endpoint + "?Authorization=" + encodeURIComponent(Authorization));
                                    _this.stompClient = stomp_1.Stomp.over(socket);
                                    _this.stompClient.debug = null;
                                    _this.stompClient.connect('', '', resolve, reject);
                                }
                                catch (e) {
                                    console.log('connect init error', e);
                                    reject(e);
                                }
                            })];
                }
            });
        }); };
        this.connectStompAsync = function () { return __awaiter(_this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.connectInterrupt) {
                            return [2 /*return*/];
                        }
                        if (this.connecting) {
                            throw errors_1.JSSDK_ERRORS.ALREADY_CONNETING;
                        }
                        if (this.triedFailedTimes >= MAX_TRIED_TIMES) {
                            throw errors_1.JSSDK_ERRORS.CONNECT_FAILED;
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 6]);
                        this.connecting = true;
                        return [4 /*yield*/, this.tryConnectStompAsync()];
                    case 2:
                        _a.sent();
                        this.triedFailedTimes = 0;
                        this.connecting = false;
                        return [3 /*break*/, 6];
                    case 3:
                        e_1 = _a.sent();
                        this.connecting = false;
                        this.triedFailedTimes += 1;
                        if (this.connectInterrupt) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, new Promise(function (resolve) {
                                setTimeout(resolve, TRY_CONNECT_INTERVAL);
                            })];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.connectStompAsync()];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.disconnectStomp = function () {
            _this.connectInterrupt = true;
            _this.tokenlonRateSubscription && _this.tokenlonRateSubscription.unsubscribe();
            _this.userRateSubscription && _this.userRateSubscription.unsubscribe();
            _this.newOrderSubscription && _this.newOrderSubscription.unsubscribe();
            _this.lastOrderSubscription && _this.lastOrderSubscription.unsubscribe();
            _this.stompClient && _this.stompClient.disconnect();
            _this.tokenlonRateSubscription = null;
            _this.newOrderSubscription = null;
            _this.lastOrderSubscription = null;
            _this.stompClient = null;
        };
        this.unSubscribeAll = function () {
            if (_this.stompClient) {
                ['tokenlonRateSubscription', 'userRateSubscription', 'newOrderSubscription', 'lastOrderSubscription'].forEach(function (subscribeName) {
                    if (_this[subscribeName]) {
                        _this[subscribeName].unsubscribe();
                    }
                });
            }
        };
        this.wsSubscribeJsonHelper = function (subscribeName, path, callback, header) {
            var cb = function (message) {
                try {
                    // first response is None, need to skip
                    if (message && message.body && message.body === 'None')
                        return;
                    var obj = JSON.parse(message.body);
                    callback(null, obj);
                }
                catch (e) {
                    console.log('path get message JSON.parse error', e);
                    callback(e, null);
                }
            };
            if (_this.stompClient) {
                _this.unSubscribeAll();
                _this._subscribeName = subscribeName;
                _this._path = path;
                _this._callback = callback;
                _this._header = header;
                try {
                    _this[subscribeName] = _this.stompClient.subscribe(path, cb, header);
                }
                catch (e) {
                    console.log("subscrible " + subscribeName + " " + path + " error", e);
                }
                return _this[subscribeName];
            }
        };
        this.getSymbol = function (_a) {
            var base = _a.base, quote = _a.quote;
            return base.toUpperCase() + "_" + quote.toUpperCase();
        };
        // /user/order/{symbol}/{side}/{amount}/{userAddr}
        this.getNewOrder = function (_a, callback) {
            var base = _a.base, quote = _a.quote, side = _a.side, amount = _a.amount, currency = _a.currency, userAddr = _a.userAddr;
            var symbol = _this.getSymbol({ base: base, quote: quote });
            var path = "/user/order/" + symbol + "/" + side.toUpperCase() + "/" + amount + "/" + userAddr;
            _this.wsSubscribeJsonHelper('newOrderSubscription', path, callback, currency ? { currency: currency } : {});
        };
        this.getLastOrder = function (_a, callback) {
            var base = _a.base, quote = _a.quote, side = _a.side, amount = _a.amount, currency = _a.currency, userAddr = _a.userAddr;
            var symbol = _this.getSymbol({ base: base, quote: quote });
            var path = "/user/lastOrder/" + symbol + "/" + side.toUpperCase() + "/" + amount + "/" + userAddr;
            _this.wsSubscribeJsonHelper('lastOrderSubscription', path, callback, currency ? { currency: currency } : {});
        };
    }
    return StompForExchange;
}());
exports.default = StompForExchange;
//# sourceMappingURL=StompForExchange.js.map