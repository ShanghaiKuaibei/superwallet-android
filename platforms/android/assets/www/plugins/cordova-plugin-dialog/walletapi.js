cordova.define("cordova-plugin-walletapi.WalletapiPlugin",
    function(require, exports, module) {
        var exec = require("cordova/exec");
        module.exports = {
            createwallet: function(success, error, str, content) {
                exec(
                    success,
                    error,
                    "WalletapiPlugin", //feature name
                    "createwallet", //action
                    [str, content] //要传递的参数，json格式
                );
            },

            deletewallet: function(success, error, coinType, walletSeed) {
                exec(
                    success,
                    error,
                    "WalletapiPlugin", //feature name
                    "deletewallet", //action
                    [coinType, walletSeed] //要传递的参数，json格式
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
            getbalance: function(success, error, content, str) {
                exec(
                    success,
                    error,
                    "WalletapiPlugin", //feature name
                    "getbalance", //action
                    [content, str] //要传递的参数，json格式
                );
            },
            sendskycoin: function(success, error, walletid, toaddress, amount) {
                exec(
                    success,
                    error,
                    "WalletapiPlugin", //feature name
                    "sendskycoin", //action
                    [walletid, toaddress, amount] //要传递的参数，json格式
                );
            },
            sendmzcoin: function(success, error, walletid, toaddress, amount) {
                exec(
                    success,
                    error,
                    "WalletapiPlugin", //feature name
                    "sendmzcoin", //action
                    [walletid, toaddress, amount] //要传递的参数，json格式
                );
            },
            sendbitcoin: function(success, error, walletid, toaddress, amount, fee) {
                exec(
                    success,
                    error,
                    "WalletapiPlugin", //feature name
                    "sendbitcoin", //action
                    [walletid, toaddress, amount, fee] //要传递的参数，json格式
                );
            },
            sendshellcoin: function(success, error, walletid, toaddress, amount) {
                exec(
                    success,
                    error,
                    "WalletapiPlugin", //feature name
                    "sendshellcoin", //action
                    [walletid, toaddress, amount] //要传递的参数，json格式
                );
            },
            sendsuncoin: function(success, error, walletid, toaddress, amount) {
                exec(
                    success,
                    error,
                    "WalletapiPlugin", //feature name
                    "sendsuncoin", //action
                    [walletid, toaddress, amount] //要传递的参数，json格式
                );
            },
            sendaynrandcoin: function(success, error, walletid, toaddress, amount) {
                exec(
                    success,
                    error,
                    "WalletapiPlugin", //feature name
                    "sendaynrandcoin", //action
                    [walletid, toaddress, amount] //要传递的参数，json格式
                );
            },
            sendmetalicoin: function(success, error, walletid, toaddress, amount) {
                exec(
                    success,
                    error,
                    "WalletapiPlugin", //feature name
                    "sendmetalicoin", //action
                    [walletid, toaddress, amount] //要传递的参数，json格式
                );
            },
            sendlifecoin: function(success, error, walletid, toaddress, amount) {
                exec(
                    success,
                    error,
                    "WalletapiPlugin", //feature name
                    "sendlifecoin", //action
                    [walletid, toaddress, amount] //要传递的参数，json格式
                );
            },
           sendyongbangcoin: function(success, error, walletid, toaddress, amount) {
                exec(
                    success,
                    error,
                    "WalletapiPlugin", //feature name
                    "sendyongbangcoin", //action
                    [walletid, toaddress, amount] //要传递的参数，json格式
                );
            },
           sendshihucoin: function(success, error, walletid, toaddress, amount) {
                exec(
                    success,
                    error,
                    "WalletapiPlugin", //feature name
                    "sendshihucoin", //action
                    [walletid, toaddress, amount] //要传递的参数，json格式
                );
            },
            sendliquorcoin: function(success, error, walletid, toaddress, amount) {
                 exec(
                     success,
                     error,
                     "WalletapiPlugin", //feature name
                     "sendliquorcoin", //action
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
            }
        }
    });