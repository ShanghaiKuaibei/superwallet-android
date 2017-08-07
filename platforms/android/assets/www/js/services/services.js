angular.module('starter.services', [])
  .factory('service', [
    '$q',
    '$cordovaDialogs',
    '$cordovaFile',
    '$cordovaZip',
    '$cordovaClipboard',
    '$cordovaBarcodeScanner',
    function($q,$cordovaDialogs,$cordovaFile,$cordovaZip,$cordovaClipboard,$cordovaBarcodeScanner) {
      var config = function($rootScope){
        $rootScope.lvshapn = "http://120.55.60.140/superwallet/";
        //$rootScope.lvshapn = "http://marry.meiriwenda.com/superwallet/";
        $rootScope.filepath = cordova.file.externalRootDirectory;
        $rootScope.filename = "superwallet/walletinfo.json";
        $rootScope.walletcolorCur = 2;//颜色默认
        //suncoin, aynrandcoin
        $rootScope.walletcolor = [
          {"color" : "#52cad3","background" : "#FFFFFF"},{"color" : "#ff6c53","background" : "#FFFFFF"},
          {"color" : "#FFFFFF","background" : "#52cad3"},{"color" : "#FFFFFF","background" : "#288add"},
          {"color" : "#FFFFFF","background" : "#fed265"},{"color" : "#FFFFFF","background" : "#ff6c53"},
          {"color" : "#fed265","background" : "#30343d"},{"color" : "#52cad3","background" : "#30343d"},
          {"color" : "#52cad3","background" : "#ef4b88"}
        ];
        $rootScope.coins = {
          "BTC":{"type":"BTC","name":"bitcoin","title":"比特币","switch":true},
          "SKY":{"type":"SKY","name":"skycoin","title":"天空币","switch":true},
          "SC2":{"type":"SC2","name":"shellcoin","title":"小贝壳","switch":true},
          "MZC":{"type":"MZC","name":"mzcoin","title":"喵爪币","switch":true},
          "SUN":{"type":"SUN","name":"suncoin","title":"太阳币","switch":true},
          "ARC":{"type":"ARC","name":"aynrandcoin","title":"安兰德币","switch":true}
        };
      }
      var dialogs = function ($rootScope) {
        $rootScope.alert = function(message, title, buttonName,callback){
          message = message || "内容";
          title = title || "提示";
          buttonName = buttonName || "确认";
          $cordovaDialogs.alert(message, title, buttonName)
            .then(function() {
              callback&&callback();
            });
        }
        $rootScope.confirm = function dialogs(message, title, buttonArray,callback){
          message = message || "内容";
          title = title || "提示";
          buttonArray = buttonArray || ["确认","取消"];
          $cordovaDialogs.confirm(message, title, buttonArray)
            .then(function(buttonIndex) {
              callback&&callback(buttonIndex);
            });
        }
      }
      var file = function ($scope) {
        //检查文件
        $scope.checkFile = function(filepath, filename){
          var deferred = $q.defer();
          $cordovaFile.checkFile(filepath, filename)
          .then(function (success) {
            deferred.resolve(success);
          }, function (error) {
            deferred.reject(error);
          });
          return deferred.promise;
        }
        //创建文件
        $scope.writeFile = function(filepath,filename,message,replace){
          replace = replace || true;
          var deferred = $q.defer();
          $cordovaFile.writeFile(filepath,filename, message,replace)
            .then(function (success) {
              deferred.resolve(success);
            }, function (error) {
              deferred.reject(error);
            });
          return deferred.promise;
        }
        //取出文件信息
        $scope.readAsText = function(filepath,filename){
          var deferred = $q.defer();
          $cordovaFile.readAsText(filepath, filename)
            .then(function (success) {
              deferred.resolve(success);
            }, function (error) {
              deferred.reject(error);
            });
          return deferred.promise;
        }
        //解压文件
        $scope.unzip = function(filepath,filename){
          var deferred = $q.defer();
          $cordovaZip.unzip(filepath,filename).then(function (success) {
              deferred.resolve(success);
            }, function (error) {
              deferred.reject(error);
            }, function (progress) {
              deferred.notify(progress);
            });
          return deferred.promise;
        }
        //压缩文件
        $scope.zip = function (PathToFileInString,PathToResultZip){
          var deferred = $q.defer();
          JJzip.zip(PathToFileInString, {target:PathToResultZip,name:"superwallet"},function(success){
            deferred.resolve(success);
          },function(error){
            deferred.reject(error);
          });
          return deferred.promise;
        }
        //复制文本
        $scope.copy = function(text){
          var deferred = $q.defer();
          $cordovaClipboard.copy(text).then(function (success) {
              deferred.resolve(success);
            }, function () {
              deferred.reject(error);
            });
          return deferred.promise;
        }
        $scope.scan = function(){
          var deferred = $q.defer();
          $cordovaBarcodeScanner.scan().then(function(success) {
              deferred.resolve(success);
            }, function(error) {
              deferred.reject(error);
            });
          return deferred.promise;
        }
      }
      return {
        dialogs:dialogs,
        config:config,
        file:file
      };
    }])
  ;
