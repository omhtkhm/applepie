/**
 * Created by win on 2016-09-18.
 */
Ext.define('Plus.view.tableinfo.TableDetailTab', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.tabledetailtab',

    requires: [
        'Plus.view.tableinfo.Index',
        'Plus.view.tableinfo.Constraint',
        'Plus.view.tableinfo.Grants',
        'Plus.view.tableinfo.Trigger',
        'Plus.view.tableinfo.DDL'
    ],
    activeTab: 0,
    items: [
        {xtype: 'index'},
        {xtype: 'constraint'},
        {xtype: 'grants'},
        {xtype: 'trigger'},
        {xtype: 'ddl'}
    ]
});