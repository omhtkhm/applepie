/**
 * Created by hun on 2016-09-02.
 */
//Ext.require('Plus.store.Query');

Ext.define('Plus.view.bottom.GridResult', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gridresult',

    title: 'Result',
    name: 'gridsqlqueryresult',
    //cls: 'gitdresulttab',

    initComponent: function(){
        //this.store = 'Query';
        this.columns = [
        ];
        this.viewConfig = {
            forceFit: true
        }

        this.callParent(arguments);
    }
});