define(['app'],function(app){
  'use strict';
  app.register.controller('ReceiveCtrl',[
    '$scope',
    '$rootScope',
    '$location',
    '$stateParams',
    'service',
    'WalletService',
    function($scope,$rootScope,$location,$stateParams,service,WalletService){
      service.file($scope);
      $scope.wallet = $stateParams.wallet;
      var isSub = $location.search().address;  //是否是从子地址跳转过来
      if(isSub){
           $scope.addresse = isSub;
                    WalletService.getSubAddressBalance($rootScope.coins[$scope.wallet.coinIndex].name, isSub).then(function(res) {
                        if ($scope.wallet.coinIndex == "BTC") {
                            res.balance = res.balance / 100000000;
                        } else {
                            res.balance = res.balance / 1000000;
                        }
                        $scope.balance = res.balance;
                    })
      }else{
        WalletService.createAddress($scope.wallet.walletid).then(function(success){
           $scope.addresse = JSON.parse(success)['addresses'][0].address;
        },function(error){
         // $rootScope.alert("创建地址失败");
          $rootScope.alert($rootScope.languages.Failedcreate[$rootScope.selectLanguage.selected.id]);
        });
      }


      $scope.copybtn = function(){
        $scope.copy($scope.addresse).then(function(){
          // $rootScope.alert("已复制地址");
          $rootScope.alert($rootScope.languages.addressduplicated[$rootScope.selectLanguage.selected.id]);
        });
      }
    }]);
    app.register.filter('walletname', function(){
        return function(walletid){
          return walletid.split("_")[1];
        }
    });
});
