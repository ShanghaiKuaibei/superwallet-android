define(['app'], function(app) {
    'use strict';
    app.register.controller('SendCtrl', [
        '$scope',
        '$rootScope',
        '$stateParams',
        'service',
        'WalletService',
        function($scope, $rootScope, $stateParams, service, WalletService) {
            service.file($scope);
            // "发送失败"
            $scope.Failure = $rootScope.languages.Failure[$rootScope.selectLanguage.selected.id]
            $scope.wallet = $stateParams.wallet;
            // $scope.sendplaceholder = $rootScope.languages.Input[$rootScope.selectLanguage.selected.id] + $rootScope.coins[$scope.wallet.coinIndex].title[$rootScope.selectLanguage.selected.id] + $rootScope.languages.Address[$rootScope.selectLanguage.selected.id]
            $scope.scanbtn = function() {
                $scope.scan().then(function(success) {
                    $scope.toaddr = success['text'];
                }, function(error) {

                });
            }
            $scope.seed = function() {
                if (!$scope.toaddr || $scope.amount <= 0 || !$scope.amount) {
                    // $rootScope.alert("请输入正确信息");
                    $rootScope.alert($rootScope.languages.enterinformation[$rootScope.selectLanguage.selected.id]);
                    return false;
                }
                if ($rootScope.coins[$scope.wallet.coinIndex].name == "skycoin") {
                    $scope.amount = $scope.amount * 1000000;
                    WalletService.sendSkycoin($scope.wallet.walletid, $scope.toaddr, $scope.amount).then(function(res) {
                        sendSuccess($scope.toaddr, $scope.amount, res);
                        // },function(){$rootScope.alert("发送失败");});
                    }, function() { $rootScope.alert($scope.Failure); });
                    $scope.amount = $scope.amount / 1000000;
                } else if ($rootScope.coins[$scope.wallet.coinIndex].name == "mzcoin") {
                    $scope.amount = $scope.amount * 1000000;
                    WalletService.sendMzcoin($scope.wallet.walletid, $scope.toaddr, $scope.amount).then(function(res) {
                        sendSuccess($scope.toaddr, $scope.amount, res);
                    }, function() { $rootScope.alert($scope.Failure); });
                    $scope.amount = $scope.amount / 1000000;
                } else if ($rootScope.coins[$scope.wallet.coinIndex].name == "bitcoin") {
                    $scope.amount = $scope.amount * 100000000;
                    WalletService.sendBitcoin($scope.wallet.walletid, $scope.toaddr, $scope.amount).then(function(res) {
                        sendSuccess($scope.toaddr, $scope.amount, res);
                    }, function() { $rootScope.alert($scope.Failure); });
                    $scope.amount = $scope.amount / 100000000;
                } else if ($rootScope.coins[$scope.wallet.coinIndex].name == "shellcoin") {
                    $scope.amount = $scope.amount * 1000000;
                    WalletService.sendShellcoin($scope.wallet.walletid, $scope.toaddr, $scope.amount).then(function(res) {
                        sendSuccess($scope.toaddr, $scope.amount, res);
                    }, function() { $rootScope.alert($scope.Failure); });
                    $scope.amount = $scope.amount / 1000000;
                } else if ($rootScope.coins[$scope.wallet.coinIndex].name == "suncoin") {
                    $scope.amount = $scope.amount * 1000000;
                    WalletService.sendSuncoin($scope.wallet.walletid, $scope.toaddr, $scope.amount).then(function(res) {
                        sendSuccess($scope.toaddr, $scope.amount, res);
                    }, function() { $rootScope.alert($scope.Failure); });
                    $scope.amount = $scope.amount / 1000000;
                } else if ($rootScope.coins[$scope.wallet.coinIndex].name == "aynrandcoin") {
                    $scope.amount = $scope.amount * 1000000;
                    WalletService.sendAynrandcoin($scope.wallet.walletid, $scope.toaddr, $scope.amount).then(function(res) {
                        sendSuccess($scope.toaddr, $scope.amount, res);
                    }, function() { $rootScope.alert($scope.Failure); });
                    $scope.amount = $scope.amount / 1000000;
                }
                var sendSuccess = function(toad, amount, res) {
                    $rootScope.alert($rootScope.languages.Sentsuccessfully[$rootScope.selectLanguage.selected.id]);
                    $scope.wallet.balance = $scope.wallet.balance - $scope.amount;
                    angular.forEach($rootScope.walletinfo, function(wallet, index) {
                        if (wallet['walletid'] == $scope.wallet.walletid) {
                            $rootScope.walletinfo[index].balance = $scope.wallet.balance;
                        }
                    });

                    //          存入发送记录
                    $scope.checkFile($rootScope.filepath, $rootScope.filename).then(function(success) {
                        $scope.readAsText($rootScope.filepath, $rootScope.filename).then(function(success) {
                            var savedWallet = JSON.parse(success);

                            savedWallet.forEach(function(item) {
                                if (item.walletid == $scope.wallet.walletid) {
                                    item.transtions = item.transtions || [];
                                    var date = '';
                                    var nowDate = new Date();
                                    date = nowDate.getFullYear() + '-' + nowDate.getMonth() + 1 + '-' + nowDate.getDate() + ' ' + nowDate.getHours() + ':' + nowDate.getMinutes();
                                    item.transtions.unshift({
                                        txid: JSON.parse(res).txid,
                                        amount: amount,
                                        date: date
                                    })
                                }
                            });

                            $scope.writeFile($rootScope.filepath, $rootScope.filename, JSON.stringify(savedWallet)).then(function() {});

                            history.go(-1);
                        });
                    });
                }
            }
        }
    ]);
    app.register.filter('walletname', function() {
        return function(walletid) {
            return walletid.split("_")[1];
        }
    });
});