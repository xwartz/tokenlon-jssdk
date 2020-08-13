"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var utils_1 = require("../utils");
var encodeData2_1 = require("./abi/encodeData2");
exports.getFillOrderWithETHData = function (arg) {
    return encodeData2_1.encodeData('tokenlonExchange', 'fillOrderWithETH', arg.map(function (a) {
        // Warning: 部分非常大的树值经过 bignumber 会被处理成 0
        if (_.isString(a) && a.startsWith('0x')) {
            return a;
        }
        return '0x' + utils_1.toBN(a).toString(16);
    }));
};
//# sourceMappingURL=signFillOrderWithEthAsync.js.map