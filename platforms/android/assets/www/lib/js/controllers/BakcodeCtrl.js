define(['app'],function(app){
  'use strict';
  app.register.controller('BakcodeCtrl',[
    '$scope',
    '$rootScope',
    '$stateParams',
    '$location',
    'service',
    function($scope,$rootScope,$stateParams,$location,service){
      console.log($stateParams.bakwalletid);
      service.file($scope);
      $scope.bakwallet = $stateParams.bakwalletid;
     $scope.copybtn = function(){
        $scope.copy($scope.bakwallet).then(function(){
          // $rootScope.alert("已复制seed");
          $rootScope.alert($rootScope.languages.Seedduplicated[$rootScope.selectLanguage.selected.id]);
        });
      }
    }]);
});
