"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ethUtil = require("ethereumjs-util");
var Tx = require("ethereumjs-tx");
var utils_1 = require("../utils");
// sig is buffer
var concatSig = function (ecSignatureBuffer) {
    var v = ecSignatureBuffer.v, r = ecSignatureBuffer.r, s = ecSignatureBuffer.s;
    var vSig = ethUtil.bufferToInt(v);
    var rSig = ethUtil.fromSigned(r);
    var sSig = ethUtil.fromSigned(s);
    var rStr = utils_1.padLeft(ethUtil.toUnsigned(rSig).toString('hex'), 64);
    var sStr = utils_1.padLeft(ethUtil.toUnsigned(sSig).toString('hex'), 64);
    var vStr = ethUtil.stripHexPrefix(ethUtil.intToHex(vSig));
    return ethUtil.addHexPrefix(rStr.concat(sStr, vStr)).toString('hex');
};
exports.genPersonalSign = function (privateKey) {
    return function (msg) {
        var message = ethUtil.toBuffer(msg);
        var msgHash = ethUtil.hashPersonalMessage(message);
        var privateKeyBuffer = new Buffer(privateKey, 'hex');
        var sig = ethUtil.ecsign(msgHash, privateKeyBuffer);
        return ethUtil.bufferToHex(concatSig(sig));
    };
};
// use ethereumjs-tx and web3.eth.sendSignedTransaction to send transaction by privateKey
// value must be a decimal processed number
exports.genSignRawTransaction = function (privateKey) {
    return function (rawTx) {
        var tx = new (Tx.default ? Tx.default : Tx)(rawTx);
        var privateKeyBuffer = new Buffer(privateKey, 'hex');
        tx.sign(privateKeyBuffer);
        var serializedTx = tx.serialize();
        var sign = serializedTx.toString('hex');
        return sign;
    };
};
//# sourceMappingURL=gen.js.map