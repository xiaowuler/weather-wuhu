var App = function () {
    this.Department = new Department(this);
    this.Project = new Project(this);

    this.Startup = function () {
        this.GetCurrentLoginName();
        this.SetCalendar();
        this.SetWarnTypeCombobox();
        this.InitWarningTypeComboBox();
        this.SetCheckObjectCombobox();

        $('.tab ul li').on('click', this.OnTagsSelectedChange.bind(this));
        $('#query-btn').trigger("click");
        $('#query-btn').on('click', this.OnQueryButtonClick.bind(this));
        $('#download').on('click', this.Project.OnDownloadButtonClick.bind(this));
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

    this.OnTagsSelectedChange = function (event) {
        $('.tab ul li').on('click', function () {
            $('.tab ul li').removeClass("action");
            $(event.target).addClass("action");

            var index = $(event.target).index();
            $('.wrap .wrap-content').eq(index).css("display","block").siblings().css("display","none");
        });
    };

    this.SetCalendar = function () {
        $('#start-time').datebox({
            panelWidth: 180,
            panelHeight: 260
        }).datebox('setValue', '2019/03/01');

        $('#end-time').datebox({
            panelWidth: 180,
            panelHeight: 260
        }).datebox('setValue', '2019/05/01');
    };

    this.SetWarnTypeCombobox = function () {
        $('#warning-type').combobox({
            panelHeight: 'auto',
            editable: false,
        });
    };

    this.SetCheckObjectCombobox = function () {
        $('#check-object').combobox({
            url : "Department/findAllByParentDepartId",
            panelHeight: 300,
            editable: false,
            valueField:'departId',
            textField:'county',
            queryParams: { parentDepartId: 58000 },
            loadFilter:function(data){
                var obj = {};
                obj.departId = 58000;
                obj.county ='全部单位';
                data.splice(0, 0, obj);
                return data;
            },
            onSelect: function (row) {
                var departId = row.departId;
                if (departId !== 58000){
                    $('.forbid').hide();
                    this.SetChildDepartment(row.departId);
                } else{
                    $('.forbid').show();
                    this.SetChildDepartment();
                }
            }.bind(this),
            onLoadSuccess: function (data) {
                var item = $('#check-object').combobox('getData');
                if (item.length > 0) {
                    $('#check-object').combobox('select',data[0].county);
                    $('#check-object').combobox('setValue',data[0].departId);
                }

                this.ReloadDepartmentData();
                this.ReloadProjectData();
            }.bind(this),
        });
    };

    this.SetChildDepartment = function (departId) {
        if (departId === undefined)
            return;

        $('#secondary-units').combobox({
            url : "Department/findAllByParentDepartId",
            panelHeight: 'auto',
            editable: false,
            valueField:'departId',
            textField:'county',
            queryParams: { parentDepartId: departId },
            loadFilter:function(data){
                var obj={};
                obj.departId = '';
                obj.county ='全部单位';
                data.splice(0,0,obj);
                return data;
            },
            onLoadSuccess: function (data) {
                var item = $('#secondary-units').combobox('getData');
                if (item.length > 0) {
                    $('#secondary-units').combobox('select',data[0].county);
                    $('#secondary-units').combobox('setValue',data[0].departId);
                }
            }.bind(this),
        });
    };

    this.InitWarningTypeComboBox = function () {
        $.ajax({
            type: 'post',
            url: '/ScoreWarningSignal/findWaringType',
            success: function (result) {
                this.AddWarningTypeComboBoxOption(this.GetWarningType(result));
            }.bind(this)
        });
    };

    this.GetWarningType = function (result) {
        var data = [];
        result.forEach(function (item, index) {
            data.push(JSON.parse(item));
        });
        return data;
    };

    this.AddWarningTypeComboBoxOption = function (result) {
        var warningType = $('#warning-type');
        warningType.combobox({
            valueField: 'code',
            textField: 'type',
            data: result,
            onLoadSuccess : function(){
                var data = warningType.combobox('getData');
                if (data.length > 0) {
                    warningType.combobox('select', data[0].type);
                }
            }
        });
    };

    this.OnQueryButtonClick = function () {
        this.ReloadProjectData();
        this.ReloadDepartmentData();
    };

    this.ReloadProjectData = function () {
        var params = this.GetQueryParams();

        $.ajax({
            type: "POST",
            dataType: 'json',
            data: params,
            url: 'ScoreWarningSignal/findAllByTimeAndRegionByProduct',
            success: function (data) {
                if (data === null)
                    return;

                this.Project.Reload(data);
                this.Project.ShowProjectTable(data);
            }.bind(this)
        });
    };

    this.ReloadDepartmentData = function () {
        var params = this.GetQueryParams();

        $.ajax({
            type: "POST",
            dataType: 'json',
            data: params,
            url: 'ScoreWarningSignal/findAllByTimeAndRegionByDepartment',
            success: function (data) {
                this.Department.Reload(data);
                this.Department.ShowDepartmentTable(data);
            }.bind(this)
        });
    };

    this.GetQueryParams = function () {
        return {
            startTime: $("#start-time").datebox('getValue'),
            endTime: $("#end-time").datebox('getValue'),
            warningType: $('#warning-type').combobox('getValue'),
            departmentId: $('#check-object').combobox('getValue'),
            childDepartmentId: $('#secondary-units').combobox('getValue')
        };
    };
};

$(document).ready(function () {
    var app = new App();
    app.Startup();
});