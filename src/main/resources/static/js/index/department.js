var Department = function (parent) {
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

        this.result.departmentDTOS.forEach(function (item, index) {
            var name = item.county;
            marks.push(name)
        }.bind(this));

        return marks;
    };

    this.GetChartElementValues = function () {
        var values = [];

        this.result.departmentDTOS.forEach(function (value) {
            values.push(value.totalRate);
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
        var params = this.Parent.GetQueryParams();
        var title = '{0} - {1}'.format(params.startTime, params.endTime);

        Highcharts.chart('department-chart', {
            title: {
                text: '预警信号'
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
        $('#department-table').find('tr th,tr td').not('.table-title').remove();
        data.departmentDTOS.forEach(function (item) {

            var name = '<th>{0}</th>';
            var score = '<td>{0}</td>';
            //var sample = '<td>{0}</td>';

            $('#city').append(name.format(item.county));
            $('#score').append(score.format(item.totalRate));
            //$('#sample').append(sample.format(item.totalSample));

        }.bind(this));
    };
};