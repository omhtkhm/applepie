///**
// * Created by win on 2016-09-15.
// */
Ext.define('Plus.model.TableInfo', {
    extend:'Ext.data.Model',
    proxy: {
        type: 'ajax',
        reader: 'json'
    },
    fields: [
        {name: 'key',     type: 'string'},
        {name: 'value',     type: 'string'}
    ]
});