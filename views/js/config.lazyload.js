// lazyload config

angular.module('app')
    /**
   * jQuery plugin config use ui-jq directive , config the js and css files that required
   * key: function name of the jQuery plugin
   * value: array of the css js file located
   */
  .constant('JQ_CONFIG', {
      easyPieChart:   ['views/vendor/jquery/charts/easypiechart/jquery.easy-pie-chart.js'],
      sparkline:      ['views/vendor/jquery/charts/sparkline/jquery.sparkline.min.js'],
      plot:           ['views/vendor/jquery/charts/flot/jquery.flot.min.js', 
                          'views/vendor/jquery/charts/flot/jquery.flot.resize.js',
                          'views/vendor/jquery/charts/flot/jquery.flot.tooltip.min.js',
                          'views/vendor/jquery/charts/flot/jquery.flot.spline.js',
                          'views/vendor/jquery/charts/flot/jquery.flot.orderBars.js',
                          'views/vendor/jquery/charts/flot/jquery.flot.pie.min.js'],
      slimScroll:     ['views/vendor/jquery/slimscroll/jquery.slimscroll.min.js'],
      sortable:       ['views/vendor/jquery/sortable/jquery.sortable.js'],
      nestable:       ['views/vendor/jquery/nestable/jquery.nestable.js',
                          'views/vendor/jquery/nestable/nestable.css'],
      filestyle:      ['views/vendor/jquery/file/bootstrap-filestyle.min.js'],
      slider:         ['views/vendor/jquery/slider/bootstrap-slider.js',
                          'views/vendor/jquery/slider/slider.css'],
      chosen:         ['views/vendor/jquery/chosen/chosen.jquery.min.js',
                          'views/vendor/jquery/chosen/chosen.css'],
      TouchSpin:      ['views/vendor/jquery/spinner/jquery.bootstrap-touchspin.min.js',
                          'views/vendor/jquery/spinner/jquery.bootstrap-touchspin.css'],
      wysiwyg:        ['views/vendor/jquery/wysiwyg/bootstrap-wysiwyg.js',
                          'views/vendor/jquery/wysiwyg/jquery.hotkeys.js'],
      dataTable:      ['views/vendor/jquery/datatables/jquery.dataTables.min.js',
                          'views/vendor/jquery/datatables/dataTables.bootstrap.js',
                          'views/vendor/jquery/datatables/dataTables.bootstrap.css'],
      vectorMap:      ['views/vendor/jquery/jvectormap/jquery-jvectormap.min.js', 
                          'views/vendor/jquery/jvectormap/jquery-jvectormap-world-mill-en.js',
                          'views/vendor/jquery/jvectormap/jquery-jvectormap-us-aea-en.js',
                          'views/vendor/jquery/jvectormap/jquery-jvectormap.css'],
      footable:       ['views/vendor/jquery/footable/footable.all.min.js',
                          'views/vendor/jquery/footable/footable.core.css']
      }
  )
  // oclazyload config
  .config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
      // We configure ocLazyLoad to use the lib script.js as the async loader
      $ocLazyLoadProvider.config({
          debug:  false,
          events: true,
          modules: [
              {
                  name: 'eCharts',
                  files: [
                      'views/vendor/modules/echarts/echartsModule.js',
                  ]
              },
              {
                  name: 'ngTable',
                  files: [
                      'views/vendor/modules/ng-table/ng-table.min.js',
                      'views/vendor/modules/ng-table/ng-table.css'
                  ]
              },
              {
                  name: 'ngGrid',
                  files: [
                      'views/vendor/modules/ng-grid/ng-grid.min.js',
                      'views/vendor/modules/ng-grid/ng-grid.min.css',
                      'views/vendor/modules/ng-grid/theme.css'
                  ]
              },
              {
                  name: 'ui.select',
                  files: [
                      'views/vendor/modules/angular-ui-select/select.min.js',
                      'views/vendor/modules/angular-ui-select/select.min.css'
                  ]
              },
              {
                  name:'angularFileUpload',
                  files: [
                    'views/vendor/modules/angular-file-upload/angular-file-upload.min.js'
                  ]
              },
              {
                  name:'ui.calendar',
                  files: ['views/vendor/modules/angular-ui-calendar/calendar.js']
              },
              {
                  name: 'ngImgCrop',
                  files: [
                      'views/vendor/modules/ngImgCrop/ng-img-crop.js',
                      'views/vendor/modules/ngImgCrop/ng-img-crop.css'
                  ]
              },
              {
                  name: 'angularBootstrapNavTree',
                  files: [
                      'views/vendor/modules/angular-bootstrap-nav-tree/abn_tree_directive.js',
                      'views/vendor/modules/angular-bootstrap-nav-tree/abn_tree.css'
                  ]
              },
              {
                  name: 'toaster',
                  files: [
                      'views/vendor/modules/angularjs-toaster/toaster.js',
                      'views/vendor/modules/angularjs-toaster/toaster.css'
                  ]
              },
              {
                  name: 'textAngular',
                  files: [
                      'views/vendor/modules/textAngular/textAngular-sanitize.min.js',
                      'views/vendor/modules/textAngular/textAngular.min.js'
                  ]
              },
              {
                  name: 'vr.directives.slider',
                  files: [
                      'views/vendor/modules/angular-slider/angular-slider.min.js',
                      'views/vendor/modules/angular-slider/angular-slider.css'
                  ]
              },
              {
                  name: 'com.2fdevs.videogular',
                  files: [
                      'views/vendor/modules/videogular/videogular.min.js'
                  ]
              },
              {
                  name: 'com.2fdevs.videogular.plugins.controls',
                  files: [
                      'views/vendor/modules/videogular/plugins/controls.min.js'
                  ]
              },
              {
                  name: 'com.2fdevs.videogular.plugins.buffering',
                  files: [
                      'views/vendor/modules/videogular/plugins/buffering.min.js'
                  ]
              },
              {
                  name: 'com.2fdevs.videogular.plugins.overlayplay',
                  files: [
                      'views/vendor/modules/videogular/plugins/overlay-play.min.js'
                  ]
              },
              {
                  name: 'com.2fdevs.videogular.plugins.poster',
                  files: [
                      'views/vendor/modules/videogular/plugins/poster.min.js'
                  ]
              },
              {
                  name: 'com.2fdevs.videogular.plugins.imaads',
                  files: [
                      'views/vendor/modules/videogular/plugins/ima-ads.min.js'
                  ]
              },
              {
                  name: 'ngFileUpload',
                  files: [
                      'views/vendor/modules/ng-file-upload/ng-file-upload.min.js'
                  ]
              }
          ]
      });
  }])
;