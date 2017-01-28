/**
 * Created by hun on 2016-10-03.
 */
Ext.define('Plus.controller.History',{
    extend: 'Ext.app.Controller',
    alias: 'controller.history',
    views: ['westtoolbar.westToolBarSub01Class','westtoolbar.westToolBarSub02Class'],
    curruntHistIndex: '0',
    init: function(){
        console.log('Initialized LitePlus History Controller');
        this.control({
            'westtoolbarsub02 button[itemId=next], westtoolbarsub01 button[itemId=previous]' : { //정확하게 지정
                click: this.onPrevNextClick
            },
            'westtoolbarsub02 button[itemId=history]' : {
                click: this.onHistoryClick
            }
        });
    },

    onPrevNextClick: function(button, e, eOpts){
        var sqltextarea = Ext.ComponentQuery.query('textarea[name=sqltextarea]')[0];

        // 웹소켓으로 SQL문 메시지를 보낸다
        var clientMessage = new Object();
        clientMessage.messageType = "history";
        clientMessage.sqltext = this.curruntHistIndex;
        if( button.itemId == 'next' ) {
            console.log('Next button click');
            clientMessage.direction = 'next';
        } else if( button.itemId == 'previous' ) {
            console.log('Previous button click');
            clientMessage.direction = 'previous';
        }

        var clientMessage = JSON.stringify(clientMessage);
        console.log(clientMessage);
        mywebsocket.send (clientMessage);
    },

    onResult : function(message) {
        var sqltextarea = Ext.ComponentQuery.query('textarea[name=sqltextarea]')[0];
        var jsonResult = Ext.JSON.decode(message);
        var success = jsonResult.success;
        var jsonResultSet = jsonResult.resultsethistory;
        console.log(success);
        var textareaEl = sqltextarea.inputEl.dom;
        if(jsonResultSet[0].ID=='') return false; // 아무 값도 못받으면 아무처리도 안한다.
        var sqlController = Plus.app.getController('Query');
        var selectedText = sqlController.getSelectedText(sqltextarea); //선택된값을 가져온다.
        var selectionStart = $(textareaEl).getCursorPosition(); // 입력 후 정확히 선택하기 위해
        var doublenewline = '';
        if(selectedText !='') {  // 선택된 셀렉션값이 있으면, SQL문을 선택된값으로 수정한다.
            //doublenewline = '\n';
            //selectionStart += 1;
        }else { //선택된 값이 없으면, SQL문장 뒤로 커서를 이동해서 insert한다.
            selectionStart = this.getHistoryInsertPosition(sqltextarea);
            $(textareaEl).setCursorPosition(selectionStart);
            doublenewline = '\n\n';
            selectionStart += 2;
        }

        $(textareaEl).insertAtCursor(doublenewline+'-- '+jsonResultSet[0].ID+' run at '+jsonResultSet[0].LASTRUN+'\n\n'+
        jsonResultSet[0].SQLSTMT+'\n');
        var selectionEnd = $(textareaEl).getCursorPosition();
        $(textareaEl).setSelection(selectionStart, selectionEnd);
        this.curruntHistIndex = jsonResultSet[0].ID;
    },

    getHistoryInsertPosition: function(sqltextarea) {
        // 셀렉션이 없으면 커서위치로 위아래의 빈줄로 나뉘어진 문장을 동적 Selection해야함. 빈줄이 없으면 전체문장으로 동적 Selection
        //커서위치 다음행+다음행...공백행이 나올때까지. 이전행+이전행+공백행이 나올때까지.
        //선택을 공백행 다음행부터 다음공백행 전까지를 선택해서 Format SQL문을 삽입한다.
        var textareaEl = sqltextarea.inputEl.dom;
        var textLines = textareaEl.value.substr(0, textareaEl.selectionStart).split("\n"); //커서까지 잘라서 각 행을 배열에 넣음
        var textTotalLines = textareaEl.value.split("\n"); //전체를 각 행별로 배열에 넣음
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

        // calculate start/end
        var startPos = 0, endPos = textareaEl.value.length;
        var startLineNum = startLine-1; // array starts at 0
        var endLineNum = endLine-1; // array starts at 0
        var lines = textareaEl.value.split("\n");
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

        return endPos;
    },

    onHistoryClick: function(button, e, eOpts){
        console.log('Get Sql from History button click');
        var clientMessage = new Object();
        clientMessage.messageType = "historygrid";
        clientMessage.sqltext=""; //원래없어도 되지만, 다른 호출함수와 일관성을 맞추기 위해서 서버에서 처리하도록 설정
        //clientMessage.sqltext = this.curruntHistIndex;

        var clientMessage = JSON.stringify(clientMessage);
        console.log(clientMessage);
        mywebsocket.send (clientMessage);
    },

    onHistGridResult: function(message) {
        this.historypopup = Ext.create('Plus.view.popup.History',{
        });
        var historypopupgrid = Ext.ComponentQuery.query('historygrid[name=historygrid]')[0];
        var sqlController = Plus.app.getController('Query');
        //jsonResultSet = '[{"id": "tablespace","datetime": "users","sql": "users"},{"id": "tablespace","datetime": "users","sql": "users"}]'; //문자열이 아닌 객체를 넣어야 함
        //var resultArray = new Array();
        //var rowInfo = new Object();
        //rowInfo.id = "test";
        //rowInfo.datetime="test";
        //rowInfo.sql ="test";
        //resultArray.push(rowInfo);
        var jsonResult = Ext.JSON.decode(message); // Json 스트링으로 받은 값을 Json객체로 바꾼다
        var resultArray = jsonResult.resultsethistorygrid; // object의 array가 들어있다. string의 array가 아님
        console.log(resultArray);
        historypopupgrid.reconfigure(sqlController.createStore(resultArray)); // createStore함수에는 객체의 배열을 넣으면 됨
        this.historypopup.show(); //textfield focus
    }
});