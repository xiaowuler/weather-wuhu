var Project = function (parent) {
    this.Reload = function (result) {
        this.result = result;
        var elementSeries = [];

        var values = this.GetChartElementValues();
        var series = this.GetChartElementSeries(values);
        elementSeries.push(series);
        this.ShowDepartmentChart(elementSeries);
    };

    this.GetChartElementValues = function () {
        var values = [];

        if (this.result == null)
            return;

        var value1 = this.result.rainAndSnowRate;
        var value2 = this.result.rainfallGradeRate;
        var value3 = this.result.heavyRainAndSnowRate;
        var value4 = this.result.normalRainRate;
        var value5 = this.result.minTempOneRate;
        var value6 = this.result.minTempTwoRate;
        var value7 = this.result.maxTempOneRate;
        var value8 = this.result.maxTempTwoRate;
        var value9 = this.result.totalRate;

        values.push(value1, value2, value3, value4, value5, value6, value7, value8, value9);
        return values;
    };

    this.GetChartElementSeries = function (values) {
        return {
            data: values,
            pointWidth: 30,
            tooltip: {
                headerFormat: '{point.x}<br>',
                pointFormat: '分值：{point.y:.2f}'
            }
        };
    };

    this.ShowDepartmentChart = function (elementSeries) {
        Highcharts.chart('project-chart', {
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
                categories: ['晴雨雪', '降水分级检验', '暴雨雪', '一般性降水', '低温≤1', '低温≤2', '高温≤1', '高温≤2', '综合评分'],
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

    this.ShowProjectTable = function (data) {
        if (data == null)
            return;

        $('#time').text($('#aging').combobox('getValue'));
        $('#project-table').find('tr td').not('.table-title').remove();

        var number = '<td>{0}</td><td>{1}</td><td>{2}</td><td>{3}</td><td>{4}</td><td>{5}</td><td>{6}</td><td>{7}</td><td>{8}</td>';
        var sample = '<td>{0}</td><td>{1}</td><td>{2}</td><td>{3}</td><td>{4}</td><td>{5}</td><td>{6}</td><td>{7}</td><td>{8}</td>';

        $('#number').append(number.format(data.rainAndSnowRate, data.rainfallGradeRate, data.heavyRainAndSnowRate, data.normalRainRate, data.minTempOneRate, data.minTempTwoRate, data.maxTempOneRate, data.maxTempTwoRate, data.totalRate));
        $('#project-sample').append(sample.format(data.rainAndSnowSample, data.rainfallGradeSample, data.heavyRainAndSnowSample, data.normalRainSample, data.minTempOneSample, data.minTempTwoSample, data.maxTempOneSample, data.maxTempTwoSample, data.totalSample));
    };
};