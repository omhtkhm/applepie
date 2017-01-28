/**
 * Created by hun on 2016-09-12.
 */
Ext.define('Plus.controller.Desc',{
    extend: 'Ext.app.Controller',
    alias: 'controller.desc',

    views: ['main.Desc'],
    tablename : '',
    init: function(){
        console.log('Initialized LitePlus Controller');
        this.control({
            'westtoolbarsub02 #tableinfo' : {
                click: this.onTableInfoClick
            },
            'centertextarea' : {
                keydown: this.onKeyDown
            }
        });
    },

    onTableInfoClick: function(button, e, eOpts){
        console.log('TableInfo button click');
        //var sqltextarea = Ext.ComponentQuery.query('textarea[name=sqltextarea]')[0];
        //var tablename = this.getTableFromLine(sqltextarea); //테이블명을 뽑음
        var sqltextarea = Ext.ComponentQuery.query('textarea[name=sqltextarea]')[0];
        var sqlController = Plus.app.getController('Query');
        var selectedText = sqlController.getSelectedText(sqltextarea); //선택된값을 가져온다.
        var tablename;
        if(selectedText!='') {   // 선택된 셀렉션값이 있으면, SQL문을 선택된값으로 수정한다.
            tablename = selectedText;
            $(sqltextarea.inputEl.dom).setSelection(sqlController.input.selectionStart, sqlController.input.selectionEnd) //현재 선택을 유지한다
        } else {   // 선택된 것이 없으면, SQL 자동 선택
            var currentPos = $(sqltextarea.inputEl.dom).getCursorPosition();
            tablename = this.getTableFromLine(sqltextarea);
            $(sqltextarea.inputEl.dom).setCursorPosition(currentPos); //현재위치에 가져다 놓는다
        }
        console.log('table name: '+sqltext);
        var sqltext = tablename; //테이블명
        this.tablename = sqltext.toUpperCase(); // 메시지 수신 시, 탭명으로 활용 예정

        //var tabs = Ext.ComponentQuery.query('mainTab[name=mainTab]')[0];
        ////var items = tabs.items.items;  // 탭패널의 아이템들 중 items라는 항목을 찾는다
        ////tabs.setActiveTab(items[1].id);  // items의 첫번째 항목 중 id 값을 가지고 탭을 활성화 시킨다
        //
        //// 패널을 하나 만들어서 mainTab에다가 붙여넣기
        //var descPanel = Ext.create('Plus.view.main.Desc');
        //var tab = tabs.add(descPanel);
        //descPanel.setTitle(sqltext);
        //tabs.setActiveTab(tab);

        // 웹소켓으로 SQL문 메시지를 보낸다
        var clientMessage = new Object();

        clientMessage.messageType = "tableinfo";
        clientMessage.sqltext = sqltext;
        var clientMessage = JSON.stringify(clientMessage);
        console.log(clientMessage);

        mywebsocket.send (clientMessage);
    },

    onResult : function(message) {
        var jsonResult = Ext.JSON.decode(message);
        var success = jsonResult.success;
        console.log(success);
        if(success == true) {
            // 탭하나 추가해서 desc Panel을 붙여서 보이게 하기
            var tabs = Ext.ComponentQuery.query('mainTab[name=mainTab]')[0];
            var descPanel = Ext.create('Plus.view.main.Desc');
            var tab = tabs.add(descPanel);
            descPanel.setTitle(this.tablename);
            tabs.setActiveTab(tab);

            // 컬럼정보 가져와서 뿌리기
            var columninfos = Ext.ComponentQuery.query('columninfo[name=columninfo]');
            var columninfo = columninfos[columninfos.length-1];
            var jsonResultSetColumnInfo = jsonResult.resultsetcolumninfo;
            columninfo.reconfigure(this.createStore(jsonResultSetColumnInfo), this.createColumns(jsonResultSetColumnInfo));
            // Index정보 가져와서 뿌리기
            var indexinfos = Ext.ComponentQuery.query('index[name=index]');
            var indexinfo = indexinfos[indexinfos.length - 1];
            var jsonResultSetIndexInfo = jsonResult.resultsetindexinfo;
            indexinfo.reconfigure(this.createStore(jsonResultSetIndexInfo), this.createColumns(jsonResultSetIndexInfo));
            // Table기본정보 가져와서 뿌리기
            var tableinfos = Ext.ComponentQuery.query('tableinfo[name=tableinfo]');
            var tableinfo = tableinfos[tableinfos.length - 1];
            var jsonResultSetTableInfo = jsonResult.resultsettableinfo;
            var tableinfotitle = jsonResultSetTableInfo[0].OWNER + '.' + jsonResultSetTableInfo[0].TABLE_NAME;
            console.log(tableinfotitle);
            tableinfo.setTitle(tableinfotitle);
            tableinfo.reconfigure(this.createTransposeStore(jsonResultSetTableInfo), this.createTransposeColumns());
            // Constrait정보 가져와서 뿌리기
            var constraintinfos = Ext.ComponentQuery.query('constraint[name=constraint]');
            var constraintinfo = constraintinfos[constraintinfos.length - 1];
            var jsonResultSetConstraintInfo = jsonResult.resultsetconstraintinfo;
            constraintinfo.reconfigure(this.createStore(jsonResultSetConstraintInfo), this.createColumns(jsonResultSetConstraintInfo));
            // Grants정보 가져와서 뿌리기
            var grantsinfos = Ext.ComponentQuery.query('grants[name=grants]');
            var grantsinfo = grantsinfos[grantsinfos.length - 1];
            var jsonResultSetGrantsInfo = jsonResult.resultsetgrantsinfo;
            grantsinfo.reconfigure(this.createStore(jsonResultSetGrantsInfo), this.createColumns(jsonResultSetGrantsInfo));
            // Trigger정보 가져와서 뿌리기
            var triggerinfos = Ext.ComponentQuery.query('trigger[name=trigger]');
            var triggerinfo = triggerinfos[triggerinfos.length - 1]; // 방금 생성한 마지막 탭의 컴포넌트를 가져온다.
            var jsonResultSetTriggerInfo = jsonResult.resultsettriggerinfo;
            if (jsonResultSetTriggerInfo[0] != null) {
                triggerinfo.setValue(jsonResultSetTriggerInfo[0].TRGSTMT1 + '\n' + jsonResultSetTriggerInfo[0].TRGSTMT2 + '\n\n' + jsonResultSetTriggerInfo[0].TRIGGER_BODY);
            } else {
                triggerinfo.setValue('No trigger defined');
            }
            // DDL정보 가져와서 뿌리기
            var ddlinfos = Ext.ComponentQuery.query('ddl[name=ddl]');
            var ddlinfo = ddlinfos[ddlinfos.length - 1]; // 방금 생성한 마지막 탭의 컴포넌트를 가져온다.
            var jsonResultSetDDLInfo = jsonResult.resultsetddlinfo;
            ddlinfo.setValue(jsonResultSetDDLInfo[0].DDL);
        } else {   // success가 false인경우
            var errorMsg = jsonResult.errormessage;
            Ext.Msg.alert('LitePlus', errorMsg, function (btn) {
                if (btn == 'ok') {
                    Ext.ComponentQuery.query('textarea[name=sqltextarea]')[0].focus();
                }
            });
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

    createTransposeStore : function (json) {  // json에 json객체의 배열이 들어감
        var keys = this.getKeysFromJson(json[0]); // 0번째 행의 Json객체
        //console.log(keys);    // 컬럼명(필드명)을 뽑아낸다. 스토어의 fields property를 셋팅하기 위함임
        return Ext.create('Ext.data.Store', {
            fields: [{name: 'field1', type: 'string'},
                     {name: 'field2',  type: 'string'}],
            //data: [{field1:'key1',field2:'value1'},{field1:'key2',field2:'value2'}]     // 데이터는 [{field1:'key1',field2:'value1'},{field1:'key2',field2:'value2'}]
            data: this.swapJsonKeyValues(json)
        });
    },

    createTransposeColumns : function () {
        return ([{
                text: 'A',
                dataIndex: 'field1'
        },{
            text: 'B',
            dataIndex: 'field2'
        }]);
    },

    swapJsonKeyValues : function (input) {
    //var one, output = {};
    var tableInfoArray = new Array();
    for (one in input[0]) {
        var tableRow = new Object();
        tableRow.field1 = one;
        tableRow.field2 = input[0][one];
        tableInfoArray.push(tableRow);
    }
        return tableInfoArray;
    },

    onKeyDown: function(textarea, e, eOpts){
        //if(e.getCharCode()== (Ext.EventObject.ALT && Ext.EventObject.F5)){
        if(e.altKey && (e.getCharCode() == Ext.EventObject.F5)){
            console.log('Alt+F5 key down');
            this.onTableInfoClick();
        }
    },

    getTableFromLine: function(sqltextaray){
        var textarea = sqltextaray.inputEl.dom;
        var nLineCol = this.getController('Query').getLineNumberAndColumnIndex(textarea); //textarea에서 커서위치 가져오기
        var nRow = nLineCol.line;
        var nCol = nLineCol.col;
        var lines = textarea.value.split('\n');
        var nText = lines[(nRow-1)];
        //console.log(nText);
        var len = nText.length;
        var firstPart=nText.substring(0,nCol);
        var secondPart=nText.substring(nCol,len);
        console.log(firstPart +'|' + secondPart);
        var regExp = /[;,=\s()|&]+/g;
        var arr = firstPart.match(regExp);
        //console.log(arr[arr.length-1]);
        var startIndex =0;
        if(arr!=null) {
            startIndex = firstPart.lastIndexOf(arr[arr.length - 1]) + arr[arr.length - 1].length;
        }
        arr = secondPart.match(regExp);
        var endIndex =len;
        if(arr!=null) {
            var endIndex = firstPart.length + secondPart.indexOf(arr[0]);
        }
        var tablename = nText.substring(startIndex,endIndex);
        //console.log(startIndex+' '+endIndex);
        console.log('Table/View 명칭 : ' +tablename);
        return tablename;
    }
});