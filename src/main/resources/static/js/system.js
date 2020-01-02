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
        //$('.pass').on('click', this.ShowPassDialog.bind(this));
        //$('.no-pass').on('click', this.ShowNoPassDialog.bind(this));
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
        $('#pass-sure').on('click', this.OnPassSureButtonClick.bind(this));
        $('#no-pass-sure').on('click', this.OnNoPassSureButtonClick.bind(this));
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
                        console.log(result);
                        var item = $(id).combobox('getData');
                        if (item.length > 0)
                            $(id).combobox('select', result[0].departId);
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
            // onLoadSuccess: function (data) {
            // }.bind(this)
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

    this.InitUserInformationGrid = function () {
        this.UserTable.datagrid({
            method: "POST",
            url: 'User/getUserByPage',
            striped: true,
            singleSelect: true,
            fitColumns: true,
            fit: true,
            scrollbarSize: 0,
            pagination: true,
            pageNumber: 1,
            pageSize: 10,
            pageList: [10, 20, 30],
            loadMsg: '正在加载数据，请稍后...',
            columns: [[
                { field: 'loginName', title: '登录账号', width: 240, align: 'center'},
                { field: 'name', title: '姓名', width: 240, align: 'center'},
                { field: 'departmentName', title: '单位', width: 240, align: 'center', formatter: this.SetDepartment.bind(this),},
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
            return '<span class="success">通过</span>';
        else
            return '<span class="fail">未通过</span>';
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
        var selected = this.UserTable.datagrid('getSelected');
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
    };

    this.ShowPassDialog = function () {
        $('.pass-dialog').show();
        $(".bg").show();
    };

    this.ShowNoPassDialog = function () {
        $('.no-pass-dialog').show();
        $(".bg").show();
    };

    this.ShowAddDialog = function () {
        $('.add-dialog').show();
        $(".bg").show();
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
        //selected.name
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

    this.OnAddSureButtonClick = function (event) {
        $(event.target).parent().parent().hide();
        $(".bg").hide();
    };

    this.OnEditSureButtonClick = function (event) {
        $(event.target).parent().parent().hide();
        $(".bg").hide();
    };

    this.OnDeleteSureButtonClick = function (event) {
        $(event.target).parent().parent().hide();
        $(".bg").hide();
    };

    this.OnResetSureButtonClick = function (event) {
        $(event.target).parent().parent().hide();
        $(".bg").hide();
    };

    this.OnPassSureButtonClick = function () {
        $(event.target).parent().parent().hide();
        $(".bg").hide();
    };

    this.OnNoPassSureButtonClick = function () {
        $(event.target).parent().parent().hide();
        $(".bg").hide();
    };

    this.SetDepartment = function (val,row) {
        return row.departmentName;
    };

    // window.SaveDialog = function (index) {
    //     $('#system-table').datagrid('selectRow',index);
    //     var row = $('#system-table').datagrid('getSelected');
    //
    //     var edit = $('#system-table').datagrid('getEditor', {index:index,field:'departmentName'});
    //     var value = $(edit.target).combobox('getText');
    //     console.log(value);
    //
    //     if (row){
    //         $(".dialog-save").show();
    //         setTimeout(function(){
    //             $(".dialog-save").hide();
    //         },2000);
    //
    //         var selected = $('#system-table').datagrid('getSelected');
    //
    //         alert(selected.id + "======" + selected.departmentName);
    //
    //         $.ajax({
    //             type: "POST",
    //             dataType: 'json',
    //             data: {
    //                 userId: selected.id,
    //                 departmentId: selected.departId
    //             },
    //             url: 'User/updateDepartmentIdById',
    //             success: function (result) {
    //             }.bind(this)
    //         });
    //     }
    // };
};

$(document).ready(function () {
    var app = new App();
    app.Startup();
});