/**
 * Created by hun on 2016-09-27.
 */
Ext.define('Plus.view.popup.Load', {
    extend: 'Ext.window.Window',
    alias : 'widget.load',
    name : 'load',
    title : 'Open A File',
    layout: 'fit',
    autoShow: true,
    modal: true,
    tempText: '',
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
        Ext.ComponentQuery.query('#popload')[0].fireEvent('click'); //OK버튼을 찾아서 click이벤트 발생. enter이벤트를 여기서 멈추어야 함
    },

    onEsc: function (k, e) {
        e.stopEvent();
        Ext.ComponentQuery.query('load[name=load]')[0].close(); //창을 close()
    },
    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
                name: 'loadform',
                items: [
                    {
                        xtype: 'textfield',
                        name : 'loadname',
                        value: this.tempText,
                        fieldLabel: 'Load Name',
                        allowBlank: false,
                        msgTarget: 'side',
                        margin: '10 10 10 10'
                    }
                ]
                //defaults:{
                //    enableKeyEvents:true,
                //    listeners:{
                //        specialKey: function(field, el)
                //        {
                //            if(el.getKey() == Ext.EventObject.ENTER)
                //            {
                //                el.stopEvent();
                //                Ext.ComponentQuery.query('#popload')[0].fireEvent('click'); //팝업버튼을 찾아서 click이벤트 발생
                //            }
                //        }
                //    }
                //}
            }
        ];

        this.buttons = [
            {
                text: 'Load',
                itemId: 'popload'
            },
            {
                text: 'Cancel',
                scope: this,
                handler: this.close
            }
        ];

        //this.control({
        //    'textfield': {
        //        specialkey: function (field, e) {
        //            if (e.getKey() == e.ENTER) {
        //                alert("I hit enter!");
        //            }
        //        }
        //    }
        //});

        this.callParent(arguments);
    }
});