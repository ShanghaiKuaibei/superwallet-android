define(['app', 'services/WalletService'], function(app) {
    'use strict';
    app.register.controller('AssetsCtrl', [
        '$scope',
        'service',
        '$rootScope',
        'WalletService',
        '$timeout',
        '$cordovaAppVersion',
        function($scope, service, $rootScope, WalletService, $timeout, $cordovaAppVersion) {
            service.file($scope);
            //$timeout(function(){WalletService.getBalance("skycoin","skycoin_444444").then(function(success){});},100);
            $scope.checkFile($rootScope.filepath, $rootScope.filename).then(function(success) {
                $scope.readAsText($rootScope.filepath, $rootScope.filename).then(function(success) {
                    console.log(JSON.parse(success))
                    $rootScope.walletinfo = JSON.parse(success);
                    $timeout(getBalance, 100);
                });
            });
            $scope.alertMsg = function() {
                alert($rootScope.languages.UnderDevelopment[$rootScope.selectLanguage.selected.id]);
            }
            $scope.shoversion = function() {
                // ### version management
                $cordovaAppVersion.getVersionNumber().then(function(versionNumber) {
                    alert($rootScope.languages.CurrentVersion[$rootScope.selectLanguage.selected.id] + ' ' + versionNumber);
                }, false);
            }
            var getBalance = function() {
                // var isAlert = false;
                angular.forEach($rootScope.walletinfo, function(wallet, index) {
                    WalletService.getBalance($rootScope.coins[wallet.coinIndex].name, wallet.walletid).then(function(success) {
                        //console.log($rootScope.walletinfo[index]+"---------"+$rootScope.walletinfo[index].coinIndex+":"+success['balance']);
                        if ($rootScope.walletinfo[index].coinIndex == "BTC") {
                            success['balance'] = success['balance'] / 100000000;
                        } else {
                            success['balance'] = success['balance'] / 1000000;
                        }
                        $rootScope.walletinfo[index].balance = success['balance'];
                    }, function(err) {
                        //2018-01-14 jeremy  check network
                        // if(!isAlert){
                        //     alert($rootScope.languages.networkTip[$rootScope.selectLanguage.selected.id]);
                        //     isAlert = true;
                        // }

                    });
                });
            }
            $scope.showWallet = true;
            $scope.show = function() {
                $scope.showWallet ? $scope.showWallet = false : $scope.showWallet = true;
            }
        }
    ]);
});