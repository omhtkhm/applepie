/**
 * Created by win on 2016-09-18.
 */
Ext.define('Plus.view.tableinfo.ColumnInfo', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.columninfo',

    name: 'columninfo',

    initComponent: function(){
        this.columns = [
        ];
        this.viewConfig = {
            forceFit: true
        };

        this.callParent(arguments);
    }
});