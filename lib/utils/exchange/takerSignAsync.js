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
var _0xv2_lib_1 = require("./0xv2-lib");
var ethUtil = require("ethereumjs-util");
var _ = require("lodash");
var encodeData2_1 = require("./abi/encodeData2");
var helper_1 = require("./helper");
var config_1 = require("../../config");
var cacheUtils_1 = require("../cacheUtils");
var sign_1 = require("../sign");
var fillOrKillOrderTx = function (signedMakerOrder) {
    var o = helper_1.orderBNToString(signedMakerOrder);
    return encodeData2_1.encodeData('exchangeV2', 'fillOrKillOrder', [o, o.takerAssetAmount.toString(), o.signature]);
};
var translateMakerOrder = function (makerOrder) {
    var makerAddress = makerOrder.makerAddress, makerAssetAmount = makerOrder.makerAssetAmount, makerAssetData = makerOrder.makerAssetData, makerFee = makerOrder.makerFee, takerAddress = makerOrder.takerAddress, takerAssetAmount = makerOrder.takerAssetAmount, takerAssetData = makerOrder.takerAssetData, takerFee = makerOrder.takerFee, senderAddress = makerOrder.senderAddress, feeRecipientAddress = makerOrder.feeRecipientAddress, expirationTimeSeconds = makerOrder.expirationTimeSeconds, exchangeAddress = makerOrder.exchangeAddress, salt = makerOrder.salt, makerWalletSignature = makerOrder.makerWalletSignature;
    return helper_1.orderStringToBN({
        makerAddress: makerAddress, makerAssetAmount: makerAssetAmount, makerAssetData: makerAssetData, makerFee: makerFee,
        takerAddress: takerAddress, takerAssetAmount: takerAssetAmount, takerAssetData: takerAssetData, takerFee: takerFee,
        senderAddress: senderAddress, feeRecipientAddress: feeRecipientAddress, expirationTimeSeconds: expirationTimeSeconds,
        exchangeAddress: exchangeAddress, salt: salt, signature: makerWalletSignature,
    });
};
/**
 * @author Xaber
 * @param orderHash
 * @param signerAddress
 */
exports.ecSignOrderHash = function (signerAddress, orderHash) {
    var msgHashHex = orderHash;
    var normalizedSignerAddress = signerAddress.toLowerCase();
    var prefixedMsgHashHex = _0xv2_lib_1.signatureUtils.addSignedMessagePrefix(orderHash);
    var signature = config_1.getConfig().personalSignFn(msgHashHex);
    // HACK: There is no consensus on whether the signatureHex string should be formatted as
    // v + r + s OR r + s + v, and different clients (even different versions of the same client)
    // return the signature params in different orders. In order to support all client implementations,
    // we parse the signature in both ways, and evaluate if either one is a valid signature.
    // r + s + v is the most prevalent format from eth_sign, so we attempt this first.
    // tslint:disable-next-line:custom-no-magic-numbers
    var validVParamValues = [27, 28];
    var ecSignatureRSV = sign_1.parseSignatureHexAsRSV(signature);
    if (_.includes(validVParamValues, ecSignatureRSV.v)) {
        var isValidRSVSignature = _0xv2_lib_1.signatureUtils.isValidECSignature(prefixedMsgHashHex, ecSignatureRSV, normalizedSignerAddress);
        if (isValidRSVSignature) {
            var convertedSignatureHex = _0xv2_lib_1.signatureUtils.convertECSignatureToSignatureHex(ecSignatureRSV);
            return convertedSignatureHex;
        }
    }
    var ecSignatureVRS = sign_1.parseSignatureHexAsVRS(signature);
    if (_.includes(validVParamValues, ecSignatureVRS.v)) {
        var isValidVRSSignature = _0xv2_lib_1.signatureUtils.isValidECSignature(prefixedMsgHashHex, ecSignatureVRS, normalizedSignerAddress);
        if (isValidVRSSignature) {
            var convertedSignatureHex = _0xv2_lib_1.signatureUtils.convertECSignatureToSignatureHex(ecSignatureVRS);
            return convertedSignatureHex;
        }
    }
    throw new Error('InvalidSignature');
};
exports.takerSignAsync = function (userAddr, makerOrder) { return __awaiter(_this, void 0, void 0, function () {
    var appConfig, receiverAddr, signedMakerOrder, fillData, takerTransactionSalt, executeTxHash, hash, takerSignatureHex, walletSign, takerWalletSignatureHex;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, cacheUtils_1.getCachedAppConfig()
                // use current wallet address as receiverAddr
            ];
            case 1:
                appConfig = _a.sent();
                receiverAddr = userAddr;
                signedMakerOrder = translateMakerOrder(makerOrder);
                fillData = fillOrKillOrderTx(signedMakerOrder);
                takerTransactionSalt = _0xv2_lib_1.generatePseudoRandomSalt();
                executeTxHash = _0xv2_lib_1.getTransactionHex(appConfig.exchangeContractAddress, fillData, takerTransactionSalt, signedMakerOrder.takerAddress);
                hash = ethUtil.bufferToHex(Buffer.concat([
                    ethUtil.toBuffer(executeTxHash),
                    ethUtil.toBuffer(receiverAddr),
                ]));
                return [4 /*yield*/, exports.ecSignOrderHash(userAddr, hash)];
            case 2:
                takerSignatureHex = _a.sent();
                walletSign = ethUtil.bufferToHex(Buffer.concat([
                    ethUtil.toBuffer(takerSignatureHex).slice(0, 65),
                    ethUtil.toBuffer(receiverAddr),
                ]));
                takerWalletSignatureHex = _0xv2_lib_1.signatureUtils.convertToSignatureWithType(walletSign, _0xv2_lib_1.SignatureType.Wallet);
                return [2 /*return*/, {
                        executeTxHash: executeTxHash,
                        fillData: fillData,
                        salt: takerTransactionSalt,
                        signature: takerWalletSignatureHex,
                    }];
        }
    });
}); };
//# sourceMappingURL=takerSignAsync.js.map