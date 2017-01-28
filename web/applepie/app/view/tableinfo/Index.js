/**
 * Created by win on 2016-09-18.
 */
Ext.define('Plus.view.tableinfo.Index', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.index',

    title: 'Index',
    name: 'index',

    initComponent: function(){
        this.columns = [
        ];
        this.viewConfig = {
            forceFit: true
        };

        this.callParent(arguments);
    }
});