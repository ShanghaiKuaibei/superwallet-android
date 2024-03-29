package org.apache.cordova.walletapi;

import java.util.ArrayList;
import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteOpenHelper;
import android.database.sqlite.SQLiteDatabase;
import android.util.Log;
import com.shellpay2.superwallet.MainActivity;

public class WalletDBHelper extends SQLiteOpenHelper {

    public static WalletDBHelper dbHelperInstance = null;

    public static WalletDBHelper getInstance() {
        if (WalletDBHelper.dbHelperInstance == null ) {
            WalletDBHelper.dbHelperInstance = new WalletDBHelper(MainActivity.getM_instance());
        }

        return WalletDBHelper.dbHelperInstance;
    }

    public static final Integer DATABASE_VERSION = 3;

    public static final String DATABASE_NAME = "wallets.db";

    public static final String WALLETS_TABLE_NAME = "wallets";

    public static final String WALLETS_COLUMN_ID = "id";
    public static final String WALLETS_COLUMN_LABEL = "label";
    public static final String WALLETS_COLUMN_SEED = "seed";
    public static final String WALLETS_COLUMN_COIN_TYPE = "coinType";
    public static final String WALLETS_COLUMN_ADDRESS = "address";
    public static final String WALLETS_COLUMN_PUBLIC_KEY = "publicKey";
    public static final String WALLETS_COLUMN_PRIVATE_KEY = "privateKey";
    public static final String WALLETS_COLUMN_STATUS = "status";
    public static final String WALLETS_COLUMN_COLOR_SCHEME = "colorScheme";
    public static final String WALLETS_COLUMN_BALANCE_LAST_SEEN = "balanceLastSeen";

    public static final String SQL_SERACH_SEED = "select * from " + WALLETS_TABLE_NAME + " where " +
            WALLETS_COLUMN_SEED + " = ?" + " and " +
            WALLETS_COLUMN_COIN_TYPE + " = ?";

    public static final String SQL_SERACH_STATUS = "select * from " + WALLETS_TABLE_NAME + " where " +
            WALLETS_COLUMN_STATUS + " = ?";

    public static final String SQL_SEARCH_ID = "select * from " + WALLETS_TABLE_NAME + " where " +
            WALLETS_COLUMN_STATUS + " = ? " + " and " +
            WALLETS_COLUMN_ID + " = ?";

    public static final String SQL_ADD_COLUMN_BALANCE = "ALTER TABLE " +
            WALLETS_TABLE_NAME + " ADD COLUMN " + WALLETS_COLUMN_BALANCE_LAST_SEEN + " text";


    public static final String TRANSACTIONS_TABLE_NAME = "transactions";

    public static final String TRANSACTIONS_COLUMN_ID = "id";
    public static final String TRANSACTIONS_COLUMN_COIN_TYPE = "coinType";
    public static final String TRANSACTIONS_COLUMN_ADDRESS = "address";
    public static final String TRANSACTIONS_COLUMN_TX_ID = "txID";
    public static final String TRANSACTIONS_COLUMN_TIME = "time";
    public static final String TRANSACTIONS_COLUMN_OP = "operation";
    public static final String TRANSACTIONS_COLUMN_TO_ADDRESS = "toAddress";
    public static final String TRANSACTIONS_COLUMN_AMOUNT = "amount";

    public static final String SQL_SEARCH_TRANSACTIONS = "select * from " + TRANSACTIONS_TABLE_NAME + " where " +
            TRANSACTIONS_COLUMN_COIN_TYPE + " = ? " + " and " +
            TRANSACTIONS_COLUMN_ADDRESS + " = ?";

    public static final String WALLETSORDER_TABLE_NAME = "walletorder";

    public static final String WALLETSORDER_COLUMN_ORDER = "walletOrder";

    public static final String SQL_WALLETORDER_SEARCH = "select * from " + WALLETSORDER_TABLE_NAME;

    public WalletDBHelper(Context context) {
        super(context, DATABASE_NAME , null, DATABASE_VERSION);
    }

