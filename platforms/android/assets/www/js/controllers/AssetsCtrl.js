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
                var orders = '';
                WalletService.getWalletOrder().then(function(ods){
                    console.log(ods)
                    orders = ods == '' ? [] : ods.split(',');
                    if(orders.length == 0){
                        $rootScope.walletinfo = wallets;
                        return
                    } else{
                        var newArr = [];
                        angular.forEach(orders,function(el){
                            angular.forEach(wallets,function(wt,index){
                                if(wt.id == el){
                                    newArr.push(wt);
                                }
                            })
                        });
                        $rootScope.walletinfo = newArr;
                    }
                });
                $timeout(getBalance, 100);
            },function(err){
                console.log(err)
            })

//            离开时候保存顺序
            $scope.$on("$destroy", function() {
               //清除配置,不然scroll会重复请求
               var saveOrders = [];
               var wts = document.getElementsByClassName('oobe');

               angular.forEach(wts,function(item,i){
                    this.push(item.getAttribute('data-id'));
               },saveOrders);

               if(saveOrders.length == 0) return
               var so = saveOrders.join(",");

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