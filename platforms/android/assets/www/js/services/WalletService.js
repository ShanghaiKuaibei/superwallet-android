define(['app'], function(app) {
    'use strict';
    app.register.service('WalletService', [
        '$q',
        '$rootScope',
        '$timeout',
        '$cordovaSpinnerDialog',
        function($q, $rootScope, $timeout, $cordovaSpinnerDialog) {
            return {
                getWallets: function(){
                   var deferred = $q.defer();
                    webwalletapi.getWallets(function(walletsJson){
                        deferred.resolve(walletsJson);
                    },function(error){
                        deferred.reject(error);
                    })
                    return deferred.promise;
                },

                getDomain: function() {
                    var deferred = $q.defer();
                    webwalletapi.getDomain(function(domain){
                        deferred.resolve(domain);
                    },function(error){
                        deferred.reject(error);
                    })
                    return deferred.promise;
                },

                getCoins: function() {
                    var deferred = $q.defer();
                    webwalletapi.getCoins(function(coins){
                        deferred.resolve(coins);
                    } ,function(error) {
                        deferred.reject(error);
                    })
                    return deferred.promise;
                },

                createWallet: function(cointype, seed, walletLabel, color) {
                    var deferred = $q.defer();
                    webwalletapi.createwallet(function(walletid) {
                        deferred.resolve(walletid);
                    }, function(error) {
                        deferred.reject(error);
                    }, cointype, seed, walletLabel, color);
                    return deferred.promise;
                },

                // Hank Gao
                deleteWallet: function(walletId) {
                    var deferred = $q.defer();
                    webwalletapi.deletewallet(function(walletid) {
                        deferred.resolve(walletid);
                    }, function(error) {
                        deferred.reject(error);
                    }, walletId);
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

                sendcoin: function(walletid, toaddr, amount) {
                    var deferred = $q.defer();
                    $cordovaSpinnerDialog.show("提示", "正在发送", true);
                    webwalletapi.sendcoin(function(success) {
                        $cordovaSpinnerDialog.hide();
                        deferred.resolve(success);
                    }, function(error) {
                        $cordovaSpinnerDialog.hide();
                        deferred.reject(error);
                    }, walletid, toaddr, amount);
                    return deferred.promise;
                },
                getBalance: function(Walletid) {
                    var deferred = $q.defer();
                    webwalletapi.getbalance(function(success) {
                        deferred.resolve(JSON.parse(success));
                    }, function(error) {
                        deferred.reject(error);
                    }, Walletid);
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