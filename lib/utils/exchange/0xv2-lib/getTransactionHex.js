"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var eip712_utils_1 = require("./eip712_utils");
var sign_typed_data_utils_1 = require("./sign_typed_data_utils");
exports.getTransactionHex = function (exchangeAddress, data, salt, signerAddress) {
    var executeTransactionData = {
        salt: salt,
        signerAddress: signerAddress,
        data: data,
    };
    var typedData = eip712_utils_1.eip712Utils.createZeroExTransactionTypedData(executeTransactionData, exchangeAddress);
    var eip712MessageBuffer = sign_typed_data_utils_1.signTypedDataUtils.generateTypedDataHash(typedData);
    var messageHex = "0x" + eip712MessageBuffer.toString('hex');
    return messageHex;
};
//# sourceMappingURL=getTransactionHex.js.map