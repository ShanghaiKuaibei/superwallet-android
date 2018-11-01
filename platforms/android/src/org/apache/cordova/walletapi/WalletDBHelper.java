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

    public static final String SQL_SERACH_SEED = "select * from " + WALLETS_TABLE_NAME + " where " +
            WALLETS_COLUMN_SEED + " = ?" + " and " +
            WALLETS_COLUMN_COIN_TYPE + " = ?";

    public static final String SQL_SERACH_STATUS = "select * from " + WALLETS_TABLE_NAME + " where " +
            WALLETS_COLUMN_STATUS + " = ?";

    public static final String SQL_SEARCH_ID = "select * from " + WALLETS_TABLE_NAME + " where " +
            WALLETS_COLUMN_STATUS + " = ? " + " and " +
            WALLETS_COLUMN_ID + " = ?";



    public WalletDBHelper(Context context) {
        super(context, DATABASE_NAME , null, 1);
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
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
                        WALLETS_COLUMN_STATUS + " text)"
        );
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        db.execSQL("DROP TABLE IF EXISTS " + WALLETS_TABLE_NAME);
        onCreate(db);
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

        SQLiteDatabase db = this.getWritableDatabase();

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

                return or;
            }

        } else {
            // This is really a new wallet
            db.insert(WALLETS_TABLE_NAME, null, contentValues);
            or.success = true;
            return or;
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
}