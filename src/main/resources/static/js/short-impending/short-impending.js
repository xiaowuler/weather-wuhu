var App = function () {
    this.Department = new Department(this);
    this.Project = new Project(this);

    this.Startup = function () {
        this.GetCurrentLoginName();
        this.SetCalendar();
        this.SetWeatherTypeCombobox();
        this.InitStationComobox();

        $('.tab ul li').on('click', this.OnTagsSelectedChange.bind(this));
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
        $('#start-time').datebox({
            panelWidth: 180,
            panelHeight: 260
        });

        $('#end-time').datebox({
            panelWidth: 180,
            panelHeight: 260
        });

        var startDate = moment().add(-1, 'months').format('YYYY/MM/DD');
        $("#start-time").datebox("setValue", startDate);
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
                options.unshift({'stationName': '全部单位', 'departmentId': 'all'});
                $('#station').combobox('select',options[0].stationName);
                $('#station').combobox('setValue',options[0].departmentId);
            }
        });
    };
};

$(document).ready(function () {
    var app = new App();
    app.Startup();
});