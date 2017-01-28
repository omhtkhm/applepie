/**
 * Created by hun on 2016-09-30.
 */
Ext.define('Plus.controller.PlanTree',{
    extend: 'Ext.app.Controller',
    alias: 'controller.plantree',

    views: ['bottom.PlanResult'],

    init: function(){
        console.log('Initialized LitePlus plantree Controller');
        this.control({
            'planresult' : {
                itemclick: function(s,r,i,index) {
                    //alert(index);
                    //클릭이 테이블 인지 확인 후 테이블 정보로 이동하도록 처리. index값으로 받는 plan결과 데이터를 활용해야함
                    var treeinfoarray = Plus.app.getController('Plan').treeinfoarray; //선택된값을 가져온다.
                    console.log(treeinfoarray[index]);
                    if(treeinfoarray[index].OBJECT_TYPE=="TABLE"){  //테이블이므로 이동
                        var descController = Plus.app.getController('Desc');
                        var ownertablename = treeinfoarray[index].OBJECT_OWNER+"."+treeinfoarray[index].OBJECT_NAME; // 탭의 이름을 정해주기 위해 설정함
                        descController.tablename = ownertablename;
                        // 웹소켓으로 SQL문 메시지를 보낸다
                        var clientMessage = new Object();
                        clientMessage.messageType = "tableinfo";
                        clientMessage.sqltext = ownertablename;
                        var clientMessage = JSON.stringify(clientMessage);
                        console.log(clientMessage);
                        mywebsocket.send (clientMessage);
                    }
                }
            }
        });
    },

    onFormatClick: function(button, e, eOpts){
        console.log('Format button click');
        var sqltextaray = Ext.ComponentQuery.query('textarea[name=sqltextarea]')[0];
        //var sqltext = sqltextaray.getValue();
        //console.log(sqltext);
        var selectedText = Plus.app.getController('Query').getSelectedText(sqltextaray); //선택된값을 가져온다.

        var sqltext ;
        if(selectedText!='') {   // 선택된 셀렉션값이 있으면, SQL문을 선택된값으로 수정한다.
            sqltext = selectedText;
        } else {   // 선택된 것이 없으면, SQL 자동 선택
            sqltext = this.getAutoLinesSelection(sqltextaray);
        }
        console.log('sqltext: '+sqltext);

        // 웹소켓으로 SQL문 메시지를 보낸다
        var clientMessage = new Object();
        clientMessage.messageType = "format";
        clientMessage.sqltext = sqltext;
        var clientMessage = JSON.stringify(clientMessage);
        console.log(clientMessage);
        mywebsocket.send (clientMessage);
    },

    onResult : function(message) {
        var sqltextarea = Ext.ComponentQuery.query('textarea[name=sqltextarea]')[0];
        var jsonResult = Ext.JSON.decode(message);
        var success = jsonResult.success;
        var jsonResultSet = jsonResult.afterformat;
        console.log(success);

        //sqltextarea.setValue(jsonResultSet);
        var textareael = sqltextarea.inputEl.dom;
        $(textareael).insertAtCursor(jsonResultSet);
    },

    onKeyDown: function(textarea, e, eOpts){
        if(e.ctrlKey && e.shiftKey && (e.getCharCode() == Ext.EventObject.F)){
            console.log('Ctrl+Shift+F key down');
            this.onFormatClick();
        }
    },

    getAutoLinesSelection: function(sqltextaray) {
        // 셀렉션이 없으면 커서위치로 위아래의 빈줄로 나뉘어진 문장을 동적 Selection해야함. 빈줄이 없으면 전체문장으로 동적 Selection
        //커서위치 다음행+다음행...공백행이 나올때까지. 이전행+이전행+공백행이 나올때까지.
        //선택을 공백행 다음행부터 다음공백행 전까지를 선택해서 Format SQL문을 삽입한다.
        var textarea = sqltextaray.inputEl.dom;
        var textLines = textarea.value.substr(0, textarea.selectionStart).split("\n"); //커서까지 잘라서 각 행을 배열에 넣음
        var textTotalLines = textarea.value.split("\n"); //전체를 각 행별로 배열에 넣음
        var currentLineNumber = textLines.length; //현재 행
        var totalLineNumber = textTotalLines.length; //전체 행
        var startLine=1;
        var endLine=totalLineNumber;
        //현재행이 공백행이면 공백행이 아닌 문장이 나올때까지 찾는다.
        var addLine=0;
        var addPreLine=0;
        for(var i=currentLineNumber; i<=totalLineNumber ; i++){ //현재행부터 마지막행까지 공백행을 찾는다.
            if(textTotalLines[i-1] == '' ) {  //현재행 공백
                addLine += 1;
            } else{
                break; //공백이 아닌행이 나타나면 빠져나가기
            }
        }
        for(var i=currentLineNumber+addLine; i<=totalLineNumber ; i++){ //현재행 다음행부터 마지막행까지 공백행을 찾는다.
            if(textTotalLines[i-1] == '') {
                endLine = i-1;
                break;
            }
        }

        for(var i=currentLineNumber; i>=1 ; i--){ //현재행부터 첫행까지 역으로 공백행을 찾는다.
            if(textTotalLines[i-1] == '' ) {  //현재행 공백
                addPreLine += 1;
            } else{
                break; //공백이 아닌행이 나타나면 빠져나가기
            }
        }
        for(var i=currentLineNumber-addPreLine; i>=1 ; i--){ //현재행 이전행부터 첫행까지 역으로 공백행을 찾는다.
            if(textTotalLines[i-1] == '') {
                startLine = i+1;
                break;
            }
        }

        console.log('시작행:' + startLine + ',종료행:' + endLine);
        //$(textarea).setSelection(0,200);
        this.selectTextareaLine(textarea,startLine,endLine);
        //return sqltextaray.getValue();
        return Plus.app.getController('Query').getSelectedText(sqltextaray);
    },

    selectTextareaLine : function (tarea,startLineNum,endLineNum) {
        startLineNum--; // array starts at 0
        endLineNum--; // array starts at 0
        var lines = tarea.value.split("\n");

        // calculate start/end
        var startPos = 0, endPos = tarea.value.length;
        for(var x = 0; x < startLineNum; x++) {
            //if(x == startLineNum) {
            //    break;
            //}
            startPos += (lines[x].length+1);
        }

        var endPos = startPos;
        for(var x=startLineNum; x<=endLineNum; x++) {
            endPos += (lines[x].length + 1);
        }
        endPos--;
        console.log('시작지점:'+startPos + ', 종료지점:'+endPos);

        // do selection
        // Chrome / Firefox

        if(typeof(tarea.selectionStart) != "undefined") {
            tarea.focus();
            tarea.selectionStart = startPos;
            tarea.selectionEnd = endPos;
            return true;
        }

        // IE
        if (document.selection && document.selection.createRange) {
            tarea.focus();
            tarea.select();
            var range = document.selection.createRange();
            range.collapse(true);
            range.moveEnd("character", endPos);
            range.moveStart("character", startPos);
            range.select();
            return true;
        }

        return false;
    }
});