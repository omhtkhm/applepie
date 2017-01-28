/**
 * Created by hun on 2016-09-12.
 */
Ext.define('Plus.view.Viewport',{
    extend: 'Ext.container.Viewport',
    alias: 'widget.mainviewport',
    //cls: 'custom-liteplusmain',
    requires:[
        'Plus.view.toptoolbar.topMenuClass',
        'Plus.view.main.mainTab'
    ],
    layout: 'border',
    items: [{
        region: 'north',
        layout: 'hbox',
        height: 80,
        margin: '3 3 3 3',
        border: false,
        items: [{
            xtype: 'label',
            html: '<img src="../resources/images/LitePlus_logo.png" width="141" height="86" />',
            border: false,
            bodyStyle: 'margin: 0px 0px; padding: 0px 0px;'
        },{
            xtype: 'topMenu',
            border: false,
            margin: '0 0 0 0'
        }]
    }, {
        region: 'center',
        margin: '0 0 0 0',
        xtype: 'mainTab'
    }]
});
