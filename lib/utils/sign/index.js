"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ethUtil = require("ethereumjs-util");
var web3_utils_1 = require("web3-utils");
var utils_1 = require("../utils");
var config_1 = require("../../config");
// cp from https://github.com/0xProject/0x.js/blob/4d61d56639ad70b13245ca25047c6f299e746393/packages/0x.js/src/utils/signature_utils.ts
exports.parseSignatureHexAsVRS = function (signatureHex) {
    var signatureBuffer = ethUtil.toBuffer(signatureHex);
    var v = signatureBuffer[0];
    if (v < 27) {
        v += 27;
    }
    var r = signatureBuffer.slice(1, 33);
    var s = signatureBuffer.slice(33, 65);
    var ecSignature = {
        v: v,
        r: ethUtil.bufferToHex(r),
        s: ethUtil.bufferToHex(s),
    };
    return ecSignature;
};
// cp from https://github.com/0xProject/0x.js/blob/4d61d56639ad70b13245ca25047c6f299e746393/packages/0x.js/src/utils/signature_utils.ts
exports.parseSignatureHexAsRSV = function (signatureHex) {
    var _a = ethUtil.fromRpcSig(signatureHex), v = _a.v, r = _a.r, s = _a.s;
    var ecSignature = {
        v: v,
        r: ethUtil.bufferToHex(r),
        s: ethUtil.bufferToHex(s),
    };
    return ecSignature;
};
// use ethereumjs-tx and web3.eth.sendSignedTransaction to send transaction by privateKey
// value must be a decimal processed number
exports.signTransaction = function (params) {
    var gasPrice = params.gasPrice, to = params.to, amount = params.amount, gas = params.gas, data = params.data, nonce = params.nonce;
    var address = config_1.getConfig().address;
    var rawTx = {
        to: to,
        data: data || '',
        from: address,
        nonce: web3_utils_1.toHex(nonce),
        gasLimit: web3_utils_1.toHex(gas),
        gasPrice: web3_utils_1.toHex(gasPrice),
        value: web3_utils_1.toHex(utils_1.fromUnitToDecimal(amount, 18, 10)),
    };
    var sign = config_1.getConfig().signRawTransactionFn(rawTx);
    var hash = web3_utils_1.sha3(utils_1.addHexPrefix(sign));
    return { hash: hash, sign: sign };
};
//# sourceMappingURL=index.js.map