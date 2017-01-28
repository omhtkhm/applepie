/**
 * Created by hun on 2016-09-02.
 */
//Ext.require('Ext.EventObject.*');

Ext.define('Plus.view.textarea.centerTextAreaClass', {
    extend : 'Ext.form.field.TextArea',
    //extend : 'Ext.field.TextArea',  //6.0스타일
    alias: 'widget.centertextarea',

    name: 'sqltextarea',
    value: 'SELECT * from \n scott.emp, \n dept \n where emp.deptno=dept.deptno; \n\n' +
            'SELECT SUM(SAL), SUM(COMM), SUM(SAL + NVL(COMM,0)) \n' +
            '"TOTAL MONTHLY EXPENSES OF", DEPTNO "DEPARTMENT" \n' +
            'FROM emp GROUP BY DEPTNO \n' +
            'HAVING SUM(SAL + NVL(COMM,0)) > 10000; \n\n' +
            'select * from \nall_tables; \n\n' +
        'SELECT ENAME, DNAME, GRADE \n'+
        'FROM EMP A, DEPT B, \n'+
        'SALGRADE C \n'+
        'WHERE A.DEPTNO = B.DEPTNO \n'+
        'AND SAL >= LOSAL AND SAL <= HISAL \n'+
        'AND SAL > (SELECT AVG(SAL) FROM EMP); ',
    enableKeyEvents: true,
    cls: 'textarea',

    // extjs testarea는 click 이벤트가 안 먹어서 수동으로 click을 먹도록 textarea의 dom객체에 직접 이벤트 처리를 붙임
    initComponent: function() {
        var me = this;
        this.callParent(arguments);
        this.addEvents('click');
        this.on('render', function(){
            this.getEl().on('click', this.onClick, this) ;
        });
        this.on('destroy', function(){
            if(this.rendered){
                this.getEl().un('click', this.onClick, this);
            }
        });
    },

    onClick: function(e) {
        if (this.handler) {
            this.handler.call(this.scope || this, this, e);
        }
        this.fireEvent('click', this, e);
    },

    setHandler: function(handler, scope) {
        this.handler = handler;
        this.scope = scope;
        return this;
    },

    afterRender: function() {
        this.focus();
    }
});