/**
 * Created by win on 2016-10-04.
 */
Ext.define('Plus.view.popup.History', {
    extend: 'Ext.window.Window',
    alias : 'widget.history',
    name : 'history',
    title : 'SQL History',
    requires: [
        'Plus.view.popup.HistoryGrid'
    ],
    layout: 'vbox',
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
        //Ext.ComponentQuery.query('#popfind')[0].fireEvent('click'); //OK버튼을 찾아서 click이벤트 발생. enter이벤트를 여기서 멈추어야 함
    },

    onEsc: function (k, e) {
        e.stopEvent();
        //Ext.ComponentQuery.query('find[name=find]')[0].close(); //OK버튼을 찾아서 click이벤트 발생. enter이벤트를 여기서 멈추어야 함
    },
    items: [{
        layout: 'hbox',
        align: 'stretch',
        width: 800,
        //padding: '5 5',
        border: false,
        items:[{
            xtype: 'radiofield',
            name: 'writemode',
            //value: 'insert',
            inputValue: 'insert',
            boxLabel: 'Insert',
            width: 70,
            margin: '2 0 2 15'
        },{
            xtype: 'radiofield',
            name: 'writemode',
            //value: 'overwrite',
            inputValue: 'overwrite',
            boxLabel: 'Overwrite',
            width : 100,
            margin: '2 0 2 0'
        },{
            xtype: 'textfield',
            value: '%',
            fieldLabel: 'Find',
            labelWidth: 30,
            width: 610,
            //align: 'stretch',
            margin: '2 0 2 0',
        }]},{
        xtype: 'historygrid'
    }]
});