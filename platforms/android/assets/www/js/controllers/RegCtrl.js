define(['app'],function(app){
  'use strict';
  function ctrl($scope,$state,$cordovaFile,$cordovaDialogs){
    $scope.user = "";
    $scope.reg = function(){
      //检查注册
      var filename = "userinfo.json";
      var filepath = cordova.file.dataDirectory;
      var filedata = JSON.stringify($scope.user);
      checkFile();
      function checkFile(){
        $cordovaFile.checkFile(filepath, filename)
        .then(function (success) {
          $cordovaDialogs.alert("已经注册过信息", '提示', '确定')
            .then(function() {
            });
        }, function (success) {
          //创建注册文件
          writeFile();
        });
      }
      function writeFile(){
        $cordovaFile.writeFile(filepath, filename, filedata, false)
          .then(function (success) {
            //将注册文件内容保存到localStorage
            localStorage.setItem( 'userinfo',filedata);
            $state.go("srmima");
          }, function (error) {
            $cordovaDialogs.alert("创建注册文件失败", '提示', '确定')
              .then(function() {
              });
          });
      }
    }
  }
  ctrl.$inject = ['$scope','$state','$cordovaFile','$cordovaDialogs'];
  app.register.controller('RegCtrl',ctrl);
});
