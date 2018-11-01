define(['app'], function(app) {
    'use strict';
    app.register.controller('SendCtrl', [
        '$scope',
        '$rootScope',
        '$stateParams',
        'service',
        'WalletService',
        function($scope, $rootScope, $stateParams, service, WalletService) {
            service.file($scope);
            // "发送失败"
            $scope.Failure = $rootScope.languages.Failure[$rootScope.selectLanguage.selected.id]
            $scope.wallet = $stateParams.wallet;
            // $scope.sendplaceholder = $rootScope.languages.Input[$rootScope.selectLanguage.selected.id] + $rootScope.coins[$scope.wallet.coinIndex].title[$rootScope.selectLanguage.selected.id] + $rootScope.languages.Address[$rootScope.selectLanguage.selected.id]
            $scope.scanbtn = function() {
                $scope.scan().then(function(success) {
                    $scope.toaddr = success['text'];
                }, function(error) {

                });
            }
            $scope.send = function() {
                if (!$scope.toaddr || $scope.amount <= 0 || !$scope.amount) {
                    // $rootScope.alert("请输入正确信息");
                    $rootScope.alert($rootScope.languages.enterinformation[$rootScope.selectLanguage.selected.id]);
                    return false;
                }

                WalletService.sendcoin($scope.wallet.id,$scope.toaddr,$scope.amount).then(function(res){
                    $rootScope.alert($rootScope.languages.Sentsuccessfully[$rootScope.selectLanguage.selected.id]);
                    history.go(-1);
                }, function(){
                    $rootScope.alert($scope.Failure);
                })

            }
        }
    ]);
    app.register.filter('walletname', function() {
        return function(walletid) {
            return walletid.split("_")[1];
        }
    });
});