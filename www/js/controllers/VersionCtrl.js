define(['app'],function(app){
  'use strict';
  app.register.controller('VersionCtrl',[
    '$scope',
    '$state',
    '$rootScope',
    '$stateParams',
    '$location',
    'WalletService',
    'service',
    function($scope,$state,$rootScope,$stateParams,$location,WalletService,service){
      service.file($scope);
    }]);
});