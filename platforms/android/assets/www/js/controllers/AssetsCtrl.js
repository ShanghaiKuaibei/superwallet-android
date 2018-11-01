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
            WalletService.getWallets().then(function(walletsJson){
                var walletinfo = JSON.parse(walletsJson);
                var wallets = [];
                angular.forEach(walletinfo,function(item,i){
                    item.balance = 0;
                    wallets.push(item)
                })
                $rootScope.walletinfo = wallets;
                console.log(wallets)

                $timeout(getBalance, 100);
            },function(err){
                console.log(err)
            })

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
                angular.forEach($rootScope.walletinfo, function(wallet, index) {
                    WalletService.getBalance(wallet.id).then(function(res) {
                        var balance = res;
                        var num = $rootScope.walletinfo[index].name == "bitcoin" ? 100000000 : 1000000;
                        balance = balance / num;
                        $rootScope.walletinfo[index].balance = balance;
                    }, function(err) {
                        console.log(err)
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