var Project = function (parent) {
    this.blueChart = $('#blue-chart');
    this.yellowChart = $('#yellow-chart');
    this.orangeChart = $('#orange-chart');
    this.redChart = $('#red-chart');
    this.levelChart = $('#level-chart');
    this.noLevelChart = $('#no-level-chart');

    this.Reload = function (result) {
        console.log(result)
        this.result = result;

        this.ShowDepartmentChart();
    };

    this.GetChartElementValues = function () {
        var types = [];
        var correctRate = [];
        var hitRate = [];
        var emptyReportRate = [];
        var missingReportRate = [];
        var t1 = [];
        var t2 = [];
        var t3 = [];
        var blueValue = [];
        var yellowValue = [];
        var orangeValue = [];
        var redValue = [];
        var levelValue = [];
        var noLevelValue = [];
        if (this.result === null)
            return;

        var blue = this.result.blueWarningType;
        var yellow = this.result.yellowWarningType;
        var orange = this.result.orangeWarningType;
        var red = this.result.redWarningType;
        var level = this.result.levelWarningType;
        var noLevel = this.result.noLevelWarningType;
        types.push(blue, yellow, orange, red, level, noLevel);

        types.forEach(function (item) {
            if (item !== null){
                correctRate.push((item.correctRate) * 100);
                hitRate.push((item.hitRate) * 100);
                emptyReportRate.push((item.emptyReportRate) * 100);
                missingReportRate.push((item.missingReportRate) * 100);
                t1.push(item.t1);
                t2.push(item.t2);
                t3.push(item.t3);
            }
        }.bind(this));

        blueValue.push(correctRate[0], hitRate[0], emptyReportRate[0], missingReportRate[0], t1[0], t2[0], t3[0]);
        yellowValue.push(correctRate[1], hitRate[1], emptyReportRate[1], missingReportRate[1], t1[1], t2[1], t3[1]);
        orangeValue.push(correctRate[2], hitRate[2], emptyReportRate[2], missingReportRate[2], t1[2], t2[2], t3[2]);
        redValue.push(correctRate[3], hitRate[3], emptyReportRate[3], missingReportRate[3], t1[3], t2[3], t3[3]);
        levelValue.push(correctRate[4], hitRate[4], emptyReportRate[4], missingReportRate[4], t1[4], t2[4], t3[4]);
        noLevelValue.push(correctRate[5], hitRate[5], emptyReportRate[5], missingReportRate[5], t1[5], t2[5], t3[5]);

        return {
            blueValue: blueValue,
            yellowValue: yellowValue,
            orangeValue: orangeValue,
            redValue: redValue,
            levelValue: levelValue,
            noLevelValue: noLevelValue,
        }
    };

    this.ShowDepartmentChart = function () {
        var title = {
            text: '颜色'
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
            categories: ['准确率', '命中率', '空报率', '漏报率', 'T1', 'T2', 'T3']
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
            pointWidth: 30
        };

        var legend = {
            enabled: false
        };

        var series = {
            data: [],
            color: 'red'
        };

        var json = {};

        var params = this.GetChartElementValues();

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

        this.blueChart.highcharts(json);
        this.yellowChart.highcharts(json);
        this.orangeChart.highcharts(json);
        this.redChart.highcharts(json);
        this.levelChart.highcharts(json);
        this.noLevelChart.highcharts(json);

        this.blueChart.highcharts().setTitle( {text: '蓝色'});
        this.yellowChart.highcharts().setTitle( {text: '黄色'});
        this.orangeChart.highcharts().setTitle( {text: '橙色'});
        this.redChart.highcharts().setTitle( {text: '红色'});
        this.levelChart.highcharts().setTitle( {text: '分级检验'});
        this.noLevelChart.highcharts().setTitle( {text: '不分级检验'});

        this.blueChart.highcharts().addSeries({
            data: params.blueValue,
            color: '#3aa2ff'
        });

        this.yellowChart.highcharts().addSeries({
            data: params.yellowValue,
            color: '#FFF95D'
        });

        this.orangeChart.highcharts().addSeries({
            data: params.orangeValue,
            color: '#ff9a30'
        });

        this.redChart.highcharts().addSeries({
            data: params.redValue,
            color: '#ff3324'
        });

        this.levelChart.highcharts().addSeries({
            data: params.levelValue,
            color: '#B1FFFA'
        });

        this.noLevelChart.highcharts().addSeries({
            data: params.noLevelValue,
            color: '#4EFFC7'
        });
    };

    this.ShowProjectTable = function (data) {
        $('#type').text($('#warning-type').combobox('getText'));
        $('#from-time').text(moment($("#start-time").datebox('getValue')).format('YYYY年MM月DD日'));
        $('#to-time').text(moment($("#end-time").datebox('getValue')).format('YYYY年MM月DD日'));
        $('#project-table').find('tr td').not('.table-title').remove();

        var param = '<td>{0}</td><td>{1}</td><td>{2}</td><td>{3}</td><td>{4}</td><td>{5}</td><td>{6}</td>';

        if (data.blueWarningType !== null)
            $('#blue').append(param.format(data.blueWarningType.correctRate, data.blueWarningType.hitRate, data.blueWarningType.emptyReportRate, data.blueWarningType.missingReportRate, data.blueWarningType.t1, data.blueWarningType.t2, data.blueWarningType.t3));


        if (data.yellowWarningType !== null)
            $('#yellow').append(param.format(data.yellowWarningType.correctRate, data.yellowWarningType.hitRate, data.yellowWarningType.emptyReportRate, data.yellowWarningType.missingReportRate, data.yellowWarningType.t1, data.yellowWarningType.t2, data.yellowWarningType.t3));

        if (data.orangeWarningType !== null)
            $('#orange').append(param.format(data.orangeWarningType.correctRate, data.orangeWarningType.hitRate, data.orangeWarningType.emptyReportRate, data.orangeWarningType.missingReportRate, data.orangeWarningType.t1, data.orangeWarningType.t2, data.orangeWarningType.t3));

        if (data.redWarningType !== null)
            $('#red').append(param.format(data.redWarningType.correctRate, data.redWarningType.hitRate, data.redWarningType.emptyReportRate, data.redWarningType.missingReportRate, data.redWarningType.t1, data.redWarningType.t2, data.redWarningType.t3));

        if (data.levelWarningType !== null)
            $('#all').append(param.format(data.levelWarningType.correctRate, data.levelWarningType.hitRate, data.levelWarningType.emptyReportRate, data.levelWarningType.missingReportRate, data.levelWarningType.t1, data.levelWarningType.t2, data.levelWarningType.t3));

        if (data.noLevelWarningType !== null)
            $('#no-level').append(param.format(data.noLevelWarningType.correctRate, data.noLevelWarningType.hitRate, data.noLevelWarningType.emptyReportRate, data.noLevelWarningType.missingReportRate, data.noLevelWarningType.t1, data.noLevelWarningType.t2, data.noLevelWarningType.t3));
    };

    this.OnDownloadButtonClick = function () {
        $("#project-table").table2excel({
            exclude: ".noExl",
            name: "Excel Document Name",
            filename: "安徽省气象灾害预警信号质量检验报表.xls"
        });
    };
};