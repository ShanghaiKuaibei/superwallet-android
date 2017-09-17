define(['app'], function (app) {
  'use strict';
  function ctrl($scope, $cordovaFile, $state, $cordovaDialogs) {
    $scope.user = "";
    $scope.login = function () {
      var filename = "userinfo.json";
      var filepath = cordova.file.dataDirectory;
      checkFile();
      function checkFile() {
        //检查注册
        $cordovaFile.checkFile(filepath, filename)
          .then(function (success) {
            readAsText();
          }, function (error) {
            $cordovaDialogs.alert("您还未注册", '提示', '确定')
              .then(function () {
              });
          });
      }
      function readAsText() {
        //对比信息
        $cordovaFile.readAsText(filepath, filename)
          .then(function (success) {
            var reginfo = JSON.parse(success);
            if (reginfo["username"] == $scope.user.username && reginfo["password"] == $scope.user.password) {
              $state.go("srmima");
            } else {
              $cordovaDialogs.alert("登录信息有误", '提示', '确定')
                .then(function () {
                });
            }
          }, function (error) {
            alert(error);
          });
      }
    }
  }
  ctrl.$inject = ['$scope', '$cordovaFile', '$state', '$cordovaDialogs'];
  app.register.controller('LoginCtrl', ctrl);
});
