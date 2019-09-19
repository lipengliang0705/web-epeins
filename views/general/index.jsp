﻿<!DOCTYPE html>
<html lang="en" data-ng-app="app">
<%@ include file="/common/taglibs.jsp" %>
<%@ page language="java" isErrorPage="true" pageEncoding="UTF-8" contentType="text/html;charset=utf-8" %>
<head>
  <meta charset="utf-8" />
  <title>仁聚融资租赁|管理平台</title>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
  <link rel="stylesheet" href="views/css/bootstrap.css" type="text/css" />
  <link rel="stylesheet" href="views/css/animate.css" type="text/css" />
  <link rel="stylesheet" href="views/css/font-awesome.min.css" type="text/css" />
  <link rel="stylesheet" href="views/css/simple-line-icons.css" type="text/css" />
  <link rel="stylesheet" href="views/vendor/modules/dialog/dialogs.css" type="text/css" />
  <link rel="stylesheet" href="views/vendor/modules/angularjs-toaster/toaster.css" type="text/css" />  
  <!-- <link rel="stylesheet" href="views/css/font.css" type="text/css" /> -->
  <link rel="stylesheet" href="views/css/app.css" type="text/css" />
</head>
<body ng-controller="AppCtrl">
  <span us-spinner="{radius:30, width:8, length: 16}"></span>
  <!-- toaster directive -->
  <toaster-container toaster-options="{'position-class': 'toast-top-right', 'close-button':true}"></toaster-container>
  <!-- / toaster directive -->
  
  <div class="app" id="app" ng-class="{'app-header-fixed':app.settings.headerFixed, 'app-aside-fixed':app.settings.asideFixed, 'app-aside-folded':app.settings.asideFolded, 'app-aside-dock':app.settings.asideDock, 'container':app.settings.container}" ui-view></div>


  <!-- jQuery -->
  <script src="views/vendor/jquery/jquery.min.js"></script>
  
  <!-- Angular -->
  <script src="views/vendor/angular/angular.js"></script>
  <script src="views/vendor/angular/angular-locale_zh-cn.js"></script>
  <script src="views/vendor/angular/angular-animate/angular-animate.js"></script>
  <script src="views/vendor/angular/angular-cookies/angular-cookies.js"></script>
  <script src="views/vendor/angular/angular-resource/angular-resource.js"></script>
  <script src="views/vendor/angular/angular-sanitize/angular-sanitize.js"></script>
  <script src="views/vendor/angular/angular-touch/angular-touch.js"></script>


  <!-- ladash, restangular-->
  <script src="views/vendor/modules/lodash/lodash.min.js"></script>   
  <script src="views/vendor/modules/restangular/restangular.min.js"></script> 

  <!-- Vendor -->
  <script src="views/vendor/angular/angular-ui-router/angular-ui-router.js"></script> 
  <script src="views/vendor/angular/ngstorage/ngStorage.js"></script>
 
  <!-- bootstrap -->
  <script src="views/vendor/angular/angular-bootstrap/ui-bootstrap-tpls.js"></script>
  <!-- lazyload -->
  <script src="views/vendor/angular/oclazyload/ocLazyLoad.js"></script>
  <!-- translate -->
  <script src="views/vendor/angular/angular-translate/angular-translate.js"></script>
  <script src="views/vendor/angular/angular-translate/loader-static-files.js"></script>
  <script src="views/vendor/angular/angular-translate/storage-cookie.js"></script>
  <script src="views/vendor/angular/angular-translate/storage-local.js"></script>

  <!-- eCharts -->
  <script src="views/vendor/modules/echarts/echarts.min.js"></script> 
  <script src="views/vendor/modules/echarts/macarons.js"></script> 
  <script src="views/vendor/modules/angular-echarts/angular-echarts.min.js"></script>  

  <!-- dialog -->
  <script src="views/vendor/modules/dialog/dialogs.js"></script> 

  <!-- toaster -->
  <script src="views/vendor/modules/angularjs-toaster/toaster.js"></script> 

  <!-- mask -->
  <script src="views/vendor/modules/ngMask/ngMask.min.js"></script> 

  <!-- loading spinner -->
  <script src="views/vendor/modules/angular-loading-spinner/spin.js"></script> 
  <script src="views/vendor/modules/angular-loading-spinner/angular-spinner.js"></script> 
  <script src="views/vendor/modules/angular-loading-spinner/angular-loading-spinner.js"></script> 
    
  <!-- web socket -->
  <script src="views/vendor/modules/websocket/angular-websocket.min.js"></script>   
  <script src="views/vendor/modules/websocket/ngSocket.js"></script>
  
  <!-- App -->
  <script src="views/js/app.js"></script>
  <script src="views/js/config.js"></script>
  <script src="views/js/config.lazyload.js"></script>
  <script src="views/js/config.router.js"></script>
  <script src="views/js/main.js"></script>
  <script src="views/js/services/ui-load.js"></script>
  <script src="views/js/filters/fromNow.js"></script>
  <script src="views/js/directives/setnganimate.js"></script>
  <script src="views/js/directives/ui-butterbar.js"></script>
  <script src="views/js/directives/ui-focus.js"></script>
  <script src="views/js/directives/ui-fullscreen.js"></script>
  <script src="views/js/directives/ui-jq.js"></script>
  <script src="views/js/directives/ui-module.js"></script>
  <script src="views/js/directives/ui-nav.js"></script>
  <script src="views/js/directives/ui-scroll.js"></script>
  <script src="views/js/directives/ui-shift.js"></script>
  <script src="views/js/directives/ui-toggleclass.js"></script>
  <script src="views/js/directives/ui-validate.js"></script>
  <script src="views/js/controllers/bootstrap.js"></script>
  <!-- Lazy loading -->
  <!-- 
   <script src="views/vendor/modules/angular-file-upload/angular-file-upload.min.js"></script> -->
</body>
</html>