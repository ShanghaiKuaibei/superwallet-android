define(['app'], function (app) {
    'use strict';
    app.register.controller('ChoicecolorCtrl', [
        '$scope',
        '$rootScope',
        '$stateParams',
        '$location',
        'WalletService',
        'service',
        function ($scope, $rootScope, $stateParams, $location, WalletService, service) {
            if ($stateParams.coins != "") {
                $scope.coins = $stateParams.coins;
            } else {
                $scope.coins = "";
            }
            service.file($scope);
            service.config($rootScope);
            $scope.setcolor = function (i) {
                $rootScope.walletcolorCur = i;
                if ($scope.coins != "") {
                    //读取文件
                    $scope.readAsText($rootScope.filepath, $rootScope.filename).then(function (success) {
                        var walletjson = $.parseJSON(success);
                        var walletjsona = [];
                        for (var j = 0; j < walletjson.length; j++) {
                            walletjsona[j] = [];
                            if (walletjson[j]['coinIndex'] == $scope.coins) {
                                walletjsona[j] = { 'walletid': walletjson[j]['walletid'], 'coinIndex': walletjson[j]['coinIndex'], 'walletcolor': i, 'walletname': walletjson[j]['walletname'] };
                            } else {
                                walletjsona[j] = { 'walletid': walletjson[j]['walletid'], 'coinIndex': walletjson[j]['coinIndex'], 'walletcolor': walletjson[j]['walletcolor'], 'walletname': walletjson[j]['walletname'] };
                            }
                        }
                        $scope.writeFile($rootScope.filepath, $rootScope.filename, JSON.stringify(walletjsona)).then(function () {
                            $location.url('/assets');
                        }, function () {
                        });
                    });
                }
            }
        }]);
});
