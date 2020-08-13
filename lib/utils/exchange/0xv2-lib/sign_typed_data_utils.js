"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ethUtil = require("ethereumjs-util");
var EthersAbiWrapper = require("ethers/utils/abi-coder");
var _ = require("lodash");
exports.signTypedDataUtils = {
    /**
     * Generates the EIP712 Typed Data hash for signing
     * @param   typedData An object that conforms to the EIP712TypedData interface
     * @return  A Buffer containing the hash of the typed data.
     */
    generateTypedDataHash: function (typedData) {
        return ethUtil.sha3(Buffer.concat([
            Buffer.from('1901', 'hex'),
            exports.signTypedDataUtils._structHash('EIP712Domain', typedData.domain, typedData.types),
            exports.signTypedDataUtils._structHash(typedData.primaryType, typedData.message, typedData.types),
        ]));
    },
    _findDependencies: function (primaryType, types, found) {
        if (found === void 0) { found = []; }
        if (found.includes(primaryType) || types[primaryType] === undefined) {
            return found;
        }
        found.push(primaryType);
        for (var _i = 0, _a = types[primaryType]; _i < _a.length; _i++) {
            var field = _a[_i];
            for (var _b = 0, _c = exports.signTypedDataUtils._findDependencies(field.type, types, found); _b < _c.length; _b++) {
                var dep = _c[_b];
                if (!found.includes(dep)) {
                    found.push(dep);
                }
            }
        }
        return found;
    },
    _encodeType: function (primaryType, types) {
        var deps = exports.signTypedDataUtils._findDependencies(primaryType, types);
        deps = deps.filter(function (d) { return d !== primaryType; });
        deps = [primaryType].concat(deps.sort());
        var result = '';
        for (var _i = 0, deps_1 = deps; _i < deps_1.length; _i++) {
            var dep = deps_1[_i];
            result += dep + "(" + types[dep].map(function (_a) {
                var name = _a.name, type = _a.type;
                return type + " " + name;
            }).join(',') + ")";
        }
        return result;
    },
    _encodeData: function (primaryType, data, types) {
        var encodedTypes = ['bytes32'];
        var encodedValues = [exports.signTypedDataUtils._typeHash(primaryType, types)];
        for (var _i = 0, _a = types[primaryType]; _i < _a.length; _i++) {
            var field = _a[_i];
            var value = data[field.name];
            if (field.type === 'string' || field.type === 'bytes') {
                var hashValue = ethUtil.sha3(value);
                encodedTypes.push('bytes32');
                encodedValues.push(hashValue);
            }
            else if (types[field.type] !== undefined) {
                encodedTypes.push('bytes32');
                var hashValue = ethUtil.sha3(
                // tslint:disable-next-line:no-unnecessary-type-assertion
                exports.signTypedDataUtils._encodeData(field.type, value, types));
                encodedValues.push(hashValue);
            }
            else if (field.type.lastIndexOf(']') === field.type.length - 1) {
                throw new Error('Arrays currently unimplemented in encodeData');
            }
            else {
                encodedTypes.push(field.type);
                var normalizedValue = exports.signTypedDataUtils._normalizeValue(field.type, value);
                encodedValues.push(normalizedValue);
            }
        }
        return EthersAbiWrapper.defaultAbiCoder.encode(encodedTypes, encodedValues);
    },
    _normalizeValue: function (type, value) {
        var normalizedValue = type === 'uint256' && _.isObject(value) && value.isBigNumber ? value.toString() : value;
        return normalizedValue;
    },
    _typeHash: function (primaryType, types) {
        return ethUtil.sha3(exports.signTypedDataUtils._encodeType(primaryType, types));
    },
    _structHash: function (primaryType, data, types) {
        return ethUtil.sha3(exports.signTypedDataUtils._encodeData(primaryType, data, types));
    },
};
//# sourceMappingURL=sign_typed_data_utils.js.map