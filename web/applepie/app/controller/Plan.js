/**
 * Created by hun on 2016-09-12.
 */
Ext.define('Plus.controller.Plan',{
    extend: 'Ext.app.Controller',
    alias: 'controller.plan',

    views: ['bottom.PlanResult'],

    init: function(){
        console.log('Initialized LitePlus Controller');
        this.control({
            'westtoolbarsub02 #plan' : {
                click: this.onPlanClick
            },
            'centertextarea' : {
                //specialkey: this.onKeyDown,
                keydown: this.onKeyDown
            }
        });
    },

    onPlanClick: function(button, e, eOpts){
        console.log('실행 button click');
        var sqltextarea = Ext.ComponentQuery.query('textarea[name=sqltextarea]')[0];
        var sqlController = Plus.app.getController('Query');
        var selectedText = sqlController.getSelectedText(sqltextarea); //선택된값을 가져온다.
        //console.log('selected Text: '+selectedText);
        var sqltext ;
        if(selectedText!='') {   // 선택된 셀렉션값이 있으면, SQL문을 선택된값으로 수정한다.
            sqltext = selectedText;
            $(sqltextarea.inputEl.dom).setSelection(sqlController.input.selectionStart, sqlController.input.selectionEnd) //현재 선택을 유지한다
        } else {   // 선택된 것이 없으면, SQL 자동 선택
            var currentPos = $(sqltextarea.inputEl.dom).getCursorPosition();
            sqltext = Plus.app.getController('Format').getAutoLinesSelection(sqltextarea);
            $(sqltextarea.inputEl.dom).setCursorPosition(currentPos); //현재위치에 가져다 놓는다
        }
        console.log('sqltext: '+sqltext);

        var tabs = Ext.ComponentQuery.query('sqltabpanel[name=sqltabpanel]')[0];
        var items = tabs.items.items;
        tabs.setActiveTab(items[1].id); //Plan결과 Tab에 위치한다

        // 웹소켓으로 SQL문 메시지를 보낸다
        var clientMessage = new Object();
        clientMessage.messageType = "plan";
        clientMessage.sqltext = sqltext;
        var clientMessage = JSON.stringify(clientMessage);
        console.log(clientMessage);
        mywebsocket.send (clientMessage);
    },

    onResult : function(message) {
        var treegridPlan = Ext.ComponentQuery.query('planresult[name=treegridplanresult]')[0];
        var jsonResult = Ext.JSON.decode(message);
        var success = jsonResult.success;
        console.log(success);
        console.log(jsonResult);
        if (success) {
            var jsonResultSet = jsonResult.root;
            treegridPlan.reconfigure(this.createTreeStore(jsonResultSet));
            this.treeinfoarray = jsonResult.resultsetdetailinfo;
        } else {   // success == false
            var errormessage = jsonResult.errormessage;
            Ext.MessageBox.alert('LitePlus', errormessage, function (btn) {
                if (btn == 'ok') {
                    Ext.ComponentQuery.query('textarea[name=sqltextarea]')[0].focus();
                }
            });
        }
    },

    createTreeStore : function (json) {  // json에 tree json객체의 배열이 들어감
        return Ext.create('Ext.data.TreeStore', {
            root: json
        });
    },

    onKeyDown: function(textarea, e, eOpts){
        if(e.ctrlKey && e.altKey && (e.getCharCode() == Ext.EventObject.P)){
            console.log('Ctrl+ALT+P key down');
            this.onPlanClick();
        }
    }
});