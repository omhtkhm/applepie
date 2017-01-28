/**
 * Created by win on 2016-09-18.
 */
Ext.define('Plus.view.tableinfo.Trigger', {
    extend: 'Ext.form.field.TextArea',
    alias: 'widget.trigger',

    title: 'Trigger',
    name: 'trigger',

    initComponent: function(){
        //this.columns = [
        //];
        this.viewConfig = {
            forceFit: true
        };

        this.callParent(arguments);
    }
});