define(['app','services/WalletService'],function(app){
  'use strict';
  app.register.controller('JiaoyiCtrl',[
    '$scope',
    '$rootScope',
    '$stateParams',
    '$timeout',
    'WalletService',
    function($scope,$rootScope,$stateParams,$timeout,WalletService){
      $scope.wallet = $stateParams.wallet;
      $timeout(getBalance,100);
      var getBalance = function(){
        WalletService.getBalance($rootScope.coins[$scope.wallet.coinIndex].name, $scope.wallet.walletid).then(function(success) {
            if ($scope.wallet.coinIndex == "BTC") {
              success['balance'] = success['balance'] / 100000000;
            }else{
              success['balance'] = success['balance'] / 1000000;
            }
            $scope.wallet.balance = success['balance'];
            angular.forEach($rootScope.walletinfo, function(wallet, index) {
                if (wallet['walletid'] == $scope.wallet.walletid) {
                    $rootScope.walletinfo[index].balance = $scope.wallet.balance;
                }
            });
        });
      }
    }]);
    app.register.filter('walletname', function(){
        return function(walletid){
          return walletid.split("_")[1];
        }
    });
});
