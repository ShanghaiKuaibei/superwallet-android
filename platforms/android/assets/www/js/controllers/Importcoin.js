define(['app'],function(app){
  'use strict';
  app.register.controller('Importcoin',[
    '$scope',
    '$state',
    '$rootScope',
    '$stateParams',
    '$location',
    'WalletService',
    'service',
    function($scope,$state,$rootScope,$stateParams,$location,WalletService,service){      
	$scope.changenamea = function (coinjson){
       $scope.coinjson = coinjson;
    }
     $scope.changenameb = function (coinname){
       $scope.coinname = coinname;
     }
      service.file($scope);
      $scope.unzipbtn = function(){
            $scope.scan().then(function(success){
             // var arr = success['text'].split("_");
            document.getElementById('coinjson').value = success['text'];
            },function(error){

            });
      }
      $scope.changecoincate = function(){
		  var coinjson = document.getElementById('coinjson').value;
           var arra = coinjson.split("_");
           if(arra.length==2){
                  var select = document.getElementById("coincate");
                  for (var i = 0; i < select.options.length; i++){
                      if (select.options[i].value == arra[0]){
                          select.options[i].selected = true;
                          break;
                      }
                  }
           }
      }
      $scope.importcoinconfirm = function(){
            var coincate = document.getElementById("coincate").value;
			var coinjson = document.getElementById('coinjson').value;
			var coinname = document.getElementById("coinname").value;
            var arr = coinjson.split("_");

			//if(coincate==""){
            if(coinjson==""){
                 //$rootScope.alert("请选择导入seed的币种！", '提示', '确定');
                 alert("请扫码导入或者手动输入seed！");
                 return false;
			}else{
                if(coincate==""){
                    // $rootScope.alert("请扫码或者输入seed！", '提示', '确定');
                     alert("请选择导入seed的币种！");
                       return false;
                }else{
                   if(coinname==""){
                        // $rootScope.alert("请输入币种别名！", '提示', '确定');
                        alert("请输入币种钱包的别名！");
                        return false;
                    }else{
                        if(arr.length==2){
                            if(coincate!=arr[0]){
                                // $rootScope.alert("选择的币种与输入的seed对应币种不一致！", '提示', '确定');
                                 alert("选择的币种与输入的seed对应币种不一致！");
                                 return false;
                              }
                        }else{
                        }
                    }
                }
			}
              var walletname="喵爪币";
              var coinIndex="";


              if(arr.length==1){
                 var coincatea = coincate;
                 var oldseed = coinjson;
                 if(coincate=="mzcoin"){
                       coinIndex="MZC";
                          //  coinjson = coincate+"_"+coinjson;
                  }else if(coincate=="bitcoin"){
                       coinIndex="BTC";
                          //  coinjson = coincate+"_"+coinjson;
                  }else if(coincate=="skycoin"){
                      coinIndex="SKY";
                         //   coinjson = coincate+"_"+coinjson;
                  }else if(coincate=="shellcoin"){
                         coinIndex="SC2";
                         //   coinjson = coincate+"_"+coinjson;
                   }else if(coincate=="suncoin"){
                      coinIndex="SUN";
                       //coinjson = coincate+"_"+coinjson;
                   }else if(coincate=="aynrandcoin"){
                      coinIndex="ARC";
                      //coinjson = coincate+"_"+coinjson;
                  }
              }else if(arr.length==2){
                    var coincatea = arr[0];
                    var oldseed = arr[1];
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
                       //$rootScope.alert("该seed不属于当前任何一个币种！", '提示', '确定');
                      // document.getElementById('coinjson').value="";
                      // return false;
                    }
              }
             // walletname = coinname;
              var array = [];
                 angular.forEach($rootScope.walletinfo, function(data){
                   array.push(data['coinIndex']);
                 });
                // if (in_array(coinIndex,array)) {
                //   $rootScope.alert("已存在该币种", '提示', '确定');
               //  }else
                  console.log(coinIndex+"------------------------"+coinname+"--------------------"+coinjson+"--------------------"+coincatea);

                 if($rootScope.coins[coinIndex].switch == true){
                    /*导入钱包*/
                         WalletService.createWallet(coincatea,oldseed)
                             .then(function(walletid){
                               if(arr.length==1){
                                     $scope.wallet = [{"walletid":coincate+"_"+coinjson,"coinIndex":coinIndex,"walletcolor":2,"walletname":coinname}];
                                }else if(arr.length==2){
                                     $scope.wallet = [{"walletid":coinjson,"coinIndex":coinIndex,"walletcolor":2,"walletname":coinname}];
                                }
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
                 function set_select_checked(selectId, checkValue){
                     var select = document.getElementById(selectId);
                     for (var i = 0; i < select.options.length; i++){
                         if (select.options[i].value == checkValue){
                             select.options[i].selected = true;
                             break;
                         }
                     }
                 }
      }
    }]);
});