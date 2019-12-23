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
        var errorUsernameMessage = $('.login-error-hint-username');
        var errorPasswordMessage = $('.error-hint-password');

        if ($username.val() === ''){
            this.SetWarnFontColor($username);
            errorUsernameMessage.show();
            flag = false;
        } else {
            this.SetDefaultFontColor($username);
            errorUsernameMessage.hide();
        }

        if ($password.val() === ''){
            this.SetWarnFontColor($password);
            errorPasswordMessage.show();
            flag = false;
        } else {
            this.SetDefaultFontColor($password);
            errorPasswordMessage.hide();
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
            if (this.CheckUserRegisterInput($username, $realName, $password, $confirmPassword)){
                this.UserRegister($username, $department, $realName, $password);
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
                departmentId: $department.combobox('getValue'),
                name: $realName.val(),
                password: $password.val()
            },
            success: function (result) {
                $('#register-state').text(result).show();
            }
        });
    };

    this.CheckUserRegisterInput = function ($username, $realName, $password, $confirmPassword) {
        var flag = true;
        var errorUsernameMessage = $('.register-error-hint-username');
        var errorNameMessage = $('.error-hint-name');
        var errorPasswordMessage = $('.register-error-hint-password');
        var errorConfirmPasswordMessage = $('.error-hint-confirmPassword');

        if ($username.val() === ''){
            this.SetWarnFontColor($username);
            errorUsernameMessage.show();
            flag = false;
        } else {
            this.IsExistUsername($username.val(), function (user) {
                if (user !== null){
                    this.SetWarnFontColor($username);
                    errorUsernameMessage.text('用户名重复').show();
                    flag = false;
                } else {
                    this.SetDefaultFontColor($username);
                    errorUsernameMessage.hide();
                }
            }.bind(this));
        }

        if ($realName.val() === ''){
            this.SetWarnFontColor($realName);
            errorNameMessage.show();
            flag = false;
        } else {
            this.SetDefaultFontColor($realName);
            errorNameMessage.hide();
        }

        if ($password.val() === ''){
            this.SetWarnFontColor($password);
            errorPasswordMessage.show();
            flag = false;
        } else {
            this.SetDefaultFontColor($password);
            errorPasswordMessage.hide();
        }

        if ($confirmPassword.val() === ''){
            this.SetWarnFontColor($confirmPassword);
            errorConfirmPasswordMessage.show();
            flag = false;
        } else {
            this.SetDefaultFontColor($confirmPassword);
            errorConfirmPasswordMessage.hide();

            if ($password.val() !== $confirmPassword.val()){
                this.SetWarnFontColor($confirmPassword);
                errorConfirmPasswordMessage.text('两次密码不一致').show();
                flag = false;
            }
        }

        return flag;
    };

    this.SetWarnFontColor = function (element) {
        element.css('borderColor','#ff0000');
    };

    this.SetDefaultFontColor = function (element) {
        element.css('borderColor','#e0e0e0');
    };

    this.IsExistUsername = function (username, callback) {
        $.ajax({
            type: 'post',
            url: '/User/isExistUsername',
            data: {username: username},
            dataType: 'json',
            success: function (user) {
                callback(user);
            }
        });
    };

    this.AddDepartmentOptions = function () {
        $('#department').combobox({
            url:'/Department/getAllDepartment',
            valueField: 'departId',
            textField: 'departName',
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