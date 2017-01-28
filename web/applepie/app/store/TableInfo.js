Ext.define('Plus.store.TableInfo', {
    extend:'Ext.data.Store',
    //requires: [
    //    'Plus.model.TableInfo'
    //],
    model: 'Plus.model.TableInfo',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: 'http://127.0.0.1/liteplus/data/tableinfo.json'
    }
    //,
    //reader: {
    //    type: 'json',
    //    record: 'items'
    //    //rootProperty: 'item'
    //}
});

