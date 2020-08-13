"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("@0x/types");
var ethAbi = require("ethereumjs-abi");
var ethUtil = require("ethereumjs-util");
var ERC20_ASSET_DATA_BYTE_LENGTH = 36;
var SELECTOR_LENGTH = 4;
exports.assetDataUtils = {
    /**
     * Encodes an ERC20 token address into a hex encoded assetData string, usable in the makerAssetData or
     * takerAssetData fields in a 0x order.
     * @param tokenAddress  The ERC20 token address to encode
     * @return The hex encoded assetData string
     */
    encodeERC20AssetData: function (tokenAddress) {
        return ethUtil.bufferToHex(ethAbi.simpleEncode('ERC20Token(address)', tokenAddress));
    },
    /**
     * Decodes an ERC20 assetData hex string into it's corresponding ERC20 tokenAddress & assetProxyId
     * @param assetData Hex encoded assetData string to decode
     * @return An object containing the decoded tokenAddress & assetProxyId
     */
    decodeERC20AssetData: function (assetData) {
        var data = ethUtil.toBuffer(assetData);
        if (data.byteLength < ERC20_ASSET_DATA_BYTE_LENGTH) {
            throw new Error("Could not decode ERC20 Proxy Data. Expected length of encoded data to be at least " + ERC20_ASSET_DATA_BYTE_LENGTH + ". Got " + data.byteLength);
        }
        var assetProxyId = ethUtil.bufferToHex(data.slice(0, SELECTOR_LENGTH));
        if (assetProxyId !== types_1.AssetProxyId.ERC20) {
            throw new Error("Could not decode ERC20 Proxy Data. Expected Asset Proxy Id to be ERC20 (" + types_1.AssetProxyId.ERC20 + "), but got " + assetProxyId);
        }
        var tokenAddress = ethAbi.rawDecode(['address'], data.slice(SELECTOR_LENGTH))[0];
        return {
            assetProxyId: assetProxyId,
            tokenAddress: ethUtil.addHexPrefix(tokenAddress),
        };
    },
};
//# sourceMappingURL=asset_data_utils.js.map