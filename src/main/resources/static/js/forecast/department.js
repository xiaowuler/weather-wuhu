var Department = function (parent) {

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

        this.result.departments.forEach(function (item, index) {
            var name = item.name;
            marks.push(name)
        }.bind(this));

        return marks;
    };

    this.GetChartElementValues = function () {
        var values = [];

        this.result.departments.forEach(function (value) {
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
        Highcharts.chart('department-chart', {
            chart: {
                type: 'column'
            },
            title: {
                text: null
            },
            subtitle: {
                text: null
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
        data.departments.forEach(function (item) {

            var name = '<th>{0}</th>';
            var score = '<td>{0}</td>';
            var sample = '<td>{0}</td>';

            $('#city').append(name.format(item.name));
            $('#score').append(score.format(item.totalRate));
            $('#sample').append(sample.format(item.totalSample));

        }.bind(this));
    };
};