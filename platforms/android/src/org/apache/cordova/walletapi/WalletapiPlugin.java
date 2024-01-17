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
import android.util.Log;

import com.google.gson.*;
import java.util.ArrayList;
import com.shellpay2.superwallet.MainActivity;

import java.io.File;
import java.util.Date;

import mobile.*;
//import mobile.Mobile;
//import go.mobile.Config;
//import go.mobile.Mobile;
//import go.mobile.SendOption;

class AddressEntry {
    public String address;
    public String pubkey;
    public String seckey;
}

class AddressResult {
    public String lastseed;
    public AddressEntry[] addrs;
}

class Balance {
    public Long coins; // droplets
    public Long hours;
}

class BalancePair {
    public Balance confirmed;
    public Balance predicted;
}



public class WalletapiPlugin extends CordovaPlugin {

    private final String domain = "http://104.129.181.176:6789";
    private final Gson g;

    public WalletapiPlugin(){
        Mobile.setServer(domain);
        g = new Gson();
    }

    @Override
    public boolean execute(String action, CordovaArgs args, final CallbackContext callbackContext) throws JSONException {
        if ("createwallet".equals(action)) {
            // TODO:

            String coinType = args.getString(0);
            String seed = args.getString(1);
            String label = args.getString(2);
            Integer color = args.getInt(3);

            WalletDBHelper dbHelper = WalletDBHelper.getInstance();

            try {
                // The following code is used in CreateWallet
                WalletEntry wallet = new WalletEntry();
                wallet.label = label;
                wallet.coinType = coinType;

                AddressResult ar;
                if (seed.equals("")) { // creating a new wallet
                    wallet.seed = Mobile.newSeed();
                } else { // loading a wallet from seed
                    // TODO: might need to generate more than one address
                    wallet.seed = seed;
                }

                // addrs is in JSON format
                String addrs = Mobile.generateNewAddresses(wallet.seed, 1);

                ar = g.fromJson(addrs, AddressResult.class);

                wallet.privateKey = ar.addrs[0].seckey;
                wallet.publicKey = ar.addrs[0].pubkey;
                wallet.address = ar.addrs[0].address;

                wallet.colorScheme = color;
                wallet.status = "active";
                wallet.balanceLastSeen = "0.000";

                OperationResult or = dbHelper.addWallet(wallet);
                if (or.success) {
                    // result is the wallet id in string format
                    callbackContext.success(or.result);
                } else {
                    callbackContext.error("创建钱包失败, 写入失败");
                }

                return true;

            } catch (Exception e) {
                Log.e("superwallet", e.getMessage());
                e.printStackTrace();
                callbackContext.error("创建钱包失败: "+e.getMessage());
                return true;
            }


        } else if ("deletewallet".equals(action)) {
            // TODO:
            // if so, change the status from active to deleted
            // update deletedate column
            WalletDBHelper dbHelper = WalletDBHelper.getInstance();
            try {
                Integer walletId = args.getInt(0);
                dbHelper.disableWallet(walletId);
                String  res = "钱包文件删除成功";

                callbackContext.success(res);

                return true;
            } catch (Exception e) {
                e.printStackTrace();
                callbackContext.error("删除钱包失败");
                return true;
            }

        } else if ("getaddressinwallet".equals(action)) {
            String res = null;
            try {
//                res = Mobile.getAddresses(args.getString(0));
//                System.out.println(res);
                callbackContext.success(res);
            } catch (Exception e) {
                e.printStackTrace();
                callbackContext.error("获取钱包地址失败！");
            }
            return true;

            // get balance of an address
        } else if ("getbalance".equals(action)) {
            WalletDBHelper dbHelper = WalletDBHelper.getInstance();

            // Get wallet balance
            Integer walletID = args.getInt(0);

            try {
                WalletEntry wallet = dbHelper.getWallet(walletID);

                String rawBalance = Mobile.getBalance(wallet.coinType, wallet.address);
                BalancePair bp = g.fromJson(rawBalance, BalancePair.class);
                String res = Long.toString(bp.confirmed.coins);

                callbackContext.success(res);
            } catch(Exception e) {
                Log.e("superwallet", e.getMessage());
            }


            // get balance of a wallet
        }else if ("getblanceofwalletid".equals(action)) {
            String res = null;
            String coinType = args.getString(0);
//            String walletID = args.getString(1);

            // TODO: retrieve address from a wallet ID
            String addresses = "";

            try {
                res = Mobile.getBalance(coinType, addresses);
                callbackContext.success(res);
            } catch (Exception e) {
                e.printStackTrace();
                callbackContext.error("获取余额失败！" + e.getMessage());
            }

            // send coin
        } else if ("sendcoin".equals(action)) {
            WalletDBHelper dbHelper = WalletDBHelper.getInstance();
            // Send coins
            Integer walletID = args.getInt(0);
            String targetAddress  = args.getString(1);
            Float amount = Float.parseFloat(args.getString(2));


            try {
                WalletEntry wallet = dbHelper.getWallet(walletID);

                String txid = Mobile.sendCoin(wallet.coinType, wallet.address, wallet.privateKey, targetAddress, amount);
//                String txid = "sss";

                Date now = new Date();

                Transaction t = new Transaction();
                t.coinType = wallet.coinType;
                t.address = wallet.address;
                t.operation = "sent";
                t.time = now.toString();
                t.TxID = txid;
                t.toAddress = targetAddress;
                t.amount = Float.toString(amount);

                dbHelper.addTransaction(t);

                callbackContext.success(txid);
            }catch(Exception e) {
                Log.e("superwallet", e.getMessage());
                callbackContext.error("发送失败！" + e.getMessage());
            }

        } else if("getCoins".equals(action)){
            String coins;
            try{
                coins = Mobile.getSupportedCoins();
                System.out.println(coins);
            } catch(Exception e) {
                coins = "";
            }
            callbackContext.success(coins);
        } else if("getDomain".equals(action)){
            callbackContext.success(this.domain);
        } else if("getWallets".equals(action)){
            WalletDBHelper dbHelper = WalletDBHelper.getInstance();
            ArrayList<WalletEntry> wallets = dbHelper.getAllWallets();
            String walletsJson = g.toJson(wallets);
            callbackContext.success(walletsJson);

        } else if("getTransactions".equals(action)){

            Integer walletID = args.getInt(0);

            WalletDBHelper dbHelper = WalletDBHelper.getInstance();

            ArrayList<Transaction> transactions = dbHelper.getTransactions(walletID);

            String transactionsJson = g.toJson(transactions);
            callbackContext.success(transactionsJson);
        } else if("memorizeWalletOrder".equals(action)){
            String walletIDs = args.getString(0);
            WalletDBHelper dbHelper = WalletDBHelper.getInstance();
            try {
                dbHelper.memorizeWalletOrder(walletIDs);
                callbackContext.success("保存成功");
            }catch (Exception e) {
                Log.e("记忆失败", e.getMessage());
                callbackContext.error("记忆失败！" + e.getMessage());
            }
        } else if("getWalletOrder".equals(action)){
            WalletDBHelper dbHelper = WalletDBHelper.getInstance();
            String orders = "";
            try {
                orders = dbHelper.getWalletOrder();
                callbackContext.success(orders);
            }catch (Exception e) {
                Log.e("获取失败", e.getMessage());
                callbackContext.error("获取失败！" + e.getMessage());
            }
        }

        //System.out.println(action);
        return super.execute(action, args, callbackContext);
    }
}

