angular.module('starter.services', [])
  .factory('service', [
    '$q',
    '$http',
    '$cordovaDialogs',
    '$cordovaFile',
    '$cordovaZip',
    '$cordovaClipboard',
    '$cordovaBarcodeScanner',
    function ($q, $http, $cordovaDialogs, $cordovaFile, $cordovaZip, $cordovaClipboard, $cordovaBarcodeScanner) {
      var config = function ($rootScope) {
        $rootScope.lvshapn = "http://120.55.60.140/superwallet/";
        //$rootScope.lvshapn = "http://marry.meiriwenda.com/superwallet/";
        if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){
          // iOS
          console.log("This is mobile'browser.");
          $rootScope.filepath = cordova.file.documentsDirectory;
        } else if(/android/i.test(navigator.userAgent)){
          //android平台
          console.log("This is mobile'browser.");
          $rootScope.filepath = cordova.file.externalRootDirectory;
          // 退出程序
          document.addEventListener("deviceready", onDeviceReady, false);
          
          function onDeviceReady(){
              document.addEventListener("backbutton", function(e){
                // alert("0退出！！！")
                 if(window.location.hash=='#/assets'){
                      // alert("退出！！！")
                      //  e.preventDefault();
                      navigator.app.exitApp();
                    }
                  else {
                      // alert("退出。else！！！")
                      // history.back()
                      navigator.app.backHistory()
                 }
              }, false);
          }
        } else {
          console.log("This is pc'browser.");
          document.addEventListener("deviceready", onDeviceReady, false);
          function onDeviceReady() {
              $rootScope.filepath = cordova.file.dataDirectory;
              console.log("cordova.file:", cordova.file);
            }
        }
        $rootScope.filename = "walletinfo.json";
        $rootScope.walletcolorCur = 2;//颜色默认
        //suncoin, aynrandcoin
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
        // $rootScope.coins = {
        //   "BTC": { "type": "BTC", "name": "bitcoin", "title": "比特币", "switch": true },
        //   "SKY": { "type": "SKY", "name": "skycoin", "title": "天空币", "switch": true },
        //   "SC2": { "type": "SC2", "name": "shellcoin", "title": "小贝壳", "switch": true },
        //   "MZC": { "type": "MZC", "name": "mzcoin", "title": "喵爪币", "switch": true },
        //   "SUN": { "type": "SUN", "name": "suncoin", "title": "太阳币", "switch": true },
        //   "ARC": { "type": "ARC", "name": "aynrandcoin", "title": "安兰德币", "switch": true }
        // };
        $rootScope.coins = {
          "BTC": {
            "type": "BTC", "name": "bitcoin", "title": [
              "Bitcoin",
              "Moneda Bit",
              "بيتكوين",
              "比特币"], "switch": true
          },
          "SKY": {
            "type": "SKY", "name": "skycoin", "title": [
              "Skycoin",
              "Moneda cielo",
              "سكايكوين",
              "天空币"
            ], "switch": true
          },
          "SC2": { "type": "SC2", "name": "shellcoin", "title": [
            "Shellcoin",
            "Moneda concha",
            "شلكوين",
            "小贝壳"
          ], "switch": true },
          "MZC": { "type": "MZC", "name": "mzcoin", "title": [
            "MZCoin",
            "Moneda MZ",
            "مزكوين",
            "喵爪币"
          ], "switch": true },
          "SUN": { "type": "SUN", "name": "suncoin", "title":[
            "SunCoin",
            "Moneda sol",
            "سانكوين",
            "太阳币"
          ], "switch": true },
          "ARC": { "type": "ARC", "name": "aynrandcoin", "title": [
            "AynRandCoin",
            "Moneda Ayn Rand",
            "أينراندكوين",
            "安兰德币"
          ], "switch": true }
        };
        // $rootScope.selectLanguage = {
        //   availableOptions: [
        //     { id: "3", name: "中文" },
        //     { id: "0", name: "English" },
        //     { id: "1", name: "Español" },
        //     { id: "2", name: "العَرَبِيَّة‎" }
        //   ],
        //   selected: {
        //     id: "0", name: "English"
        //   }
        // };
        // 英文	西班牙语	阿拉伯语 中文
        // $http.get("./js/services/language.json")
        //   .success(function (response) {
        //     console.log("$http:", response);
        //     console.log("$http:", JSON.parse(response));
        //     console.log("$http:", JSON.parse(response).data);
        //     console.log("$http:", response.data);
        //     $rootScope.languages = $rootScope.languages
        //     console.log("$rootScope.languages:", $rootScope.languages);
        //   });
        $rootScope.languages = {
          "Wallet": ["Wallet","Cartera","محفظة","钱包"],
          "Discover": ["Discover","Encuentro","بحث","发现"],
          "TotalAssets": ["Total Assets","Fondos totales","موجودات إجمالية","总资产"],
          "Exchange": ["BEBTC Exchange","Cambio de moneda","صرف شبكة بييي","币易网兑换"],
          "coins/tokens": ["P2P buy coins/tokens","Negociación rápida de moneda en punto a punto","تجارة العملة السريعة نقطة بنقطة","点对点快速买卖货币"],
          "Hotel Booking": ["Hotel Booking","Reserva de hotel","حجز غرفة الفندق","酒店预订"],
          "Your": ["Book Your Hotel at Super Low Rate","Reserva de hotel a super bajo precio","حجز غرفة الفندق بسعر منخفض","超低价预订酒店"],
          "Shopping": ["Shopping","Compras","تسوق","购物"],
          "Coming Soon": ["Coming Soon","Disponible","يعرض فورا","即将推出"],
          "Endowment Insurance": ["Endowment Insurance","Seguro de vejez","تأمين المعاش","养老保险"],
          "CopyAddress": ["Copy Address","Copiar la dirección","تنسيخ العنوان","复制地址"],
          "Copyseed": ["Copy seed","Copiar semillas","نسخ البذور","复制seed"],
          "Waiting for confirmation": ["Waiting for confirmation","Espera a confirmar","انتظار الموافقة","等待确认"],
          "Input Error": ["Input Error","Error de entrada","خطأ الإدخال","输入错误"],
          "Register": ["Register","Registro","تسجيل","注册"],
          "Login": ["Log in","Acceso","دخول","登录"],
          "Use": ["Direct Use without Registration","Usandolo directamente sin registro","يستعمل مباشرة دون تسجيل","不注册直接使用"],
          "SetGesture": ["Set Gesture Password","Establecer la contraseña de gesto","إعداد كلمة مرور الشارة","设置手势密码"],
          "KeepInMind": ["Keep in Mind Your Gesture Password. You cannot Enter if Forget it.","Por favor, tenga en cuenta su contraseña de gesto y no entrará en caso de olvidarla.","احفظ كلمة مرور الشارة الخاصة لكم، لا يمكن الدخول بعد النسيان","请牢记您的手势密码，忘记后无法进入"],
          "Gesture": ["Draw Gesture Password Again","Dibuje de nuevo la contraseña de gesto","إعادة تجهيز كلمة مرور الشارة","再次绘制手势密码"],
          "Username": ["Username","Nombre de usuario","اسم المستخدم","用户名"],
          "TypeUsername": ["Type Username","Introduzca el nombre de usuario","أدخل اسم المستخدم","输入用户名"],
          "LoginPassword": ["Log-in Password","Contraseña de acceso","كلمة مرور الدخول","登录密码"],
          "password": ["Type Password","Introduzca la contraseña de acceso","أدخل كلمة مرور الدخول","输入登录密码"],
          "TypePassword": ["Type Password Again","Vuelva a ingresar la contraseña de acceso","أعد إدخال كلمة مرور الدخول","再次输入登录密码"],
          "New": ["Add New Wallet","Añadir una cartera nueva","إضافة محفظة جديدة","添加新钱包"],
          "Wallet Name": ["Wallet Name","Nombre de cartera nueva","اسم محفظة جديدة","新钱包名称"],
          "Color": ["Color","Color","لون","颜色"],
          "Import": ["Import","Importar","إ المنسخة","导入"],
          "ImportBackup": ["Import Backup Wallet","Importar la cartera copiada","إدخال المحفظة المنسخة","导入已备份钱包"],
          "Select Color": ["Select Color","Elija un color","خيار اللون","选择颜色"],
          "device": ["Be sure to back up your wallet before accepting funds. Otherwise, you will not be able to retrieve the funds if you lose your device or uninstall Superwallet.","Asegúrese de hacer una copia de seguridad de su cartera antes de aceptar fondos. ,De lo contrario, si abandona el dispositivo de prueba o desinstala Superwallet, no podrá recuperar los fondos.","قبل قبول الرأسمال، احفظ المحفظة وإلا فلا يمكن استرجاع الرأسمال بعد فقدان الجهاز أو إلغاء تثبيت Superwallet.","接受资金前，请务必备份您的钱包。否则，如果您遗失测设备或者卸载Superwallet将无法找回资金。"],
          "Backup": ["Backup","Copia de seguridad","حفظ","备份"],
          "Backingup": ["Is backing up","Está haciendo una copia de seguridad","هو النسخ الاحتياطي","正在备份"],
          "Seed": ["Export Wallet Seed and Keep it Safe","Exportar cartera seed, auto-seguro para garantizar la seguridad.","إخراج seed للمحفظة، الحفظ الذاتي لضمان السلامة","导出钱包seed自行保管确保安全."],
          "Up": ["Back Up Now","Copiar ahora","جاري الحفظ","现在备份"],
          "Receive": ["Receive","Recibir","استلام","接收"],
          "Send": ["Send","Enviar","إرسال","发送"],
          "DeleteWallet": ["Delete Wallet","Borrar cartera","حذف المحفظة","删除钱包"],
          "TransactionRecords": ["Transaction Records","Historia de trasacción","سجل الصفقات","交易记录"],
          "Send to": ["Send to","Enviar a","إرسال إلى","发送到"],
          "toAddress": ["To address","Introduzca la dirección de la otra parte","أدخل عنوان النظير","输入对方地址"],
          "Amount": ["Amount","Suma de dinero","قيمة","金额"],
          "Message": ["Message","Mensaje","رسالة","留言"],
          "AddMessage": ["Add Message","Añadir un mensaje","إضافة الرسالة","添加留言"],
          "Change": ["Change","Modificar","تعديل","更改"],
          "Balance": ["Balance"," que resta","الرصيد","余额"],
          "Using": ["Using","Está en uso","جاري الاستعمال","正在使用"],
          "Pay": ["Set Up Pay Pin","Establecer la contraseña de pago","إعداد كلمة مرور الدفع","设置支付密码"],
          "Pin": ["Type Pay Pin Again","Introduzca de nuevo la contraseña de pago","أعد إدخال كلمة مرور الدفع","再次输入支付密码"],
          "PleaseUnlock": ["Please unlock","Desbloquearse por favor","افتح القفل","请解锁"],
          "ResetPassword": ["Reset password","Restablecer contraseña","إعادة تعيين كلمة المرور","重置密码"],
          "Bitcoin": ["Bitcoin","Moneda Bit","بيتكوين","比特币"],
          "Skycoin": ["Skycoin","Moneda cielo","سكايكوين","天空币"],
          "Shellcoin": ["Shellcoin","Moneda concha","شلكوين","小贝壳"],
          "MZCoin": ["MZCoin","Moneda MZ","مزكوين","喵爪币"],
          "SunCoin": ["SunCoin","Moneda sol","سانكوين","太阳币"],
          "AynRandCoin": ["AynRandCoin","Moneda Ayn Rand","أينراندكوين","安兰德币"],
          "Import": ["Import","Importar","إدخال","导入"],
          "ScanTypeSeed": ["Scan or type in seed","Escanear el código o escribir en seed","مسح أو إدخال seed","扫码或输入seed"],
          "ChooseCoinType": ["Choose coin type","Elija una moneda","خيار نوع كوين","选择币种"],
          "PleaseTypeAlias": ["Please type in an alias for your wallet","Haga el favor de introducir otro nombre para su cartera","أدخل اسم محفظة الكوين","请输入币种钱包的别称"],
          "Confirm": ["Confirm","Confirmar","موافق","确定"],
          "Cancel": ["Cancel","Cancelar","إلغاء","取消"],
          "PleaseScan": ["Please scan or type in your seed","Por favorescanear el código o introducir manualmente su seed","امسح أو أدخل seed يدويا","请扫码或手动输入seed"],
          "ImportWallet": ["Import wallet of a certain type","Importar la moneda especificada","إدخال العملة المحددة","导入指定币种"],
          "CurrentVersion": ["Current version is","El número de versión actual es","النسخة الحالية","当前版本号为"],
          "UnderDevelopment": ["Under development","Está en desarrolla la versión siguiente","جاري تطوير","后续版本研发中"],
          "CoinType": ["Coin type","Tipo de moneda","اسم كوين","币种名称"],
          "ColorSetting": ["Color setting","Ajuste de color","إعداد اللون","颜色设置"],
          "RestoreBackup": ["Restore backup	Restaurar","la copia de seguridad","استعادة الحفظ","还原备份"],
          "ConfirmRestore": ["Confirm to restore ","¿Determinar la recuperación de","تحديد الاسترداد","确定恢复"],
          "continue": ["continue","Continuar la ejecución","استمر في العمل","继续操作"],
          "Done": ["Done","Acabado","تم","完成"],
          "Pleaseselect":["Please select the currency for importing seed!", "¡Por favor, seleccione la moneda para importar el seed!", "اختر العملة لاستيراد seed！", "请选择导入seed的币种！"],
          "Theselected":["The selected currency is inconsistant with the imported seed!", "¡La moneda seleccionada no es consistente con el seed entrado!", "توجد اختلاف بين العملة المختارة والعملة المقابلة لseed المدخلة!", "选择的币种与输入的seed对应币种不一致！"],
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
          "Addresssetting": ["Address setting", "Configuración de la dirección", "تعداد للعنوان", "地址设置"]
        };
      }
      var dialogs = function ($rootScope) {
        $rootScope.alert = function (message, title, buttonName, callback) {
          // message = message || "内容";
          // title = title || "提示";
          // buttonName = buttonName || "确认";
          message = message || $rootScope.languages.Content[$rootScope.selectLanguage.selected.id];
          title = title || $rootScope.languages.Notice[$rootScope.selectLanguage.selected.id];
          buttonName = buttonName || $rootScope.languages.Confirm[$rootScope.selectLanguage.selected.id];
          $cordovaDialogs.alert(message, title, buttonName)
            .then(function () {
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
            .then(function (buttonIndex) {
              callback && callback(buttonIndex);
            });
        }
      }
      var file = function ($scope) {
        //检查文件
        $scope.checkFile = function (filepath, filename) {
          var deferred = $q.defer();
          $cordovaFile.checkFile(filepath, filename)
            .then(function (success) {
              deferred.resolve(success);
            }, function (error) {
              deferred.reject(error);
            });
          return deferred.promise;
        }
        //创建文件
        $scope.writeFile = function (filepath, filename, message, replace) {
          replace = replace || true;
          var deferred = $q.defer();
          $cordovaFile.writeFile(filepath, filename, message, replace)
            .then(function (success) {
              deferred.resolve(success);
            }, function (error) {
              deferred.reject(error);
            });
          return deferred.promise;
        }
        //取出文件信息
        $scope.readAsText = function (filepath, filename) {
          var deferred = $q.defer();
          $cordovaFile.readAsText(filepath, filename)
            .then(function (success) {
              deferred.resolve(success);
            }, function (error) {
              deferred.reject(error);
            });
          return deferred.promise;
        }
        //解压文件
        $scope.unzip = function (filepath, filename) {
          var deferred = $q.defer();
          $cordovaZip.unzip(filepath, filename).then(function (success) {
            deferred.resolve(success);
          }, function (error) {
            deferred.reject(error);
          }, function (progress) {
            deferred.notify(progress);
          });
          return deferred.promise;
        }
        //压缩文件
        $scope.zip = function (PathToFileInString, PathToResultZip) {
          var deferred = $q.defer();
          JJzip.zip(PathToFileInString, { target: PathToResultZip, name: "superwallet" }, function (success) {
            deferred.resolve(success);
          }, function (error) {
            deferred.reject(error);
          });
          return deferred.promise;
        }
        //复制文本
        $scope.copy = function (text) {
          var deferred = $q.defer();
          $cordovaClipboard.copy(text).then(function (success) {
            deferred.resolve(success);
          }, function () {
            deferred.reject(error);
          });
          return deferred.promise;
        }
        $scope.scan = function () {
          var deferred = $q.defer();
          $cordovaBarcodeScanner.scan().then(function (success) {
            deferred.resolve(success);
          }, function (error) {
            deferred.reject(error);
          });
          return deferred.promise;
        }
      }
      return {
        dialogs: dialogs,
        config: config,
        file: file
      };
    }])
  ;
