/**
 * Created by hun on 2016-09-05.
 */
Ext.define('Plus.view.westtoolbar.westToolBarSub02Class', {
    extend : 'Ext.toolbar.Toolbar',
    alias: 'widget.westtoolbarsub02',
    cls: 'westtoobar',
    items: [{
        icon: '../resources/images/liteplus_icon_2.png',
        cls: 'my-btn-icon',
        tooltip: 'Execution Plan (Ctrl+Alt+P)',
        itemId: 'plan',
        padding: '0,0',
        scale: 'large'
    },{
        icon: '../resources/images/liteplus_icon_4.png',
        cls: 'my-btn-icon',
        tooltip: 'Batch Run (F6)',
        itemId: 'batch',
        padding: '0,0',
        scale: 'large'
    },{
        icon: '../resources/images/liteplus_icon_6.png',
        cls: 'my-btn-icon',
        tooltip: 'Column Align Format', // format기능으로 대치함
        itemId: 'format',
        padding: '0,0',
        scale: 'large'
    },{
        icon: '../resources/images/liteplus_icon_8.png',
        cls: 'my-btn-icon',
        itemId: 'tableinfo',
        tooltip: 'Describe Table/View (ALT+F5)',
        padding: '0,0',
        scale: 'large'
    },{
        icon: '../resources/images/liteplus_icon_10.png',
        cls: 'my-btn-icon',
        tooltip: 'Get SQL From Histroy',
        //disabled: true,
        itemId: 'history',
        padding: '0,0',
        scale: 'large'
    },{
        icon: '../resources/images/liteplus_icon_12.png',
        cls: 'my-btn-icon',
        tooltip: 'Next SQL (F3)',
        itemId: 'next',
        padding: '0,0',
        scale: 'large'
    },{
        icon: '../resources/images/liteplus_icon_14.png',
        cls: 'my-btn-icon',
        tooltip: 'Insert From File',
        itemId: 'insert',
        padding: '0,0',
        scale: 'large'
    },{
        icon: '../resources/images/liteplus_icon_16.png',
        cls: 'my-btn-icon',
        tooltip: 'Save As...',
        itemId: 'saveas',
        padding: '0,0',
        scale: 'large'
    },{
        icon: '../resources/images/liteplus_icon_18.png',
        cls: 'my-btn-icon',
        disabled: true,
        tooltip: 'Change Connection...',
        itemId: 'connection',
        padding: '0,0',
        scale: 'large'
    }
    ]
});