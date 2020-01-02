var App = function () {
    this.ShortDepartment = new ShortDepartment(this);
    this.ShortProject = new ShortProject(this);

    this.shortTimeForecast = null;
    this.nowcasting = null;

    this.Startup = function () {
        this.SetFooter();
        this.GetCurrentLoginName();
        this.SetCalendar();
        this.SetWeatherTypeCombobox();
        this.InitStationComobox();

        $('.tab ul li').on('click', this.OnTagsSelectedChange.bind(this));
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
        $('.tab ul li').removeClass("action");
        $(event.target).addClass("action");

        var index = $(event.target).index();
        $(".wrap .wrap-content").eq(index).css("display","block").siblings().css("display","none");
    };

    this.SetCalendar = function () {
        var startTime = $('#start-time');
        var endTime = $('#end-time');

        startTime.datebox({
            panelWidth: 180,
            panelHeight: 260
        });
        startTime.datebox('setValue', '2018/05/24')

        endTime.datebox({
            panelWidth: 180,
            panelHeight: 260
        });
        endTime.datebox('setValue', '2020/06/01');
    };

    this.SetWeatherTypeCombobox = function () {
        $('#weather-type').combobox({
            panelHeight: 'auto',
            editable: false,
            textField: 'type',
            valueField: 'fcstType',
            data: [
                {
                    'fcstType': 1,
                    'type': '短时强降水'
                },
                {
                    'fcstType': 2,
                    'type': '大风或冰雹'
                },
                {
                    'fcstType': 3,
                    'type': '雷暴'
                }
            ],
            onLoadSuccess: function (data) {
                var options = $('#weather-type').combobox('getData');
                if (options.length > 0) {
                    $('#weather-type').combobox('select',data[0].type);
                    $('#weather-type').combobox('setValue',data[0].fcstType);
                }
            }
        });
    };

    this.InitStationComobox = function () {
        $('#station').combobox({
            url: '/station/findParentStations',
            textField: 'stationName',
            valueField: 'departmentId',
            onLoadSuccess: function (data) {
                var options = $('#station').combobox('getData');
                if (options.length > 0) {
                    $('#station').combobox('select',data[0].stationName);
                    $('#station').combobox('setValue',data[0].departmentId);
                }
                this.GetDepartmentData();
                this.GetProjectData();
            }.bind(this)
        });
    };

    this.OnQueryButtonClick = function () {
        var station = $('#station').combobox('getValue');
        if (station === '' || station === '58000'){
            this.GetDepartmentData();
            this.GetProjectData();
        }
        else{
            this.GetDataByDepartmentId();
            this.GetProjectData();
        }
    };

    this.GetDepartmentData = function () {
        var parameters = this.GetQueryParameters();
        if (parameters === null)
            return;

        $.ajax({
            type: 'post',
            url: '/scoreShortTime/findAllByParentDepartment',
            data: parameters,
            dataType: 'json',
            success: function (data) {
                this.ShortDepartment.Reload(data);
                this.ShortDepartment.ShowDepartmentTable(data);
            }.bind(this)
        });
    };

    this.GetDataByDepartmentId = function () {
        var parameters = this.GetQueryParameters();
        if (parameters === null)
            return;

        $.ajax({
            type: 'post',
            url: '/scoreShortTime/findAllByDepartmentId',
            data: parameters,
            dataType: 'json',
            success: function (data) {
                this.ShortDepartment.Reload(data);
                this.ShortDepartment.ShowDepartmentTable(data);
            }.bind(this)
        });
    };

    this.GetProjectData = function () {
        var parameters = this.GetQueryParameters();
        if (parameters === null)
            return;

        this.GetShortTimeData(parameters);
        this.GetNowcastingData(parameters);
    };

    this.GetShortTimeData = function (parameters) {
        $.ajax({
            type: 'post',
            url: '/scoreShortTime/findAllByProject',
            data: parameters,
            dataType: 'json',
            beforeSend: function(){
                this.shortTimeForecast = null;
            }.bind(this),
            success: function (data) {
                this.shortTimeForecast = data.shortTimeForecast;
                this.ShortProject.Reload(data);
                this.fillTable();
            }.bind(this)
        });
    };

    this.GetNowcastingData = function (parameters) {
        $.ajax({
            type: 'post',
            url: '/scoreNowcasting/findAllByProject',
            data: parameters,
            dataType: 'json',
            beforeSend: function(){
                this.nowcasting = null;
            }.bind(this),
            success: function (data) {
                this.nowcasting = data.nowcasting;
                this.ShortProject.Reload(data);
                this.fillTable();
            }.bind(this)
        });
    };

    this.fillTable = function () {
        if (this.shortTimeForecast == null)
            return;

        if (this.nowcasting == null)
            return;

        this.ShortProject.ShowProjectTable(this.shortTimeForecast, this.nowcasting);
    }

    this.GetQueryParameters = function () {
        var startTime = $('#start-time').val();
        var endTime = $('#end-time').val();
        var weatherType = $('#weather-type').combobox('getValue');
        var station = $('#station').combobox('getValue');

        if (station === ''){
            return null;
        } else if (station === '58000'){
            return {
                startTime: startTime,
                endTime: endTime,
                fcstType: weatherType
            }
        } else {
            return {
                startTime: startTime,
                endTime: endTime,
                fcstType: weatherType,
                departmentId: station
            }
        }
    };
};

$(document).ready(function () {
    var app = new App();
    app.Startup();
});