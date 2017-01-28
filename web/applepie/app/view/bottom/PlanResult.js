
//Ext.require('Plus.view.executionPlanModelClass');

//var store = Ext.create('Ext.data.TreeStore', {
//    model: {
//        xtype: 'planmodel'
//    },
//    requires: 'Plus.model.Plan',
//
//    autoLoad:false,
//    folderSort: false
//});

Ext.define('Plus.view.bottom.PlanResult',{
    extend: 'Ext.tree.Panel',
    alias: 'widget.planresult',

    title: 'Plan',
    name: 'treegridplanresult',
    width: 500,
    height: 300,
    collapsible: true,
    useArrows: false,
    rootVisible: false,
    //store: [],
    //multiSelect: false,
    singleExpand: true,
    //columns: [{
    //    //xtype: 'treecolumn',
    //    text: 'Execution Plan',
    //    flex: 1,
    //    sortable: false,
    //    dataIndex: 'plan'
    //}]
    //store: Ext.create('Ext.data.TreeStore', {
    //    root: {
    //        expanded: true,
    //        "iconCls": "ico-noimage",
    //        "children": [
    //            { text: "sss", leaf: true,
    //                "iconCls": "ico-noimage"
    //            },
    //            { text: "xxx", expanded: true,
    //                "iconCls": "ico-noimage",
    //                children: [
    //                    {text: "sss", leaf : true,"iconCls": "ico-noimage"},
    //                    {text: "sss", leaf : true,"iconCls": "ico-noimage"}
    //                ]},
    //            { text: "sss", leaf: true,"iconCls": "ico-noimage"}
    //        ]
    //    }
    //})
});
