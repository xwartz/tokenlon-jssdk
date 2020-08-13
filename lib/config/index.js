"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var errors_1 = require("../utils/errors");
var config = {
    debug: false,
    address: '',
    providerUrl: '',
    personalSignFn: function (_privateKey) { return ''; },
    signRawTransactionFn: function (_params) { return ''; },
};
exports.setConfig = function (params) {
    if (!_.isObject(params))
        throw errors_1.JSSDK_ERRORS.INVALID_CONFIG_PARAMS;
    var personalSignFn = params.personalSignFn, signRawTransactionFn = params.signRawTransactionFn;
    if (!_.isFunction(personalSignFn) || !_.isFunction(signRawTransactionFn))
        throw errors_1.JSSDK_ERRORS.INVALID_CONFIG_PARAMS;
    return Object.assign(config, params);
};
exports.getConfig = function () {
    return config;
};
//# sourceMappingURL=index.js.map