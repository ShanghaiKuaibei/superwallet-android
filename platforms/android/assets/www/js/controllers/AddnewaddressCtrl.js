define(['app', 'services/WalletService'], function(app) {
    'use strict';
    app.register.controller('AddnewaddressCtrl', [
        '$scope',
        '$rootScope',
        '$stateParams',
        '$location',
        'WalletService',
        'service',
        function($scope, $rootScope, $stateParams, $location, WalletService, service) {
            service.file($scope);
            service.config($rootScope);
            $scope.coinIndex = $stateParams.coinIndex;
            $scope.walletname = $rootScope.coins[$scope.coinIndex].title[$rootScope.selectLanguage.selected.id];
            $scope.changename = function(walletname) {
                    $scope.walletname = walletname;
                }
                // 恢复seed失败'
            $scope.failed = $rootScope.languages.Failed[$rootScope.selectLanguage.selected.id]
            $scope.unzipbtn = function() {
                // $rootScope.confirm('确定要恢复' + $scope.coinIndex + '？继续操作', '还原备份', ['确定', '取消'], function (buttonIndex) {
                $rootScope.confirm($rootScope.languages.ConfirmRestore[$rootScope.selectLanguage.selected.id] + $scope.coinIndex + '?' + $rootScope.languages.continue[$rootScope.selectLanguage.selected.id], $rootScope.languages.RestoreBackup[$rootScope.selectLanguage.selected.id], [$rootScope.languages.Confirm[$rootScope.selectLanguage.selected.id], $rootScope.languages.Cancel[$rootScope.selectLanguage.selected.id]], function(buttonIndex) {
                    if (buttonIndex == 1) {
                        $scope.scan().then(function(success) {
                            var arr = success['text'].split("_");
                            console.log(success['text']);
                            //  var coinstr = arr[0].toUpperCase();
                            //  var coinIndex = coinstr.substr(0,coinstr.length-3);
                            // var walletname = "喵爪币";
                            var walletname = $rootScope.languages.MZCoin[$rootScope.selectLanguage.selected.id];
                            var coinIndex = "";
                            if (arr[0] == "mzcoin") {
                                coinIndex = "MZC";
                                // walletname = "喵爪币";
                                walletname = $rootScope.languages.MZCoin[$rootScope.selectLanguage.selected.id];
                            } else if (arr[0] == "bitcoin") {
                                coinIndex = "BTC";
                                // walletname = "特比币";
                                walletname = $rootScope.languages.Bitcoin[$rootScope.selectLanguage.selected.id];
                            } else if (arr[0] == "skycoin") {
                                coinIndex = "SKY";
                                // walletname = "天空币";
                                walletname = $rootScope.languages.Skycoin[$rootScope.selectLanguage.selected.id];
                            } else if (arr[0] == "shellcoin") {
                                coinIndex = "SC2";
                                // walletname = "小贝壳";
                                walletname = $rootScope.languages.Shellcoin[$rootScope.selectLanguage.selected.id];
                            } else if (arr[0] == "suncoin") {
                                coinIndex = "SUN";
                                // walletname = "太阳币";
                                walletname = $rootScope.languages.SunCoin[$rootScope.selectLanguage.selected.id];
                            } else if (arr[0] == "aynrandcoin") {
                                coinIndex = "ARC";
                                // walletname = "安兰德币";
                                walletname = $rootScope.languages.AynRandCoin[$rootScope.selectLanguage.selected.id];
                            }
                            if (coinIndex != $scope.coinIndex) {
                                // alert(coinIndex);
                                alert($rootScope.languages.Recover[$rootScope.selectLanguage.selected.id] + arr[0] + $rootScope.languages.Theseed[$rootScope.selectLanguage.selected.id]);
                                // alert("恢复指定" + arr[0] + "的Seed不存在!");
                                return false;
                            }
                            var array = [];
                            angular.forEach($rootScope.walletinfo, function(data) {
                                array.push(data['coinIndex']);
                            });
                            if (in_array(coinIndex, array)) {
                                // $rootScope.alert("已存在该币种", '提示', '确定');
                                $rootScope.alert($rootScope.languages.exists[$rootScope.selectLanguage.selected.id], $rootScope.languages.Notice[$rootScope.selectLanguage.selected.id], $rootScope.languages.Confirm[$rootScope.selectLanguage.selected.id]);
                            } else if ($rootScope.coins[coinIndex].switch == true) {
                                //导入钱包
                                WalletService.createWallet(arr[0], $scope.walletname)
                                    .then(function(walletid) {
                                        $scope.wallet = [{ "walletid": success['text'], "coinIndex": coinIndex, "walletcolor": 2, "walletname": walletname }];
                                        $scope.checkFile($rootScope.filepath, $rootScope.filename).then(function(success) {
                                            $scope.readAsText($rootScope.filepath, $rootScope.filename).then(function(success) {
                                                $scope.writeFile($rootScope.filepath, $rootScope.filename, JSON.stringify(JSON.parse(success).concat($scope.wallet))).then(function() {
                                                    $location.url('/assets');
                                                }, function() {
                                                    $rootScope.alert($scope.failed + $rootScope.filepath + $rootScope.filename);
                                                });
                                            }, function() {
                                                $rootScope.alert($scope.failed + $rootScope.filepath + $rootScope.filename);
                                            });
                                        }, function(error) {
                                            $scope.writeFile($rootScope.filepath, $rootScope.filename, JSON.stringify($scope.wallet)).then(function() {
                                                $location.url('/assets');
                                            }, function() {
                                                $rootScope.alert($scope.failed + $rootScope.filepath + $rootScope.filename);
                                            });
                                        });
                                    }, function(error) {
                                        $rootScope.alert($rootScope.languages.Recoverseed[$rootScope.selectLanguage.selected.id] + error);
                                    });
                                //创建钱包结束
                                //$state.go('.importcoin');
                            }

                            function in_array(search, array) {
                                for (var i in array) {
                                    if (array[i] == search) {
                                        return true;
                                    }
                                }
                                return false;
                            }

                        }, function(error) {

                        });

                    }
                });
            }



            $scope.finish = function() {
                WalletService.createWallet($rootScope.coins[$scope.coinIndex]['name'], "")
                    .then(function(walletid) {
                        $scope.wallet = [{ "walletid": walletid, "coinIndex": $scope.coinIndex, "walletcolor": $rootScope.walletcolorCur, "walletname": $scope.walletname }];
                        $scope.checkFile($rootScope.filepath, $rootScope.filename)
                            .then(function(success) {
                                $scope.readAsText($rootScope.filepath, $rootScope.filename)
                                    .then(function(success) {
                                        $scope.writeFile($rootScope.filepath, $rootScope.filename, JSON.stringify(JSON.parse(success).concat($scope.wallet)))
                                            .then(function() {
                                                $location.url('/assets');
                                            }, function() {
                                                $rootScope.alert($rootScope.languages.Failedcreate[$rootScope.selectLanguage.selected.id] + $rootScope.filepath + $rootScope.filename);
                                                // $rootScope.alert("创建文件失败:" + $rootScope.filepath + $rootScope.filename);
                                            });
                                    }, function() {
                                        $rootScope.alert(($rootScope.languages.Failedretrieve[$rootScope.selectLanguage.selected.id] + $rootScope.filepath + $rootScope.filename));
                                        // $rootScope.alert("取出信息失败:" + $rootScope.filepath + $rootScope.filename);
                                    });
                            }, function(error) {
                                $scope.writeFile($rootScope.filepath, $rootScope.filename, JSON.stringify($scope.wallet)).then(function() {
                                    $location.url('/assets');
                                }, function() {
                                    $rootScope.alert($rootScope.languages.Failedcreate[$rootScope.selectLanguage.selected.id] + $rootScope.filepath + $rootScope.filename);
                                    // $rootScope.alert("创建文件失败:" + $rootScope.filepath + $rootScope.filename);
                                });
                            });
                    }, function(error) {
                        $rootScope.alert($rootScope.languages.Createwallet[$rootScope.selectLanguage.selected.id] + error);
                        // $rootScope.alert("创建钱包:" + error);
                    });
            }

        }
    ]);
});