'use strict';

/**
 * Config for the router
 */
angular.module('app')
  .constant('_', window._)
  .run(
    //[          '$rootScope', '$state', '$stateParams', 'ngWrap',
    //  function ($rootScope,   $state,   $stateParams,   ngWrap) {
	[          '$rootScope', '$state', '$stateParams',
      function ($rootScope,   $state,   $stateParams) {	  
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;
		  $rootScope._ = window._; // Lodash
		  //ngWrap('_');
      }
    ]
  )
  .config(
    [          '$stateProvider', '$urlRouterProvider',
      function ($stateProvider,   $urlRouterProvider) {
          
          $urlRouterProvider
              .otherwise('/login');
          $stateProvider
              .state('login', {
                  url: '/login',
                  templateUrl: 'views/tpl/login/login.html',
                  resolve: {
                    deps: ['$ocLazyLoad',
                      function( $ocLazyLoad ){
                        return $ocLazyLoad.load(['views/js/controllers/login/login.js']);
                    }]
                  }
              })
              .state('app', {
                  abstract: true,
                  url: '/app',
                  templateUrl: 'views/tpl/app.html'
              })
              .state('app.s0', {
                  url: '/index',
                  template: '<div ui-view class="fade-in-up"></div>',
              })
              .state('app.demo', {
                  url: '/tenant',
                  template: '<div ui-view class="fade-in-up"></div>'
              })
              .state('app.demo.demo1', {
                  url: '/list',
                  templateUrl: 'views/tpl/tenant/tenant-list.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['ngTable']).then(
                              function(){
                                 return $ocLazyLoad.load('views/js/controllers/tenant/tenant-list.js');
                              }
                          );
                        }
                      ]
                  }
              })
                .state('app.s1', {
                    url: '/product-plan',
                    template: '<div ui-view class="fade-in-up"></div>'
                })
                // .state('app.s1.oredictionary-mgmt', {
                //   url: '/oredictionary',
                //   templateUrl: 'views/tpl/master/oredictionary.html',
                //   resolve: {
                //       deps: ['$ocLazyLoad',
                //         function( $ocLazyLoad ){
                //           return $ocLazyLoad.load(['ngTable']).then(
                //               function(){
                //                  return $ocLazyLoad.load('views/js/controllers/ore/oredictionary.js');
                //               }
                //           );
                //         }
                //       ]
                //   }
                // })
                .state('app.s1.product-plan-mgmt', {
                  url: '/product-plan',
                  templateUrl: 'views/tpl/product-plan/product-plan.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['ngTable']).then(
                              function(){
                                 return $ocLazyLoad.load('views/js/controllers/product-plan/productPlan.js');
                              }
                          );
                        }
                      ]
                  }
                })
                .state('app.s1.product-admin-mgmt', {
                      url: '/product-admin',
                      templateUrl: 'views/tpl/product-admin/product-admin.html',
                      resolve: {
                          deps: ['$ocLazyLoad',
                            function( $ocLazyLoad ){
                              return $ocLazyLoad.load(['ngTable']).then(
                                  function(){
                                     return $ocLazyLoad.load('views/js/controllers/product-admin/productAdmin.js');
                                  }
                              );
                            }
                          ]
                      }
                })
                .state('app.s2', {
                    url: '/enter-packing',
                    template: '<div ui-view class="fade-in-up"></div>'
                })
                .state('app.s2.enter-packing-mgmt', {
                      url: '/enter-packing',
                      templateUrl: 'views/tpl/enter-packing/enter-packing.html',
                      resolve: {
                          deps: ['$ocLazyLoad',
                            function( $ocLazyLoad ){
                              return $ocLazyLoad.load(['ngTable']).then(
                                  function(){
                                     return $ocLazyLoad.load('views/js/controllers/enter-packing/enter-packing.js');
                                  }
                              );
                            }
                          ]
                      }
                }) 
                //包装数据查询
                .state('app.s2.pack-check-mgmt', {
                      url: '/pack-check',
                      templateUrl: 'views/tpl/pack-check/pack-check.html',
                      resolve: {
                          deps: ['$ocLazyLoad',
                            function( $ocLazyLoad ){
                              return $ocLazyLoad.load(['ngTable']).then(
                                  function(){
                                     return $ocLazyLoad.load('views/js/controllers/pack-check/pack-check.js');
                                  }
                              );
                            }
                          ]
                      }
                })
                .state('app.s3', {
                    url: '/inspection',
                    template: '<div ui-view class="fade-in-up"></div>'
                })
                //来料检验报告
                .state('app.s3.incoming-report-mgmt', {
                      url: '/incoming-report',
                      templateUrl: 'views/tpl/incoming-report/incoming-report.html',
                      resolve: {
                          deps: ['$ocLazyLoad',
                            function( $ocLazyLoad ){
                              return $ocLazyLoad.load(['ngTable']).then(
                                  function(){
                                     return $ocLazyLoad.load('views/js/controllers/incoming-report/incoming-report.js');
                                  }
                              );
                            }
                          ]
                      }
                })
                //生产首检报告
                .state('app.s3.first-report-mgmt', {
                      url: '/first-report',
                      templateUrl: 'views/tpl/first-report/first-report.html',
                      resolve: {
                          deps: ['$ocLazyLoad',
                            function( $ocLazyLoad ){
                              return $ocLazyLoad.load(['ngTable']).then(
                                  function(){
                                     return $ocLazyLoad.load('views/js/controllers/first-report/first-report.js');
                                  }
                              );
                            }
                          ]
                      }
                })
                //工程巡检报告
                .state('app.s3.inspect-report-mgmt', {
                      url: '/inspect-report',
                      templateUrl: 'views/tpl/inspect-report/inspect-report.html',
                      resolve: {
                          deps: ['$ocLazyLoad',
                            function( $ocLazyLoad ){
                              return $ocLazyLoad.load(['ngTable']).then(
                                  function(){
                                     return $ocLazyLoad.load('views/js/controllers/inspect-report/inspect-report.js');
                                  }
                              );
                            }
                          ]
                      }
                })
                //最终检验报告
                .state('app.s3.final-report-mgmt', {
                      url: '/final-report',
                      templateUrl: 'views/tpl/final-report/final-report.html',
                      resolve: {
                          deps: ['$ocLazyLoad',
                            function( $ocLazyLoad ){
                              return $ocLazyLoad.load(['ngTable']).then(
                                  function(){
                                     return $ocLazyLoad.load('views/js/controllers/final-report/final-report.js');
                                  }
                              );
                            }
                          ]
                      }
                })                        
                .state('app.s4', {
                  url: '/import',
                  template: '<div ui-view class="fade-in-up"></div>'
                })
                //采购/销售计划导入   
                .state('app.s4.psales-import-mgmt', {
                  url: '/techniques',
                  templateUrl: 'views/tpl/psales-import/psales-import.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['ngTable']).then(
                              function(){
                                 return $ocLazyLoad.load('views/js/controllers/psales-import/psales-import.js');
                              }
                          );
                        }
                      ]
                  }
                })
                //采购到达计划维护   
                .state('app.s4.purchase-defend-mgmt', {
                  url: '/purchase-defend',
                  templateUrl: 'views/tpl/purchase-defend/purchase-defend.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['ngTable']).then(
                              function(){
                                 return $ocLazyLoad.load('views/js/controllers/purchase-defend/purchase-defend.js');
                              }
                          );
                        }
                      ]
                  }
                })
                //销售出库计划维护   
                .state('app.s4.sale-defend-mgmt', {
                  url: '/sale-defend',
                  templateUrl: 'views/tpl/sale-defend/sale-defend.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['ngTable']).then(
                              function(){
                                 return $ocLazyLoad.load('views/js/controllers/sale-defend/sale-defend.js');
                              }
                          );
                        }
                      ]
                  }
                })
                .state('app.s5', {
                  url: '/bigscreen',
                  template: '<div ui-view class="fade-in-up"></div>'
                })  
                //生产车间1 
                .state('app.s5.workshop-screen-mgmt', {
                  url: '/workshop-screen',
                  templateUrl: 'views/tpl/workshop-screen/workshop-screen.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['ngTable']).then(
                              function(){
                                 return $ocLazyLoad.load('views/js/controllers/workshop-screen/workshop-screen.js');
                              }
                          );
                        }
                      ]
                  }
                })
                //包装检验大屏 
                .state('app.s5.packing-screen-mgmt', {
                  url: '/packing-screen',
                  templateUrl: 'views/tpl/packing-screen/packing-screen.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['ngTable']).then(
                              function(){
                                 return $ocLazyLoad.load('views/js/controllers/packing-screen/packing-screen.js');
                              }
                          );
                        }
                      ]
                  }
                })
                //仓库大屏 
                .state('app.s5.storehouse-screen-mgmt', {
                  url: '/storehouse-screen',
                  templateUrl: 'views/tpl/storehouse-screen/storehouse-screen.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['ngTable']).then(
                              function(){
                                 return $ocLazyLoad.load('views/js/controllers/storehouse-screen/storehouse-screen.js');
                              }
                          );
                        }
                      ]
                  }
                })
                .state('app.s6', {
                  url: '/basicdata',
                  template: '<div ui-view class="fade-in-up"></div>'
                })  
                //生产基础数据维护 
                .state('app.s6.product-basedata-mgmt', {
                  url: '/product-basedata',
                  templateUrl: 'views/tpl/product-basedata/product-basedata.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['ngTable']).then(
                              function(){
                                 return $ocLazyLoad.load('views/js/controllers/product-basedata/product-basedata.js');
                              }
                          );
                        }
                      ]
                  }
                })
                //机型基础数据维护 
                .state('app.s6.model-basedata-mgmt', {
                  url: '/model-basedata',
                  templateUrl: 'views/tpl/model-basedata/model-basedata.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['ngTable']).then(
                              function(){
                                 return $ocLazyLoad.load('views/js/controllers/model-basedata/model-basedata.js');
                              }
                          );
                        }
                      ]
                  }
                })
                //产品检验标准基础数据维护 
                .state('app.s6.teststandard-basedata-mgmt', {
                  url: '/teststandard-basedata',
                  templateUrl: 'views/tpl/teststandard-basedata/teststandard-basedata.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['ngTable']).then(
                              function(){
                                 return $ocLazyLoad.load('views/js/controllers/teststandard-basedata/teststandard-basedata.js');
                              }
                          );
                        }
                      ]
                  }
                })
                .state('app.s8', {
                  url: '/realtime',
                  template: '<div ui-view class="fade-in-up"></div>'
                })
                .state('app.s8.realtime-list-mgmt', {
                  url: '/realtime-list',
                  templateUrl: 'views/tpl/realtime-list/realtime-list.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['ngTable']).then(
                              function(){
                                 return $ocLazyLoad.load('views/js/controllers/realtime-list/realtime-list.js');
                              }
                          );
                        }
                      ]
                  }
                })   
                .state('app.s8.realtime-mgmt', {
                  url: '/realtime',
                  templateUrl: 'views/tpl/realtime/realtime.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['ngTable']).then(
                              function(){
                                 return $ocLazyLoad.load('views/js/controllers/realtime/realtime-black.js');
                              }
                          );
                        }
                      ]
                  }
                })
                .state('app.s8.realtime-data-mgmt', {
                  url: '/realtime-data',
                  templateUrl: 'views/tpl/realtime-data/realtime-data.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['ngTable']).then(
                              function(){
                                 return $ocLazyLoad.load('views/js/controllers/realtime-data/realtime-data.js');
                              }
                          );
                        }
                      ]
                  }
                })
                .state('app.s8.realtime-monthly-mgmt', {
                  url: '/realtime-monthly',
                  templateUrl: 'views/tpl/realtime-monthly/realtime-monthly.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['ngTable']).then(
                              function(){
                                 return $ocLazyLoad.load('views/js/controllers/realtime-monthly/realtime-monthly.js');
                              }
                          );
                        }
                      ]
                  }
                })
                .state('app.s8.realtime-allocation-mgmt', {
                  url: '/realtime-allocation',
                  templateUrl: 'views/tpl/realtime-allocation/realtime-allocation.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['ngTable']).then(
                              function(){
                                 return $ocLazyLoad.load('views/js/controllers/realtime-allocation/realtime-allocation.js');
                              }
                          );
                        }
                      ]
                  }
                })
                .state('app.s8.realtime-analyse-mgmt', {
                  url: '/realtime-analyse',
                  templateUrl: 'views/tpl/realtime-analyse/realtime-analyse.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['ngTable']).then(
                              function(){
                                 return $ocLazyLoad.load('views/js/controllers/realtime-analyse/realtime-analyse.js');
                              }
                          );
                        }
                      ]
                  }
                })
                .state('app.s8.realtime-question-mgmt', {
                  url: '/realtime-question',
                  templateUrl: 'views/tpl/realtime-question/realtime-question.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['ngTable']).then(
                              function(){
                                 return $ocLazyLoad.load('views/js/controllers/realtime-question/realtime-question.js');
                              }
                          );
                        }
                      ]
                  }
                })
                .state('app.s7', {
                    url: '/workshop',
                    template: '<div ui-view class="fade-in-up"></div>'
                })
                .state('app.s7.workshop-mgmt', {
                  url: '/workshop',
                  templateUrl: 'views/tpl/workshop/workshop-list.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['ngTable']).then(
                              function(){
                                 return $ocLazyLoad.load('views/js/controllers/workshop/workshop-list.js');
                              }
                          );
                        }
                      ]
                  }
                }) 
                .state('app.s7.workshopbigscreen-mgmt', {
                  url: '/workshopbigscreen',
                  templateUrl: 'views/tpl/workshopbigscreen/workshopbigscreen.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['ngTable']).then(
                              function(){
                                 return $ocLazyLoad.load('views/js/controllers/workshopbigscreen/workshopbigscreen.js');
                              }
                          );
                        }
                      ]
                  }
                })
                

              // UI components below
              .state('app.ui', {
                  url: '/uicomponent',
                  template: '<div ui-view class="fade-in"></div>',
                  resolve: {
                      deps: ['uiLoad',
                        function( uiLoad){
                          return uiLoad.load('views/js/controllers/form.js');
                      }]
                  }
              })
              .state('app.ui.buttons', {
                  url: '/buttons',
                  templateUrl: 'views/tpl/uitem/ui_buttons.html'
              })
              .state('app.ui.icons', {
                  url: '/icons',
                  templateUrl: 'views/tpl/uitem/ui_icons.html'
              })       
              .state('app.ui.bootstrap', {
                  url: '/bootstrap',
                  templateUrl: 'views/tpl/uitem/ui_bootstrap.html'
              })
              .state('app.ui.tree', {
                  url: '/tree',
                  templateUrl: 'views/tpl/uitem/ui_tree.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load('angularBootstrapNavTree').then(
                              function(){
                                 return $ocLazyLoad.load('views/js/controllers/tree.js');
                              }
                          );
                        }
                      ]
                  }
              })
              .state('app.ui.table', {
                  url: '/table',
                  templateUrl: 'views/tpl/uitem/table_static.html'
              })
              .state('app.ui.elements', {
                  url: '/elements',
                  templateUrl: 'views/tpl/uitem/form_elements.html'
              })
              .state('app.ui.validation', {
                  url: '/validation',
                  templateUrl: 'views/tpl/uitem/form_validation.html'
              })
              .state('app.ui.fileupload', {
                  url: '/fileupload',
                  templateUrl: 'views/tpl/uitem/form_fileupload.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad){
                          return $ocLazyLoad.load('angularFileUpload').then(
                              function(){
                                 return $ocLazyLoad.load('views/js/controllers/file-upload.js');
                              }
                          );
                      }]
                  }
              })

      }
    ]
  );