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
var bignumber_js_1 = require("bignumber.js");
var _ = require("lodash");
var constants_1 = require("../constants");
var web3_1 = require("./web3");
var errors_1 = require("./errors");
var cacheUtils_1 = require("./cacheUtils");
bignumber_js_1.default.config({
    EXPONENTIAL_AT: 1000,
});
exports.toBN = function (x) {
    if (isNaN(Number(x)))
        return new bignumber_js_1.default(0);
    if (x instanceof bignumber_js_1.default)
        return x;
    if (typeof x === 'string') {
        if (x.indexOf('0x') === 0 || x.indexOf('-0x') === 0) {
            return new bignumber_js_1.default((x).replace('0x', ''), 16);
        }
    }
    return new bignumber_js_1.default(x);
};
exports.isBigNumber = function (v) {
    return v instanceof bignumber_js_1.default ||
        (v && v.isBigNumber === true) ||
        (v && v._isBigNumber === true) ||
        false;
};
exports.getTimestamp = function () { return Math.round(Date.now() / 1000); };
exports.padLeft = function (n, width, z) {
    var nz = z || '0';
    var nn = '' + n;
    return nn.length >= width ? nn : new Array(width - nn.length + 1).join(nz) + nn;
};
function isHexPrefixed(str) {
    return str.slice(0, 2) === '0x';
}
exports.isHexPrefixed = isHexPrefixed;
function addHexPrefix(str) {
    if (typeof str !== 'string') {
        return str;
    }
    return isHexPrefixed(str) ? str : "0x" + str;
}
exports.addHexPrefix = addHexPrefix;
function stripHexPrefix(str) {
    if (typeof str !== 'string') {
        return str;
    }
    return isHexPrefixed(str) ? str.slice(2) : str;
}
exports.stripHexPrefix = stripHexPrefix;
function fromDecimalToUnit(balance, decimal) {
    return exports.toBN(balance).dividedBy(Math.pow(10, decimal));
}
exports.fromDecimalToUnit = fromDecimalToUnit;
function fromUnitToDecimalBN(balance, decimal) {
    var amountBN = exports.toBN(balance || 0);
    var decimalBN = exports.toBN(10).pow(decimal);
    return amountBN.times(decimalBN);
}
exports.fromUnitToDecimalBN = fromUnitToDecimalBN;
function fromUnitToDecimal(balance, decimal, base) {
    return fromUnitToDecimalBN(balance, decimal).toString(base);
}
exports.fromUnitToDecimal = fromUnitToDecimal;
function getTokenBalance(walletAddress, contractAddress) {
    return web3_1.web3RequestWrap(function (web3) {
        return new Promise(function (resolve, reject) {
            var data = "0x" + constants_1.HEX_OF_BALANCE_OF + exports.padLeft(stripHexPrefix(walletAddress), 64);
            var params = { to: contractAddress, data: data };
            // console.log(`[web3 req] call params: ${JSON.stringify(params)}`)
            var method = web3.eth.call.bind(web3.eth);
            return method(params, function (err, value) {
                if (!err) {
                    var balance = value === '0x' ? '0' : exports.toBN(value).toString(10);
                    resolve(balance);
                }
                else {
                    console.warn(err);
                    reject(err);
                }
            });
        });
    });
}
exports.getTokenBalance = getTokenBalance;
function getTokenAllowance(params) {
    return web3_1.web3RequestWrap(function (web3) {
        var walletAddress = params.walletAddress, contractAddress = params.contractAddress, spenderAddress = params.spenderAddress;
        return new Promise(function (resolve, reject) {
            var data = "0x" + constants_1.HEX_OF_GET_ALLOWANCE + exports.padLeft(stripHexPrefix(walletAddress), 64) + exports.padLeft(stripHexPrefix(spenderAddress), 64);
            var params = { to: contractAddress, data: data };
            // console.log(`[web3 req] call params: ${JSON.stringify(params)}`)
            var method = web3.eth.call.bind(web3.eth);
            return method(params, function (err, value) {
                if (!err) {
                    var allowance = value === '0x' ? '0' : exports.toBN(value).toString(10);
                    resolve(allowance);
                }
                else {
                    console.warn(err);
                    reject(err);
                }
            });
        });
    });
}
exports.getTokenAllowance = getTokenAllowance;
function getEtherBalance(walletAddress) {
    return web3_1.web3RequestWrap(function (web3) {
        return new Promise(function (resolve, reject) {
            web3.eth.getBalance(walletAddress, function (err, result) {
                if (err)
                    return reject(err);
                resolve(exports.toBN(result).toString(10));
            });
        });
    });
}
exports.getEtherBalance = getEtherBalance;
function getNonce(address) {
    return web3_1.web3RequestWrap(function (web3) {
        return new Promise(function (resolve, reject) {
            web3.eth.getTransactionCount(address, function (err, nonce) {
                if (!err) {
                    resolve(nonce);
                }
                else {
                    reject(err);
                }
            });
        });
    });
}
exports.getNonce = getNonce;
function getGasPrice() {
    return web3_1.web3RequestWrap(function (web3) {
        return new Promise(function (resolve, reject) {
            web3.eth.getGasPrice(function (err, gasPriceBN) {
                if (!err) {
                    console.log("[web3 res] getGasPrice to string: " + gasPriceBN.toString(10));
                    resolve(gasPriceBN);
                }
                else {
                    reject(err);
                }
            });
        });
    });
}
exports.getGasPrice = getGasPrice;
function getEstimateGas(tx) {
    return web3_1.web3RequestWrap(function (web3) {
        return new Promise(function (resolve, reject) {
            console.log("[web3 req] estimateGas params: " + JSON.stringify(tx));
            web3.eth.estimateGas(tx, function (err, gas) {
                if (!err) {
                    resolve(gas);
                }
                else {
                    reject(err);
                }
            });
        });
    });
}
exports.getEstimateGas = getEstimateGas;
function getBlockNumber() {
    return web3_1.web3RequestWrap(function (web3) {
        return new Promise(function (resolve, reject) {
            web3.eth.getBlockNumber(function (err, blockNumber) {
                if (!err) {
                    resolve(blockNumber);
                }
                else {
                    reject(err);
                }
            });
        });
    });
}
exports.getBlockNumber = getBlockNumber;
function sendSignedTransaction(rawTx) {
    return web3_1.web3RequestWrap(function (web3) {
        return new Promise(function (resolve, reject) {
            // TODO: maybe there will be an error named 'Failed to check for transaction receipt'
            // https://github.com/ethereum/web3.js/issues/3145
            web3.eth.sendSignedTransaction(rawTx, function (err, txHash) {
                if (!err) {
                    resolve(txHash);
                }
                else {
                    reject(err);
                }
            });
        });
    });
}
exports.sendSignedTransaction = sendSignedTransaction;
// Returns the receipt of a transaction by transaction hash.
// Note That the receipt is not available for pending transactions.
function getTransactionReceipt(hash) {
    return web3_1.web3RequestWrap(function (web3) {
        return new Promise(function (resolve, reject) {
            web3.eth.getTransactionReceipt(hash, function (err, receipt) {
                if (!err) {
                    resolve(receipt);
                }
                else {
                    reject(err);
                }
            });
        });
    });
}
exports.getTransactionReceipt = getTransactionReceipt;
exports.isCompeletedTxAsync = function (hash) { return __awaiter(_this, void 0, void 0, function () {
    var receipt, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, getTransactionReceipt(hash)];
            case 1:
                receipt = _a.sent();
                return [2 /*return*/, receipt.blockNumber > 0];
            case 2:
                e_1 = _a.sent();
                return [2 /*return*/, false];
            case 3: return [2 /*return*/];
        }
    });
}); };
function compareAddress(first, second) {
    if (typeof first !== 'string' || typeof second !== 'string') {
        return false;
    }
    return addHexPrefix(first).toUpperCase() === addHexPrefix(second).toUpperCase();
}
exports.compareAddress = compareAddress;
exports.getTokenBySymbolAsync = function (symbol) { return __awaiter(_this, void 0, void 0, function () {
    var tokenList, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!symbol || !_.isString(symbol))
                    throw errors_1.JSSDK_ERRORS.PARAMS_ERROR;
                return [4 /*yield*/, cacheUtils_1.getCachedTokenList()];
            case 1:
                tokenList = _a.sent();
                token = tokenList.find(function (t) { return t.symbol.toUpperCase() === symbol.toUpperCase(); });
                if (!token)
                    throw errors_1.JSSDK_ERRORS.TOKEN_NOT_FOUND;
                return [2 /*return*/, token];
        }
    });
}); };
//# sourceMappingURL=utils.js.map