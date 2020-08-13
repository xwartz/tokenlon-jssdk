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
var axios_1 = require("axios");
var _ = require("lodash");
var constants_1 = require("../constants");
// `validateStatus` defines whether to resolve or reject the promise for a given
// HTTP response status code. If `validateStatus` returns `true` (or is set to `null`
// or `undefined`), the promise will be resolved; otherwise, the promise will be rejected.
var validateStatus = function (status) {
    return status >= 200 && status < 300; // default
};
var getHeaders = function () {
    return {
        'Content-Type': 'application/json',
    };
};
var newError = function (message, url) {
    if (_.isObject(message) && message.message) {
        var error_1 = message;
        if (_.isObject(error_1.response) && _.isObject(error_1.response.data)) {
            if (error_1.response.data.error) {
                message = error_1.response.data.error.message;
            }
        }
        else {
            message = url + ": " + message.message;
        }
    }
    else {
        message = url + ": " + message;
    }
    var error = new Error(message);
    error.message = message;
    error.toString = function () { return message; };
    return error;
};
// TODO add debounceTime
exports.sendRequest = function (config) {
    var rConfig = __assign({ validateStatus: validateStatus, timeout: constants_1.REQUEST_TIMEOUT }, config);
    return new Promise(function (resolve, reject) {
        axios_1.default(rConfig).then(function (res) {
            if (res.data) {
                resolve(res.data);
            }
            else {
                reject(newError('null response', config.url));
            }
        }).catch(function (error) {
            // console.log('request error', error)
            reject(newError(error, config.url));
        });
    });
};
exports.jsonrpc = {
    get: function (url, header, method, params, timeout) {
        if (header === void 0) { header = {}; }
        if (timeout === void 0) { timeout = constants_1.REQUEST_TIMEOUT; }
        var headers = __assign({}, getHeaders(), header);
        var data = {
            jsonrpc: '2.0',
            id: 1,
            method: method,
            params: params,
        };
        return exports.sendRequest({ method: 'post', url: url, data: data, timeout: timeout, headers: headers }).then(function (data) {
            if (data.error) {
                throw newError(data.error, url);
            }
            if (_.isUndefined(data.result)) {
                throw newError('server result is undefined', url);
            }
            return data.result;
        }).catch(function (err) {
            throw err;
        });
    },
};
//# sourceMappingURL=_request.js.map