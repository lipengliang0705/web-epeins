<!DOCTYPE html>
<!-- 
Template Name: Metronic - Responsive Admin Dashboard Template build with Twitter Bootstrap 3.3.6
Version: 4.5.5
Author: KeenThemes
Website: http://www.keenthemes.com/
Contact: support@keenthemes.com
Follow: www.twitter.com/keenthemes
Dribbble: www.dribbble.com/keenthemes
Like: www.facebook.com/keenthemes
Purchase: http://themeforest.net/item/metronic-responsive-admin-dashboard-template/4021469?ref=keenthemes
License: You must have a valid license purchased only from themeforest(the above link) in order to legally use the theme for your project.
-->
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en">
    <!--<![endif]-->
    <!-- BEGIN HEAD -->

    <head>
        <meta charset="utf-8" />
        <title>仁聚汇通租赁 | 注册页面 </title>
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta content="" name="description" />
        <meta content="" name="author" />
        <!-- BEGIN GLOBAL MANDATORY STYLES -->
        <link href="http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700&subset=all" rel="stylesheet" type="text/css" />
        <link href="../assets/global/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
        <!-- END GLOBAL MANDATORY STYLES -->
        <!-- BEGIN THEME GLOBAL STYLES -->
        <link href="../assets/global/css/components.min.css" rel="stylesheet" id="style_components" type="text/css" />
        <!-- END THEME GLOBAL STYLES -->
        <!-- BEGIN PAGE LEVEL STYLES -->
        <link href="../assets/pages/css/login.min.css" rel="stylesheet" type="text/css" />
        <!-- END PAGE LEVEL STYLES -->
     	<!-- begin 自定义 style -->
         <link href="../css/self_define.css" rel="stylesheet" type="text/css" />
        <!-- end 自定义 style -->
       </head>
    <!-- END HEAD -->

    <body class="login">
        <!-- BEGIN LOGIN -->
        <div class="content">
            <!-- BEGIN REGISTRATION FORM -->
            <form class="register-form" action="index.html" method="post">
               <div class="logo">
                    <a href="index.html"><img src="../imgs/login_logo.png" alt="" /> </a>
                </div>
                <div class="form-group">
                    <label class="control-label visible-ie8 visible-ie9">用户名</label>
                    <input class="form-control placeholder-no-fix" type="text" placeholder="用户名" name="fullname" /> 
                </div>
                <div class="form-group">
                    <!--ie8, ie9 does not support html5 placeholder, so we just show field title for that-->
                    <label class="control-label visible-ie8 visible-ie9">电子邮件</label>
                    <input class="form-control placeholder-no-fix" type="text" placeholder="电子邮件" name="email" /> 
                </div> 
                <div class="form-group">
                	<label class="reg-warn">密码将通过电子邮件方式发送给您</label>
                    <div class="pullRightBox">
                      <a href="forget-password.html" id="forget-password" class="forget-password">忘记密码</a> <span class="line">|</span><a href="login.html"  id="register-back-btn" class="login_btn">登录</a>  
                      </div>
                </div>
                <div class="form-actions">
                    <button type="submit" id="register-submit-btn" class="btn btn-success uppercase pull-right">注册</button>
                </div>
            </form>
            <!-- END REGISTRATION FORM -->
        </div>
        <div class="bgImg"></div>
        <!--[if lt IE 9]>
<script src="../assets/global/plugins/respond.min.js"></script>
<script src="../assets/global/plugins/excanvas.min.js"></script> 
<![endif]-->
    </body>

</html>