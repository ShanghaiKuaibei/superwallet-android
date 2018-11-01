define(['app', 'services/WalletService'], function(app) {
    'use strict';
    app.register.controller('JiaoyiCtrl', [
        '$scope',
        '$rootScope',
        '$stateParams',
        '$location',
        '$timeout',
        'WalletService',
        'service',
        '$state',
        function($scope, $rootScope, $stateParams, $location, $timeout, WalletService, service, $state) {
            service.file($scope);
            service.config($rootScope);
            $scope.wallet = $stateParams.wallet;
            $scope.willShow = false; //是否显示赢藏地址按钮，如果隐藏过就显示
            $scope.showType = true; //显示交易记录还是地址,true为显示交易记录
            $timeout(getBalance, 100);
            $timeout(getCoinName,100);
            //jeremy 2018-01-09
            // get adress in wallet
            $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
                if (toState.name == "jiaoyi" && fromState.name == "jiaoyi.receive" || toState.name == "jiaoyi" && fromState.name == "jiaoyi.send")
                    $timeout(getaddressinwallet, 100);
            })

            // 获取地址列表，查看本地是否保存，如果没有就从服务器上获取
            function getaddressinwallet() {
                var savedWallet = [],
                    activeList, transtions;
                //获取本地存储的数据
                $scope.checkFile($rootScope.filepath, $rootScope.filename).then(function(success) {
                    $scope.readAsText($rootScope.filepath, $rootScope.filename).then(function(success) {
                        savedWallet = JSON.parse(success);
                        savedWallet.forEach(function(item) {
                            //找到当前选择的钱包
                            if (item.walletid == $scope.wallet.walletid) {
                                activeList = item.adressList;
                                transtions = item.transtions || [];
                                $scope.transactions = transtions
                                //如果已经在本地缓存过就从本地拿，否则去服务器请求
                                if (activeList) {
                                    $scope.adressList = activeList.reverse();;
                                    willShowAdbtn(activeList);
                                    console.log("我是交易记录:")
                                     console.log($scope.transactions)
                                } else {
                                    WalletService.getaddressinwallet($scope.wallet.walletid).then(function(success) {
                                        let adArr = JSON.parse(success).addresses;
                                        let pushArr = [];
                                        adArr.map(function(el) {
                                            pushArr.push({
                                                ad: el,
                                                show: true
                                            })
                                        })
                                        $scope.adressList = pushArr;
                                    })
                                }
                            }
                        });
                    });
                });

            }

            // 同步最新地址信息到本地
            function saveAd() {
                var savedWallet = [];
                //获取本地存储的数据
                $scope.checkFile($rootScope.filepath, $rootScope.filename).then(function(success) {
                    $scope.readAsText($rootScope.filepath, $rootScope.filename).then(function(success) {
                        // console.log(JSON.parse(success))
                        savedWallet = JSON.parse(success);
                        savedWallet.forEach(function(item) {
                            if (item.walletid == $scope.wallet.walletid)
                                item.adressList = $scope.adressList;
                        });
                        $scope.writeFile($rootScope.filepath, $rootScope.filename, JSON.stringify(savedWallet)).then(function() {});
                    });
                });
            }

            // 复制txid
            $scope.copybtn = function(txid) {
                $scope.copy(txid).then(function() {
                    // $rootScope.alert("已复制地址");
                    $rootScope.alert($rootScope.languages.txiduplicated[$rootScope.selectLanguage.selected.id]);
                });
            }

            // 隐藏子地址
            $scope.hideAddress = function(ad) {
                $scope.adressList.forEach(function(el) {
                    if (el.ad == ad) {
                        el.show = false;
                        $scope.willShow = true;
                    }
                });
                saveAd();
            }

            // 显示隐藏的子地址
            $scope.showAddress = function() {
                $scope.adressList.forEach(function(el) {
                    el.show = true;
                });
                $scope.willShow = false;
                saveAd();
            }

            $scope.toggleShowtype = function(isShow) {
                $scope.showType = isShow
            };

            //            是否需要显示隐藏地址按钮？
            function willShowAdbtn(list) {
                list.forEach(function(item) {
                    if (!item.show) {
                        $scope.willShow = true;
                        return false
                    }
                })
            }

            function getCoinName(){
                var activeCoin;
                angular.forEach($rootScope.coins,function(coin,i){
                    if(coin.name == $scope.wallet.coinType){
                        activeCoin = coin;
                    }
                })
                $scope.title = activeCoin.title;
            }


            function getBalance() {
                    WalletService.getBalance($scope.wallet.id).then(function(balance) {
                         var num = $scope.wallet.name == "bitcoin" ? 100000000 : 1000000;
                         $scope.balance = balance / num;;
                     }, function(err) {
                         console.log(err)
                     });

            }


            // Utility functions
            function getCoinTypeFromSeed(walletSeed) {
                var words = walletSeed.split("_");
                return words.length == 2 ? words[0] : "";
            }

            function getNakedSeed(walletSeed) {
                var words = walletSeed.split("_");
                return words.length == 2 ? words[1] : words[0];
            }

            // Hank Gao
            // Delete a wallet involves two actions 
            // 1. remove from walletinfo.json 
            // 2. remove the wallet file 
            $scope.deleteWallet = function() {

                //$scope.wallet = [{ "walletid": success['text'], "coinIndex": coinIndex, "walletcolor": 2, "walletname": walletname }];
                $rootScope.confirm($rootScope.languages.confirmdeletion[$rootScope.selectLanguage.selected.id],

                    $rootScope.languages.DeleteWallet[$rootScope.selectLanguage.selected.id], [$rootScope.languages.Confirm[$rootScope.selectLanguage.selected.id],
                        $rootScope.languages.Cancel[$rootScope.selectLanguage.selected.id]
                    ],

                    function(buttonIndex) {

                        //Hank Gao
                        // if (buttonIndex != 1) { // use click cancel, do nothing 
                        //   return;
                        // }


                        // Hank Gao
                        // TODO: delete wallet file
                        WalletService.deleteWallet($scope.wallet.id).then(function(res) {
                            $location.url('/assets');
                        },function(err){
                            $rootScope.alert(($rootScope.languages.Failedretrieve[$rootScope.selectLanguage.selected.id]));
                        });

                    }
                )
            }
        }
    ]);

    app.register.filter('walletname', function() {
        return function(walletid) {
            return walletid.split("_")[1];
        }
    });
});