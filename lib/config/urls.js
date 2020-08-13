"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
exports.getExchangeUrl = function () {
    return index_1.getConfig().debug === true ? 'https://exchange.dev.tokenlon.im/rpc' : 'https://exchange.tokenlon.im/rpc';
};
exports.getWebsocketUrl = function () {
    return index_1.getConfig().debug === true ? 'https://publisher.dev.tokenlon.im/rpc' : 'https://publisher.tokenlon.im/rpc';
};
exports.getTokenlonMarketUrl = function () {
    return index_1.getConfig().debug === true ? 'https://tokenlon-market.dev.tokenlon.im/rpc' : 'https://tokenlon-market.tokenlon.im/rpc';
};
exports.getTokenlonCoreMarketUrl = function () {
    return index_1.getConfig().debug === true ? 'https://tokenlon-core-market.dev.tokenlon.im/rpc' : 'https://tokenlon-core-market.tokenlon.im/rpc';
};
//# sourceMappingURL=urls.js.map