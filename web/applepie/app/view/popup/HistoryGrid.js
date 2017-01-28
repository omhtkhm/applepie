/**
 * Created by hun on 2016-10-04.
 */

Ext.define('Plus.view.popup.HistoryGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.historygrid',
    name: 'historygrid',
    store: Ext.create('Plus.store.HistoryGrid'),
    columns: [
        { text: 'ID',  dataIndex: 'ID', flex: 1, style: 'text-align:center',     align:'left'},
        { text: 'LAST RUN', dataIndex: 'LASTRUN', flex: 3 , style: 'text-align:center',     align:'left'},
        { text: 'SQL STATEMENT', dataIndex: 'SQLSTMT', flex: 9, style: 'text-align:center',     align:'left'}
    ],
    height: 400,
    width: 800
});
