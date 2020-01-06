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
        $('.audit-state a').on('click', this.OnStateSelectClick.bind(this));
        $('.operate-add').on('click', this.ShowAddDialog.bind(this));
        $('.operate-edit').off('click').on('click', this.ShowEditDialog.bind(this));
        $('.operate-delete').on('click', this.ShowDeleteDialog.bind(this));
        $('.operate-reset').on('click', this.ShowResetDialog.bind(this));
        $('.btn-cancel').on('click', this.HideDialog.bind(this));
        $('.close-dialog-box').on('click', this.HideDialog.bind(this));
        $('#add-sure').on('click', this.OnAddSureButtonClick.bind(this));
        $('#edit-sure').on('click', this.OnEditSureButtonClick.bind(this));
        $('#delete-sure').on('click', this.OnDeleteSureButtonClick.bind(this));
        $('#reset-sure').on('click', this.OnResetSureButtonClick.bind(this));
        $('#query-btn').on('click', this.OnQueryButtonClick.bind(this));
        $('#query-btn').trigger('click');
        window.onresize = this.SetFooter.bind(this);
    };

    this.SetFooter = function () {
        var height = $(window).height();
        if ((height - 113) > $('.box').height())
            $('.foot').addClass('foot-post');
        else
            $('.foot').removeClass('foot-post');
    };

    this.OnQueryButtonClick = function () {
        this.Reload();
    };

    this.Reload = function () {
        var name = $('#query-name').val();
        var departId = parseInt($("#department").combotree("getValue"));
        $.ajax({
            type: "post",
            dataType: 'json',
            data:{
                departId: departId,
                name: name,
                page: 1,
                rows: 10
            },
            url: '/User/getUserByPage',
            success: function (data) {
                console.log(data);
                this.ReloadTable();
                //this.ReloadTable(departId, name);
                //this.UserTable.datagrid('loadData',data.list);
            }.bind(this)
        });
    };

    this.InitDepartmentCombobox = function (id) {
        $.ajax({
            type: "POST",
            dataType: 'json',
            async: false,
            url: '/Department/getAllDepartment',
            success: function (data) {
                $(id).combotree({
                    panelHeight: 300,
                    valueField: 'id',
                    textField: 'text',
                    data: data,
                    editable: false,
                    onLoadSuccess: function () {
                        var status = $(id).combotree('tree').tree('getRoots');
                        $(id).combotree('setValue',status[0].id);
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
            url: 'User/getUserByPage',
            queryParams: {
                departId: parseInt($("#department").combotree("getValue")),
                name: $('#query-name').val()
            }
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
                { field: 'loginName', title: '登录账号', width: 240, align: 'center'},
                { field: 'name', title: '姓名', width: 240, align: 'center'},
                { field: 'departmentName', title: '单位', width: 240, align: 'center'},
                { field: 'state', title: '审核结果', width: 240, align: 'center', formatter: this.ResetState.bind(this)}
            ]],
            onBeforeLoad: this.OnUserTableGridBeforeLoad.bind(this),
            onClickRow: this.OnClickRow.bind(this),
            onLoadSuccess: function (data) {
                console.log(data)
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

    this.OnStateSelectClick = function () {
        $('.audit-state a').removeClass("action");
        $(event.target).addClass("action");

        var selected = this.UserTable.datagrid('getSelected');
        var state = $('.audit-state a.action').attr('state');

        $.ajax({
            type: 'post',
            url: '/User/updateStateById',
            data: {
                id: selected.id,
                state: state === 'pass' ? 1 : 0
            },
            async: false,
            dataType: 'json',
            success: function () {
                this.ReloadTable();
            }.bind(this)
        });
    };

    this.ShowAddDialog = function () {
        $('.add-dialog').show();
        $(".bg").show();

        $('#login-account').val('');
        $('#password').val('');
        $('#add-name').val('');
        $('#add-department').combotree("setValue", '58000');
    };

    this.ShowEditDialog = function () {
        $('.edit-dialog').show();
        $(".bg").show();
        var selected = $('#system-table').datagrid('getSelected');
        console.log(selected);
        var status = $('#edit-department').combotree('tree').tree('getRoots');
        //$(id).combotree('setValue',status[0].id);
        $('#edit-name').val(selected.name);
        $('#edit-department').combotree("setValue", selected.departmentId);
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

    this.IsExistUsername = function (username) {
        var user = null;
        $.ajax({
            type: 'post',
            url: '/User/isExistUsername',
            data: {username: username},
            async: false,
            dataType: 'json',
            success: function (result) {
                user = result;
            }
        });
        return user;
    };

    this.OnAddSureButtonClick = function (event) {
        var params = this.GetAddParams();
        if (params.loginName.trim().length === 0){
            $('#login-account').css({ 'borderColor': '#ff2828' });
            return;
        }  else{
            if (this.IsExistUsername(params.loginName) !== null){
                $('#error-msg').show();
                $('#login-account').css({ 'borderColor': '#ff2828' });
            } else {
                $('#error-msg').hide();
                $('#login-account').css({ 'borderColor': '#e0e0e0' });
            }
        }
        if (params.loginPwd.trim().length === 0) {
            $('#password').css({ 'borderColor': '#ff2828' });
            return;
        } else
            $('#password').css({ 'borderColor': '#e0e0e0' });

        if (params.name.trim().length === 0) {
            $('#add-name').css({ 'borderColor': '#ff2828' });
            return;
        } else
            $('#add-name').css({ 'borderColor': '#e0e0e0' });

        $(event.target).parent().parent().hide();
        $(".bg").hide();

        $.ajax({
            type: "POST",
            dataType: 'json',
            data: params,
            url: '/User/insertOne',
            success: function () {
                this.ReloadTable();
                this.ShowPromptMessage();
            }.bind(this)
        });
    };

    this.OnEditSureButtonClick = function (event) {
        if ($('#edit-name').val().trim().length === 0){
            $('#edit-name').css({ 'borderColor': '#ff2828' });
            return;
        } else
            $('#edit-name').css({ 'borderColor': '#e0e0e0' });

        $(event.target).parent().parent().hide();
        $(".bg").hide();

        var row = this.UserTable.datagrid('getSelected');
        $.ajax({
            type: "POST",
            dataType: 'json',
            data: {
                userId: row.id,
                departmentId: parseInt($('#edit-department').combotree('getValue')),
                name: $('#edit-name').val()
            },
            url: '/User/updateNameAndDepartmentIdById',
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
            departId: parseInt($('#add-department').combotree('getValue'))
        }
    };
};

$(document).ready(function () {
    var app = new App();
    app.Startup();
});