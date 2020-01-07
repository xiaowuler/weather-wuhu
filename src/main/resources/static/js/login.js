var App = function () {

    this.Startup = function () {
        window.onresize = this.Relayout.bind(this);
        this.Relayout();
        this.InitCombobox();
        this.AddDepartmentOptions();
        this.getSecurityError();
        $('.remove').on('click', this.RemoveUserInputInfo.bind(this));
        $('.switch-login').on('click', this.OnEnterLoginPanel.bind(this));
        $('.switch-register').on('click', this.OnEnterRegisterPanel.bind(this));
        $('#login-button').one('click', this.OnLoginButtonClick.bind(this));
        $('#register-button').one('click', this.OnRegisterButtonClick.bind(this));
    };

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

    this.AddDepartmentOptions = function () {
        $.ajax({
            type: "POST",
            dataType: 'json',
            async: false,
            url: '/Department/RegisterDepartment',
            success: function (data) {
                $('#department').combotree({
                    panelHeight: 300,
                    valueField: 'id',
                    textField: 'text',
                    data: data,
                    editable: false,
                    onLoadSuccess: function () {
                        var status = $('#department').combotree('tree').tree('getRoots');
                        $('#department').combotree('setValue',status[0].id);
                    }
                });
            }.bind(this)
        });
    };

    this.RemoveUserInputInfo = function (event) {
        $(event.target).prev().val('');
        $(event.target).prev().focus();
    };

    this.OnEnterRegisterPanel = function () {
        $('.login').hide();
        $('.register').show();
    };

    this.OnEnterLoginPanel = function () {
        $('.login').show();
        $('.register').hide();
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

    this.CheckUserRegisterInput = function ($username, $realName, $password, $confirmPassword) {
        var flag = true;

        var errorUsernameMessage = $('.register-error-hint-username');
        var errorNameMessage = $('.error-hint-name');
        var errorPasswordMessage = $('.register-error-hint-password');
        var errorConfirmPasswordMessage = $('.error-hint-confirmPassword');

        if ($username.val() === ''){
            this.SetWarnFontColor($username);
            errorUsernameMessage.text('请输入用户名').show();
            flag = false;
        } else {
            if (this.IsExistUsername($username.val()) !== null){
                this.SetWarnFontColor($username);
                errorUsernameMessage.text('用户名重复').show();
                flag = false;
            } else {
                this.SetDefaultFontColor($username);
                errorUsernameMessage.hide();
            }
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

    this.UserRegister = function ($username, $department, $realName, $password) {
        console.log($department.combotree('getValue'));

        $.ajax({
            type: 'post',
            url: '/User/register',
            data: {
                username: $username.val(),
                departmentId: $department.combotree('getValue'),
                name: $realName.val(),
                password: $password.val()
            },
            success: function (result) {
                $('#register-state').text(result + '，即将跳转到登录界面').show();
                setTimeout(function(){
                    $('.login').show();
                    $('.register').hide();
                },2000);
            }
        });
    };

    this.SetWarnFontColor = function (element) {
        element.css('borderColor','#ff0000');
    };

    this.SetDefaultFontColor = function (element) {
        element.css('borderColor','#e0e0e0');
    };

    this.IsExistUsername = function (username) {
        var user = null;
        $.ajax({
            type: 'post',
            url: '/User/isExistUsername',
            data: {username: username},
            async: false,
            dataType: 'json',
            success: function (result) {
                user = result;
            }
        });
        return user;
    };
};

$(document).ready(function () {
    var app = new App();
    app.Startup();
});