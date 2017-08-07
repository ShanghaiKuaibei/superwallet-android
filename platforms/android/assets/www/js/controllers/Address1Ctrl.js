define(['app'],function(app){
  'use strict';
  app.register.controller('Address1Ctrl',[
    '$scope',
    '$state',
    '$rootScope',
    '$stateParams',
    '$location',
    'WalletService',
    'service',
    function($scope,$state,$rootScope,$stateParams,$location,WalletService,service){
      service.file($scope);
     // $scope.coinIndexa = $stateParams.coinIndex;
      $scope.unzipbtn = function(){
        $rootScope.confirm('确定要恢复数据？继续操作', '还原备份', ['确定','取消'],function(buttonIndex){
          if (buttonIndex == 1) {
            $scope.scan().then(function(success){
            var arr = success['text'].split("_");
            console.log(success['text']);
           /* var coinstr = arr[0].toUpperCase();
            var coinIndex = coinstr.substr(0,coinstr.length-3);
            */
              var walletname="喵爪币";
              var coinIndex="";
              if(arr[0]=="mzcoin"){
                   coinIndex="MZC";
                   walletname="喵爪币";
              }else if(arr[0]=="bitcoin"){
                   coinIndex="BTC";
                   walletname="特比币";
              }else if(arr[0]=="skycoin"){
                  coinIndex="SKY";
                   walletname="天空币";
              }else if(arr[0]=="shellcoin"){
                     coinIndex="SC2";
                     walletname="小贝壳";
               }else if(arr[0]=="suncoin"){
                  coinIndex="SUN";
                   walletname="太阳币";
               }else if(arr[0]=="aynrandcoin"){
                  coinIndex="ARC";
                   walletname="安兰德币";
              }else{
                $rootScope.alert("该Seed不属于当前任何一个币种！", '提示', '确定');
                document.getElementById('coinjson').value="";
              }
              var array = [];
                 angular.forEach($rootScope.walletinfo, function(data){
                   array.push(data['coinIndex']);
                 });
                 if (in_array(coinIndex,array)) {
                   $rootScope.alert("已存在该币种", '提示', '确定');
                 }else if($rootScope.coins[coinIndex].switch == true){
                    /*导入钱包*/
                         WalletService.createWallet(arr[0],$scope.walletname)
                             .then(function(walletid){
                               $scope.wallet = [{"walletid":success['text'],"coinIndex":coinIndex,"walletcolor":2,"walletname":walletname}];
                               $scope.checkFile($rootScope.filepath,$rootScope.filename).then(function(success){
                                     $scope.readAsText($rootScope.filepath,$rootScope.filename).then(function(success){
                                         $scope.writeFile($rootScope.filepath,$rootScope.filename,JSON.stringify(JSON.parse(success).concat($scope.wallet))).then(function(){
                                           $location.url('/assets');
                                         },function(){
                                           $rootScope.alert("恢复seed失败:"+$rootScope.filepath+$rootScope.filename);
                                         });
                                     },function(){
                                       $rootScope.alert("恢复seed失败:"+$rootScope.filepath+$rootScope.filename);
                                     });
                               },function(error){
                                     $scope.writeFile($rootScope.filepath,$rootScope.filename,JSON.stringify($scope.wallet)).then(function(){
                                       $location.url('/assets');
                                     },function(){
                                       $rootScope.alert("恢复seed失败:"+$rootScope.filepath+$rootScope.filename);
                                     });
                               });
                             },function(error){
                               $rootScope.alert("恢复seed钱包:"+error);
                             });
                    //创建钱包结束
                 }
                 function in_array(search,array){
                   for(var i in array){
                     if(array[i]==search){
                       return true;
                     }
                   }
                   return false;
                 }

            },function(error){

            });

          }
        });
      }
      $scope.addnewaddress = function(coinIndex){
        var array = [];
        angular.forEach($rootScope.walletinfo, function(data){
          array.push(data['coinIndex']);
        });
        if (in_array(coinIndex,array)) {
          $rootScope.alert("已存在该币种", '提示', '确定');
        }else if($rootScope.coins[coinIndex].switch == true){
          $state.go('.addnewaddress', {coinIndex:coinIndex});
        }
        function in_array(search,array){
          for(var i in array){
            if(array[i]==search){
              return true;
            }
          }
          return false;
        }
      }
    }]);
});
