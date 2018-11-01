define(['app', 'services/WalletService'], function (app) {
    'use strict';
    app.register.controller('srmimaCtrl1', ['$scope', '$rootScope', 'service', '$window', '$timeout', '$state', function ($scope, $rootScope, service, $window, $timeout, $state) {
        // $scope.qwere.contentText = "请牢记你的手势密码，忘记后无法进入";
        $scope.H5lock = function (obj) {
            this.height = obj.height;
            this.width = obj.width;
            this.chooseType = Number($window.localStorage.getItem('chooseType')) || obj.chooseType;
        };
        // $scope.H5lock.titleText = "设置手势密码"
        $scope.H5lock.titleText = $rootScope.languages.SetGesture[$rootScope.selectLanguage.selected.id]
        $scope.resetShow = true
        $scope.contentShow = false
        $scope.H5lock.prototype.drawCle = function () { // 初始化解锁密码面板
            for (var i = 0; i < this.lastPoint.length; i++) {
                this.ctx.strokeStyle = '#fff';
                this.ctx.lineWidth = 1;
                this.ctx.beginPath();
                this.ctx.arc(this.lastPoint[i].x, this.lastPoint[i].y, this.r, 0, Math.PI * 2, true);
                this.ctx.closePath();
                this.ctx.stroke();
            }
        }
        $scope.H5lock.prototype.drawPoint = function (x, y) { // 初始化圆心
            this.ctx.fillStyle = '#fff';
            this.ctx.beginPath();
            this.ctx.arc(x, y, this.r / 5, 0, Math.PI * 4, true);
            this.ctx.closePath();
            this.ctx.fill();
        }
        $scope.H5lock.prototype.drawPoint_error = function (type) { // 错误圆心
            for (var i = 0; i < this.lastPoint.length; i++) {
                this.ctx.fillStyle = type;
                this.ctx.beginPath();
                this.ctx.arc(this.lastPoint[i].x, this.lastPoint[i].y, this.r / 3, 0, Math.PI * 2, true);
                this.ctx.closePath();
                this.ctx.fill();
            }
        }
        $scope.H5lock.prototype.drawStatusPoint = function (type) { // 初始化状态线条
            for (var i = 0; i < this.lastPoint.length; i++) {
                this.ctx.strokeStyle = type;
                this.ctx.beginPath();
                this.ctx.arc(this.lastPoint[i].x, this.lastPoint[i].y, this.r, 0, Math.PI * 2, true);
                this.ctx.closePath();
                this.ctx.stroke();
            }
        }
        $scope.H5lock.prototype.drawLine = function (po, lastPoint) {// 解锁轨迹
            this.ctx.beginPath();
            this.ctx.lineWidth = 1;
            this.ctx.moveTo(this.lastPoint[0].x, this.lastPoint[0].y);
//            console.log(this.lastPoint.length);
            for (var i = 1; i < this.lastPoint.length; i++) {
                this.ctx.lineTo(this.lastPoint[i].x, this.lastPoint[i].y);
            }
            this.ctx.lineTo(po.x, po.y);
            this.ctx.stroke();
            this.ctx.closePath();
        }
        $scope.H5lock.prototype.createCircle = function () {// 创建解锁点的坐标，根据canvas的大小来平均分配半径
            var n = this.chooseType;
            var count = 0;
            this.r = this.ctx.canvas.width / (2 + 4 * n);// 公式计算
            this.lastPoint = [];
            this.arr = [];
            this.restPoint = [];
            var r = this.r;
            for (var i = 0; i < n; i++) {
                for (var j = 0; j < n; j++) {
                    count++;
                    var obj = {
                        x: j * 4 * r + 3 * r,
                        y: i * 4 * r + 3 * r,
                        index: count
                    };
                    this.arr.push(obj);
                    this.restPoint.push(obj);
                }
            }
            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
            for (var i = 0; i < this.arr.length; i++) {
                this.drawPoint(this.arr[i].x, this.arr[i].y);
            }
        }
        $scope.H5lock.prototype.getPosition = function (e) {// 获取touch点相对于canvas的坐标
            var rect = e.currentTarget.getBoundingClientRect();
            var po = {
                x: e.touches[0].clientX - rect.left,
                y: e.touches[0].clientY - rect.top
            };
            return po;
        }
        $scope.H5lock.prototype.update = function (po) {// 核心变换方法在touchmove时候调用
            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
            for (var i = 0; i < this.arr.length; i++) { // 每帧先把面板画出来
                //this.drawCle(this.arr[i].x, this.arr[i].y);
                this.drawPoint(this.arr[i].x, this.arr[i].y);
            }
            this.drawLine(po, this.lastPoint);// 每帧花轨迹
            this.drawCle(this.lastPoint);//每帧画边框
            for (var i = 0; i < this.restPoint.length; i++) {
                if (Math.abs(po.x - this.restPoint[i].x) < this.r && Math.abs(po.y - this.restPoint[i].y) < this.r) {
                    this.drawPoint(this.restPoint[i].x, this.restPoint[i].y);
                    this.lastPoint.push(this.restPoint[i]);
                    this.restPoint.splice(i, 1);
                    break;
                }
            }
        }
        $scope.H5lock.prototype.checkPass = function (psw1, psw2) {// 检测密码
            var p1 = '',
                p2 = '';
            for (var i = 0; i < psw1.length; i++) {
                p1 += psw1[i].index + psw1[i].index;
            }
            for (var i = 0; i < psw2.length; i++) {
                p2 += psw2[i].index + psw2[i].index;
            }
            return p1 === p2;
        }
        $scope.H5lock.prototype.storePass = function (psw) {// touchend结束之后对密码和状态的处理
            if (this.pswObj.step == 1) {
                $scope.$apply(function () {
                    // $scope.H5lock.titleText = '再次绘制手势密码';
                    $scope.H5lock.titleText = $rootScope.languages.Gesture[$rootScope.selectLanguage.selected.id];
                    $scope.contentShow = true
                })
                if (this.checkPass(this.pswObj.fpassword, psw)) {
                    this.pswObj.step = 2;
                    this.pswObj.spassword = psw;
                    $scope.$apply(function () {
                        // $scope.H5lock.titleText = '密码保存成功，请解锁';
                        $scope.H5lock.titleText = $rootScope.languages.savedsuccessfully[$rootScope.selectLanguage.selected.id];
                    })
                    this.drawStatusPoint('#2CFF26');
                    $window.localStorage.setItem('passwordxx', JSON.stringify(this.pswObj.spassword));
                    $window.localStorage.setItem('chooseType', this.chooseType);
                } else {
                    $scope.$apply(function () {
                        // $scope.H5lock.titleText = '两次绘制不一致';
                        $scope.H5lock.titleText = $rootScope.languages.Twoinconsistencies[$rootScope.selectLanguage.selected.id];
                        $scope.resetShow = true
                    })
                    this.drawStatusPoint('#ff6c53');
                    delete this.pswObj.step;
                }
            } else if (this.pswObj.step == 2) {
                if (this.checkPass(this.pswObj.spassword, psw)) {
                    $scope.$apply(function () {
                        // $scope.H5lock.titleText = '解锁成功';
                        $scope.H5lock.titleText = $rootScope.languages.Unlockedsuccessfully[$rootScope.selectLanguage.selected.id];
                    })
                    this.drawStatusPoint('#2CFF26');
                    return 1;
                } else {
                    this.drawPoint_error('#ff6c53');
                    this.drawStatusPoint('#ff6c53');
                    $scope.$apply(function () {
                        // $scope.H5lock.titleText = '解锁失败';
                        $scope.H5lock.titleText = $rootScope.languages.Unlockfailed[$rootScope.selectLanguage.selected.id];
                        $scope.resetShow = true
                    })
                }
            } else {
                this.pswObj.step = 1;
                this.pswObj.fpassword = psw;
                $scope.$apply(function () {
                    // $scope.H5lock.titleText = '再次绘制手势密码';
                    $scope.H5lock.titleText = $rootScope.languages.Gesture[$rootScope.selectLanguage.selected.id];
                })
                // $scope.H5lock.titleText = $rootScope.languages.SetGesture;
            }
        }
        $scope.H5lock.prototype.makeState = function () {
            if (this.pswObj.step == 2) {
                // $scope.resetShow = true
                // $scope.H5lock.titleText = '请解锁';
                $scope.H5lock.titleText = $rootScope.languages.PleaseUnlock[$rootScope.selectLanguage.selected.id];
                $scope.contentShow = false
                // } else if (this.pswObj.step == 1) {
                //     $scope.resetShow = false
            } else {
                // $scope.$apply(function () {
                    $scope.resetShow = false
                // })
            }
        }
        $scope.H5lock.prototype.setChooseType = function (type) {
            chooseType = type;
            init();
        }

        $scope.H5lock.prototype.init = function () {
            this.pswObj = $window.localStorage.getItem('passwordxx') ? {
                step: 2,
                spassword: JSON.parse($window.localStorage.getItem('passwordxx'))
            } : {};
            this.lastPoint = [];
            this.makeState();
            this.touchFlag = false;
//            console.log('canvas.angular:', angular.element("#canvas"))
//            console.log('canvas.angular0:', angular.element("#canvas")[0])
            var canvas = angular.element("#canvas")[0]
//            console.log('canvas:', canvas)
            this.canvas = canvas
            this.ctx = this.canvas.getContext('2d');
            this.createCircle();
            this.bindEvent();
        }
        $scope.H5lock.prototype.reset = function () {
            this.makeState();
            this.createCircle();
            // $state.reload()
        }
        $scope.H5lock.prototype.bindEvent = function () {
            var self = this;
            this.canvas.addEventListener("touchstart", function (e) {
                e.preventDefault();// 某些android 的 touchmove不宜触发 所以增加此行代码
                var po = self.getPosition(e);
//                console.log(po);
                for (var i = 0; i < self.arr.length; i++) {
                    if (Math.abs(po.x - self.arr[i].x) < self.r && Math.abs(po.y - self.arr[i].y) < self.r) {
                        self.touchFlag = true;
                        self.drawPoint(self.arr[i].x, self.arr[i].y);
                        self.lastPoint.push(self.arr[i]);
                        self.restPoint.splice(i, 1);
                        break;
                    }
                }
            }, false);
            this.canvas.addEventListener("touchmove", function (e) {
                if (self.touchFlag) {
                    self.update(self.getPosition(e));
                }
            }, false);
            this.canvas.addEventListener("touchend", function (e) {
                if (self.touchFlag) {
                    self.touchFlag = false;
                    if (self.storePass(self.lastPoint) == 1) {
                        $(".canvas").remove();
                        $window.location.href = "#/assets";
                    } else {
                        setTimeout(function () {
                            self.reset();
                        }, 300);
                    }
                }
            }, false);
            //  angular.element(document.addEventListener('touchmove'), function(e){
            //     e.preventDefault();
            //  },false);
            angular.element('#updatePassword')[0].addEventListener('click', function () {
                self.updatePassword();
            });
        }
        // $scope.$on('$viewContentLoaded', function() {
        //     console.log('$viewContentLoaded')
        //     new H5lock({ chooseType: 3 }).init();
        // });
        // $scope.$on('$stateChangeSuccess', function () {
        //   });

        $scope.H5lock.prototype.updatePassword = function () {
            // alert("updatePassword");
            $window.localStorage.removeItem('passwordxx');
            $window.localStorage.removeItem('chooseType');
            this.pswObj = {};
            // console.log("titleText:", $scope.H5lock.titleText)
            // angular.element("#title")[0].text('请绘制手势密码');
            $scope.$apply(function () {
                // $scope.H5lock.titleText = '请绘制手势密码';
                $scope.H5lock.titleText = $rootScope.languages.SetGesture[$rootScope.selectLanguage.selected.id];
                $scope.contentShow = true
                $scope.resetShow = false
            })
            this.reset();
        }
        $scope.load = function () {
            // alert("Window is loaded");
            new $scope.H5lock({ chooseType: 3 }).init();
        }
    }]);
});
