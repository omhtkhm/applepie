/**
 * Created by hun on 2016-09-05.
 */

Ext.define('Plus.view.westtoolbar.westToolBarSub01Class', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.westtoolbarsub01',
    cls: 'westtoobar',
    //itemConfig: {
    //    //width: 80,
    //    //height: 80
    //},
    items: [{
        icon: '../resources/images/liteplus_icon_1.png',
        scale: 'large',
        cls: 'my-btn-icon',
        tooltip: 'Execute (F7)',
        itemId: 'query',
        action: 'query',
        padding: '0,0'
        //handler: queryExecute
        //listeners: {
        //    click: 'onQueryClick'
        //}
    },{
        icon: '../resources/images/liteplus_icon_3.png',
        scale: 'large',
        cls: 'my-btn-icon',
        disabled: true,
        tooltip: 'Execute With SQL Trace(Not Supported)',
        itemId: 'trace',
        padding: '0,0'
    },{
        icon: '../resources/images/liteplus_icon_5.png',
        scale: 'large',
        cls: 'my-btn-icon',
        tooltip: 'Format (Ctrl+Shift+F)',
        itemId: 'format',
        padding: '0,0'
    },{
        icon: '../resources/images/liteplus_icon_7.png',
        scale: 'large',
        cls: 'my-btn-icon',
        tooltip: 'View Merge',
        itemId: 'merge',
        padding: '0,0'
    },{
        icon: '../resources/images/liteplus_icon_9.png',
        scale: 'large',
        cls: 'my-btn-icon',
        disabled: true,
        tooltip: 'Stored SQL (F9)',
        padding: '0,0'
    },{
        icon: '../resources/images/liteplus_icon_11.png',
        scale: 'large',
        cls: 'my-btn-icon',
        tooltip: 'Previous SQL (F2)',
        itemId: 'previous',
        padding: '0,0'
    },{
        icon: '../resources/images/liteplus_icon_13.png',
        scale: 'large',
        cls: 'my-btn-icon',
        tooltip: 'Load From File',
        itemId: 'load',
        padding: '0,0'
    },{
        icon: '../resources/images/liteplus_icon_15.png',
        scale: 'large',
        cls: 'my-btn-icon',
        tooltip: 'Save (Ctrl+Alt+S)',
        itemId: 'save',
        padding: '0,0'
    },{
        name: 'toolbarfindbtn',
        icon: '../resources/images/liteplus_icon_17.png',
        scale: 'large',
        cls: 'my-btn-icon',
        tooltip: 'Find...(Ctrl+Alt+F, Ctrl+Alt+G or D)',
        itemId: 'find',
        padding: '0,0'
    }
    ]

    //afterRender: function() {
    //    var me = this;
    //    me.callParent(arguments);
    //    // in case of a form you can also use the findField() method
    //    // I used down() because it will work with all sort of containers
    //    me.down('button[name=query]').on('click',me.onQueryClick,me);
    //},
    //
    //onQueryClick: function(field) {
    //    // custom handler
    //    console.log("query button clicked");
    //}
});