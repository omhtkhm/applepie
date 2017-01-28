/**
 * Created by hun on 2016-09-05.
 */

Ext.define('Plus.view.bottom.ResultBar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.resultbar',

    items: [{
        //text:'Query Result',
        xtype: 'label',
        text: 'Query Result',
        name: 'queryresultlabelname',
        flex: 10
    },
    '-',
    {
        text:'Line 1',
        xtype: 'label',
        name: 'nrowlabel',
        flex: 1
    },
    '-',
    {
        text:'Col 1',
        xtype: 'label',
        name: 'ncollabel',
        flex: 1
    },
    '-'
    ]
});