var ShortProject = function (parent) {
    this.ShortTimeChart = $('#short-time-chart');
    this.NowcastingChart = $('#nowcasting-chart')

    this.Reload = function (result) {
        this.result = result;
        this.ShowDepartmentChart();
    };

    this.GetChartElementValues = function () {
        var types = [];
        var correctRate = [];
        var hitRate = [];
        var emptyReportRate = [];
        var missingReportRate = [];

        var shortTimeForecasts = [];
        var nowcastings = [];

        if (this.result === null)
            return;

        var shortTimeForecastRate = this.result.shortTimeForecast;
        var nowcastingRate = this.result.nowcasting;
        types.push(shortTimeForecastRate, nowcastingRate);

        types.forEach(function (item) {
            if (item !== null){
                correctRate.push((item.correctRate) * 100);
                hitRate.push((item.hitRate) * 100);
                emptyReportRate.push((item.emptyReportRate) * 100);
                missingReportRate.push((item.missingReportRate) * 100);
            }
        }.bind(this));

        shortTimeForecasts.push(correctRate[0], hitRate[0], emptyReportRate[0], missingReportRate[0]);
        nowcastings.push(correctRate[0], hitRate[0], emptyReportRate[0], missingReportRate[0]);

        return {
            shortTimeForecast: shortTimeForecasts,
            nowcasting : nowcastings
        }
    };

    this.ShowDepartmentChart = function () {
        var title = {
            text: ''
        };

        var subtitle = {
            text: null
        };

        var credits = {
            enabled: false
        };

        var chart = {
            type: 'column'
        };

        var xAxis = {
            categories: ['准确率', '命中率', '空报率', '漏报率']
        };

        var yAxis = {
            min: 0,
            title: {
                text: null
            }
        };

        var tooltip = {
            headerFormat: '{point.x}<br>',
            pointFormat: '分值：{point.y:.2f}'
        };

        var plotOptions = {
            pointWidth: 10
        };

        var legend = {
            enabled: false
        };

        var series = {
            data: [],
            color: 'red'
        };

        var json = {};

        json.title = title;
        json.subtitle = subtitle;
        json.credits = credits;
        json.chart = chart;
        json.xAxis = xAxis;
        json.yAxis = yAxis;
        json.tooltip = tooltip;
        json.plotOptions = plotOptions;
        json.legend = legend;
        json.series = series;

        var params = this.GetChartElementValues();

        if (this.result.shortTimeForecast){
            this.ShortTimeChart.highcharts(json);
            this.ShortTimeChart.highcharts().setTitle( {text: '短时预报'});
            this.ShortTimeChart.highcharts().addSeries({
                data: params.shortTimeForecast,
                color: '#3aa2ff'
            });
        }

        if (this.result.nowcasting){
            this.NowcastingChart.highcharts(json);
            this.NowcastingChart.highcharts().setTitle( {text: '临近预报'});
            this.NowcastingChart.highcharts().addSeries({
                data: params.nowcasting,
                color: '#a3ff80'
            });
        }
    };

    this.ShowProjectTable = function (shortTimeForecast, nowcasting) {
        $('#project-table').find('tr th, tr td').not('.table-title').remove();
        var shortTimeRate = '<td>{0}</td><td>{1}</td><td>{2}</td><td>{3}</td>';
        $('#short-time').append(shortTimeRate.format(((shortTimeForecast.correctRate) * 100).toFixed(2), ((shortTimeForecast.hitRate) * 100).toFixed(2), ((shortTimeForecast.emptyReportRate) * 100).toFixed(2), ((shortTimeForecast.missingReportRate) * 100).toFixed(2)));

        var nowcastingRate = '<td>{0}</td><td>{1}</td><td>{2}</td><td>{3}</td>';
        $('#nowcasting').append(nowcastingRate.format(((nowcasting.correctRate) * 100).toFixed(2), ((nowcasting.hitRate) * 100).toFixed(2), ((nowcasting.emptyReportRate) * 100).toFixed(2), ((nowcasting.missingReportRate) * 100).toFixed(2)));
    };
};