/**
 * Created by win on 2016-09-18.
 */
Ext.define('Plus.view.tableinfo.Grants', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.grants',

    title: 'Grants',
    name: 'grants',

    initComponent: function(){
        this.columns = [
        ];
        this.viewConfig = {
            forceFit: true
        };

        this.callParent(arguments);
    }
});