/**
 * Created by hun on 2016-09-13.
 */
Ext.define('Plus.controller.Query',{
    extend: 'Ext.app.Controller',
    alias: 'controller.query',
    views: ['bottom.GridResult'],
    sqlindex: 0,
    init: function(){
        console.log('Initialized QueryS Controller');
        this.control({
            'westtoolbarsub01 #query' : {  // 툴바에 itemId: 'query',로 설정한 경우, 사용
                click: this.onQueryClick
            },
            'centertextarea' : {
                //specialkey: this.onKeyDown,
                keydown: this.onKeyDown,   // F7 쿼리키 핸들링
                keyup: this.onChangeLabel,   // 위치이동 시 위치 표시
                click: this.onChangeLabel    // 마우스클릭시 위치 표시
            }
        });
    },

    onResult : function(message) {
        var gridResult = Ext.ComponentQuery.query('gridresult[name=gridsqlqueryresult]')[0];
        //console.log(resp.responseText);

        var jsonResult = Ext.JSON.decode(message);

        var success = jsonResult.success;
        var firstRowTime = jsonResult.FirstRowTime;
        var jsonResultSet = jsonResult.resultset;
        console.log(success);
        console.log(firstRowTime);

        gridResult.reconfigure(this.createStore(jsonResultSet), this.createColumns(jsonResultSet));
        var queryResultLabel = Ext.ComponentQuery.query('label[name=queryresultlabelname]')[0];

        if(success) {  // 쿼리실행이 정상적인 경우
            queryResultLabel.setText(firstRowTime);
            //console.log(queryResultLabel.text);
        } else {  // 쿼리실행시 Exception이 발생한 경우
            queryResultLabel.setText(firstRowTime);
            //Ext.MessageBox.alert("sql Error: " , jsonResultSet);
        }
    },

    getKeysFromJson : function (obj) {
        var keys = [];
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                keys.push(key);
            }
        }
        return keys;
    },

    createStore : function (json) {  // json에 json객체의 배열이 들어감
        var keys = this.getKeysFromJson(json[0]); // 0번째 행의 Json객체
        //console.log(keys);    // 컬럼명(필드명)을 뽑아낸다. 스토어의 fields property를 셋팅하기 위함임
        return Ext.create('Ext.data.Store', {
            fields: keys,
            data: json     // 데이터는 json객체 배열을 그대로 넣었음
        });
    },

     createColumns : function (json) {
        var keys = this.getKeysFromJson(json[0]);
        //var keys2 = keys.pop(); // 이상하게 id값이 컬럼에 추가가 되는 버그가 있는데, 임시로 그냥 단순히 마지막값을 삭제 처리함
        //console.log(keys);
        return keys.map(function (field) {
            return {
                text: Ext.String.capitalize(field),
                //width: 150,
                dataIndex: field
            };
        });
    },

    onQueryClick: function(button, e, eOpts){
        console.log('Query Button clicked');

        var sqltextarea = Ext.ComponentQuery.query('textarea[name=sqltextarea]')[0];
        var selectedText = this.getSelectedText(sqltextarea); //선택된값을 가져온다.
        //console.log('selected Text: '+selectedText);

        var sqltext ;
        if(selectedText!='') {   // 선택된 셀렉션값이 있으면, SQL문을 선택된값으로 수정한다.
            sqltext = selectedText;
            $(sqltextarea.inputEl.dom).setSelection(this.input.selectionStart, this.input.selectionEnd) //현재 선택을 유지한다
        } else {   // 선택된 것이 없으면, SQL 자동 선택
            var currentPos = $(sqltextarea.inputEl.dom).getCursorPosition();
            sqltext = Plus.app.getController('Format').getAutoLinesSelection(sqltextarea);
            $(sqltextarea.inputEl.dom).setCursorPosition(currentPos); //현재위치에 가져다 놓는다
        }
        console.log('sqltext: '+sqltext);

        var tabs = Ext.ComponentQuery.query('sqltabpanel[name=sqltabpanel]')[0];
        var items = tabs.items.items;
        tabs.setActiveTab(items[0].id); // 쿼리결과 Tab에 위치시킨다

        //서버에 실행할 SQL을 보내기 전에 Web Storage에 실행한 SQL을 일시,SQL문을 저장한다.->서버저장으로 함
        //var strNow = this.getTimeStamp();
        //console.log('datatime: '+strNow);
        //this.sqlindex += 1;
        //$.jStorage.set('_internal|'+strNow+'#'+this.sqlindex, sqltext);

        // 웹소켓으로 SQL문 메시지를 보낸다
        var clientMessage = new Object();
        clientMessage.messageType = "query";
        clientMessage.sqltext = sqltext;
        var clientMessage = JSON.stringify(clientMessage);
        console.log(clientMessage);
        mywebsocket.send(clientMessage);
    },

    onKeyDown: function(textarea, e, eOpts){
        //console.log('key down');
        //if(e.getCharCode()==Ext.event.Event.F7){ // Ext5 Style
        if(e.getCharCode()==Ext.EventObject.F7){ // Ext5 Style
            console.log('F7 key down');
            this.onQueryClick();
        }
    },

    onChangeLabel: function(textarea, e, eOpts){
        var nRowLabel = Ext.ComponentQuery.query('label[name=nrowlabel]')[0]; //하단라벨:행
        var nColLabel = Ext.ComponentQuery.query('label[name=ncollabel]')[0]; //하단라벨:열
        var nLineCol = this.getLineNumberAndColumnIndex(textarea.inputEl.dom);
        var nRow = nLineCol.line;
        var nCol = nLineCol.col;
        //var nRow = this.caretPosY(textarea.inputEl.dom);
        //var nCol = this.caretPosX(textarea.inputEl.dom);
        //console.log('lineNumber: '+nRow);
        nRowLabel.setText('Line '+nRow);
        //console.log('caretPosition: '+nCol);
        nColLabel.setText('Col '+nCol);
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
        //var currentColumnIndex = $(textarea).getCursorPosition();
        //console.log("Current Line Number "+ currentLineNumber+" Current Column Index "+currentColumnIndex );
        var nLineCol = new Object();
        nLineCol.line = currentLineNumber;
        nLineCol.col = currentColumnIndex;
        return nLineCol;
    }

    //getTimeStamp : function() {
    //var d = new Date();
    //
    //var s =
    //    this.leadingZeros(d.getFullYear(), 4) + '-' +
    //    this.leadingZeros(d.getMonth() + 1, 2) + '-' +
    //    this.leadingZeros(d.getDate(), 2) + ' ' +
    //
    //    this.leadingZeros(d.getHours(), 2) + ':' +
    //    this.leadingZeros(d.getMinutes(), 2) + ':' +
    //    this.leadingZeros(d.getSeconds(), 2);
    //
    //return s;
    //},
    //
    //leadingZeros : function(n, digits) {
    //    var zero = '';
    //    n = n.toString();
    //
    //    if (n.length < digits) {
    //        for (i = 0; i < digits - n.length; i++)
    //            zero += '0';
    //    }
    //    return zero + n;
    //}
});