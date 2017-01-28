/**
 * Created by hun on 2016-09-27.
 */
Ext.define('Plus.controller.SaveOpen',{
    extend: 'Ext.app.Controller',
    alias: 'controller.saveopen',
    views: ['westtoolbar.westToolBarSub01Class','westtoolbar.westToolBarSub02Class','popup.Save','popup.Load'],

    forward: true,
    casesensitive: false,
    whole: false,

    init: function(){
        console.log('Initialized LitePlus SaveOpen Controller');
        this.control({
            '#save' : {
                click: this.onSaveClick
            },'#saveas' : {
                click: this.onSaveAsClick
            },'#load' : {
                click: this.onLoadClick
            },'#insert' : {
                click: this.onInsertClick
            },'#popsave' : {
                click: this.localStorageSave
            },'#popload' : {
                click: this.localStorageLoad
            },'#find' : {
                click: this.onFindClick
            },'#popfind' : {
                click: this.findText
            },'centertextarea' : {
                keydown: this.onKeyDown
            }
        });
    },

    onSaveClick: function(){
        console.log('Save button click');
        this.saveas = false;
        if(!this.filename) { // 파일명을 저장했으면
            this.savepopup = Ext.create('Plus.view.popup.Save');
            this.savepopup.show();
            Ext.ComponentQuery.query('textfield[name=savename]')[0].focus();
        } else {  // 세션에서 파일명을 한번이라도 지정했으면
            this.localStorageSave();
        }
    },

    localStorageSave: function(){
        console.log('Local Storage pop save clicked!');

        var form = Ext.ComponentQuery.query('form[name=saveform]')[0];
        if(form) { // 팝업이 있는 경우
            if (!form.isValid()) return false; // 빈칸 validation check
        }
        //sessionStorage.setItem('isFileName', 'true'); //세션스토리지에 파일명이 저장되었음을 flag함
        var sqltextaray = Ext.ComponentQuery.query('textarea[name=sqltextarea]')[0];
        var savetext = sqltextaray.getValue();
        //if(this.saveas == true) {
        if((this.saveas == true)|| (!this.filename)) {
            var filenamefield = Ext.ComponentQuery.query('textfield[name=savename]')[0];
            this.filename = filenamefield.getValue(); // 팝업창에서 파일명을 설정했으면 지정, 아니면 필드변수를 그대로 둠
        }
        //}
        console.log(this.filename + ':' + savetext);
        $.jStorage.set(this.filename, savetext);
        this.savepopup.close();
        //console.log(savetext);
    },

    onSaveAsClick: function(){
        console.log('SaveAs button click');
        this.savepopup = Ext.create('Plus.view.popup.Save');
        this.saveas = true;
        this.savepopup.show();
        Ext.ComponentQuery.query('textfield[name=savename]')[0].focus();
    },

    onLoadClick: function(){
        console.log('Load button click');
        this.loadpopup = Ext.create('Plus.view.popup.Load',{
            tempText: this.filename
        });
        this.insert = false; // insert인지 아니면 바꿔치기인지 선택
        console.log(this.filename);
        //this.loadpopup.items.items.value = this.filename;
        console.log(this.loadpopup.items.items);
        this.loadpopup.show();
        Ext.ComponentQuery.query('textfield[name=loadname]')[0].focus();
    },

    localStorageLoad: function(){
        console.log('Local Storage pop load clicked!');
        var form = Ext.ComponentQuery.query('form[name=loadform]')[0];
        if(!form.isValid()) return false; // 빈칸 validation check
        var filenamefield= Ext.ComponentQuery.query('textfield[name=loadname]')[0];
        var filename = filenamefield.getValue();
        this.loadpopup.close();
        var loadtext = $.jStorage.get(filename);
        var sqltextaray = Ext.ComponentQuery.query('textarea[name=sqltextarea]')[0];

        if(this.insert == false) {  // 바꿔치기면
            sqltextaray.setValue(loadtext);
        } else{  // 커서위치에 삽입하는 것이면
            $(sqltextaray.inputEl.dom).insertAtCursor(loadtext);
        }
    },

    onInsertClick: function(){
        console.log('Insert button click');
        this.loadpopup = Ext.create('Plus.view.popup.Load');
        this.insert = true; // insert인지 아니면 바꿔치기인지 선택
        this.loadpopup.show();
        Ext.ComponentQuery.query('textfield[name=loadname]')[0].focus();
    },

    onFindClick: function(){
        console.log('Find button click');
        var store = this.createFindComboStore();
        this.findpopup = Ext.create('Plus.view.popup.Find',{
            tempText: this.findname,
            tempStore: store,
            forward: this.forward,
            casesensitive: this.casesensitive,
            whole: this.whole
        });
        this.findpopup.show(); //textfield focus
        Ext.ComponentQuery.query('combobox[name=findname]')[0].focus();
    },

    findText: function(){
        console.log('pop find clicked!');
        // textarea에서 선택한 내용이 있는지 우선 검사한다.
        var sqltextarea = Ext.ComponentQuery.query('textarea[name=sqltextarea]')[0];
        var sqlController = Plus.app.getController('Query');
        var selectedText = sqlController.getSelectedText(sqltextarea); //선택된값을 가져온다.
        console.log(selectedText);
        // 여기서 부터 find 로직 처리
        var form = Ext.ComponentQuery.query('form[name=findform]')[0];
        if(!form.isValid()) return false; // 빈칸 validation check
        var findnamefield= Ext.ComponentQuery.query('textfield[name=findname]')[0];
        this.findname = findnamefield.getValue();
        // 정방향인지 역방향인지
        var finddirection = Ext.ComponentQuery.query('radiofield[name=finddirection]')[0];
        if(finddirection.getValue()) {this.forward = true;}
        else {this.forward = false;}// 정방향 역방향 셋팅
        // 대소분자 구분인지 아닌지
        var casesens = Ext.ComponentQuery.query('checkboxfield[name=findoptioncase]')[0];
        if(casesens.getValue()) {this.casesensitive = true;}  // 대소문자 구별하도록
        else {this.casesensitive = false;}
        //전체 문자인지 아닌지
        var wholeword = Ext.ComponentQuery.query('checkboxfield[name=findoptionwhole]')[0];
        if(wholeword.getValue()) {this.whole = true;}  // 대소문자 구별하도록
        else {this.whole = false;}

        this.findpopup.close();
        var sqltextarea = Ext.ComponentQuery.query('textarea[name=sqltextarea]')[0];
        var textareaText = sqltextarea.getValue();
        //sqltextarea.setValue(this.findname);
        var currentPos = $(sqltextarea.inputEl.dom).getCursorPosition();
        $(sqltextarea.inputEl.dom).setCursorPosition(currentPos); //현재위치에 가져다 놓는다
        var targetText = textareaText;
        var searchText = this.findname;
        if(!this.casesensitive) { //대소문자 안가리면 대문자 변경
            targetText = textareaText.toUpperCase();
            searchText = this.findname.toUpperCase()
        }
        if(this.whole) { //단어가 같아야 되면
            searchText = ' '+searchText+' ';
        }
        var startIndex;
        if(this.forward) { //정방향
            var searchfrom = currentPos+1;
            if(selectedText!='') searchfrom = currentPos + selectedText.length;
            console.log(searchfrom);
            var startIndex = targetText.indexOf(searchText, searchfrom);
        } else{ //역방향 검샘
            var searchfrom = currentPos-1;
            console.log(searchfrom);
            var startIndex = targetText.lastIndexOf(searchText, searchfrom);
        }
        var queryResultLabel = Ext.ComponentQuery.query('label[name=queryresultlabelname]')[0];
        if(startIndex != -1) { // 찾는 문자가 있는 경우,
            if(this.whole) startIndex = startIndex +1; //단어가 같아야 되면 공백을 포함하였으므로
            var endIndex = startIndex + this.findname.length;

            $(sqltextarea.inputEl.dom).setSelection(startIndex, endIndex);
            console.log(startIndex);
            $(sqltextarea.inputEl.dom).scrollTop(startIndex);

            queryResultLabel.setText('Ready');
        } else{ //찾는 문자가 없는 경우
            queryResultLabel.setText('String Not Found');
        }
    },

    findTextFromShortKey: function(){
        if(!this.findname) return false;
        // textarea에서 선택한 내용이 있는지 우선 검사한다.
        var sqltextarea = Ext.ComponentQuery.query('textarea[name=sqltextarea]')[0];
        var sqlController = Plus.app.getController('Query');
        var selectedText = sqlController.getSelectedText(sqltextarea); //선택된값을 가져온다.
        console.log(selectedText);
        // 여기서부터 find logic 처리
        //var sqltextarea = Ext.ComponentQuery.query('textarea[name=sqltextarea]')[0];
        var textareaText = sqltextarea.getValue();
        var textareaEl = sqltextarea.inputEl.dom;
        //sqltextarea.setValue(this.findname);
        var currentPos = $(textareaEl).getCursorPosition();
        $(textareaEl).setCursorPosition(currentPos); //현재위치에 가져다 놓는다
        var targetText = textareaText;
        var searchText = this.findname;
        if(!this.casesensitive) { //대소문자 안가리면 대문자 변경
            targetText = textareaText.toUpperCase();
            searchText = this.findname.toUpperCase()
        }
        if(this.whole) { //단어가 같아야 되면
            searchText = ' '+searchText+' ';
        }
        var startIndex;
        if(this.forward) { //정방향 selection이 있으면 selection 이후 위치 부터
            var searchfrom = currentPos;
            if(selectedText!='') searchfrom = currentPos + selectedText.length;
            console.log(searchfrom);
            var startIndex = targetText.indexOf(searchText, searchfrom);
        } else{ //역방향 검샘
            var searchfrom = currentPos-1;
            console.log(searchfrom);
            var startIndex = targetText.lastIndexOf(searchText, searchfrom);
        }
        var queryResultLabel = Ext.ComponentQuery.query('label[name=queryresultlabelname]')[0];
        if(startIndex != -1) { // 찾는 문자가 있는 경우,
            if(this.whole) startIndex = startIndex +1; //단어가 같아야 되면 공백을 포함하였으므로
            var endIndex = startIndex + this.findname.length;

            $(textareaEl).setSelection(startIndex, endIndex);
            console.log(startIndex);
            $(textareaEl).scrollTop(startIndex-200);
            //$(textareaEl).scrollTop($(textareaEl).offset().top);

            queryResultLabel.setText('Ready');
        } else{ //찾는 문자가 없는 경우
            queryResultLabel.setText('String Not Found');
        }
    },

    createFindComboStore : function () {
        if(!this.comboJsonArray) this.comboJsonArray = new Array();
        var comboJson = new Object();
        comboJson.name = this.findname;
        this.comboJsonArray.push(comboJson);

        var store =  Ext.create('Ext.data.Store', {
            fields: [
                {type: 'string', name: 'name'}
            ],
            data: this.comboJsonArray
        });
        return store;
    },

    onKeyDown: function(textarea, e, eOpts){
        if(e.ctrlKey && e.altKey && (e.getCharCode() == Ext.EventObject.F)){
            console.log('Ctrl+Alt+F key down');
            e.stopEvent();
            this.onFindClick();//바로호출
            //Ext.ComponentQuery.query('button[name=toolbarfindbtn]')[0].fireEvent('click'); //버튼을 찾아서 click이벤트 발생.
        } else if(e.ctrlKey && e.altKey && (e.getCharCode() == Ext.EventObject.S)){
            console.log('Ctrl+Alt+S key down');
            e.stopEvent();
            this.onSaveClick();
        }else if(e.ctrlKey && e.altKey && (e.getCharCode() == Ext.EventObject.D)){  // 역방향 탐색
            console.log('Ctrl+Alt+D key down');
            e.stopEvent();
            this.forward = false;
            this.findTextFromShortKey();//바로호출
        }else if(e.ctrlKey && e.altKey && (e.getCharCode() == Ext.EventObject.G)){   //정방향 탐색
            console.log('Ctrl+Alt+G key down');
            e.stopEvent();
            this.forward = true;
            this.findTextFromShortKey();//바로호출
        }
    }
});