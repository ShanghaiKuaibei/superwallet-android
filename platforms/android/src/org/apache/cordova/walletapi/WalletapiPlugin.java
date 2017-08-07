package org.apache.cordova.walletapi;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaArgs;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import android.os.Environment;
import go.mobile.*;
import mobile.Config;
import mobile.Mobile;
import mobile.SendOption;

public class WalletapiPlugin extends CordovaPlugin {
    @Override
    public boolean execute(String action, CordovaArgs args, final CallbackContext callbackContext) throws JSONException {
        Config c = Mobile.newConfig();
       // Config c = Mobile.newConfig();
         c.setServerAddr("121.41.103.148:8080");
        //c.setServerAddr("139.129.46.29:8080");
        c.setWalletDirPath(Environment.getExternalStorageDirectory().toString() + "/superwallet");
        Mobile.init(c);
        if("createwallet".equals(action)){1
            try {
                if(args.getString(1)==""){
                    String  seeda = Mobile.newSeed();
                    String  res = Mobile.newWallet(args.getString(0), seeda);
                    System.out.println(res);
                    callbackContext.success(res);
                }else{
                    String  res = Mobile.newWallet(args.getString(0), args.getString(1));
                    System.out.println(res);
                    callbackContext.success(res);
                }
                return true;
            } catch (Exception e) {
                e.printStackTrace();
                callbackContext.error("创建钱包失败！");
                return true;
            }
        }else if("createaddress".equals(action)){
            final  String a = args.getString(0);
            final Integer b = args.getInt(1);
            cordova.getActivity().runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    String res = null;
                    try {
                        res = Mobile.newAddress(a,b);
                        System.out.println(res);
                        callbackContext.success(res);
                    } catch (Exception e) {
                        e.printStackTrace();
                        callbackContext.error("创建钱包地址失败！");
                    };
                }
            });
            return true;
        }else if("getaddressinwallet".equals(action)){
            String res = null;
            try {
                res = Mobile.getAddresses(args.getString(0));
                System.out.println(res);
                callbackContext.success(res);
            } catch (Exception e) {
                e.printStackTrace();
                callbackContext.error("获取钱包地址失败！");
            }
            return true;
        }else if("getpubkeyandseckeypairofaddress".equals(action)){
            String res = null;
            try {
                res = Mobile.getKeyPairOfAddr(args.getString(0), args.getString(1));
                callbackContext.success(res);
            } catch (Exception e) {
                e.printStackTrace();
                callbackContext.error("获取钱包地址公钥与私钥失败！");
            }
            return true;
        }else if("getbalance".equals(action)){
            String res = null;
            try {
                res = Mobile.getBalance(args.getString(0), args.getString(1));
                System.out.println(res);
                callbackContext.success(res);
            } catch (Exception e) {
                e.printStackTrace();
                callbackContext.error("获取钱包余额失败！");
            }
            return true;
        }else if("sendskycoin".equals(action)){
            String res = null;
            try {
                res = Mobile.send("skycoin",args.getString(0), args.getString(1),args.getString(2),null);
                //res = Mobile.sendSky(args.getString(0), args.getString(1),args.getString(2));
                callbackContext.success(res);
            } catch (Exception e) {
                e.printStackTrace();
                callbackContext.error("skycoin转账失败！");
            }
            return true;
        }else if("sendmzcoin".equals(action)){
            String res = null;
            try {
                System.out.println(args.getString(0));
               // res = Mobile.SendMzc(args.getString(0), args.getString(1),args.getString(2));
                res = Mobile.send("mzcoin",args.getString(0), args.getString(1),args.getString(2),null);
                //res = Mobile.sendMzc(args.getString(0), args.getString(1),args.getString(2));
                callbackContext.success(res);
            } catch (Exception e) {
                e.printStackTrace();
                callbackContext.error("mzcoin转账失败！");
            }
            return true;
        }else if("sendbitcoin".equals(action)){
            String res = null;
            SendOption Sendoption = new SendOption();
            Sendoption.setFee(args.getString(3));
            try {
               // res = Mobile.sendBtc(args.getString(0), args.getString(1),args.getString(2),args.getString(3));
               res = Mobile.send("bitcoin",args.getString(0), args.getString(1),args.getString(2), Sendoption);
                callbackContext.success(res);
            } catch (Exception e) {
                e.printStackTrace();
                callbackContext.error("btc转账失败！");
            }
            return true;
        }else if("sendshellcoin".equals(action)){
            String res = null;
            try {
                // res = Mobile.sendBtc(args.getString(0), args.getString(1),args.getString(2),args.getString(3));
                res = Mobile.send("shellcoin",args.getString(0), args.getString(1),args.getString(2),null);
                callbackContext.success(res);
            } catch (Exception e) {
                e.printStackTrace();
                callbackContext.error("shell转账失败！");
            }
            return true;
        }else if("sendsuncoin".equals(action)){
            String res = null;
            try {
                // res = Mobile.sendBtc(args.getString(0), args.getString(1),args.getString(2),args.getString(3));
                res = Mobile.send("suncoin",args.getString(0), args.getString(1),args.getString(2),null);
                callbackContext.success(res);
            } catch (Exception e) {
                e.printStackTrace();
                callbackContext.error("sun转账失败！");
            }
            return true;
        }else if("sendaynrandcoin".equals(action)){
            String res = null;
            try {
                // res = Mobile.sendBtc(args.getString(0), args.getString(1),args.getString(2),args.getString(3));
                res = Mobile.send("aynrandcoin",args.getString(0), args.getString(1),args.getString(2),null);
                callbackContext.success(res);
            } catch (Exception e) {
                e.printStackTrace();
                callbackContext.error("aynrand转账失败！");
            }
            return true;
        }else if("getblanceofwalletid".equals(action)){
            String res = null;
            String resa = null;
            System.out.println(action);
            System.out.println(args.getString(0)+"-----"+args.getString(1));
            //Log.i("information",action);
            try{
               // res = Mobile.getBalance("suncoin", "2ZeAf2qcUU2QedQnWzAA6EAzZjRTYYzmbcm");
                res = Mobile.getWalletBalance(args.getString(0), args.getString(1));
                // Mobile.getWalletBalance()
               // resa = Mobile.getAddresses("suncoin_grace dinosaur account enjoy veteran diesel lecture decide weird cheap until sleep");
				//System.out.println("当前币种："+args.getString(1)+"："+res);
                callbackContext.success(res);
            }catch (Exception e){
                e.printStackTrace();
                callbackContext.error("获取余额失败！");
            }
        }
        //System.out.println(action);
        return super.execute(action, args, callbackContext);
    }
}
