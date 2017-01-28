Ext.define('Plus.store.HistoryGrid', {
    extend:'Ext.data.Store',
    //storeId:'histoyrstore',
    fields:['ID', 'LASTRUN', 'SQLSTMT'],
    data:/*{'items':*/[
        { 'ID': 'Lisa',  "LASTRUN":"lisa@simpsons.com",  "SQLSTMT":"555-111-1224"  },
        { 'ID': 'Bart',  "LASTRUN":"bart@simpsons.com",  "SQLSTMT":"555-222-1234" },
        { 'ID': 'Homer', "LASTRUN":"homer@simpsons.com", "SQLSTMT":"555-222-1244"  },
        { 'ID': 'Marge', "LASTRUN":"marge@simpsons.com", "SQLSTMT":"555-222-1254"  }
    ]/*}*//*,
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'items'
        }
    }*/
});