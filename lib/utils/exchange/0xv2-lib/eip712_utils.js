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
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var constants = {
    EIP712_DOMAIN_NAME: '0x Protocol',
    EIP712_DOMAIN_VERSION: '2',
    EIP712_DOMAIN_SCHEMA: {
        name: 'EIP712Domain',
        parameters: [
            { name: 'name', type: 'string' },
            { name: 'version', type: 'string' },
            { name: 'verifyingContract', type: 'address' },
        ],
    },
    EIP712_ORDER_SCHEMA: {
        name: 'Order',
        parameters: [
            { name: 'makerAddress', type: 'address' },
            { name: 'takerAddress', type: 'address' },
            { name: 'feeRecipientAddress', type: 'address' },
            { name: 'senderAddress', type: 'address' },
            { name: 'makerAssetAmount', type: 'uint256' },
            { name: 'takerAssetAmount', type: 'uint256' },
            { name: 'makerFee', type: 'uint256' },
            { name: 'takerFee', type: 'uint256' },
            { name: 'expirationTimeSeconds', type: 'uint256' },
            { name: 'salt', type: 'uint256' },
            { name: 'makerAssetData', type: 'bytes' },
            { name: 'takerAssetData', type: 'bytes' },
        ],
    },
    EIP712_ZEROEX_TRANSACTION_SCHEMA: {
        name: 'ZeroExTransaction',
        parameters: [
            { name: 'salt', type: 'uint256' },
            { name: 'signerAddress', type: 'address' },
            { name: 'data', type: 'bytes' },
        ],
    },
};
exports.eip712Utils = {
    /**
     * Creates a EIP712TypedData object specific to the 0x protocol for use with signTypedData.
     * @param   primaryType The primary type found in message
     * @param   types The additional types for the data in message
     * @param   message The contents of the message
     * @param   exchangeAddress The address of the exchange contract
     * @return  A typed data object
     */
    createTypedData: function (primaryType, types, message, exchangeAddress) {
        // assert.isETHAddressHex('exchangeAddress', exchangeAddress)
        // assert.isString('primaryType', primaryType)
        var typedData = {
            types: __assign({ EIP712Domain: constants.EIP712_DOMAIN_SCHEMA.parameters }, types),
            domain: {
                name: constants.EIP712_DOMAIN_NAME,
                version: constants.EIP712_DOMAIN_VERSION,
                verifyingContract: exchangeAddress,
            },
            message: message,
            primaryType: primaryType,
        };
        // assert.doesConformToSchema('typedData', typedData, schemas.eip712TypedDataSchema)
        return typedData;
    },
    /**
     * Creates an Order EIP712TypedData object for use with signTypedData.
     * @param   Order the order
     * @return  A typed data object
     */
    createOrderTypedData: function (order) {
        // assert.doesConformToSchema('order', order, schemas.orderSchema, [schemas.hexSchema])
        var normalizedOrder = _.mapValues(order, function (value) {
            return !_.isString(value) ? value.toString() : value;
        });
        var typedData = exports.eip712Utils.createTypedData(constants.EIP712_ORDER_SCHEMA.name, { Order: constants.EIP712_ORDER_SCHEMA.parameters }, normalizedOrder, order.exchangeAddress);
        return typedData;
    },
    /**
     * Creates an ExecuteTransaction EIP712TypedData object for use with signTypedData and
     * 0x Exchange executeTransaction.
     * @param   ZeroExTransaction the 0x transaction
     * @param   exchangeAddress The address of the exchange contract
     * @return  A typed data object
     */
    createZeroExTransactionTypedData: function (zeroExTransaction, exchangeAddress) {
        // assert.isETHAddressHex('exchangeAddress', exchangeAddress)
        // assert.doesConformToSchema('zeroExTransaction', zeroExTransaction, schemas.zeroExTransactionSchema)
        var normalizedTransaction = _.mapValues(zeroExTransaction, function (value) {
            return !_.isString(value) ? value.toString() : value;
        });
        var typedData = exports.eip712Utils.createTypedData(constants.EIP712_ZEROEX_TRANSACTION_SCHEMA.name, { ZeroExTransaction: constants.EIP712_ZEROEX_TRANSACTION_SCHEMA.parameters }, normalizedTransaction, exchangeAddress);
        return typedData;
    },
};
//# sourceMappingURL=eip712_utils.js.map