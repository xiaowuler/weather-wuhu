var App = function () {

    this.Startup = function () {
        window.onresize = this.Relayout.bind(this);
        this.Relayout();
        this.InitCombobox();
        this.RemoveUserInputInfo();
        this.SwitchRegisterOrLogin();
        this.getSecurityError();
        this.AddDepartmentOptions();

        $('#login-button').one('click', this.OnLoginButtonClick.bind(this));
        $('#register-button').one('click', this.OnRegisterButtonClick.bind(this));
    };
    
    this.submitRegister = function (e) {
        e.preventDefault();
    }

    this.Relayout = function () {
        $(".container").width($(window).width());
        $(".container").height($(window).height());
    };

    this.InitCombobox = function () {
        $('#department').combobox({
            panelHeight: '249px',
            editable: false,
        });
    };

    this.RemoveUserInputInfo = function () {
        $('.remove').click(function(){
            $(this).prev().val('');
            $(this).prev().focus();
        });
    };

    this.SwitchRegisterOrLogin = function () {
        var login = $('.login');
        var register = $('.register');

        $('.switch-register').click(function(){
            login.hide();
            register.show();
        });

        $('.switch-login').click(function(){
            register.hide();
            login.show();
        });
    };

    this.getSecurityError = function () {
        $.ajax({
            type: 'POST',
            url: '/User/getError',
            success: function (result) {
                $('#error-message').text(result).show();
            }
        });
    };

    this.OnLoginButtonClick = function () {
        $('#user-form').submit(function () {
            return this.CheckUserInput();
        }.bind(this));
    };

    this.CheckUserInput = function () {
        var flag = true;
        var $username = $('#username');
        var $password = $('#password');

        if ($username.val() === ''){
            $username.css('borderColor','#ff0000');
            $('.login-error-hint-username').show();
            flag = false;
        } else {
            $username.css('borderColor','#e0e0e0');
            $('.login-error-hint-username').hide();
        }

        if ($password.val() === ''){
            $password.css('borderColor','#ff0000');
            $('.error-hint-password').show();
            flag = false;
        } else {
            $password.css('borderColor','#e0e0e0');
            $('.error-hint-password').hide();
        }

        return flag;
    };

    this.OnRegisterButtonClick = function () {
        var $username = $('#register-username');
        var $department = $('#department');
        var $realName = $('#name');
        var $password = $('#register-password');
        var $confirmPassword = $('#register-confirmPassword');

        $('#register').on('submit', function(){
            alert(this.CheckUserRegisterInput($username, $realName, $password, $confirmPassword));
            if (this.CheckUserRegisterInput($username, $realName, $password, $confirmPassword)){
                this.UserRegister($username, $department, $realName, $password);
                alert(this.CheckUserRegisterInput($username, $realName, $password, $confirmPassword));
            }
            event.preventDefault();
        }.bind(this));
    };

    this.UserRegister = function ($username, $department, $realName, $password) {
        $.ajax({
            type: 'post',
            url: '/User/register',
            data: {
                username: $username.val(),
                departmentId: $department.val(),
                name: $realName.val(),
                password: $password.val()
            },
            success: function (result) {
                console.log(result)
            }
        });
    };

    this.CheckUserRegisterInput = function ($username, $realName, $password, $confirmPassword) {
        var flag = true;
        if ($username.val() === ''){
            $username.css('borderColor','#ff0000');
            $('.register-error-hint-username').show();
            flag = false;
        } else {
            $username.css('borderColor','#e0e0e0');
            $('.register-error-hint-username').hide();
        }

        if ($realName.val() === ''){
            $realName.css('borderColor','#ff0000');
            $('.error-hint-name').show();
            flag = false;
        } else {
            $realName.css('borderColor','#e0e0e0');
            $('.error-hint-name').hide();
        }

        if ($password.val() === ''){
            $password.css('borderColor','#ff0000');
            $('.register-error-hint-password').show();
            flag = false;
        } else {
            $password.css('borderColor','#e0e0e0');
            $('.register-error-hint-password').hide();
        }

        if ($confirmPassword.val() === ''){
            $confirmPassword.css('borderColor','#ff0000');
            $('.error-hint-confirmPassword').show();
            flag = false;
        } else {
            if ($password.val() !== $confirmPassword.val()){
                $('.error-hint-confirmPassword').text('两次密码不一致').show();
                flag = false;
            }
        }

        return flag;
    };

    this.AddDepartmentOptions = function () {
        $('#department').combobox({
            url:'/Department/getAllDepartment',
            valueField:'departId',
            textField:'departName',
            onLoadSuccess : function(){
                var data = $('#department').combobox('getData');
                if (data.length > 0) {
                    $('#department').combobox('select', data[0].departName);
                }
            }
        });
    };

};

$(document).ready(function () {
    var app = new App();
    app.Startup();
});