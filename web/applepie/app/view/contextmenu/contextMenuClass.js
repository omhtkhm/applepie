/**
 * Created by hun on 2016-09-05.
 */

Ext.define('Plus.view.contextmenu.contextMenuClass', {
    extend: 'Ext.menu.Menu',
    alias: 'widget.contextMenu',
    name: 'textfieldContextMenu',

    items: [
        {
            text: '메뉴 옵션 1',
            iconCls: 'flag-blue',
            menu: {
            }
        },{
            text: '메뉴 옵션 2',
            iconCls: 'flag-green',
            menu: {
                plain: true,
                items: {
                    xtype: 'form',
                    border: false,
                    bodyStyle: 'background:transparent;padding:5px',
                    labelWidth: 70,
                    width: 300,
                    defaults: {
                        anchor: '100%'
                    },
                    items: [{
                        xtype: 'combo',
                        editable: false,
                        fieldLabel: '선택',
                        triggerAction: 'all',
                        store: [ [0, '하나'], [1 ,'다른 하나']],
                        value: 0,
                        getListParent: function() {
                            return this.el.up('div.x-menu');
                        }
                    }, {
                        xtype: 'textfield',
                        fieldLabel: '제목'
                    }],
                    fbar: [{
                        text: '보내기'
                    }]
                }
            }
        },{
            text: '메뉴 옵션 3',
            iconCls: 'flag-orange',
            menu: {
            }
        }
    ]

});
