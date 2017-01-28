/**
 * Created by win on 2016-09-15.
 */
Ext.define('Plus.view.main.Query',{
    extend: 'Ext.Panel',
    alias: 'widget.query',
    name: 'Query',
    title: 'SYS@ORCL3:72',
    requires:[
        'Plus.view.textarea.centerTextAreaClass',
        'Plus.view.westtoolbar.westToolBarClass',
        //'Plus.view.contextmenu.contextMenuClass',
        'Plus.view.bottom.TabPanel'
    ],
    layout: 'border',
    items: [{
        region: 'west',
        margin: '0 5 0 5',
        xtype: 'westtoolbar'
    }, {
        region: 'south',
        margin: '0 5 5 5',
        split: true,
        height: 300,
        minHeight: 50,
        xtype: 'sqltabpanel'
    },{
        region: 'center',
        xtype: 'centertextarea',
        margin: '0 5 0 0'
    }]
});