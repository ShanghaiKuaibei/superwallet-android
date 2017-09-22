define(['app', 'services/LandingService'], function (app) {
  'use strict';
  app.register.controller('LandingCtrl', [
    '$scope',
    '$rootScope',
    '$stateParams',
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

      // Hank Gao
      // Adding back automatic software updating function 
      service.dialogs($rootScope);
      service.config($rootScope);

      LandingService.getAppVersion(function(AppVersion) {
        LandingService.getServeAppVersion().then(function(ServeAppVersion){
          if (ServeAppVersion['version'] > AppVersion) {
            $rootScope.confirm('发现新版本 V'+ServeAppVersion['version'],'检查更新', ['更新','取消'],function(buttonIndex){
              if (buttonIndex == 1) {
                LandingService.apkDownload(ServeAppVersion['name'])
                  .then(function(result) {
                    $scope.apkDownloadProgress = "正在安装";
                    LandingService.apkOpen()
                    .then(function(){},function(err){
                      $rootScope.alert("打开文件失败"+err);
                      $scope.splice($scope.indexOf('apkDownloadProgress'), 1);
                    });
                  },function(err){
                    //alert($rootScope.lvshapn+""+ServeAppVersion['name']);
                    $rootScope.alert("下载时出错");
                    $scope.splice($scope.indexOf('apkDownloadProgress'), 1);
                  }, function(progress){
                    $scope.apkDownloadProgress = "已下载"+((progress.loaded / progress.total) * 100).toFixed(2)+"%";
                  });
              } else {
                // user click cancel, do nothing and continue to use old version
              }
            });
          }
        });
      });



      // $scope.selectLang = function () {
      //   console.log("selectLang!!!!")
      //   $rootScope.languageSelected.language == "cn" ? $rootScope.languageSelected={language:"en",des:"ENG"} : $rootScope.languageSelected={language:"cn",des:"中文"} 

      // }
    }]);
});
