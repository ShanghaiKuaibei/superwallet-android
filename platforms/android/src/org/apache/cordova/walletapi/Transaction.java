package org.apache.cordova.walletapi;

public final class Transaction {
    public Integer id;
    public String coinType;
    public String address;
    public String operation; // always "sent", in the future, maybe "received"
    public String TxID;
    public String time;
    public String toAddress;
    public String amount;
}
