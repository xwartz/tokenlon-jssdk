"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var contractStack_1 = require("../artifacts/contractStack");
var coder_1 = require("./coder");
exports.getAbiMethod = function (contractName, method) {
    var ct = contractStack_1.default[contractName];
    if (!ct)
        throw new Error('Not supported contract');
    var abiMethod = ct.abi.find(function (abi) { return abi.name === method; });
    if (!abiMethod)
        throw new Error('InvalidContractMethod');
    return abiMethod;
};
exports.encodeData = function (contractName, method, args) {
    var abiMethod = exports.getAbiMethod(contractName, method);
    var data = coder_1.default.encodeFunctionCall(abiMethod, args);
    return data;
};
//# sourceMappingURL=index.js.map