/**
 * Created by win on 2016-09-17.
 */
Ext.define('Plus.controller.WSocket', {
    extend: 'Ext.app.Controller',
    alias: 'controller.wsocket',
    //views: ['textarea.centerTextAreaClass'],
    init: function () {
        this.addEvents('newmessage');
        var me = this;
        var ip = location.host;
        mywebsocket = Ext.create('Ext.ux.WebSocket', {
            url: 'ws://'+ip+'/wshandler',
            listeners: {
                open: function (ws) {
                    console.log('The websocket is ready to use');
                    //ws.send ('This is a simple text');
                },
                close: function (ws) {
                    console.log('The websocket is closed!');
                },
                error: function (ws, error) {
                    Ext.Error.raise(error);
                },
                message: function (ws, message) {
                    //console.log('A new message is arrived: ' + message); 서버측 응답메시지. 필요시만 찍을 것
                    me.messageHandler(message);
                }
            }
        });
    },

    messageHandler : function(message){
        var jsonResult = Ext.JSON.decode(message);
        //var success = jsonResult.success;
        //if(success){  // 성공적을 처리 되었으면, 성공여부는 각 처리로직에서 처리하도록 변경
            var messageType = jsonResult.messageType;
            switch (messageType) {
                case 'query' :
                    Plus.app.getController('Query').onResult(message);
                    break;
                case 'plan' :
                    Plus.app.getController('Plan').onResult(message);
                    break;
                case 'tableinfo' :
                    Plus.app.getController('Desc').onResult(message);
                    break;
                case 'format' :
                    Plus.app.getController('Format').onResult(message);
                    break;
                case 'merge' :
                    Plus.app.getController('Merge').onResult(message);
                    break;
                case 'history' :
                    Plus.app.getController('History').onResult(message);
                    break;
                case 'historygrid' :
                    Plus.app.getController('History').onHistGridResult(message);
                    break;
                case 'batch' :
                    Plus.app.getController('Batch').onResult(message);
                    break;
                //case 'popup' :
                //    this.popupMessage(jsonResult);
                //    break;
                case 'error' :
                    console.log('error MessageType received');
                    var errormessage = jsonResult.errorMessage;
                    Ext.MessageBox.alert('LitePlus', errormessage, function(){
                        return false;
                    });
                    break;
                default :
                {
                    console.log('Not Expected MessageType received');
                }
            }
        //} else {
        //    var errormessage = jsonResult.errormessage;
        //    Ext.MessageBox.alert('LitePlus', errormessage, function(){
        //        return true;
            //});
        //}
    },

    //popupMessage : function(jsonResult){
        //var sqltextarea = Ext.ComponentQuery.query('textarea[name=sqltextarea]')[0];
        //var sqlController = Plus.app.getController('Query');
        //var selectedText = sqlController.getSelectedText(sqltextarea); //선택된값을 가져온다.
        //var currentPos = $(sqltextarea.inputEl.dom).getCursorPosition();
        //console.log(currentPos);
        //var errormessage = jsonResult.errormessage;
        //Ext.MessageBox.alert('LitePlus', errormessage, function(){
        //    return false;
        //});
        ////팝업 후 커서, 셀렉션 원복
        //sqltextarea.focus();
        //if(selectedText!='') {   // 선택된 셀렉션값이 있으면, SQL문을 선택된값으로 수정한다.
        //    $(sqltextarea.inputEl.dom).setSelection(sqlController.input.selectionStart, sqlController.input.selectionEnd) //현재 선택을 유지한다
        //} else {   // 선택된 것이 없으면, SQL 자동 선택
        //    $(sqltextarea.inputEl.dom).setCursorPosition(currentPos); //현재위치에 가져다 놓는다
        //}
    //}
});