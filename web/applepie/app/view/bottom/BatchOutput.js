/**
 * Created by win on 2016-10-09.
 */
Ext.define('Plus.view.bottom.BatchOutput', {
    extend: 'Ext.form.field.TextArea',
    alias: 'widget.batchoutput',
    //disabled: true,
    readOnly: true,
    title: 'Batch Output',
    name: 'batchoutput',
    //cls: 'batchoutput',
    //autoScroll: true,
    //width: 3000,
    //cols: 10,
    //maxLength: 5, // 5 is only used for demo purpose
    //enforceMaxLength: true,
    //preventScrollbars: false,

    initComponent: function(){
        //this.value = 'test';
        this.callParent(arguments);
    }
});