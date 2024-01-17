define(['app'], function(app) {
    'use strict';
    app.register.controller('ReceiveCtrl', [
        '$scope',
        '$rootScope',
        '$location',
        '$stateParams',
        'service',
        'WalletService',
        '$timeout',
        function($scope, $rootScope, $location, $stateParams, service, WalletService, $timeout) {
            service.file($scope);
            $scope.wallet = $stateParams.wallet;

            $scope.addresse = $scope.wallet.address;

            $scope.balance = 0;
            $timeout(getCoinName,100);

            WalletService.getBalance($scope.wallet.id).then(function(res) {
                        var balance = res;
                        var num = $scope.wallet.name == "bitcoin" ? 100000000 : 1000000;
                        balance = balance / num;
                        $scope.balance = balance;
                    }, function(err) {
                        console.log(err)
            });

            function getCoinName(){
                var activeCoin;
                angular.forEach($rootScope.coins,function(coin,i){
                    if(coin.name == $scope.wallet.coinType){
                        activeCoin = coin;
                    }
                })
                $scope.title = activeCoin.title;
            }

            $scope.copybtn = function() {
                $scope.copy($scope.addresse).then(function() {
                    // $rootScope.alert("已复制地址");
                    $rootScope.alert($rootScope.languages.addressduplicated[$rootScope.selectLanguage.selected.id]);
                });
            }
        }
    ]);
    app.register.filter('walletname', function() {
        return function(walletid) {
            return walletid.split("_")[1];
        }
    });
});