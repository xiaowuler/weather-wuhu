var Project = function (parent) {
    this.Reload = function (result) {
        this.result = result;
        var type = this.ShowDepartmentChart();
        console.log(type)
        var BlueElementSeries = [];
        var YellowElementSeries = [];
        var OrangeElementSeries = [];
        var RedElementSeries = [];
        var LevelElementSeries = [];
        var NoLevelBlueElementSeries = [];

        var blueValues = this.GetBlueChartElementValues();
        var blueSeries = this.GetChartElementSeries(blueValues);

        var yellowValues = this.GetYellowChartElementValues();
        var yellowSeries = this.GetChartElementSeries(yellowValues);

        var OrangeValues = this.GetOrangeChartElementValues();
        var orangeSeries = this.GetChartElementSeries(OrangeValues);

        var redValues = this.GetRedChartElementValues();
        var redSeries = this.GetChartElementSeries(redValues);

        var levelValues = this.GetLevelChartElementValues();
        var levelSeries = this.GetChartElementSeries(levelValues);

        var NoLevelValues = this.GetNoLevelChartElementValues();
        var NoLevelSeries = this.GetChartElementSeries(NoLevelValues);

        BlueElementSeries.push(blueSeries);
        YellowElementSeries.push(yellowSeries);
        OrangeElementSeries.push(orangeSeries);
        RedElementSeries.push(redSeries);
        LevelElementSeries.push(levelSeries);
        NoLevelBlueElementSeries.push(NoLevelSeries);
        this.ShowBlueDepartmentChart(YellowElementSeries);
        this.ShowYellowDepartmentChart(OrangeElementSeries);
        this.ShowOrangeDepartmentChart(OrangeElementSeries);
        this.ShowRedDepartmentChart(RedElementSeries);
        this.ShowLevelDepartmentChart(LevelElementSeries);
        this.ShowNoLevelDepartmentChart(NoLevelBlueElementSeries);
    };

    this.GetBlueChartElementValues = function () {
        var titles = ['蓝色', '黄色', '橙色', '红色', '分级检验', '不分级检验'];

    };

    this.GetBlueChartElementValues = function () {
        var values = [];

        var value1 = (this.result.blueWarningType.correctRate) * 100;
        var value2 = (this.result.blueWarningType.hitRate) * 100;
        var value3 = (this.result.blueWarningType.emptyReportRate) * 100;
        var value4 = (this.result.blueWarningType.missingReportRate) * 100;
        var value5 = this.result.blueWarningType.t1;
        var value6 = this.result.blueWarningType.t2;
        var value7 = this.result.blueWarningType.t3;

        values.push(value1, value2, value3, value4, value5, value6, value7);
        return values;
    };

    this.GetYellowChartElementValues = function () {
        var values = [];

        var value1 = (this.result.yellowWarningType.correctRate) * 100;
        var value2 = (this.result.yellowWarningType.hitRate) * 100;
        var value3 = (this.result.yellowWarningType.emptyReportRate) * 100;
        var value4 = (this.result.yellowWarningType.missingReportRate) * 100;
        var value5 = this.result.yellowWarningType.t1;
        var value6 = this.result.yellowWarningType.t2;
        var value7 = this.result.yellowWarningType.t3;

        values.push(value1, value2, value3, value4, value5, value6, value7);
        return values;
    };

    this.GetOrangeChartElementValues = function () {
        var values = [];

        var value1 = (this.result.orangeWarningType.correctRate) * 100;
        var value2 = (this.result.orangeWarningType.hitRate) * 100;
        var value3 = (this.result.orangeWarningType.emptyReportRate) * 100;
        var value4 = (this.result.orangeWarningType.missingReportRate) * 100;
        var value5 = this.result.orangeWarningType.t1;
        var value6 = this.result.orangeWarningType.t2;
        var value7 = this.result.orangeWarningType.t3;

        values.push(value1, value2, value3, value4, value5, value6, value7);
        return values;
    };

    this.GetRedChartElementValues = function () {
        var values = [];

        var value1 = (this.result.redWarningType.correctRate) * 100;
        var value2 = (this.result.redWarningType.hitRate) * 100;
        var value3 = (this.result.redWarningType.emptyReportRate) * 100;
        var value4 = (this.result.redWarningType.missingReportRate) * 100;
        var value5 = this.result.redWarningType.t1;
        var value6 = this.result.redWarningType.t2;
        var value7 = this.result.redWarningType.t3;

        values.push(value1, value2, value3, value4, value5, value6, value7);
        return values;
    };

    this.GetLevelChartElementValues = function () {
        var values = [];

        var value1 = (this.result.levelWarningType.correctRate) * 100;
        var value2 = (this.result.levelWarningType.hitRate) * 100;
        var value3 = (this.result.levelWarningType.emptyReportRate) * 100;
        var value4 = (this.result.levelWarningType.missingReportRate) * 100;
        var value5 = this.result.levelWarningType.t1;
        var value6 = this.result.levelWarningType.t2;
        var value7 = this.result.levelWarningType.t3;

        values.push(value1, value2, value3, value4, value5, value6, value7);
        return values;
    };

    this.GetNoLevelChartElementValues = function () {
        var values = [];

        var value1 = (this.result.noLevelWarningType.correctRate) * 100;
        var value2 = (this.result.noLevelWarningType.hitRate) * 100;
        var value3 = (this.result.noLevelWarningType.emptyReportRate) * 100;
        var value4 = (this.result.noLevelWarningType.missingReportRate) * 100;
        var value5 = this.result.noLevelWarningType.t1;
        var value6 = this.result.noLevelWarningType.t2;
        var value7 = this.result.noLevelWarningType.t3;

        values.push(value1, value2, value3, value4, value5, value6, value7);
        return values;
    };

    this.GetChartElementSeries = function (values) {
        return {
            data: values,
            pointWidth: 30,
        }
    };

    this.ShowDepartmentChart = function (elementSeries) {
        var title = {
            text: '颜色'
        };
        var subtitle = {
            text: null
        };
        var xAxis = {
            categories: ['准确率', '命中率', '空报率', '漏报率', 'T1', 'T2', 'T3']
        };
        var yAxis = {
            min: 0,
            title: {
                text: null
            },
        };

        var tooltip = {
            headerFormat: '{point.x}<br>',
            pointFormat: '分值：{point.y:.2f}'
        };

        var legend = {
            enabled: false
        };

        var series =  elementSeries;

        var titles = ['蓝色', '黄色', '橙色', '红色', '分级检验', '不分级检验'];
        var json = {};

        for (var i = 0; i < titles.length; i++){
            json.title = titles[i];
        }
        //json.title = title;
        json.subtitle = subtitle;
        json.xAxis = xAxis;
        json.yAxis = yAxis;
        json.tooltip = tooltip;
        json.legend = legend;
        json.series = series;

        $('#blue-chart').highcharts(json);
        $('#yellow-chart').highcharts(json);
        $('#orange-chart').highcharts(json);
        $('#red-chart').highcharts(json);
        $('#level-chart').highcharts(json);
        $('#no-level-chart').highcharts(json);
    };

    this.ShowBlueDepartmentChart = function (elementSeries) {
        $('#blue-chart').highcharts({
            title: {
                text: '蓝色'
            },
            chart: {
                type: 'column'
            },
            subtitle: {
                text: null
            },
            credits: {
                enabled: false
            },
            colors: ['#00fff5', '#899ff5', '#00b7ee', '#ffc36a', '#f19ec2', '#aa89bd', '#54aefa'],
            xAxis: {
                categories: ['准确率', '命中率', '空报率', '漏报率', 'T1', 'T2', 'T3'],
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

            tooltip: {
                headerFormat: '{point.x}<br>',
                pointFormat: '分值：{point.y:.2f}'
            },
            series: elementSeries
        });
    };

    this.ShowYellowDepartmentChart = function (elementSeries) {
        $('#yellow-chart').highcharts({
            title: {
                text: '黄色'
            },
            chart: {
                type: 'column'
            },
            subtitle: {
                text: null
            },
            credits: {
                enabled: false
            },
            colors: ['#00fff5', '#899ff5', '#00b7ee', '#ffc36a', '#f19ec2', '#aa89bd', '#54aefa'],
            xAxis: {
                categories: ['准确率', '命中率', '空报率', '漏报率', 'T1', 'T2', 'T3'],
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

            tooltip: {
                headerFormat: '{point.x}<br>',
                pointFormat: '分值：{point.y:.2f}'
            },
            series: elementSeries
        });
    };

    this.ShowOrangeDepartmentChart = function (elementSeries) {
        $('#orange-chart').highcharts({
            title: {
                text: '橙色'
            },
            chart: {
                type: 'column'
            },
            subtitle: {
                text: null
            },
            credits: {
                enabled: false
            },
            colors: ['#00fff5', '#899ff5', '#00b7ee', '#ffc36a', '#f19ec2', '#aa89bd', '#54aefa'],
            xAxis: {
                categories: ['准确率', '命中率', '空报率', '漏报率', 'T1', 'T2', 'T3'],
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

            tooltip: {
                headerFormat: '{point.x}<br>',
                pointFormat: '分值：{point.y:.2f}'
            },
            series: elementSeries
        });
    };

    this.ShowRedDepartmentChart = function (elementSeries) {
        $('#red-chart').highcharts({
            title: {
                text: '红色'
            },
            chart: {
                type: 'column'
            },
            subtitle: {
                text: null
            },
            credits: {
                enabled: false
            },
            colors: ['#00fff5', '#899ff5', '#00b7ee', '#ffc36a', '#f19ec2', '#aa89bd', '#54aefa'],
            xAxis: {
                categories: ['准确率', '命中率', '空报率', '漏报率', 'T1', 'T2', 'T3'],
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

            tooltip: {
                headerFormat: '{point.x}<br>',
                pointFormat: '分值：{point.y:.2f}'
            },
            series: elementSeries
        });
    };

    this.ShowLevelDepartmentChart = function (elementSeries) {
        $('#level-chart').highcharts({
            title: {
                text: '分级检验'
            },
            chart: {
                type: 'column'
            },
            subtitle: {
                text: null
            },
            credits: {
                enabled: false
            },
            colors: ['#00fff5', '#899ff5', '#00b7ee', '#ffc36a', '#f19ec2', '#aa89bd', '#54aefa'],
            xAxis: {
                categories: ['准确率', '命中率', '空报率', '漏报率', 'T1', 'T2', 'T3'],
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

            tooltip: {
                headerFormat: '{point.x}<br>',
                pointFormat: '分值：{point.y:.2f}'
            },
            series: elementSeries
        });
    };

    this.ShowNoLevelDepartmentChart = function (elementSeries) {
        $('#no-level-chart').highcharts({
            title: {
                text: '不分级检验'
            },
            chart: {
                type: 'column'
            },
            subtitle: {
                text: null
            },
            credits: {
                enabled: false
            },
            colors: ['#00fff5', '#899ff5', '#00b7ee', '#ffc36a', '#f19ec2', '#aa89bd', '#54aefa'],
            xAxis: {
                categories: ['准确率', '命中率', '空报率', '漏报率', 'T1', 'T2', 'T3'],
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

            tooltip: {
                headerFormat: '{point.x}<br>',
                pointFormat: '分值：{point.y:.2f}'
            },
            series: elementSeries
        });
    };

    this.ShowProjectTable = function (data) {
        $('#time').text($('#aging').combobox('getValue'));
        $('#project-table').find('tr td').not('.table-title').remove();

        var number = '<td>{0}</td><td>{1}</td><td>{2}</td><td>{3}</td><td>{4}</td><td>{5}</td><td>{6}</td><td>{7}</td><td>{8}</td>';
        var sample = '<td>{0}</td><td>{1}</td><td>{2}</td><td>{3}</td><td>{4}</td><td>{5}</td><td>{6}</td><td>{7}</td><td>{8}</td>';

        $('#number').append(number.format(data.rainAndSnowRate, data.rainfallGradeRate, data.heavyRainAndSnowRate, data.normalRainRate, data.minTempOneRate, data.minTempTwoRate, data.maxTempOneRate, data.maxTempTwoRate, data.totalRate));
        $('#project-sample').append(sample.format(data.rainAndSnowSample, data.rainfallGradeSample, data.heavyRainAndSnowSample, data.normalRainSample, data.minTempOneSample, data.minTempTwoSample, data.maxTempOneSample, data.maxTempTwoSample, data.totalSample));
    };
};