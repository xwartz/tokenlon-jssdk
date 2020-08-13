"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var utils_1 = require("../utils");
var translateValueHelper = function (obj, check, operate) {
    var result = {};
    _.keys(obj).forEach(function (key) {
        var v = obj[key];
        result[key] = check(v) ? operate(v) : v;
    });
    return result;
};
// translate a dex order with bigNumber to string
exports.orderBNToString = function (order) {
    var result = {};
    result = translateValueHelper(order, utils_1.isBigNumber, function (v) { return v.toString(); });
    return result;
};
exports.orderStringToBN = function (order) {
    var result = {};
    var check = function (v) { return _.isString(v) && !v.startsWith('0x'); };
    result = translateValueHelper(order, check, utils_1.toBN);
    return result;
};
//# sourceMappingURL=helper.js.map