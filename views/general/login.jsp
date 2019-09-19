<html>
<%@ include file="/common/taglibs.jsp" %>
<%@ page language="java" errorPage="/error.jsp" pageEncoding="UTF-8" contentType="text/html;charset=utf-8" %>
    <head>
        <meta charset="utf-8" />
        <title>仁聚汇通租赁|登录页面 </title>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <!-- BEGIN GLOBAL MANDATORY STYLES -->
        <link href="assets/global/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
        <!-- END GLOBAL MANDATORY STYLES -->
        <!-- BEGIN THEME GLOBAL STYLES -->
        <link href="assets/global/css/components.min.css" rel="stylesheet" type="text/css" />
        <!-- END THEME GLOBAL STYLES -->
        <!-- BEGIN PAGE LEVEL STYLES -->
        <link href="assets/pages/css/login.min.css" rel="stylesheet" type="text/css" />
        <!-- END PAGE LEVEL STYLES -->
		<!-- begin 自定义 style -->
         <link rel="stylesheet" href="views/css/self_define.css"  type="text/css" />
        <!-- end 自定义 style -->
     
       </head>
    <!-- END HEAD -->

    <body class="login">
        <!-- BEGIN LOGIN -->
        <div class="content">
            <!-- BEGIN LOGIN FORM -->
            <form class="login-form" action="${ctx}/login" method="post">
                 <!-- BEGIN LOGO -->
                <div class="logo">
                    <a href="index.html">
                        <img src="views/img/login_logo.png" alt="" /> </a>
                </div>
                <!-- END LOGO -->
                <div class="form-group">
                    <!--ie8, ie9 does not support html5 placeholder, so we just show field title for that-->
                    <label class="control-label visible-ie8 visible-ie9">用户名</label>
                    <input class="form-control form-control-solid placeholder-no-fix" type="text" autocomplete="off" placeholder="用户名" name="username" /> </div>
                <div class="form-group">
                    <label class="control-label visible-ie8 visible-ie9">密码</label>
                    <input class="form-control form-control-solid placeholder-no-fix" type="password" autocomplete="off" placeholder="密码" name="password" /> 
                    </div>
                <div class="form-group">
                	<label class="rememberme check"><input type="checkbox" name="remember" value="1" />下次自动登录</label>
                      <div class="pullRightBox">
                      		<a href="forget-password.html" id="forget-password" class="forget-password">忘记密码</a> <span class="line">|</span> <a href="register.html" class="reg" id="register-btn">注册</a>
                      </div>
                </div>
                <div class="form-actions">
                    <button type="submit" class="btn uppercase">登录</button>                  
                </div>
            </form>
            <!-- END LOGIN FORM -->
        </div>
        <div class="bgImg"></div>
        <!--[if lt IE 9]>
<script src="views/assets/global/plugins/respond.min.js"></script>
<script src="views/assets/global/plugins/excanvas.min.js"></script> 
<![endif]-->
    
       
    </body>

</html>