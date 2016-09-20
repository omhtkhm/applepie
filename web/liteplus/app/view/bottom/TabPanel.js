/**
 * Created by hun on 2016-09-02.
 */


Ext.require('Plus.view.bottom.PlanResult');
Ext.require('Plus.view.bottom.GridResult');
Ext.require('Plus.view.bottom.ResultBar');

Ext.define('Plus.view.bottom.TabPanel', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.sqltabpanel',

    name: 'sqltabpanel',
    //bodyStyle: '',
    //autoScroll: true,
    activeTab: 0,
    items: [
        {xtype: 'gridresult'},
        {xtype: 'planresult'}
    ],
    dockedItems: [{
        xtype: 'resultbar',
        name: 'bottomresultbarname',
        dock: 'bottom',
        border: false
    }]

});