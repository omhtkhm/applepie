/**
 * Created by win on 2016-09-18.
 */
Ext.define('Plus.view.tableinfo.Constraint', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.constraint',

    title: 'Constraint',
    name: 'constraint',

    initComponent: function(){
        this.columns = [
        ];
        this.viewConfig = {
            forceFit: true
        };

        this.callParent(arguments);
    }
});