    public void createOrderTable(SQLiteDatabase db) {
        db.execSQL(
                "create table " + WALLETSORDER_TABLE_NAME +
                        "(" +
                        WALLETSORDER_COLUMN_ORDER + " text)"
        );

        // Insert a record

        ContentValues contentValues = new ContentValues();
        contentValues.put(WALLETSORDER_COLUMN_ORDER, "");
        db.insert(WALLETSORDER_TABLE_NAME, null, contentValues);
    }
    
    @Override
    public void onCreate(SQLiteDatabase db) {
        // Always create 3 tables
        db.execSQL(
                "create table " + WALLETS_TABLE_NAME +
                        "(" +
                        WALLETS_COLUMN_ID + " integer primary key, " +
                        WALLETS_COLUMN_LABEL + " text," +
                        WALLETS_COLUMN_COIN_TYPE + " text," +
                        WALLETS_COLUMN_SEED + " text," +
                        WALLETS_COLUMN_PRIVATE_KEY + " text," +
                        WALLETS_COLUMN_PUBLIC_KEY + " text," +
                        WALLETS_COLUMN_ADDRESS + " text," +
                        WALLETS_COLUMN_COLOR_SCHEME + " integer," +
                        WALLETS_COLUMN_STATUS + " text," +
                        WALLETS_COLUMN_BALANCE_LAST_SEEN + " text)"
        );

        db.execSQL(
                "create table " + TRANSACTIONS_TABLE_NAME +
                        "(" +
                        TRANSACTIONS_COLUMN_ID + " integer primary key, " +
                        TRANSACTIONS_COLUMN_COIN_TYPE + " text," +
                        TRANSACTIONS_COLUMN_ADDRESS + " text," +
                        TRANSACTIONS_COLUMN_TX_ID + " text," +
                        TRANSACTIONS_COLUMN_TIME + " text," +
                        TRANSACTIONS_COLUMN_OP + " text," + // always sent
                        TRANSACTIONS_COLUMN_TO_ADDRESS + " text," + // always sent
                        TRANSACTIONS_COLUMN_AMOUNT + " text)"
        );

        createOrderTable(db);

    }



    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        Log.i("superwallet", "current database version is " + Integer.toString(oldVersion));
        if (oldVersion < 2) {
            // We need to add two tables
            db.execSQL(
                    "create table " + TRANSACTIONS_TABLE_NAME +
                            "(" +
                            TRANSACTIONS_COLUMN_ID + " integer primary key, " +
                            TRANSACTIONS_COLUMN_COIN_TYPE + " text," +
                            TRANSACTIONS_COLUMN_ADDRESS + " text," +
                            TRANSACTIONS_COLUMN_TX_ID + " text," +
                            TRANSACTIONS_COLUMN_TIME + " text," +
                            TRANSACTIONS_COLUMN_OP + " text," + // always sent
                            TRANSACTIONS_COLUMN_TO_ADDRESS + " text," + // always sent
                            TRANSACTIONS_COLUMN_AMOUNT + " text)"
            );

            Log.i("superwallet", "transactions table has been created");

            createOrderTable(db);

            Log.i("superwallet", "wallet order table has been created");

        }

