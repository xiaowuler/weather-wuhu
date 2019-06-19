var App = function () {
    this.Startup = function () {
        this.SetCalendar();
        $('.tab ul li').on('click', this.OnTabClick.bind(this));
    };

    this.OnTabClick = function (event) {
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
};
$(document).ready(function () {
    var app = new App();
    app.Startup();
});