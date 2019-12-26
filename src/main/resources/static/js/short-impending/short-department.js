var ShortDepartment = function (parent) {
    this.Parent = parent;

    this.Reload = function (result) {
        this.result = result;

        var elementSeries = [];

        var xMarks = this.GetChartXMarks();
        var values = this.GetChartElementValues();
        var series = this.GetChartElementSeries(values);
        elementSeries.push(series);
        this.ShowDepartmentChart(xMarks, elementSeries);
    };

    this.GetChartXMarks = function () {
        var marks = [];
        this.result.stationDTOs.forEach(function (item, index) {
            var stationName = item.stationName;
            marks.push(stationName)
        }.bind(this));

        return marks;
    };

    this.GetChartElementValues = function () {
        var values = [];
        this.result.stationDTOs.forEach(function (item, index) {
            values.push(item.totalRate);
        }.bind(this));

        return values;
    };

    this.GetChartElementSeries = function (values) {
        return {
            data: values,
            pointWidth: 30,
            tooltip: {
                headerFormat: '城市：{point.x}<br>',
                pointFormat: '分值：{point.y:.2f}'
            }
        };
    };

    this.ShowDepartmentChart = function (xMarks, elementSeries) {
        var parameters = this.Parent.GetQueryParameters();
        var title = '{0} - {1}'.format(parameters.startTime, parameters.endTime);

        Highcharts.chart('department-chart', {
            title: {
                text: '短临预报'
            },
            subtitle: {
                text: title
            },
            chart: {
                type: 'column'
            },
            credits: {
                enabled: false
            },
            xAxis: {
                categories: xMarks,
                lineColor: '#999999'
            },
            yAxis: {
                min: 0,
                title: {
                    text: null
                },
            },
            legend: {
                enabled: false
            },
            series: elementSeries
        });
    };

    this.ShowDepartmentTable = function (data) {
        $('#department-table').find('tr th, tr td').not('.table-title').remove();
        data.stationDTOs.forEach(function (item) {
            var station = '<th>{0}</th>';
            var rate = '<td>{0}</td>';

            $('#city').append(station.format(item.stationName));
            $('#score').append(rate.format(item.totalRate));

        }.bind(this));
    };
};