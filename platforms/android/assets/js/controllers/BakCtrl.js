define(['app'],function(app){
  'use strict';
  app.register.controller('BakCtrl',[
    '$scope',
    '$rootScope',
    '$stateParams',
    '$location',
    'service',
    function($scope,$rootScope,$stateParams,$location,service){
      console.log($stateParams.walletid);
      service.file($scope);
      $scope.walletid = $stateParams.walletid;
      $scope.status = 1;
    }]);
});
