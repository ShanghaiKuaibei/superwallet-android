define(['app'], function(app) {
    'use strict';
    app.register.service('WalletService', [
        '$q',
        '$rootScope',
        '$timeout',
        '$cordovaSpinnerDialog',
        function($q, $rootScope, $timeout, $cordovaSpinnerDialog) {
            console.log("====")
            console.log(webwalletapi)
            return {
                createWallet: function(cointype, walletname) {
                    var deferred = $q.defer();
                    webwalletapi.createwallet(function(walletid) {
                        console.log('walletid:' + walletid)
                        deferred.resolve(walletid);
                    }, function(error) {
                        deferred.reject(error);
                    }, cointype, walletname);
                    return deferred.promise;
                },

                // Hank Gao
                deleteWallet: function(coinType, walletSeed) {
                    var deferred = $q.defer();
                    webwalletapi.deletewallet(function(walletid) {
                        deferred.resolve(walletid);
                    }, function(error) {
                        deferred.reject(error);
                    }, coinType, walletSeed);
                    return deferred.promise;
                },

                //jeremy 2018-01-09
                getaddressinwallet: function(walletid) {
                    var deferred = $q.defer();
                    webwalletapi.getaddressinwallet(function(success) {
                        deferred.resolve(success);
                    }, function(error) {
                        deferred.reject(error);
                    }, walletid);
                    return deferred.promise;
                },

                createAddress: function(walletid) {
                    var deferred = $q.defer();
                    webwalletapi.createaddress(function(success) {
                        deferred.resolve(success);
                    }, function(error) {
                        deferred.reject(error);
                    }, walletid, 1);
                    return deferred.promise;
                },
                sendBitcoin: function(walletid, toaddr, amount) {
                    var deferred = $q.defer();
                    $cordovaSpinnerDialog.show("提示", "正在发送", true);
                    webwalletapi.sendbitcoin(function(success) {
                        $cordovaSpinnerDialog.hide();
                        deferred.resolve(success);
                    }, function(error) {
                        $cordovaSpinnerDialog.hide();
                        deferred.reject(error);
                    }, walletid, toaddr, amount, 1000);
                    return deferred.promise;
                },
                sendSkycoin: function(walletid, toaddr, amount) {
                    var deferred = $q.defer();
                    $cordovaSpinnerDialog.show("提示", "正在发送", true);
                    webwalletapi.sendskycoin(function(success) {
                        $cordovaSpinnerDialog.hide();
                        deferred.resolve(success);
                    }, function(error) {
                        $cordovaSpinnerDialog.hide();
                        deferred.reject(error);
                    }, walletid, toaddr, amount);
                    return deferred.promise;
                },
                sendShellcoin: function(walletid, toaddr, amount) {
                    var deferred = $q.defer();
                    $cordovaSpinnerDialog.show("提示", "正在发送", true);
                    webwalletapi.sendshellcoin(function(success) {
                        $cordovaSpinnerDialog.hide();
                        deferred.resolve(success);
                    }, function(error) {
                        $cordovaSpinnerDialog.hide();
                        deferred.reject(error);
                    }, walletid, toaddr, amount);
                    return deferred.promise;
                },
                sendSuncoin: function(walletid, toaddr, amount) {
                    var deferred = $q.defer();
                    $cordovaSpinnerDialog.show("提示", "正在发送", true);
                    webwalletapi.sendsuncoin(function(success) {
                        $cordovaSpinnerDialog.hide();
                        deferred.resolve(success);
                    }, function(error) {
                        $cordovaSpinnerDialog.hide();
                        deferred.reject(error);
                    }, walletid, toaddr, amount);
                    return deferred.promise;
                },
                sendAynrandcoin: function(walletid, toaddr, amount) {
                    var deferred = $q.defer();
                    $cordovaSpinnerDialog.show("提示", "正在发送", true);
                    webwalletapi.sendaynrandcoin(function(success) {
                        $cordovaSpinnerDialog.hide();
                        deferred.resolve(success);
                    }, function(error) {
                        $cordovaSpinnerDialog.hide();
                        deferred.reject(error);
                    }, walletid, toaddr, amount);
                    return deferred.promise;
                },
                sendMzcoin: function(walletid, toaddr, amount) {
                    var deferred = $q.defer();
                    $cordovaSpinnerDialog.show("提示", "正在发送", true);
                    webwalletapi.sendmzcoin(function(success) {
                        $cordovaSpinnerDialog.hide();
                        deferred.resolve(success);
                    }, function(error) {
                        $cordovaSpinnerDialog.hide();
                        deferred.reject(error);
                    }, walletid, toaddr, amount);
                    return deferred.promise;
                },
                sendMetalicoin: function(walletid, toaddr, amount) {
                    var deferred = $q.defer();
                    $cordovaSpinnerDialog.show("提示", "正在发送", true);
                    webwalletapi.sendmetalicoin(function(success) {
                        $cordovaSpinnerDialog.hide();
                        deferred.resolve(success);
                    }, function(error) {
                        $cordovaSpinnerDialog.hide();
                        deferred.reject(error);
                    }, walletid, toaddr, amount);
                    return deferred.promise;
                },
                sendLifecoin: function(walletid, toaddr, amount) {
                    var deferred = $q.defer();
                    $cordovaSpinnerDialog.show("提示", "正在发送", true);
                    webwalletapi.sendlifecoin(function(success) {
                        $cordovaSpinnerDialog.hide();
                        deferred.resolve(success);
                    }, function(error) {
                        $cordovaSpinnerDialog.hide();
                        deferred.reject(error);
                    }, walletid, toaddr, amount);
                    return deferred.promise;
                },
                sendYongbangcoin: function(walletid, toaddr, amount) {
                    var deferred = $q.defer();
                    $cordovaSpinnerDialog.show("提示", "正在发送", true);
                    webwalletapi.sendYongbangcoin(function(success) {
                        $cordovaSpinnerDialog.hide();
                        deferred.resolve(success);
                    }, function(error) {
                        $cordovaSpinnerDialog.hide();
                        deferred.reject(error);
                    }, walletid, toaddr, amount);
                    return deferred.promise;
                },
                 sendShihucoin: function(walletid, toaddr, amount) {
                     var deferred = $q.defer();
                     $cordovaSpinnerDialog.show("提示", "正在发送", true);
                     webwalletapi.sendShihucoin(function(success) {
                         $cordovaSpinnerDialog.hide();
                         deferred.resolve(success);
                     }, function(error) {
                         $cordovaSpinnerDialog.hide();
                         deferred.reject(error);
                     }, walletid, toaddr, amount);
                     return deferred.promise;
                 },
                  sendLiquorcoin: function(walletid, toaddr, amount) {
                      var deferred = $q.defer();
                      $cordovaSpinnerDialog.show("提示", "正在发送", true);
                      webwalletapi.sendLiquorcoin(function(success) {
                          $cordovaSpinnerDialog.hide();
                          deferred.resolve(success);
                      }, function(error) {
                          $cordovaSpinnerDialog.hide();
                          deferred.reject(error);
                      }, walletid, toaddr, amount);
                      return deferred.promise;
                  },
                getBalance: function(name, Walletid) {
                    var deferred = $q.defer();
                    webwalletapi.getblanceofwalletid(function(success) {
                        deferred.resolve(JSON.parse(success));
                    }, function(error) {
                        deferred.reject(error);
                    }, name, Walletid);
                    deferred.notify();
                    return deferred.promise;
                },
                getSubAddressBalance: function(coinType, address) {
                    var deferred = $q.defer();
                    webwalletapi.getbalance(function(success) {
                        deferred.resolve(JSON.parse(success));
                    }, function(error) {
                        deferred.reject(error);
                    }, coinType, address);
                    deferred.notify();
                    return deferred.promise;
                },
                getTransactionByID: function(coinType, txid) {
                    var deferred = $q.defer();
                    webwalletapi.getrransactionbyid(function(success) {
                        deferred.resolve(JSON.parse(success));
                    }, function(error) {
                        deferred.reject(error);
                    }, coinType, txid);
                    deferred.notify();
                    return deferred.promise;
                }

            };
        }
    ]);
});