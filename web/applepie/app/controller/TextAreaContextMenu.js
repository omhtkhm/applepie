/**
 * Created by hun on 2016-09-12.
 */
Ext.define('Plus.controller.TextAreaContextMenu',{
    extend: 'Ext.app.Controller',
    alias: 'controller.contextmenu',

    stores: [],
    models: [],
    views: ['textarea.centerTextAreaClass'],

    init: function(){
        //console.log('Initialized LitePlus Controller');
        this.control({
            'centertextarea' : {
                containercontextmenu: this.onContextMenu
            }
        });
    },

    onContextMenu: function(button, e, eOpts) {
        console.log('Mouse Right click');
        //var sqltext = Ext.getCmp('textareaId').getValue();
    }
});