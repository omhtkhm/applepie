/**
 * Created by hun on 2016-09-02.
 */
Ext.define('Plus.view.toptoolbar.topMenuClass', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.topMenu',
    cls: 'toptoolbar',
    height: 80,
    flex: 1,
    initComponent: function() {
        this.items = [{
            xtype: 'label',
            html: '<img src="../resources/images/querytool.png" width="83" height="26" />'
            //text: 'Query Tool',
            //cls: 'toptoolbarbutton'
//			handler: functionReference
        },
            '->',{
                xtype: 'splitbutton',
                //cls: 'toptoolbarbutton',
                text: 'Windows',
                //cls: 'toptoolbarbutton',
                menu: [{
                    text: 'SCOTT@ORCL2:192'
                }, {
                    text: 'PL/SQL Edit-SCOTT@ORCL2:192'
                }]
            }
        ];
            this.callParent(arguments);
    }
});