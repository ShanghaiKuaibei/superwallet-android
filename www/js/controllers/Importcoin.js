define(['app'], function(app) {
    'use strict';
    app.register.controller('Importcoin', [
        '$scope',
        '$state',
        '$rootScope',
        '$stateParams',
        '$location',
        'WalletService',
        'service',
        function($scope, $state, $rootScope, $stateParams, $location, WalletService, service) {
            // 恢复seed失败'
            $scope.failed = $rootScope.languages.Failed[$rootScope.selectLanguage.selected.id]

            $scope.changenamea = function(coinjson) {
                $scope.coinjson = coinjson;
            }

            $scope.changenameb = function(coinname) {
                $scope.coinname = coinname;
            }

            service.file($scope);

            $scope.coins = $rootScope.coins;

            $scope.unzipbtn = function() {
                $scope.scan().then(function(success) {
                    // var arr = success['text'].split("_");
                    document.getElementById('coinjson').value = success['text'];
                }, function(error) {
                  // failed to scan
                  // do nothing
                });
            }

            $scope.changecoincate = function() {
                var coinjson = document.getElementById('coinjson').value;
                var arra = coinjson.split("_");
                if (arra.length == 2) {
                    var select = document.getElementById("coincate");
                    for (var i = 0; i < select.options.length; i++) {
                        if (select.options[i].value == arra[0]) {
                            select.options[i].selected = true;
                            break;
                        }
                    }
                }
            }

            $scope.importcoinconfirm = function() {

                // concate ==> coinType
                // coinjson ==> walletSeed
                // coinname ==> walletLabel
                // Why not use jQuery here?
                var coinType = document.getElementById("coincate").value;
                var walletSeed = document.getElementById('coinjson').value;
                var walletLabel = document.getElementById("coinname").value;

                // check validity of data
                if (walletSeed == "") {
                    //$rootScope.alert("请选择导入seed的币种！", '提示', '确定');
                    alert($rootScope.languages.PleaseScan[$rootScope.selectLanguage.selected.id], '', $rootScope.languages.Confirm[$rootScope.selectLanguage.selected.id]);
                    //  alert("请扫码导入或者手动输入seed！");
                    return false;
                  }

                if (coinType == "") {
                    // $rootScope.alert("请扫码或者输入seed！", '提示', '确定');
                    alert($rootScope.languages.PleaseScan[$rootScope.selectLanguage.selected.id], '', $rootScope.languages.Confirm[$rootScope.selectLanguage.selected.id]);
                    //  alert("请选择导入seed的币种！");
                    return false;
                  }

                if (walletLabel == "") {
                    // $rootScope.alert("请输入币种别名！", '提示', '确定');
                    alert($rootScope.languages.PleaseTypeAlias[$rootScope.selectLanguage.selected.id], '', $rootScope.languages.Confirm[$rootScope.selectLanguage.selected.id]);
                    // alert("请输入币种钱包的别名！");
                    return false;
                  }

                if(!isValidSeed(walletSeed)) {
                   // $rootScope.alert("请输入有效的seed！", '提示', '确定');
                   alert($rootScope.languages.PleaseValidSeed[$rootScope.selectLanguage.selected.id], '', $rootScope.languages.Confirm[$rootScope.selectLanguage.selected.id]);
                  // TODO: add multiple language warning
                  return false;
                }

                var coinTypeEmbedded = getCoinTypeFromSeed(walletSeed);
                if(coinTypeEmbedded !== "" && coinTypeEmbedded !== coinType) {
                  // $rootScope.alert("选择的币种与输入的seed对应币种不一致！", '提示', '确定');
                  alert($rootScope.languages.Theselected[$rootScope.selectLanguage.selected.id], '', $rootScope.languages.Confirm[$rootScope.selectLanguage.selected.id]);
                  return false; 
                }

                // finally, we have all we need


                var oldSeed = getNakedSeed(walletSeed);

                WalletService.createWallet(coinType,oldSeed,walletLabel,$rootScope.walletcolorCur).then(function(id) {
                    WalletService.getWalletOrder().then(function(ods){
                        var orders = ods == '' ? [] : ods.split(',');
                        orders.push(id);
                        WalletService.memorizeWalletOrder(orders.join(","));
                         $location.url('/assets');
                    });

                }, function(error) {
                    $rootScope.alert($rootScope.languages.Createwallet[$rootScope.selectLanguage.selected.id] + error);
                    // $rootScope.alert("创建钱包:" + error);
                });

                // utility functions
                // check if it is a valid wallet seed
                function isValidSeed(walletSeed) {
                  // 0 or 1 "_"
                  var words = walletSeed.split("_");
                  if (words.length > 2) return false; 

                  var nakedSeed = words.length == 2 ? words[1] : words[0];

                  // there should be 12 words 
                  if(nakedSeed.split(" ").length != 12) return false; 

                  // finally
                  return true;
                }

                function getCoinTypeFromSeed(walletSeed) {
                  var words = walletSeed.split("_");
                  return words.length == 2 ? words[0] : "";
                }

                function getNakedSeed(walletSeed) {
                  var words = walletSeed.split("_");
                  return words.length == 2 ? words[1] : words[0];                  
                }
            }
        }
    ]);
});