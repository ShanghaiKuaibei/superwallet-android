define(['app', 'services/LandingService'], function (app) {
  'use strict';
  app.register.controller('LandingCtrl', [
    '$scope',
    '$rootScope',
    'LandingService',
    'service',
    function ($scope, $rootScope, $stateParams, LandingService, service) {
      $rootScope.selectLanguage = {
        availableOptions: [
          { id: "3", name: "中文" },
          { id: "0", name: "English" },
          { id: "1", name: "Español" },
          { id: "2", name: "العَرَبِيَّة‎" }
        ],
        selected: {
          id: "0", name: "English"
        }
      };
      // $scope.selectLang = function () {
      //   console.log("selectLang!!!!")
      //   $rootScope.languageSelected.language == "cn" ? $rootScope.languageSelected={language:"en",des:"ENG"} : $rootScope.languageSelected={language:"cn",des:"中文"} 

      // }
    }]);
});
