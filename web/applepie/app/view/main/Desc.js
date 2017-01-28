/**
 * Created by win on 2016-09-15.
 */
Ext.define('Plus.view.main.Desc',{
    extend: 'Ext.Panel',
    alias: 'widget.desc',
    name: 'desc',
    title: 'EMP',
    requires:[
        'Plus.view.tableinfo.TableInfo',
        'Plus.view.tableinfo.TableDetailTab',
        'Plus.view.tableinfo.ColumnInfo'
    ],
    layout: 'border',
    closable: true,
    items: [{
        region: 'west',
        margin: '0 0 0 0',
        xtype: 'tableinfo',
        width: 200,
        weight: -1,
        split: true
    }, {
        region: 'center',
        xtype: 'tabledetailtab',
        margin: '0 0 0 0',
        weight: -2
    },{
        region: 'south',
        margin: '0 0 0 0',
        xtype: 'columninfo',
        weight: -2,
        height: 400,
        minHeight: 50,
        split: true
    }]
});