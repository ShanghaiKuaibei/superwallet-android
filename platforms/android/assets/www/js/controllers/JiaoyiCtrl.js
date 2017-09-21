define(['app', 'services/WalletService'], function (app) {
  'use strict';
  app.register.controller('JiaoyiCtrl', [
    '$scope',
    '$rootScope',
    '$stateParams',
    '$location',
    '$timeout',
    'WalletService',
    'service',
    function ($scope, $rootScope, $stateParams, $location, $timeout, WalletService, service) {
      service.file($scope);
      service.config($rootScope);
      $scope.wallet = $stateParams.wallet;
      $timeout(getBalance, 100);
      var getBalance = function () {
        WalletService.getBalance($rootScope.coins[$scope.wallet.coinIndex].name, $scope.wallet.walletid).then(function (success) {
          if ($scope.wallet.coinIndex == "BTC") {
            success['balance'] = success['balance'] / 100000000;
          } else {
            success['balance'] = success['balance'] / 1000000;
          }
          $scope.wallet.balance = success['balance'];
          angular.forEach($rootScope.walletinfo, function (wallet, index) {
            if (wallet['walletid'] == $scope.wallet.walletid) {
              $rootScope.walletinfo[index].balance = $scope.wallet.balance;
            }
          });
        });
      }
      $scope.deleteWallet = function () {
        // alert("delete wallet!!!")
        console.log("console.log delete wallet!!!")
        //$scope.wallet = [{ "walletid": success['text'], "coinIndex": coinIndex, "walletcolor": 2, "walletname": walletname }];
        $rootScope.confirm($rootScope.languages.confirmdeletion[$rootScope.selectLanguage.selected.id],
          $rootScope.languages.DeleteWallet[$rootScope.selectLanguage.selected.id],
          [$rootScope.languages.Confirm[$rootScope.selectLanguage.selected.id],
          $rootScope.languages.Cancel[$rootScope.selectLanguage.selected.id]],
          function () {
            $scope.checkFile($rootScope.filepath, $rootScope.filename)
              .then(function (success) {
                $scope.readAsText($rootScope.filepath, $rootScope.filename)
                  .then(function (success) {
                    var walletArr = JSON.parse(success)
                    for (var i = 0, l = walletArr.length; i < l; i++) {
                      if (walletArr[i].walletid == $scope.wallet.walletid) {
                        walletArr.splice(i, 1)
                        break;
                      }
                    }
                    $scope.writeFile($rootScope.filepath, $rootScope.filename, JSON.stringify(walletArr))
                      .then(function () {
                        $location.url('/assets');
                      }, function () {
                        $rootScope.alert($rootScope.languages.Failedcreate[$rootScope.selectLanguage.selected.id] + $rootScope.filepath + $rootScope.filename);
                        // $rootScope.alert("创建文件失败:" + $rootScope.filepath + $rootScope.filename);
                      });
                  }, function () {
                    $rootScope.alert(($rootScope.languages.Failedretrieve[$rootScope.selectLanguage.selected.id] + $rootScope.filepath + $rootScope.filename));
                    // $rootScope.alert("取出信息失败:" + $rootScope.filepath + $rootScope.filename);
                  });
              }, function (error) {
                $scope.writeFile($rootScope.filepath, $rootScope.filename, JSON.stringify($scope.wallet)).then(function () {
                  $location.url('/assets');
                }, function () {
                  $rootScope.alert($rootScope.languages.Failedcreate[$rootScope.selectLanguage.selected.id] + $rootScope.filepath + $rootScope.filename);
                  // $rootScope.alert("创建文件失败:" + $rootScope.filepath + $rootScope.filename);
                });
              });
          }
        )
      }
    }]);
  app.register.filter('walletname', function () {
    return function (walletid) {
      return walletid.split("_")[1];
    }
  });
});
