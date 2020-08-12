$(function() {
    // 点击“去注册账号”的链接
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击“去登录”的链接
    $('#link_login').on('click', function() {
            $('.login-box').show()
            $('.reg-box').hide()
        })
        //注册表单的验证
        //从layui中获取form对象
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
            pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
            //验证密码确认框，输入两次一样
            repwd: function(value) {
                var pwd = $(".reg-box [name=password]").val();
                if (value !== pwd) {
                    return "两次密码不一致"
                }
            }
        })
        //发送ajax请求，提交表单
    $("#form_reg").on("submit", function(e) {
            e.preventDefault();
            var data = {
                username: $("#form_reg [name=username]").val(),
                password: $("#form_reg [name=password]").val()
            }
            $.post("/api/reguser", data, function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功，请登录');
                $("#link_login").click();
            })
        })
        //监听表单登录事件
    $("#form_login").on("submit", function(e) {
        e.preventDefault();
        $.ajax({
            method: "post",
            url: "/api/login",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('登录成功');
                localStorage.setItem("token", res.token);
                location.href = "/index.html";
            }
        })
    })
})