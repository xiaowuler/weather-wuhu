var App = function () {
    this.Startup = function () {
        window.onresize = this.Relayout.bind(this);
        this.Relayout();
        this.OnSelectClick();
        this.OnFormClick();
        this.CreateSelect();
    };
    this.Relayout = function () {
        var width = $(window).width();
        var height = $(window).height();
        $(".log").width(width);
        $(".log").height(height);
    };
    this.OnSelectClick = function () {
        $('.select').change(function () {
            $(this).prev().html($('.select').find('option:selected').html());
        })
    };
    this.OnFormClick = function () {
        $(".switch-register").click(function(){
            $(this).parents(".login").hide();
            $(this).parents(".login").next().show();
        });
        $(".switch-logo").click(function(){
            $(this).parents(".register").hide();
            $(this).parents(".register").prev().show();
        });
        $(".remove").click(function(){
            $(this).prev().val('');
            $(this).prev().focus();
        })
    };
    this.CreateSelect = function () {
        var selects=$('select');//获取select
        selects.attr('class','select');
        for(var i=0;i<selects.length;i++){
            createSelect(selects[i],i);
        }
        function createSelect(container,index){
            //创建select容器，class为select-box，插入到select标签前
            var wrap=$('<div></div>');//div相当于select标签
            wrap.attr('class','select-box');
            wrap.insertBefore(container);

            //显示框class为select-show,插入到创建的wrap中
            var show=$('<div></div>');//显示框
            show.css('cursor','pointer').attr('class','select-show').appendTo(wrap);

            //创建option容器，class为select-option，插入到创建的wrap中
            var option=$('<ul></ul>');//创建option列表
            option.attr('class','select-option');
            option.appendTo(wrap);
            createOptions(index,option);//创建option

            //点击显示框
            wrap.toggle(function(){
                option.show();
                $(this).addClass('select-action');
            },function(){
                option.hide();
                $(this).removeClass('select-action');
            });

            var tag=option.find('li');
            tag.on('click',function(){
                $(this).addClass('selected').siblings().removeClass('selected');
                var value=$(this).text();
                show.text(value);
                option.hide();
            });

            tag.hover(function(){
                $(this).addClass('hover').siblings().removeClass('hover');
            },function(){
                tag.removeClass('hover');
            });

        }

        function createOptions(index,list){
            //获取被选中的元素并将其值赋值到显示框中
            var options=selects.eq(index).find('option'),
                selected=options.filter(':selected'),
                index=selected.index(),
                showBox=list.prev();
            showBox.text(selected.text());

            //为每个option建立个li并赋值
            for(var n=0;n<options.length;n++){
                var tag_option=$('<li></li>'),//li相当于option
                    txt_option=options.eq(n).text();
                tag_option.text(txt_option).css('cursor','pointer').appendTo(list);

                //为被选中的元素添加class为selected
                if(n==index){
                    tag_option.attr('class','selected');
                }
            }
        }
    }
};
$(document).ready(function () {
    var app = new App();
    app.Startup();
});