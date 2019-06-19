var App = function () {

    this.Department = new Department(this);
    this.Project = new Project(this);

    this.Startup = function () {
        this.SetCalendar();
        this.SetAging();
        this.SetCheckObject();
        this.SetCheckArea();
        $('.tab ul li').on('click', this.OnTabClick.bind(this));
    };

    this.ReloadDepartmentData = function () {
        var params = this.GetParams();
        $.ajax({
            type: "POST",
            dataType: 'json',
            data: params,
            url: 'ScoreShortTerm/findAllByTimeAndRegionByDepartment',
            success: function (data) {
                //console.log(data);
                this.Department.Reload(data);
                this.Department.ShowDepartmentTable(data);
            }.bind(this)
        });
    };

    this.ReloadProjectData = function () {
        var params = this.GetParams();
        $.ajax({
            type: "POST",
            dataType: 'json',
            data: params,
            url: 'ScoreShortTerm/findAllByTimeAndRegionByProject',
            success: function (data) {
                console.log(data);
                this.Project.Reload(data);
                this.Project.ShowProjectTable(data);
            }.bind(this)
        });
    };

    this.GetParams = function () {
        var startTime = $("#start-time").datebox('getValue');
        var endTime = $("#end-time").datebox('getValue');
        var aging = parseInt($('#aging').combobox('getValue'));
        var object = parseInt($('#check-object').combobox('getValue'));
        var area = parseInt($('#check-area').combobox('getValue'));

        return {
            startTime: startTime,
            endTime: endTime,
            fcstHours: aging,
            examId: 202,
            departmentId: area
        };
    };

    this.OnTabClick = function (event) {
        $('.tab ul li').removeClass("action");
        $(event.target).addClass("action");

        var index = $(event.target).index();
        $(".wrap .wrap-content").eq(index).css("display", "block").siblings().css("display", "none");
    };

    this.SetCalendar = function () {
        $('#start-time').datebox({
            panelWidth: 180,
            panelHeight: 260,
            onSelect: function () {
                this.ReloadDepartmentData();
            }.bind(this),
        }).datebox('setValue', '2019/03/01');

        $('#end-time').datebox({
            panelWidth: 180,
            panelHeight: 260,
            onSelect: function () {
                this.ReloadDepartmentData();
            }.bind(this),
        }).datebox('setValue', '2019/04/01');
    };

    this.SetAging = function () {
        $('#aging').combobox({
            panelHeight: 'auto',
            editable: false,
            onSelect: function () {
                this.ReloadDepartmentData();
                this.ReloadProjectData();
            }.bind(this),
        });
    };

    this.SetCheckObject = function () {
        $('#check-object').combobox({
            panelHeight: 'auto',
            editable: false,
            onSelect: function () {
                this.ReloadDepartmentData();
            }.bind(this),
        });
    };

    this.SetCheckArea = function () {
        $('#check-area').combobox({
            editable: false,
            url:"Department/findAllByCity",
            valueField:'id',
            textField:'name',
            onLoadSuccess: function (data) {
                var item = $('#check-area').combobox('getData');
                if (item.length > 0) {
                    $('#check-area').combobox('select',data[0].name);
                    $('#check-area').combobox('setValue',data[0].id);
                }
                this.ReloadDepartmentData();
                this.ReloadProjectData();
            }.bind(this),
            onSelect: function () {
                this.ReloadDepartmentData();
            }.bind(this),
        });
    };
};
$(document).ready(function () {
    var app = new App();
    app.Startup();
});