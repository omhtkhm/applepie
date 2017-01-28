/**
 * Created by hun on 2016-09-27.
 */
Ext.define('Plus.view.popup.Save', {
    extend: 'Ext.window.Window',
    alias : 'widget.save',
    name : 'save',
    title : 'Save As... ',
    layout: 'fit',
    autoShow: true,
    modal: true,
    listeners: {
        afterrender: function () {
            var me = this;
            var keyMap = me.getKeyMap();
            keyMap.on(13, me.onEnter, me);
            keyMap.on(27, me.onEsc, me);
        }
    },

    onEnter: function (k, e) {
        e.stopEvent();
        Ext.ComponentQuery.query('#popsave')[0].fireEvent('click'); //OK버튼을 찾아서 click이벤트 발생. enter이벤트를 여기서 멈추어야 함
    },

    onEsc: function (k, e) {
        e.stopEvent();
        Ext.ComponentQuery.query('save[name=save]')[0].close(); //창을 close()
    },

    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
                name: 'saveform',
                //monitorValid: true,
                items: [
                    {
                        xtype: 'textfield',
                        name : 'savename',
                        fieldLabel: 'Save Name',
                        allowBlank: false,
                        //value:'',
                        msgTarget: 'side',
                        margin: '10 10 10 10'
                    }
                ]
                //defaults: {
                //    enableKeyEvents: true,
                //    listeners: {
                //        specialKey: function (field, el) {
                //            if (el.getKey() == Ext.EventObject.ENTER) {
                //                el.stopEvent();
                //                Ext.ComponentQuery.query('#popsave')[0].fireEvent('click'); //팝업버튼을 찾아서 click이벤트 발생
                //            }
                //        }
                //    }
                //}
            }
        ];

        this.buttons = [
            {
                text: 'Save',
                action: 'save',
                itemId: 'popsave'
                //formBind: true
            },
            {
                text: 'Cancel',
                scope: this,
                handler: this.close
            }
        ];

        this.callParent(arguments);
    }
});