/**
 * Created by win on 2016-10-09.
 */
Ext.define('Plus.controller.Batch',{
    extend: 'Ext.app.Controller',
    alias: 'controller.batch',
    views: ['bottom.BatchOutput'],
    arraySqls: '',
    batchResults: '',
    init: function(){
        console.log('Initialized QueryS Controller');
        this.control({
            'westtoolbarsub02 #batch' : {  // 툴바에 itemId: 'batch',로 설정한 경우, 사용
                click: this.onBatchClick
            },
            'centertextarea' : {
                keydown: this.onKeyDown,   // F6 쿼리키 핸들링
            }
        });
    },

    onBatchClick: function(button, e, eOpts) {
        console.log('Batch Run Button clicked');
        this.batchResults='';

        var sqltextarea = Ext.ComponentQuery.query('textarea[name=sqltextarea]')[0];
        var selectedText = this.getSelectedText(sqltextarea); //선택된값을 가져온다.
        //선택된 값이 없으면, 빈칸으로 구분된 것을 선택값으로 본다.
        var sqltext;
        if (selectedText != '') {   // 선택된 셀렉션값이 있으면, SQL문을 선택된값으로 수정한다.
            sqltext = selectedText;
            $(sqltextarea.inputEl.dom).setSelection(this.input.selectionStart, this.input.selectionEnd) //현재 선택을 유지한다
        } else {   // 선택된 것이 없으면, SQL 자동 선택
            var currentPos = $(sqltextarea.inputEl.dom).getCursorPosition();
            sqltext = Plus.app.getController('Format').getAutoLinesSelection(sqltextarea); //빈줄을 기준으로 커서위치를 선택한다.
            $(sqltextarea.inputEl.dom).setCursorPosition(currentPos); //현재위치에 가져다 놓는다
        }
        console.log('sqltext: ' + sqltext);

        // SQL문은 각각 처리해야 한다. 아래 기준으로 SQL문을 개별로 선택한다.
        // (1) 행의 마지막 글자가 세미콜론인 경우
        // 세미콜론 기준으로 배열에 입력한다.
        var re = /;/;
        var arraySqltext = sqltext.split(re);
        //console.log('regular expression: '+myArray[0] );
        for(var i=0; i < arraySqltext.length ; i++) {
            if (arraySqltext[i].replace(/\s/gi, '') == '') {
                arraySqltext.splice(i, 1);      //공백으로 분리된 것은 제외
                continue;
            }
            arraySqltext[i] = arraySqltext[i].replace(/^\s+/g, '');
        }
        this.arraySqls = arraySqltext;

        var tabs = Ext.ComponentQuery.query('sqltabpanel[name=sqltabpanel]')[0];
        var items = tabs.items.items;
        tabs.setActiveTab(items[2].id); // Batch결과 Tab에 위치시킨다

        // 웹소켓으로 SQL문 메시지를 보낸다
        var clientMessage = new Object();
        clientMessage.messageType = "batch";
        var clientMessageJsonString;
        for(var i=0; i < arraySqltext.length ; i++) {
            console.log("batchsql: "+arraySqltext[i]);
            clientMessage.sqltext = arraySqltext[i];
            clientMessage.sqlindex = i;  // 메시지 수신 시 어떤 SQL배치문을 수행한 결과인지를 확인하기 위한 인덱스
            clientMessageJsonString = JSON.stringify(clientMessage);
            console.log(clientMessageJsonString);
            mywebsocket.send(clientMessageJsonString);
        }
    },

    onResult : function(message) {
        var batchOutput = Ext.ComponentQuery.query('batchoutput[name=batchoutput]')[0];
        var jsonResult = Ext.JSON.decode(message); //json스트링을 json Object로 바꾼다

        var success = jsonResult.success;
        var firstRowTime = jsonResult.FirstRowTime;
        var jsonResultSet = jsonResult.resultset; // object의 array가 들어있다. string의 array가 아님 -> 단순 TEXT가 들어있음.
        var sqlindex = jsonResult.sqlindex;
        console.log(success);
        console.log(firstRowTime);

        var queryResultLabel = Ext.ComponentQuery.query('label[name=queryresultlabelname]')[0];
        queryResultLabel.setText(firstRowTime);

        // 배치 결과를 출력
        var batchResult = 'SQL> '+this.arraySqls[sqlindex] + ';\n\n\n' + jsonResultSet +'\n\n\\n';
        this.batchResults = this.batchResults + batchResult;
        batchOutput.setValue(this.batchResults);
        batchOutput.setFieldStyle({'background': '#000000', 'font-family': 'monospace', fontSize:'12px', color:'white', 'white-space': 'pre', 'overflow-x': 'auto'});
    },

    onKeyDown: function(textarea, e, eOpts){
        if(e.getCharCode()==Ext.EventObject.F6){ // Ext5 Style
            console.log('F6 key down');
            this.onBatchClick();
        }
    },

    // Textarea에서 셀렉션값 가져오는 함수
    getSelectedText: function(inputTextArea){
        var selectedText;
        this.input = inputTextArea.inputEl.dom;
        if (document.selection && document.selection.createRange) {  // IE브라우저
            this.input.selection = document.selection.createRange();
            selectedText = this.input.selection.text;
        } else if (typeof this.input.selectionStart === 'number') {    // IE가 아닌 브라우저
            selectedText = this.input.value.substring(this.input.selectionStart, this.input.selectionEnd);
        }
        return selectedText;
    },

    getLineNumberAndColumnIndex: function(textareaEl){
        var textLines = textareaEl.value.substr(0, textareaEl.selectionStart).split("\n");
        var currentLineNumber = textLines.length;
        var currentColumnIndex = textLines[textLines.length-1].length+1;
        var nLineCol = new Object();
        nLineCol.line = currentLineNumber;
        nLineCol.col = currentColumnIndex;
        return nLineCol;
    }
});