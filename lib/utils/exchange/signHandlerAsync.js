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
var takerSignAsync_1 = require("./takerSignAsync");
var helper_1 = require("./helper");
var signFillOrderWithEthAsync_1 = require("./signFillOrderWithEthAsync");
var utils_1 = require("../utils");
var config_1 = require("../../config");
var cacheUtils_1 = require("../cacheUtils");
var gasPrice_1 = require("../gasPrice");
var sign_1 = require("../sign");
var constants_1 = require("../../constants");
var nonce_1 = require("../nonce");
exports.signHandlerAsync = function (params) { return __awaiter(_this, void 0, void 0, function () {
    var isMakerEth, makerOrder, simpleOrder, appConfig, userAddr, signedTakerData, resultOrder, result, gasPrice, nonce, data, amount, signResult, txHash, rawTx;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                isMakerEth = params.isMakerEth, makerOrder = params.makerOrder, simpleOrder = params.simpleOrder;
                return [4 /*yield*/, cacheUtils_1.getCachedAppConfig()];
            case 1:
                appConfig = _a.sent();
                userAddr = config_1.getConfig().address;
                return [4 /*yield*/, takerSignAsync_1.takerSignAsync(userAddr, makerOrder)];
            case 2:
                signedTakerData = _a.sent();
                resultOrder = helper_1.orderBNToString(__assign({}, makerOrder, { signedTxSalt: signedTakerData.salt, 
                    // 用于链上匹配交易
                    executeTxHash: signedTakerData.executeTxHash, signedTxData: signedTakerData.fillData, 
                    // taker 签名（交易签名）
                    takerWalletSignature: signedTakerData.signature }));
                result = null;
                if (!isMakerEth) return [3 /*break*/, 6];
                return [4 /*yield*/, gasPrice_1.getGasPriceAsync(simpleOrder)];
            case 3:
                gasPrice = _a.sent();
                return [4 /*yield*/, nonce_1.getNonceWrap()];
            case 4:
                nonce = _a.sent();
                data = signFillOrderWithEthAsync_1.getFillOrderWithETHData([signedTakerData.salt, signedTakerData.fillData, signedTakerData.signature]);
                amount = utils_1.fromDecimalToUnit(makerOrder.takerAssetAmount, 18).toString();
                return [4 /*yield*/, sign_1.signTransaction({
                        to: appConfig.tokenlonExchangeContractAddress,
                        amount: amount,
                        nonce: nonce,
                        data: data,
                        gas: constants_1.TOKENLON_FILLORDER_GAS,
                        gasPrice: gasPrice,
                    })];
            case 5:
                signResult = _a.sent();
                txHash = signResult.hash;
                rawTx = utils_1.addHexPrefix(signResult.sign);
                result = {
                    userAddr: config_1.getConfig().address,
                    order: resultOrder,
                    txHash: txHash,
                    rawTx: rawTx,
                    nonce: Number(nonce),
                    isMakerEth: isMakerEth,
                    signFillOrderWithEthResult: {
                        amount: amount,
                        signResult: signResult,
                    },
                };
                return [3 /*break*/, 7];
            case 6:
                result = {
                    userAddr: userAddr,
                    order: resultOrder,
                };
                _a.label = 7;
            case 7: return [2 /*return*/, result];
        }
    });
}); };
//# sourceMappingURL=signHandlerAsync.js.map