        if (oldVersion < 3) {
            db.execSQL(SQL_ADD_COLUMN_BALANCE, null);
            Log.i("superwallet", "Add balanceLastSeen column in table wallets");
        }
    }

    public String getWalletOrder() {
        String walletOrder = new String("");
        try {
            SQLiteDatabase db = getReadableDatabase();
            Cursor res = db.rawQuery(SQL_WALLETORDER_SEARCH, new String[]{});

            res.moveToFirst();

            if (!res.isAfterLast()) {
                walletOrder = res.getString(res.getColumnIndex(WALLETSORDER_COLUMN_ORDER));
            }

        } catch (Exception e) {
            Log.e("superwallet", "failed to get wallet order");
        }

        return walletOrder;

    }

    public void memorizeWalletOrder(String order) {
        SQLiteDatabase db = getWritableDatabase();

        ContentValues contentValues = new ContentValues();

        contentValues.put(WALLETSORDER_COLUMN_ORDER, order);

        int rowsUpdated = db.update(WALLETSORDER_TABLE_NAME, contentValues, null, null);

        Log.i("superwallet", Integer.toString(rowsUpdated) + " row has been updated");

    }

    public ArrayList<Transaction> getTransactions(Integer walletID) {

        ArrayList<Transaction> transactions = new ArrayList<Transaction>();

        try {
            SQLiteDatabase db = getReadableDatabase();

            WalletEntry wallet = getWallet(walletID);

            Cursor res =  db.rawQuery(SQL_SEARCH_TRANSACTIONS, new String[] {wallet.coinType, wallet.address});

            res.moveToFirst();

            while(res.isAfterLast() == false){
                Transaction t = new Transaction();

                t.id = res.getInt(res.getColumnIndex(TRANSACTIONS_COLUMN_ID));
                t.coinType = res.getString(res.getColumnIndex(TRANSACTIONS_COLUMN_COIN_TYPE));
                t.address = res.getString(res.getColumnIndex(TRANSACTIONS_COLUMN_ADDRESS));
                t.operation = res.getString(res.getColumnIndex(TRANSACTIONS_COLUMN_OP));
                t.TxID = res.getString(res.getColumnIndex(TRANSACTIONS_COLUMN_TX_ID));
                t.time = res.getString(res.getColumnIndex(TRANSACTIONS_COLUMN_TIME));
                t.toAddress = res.getString(res.getColumnIndex(TRANSACTIONS_COLUMN_TO_ADDRESS));
                t.amount = res.getString(res.getColumnIndex(TRANSACTIONS_COLUMN_AMOUNT));

                transactions.add(t);

                res.moveToNext();
            }

        } catch (Exception e) {
            Log.e("superwallet", e.getMessage());
        }

        return transactions;

    }

    public void addTransaction(Transaction transaction) {

        SQLiteDatabase db = getWritableDatabase();

        ContentValues contentValues = new ContentValues();

        contentValues.put(TRANSACTIONS_COLUMN_COIN_TYPE, transaction.coinType);
        contentValues.put(TRANSACTIONS_COLUMN_ADDRESS, transaction.address);
        contentValues.put(TRANSACTIONS_COLUMN_TX_ID, transaction.TxID);
        contentValues.put(TRANSACTIONS_COLUMN_TIME, transaction.time);
        contentValues.put(TRANSACTIONS_COLUMN_AMOUNT, transaction.amount);
        contentValues.put(TRANSACTIONS_COLUMN_TO_ADDRESS, transaction.toAddress);
        contentValues.put(TRANSACTIONS_COLUMN_OP, transaction.operation);

        db.insert(TRANSACTIONS_TABLE_NAME, null, contentValues);

    }

    private ArrayList<WalletEntry> sqlSearch(String sql, String[] params) {

        ArrayList<WalletEntry> wallets = new ArrayList<WalletEntry>();

        WalletDBHelper dbH = getInstance();

        try {
            SQLiteDatabase db = dbH.getReadableDatabase();
            Cursor res =  db.rawQuery(sql, params);

            res.moveToFirst();

            while(res.isAfterLast() == false){
                WalletEntry wallet = new WalletEntry();

                wallet.id = res.getInt(res.getColumnIndex(WALLETS_COLUMN_ID));
                wallet.label = res.getString(res.getColumnIndex(WALLETS_COLUMN_LABEL));
                wallet.seed = res.getString(res.getColumnIndex(WALLETS_COLUMN_SEED));
                wallet.coinType = res.getString(res.getColumnIndex(WALLETS_COLUMN_COIN_TYPE));
                wallet.privateKey = res.getString(res.getColumnIndex(WALLETS_COLUMN_PRIVATE_KEY));
                wallet.publicKey = res.getString(res.getColumnIndex(WALLETS_COLUMN_PUBLIC_KEY));
                wallet.address = res.getString(res.getColumnIndex(WALLETS_COLUMN_ADDRESS));
                wallet.colorScheme = res.getInt(res.getColumnIndex(WALLETS_COLUMN_COLOR_SCHEME));
                wallet.status = res.getString(res.getColumnIndex(WALLETS_COLUMN_STATUS));
                wallet.balanceLastSeen = res.getString(res.getColumnIndex(WALLETS_COLUMN_BALANCE_LAST_SEEN));

                wallets.add(wallet);

                res.moveToNext();
            }

        } catch (Exception e) {
            Log.e("superwallet", e.getMessage());
        }

        return wallets;
    }

    public OperationResult addWallet(WalletEntry wallet) {

        OperationResult or = new OperationResult();

        SQLiteDatabase db = getWritableDatabase();

        ContentValues contentValues = new ContentValues();

        contentValues.put(WALLETS_COLUMN_LABEL, wallet.label);
        contentValues.put(WALLETS_COLUMN_COIN_TYPE, wallet.coinType);
        contentValues.put(WALLETS_COLUMN_SEED, wallet.seed);
        contentValues.put(WALLETS_COLUMN_PRIVATE_KEY, wallet.privateKey);
        contentValues.put(WALLETS_COLUMN_PUBLIC_KEY, wallet.publicKey);
        contentValues.put(WALLETS_COLUMN_ADDRESS, wallet.address);
        contentValues.put(WALLETS_COLUMN_COLOR_SCHEME, wallet.colorScheme);
        contentValues.put(WALLETS_COLUMN_STATUS, "active");

        // check whether seed exists
        ArrayList<WalletEntry> wallets = sqlSearch(SQL_SERACH_SEED, new String[]{wallet.seed, wallet.coinType});
        WalletEntry w = null;

        if (wallets.size() > 0) {
            // We already have one wallet that has this seed
            w = wallets.get(0);
            if (w.status.equals("active")) {
                // if the wallet is still active, add a new wallet with same seed is not allowed
                or.success = false;
                or.errorDescription = "More than one seed/coin type pair is not allowed";

                return or;

            } else {
                // if the wallet is disabled, then we need to update status from disabled to active
                // update
                db.update(WALLETS_TABLE_NAME, contentValues,WALLETS_COLUMN_ID + " = ?",
                        new String[] {Integer.toString(w.id)});

                or.success = true;
                or.result = Integer.toString(w.id);

                return or;
            }

        } else {
            // This is really a new wallet
            long walletID = db.insert(WALLETS_TABLE_NAME, null, contentValues);
            if (walletID != -1) {
                or.success = true;
                or.result = Long.toString(walletID);

                return or;

            } else {
                or.success = false;
                or.errorDescription = "Failed to insert wallet record";
                return or;
            }
        }


    }

    // disableWallet "deletes" a wallet by changing the status from "active" to disabled"
    public Boolean disableWallet (Integer id) {
        SQLiteDatabase db = this.getWritableDatabase();
        ContentValues contentValues = new ContentValues();

        contentValues.put(WALLETS_COLUMN_STATUS, "disabled");

        db.update(WALLETS_TABLE_NAME, contentValues,WALLETS_COLUMN_ID + " = ?", new String[] {Integer.toString(id)});

        return true;
    }

    public WalletEntry getWallet(Integer id) {
        ArrayList<WalletEntry> wallets = sqlSearch(SQL_SEARCH_ID, new String[]{"active", Integer.toString(id)});
        WalletEntry wallet = null;
        if (wallets.size() > 0) {
            wallet =  wallets.get(0);
        } else {
            Log.e("superwallet", "failed to get wallet: wallet id = " + Integer.toString(id));
            wallet =  new WalletEntry();
        }

        return wallet;
    }

    public ArrayList<WalletEntry> getAllWallets() {
        return sqlSearch(SQL_SERACH_STATUS, new String[]{"active"});
    }

    public void updateWalletColor(Integer walletID, Integer color) {
        SQLiteDatabase db = getWritableDatabase();

        ContentValues values = new ContentValues();

        values.put(WALLETS_COLUMN_COLOR_SCHEME, color);

        db.update(WALLETS_TABLE_NAME, values, WALLETS_COLUMN_ID + " = ?", new String[]{Integer.toString(walletID)});

    }

    public void updateBalance(Integer walletID, String newBalance) {
        SQLiteDatabase db = getWritableDatabase();

        ContentValues values = new ContentValues();

        values.put(WALLETS_COLUMN_BALANCE_LAST_SEEN, newBalance);

        db.update(WALLETS_TABLE_NAME, values, WALLETS_COLUMN_ID + " = ?", new String[]{Integer.toString(walletID)});
    }

    public String getBalanceLastSeen(Integer walletID) {

        WalletEntry wallet = getWallet(walletID);
        return wallet.balanceLastSeen;
    }

}