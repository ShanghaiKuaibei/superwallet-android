angular.module('starter.services', [])
    .factory('service', [
        '$q',
        '$http',
        '$window',
        '$cordovaDialogs',
        '$cordovaFile',
        '$cordovaZip',
        '$cordovaClipboard',
        '$cordovaBarcodeScanner',
        function($q, $http, $window, $cordovaDialogs, $cordovaFile, $cordovaZip, $cordovaClipboard, $cordovaBarcodeScanner) {
            var config = function($rootScope) {
                $rootScope.lvshapn = "http://120.55.60.140/superwallet/";
                //$rootScope.lvshapn = "http://marry.meiriwenda.com/superwallet/";
                if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                    // iOS
//                    console.log("This is mobile'browser.");
                    $rootScope.filepath = cordova.file.documentsDirectory;
                } else if (/android/i.test(navigator.userAgent)) {
                    //android平台
//                    console.log("This is mobile'browser.");
                    $rootScope.filepath = cordova.file.externalRootDirectory;
                    // 退出程序
                    document.addEventListener("deviceready", onDeviceReady, false);

                    function onDeviceReady() {
                        document.addEventListener("backbutton", function(e) {
                            // alert("0退出！！！")
                            if (window.location.hash == '#/assets' || window.location.hash == '#/srmima') {
                                // alert("退出！！！")
                                //  e.preventDefault();
                                navigator.app.exitApp();
                            } else {
                                // alert("退出。else！！！")
                                // $window.history.go(-1);
                                // history.go(-1);
                                // history.back()
                                // navigator.app.backHistory()
                                // $state.go(-1)
                            }
                        }, false);
                    }
                } else {
//                    console.log("This is pc'browser.");
                    document.addEventListener("deviceready", onDeviceReady, false);

                    function onDeviceReady() {
                        $rootScope.filepath = cordova.file.dataDirectory;
//                        console.log("cordova.file:", cordova.file);
                    }
                }
                $rootScope.filename = "walletinfo.json";
                $rootScope.walletcolorCur = 2; //颜色默认
                $rootScope.walletcolor = [
                    { "color": "#52cad3", "background": "#FFFFFF" },
                    { "color": "#ff6c53", "background": "#FFFFFF" },
                    { "color": "#FFFFFF", "background": "#52cad3" },
                    { "color": "#FFFFFF", "background": "#288add" },
                    { "color": "#FFFFFF", "background": "#fed265" },
                    { "color": "#FFFFFF", "background": "#ff6c53" },
                    { "color": "#fed265", "background": "#30343d" },
                    { "color": "#52cad3", "background": "#30343d" },
                    { "color": "#52cad3", "background": "#ef4b88" }
                ];
//                获取sqlate中的coins信息
                webwalletapi.getDomain(function(domain){
                    webwalletapi.getCoins(function(coins){
                        var res = JSON.parse('{ "data":' + coins + "}")
                        var newObj = {};
                        Object.keys(res.data).forEach(function(key){
                            var item = res.data[key];
                            newObj[item.symbol] = {
                                type: item.symbol,
                                name: item.nameInEnglish,
                                logoURL: domain + item.logoURL,
                                title: [item.nameInEnglish,item.nameInEnglish,item.nameInEnglish,item.nameInChinese],
                                switch: true
                            }
                        })
                        $rootScope.coins = newObj;
                    })
                })


                $rootScope.languages = {
                    "Wallet": ["Wallet", "Cartera", "محفظة", "钱包"],
                    "Discover": ["Discover", "Encuentro", "بحث", "发现"],
                    "TotalAssets": ["Total Assets", "Fondos totales", "موجودات إجمالية", "总资产"],
                    "Exchange": ["BEBTC Exchange", "Cambio de moneda", "صرف شبكة بييي", "币易网兑换"],
                    "coins/tokens": ["P2P buy coins/tokens", "Negociación rápida de moneda en punto a punto", "تجارة العملة السريعة نقطة بنقطة", "点对点快速买卖货币"],
                    "Hotel Booking": ["Hotel Booking", "Reserva de hotel", "حجز غرفة الفندق", "酒店预订"],
                    "Your": ["Book Your Hotel at Super Low Rate", "Reserva de hotel a super bajo precio", "حجز غرفة الفندق بسعر منخفض", "超低价预订酒店"],
                    "Shopping": ["Shopping", "Compras", "تسوق", "购物"],
                    "Coming Soon": ["Coming Soon", "Disponible", "يعرض فورا", "即将推出"],
                    "Endowment Insurance": ["Endowment Insurance", "Seguro de vejez", "تأمين المعاش", "养老保险"],
                    "CopyAddress": ["Copy Address", "Copiar la dirección", "تنسيخ العنوان", "复制地址"],
                    "Copyseed": ["Copy seed", "Copiar semillas", "نسخ البذور", "复制seed"],
                    "Waiting for confirmation": ["Waiting for confirmation", "Espera a confirmar", "انتظار الموافقة", "等待确认"],
                    "Input Error": ["Input Error", "Error de entrada", "خطأ الإدخال", "输入错误"],
                    "Register": ["Register", "Registro", "تسجيل", "注册"],
                    "Login": ["Log in", "Acceso", "دخول", "登录"],
                    "Use": ["Direct Use without Registration", "Usandolo directamente sin registro", "يستعمل مباشرة دون تسجيل", "不注册直接使用"],
                    "SetGesture": ["Set Gesture Password", "Establecer la contraseña de gesto", "إعداد كلمة مرور الشارة", "设置手势密码"],
                    "KeepInMind": ["Keep in Mind Your Gesture Password. You cannot Enter if Forget it.", "Por favor, tenga en cuenta su contraseña de gesto y no entrará en caso de olvidarla.", "احفظ كلمة مرور الشارة الخاصة لكم، لا يمكن الدخول بعد النسيان", "请牢记您的手势密码，忘记后无法进入"],
                    "Gesture": ["Draw Gesture Password Again", "Dibuje de nuevo la contraseña de gesto", "إعادة تجهيز كلمة مرور الشارة", "再次绘制手势密码"],
                    "Username": ["Username", "Nombre de usuario", "اسم المستخدم", "用户名"],
                    "TypeUsername": ["Type Username", "Introduzca el nombre de usuario", "أدخل اسم المستخدم", "输入用户名"],
                    "LoginPassword": ["Log-in Password", "Contraseña de acceso", "كلمة مرور الدخول", "登录密码"],
                    "password": ["Type Password", "Introduzca la contraseña de acceso", "أدخل كلمة مرور الدخول", "输入登录密码"],
                    "TypePassword": ["Type Password Again", "Vuelva a ingresar la contraseña de acceso", "أعد إدخال كلمة مرور الدخول", "再次输入登录密码"],
                    "New": ["Add New Wallet", "Añadir una cartera nueva", "إضافة محفظة جديدة", "添加新钱包"],
                    "Wallet Name": ["Wallet Name", "Nombre de cartera nueva", "اسم محفظة جديدة", "新钱包名称"],
                    "Color": ["Color", "Color", "لون", "颜色"],
                    "Import": ["Import", "Importar", "إ المنسخة", "导入"],
                    "ImportBackup": ["Import Backup Wallet", "Importar la cartera copiada", "إدخال المحفظة المنسخة", "导入已备份钱包"],
                    "Select Color": ["Select Color", "Elija un color", "خيار اللون", "选择颜色"],
                    "device": ["Be sure to back up your wallet before accepting funds. Otherwise, you will not be able to retrieve the funds if you lose your device or uninstall Superwallet.", "Asegúrese de hacer una copia de seguridad de su cartera antes de aceptar fondos. ,De lo contrario, si abandona el dispositivo de prueba o desinstala Superwallet, no podrá recuperar los fondos.", "قبل قبول الرأسمال، احفظ المحفظة وإلا فلا يمكن استرجاع الرأسمال بعد فقدان الجهاز أو إلغاء تثبيت Superwallet.", "接受资金前，请务必备份您的钱包。否则，如果您遗失测设备或者卸载Superwallet将无法找回资金。"],
                    "Backup": ["Backup", "Copia de seguridad", "حفظ", "备份"],
                    "Backingup": ["Is backing up", "Está haciendo una copia de seguridad", "هو النسخ الاحتياطي", "正在备份"],
                    "Seed": ["Export Wallet Seed and Keep it Safe", "Exportar cartera seed, auto-seguro para garantizar la seguridad.", "إخراج seed للمحفظة، الحفظ الذاتي لضمان السلامة", "导出钱包seed自行保管确保安全."],
                    "Up": ["Back Up Now", "Copiar ahora", "جاري الحفظ", "现在备份"],
                    "Receive": ["Receive", "Recibir", "استلام", "接收"],
                    "Send": ["Send", "Enviar", "إرسال", "发送"],
                    "DeleteWallet": ["Delete Wallet", "Borrar cartera", "حذف المحفظة", "删除钱包"],
                    "confirmdeletion": ["confirm deletion?", "Confirmar para borrar?", "هل تريد تأكيد الحذف؟", "确认删除？"],
                    "TransactionRecords": ["Transaction Records", "Historia de trasacción", "سجل الصفقات", "交易记录"],
                    "Send to": ["Send to", "Enviar a", "إرسال إلى", "发送到"],
                    "toAddress": ["To address", "Introduzca la dirección de la otra parte", "أدخل عنوان النظير", "输入对方地址"],
                    "Amount": ["Amount", "Suma de dinero", "قيمة", "金额"],
                    "Message": ["Message", "Mensaje", "رسالة", "留言"],
                    "AddMessage": ["Add Message", "Añadir un mensaje", "إضافة الرسالة", "添加留言"],
                    "Change": ["Change", "Modificar", "تعديل", "更改"],
                    "Balance": ["Balance", " que resta", "الرصيد", "余额"],
                    "Using": ["Using", "Está en uso", "جاري الاستعمال", "正在使用"],
                    "Pay": ["Set Up Pay Pin", "Establecer la contraseña de pago", "إعداد كلمة مرور الدفع", "设置支付密码"],
                    "Pin": ["Type Pay Pin Again", "Introduzca de nuevo la contraseña de pago", "أعد إدخال كلمة مرور الدفع", "再次输入支付密码"],
                    "PleaseUnlock": ["Please unlock", "Desbloquearse por favor", "افتح القفل", "请解锁"],
                    "Unlockfailed": ["Unlock failed", "Error de desbloqueo", "أخفق إلغاء القفل", "解锁失败"],
                    "Unlockedsuccessfully": ["Unlocked successfully", "Desbloqueado correctamente", "تم إلغاء القفل بنجاح", "解锁成功"],
                    "Twoinconsistencies": ["Two inconsistencies", "Dos incoherencias", "اثنين من التناقضات", "两次绘制不一致"],
                    "savedsuccessfully": ["Password saved successfully, please unlock", "Contraseña guardada correctamente, desbloquea", "تم حفظ كلمة المرور بنجاح، يرجى إلغاء القفل", "密码保存成功，请解锁"],
                    "ResetPassword": ["Reset password", "Restablecer contraseña", "إعادة تعيين كلمة المرور", "重置密码"],
                    "Bitcoin": ["Bitcoin", "Moneda Bit", "بيتكوين", "比特币"],
                    "Skycoin": ["Skycoin", "Moneda cielo", "سكايكوين", "天空币"],
                    "Shellcoin": ["Shellcoin", "Moneda concha", "شلكوين", "小贝壳"],
                    "MZCoin": ["MZCoin", "Moneda MZ", "مزكوين", "喵爪币"],
                    "Metalicoin": ["Metalicoin", "Moneda MTL", "عملة معدنية", "贵金属币"],
                    "Lifecoin": ["Lifecoin", "Moneda LIF", " الحياة  عملة ", "生命币"],
                    "SunCoin": ["SunCoin", "Moneda sol", "سانكوين", "太阳币"],
                    "AynRandCoin": ["AynRandCoin", "Moneda Ayn Rand", "أينراندكوين", "安兰德币"],
                    "YongbangCoin": ["YongbangCoin", "Estatus de moneda", "شون  عملة ", "永邦币"],
                    "ShihuCoin": ["ShihuCoin", "La moneda", "توفر  العملة ", "石斛币"],
                    "LiquorCoin": ["LiquorCoin", "El vino de base de la moneda", " النبيذ قاعدة  العملة", "基酒币"],
                    "Import": ["Import", "Importar", "إدخال", "导入"],
                    "ScanTypeSeed": ["Scan or type in seed", "Escanear el código o escribir en seed", "مسح أو إدخال seed", "扫码或输入seed"],
                    "ChooseCoinType": ["Choose coin type", "Elija una moneda", "خيار نوع كوين", "选择币种"],
                    "PleaseTypeAlias": ["Please type in an alias for your wallet", "Haga el favor de introducir otro nombre para su cartera", "أدخل اسم محفظة الكوين", "请输入币种钱包的别称"],
                    "Confirm": ["Confirm", "Confirmar", "موافق", "确定"],
                    "Cancel": ["Cancel", "Cancelar", "إلغاء", "取消"],
                    "PleaseScan": ["Please scan or type in your seed", "Por favorescanear el código o introducir manualmente su seed", "امسح أو أدخل seed يدويا", "请扫码或手动输入seed"],
                    "PleaseValidSeed": ["Please enter a valid seed", "Por favor introduzca la validez de la seed", "يرجى دخول صالحة  seed", "请输入有效的seed"],
                    "ImportWallet": ["Import wallet of a certain type", "Importar la moneda especificada", "إدخال العملة المحددة", "导入指定币种"],
                    "CurrentVersion": ["Current version is", "El número de versión actual es", "النسخة الحالية", "当前版本号为"],
                    "UnderDevelopment": ["Under development", "Está en desarrolla la versión siguiente", "جاري تطوير", "后续版本研发中"],
                    "CoinType": ["Coin type", "Tipo de moneda", "اسم كوين", "币种名称"],
                    "ColorSetting": ["Color setting", "Ajuste de color", "إعداد اللون", "颜色设置"],
                    "RestoreBackup": ["Restore backup	Restaurar", "la copia de seguridad", "استعادة الحفظ", "还原备份"],
                    "ConfirmRestore": ["Confirm to restore ", "¿Determinar la recuperación de", "تحديد الاسترداد", "确定恢复"],
                    "continue": ["continue", "Continuar la ejecución", "استمر في العمل", "继续操作"],
                    "Done": ["Done", "Acabado", "تم", "完成"],
                    "Pleaseselect": ["Please select the currency for importing seed!", "¡Por favor, seleccione la moneda para importar el seed!", "اختر العملة لاستيراد seed！", "请选择导入seed的币种！"],
                    "Theselected": ["The selected currency is inconsistant with the imported seed!", "¡La moneda seleccionada no es consistente con el seed entrado!", "توجد اختلاف بين العملة المختارة والعملة المقابلة لseed المدخلة!", "选择的币种与输入的seed对应币种不一致！"],
                    "Failed": ["Failed to recover seed", "No se puede recuperar el seed", "فشل في إعادة seed", "恢复seed失败"],
                    "Recoverseed": ["Recover seed wallet:", "Recuperar la cartera de seed:", "إعادة محفظة seed:", "恢复seed钱包:"],
                    "Recover": ["Recover the designation", "Recuperar el ajuste", "إعادة التعيين", "恢复指定"],
                    "Failedretrieve": ["Failed to retrieve information:", "Error al recuperar información:", "فشل في إخراج المعلومات:", "取出信息失败:"],
                    "Theseed": ["The seed does not exist", "El seed no existe", "لا توجد seed ل", "的Seed不存在"],
                    "exists": ["This currency already exists", "Esta moneda ya existe", "هذه العملة موجودة", "已存在该币种"],
                    "Createwallet": ["Create wallet:", "Crear cartera:", "إنشاء محفظة:", "创建钱包:"],
                    "Seedduplicated": ["Seed is duplicated", "El seed está duplicado", "قد نسخ seed", "已复制seed"],
                    "Failedcreate": ["Failed to create address:", "No se puede crear la dirección:", "فشل في إنشء العنوان:", "创建地址失败:"],
                    "addressduplicated": ["The address is duplicated", "La dirección está duplicada", "قد نسخ العنوان", "已复制地址"],
                    "txiduplicated": ["The transaction ID duplicated", "Se copia el número de transacción", "نسخ  من رقم المعاملات", "已复制交易编号"],
                    "Input": ["Input ", "Introducir", "إدخال", "输入"],
                    "Address": ["Address", "Dirección", "العنوان", "地址"],
                    "Notice": ["Notice", "Aviso", "الملاحظة", "提示"],
                    "Content": ["Content", "Contenido", "المضمون", "内容"],
                    "Sending": ["Sending", "Enviando", "تحت الإرسال", "正在发送"],
                    "Failure": ["Failure in sending", "Error al enviar", "فشل للإرسال", "发送失败"],
                    "Sentsuccessfully": ["Sent successfully", "Enviado correctamente", "تم الإرسال بنجاح", "发送成功"],
                    "enterinformation": ["Please enter the correct information", "Introduzca la información correcta", "تفضل بإدخال المعلومات الصحيحة", "请输入正确信息"],
                    "Nohistory": ["No transaction history", "Sin registro de transacciones", "لا توجد تسجيل للتداول", "暂无交易记录"],
                    "Transaction": ["Transaction completed", "La transacción está finalizada", "تداول ناجح", "交易成功"],
                    "None": ["None yet", "Ninguno/a todavía", "ليس موجودا مؤقتا", "暂无"],
                    "Backupaddress": ["Backup of address", "Copia de seguridad de la dirección", " العنوان  النسخ الاحتياطي ", "地址备份"],
                    "Without": ["Without backup", "Sin copia de seguridad", "لا توجد النسخ الاحتياطي", "未进行备份"],
                    "Store": ["Store the backup yourself", "Guardar su propia copia de seguridad", "الحفاظ على النسخ الاحتياطي لنفسه", "自己保管备份"],
                    "savelocal": ["It's necessary to save screeshots to local disks", "Es necesario guardar capturas de pantalla en discos locales", "يحتاج إلى حفظه في المحلية", "需要截屏保存到本地"],
                    "scan": ["You may scan and import", "Se puede escanear e importar", "ممكن مسحه للإدخال", "可以扫描导入"],
                    "Online": ["Online backup completed", "Copia de seguridad en línea ya completada", "تم الحفاظ على النسخ الاحتياطي على الانترنت ", "已完成在线备份"],
                    "Addresssetting": ["Address setting", "Configuración de la dirección", "تعداد للعنوان", "地址设置"],
                    "DiscoverNew": ["Discover the new version", "Descubre la nueva versión", "اكتشاف الإصدار الجديد", "发现新版本"],
                    "CheckUpdates": ["Check for updates", "Buscar actualizaciones", "تحقق من وجود تحديثات", "检查更新"],
                    "Update": ["Update", "Actualizar", "تحديث", "更新"],
                    "Installing": ["Installing", "Está siendo instalado", "يتم تثبيته", "正在安装"],
                    "failOpen": ["Fail to open the file", "Error al abrir el archivo", "أخفق فتح الملف", "打开文件失败"],
                    "errorDownloading": ["There was an error downloading", "Se ha producido un error al descargar", "حدث خطأ أثناء التنزيل", "下载时出错"],
                    "Downloaded": ["Downloaded", "Ha sido descargado", "تم تنزيلها", "已下载"],
                    "networkTip": ["Please check the network connection", "Compruebe la conexión de red", "تحقق من اتصال الشبكة", "请检查网络连接"],
                    "showAdTip": ["Display concealment", "Mostrar ocultar", " عرض مخفي", "显示隐藏"],
                    "hide": ["Display concealment", "Oculta", " إخفاء", "隐藏"],
                };


//                TODO: 封装getBalance
//                $rootScope.getBalance = function(id){
//                    webwalletapi.getBalance(id).then(function(res) {
//                        var balance = res;
//                        var num = $rootScope.walletinfo[index].coinIndex == "BTC" ? 100000000 : 1000000;
//                        balance = balance / num;
//                            $rootScope.walletinfo[index].balance = balance;
//                         }, function(err) {
//                            console.log(err)
//                    });
//                }
            }
            var dialogs = function($rootScope) {
                $rootScope.alert = function(message, title, buttonName, callback) {
                    // message = message || "内容";
                    // title = title || "提示";
                    // buttonName = buttonName || "确认";
                    message = message || $rootScope.languages.Content[$rootScope.selectLanguage.selected.id];
                    title = title || $rootScope.languages.Notice[$rootScope.selectLanguage.selected.id];
                    buttonName = buttonName || $rootScope.languages.Confirm[$rootScope.selectLanguage.selected.id];
                    $cordovaDialogs.alert(message, title, buttonName)
                        .then(function() {
                            callback && callback();
                        });
                }
                $rootScope.confirm = function dialogs(message, title, buttonArray, callback) {
                    // message = message || "内容";
                    // title = title || "提示";
                    // buttonArray = buttonArray || ["确认", "取消"];
                    message = message || $rootScope.languages.Content[$rootScope.selectLanguage.selected.id];
                    title = title || $rootScope.languages.Notice[$rootScope.selectLanguage.selected.id];
                    buttonArray = buttonArray || [$rootScope.languages.Confirm[$rootScope.selectLanguage.selected.id], $rootScope.languages.Cancel[$rootScope.selectLanguage.selected.id]];
                    $cordovaDialogs.confirm(message, title, buttonArray)
                        .then(function(buttonIndex) {
                            if (buttonIndex != 1) { // use click cancel, do nothing 
                                return;
                            }
                            callback && callback(buttonIndex);
                        });
                }
            }
            var file = function($scope) {
                //检查文件
                $scope.checkFile = function(filepath, filename) {
                        var deferred = $q.defer();
                        $cordovaFile.checkFile(filepath, filename)
                            .then(function(success) {
                                deferred.resolve(success);
                            }, function(error) {
                                deferred.reject(error);
                            });
                        return deferred.promise;
                    }
                    //创建文件
                $scope.writeFile = function(filepath, filename, message, replace) {
                        replace = replace || true;
                        var deferred = $q.defer();
                        $cordovaFile.writeFile(filepath, filename, message, replace)
                            .then(function(success) {
                                deferred.resolve(success);
                            }, function(error) {
                                deferred.reject(error);
                            });
                        return deferred.promise;
                    }
                    //取出文件信息
                $scope.readAsText = function(filepath, filename) {
                        var deferred = $q.defer();
                        $cordovaFile.readAsText(filepath, filename)
                            .then(function(success) {
                                deferred.resolve(success);
                            }, function(error) {
                                deferred.reject(error);
                            });
                        return deferred.promise;
                    }
                    //解压文件
                $scope.unzip = function(filepath, filename) {
                        var deferred = $q.defer();
                        $cordovaZip.unzip(filepath, filename).then(function(success) {
                            deferred.resolve(success);
                        }, function(error) {
                            deferred.reject(error);
                        }, function(progress) {
                            deferred.notify(progress);
                        });
                        return deferred.promise;
                    }
                    //压缩文件
                $scope.zip = function(PathToFileInString, PathToResultZip) {
                        var deferred = $q.defer();
                        JJzip.zip(PathToFileInString, { target: PathToResultZip, name: "superwallet" }, function(success) {
                            deferred.resolve(success);
                        }, function(error) {
                            deferred.reject(error);
                        });
                        return deferred.promise;
                    }
                    //复制文本
                $scope.copy = function(text) {
                    var deferred = $q.defer();
                    $cordovaClipboard.copy(text).then(function(success) {
                        deferred.resolve(success);
                    }, function() {
                        deferred.reject(error);
                    });
                    return deferred.promise;
                }
                $scope.scan = function() {
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
                config: config,
                dialogs: dialogs,
                file: file
            };
        }
    ]);