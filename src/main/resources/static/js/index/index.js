var App = function () {
    this.Department = new Department(this);
    this.Project = new Project(this);

    this.Startup = function () {
        this.SetCalendar();
        this.SetWarnTypeCombobox();
        this.SetCheckObjectCombobox();
        $('.tab ul li').on('click', this.OnTabClick.bind(this));
        $('#download').on('click', this.Project.OnDownloadButtonClick.bind(this));
    };

    this.ReloadDepartmentData = function () {
        var params = this.GetParams();
        if (params == null)
            return;

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

    this.ReloadProjectData = function () {
        var params = this.GetParams();
        if (params == null)
            return;

        $.ajax({
            type: "POST",
            dataType: 'json',
            data: params,
            url: 'ScoreWarningSignal/findAllByTimeAndRegionByProduct',
            success: function (data) {
                this.Project.Reload(data);
                this.Project.ShowProjectTable(data);
            }.bind(this)
        });
    };

    this.GetParams = function () {
        var startTime = $("#start-time").datebox('getValue');
        var endTime = $("#end-time").datebox('getValue');
        var warningType = $('#warn-type').combobox('getValue');
        var departmentId = $('#check-object').combobox('getValue');
        var childDepartmentId = $('#secondary-units').combobox('getValue');

        if (departmentId !== '' && departmentId !== '全部单位')
        {
            return {
                startTime: startTime,
                endTime: endTime,
                warningType: warningType,
                departmentId: departmentId,
                childDepartmentId: childDepartmentId
            };
        }

        return null;
    };

    this.OnTabClick = function (event) {
        $('.tab ul li').removeClass("action");
        $(event.target).addClass("action");

        var index = $(event.target).index();
        $(".wrap .wrap-content").eq(index).css("display","block").siblings().css("display","none");
    };

    this.SetCalendar = function () {
        $('#start-time').datebox({
            panelWidth: 180,
            panelHeight: 260,
            onSelect: function () {
                this.ReloadDepartmentData();
                this.ReloadProjectData();
            }.bind(this),
        }).datebox('setValue', '2019/03/01');

        $('#end-time').datebox({
            panelWidth: 180,
            panelHeight: 260,
            onSelect: function () {
                this.ReloadDepartmentData();
                this.ReloadProjectData();
            }.bind(this),
        }).datebox('setValue', '2019/05/01');
    };

    this.SetWarnTypeCombobox = function () {
        $('#warn-type').combobox({
            panelHeight: 'auto',
            editable: false,
            onSelect: function () {
                this.ReloadDepartmentData();
                this.ReloadProjectData();
            }.bind(this),
        });
    };

    this.SetCheckObjectCombobox = function () {
        $('#check-object').combobox({
            url : "Department/findAllByParentDepartId",
            panelHeight: 300,
            editable: false,
            valueField:'departId',
            textField:'departName',
            queryParams: { parentDepartId: 58000 },
            loadFilter:function(data){
                var obj={};
                obj.departId = 58000;
                obj.departName ='全部单位';
                data.splice(0,0,obj);
                return data;
            },
            onSelect: function (row) {
                var departId = row.departId;
                if (departId !== 58000){
                    $('.forbid').hide();
                    this.SetChildDepart(row.departId);
                } else{
                    $('.forbid').show();
                    //$("#secondary-units").combobox('setValue',null);
                }

                this.ReloadDepartmentData();
                this.ReloadProjectData();

            }.bind(this),
            onLoadSuccess: function (data) {
                console.log(data);
                var item = $('#check-object').combobox('getData');
                if (item.length > 0) {
                    $('#check-object').combobox('select',data[0].departName);
                    $('#check-object').combobox('setValue',data[0].departId);
                }

                this.ReloadDepartmentData();
                this.ReloadProjectData();
            }.bind(this),
        });
    };

    this.SetChildDepart = function (departId) {
        $('#secondary-units').combobox({
            url : "Department/findAllByParentDepartId",
            panelHeight: 'auto',
            editable: false,
            valueField:'departId',
            textField:'departName',
            queryParams: { parentDepartId: departId },
            loadFilter:function(data){
                var obj={};
                obj.departId = '';
                obj.departName ='全部单位';
                data.splice(0,0,obj);
                return data;
            },
            onSelect: function (row) {
                this.ReloadDepartmentData();
                this.ReloadProjectData();
            }.bind(this),
            onLoadSuccess: function (data) {
                console.log(data);
                var item = $('#secondary-units').combobox('getData');
                if (item.length > 0) {
                    $('#secondary-units').combobox('select',data[0].departName);
                    $('#secondary-units').combobox('setValue',data[0].departId);
                }
                this.ReloadDepartmentData();
                this.ReloadProjectData();
            }.bind(this),
        });
    };
};
$(document).ready(function () {
    var app = new App();
    app.Startup();
});