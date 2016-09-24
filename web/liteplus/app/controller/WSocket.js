/**
 * Created by win on 2016-09-17.
 */
Ext.define('Plus.controller.WSocket', {
    extend: 'Ext.app.Controller',
    alias: 'controller.wsocket',

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
        var messageType = jsonResult.messageType;
        //var messageType = 'query';
        switch(messageType){
            case 'query' : {
                Plus.app.getController('Query').onResult(message);
                break;
            }
            case 'plan' : {
            Plus.app.getController('Plan').onResult(message);
            break;
            }
            case 'tableinfo' : {
                Plus.app.getController('Desc').onResult(message);
                break;
            }
            default :{
                console.log('Not Expected MessageType received');
            }
        }
    }

});