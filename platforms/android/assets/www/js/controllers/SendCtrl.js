define(['app'],function(app){
  'use strict';
  app.register.controller('SendCtrl',[
    '$scope',
    '$rootScope',
    'service',
    'WalletService',
    function($scope,$rootScope,service,WalletService){
      service.file($scope);
      $scope.scanbtn = function(){
        $scope.scan().then(function(success){
          $scope.toaddr = success['text'];
        },function(error){

        });
      }
      $scope.seed = function(){
        if (!$scope.toaddr || $scope.amount <= 0 || !$scope.amount) {
          $rootScope.alert("请输入正确信息");
          return false;
        }
        if ($rootScope.coins[$scope.wallet.coinIndex].name == "skycoin") {
          $scope.amount = $scope.amount*1000000;
          WalletService.sendSkycoin($scope.wallet.walletid,$scope.toaddr,$scope.amount).then(function(){
            sendSuccess();
          },function(){$rootScope.alert("发送失败");});
          $scope.amount = $scope.amount/1000000;
        }else if ($rootScope.coins[$scope.wallet.coinIndex].name == "mzcoin") {
           $scope.amount = $scope.amount*1000000;
           WalletService.sendMzcoin($scope.wallet.walletid,$scope.toaddr,$scope.amount).then(function(){
             sendSuccess();
           },function(){$rootScope.alert("发送失败");});
           $scope.amount = $scope.amount/1000000;
         }else if ($rootScope.coins[$scope.wallet.coinIndex].name == "bitcoin") {
          $scope.amount = $scope.amount*100000000;
          WalletService.sendBitcoin($scope.wallet.walletid,$scope.toaddr,$scope.amount).then(function(){
            sendSuccess();
          },function(){$rootScope.alert("发送失败");});
          $scope.amount = $scope.amount/100000000;
        }else if ($rootScope.coins[$scope.wallet.coinIndex].name == "shellcoin") {
               $scope.amount = $scope.amount*1000000;
               WalletService.sendShellcoin($scope.wallet.walletid,$scope.toaddr,$scope.amount).then(function(){
                 sendSuccess();
               },function(){$rootScope.alert("发送失败");});
               $scope.amount = $scope.amount/1000000;
         }else if ($rootScope.coins[$scope.wallet.coinIndex].name == "suncoin") {
                $scope.amount = $scope.amount*1000000;
                WalletService.sendSuncoin($scope.wallet.walletid,$scope.toaddr,$scope.amount).then(function(){
                  sendSuccess();
                },function(){$rootScope.alert("发送失败");});
                $scope.amount = $scope.amount/1000000;
          }else if ($rootScope.coins[$scope.wallet.coinIndex].name == "aynrandcoin") {
                 $scope.amount = $scope.amount*1000000;
                 WalletService.sendAynrandcoin($scope.wallet.walletid,$scope.toaddr,$scope.amount).then(function(){
                   sendSuccess();
                 },function(){$rootScope.alert("发送失败");});
                 $scope.amount = $scope.amount/1000000;
          }
        var sendSuccess = function(){
          $rootScope.alert("发送成功");
          $scope.wallet.balance = $scope.wallet.balance-$scope.amount;
          angular.forEach($rootScope.walletinfo,function(wallet,index){
            if (wallet['walletid'] == $scope.wallet.walletid) {
              $rootScope.walletinfo[index].balance = $scope.wallet.balance;
            }
          });
          history.go(-1);
        }
      }
    }]);
    app.register.filter('walletname', function(){
        return function(walletid){
          return walletid.split("_")[1];
        }
    });
});
