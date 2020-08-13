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
var abi = require("ethereumjs-abi");
var utils_1 = require("./utils");
var cacheUtils_1 = require("./cacheUtils");
var constants_1 = require("../constants");
var config_1 = require("../config");
var balance_1 = require("./balance");
var sign_1 = require("./sign");
var gasPrice_1 = require("./gasPrice");
var nonce_1 = require("./nonce");
exports.getAllowanceAsync = function (symbol) { return __awaiter(_this, void 0, void 0, function () {
    var token, appConfig, walletAddress, allow;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, utils_1.getTokenBySymbolAsync(symbol)];
            case 1:
                token = _a.sent();
                return [4 /*yield*/, cacheUtils_1.getCachedAppConfig()];
            case 2:
                appConfig = _a.sent();
                walletAddress = config_1.getConfig().address;
                return [4 /*yield*/, utils_1.getTokenAllowance({
                        walletAddress: walletAddress,
                        contractAddress: token.contractAddress,
                        spenderAddress: appConfig.userProxyContractAddress,
                    })];
            case 3:
                allow = _a.sent();
                return [2 /*return*/, utils_1.fromDecimalToUnit(allow, token.decimal).toNumber()];
        }
    });
}); };
exports.isAllowanceEnoughAsync = function (symbol) { return __awaiter(_this, void 0, void 0, function () {
    var balance, allow;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, balance_1.getBalanceAsync(symbol)];
            case 1:
                balance = _a.sent();
                if (!balance)
                    return [2 /*return*/, false];
                return [4 /*yield*/, exports.getAllowanceAsync(symbol)];
            case 2:
                allow = _a.sent();
                return [2 /*return*/, allow >= balance];
        }
    });
}); };
var setTokenAllowanceAsync = function (params) { return __awaiter(_this, void 0, void 0, function () {
    var token, amountInBaseUnits, ownerAddress, spenderAddress, contractAddress, value, encoded, data, gasPrice, nonce, signParams, signResult, txHash;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = params.token, amountInBaseUnits = params.amountInBaseUnits, ownerAddress = params.ownerAddress, spenderAddress = params.spenderAddress;
                contractAddress = token.contractAddress;
                value = amountInBaseUnits.toString();
                encoded = abi.simpleEncode(constants_1.APPROVE_METHOD, spenderAddress, value);
                data = utils_1.addHexPrefix(encoded.toString('hex'));
                return [4 /*yield*/, gasPrice_1.getGasPriceAsync({ base: 'USDT', amount: 100 })];
            case 1:
                gasPrice = _a.sent();
                return [4 /*yield*/, nonce_1.getNonceWrap()];
            case 2:
                nonce = _a.sent();
                signParams = {
                    gasPrice: gasPrice,
                    gas: constants_1.APPROVE_GAS,
                    from: ownerAddress,
                    to: contractAddress,
                    contractAddress: contractAddress,
                    amount: 0,
                    decimal: 18,
                    nonce: nonce,
                    data: data,
                };
                signResult = sign_1.signTransaction(signParams);
                return [4 /*yield*/, utils_1.sendSignedTransaction(utils_1.addHexPrefix(signResult.sign))
                    // 交易发送成功后，缓存 nonce
                ];
            case 3:
                txHash = _a.sent();
                // 交易发送成功后，缓存 nonce
                nonce_1.cacheUsedNonce(nonce);
                return [2 /*return*/, txHash];
        }
    });
}); };
exports.setAllowanceAsync = function (symbol, amount) { return __awaiter(_this, void 0, void 0, function () {
    var address, token, appConfig;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                address = config_1.getConfig().address;
                return [4 /*yield*/, utils_1.getTokenBySymbolAsync(symbol)];
            case 1:
                token = _a.sent();
                return [4 /*yield*/, cacheUtils_1.getCachedAppConfig()];
            case 2:
                appConfig = _a.sent();
                return [2 /*return*/, setTokenAllowanceAsync({
                        token: token,
                        amountInBaseUnits: utils_1.fromUnitToDecimalBN(amount, token.decimal),
                        ownerAddress: address,
                        spenderAddress: appConfig.userProxyContractAddress,
                    })];
        }
    });
}); };
exports.setUnlimitedAllowanceAsync = function (symbol) { return __awaiter(_this, void 0, void 0, function () {
    var address, token, appConfig;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                address = config_1.getConfig().address;
                return [4 /*yield*/, utils_1.getTokenBySymbolAsync(symbol)];
            case 1:
                token = _a.sent();
                return [4 /*yield*/, cacheUtils_1.getCachedAppConfig()];
            case 2:
                appConfig = _a.sent();
                return [2 /*return*/, setTokenAllowanceAsync({
                        token: token,
                        amountInBaseUnits: utils_1.toBN(2).pow(256).minus(1),
                        ownerAddress: address,
                        spenderAddress: appConfig.userProxyContractAddress,
                    })];
        }
    });
}); };
exports.closeAllowanceAsync = function (symbol) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, exports.setAllowanceAsync(symbol, 0)];
    });
}); };
//# sourceMappingURL=allowance.js.map