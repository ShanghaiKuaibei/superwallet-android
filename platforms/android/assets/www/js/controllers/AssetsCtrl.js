define(['app', 'services/WalletService'], function (app) {
  'use strict';
  app.register.controller('AssetsCtrl', [
    '$scope',
    'service',
    '$rootScope',
    'WalletService',
    '$timeout',
    '$cordovaAppVersion',
    function ($scope, service, $rootScope, WalletService, $timeout, $cordovaAppVersion) {
      service.file($scope);
      $scope.$on('$locationChangeStart', function (event, next, current) {
        event.preventDefault();
      });
      //$timeout(function(){WalletService.getBalance("skycoin","skycoin_444444").then(function(success){});},100);
      $scope.checkFile($rootScope.filepath, $rootScope.filename).then(function (success) {
        $scope.readAsText($rootScope.filepath, $rootScope.filename).then(function (success) {
          $rootScope.walletinfo = JSON.parse(success);
          $timeout(getBalance, 100);
        });
      });
      $scope.alertMsg = function () {
        alert($rootScope.languages.UnderDevelopment[$rootScope.selectLanguage.selected.id]);
      }
      $scope.shoversion = function () {
        // ### version management
        $cordovaAppVersion.getVersionNumber().then(function (versionNumber) {
          alert($rootScope.languages.CurrentVersion[$rootScope.selectLanguage.selected.id] + ' ' + versionNumber);
        }, false);
      }
      var getBalance = function () {
        angular.forEach($rootScope.walletinfo, function (wallet, index) {
          WalletService.getBalance($rootScope.coins[wallet.coinIndex].name, wallet.walletid).then(function (success) {
            //console.log($rootScope.walletinfo[index]+"---------"+$rootScope.walletinfo[index].coinIndex+":"+success['balance']);
            if ($rootScope.walletinfo[index].coinIndex == "BTC") {
              success['balance'] = success['balance'] / 100000000;
            } else {
              success['balance'] = success['balance'] / 1000000;
            }
            $rootScope.walletinfo[index].balance = success['balance'];
          });
        });
      }
      $scope.showWallet = true;
      $scope.show = function () {
        $scope.showWallet?$scope.showWallet=false:$scope.showWallet=true;
      }
    }]);
});
