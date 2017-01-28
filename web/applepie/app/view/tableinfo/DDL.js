/**
 * Created by win on 2016-09-18.
 */
Ext.define('Plus.view.tableinfo.DDL', {
    extend: 'Ext.form.field.TextArea',
    alias: 'widget.ddl',

    title: 'DDL',
    name: 'ddl',

    initComponent: function(){
        this.viewConfig = {
            forceFit: true
        };

        this.callParent(arguments);
    }
});