/**
 * Created by hun on 2016-09-05.
 */

//var toolbarsub01 = Ext.create('Plus.view.westToolBarSub01Class');
//var toolbarsub02 = Ext.create('Plus.view.westToolBarSub02Class');
Ext.require('Plus.view.westtoolbar.westToolBarSub01Class');
Ext.require('Plus.view.westtoolbar.westToolBarSub02Class');

Ext.define('Plus.view.westtoolbar.westToolBarClass', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.westtoolbar',
    width: 64,
    cls: 'westtoobar',
    dockedItems: [{
        xtype: 'westtoolbarsub01',
        dock: 'left',
        border: false,
        width: 32
    },{
        xtype: 'westtoolbarsub02',
        dock: 'left',
        border: false,
        width: 32
    }]
});
//Ext.define('Plus.view.westtoolbar.westToolBarClass', {
//    extend: 'Ext.panel.Panel',
//    alias: 'widget.westtoolbar',
//    width: 100,
//    //cls: 'westtoobar',
//    layout: 'vbox',
//    items: [{ //상단 툴바
//        html:'<img src="../resources/images/LitePlus_icon_pre.png" height="400" width="100" />'
//    },{  //하단 빈공간
//        html:'<img src="../resources/images/westtoolbar-bottom.png" height="50" width="100" />'
//    }]
//});