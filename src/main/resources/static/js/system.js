var App = function () {
    this.editIndex  = undefined;
    this.table = $('#system-table');

    this.Startup = function () {
        this.InitUserInformationGrid();
        this.ReloadUserInformationData();
        this.ReloadDepartmentData();

        $('.cancel').on('click', this.HideDialog.bind(this));
        $('.button-confirm').on('click', this.OnConfirmButtonClick.bind(this));
        $('.button-cancel').on('click', this.HideDialog.bind(this));
        $('.sign-content .remove').on('click', this.RemoveInputPassword.bind(this));
    };

    this.InitUserInformationGrid = function () {
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
                { field: 'departmentName', title: '单位', width: 240, align: 'center', formatter: this.SetDepartment.bind(this),
                    editor:{
                        type:'combobox',
                        options:{
                            valueField:'departmentId',
                            textField:'departmentName',
                            url:'Department/getAllDepartment',
                            required:true,
                            editable:false
                        }
                    }
                },
                { field: 'loginPwd', title: '重置密码', width: 240, align: 'center', formatter: this.ResetUserPasswordButton.bind(this)},
                { field: 'saved', title: '保存修改', width: 238, align: 'center', formatter: this.OnSaveButtonClick.bind(this)}
            ]],
            onBeforeLoad: this.OnTableGridBeforeLoad.bind(this),
            onClickRow: this.OnClickRow.bind(this)
        });
    };

    this.OnTableGridBeforeLoad = function () {
        this.table.datagrid('getPager').pagination({
            beforePageText: '第',
            afterPageText: '页&nbsp;&nbsp;&nbsp;共{pages}页',
            displayMsg: '当前显示{from}-{to}条记录&nbsp;&nbsp;&nbsp;共{total}条记录',
            layout: ['list', 'sep', 'first', 'prev', 'sep', 'manual', 'sep', 'next', 'last', 'sep', 'refresh', 'info']
        });
    };

    this.ReloadUserInformationData = function () {
        this.table.datagrid({
            method: "POST",
            url: 'User/getUserByPage',
            onLoadSuccess: function (row) {
                console.log(row)
            }
        });
    };

    this.ReloadDepartmentData = function () {
        $.ajax({
            type: "POST",
            dataType: 'json',
            url: 'Department/getAllDepartment',
            success: function (result) {
                console.log(result);
            }.bind(this)
        });
    };

    this.ResetUserPasswordButton = function (value, row, index) {
        return '<a class="system-btn reset" href="javascript:void(0)" onclick= "window.ResetUserPasswordDialog(\''+index+'\')">重置</a>';
    };

    window.ResetUserPasswordDialog = function(index) {
        $('#system-table').datagrid('selectRow',index);
        var row = $('#system-table').datagrid('getSelected');
        if (row){
            $('.message').show();
            $('.bg').show();

            var selected = $('#system-table').datagrid('getSelected');
            $('#password').attr("value",selected.loginPwd);
            $('#confirm-password').attr("value",selected.loginPwd);
        }
    };

    this.OnConfirmButtonClick = function () {
        var selected = this.table.datagrid('getSelected');
        var password = $("#password").val();
        var confirmPassword = $("#confirm-password").val();
        if (password !== confirmPassword){
            alert("两次输入的密码必须一致")
            return;
        }

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
            url: 'User/updatePasswordById',
            success: function (result) {
                this.ReloadUserInformationData();
            }.bind(this)
        });
    }

    this.HideDialog = function () {
        $(".message").hide();
        $(".bg").hide();
    };

    this.RemoveInputPassword = function (event) {
        $(event.target).prev().val('');
    };

    this.SetDepartment = function (val,row) {
        return row.departmentName;
    };

    this.OnSaveButtonClick = function (value, row, index) {
        return '<a class="system-btn save" href="javascript:void(0)" onclick="window.SaveDialog(\''+index+'\')">保存</a>';
    };

    window.SaveDialog = function (index) {
        $('#system-table').datagrid('selectRow',index);
        var row = $('#system-table').datagrid('getSelected');
        if (row){
            $(".dialog-save").show();
            setTimeout(function(){
                $(".dialog-save").hide();
            },2000);

            var selected = $('#system-table').datagrid('getSelected');

            alert(selected.id + "======" + selected.departId)

            $.ajax({
                type: "POST",
                dataType: 'json',
                data: {
                    userId: selected.id,
                    departmentId: selected.departId
                },
                url: 'User/updateDepartmentIdById',
                success: function (result) {
                }.bind(this)
            });
        }
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
        if (editIndex === undefined)
            return true;

        if (this.table.datagrid('validateRow', editIndex)){
            this.table.datagrid('endEdit',editIndex);
            editIndex = undefined;
            return true;
        } else {
            return false;
        }
    };

};
$(document).ready(function () {
    var app = new App();
    app.Startup();
});