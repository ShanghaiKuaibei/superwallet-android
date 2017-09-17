cordova.define("cordova-plugin-supperwallet",
function (require, exports, module) {
    var exec = require("cordova/exec");
    module.exports = {
        initexchangeapi: function (success, error, url) {
            exec(
                success,
                error,
                "supperwallets",//feature name
                "initexchangeapi",//action
                [url]//要传递的参数，json格式
            );
        },

        createwallet: function (success, error, str, c) {
            exec(
                success,
                error,
                "supperwallets",//feature name
                "createwallet",//action
                [str, c]//要传递的参数，json格式
            );
        },
        createaddress: function (success, error, content, type) {
            exec(
                success,
                error,
                "supperwallets",//feature name
                "createaddress",//action
                [content, type]//要传递的参数，json格式
            );
        },
        getaddressinwallet: function (success, error, content, str) {
            exec(
                success,
                error,
                "supperwallets",//feature name
                "getaddressinwallet",//action
                [content, str]//要传递的参数，json格式
            );
        },
        getpubkeyandseckeypairofaddress: function (success, error, content, str) {
            exec(
                success,
                error,
                "supperwallets",//feature name
                "getpubkeyandseckeypairofaddress",//action
                [content, str]//要传递的参数，json格式
            );
        },
        getbalance: function (success, error, content, str) {
            exec(
                success,
                error,
                "supperwallets",//feature name
                "getbalance",//action
                [content, str]//要传递的参数，json格式
            );
        },
        sendskycoin: function (success, error, walletid, toaddress, amount) {
            exec(
                success,
                error,
                "supperwallets",//feature name
                "sendskycoin",//action
                [walletid, toaddress, amount]//要传递的参数，json格式
            );
        },
        sendbitcoin: function (success, error, walletid, toaddress, amount, fee) {
            exec(
                success,
                error,
                "supperwallets",//feature name
                "sendbitcoin",//action
                [walletid, toaddress, amount, fee]//要传递的参数，json格式
            );
        },

        sendshellcoin: function (success, error, walletid, toaddress, amount) {
            exec(
                success,
                error,
                "supperwallets",//feature name
                "sendshellcoin",//action
                [walletid, toaddress, amount]//要传递的参数，json格式
            );
        },
        sendsuncoin: function (success, error, walletid, toaddress, amount) {
            exec(
                success,
                error,
                "supperwallets",//feature name
                "sendsuncoin",//action
                [walletid, toaddress, amount]//要传递的参数，json格式
            );
        },
        sendaynrandcoin: function (success, error, walletid, toaddress, amount) {
            exec(
                success,
                error,
                "supperwallets",//feature name
                "sendaynrandcoin",//action
                [walletid, toaddress, amount]//要传递的参数，json格式
            );
        },

        sendmzcoin: function (success, error, walletid, toaddress, amount) {
            exec(
                success,
                error,
                "supperwallets",//feature name
                "sendmzcoin",//action
                [walletid, toaddress, amount]//要传递的参数，json格式
            );
        },
        getblanceofwalletid: function (success, error, type, walletid) {
            exec(
                success,
                error,
                "supperwallets",//feature name
                "getblanceofwalletid",//action
                [type, walletid]//要传递的参数，json格式
            );
        }
    }
});
