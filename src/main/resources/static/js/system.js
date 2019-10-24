var App = function () {
    this.editIndex  = undefined;
    this.table = $('#system-table');
    this.Startup = function () {
        this.InitPortGrid();
        this.ReloadData();
        this.Reload();
        $('.sign-content .remove').on('click', this.RemoveInputValue.bind(this));
        $('.cancel').on('click', this.HideDialog.bind(this));
        $('.btn-cancel').on('click', this.HideDialog.bind(this));
        $('.btn-sure').on('click', this.OnSureButtonClick.bind(this));
    };

    this.Reload = function () {
        $.ajax({
            type: "POST",
            dataType: 'json',
            url: 'Department/findAll',
            success: function (result) {
                console.log(result);
            }.bind(this)
        });
    };

    this.ReloadData = function () {
        this.table.datagrid({
            method: "POST",
            url: 'User/getUserByPage',
            onLoadSuccess: function (row) {
                console.log(row)
            }
        });
    };

    this.InitPortGrid = function () {
        this.table.datagrid({
            striped: true,
            singleSelect: true,
            scrollbarSize: 0,
            pagination: true,
            pageNumber: 1,
            pageSize: 10,
            pageList: [10, 20, 30],
            loadMsg: '正在加载数据，请稍后...',
            columns: [[
                { field: 'loginName', title: '用户名', width: 240, align: 'center'},
                { field: 'name', title: '姓名', width: 240, align: 'center'},
                { field: 'departName', title: '单位', width: 240, align: 'center', formatter: this.SetComboBox.bind(this),
                    editor:{
                        type:'combobox',
                        options:{
                            valueField:'departId',
                            textField:'departName',
                            url:'Department/findAll',
                            required:true,
                            editable:false
                        }
                    }
                },
                { field: 'loginPwdd', title: '重置密码', width: 240, align: 'center', formatter: this.GetResetPasswordButton.bind(this)},
                { field: 'saved', title: '保存修改', width: 238, align: 'center', formatter: this.GetSaveButton.bind(this)}
            ]],
            onBeforeLoad: this.OnTableGridBeforeLoad.bind(this),
            onClickRow: this.OnClickRow.bind(this)
        });
    };

    this.OnClickRow = function (index) {
        var editIndex = this.editIndex;
        if (editIndex !== index){
            if (this.EndEditing()){
                this.table.datagrid('selectRow', index)
                    .datagrid('beginEdit', index);
                editIndex = index;
            } else {
                this.table.datagrid('selectRow', editIndex);
            }
        }
    };

    this.EndEditing = function () {
        var editIndex = this.editIndex;
        if (editIndex === undefined){return true}
        if (this.table.datagrid('validateRow', editIndex)){
            this.table.datagrid('endEdit',editIndex);
            editIndex = undefined;
            return true;
        } else {
            return false;
        }
    };

    this.OnTableGridBeforeLoad = function () {
        this.table.datagrid('getPager').pagination({
            beforePageText: '第',
            afterPageText: '页&nbsp;&nbsp;&nbsp;共{pages}页',
            displayMsg: '当前显示{from}-{to}条记录&nbsp;&nbsp;&nbsp;共{total}条记录',
            layout: ['list', 'sep', 'first', 'prev', 'sep', 'manual', 'sep', 'next', 'last', 'sep', 'refresh', 'info']
        });
    };

    this.GetResetPasswordButton = function (value, row, index) {
        return '<a class="system-btn reset" href="javascript:void(0)" onclick="ResetPasswordDialog(\''+index+'\')">重置</a>';
    };

    ResetPasswordDialog = function(index) {
        $('#system-table').datagrid('selectRow',index);
        var row = $('#system-table').datagrid('getSelected');
        if (row){
            $('.message').show();
            $('.bg').show();

            var selected = $('#system-table').datagrid('getSelected');
            $('#password').attr("value",selected.loginPwd);
            $('#rePassword').attr("value",selected.loginPwd);
        }
    };

    this.GetSaveButton = function (value, row, index) {
        return '<a class="system-btn save" href="javascript:void(0)" onclick="SaveDialog(\''+index+'\')">保存</a>';
    };

    SaveDialog = function (index) {
        $('#system-table').datagrid('selectRow',index);
        var row = $('#system-table').datagrid('getSelected');
        if (row){
            $(".dialog-save").show();
            setTimeout(function(){
                $(".dialog-save").hide();
            },2000);

            var selected = this.table.datagrid('getSelected');
            console.log(selected);
            $.ajax({
                type: "POST",
                dataType: 'json',
                data: {
                    userId: selected.id,
                    departId: selected.departId
                },
                url: 'User/updateAll',
                success: function (result) {
                }.bind(this)
            });
        }
    };

    this.SetComboBox = function (val,row) {
        return row.departName;
    };

    this.RemoveInputValue = function (event) {
        $(event.target).prev().val('');
    };

    this.HideDialog = function () {
        $(".message").hide();
        $(".bg").hide();
    };

    this.OnSureButtonClick = function () {
        var selected = this.table.datagrid('getSelected');

        this.HideDialog();
        $(".dialog-reset").show();
        setTimeout(function(){
            $(".dialog-reset").hide();
        },1500);

        $.ajax({
            type: "POST",
            dataType: 'json',
            data: {
                userId: selected.id,
                password: $('#password').val()
            },
            url: 'User/updatePassword',
            success: function (result) {
                this.ReloadData();
            }.bind(this)
        });
    }
};
$(document).ready(function () {
    var app = new App();
    app.Startup();
});