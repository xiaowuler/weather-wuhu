var App = function () {
    this.Department = new Department(this);
    this.Project = new Project(this);

    this.Startup = function () {
        this.SetCalendar();
        this.SetWarnTypeCombobox();
        this.SetCheckObjectCombobox();
        this.SetSecondaryUnitCombobox();
        $('.tab ul li').on('click', this.OnTabClick.bind(this));
        $('#download').on('click', this.Project.OnDownloadButtonClick.bind(this));
    };

    this.ReloadDepartmentData = function () {
        var params = this.GetParams();
        $.ajax({
            type: "POST",
            dataType: 'json',
            data: params,
            url: 'ScoreWarningSignal/findAllByTimeAndRegionByDepartment',
            success: function (data) {
                //this.Department.Reload(data);
                //this.Department.ShowDepartmentTable(data);
            }.bind(this)
        });
    };

    this.ReloadProjectData = function () {
        var params = this.GetParams();
        $.ajax({
            type: "POST",
            dataType: 'json',
            data: params,
            url: 'ScoreWarningSignal/findAllByTimeAndRegionByProduct',
            success: function (data) {
                //this.Project.Reload(data);
                //this.Project.ShowProjectTable(data);
            }.bind(this)
        });
    };

    this.GetParams = function () {
        var startTime = $("#start-time").datebox('getValue');
        var endTime = $("#end-time").datebox('getValue');
        var warningType = $('#warn-type').combobox('getValue');
        var childDepartmentId = $('#check-object').combobox('getValue');
        var departmentId = $('#secondary-units').combobox('getValue');

        return {
            startTime: startTime,
            endTime: endTime,
            warningType: warningType,
            departmentId: 58000,
            /*childDepartmentId: 58334*/
        };
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
            url:'Department/findAllByParentDepartId',
            panelHeight: 'auto',
            editable: false,
            onSelect: function () {
                this.ReloadDepartmentData();
                this.ReloadProjectData();
            }.bind(this),
        });
    };

    this.SetSecondaryUnitCombobox = function () {
        $('#secondary-units').combobox({
            editable: false,
            url:"Department/findAllByCity",
            valueField:'id',
            textField:'name',
            onLoadSuccess: function (data) {
                var item = $('#secondary-units').combobox('getData');
                if (item.length > 0) {
                    $('#secondary-units').combobox('select',data[0].name);
                    $('#secondary-units').combobox('setValue',data[0].id);
                }
                this.ReloadDepartmentData();
                this.ReloadProjectData();
            }.bind(this),
            onSelect: function () {
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