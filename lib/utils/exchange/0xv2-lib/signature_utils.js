"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("@0x/types");
var ethUtil = require("ethereumjs-util");
// import { schemas } from '@0x/json-schemas'
// import { assert } from './assert'
exports.signatureUtils = {
    /**
     * Checks if the supplied elliptic curve signature corresponds to signing `data` with
     * the private key corresponding to `signerAddress`
     * @param   data          The hex encoded data signed by the supplied signature.
     * @param   signature     An object containing the elliptic curve signature parameters.
     * @param   signerAddress The hex encoded address that signed the data, producing the supplied signature.
     * @return Whether the ECSignature is valid.
     */
    isValidECSignature: function (data, signature, signerAddress) {
        // assert.isHexString('data', data)
        // assert.doesConformToSchema('signature', signature, schemas.ecSignatureSchema)
        // assert.isETHAddressHex('signerAddress', signerAddress)
        var normalizedSignerAddress = signerAddress.toLowerCase();
        var msgHashBuff = ethUtil.toBuffer(data);
        try {
            var pubKey = ethUtil.ecrecover(msgHashBuff, signature.v, ethUtil.toBuffer(signature.r), ethUtil.toBuffer(signature.s));
            var retrievedAddress = ethUtil.bufferToHex(ethUtil.pubToAddress(pubKey));
            var normalizedRetrievedAddress = retrievedAddress.toLowerCase();
            return normalizedRetrievedAddress === normalizedSignerAddress;
        }
        catch (err) {
            return false;
        }
    },
    /**
     * Combines ECSignature with V,R,S and the EthSign signature type for use in 0x protocol
     * @param ecSignature The ECSignature of the signed data
     * @return Hex encoded string of signature (v,r,s) with Signature Type
     */
    convertECSignatureToSignatureHex: function (ecSignature) {
        var signatureBuffer = Buffer.concat([
            ethUtil.toBuffer(ecSignature.v),
            ethUtil.toBuffer(ecSignature.r),
            ethUtil.toBuffer(ecSignature.s),
        ]);
        var signatureHex = "0x" + signatureBuffer.toString('hex');
        var signatureWithType = exports.signatureUtils.convertToSignatureWithType(signatureHex, types_1.SignatureType.EthSign);
        return signatureWithType;
    },
    /**
     * Combines the signature proof and the Signature Type.
     * @param signature The hex encoded signature proof
     * @param signatureType The signature type, i.e EthSign, Wallet etc.
     * @return Hex encoded string of signature proof with Signature Type
     */
    convertToSignatureWithType: function (signature, signatureType) {
        var signatureBuffer = Buffer.concat([ethUtil.toBuffer(signature), ethUtil.toBuffer(signatureType)]);
        var signatureHex = "0x" + signatureBuffer.toString('hex');
        return signatureHex;
    },
    /**
     * Adds the relevant prefix to the message being signed.
     * @param message Message to sign
     * @return Prefixed message
     */
    addSignedMessagePrefix: function (message) {
        // assert.isString('message', message)
        var msgBuff = ethUtil.toBuffer(message);
        var prefixedMsgBuff = ethUtil.hashPersonalMessage(msgBuff);
        var prefixedMsgHex = ethUtil.bufferToHex(prefixedMsgBuff);
        return prefixedMsgHex;
    },
};
//# sourceMappingURL=signature_utils.js.map