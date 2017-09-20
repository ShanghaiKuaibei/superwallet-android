define(['app'],function(app){
  'use strict';
  app.register.controller('ReceiveCtrl',[
    '$scope',
    '$rootScope',
    'service',
    'WalletService',
    function($scope,$rootScope,service,WalletService){
      service.file($scope);
      WalletService.createAddress($scope.wallet.walletid).then(function(success){
        $scope.addresse = JSON.parse(success)['addresses'][0];
      },function(error){
        // $rootScope.alert("创建地址失败");
        $rootScope.alert($rootScope.languages.Failedcreate[$rootScope.selectLanguage.selected.id]);
      });
      $scope.copybtn = function(){
        $scope.copy($scope.addresse.address).then(function(){
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
