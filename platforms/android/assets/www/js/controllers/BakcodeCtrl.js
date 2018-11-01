define(['app'],function(app){
  'use strict';
  app.register.controller('BakcodeCtrl',[
    '$scope',
    '$rootScope',
    '$stateParams',
    '$location',
    'service',
    function($scope,$rootScope,$stateParams,$location,service){
      console.log($stateParams);
      service.file($scope);
      service.config($rootScope);
      $scope.seed = $stateParams.seed;
     $scope.copybtn = function(){
        $scope.copy($scope.seed).then(function(){
          $rootScope.alert($rootScope.languages.Seedduplicated[$rootScope.selectLanguage.selected.id]);
        });
      }
    }]);
});
