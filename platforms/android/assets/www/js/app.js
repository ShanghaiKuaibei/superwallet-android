// {
//     "file": "plugins/cordova-plugin-dialog/walletapi.js",//js文件路径
//     "id": "cordova-plugin-walletapi.WalletapiPlugin",//js cordova.define的id
//     "clobbers": [
//         "webwalletapi"//js 调用时的方法名
//     ]
// },
define([
  'services/services'
],
  function () {
    'use strict';
    var app = angular.module('starter', [
      'ui.router',
      'ngCordova',
      'monospaced.qrcode',
      'starter.services'
    ]);
    app.config(function ($stateProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide) {
        app.register = {
          controller: $controllerProvider.register,
          directive: $compileProvider.directive,
          filter: $filterProvider.register,
          service: $provide.service
        }
        // loadControllerJs
        app.loadControllerJs = function (controllerJs) {
          return function ($q) {
            var def = $q.defer(), deps = [];
            angular.isArray(controllerJs) ? (deps = controllerJs) : deps.push(controllerJs);
            require(deps, function () {
              // $rootScope.$apply(function () {
                def.resolve();
              // });
            });
            return def.promise;
          };
          // return function ($rootScope, $q) {
          //   var def = $q.defer(), deps = [];
          //   angular.isArray(controllerJs) ? (deps = controllerJs) : deps.push(controllerJs);
          //   require(deps, function (deps) {
          //     alert("load succeed"+deps)
          //     def.resolve();
          //   });
          //   alert("def.promise:"+def.promise)
          //   return def.promise;;
          // }
        }
        $urlRouterProvider.otherwise('/');
        $stateProvider
          .state('landing', {
            url: "/",
            templateUrl: "templates/landing.html",
            controller: "LandingCtrl",
            resolve: {
              deps: app.loadControllerJs('./controllers/LandingCtrl')
            }
          })
          .state('login', {
            url: "/login",
            templateUrl: "templates/login.html",
            controller: "LoginCtrl",
            resolve: {
              deps: app.loadControllerJs('./controllers/LoginCtrl')
            }
          })
          .state('reg', {
            url: "/reg",
            templateUrl: "templates/reg.html",
            controller: "RegCtrl",
            resolve: {
              deps: app.loadControllerJs('./controllers/RegCtrl')
            }
          })
          .state('srmima', {
            url: "/srmima",
            templateUrl: "templates/srmima.html"
          })
          // refactoring lock page
          .state('srmima1', {
            url: "/srmima1",
            templateUrl: "templates/srmima1.html",
            controller: "srmimaCtrl1",
            resolve: {
              deps: app.loadControllerJs('./controllers/srmimaCtrl1')
            },
            // controller: app.loadControllerJs('./controllers/srmimaCtrl1')
            // resolve: {
            //   controllerName: ['$stateParams', '$timeout','$q', 
            //       function ($stateParams, $timeout, $q)
            //       {
            //         var deferred = $q.defer();
            //          $timeout(function(){ 
                  
            //           deferred.resolve('MyLazyRevealedCtrl');
                      
            //         },250);
            //         return deferred.promise;
            //       }],
                
            // },
            // controllerProvider:['controllerName', function (controllerName)
            // {
            //     return controllerName;
            // }],
          })
          .state('assets', {
            url: "/assets",
            templateUrl: "templates/assets.html",
            controller: "AssetsCtrl",
            resolve: {
              deps: app.loadControllerJs('./controllers/AssetsCtrl')
            }
          })
          .state('address1', {
            url: "/address1",
            templateUrl: "templates/address1.html",
            controller: "Address1Ctrl",
            resolve: {
              deps: app.loadControllerJs('./controllers/Address1Ctrl')
            }
          })
          .state('address1.addnewaddress', {
            params: { "coinIndex": null },
            url: "/addnewaddress",
            templateUrl: "templates/addnewaddress.html",
            controller: "AddnewaddressCtrl",
            resolve: {
              deps: app.loadControllerJs('./controllers/AddnewaddressCtrl')
            }
          })
          .state('address1.addnewaddress.choice', {
            url: "/choice",
            templateUrl: "templates/choice.html",
            controller: "ChoiceCtrl",
            resolve: {
              deps: app.loadControllerJs('./controllers/ChoiceCtrl')
            }
          })
          .state('jiaoyi.choicecolor', {
            url: "/choicecolor",
            params: { "coins": null },
            templateUrl: "templates/choicecolor.html",
            controller: "ChoicecolorCtrl",
            resolve: {
              deps: app.loadControllerJs('./controllers/ChoicecolorCtrl')
            }
          })
          .state('bak', {
            url: "/bak",
            params: { "walletid": null },
            templateUrl: "templates/bak.html",
            controller: "BakCtrl",
            resolve: {
              deps: app.loadControllerJs('./controllers/BakCtrl')
            }
          })
          .state('address1.importcoin', {
            url: "/importcoin",
            // params:{"walletid":null},
            templateUrl: "templates/importcoin.html",
            controller: "Importcoin",
            resolve: {
              deps: app.loadControllerJs('./controllers/Importcoin')
            }
          })
          .state('bakcode', {
            url: "/bakcode",
            params: { "bakwalletid": null },
            templateUrl: "templates/bakcode.html",
            controller: "BakcodeCtrl",
            resolve: {
              deps: app.loadControllerJs('./controllers/BakcodeCtrl')
            }
          })
          .state('jiaoyi', {
            params: { "wallet": null },
            url: "/jiaoyi",
            templateUrl: "templates/jiaoyi.html",
            controller: "JiaoyiCtrl",
            resolve: {
              deps: app.loadControllerJs('./controllers/JiaoyiCtrl')
            }
          })
          .state('jiaoyi.send', {
            url: "/send",
            templateUrl: "templates/send.html",
            controller: "SendCtrl",
            resolve: {
              deps: app.loadControllerJs('./controllers/SendCtrl')
            }
          })
          .state('assets.version', {
            url: "/version",
            templateUrl: "templates/version.html",
            controller: "VersionCtrl",
            resolve: {
              deps: app.loadControllerJs('./controllers/VersionCtrl')
            }
          })
          .state('jiaoyi.receive', {
            url: "/receive?address",
            templateUrl: "templates/receive.html",
            controller: "ReceiveCtrl",
            resolve: {
              deps: app.loadControllerJs('./controllers/ReceiveCtrl')
            }
          })
          ;
      })
      .run([
        '$rootScope',
        'service',
        function ($rootScope, service) {
          service.dialogs($rootScope);
          service.config($rootScope);
        }])
      ;
    return app;
  });
