cordova.define("cordova-plugin-walletapi.WalletapiPlugin",
    function(require, exports, module) {
        var exec = require("cordova/exec");
        module.exports = {
            getWallets: function(success, error) {
                exec(
                    success,
                    error,
                    "WalletapiPlugin", //feature name
                    "getWallets", //action
                    [] //要传递的参数，json格式
                );
            },
            getCoins: function(success, error) {
                exec(
                    success,
                    error,
                    "WalletapiPlugin", //feature name
                    "getCoins", //action
                    [] //要传递的参数，json格式
                );
            },
            getDomain: function(success, error) {
                exec(
                    success,
                    error,
                    "WalletapiPlugin", //feature name
                    "getDomain", //action
                    [] //要传递的参数，json格式
                );
            },

            createwallet: function(success, error, cointype, seed, walletLabel, color) {
                exec(
                    success,
                    error,
                    "WalletapiPlugin", //feature name
                    "createwallet", //action
                    [cointype, seed, walletLabel, color] //要传递的参数，json格式
                );
            },

            deletewallet: function(success, error, walletid) {
                exec(
                    success,
                    error,
                    "WalletapiPlugin", //feature name
                    "deletewallet", //action
                    [walletid] //要传递的参数，json格式
                );
            },

            importwallet: function(success, error, str, content) {
                exec(
                    success,
                    error,
                    "WalletapiPlugin", //feature name
                    "importwallet", //action
                    [str, content] //要传递的参数，json格式
                );
            },
            createaddress: function(success, error, content, type) {
                exec(
                    success,
                    error,
                    "WalletapiPlugin", //feature name
                    "createaddress", //action
                    [content, type] //要传递的参数，json格式
                );
            },
            getaddressinwallet: function(success, error, content, str) {
                exec(
                    success,
                    error,
                    "WalletapiPlugin", //feature name
                    "getaddressinwallet", //action
                    [content] //要传递的参数，json格式
                );
            },
            getpubkeyandseckeypairofaddress: function(success, error, content, str) {
                exec(
                    success,
                    error,
                    "WalletapiPlugin", //feature name
                    "getpubkeyandseckeypairofaddress", //action
                    [content, str] //要传递的参数，json格式
                );
            },
            getbalance: function(success, error, walletid) {
                exec(
                    success,
                    error,
                    "WalletapiPlugin", //feature name
                    "getbalance", //action
                    [walletid] //要传递的参数，json格式
                );
            },
            sendcoin: function(success, error, walletid, toaddress, amount) {
                exec(
                    success,
                    error,
                    "WalletapiPlugin", //feature name
                    "sendcoin", //action
                    [walletid, toaddress, amount] //要传递的参数，json格式
                );
            },
            getblanceofwalletid: function(success, error, type, walletid) {
                exec(
                    success,
                    error,
                    "WalletapiPlugin", //feature name
                    "getblanceofwalletid", //action
                    [type, walletid] //要传递的参数，json格式
                );
            },
            getrransactionbyid: function(success, error, type, walletid) {
                exec(
                    success,
                    error,
                    "WalletapiPlugin", //feature name
                    "getrransactionbyid", //action
                    [type, walletid] //要传递的参数，json格式
                );
            },
            memorizeWalletOrder: function(success, error, walletids) {
                exec(
                    success,
                    error,
                    "WalletapiPlugin", //feature name
                    "memorizeWalletOrder", //action
                    [walletids] //要传递的参数，json格式
                );
            },
            getWalletOrder: function(success, error) {
                exec(
                    success,
                    error,
                    "WalletapiPlugin", //feature name
                    "getWalletOrder", //action
                    [] //要传递的参数，json格式
                );
            }
        }
    });