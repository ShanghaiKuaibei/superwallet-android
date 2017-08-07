define(['app','services/LandingService'],function(app){
  'use strict';
  app.register.controller('LandingCtrl',[
    '$scope',
    '$rootScope',
    'LandingService',
    'service',
    function($scope,$rootScope,LandingService,service){
      service.dialogs($rootScope);
      service.config($rootScope);
      LandingService.getAppVersion(function(AppVersion){
        LandingService.getServeAppVersion().then(function(ServeAppVersion){
          if (parseInt(ServeAppVersion['v'])>105) {
            $rootScope.confirm('发现新版本V'+ServeAppVersion['version'],'检查更新', ['更新','取消'],function(buttonIndex){
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
                  },function(progress){
                    $scope.apkDownloadProgress = "已下载"+((progress.loaded / progress.total) * 100).toFixed(2)+"%";
                  });
              }
            });
          }
        });
      });

  }]);
});
