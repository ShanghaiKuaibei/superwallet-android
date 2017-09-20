define(['app', 'services/LandingService'], function (app) {
  'use strict';
  app.register.controller('LandingCtrl', [
    '$scope',
    '$rootScope',
    'LandingService',
    'service',
    function ($scope, $rootScope, $stateParams, LandingService, service) {
      
      // $scope.selectLang = function () {
      //   console.log("selectLang!!!!")
      //   $rootScope.languageSelected.language == "cn" ? $rootScope.languageSelected={language:"en",des:"ENG"} : $rootScope.languageSelected={language:"cn",des:"中文"} 

      // }
    }]);
});
