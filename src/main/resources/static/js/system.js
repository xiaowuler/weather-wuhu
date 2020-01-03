var App = function () {
    this.EditIndex  = undefined;
    this.UserTable = $('#system-table');

    this.Startup = function () {
        this.SetFooter();
        this.InitDepartmentCombobox('#department');
        this.InitDepartmentCombobox('#add-department');
        this.InitDepartmentCombobox('#edit-department');
        this.InitUsernameCombobox();
        this.GetCurrentLoginName();
        this.InitUserInformationGrid();
        this.ReloadTable();
        $('.operate-add').on('click', this.ShowAddDialog.bind(this));
        $('.operate-edit').on('click', this.ShowEditDialog.bind(this));
        $('.operate-delete').on('click', this.ShowDeleteDialog.bind(this));
        $('.operate-reset').on('click', this.ShowResetDialog.bind(this));
        $('.btn-cancel').on('click', this.HideDialog.bind(this));
        $('.close-dialog-box').on('click', this.HideDialog.bind(this));
        $('#add-sure').on('click', this.OnAddSureButtonClick.bind(this));
        $('#edit-sure').on('click', this.OnEditSureButtonClick.bind(this));
        $('#delete-sure').on('click', this.OnDeleteSureButtonClick.bind(this));
        $('#reset-sure').on('click', this.OnResetSureButtonClick.bind(this));
        window.onresize = this.SetFooter.bind(this);
    };

    this.SetFooter = function () {
        var height = $(window).height();
        if ((height - 113) > $('.box').height())
            $('.foot').addClass('foot-post');
        else
            $('.foot').removeClass('foot-post');
    };

    this.InitDepartmentCombobox = function (id) {
        $.ajax({
            type: "POST",
            dataType: 'json',
            async: false,
            url: '/Department/getAllDepartment',
            success: function (data) {
                var newData = [];
                newData.push({ "departId": 0, "departName": "全部" });

                for (var i = 0; i < data.length; i++) {
                    newData.push({ "departId": data[i].departId, "departName": data[i].departName });
                }

                $(id).combobox({
                    panelHeight: 300,
                    valueField: 'departId',
                    textField: 'departName',
                    data: newData,
                    editable: false,
                    onLoadSuccess: function (result) {
                        var item = $(id).combobox('getData');
                        if (item.length > 0)
                            $(id).combobox('select', result[0].departName);
                    }
                });
            }.bind(this)
        });
    };

    this.InitUsernameCombobox = function () {
        $('#username').combobox({
            panelHeight: 300,
            editable: false,
            valueField:'departId',
            textField:'departName',
            onLoadSuccess: function (data) {
                console.log(data)
            }.bind(this)
        });
    };

    this.GetCurrentLoginName = function () {
        $.ajax({
            type: 'post',
            url: "/User/getCurrentLoginName",
            success: function (result) {
                $('#login-name').text(result);
            }
        });
    };

    this.ReloadTable = function () {
        this.UserTable.datagrid({
            method: "POST",
            url: 'User/getUserByPage'
        });
    };

    this.InitUserInformationGrid = function () {
        this.UserTable.datagrid({
            striped: true,
            singleSelect: true,
            fitColumns: true,
            fit: true,
            scrollbarSize: 0,
            pagination: true,
            pageNumber: 1,
            pageSize: 10,
            pageList: [10, 20, 30],
            loadMsg: 0,
            columns: [[
                { field: 'loginName', title: '登录名', width: 240, align: 'center'},
                { field: 'name', title: '姓名', width: 240, align: 'center'},
                { field: 'departmentName', title: '单位', width: 240, align: 'center'},
                { field: 'state', title: '审核结果', width: 240, align: 'center', formatter: this.ResetState.bind(this)}
            ]],
            onBeforeLoad: this.OnUserTableGridBeforeLoad.bind(this),
            onClickRow: this.OnClickRow.bind(this),
            onLoadSuccess: function (data) {
                console.log(data);
                this.UserTable.datagrid('selectRow', 0);
            }.bind(this)
        });
    };

    this.OnUserTableGridBeforeLoad = function () {
        this.UserTable.datagrid('getPager').pagination({
            beforePageText: '第',
            afterPageText: '页&nbsp;&nbsp;&nbsp;共{pages}页',
            displayMsg: '当前显示{from}-{to}条记录&nbsp;&nbsp;&nbsp;共{total}条记录',
            layout: ['list', 'sep', 'first', 'prev', 'sep', 'manual', 'sep', 'next', 'last', 'sep', 'refresh', 'info']
        });
    };

    this.OnClickRow = function (index) {
        var editIndex = this.EditIndex;
        if (editIndex !== index){
            if (this.EndEditing()){
                this.UserTable.datagrid('selectRow', index)
                    .datagrid('beginEdit', index);
                editIndex = index;
            } else {
                this.UserTable.datagrid('selectRow', editIndex);
            }
        }
    };

    this.EndEditing = function () {
        var editIndex = this.EditIndex;
        if (editIndex === undefined)
            return true;

        if (this.UserTable.datagrid('validateRow', editIndex)){
            this.UserTable.datagrid('endEdit',editIndex);
            editIndex = undefined;
            return true;
        } else {
            return false;
        }
    };

    this.ResetState = function (value, row, index) {
        if (value === 1)
            return '<img src="../images/success.png" style="margin-top:3px;">';
        else
            return '<img src="../images/fail.png" style="margin-top:3px;">';
    };

    this.ShowAddDialog = function () {
        $('.add-dialog').show();
        $(".bg").show();

        $('#login-account').val('');
        $('#password').val('');
        $('#add-name').val('');
        $('#add-department').combobox("setValue", '全部');
    };

    this.ShowEditDialog = function () {
        $('.edit-dialog').show();
        $(".bg").show();
        var selected = $('#system-table').datagrid('getSelected');
        console.log(selected);
        $('#edit-name').val(selected.name);
        $('#edit-department').combobox("setValue", selected.departmentName);
    };

    this.ShowDeleteDialog = function () {
        $('.delete-dialog').show();
        $(".bg").show();

        var selected = $('#system-table').datagrid('getSelected');
        $('#name').text(selected.name);
    };

    this.ShowResetDialog = function () {
        $('.reset-dialog').show();
        $(".bg").show();
    };

    this.HideDialog = function (event) {
        $(event.target).parent().parent().hide();
        $(".bg").hide();
    };

    this.ShowPromptMessage = function () {
        $(".message").text('操作成功~').fadeIn();
        setTimeout(function(){
            $(".message").fadeOut();
        },1500);
    };

    this.OnAddSureButtonClick = function (event) {
        $(event.target).parent().parent().hide();
        $(".bg").hide();

        $.ajax({
            type: "POST",
            dataType: 'json',
            data: this.GetAddParams(),
            url: 'User/insertOne',
            success: function () {
                this.ReloadTable();
                this.ShowPromptMessage();
            }.bind(this)
        });
    };

    this.OnEditSureButtonClick = function (event) {
        $(event.target).parent().parent().hide();
        $(".bg").hide();

        var row = this.UserTable.datagrid('getSelected');
        $.ajax({
            type: "POST",
            dataType: 'json',
            data: {
                userId: row.id,
                departmentName: $('#edit-department').combobox('getText')
            },
            url: 'User/updateDepartmentIdById',
            success: function () {
                this.ReloadTable();
                this.ShowPromptMessage();
            }.bind(this)
        });
    };

    this.OnDeleteSureButtonClick = function (event) {
        $(event.target).parent().parent().hide();
        $(".bg").hide();

        var row = this.UserTable.datagrid('getSelected');
        $.ajax({
            type: "POST",
            dataType: 'json',
            data: {
                userId: row.id
            },
            url: 'User/deleteOneById',
            success: function () {
                this.ReloadTable();
                this.ShowPromptMessage();
            }.bind(this)
        });
    };

    this.OnResetSureButtonClick = function (event) {
        var selected = this.UserTable.datagrid('getSelected');
        var password = $("#password-one").val();
        var confirmPassword = $("#password-two").val();
        if (password !== confirmPassword){
            alert("两次输入的密码必须一致");
            return;
        }

        $(event.target).parent().parent().hide();
        $(".bg").hide();

        $.ajax({
            type: "POST",
            dataType: 'json',
            data: {
                userId: selected.id,
                password: $('#password-two').val()
            },
            url: 'User/updatePasswordById',
            success: function () {
                this.ReloadTable();
                this.ShowPromptMessage();
            }.bind(this)
        });
    };

    this.GetAddParams = function () {
        return{
            loginName: $('#login-account').val(),
            loginPwd: $('#password').val(),
            name: $('#add-name').val(),
            departName: $('#add-department').combobox('getText')
        }
    };
};

$(document).ready(function () {
    var app = new App();
    app.Startup();
});