
app.controller('packingScreenController', packingScreenController);

packingScreenController.$inject = ['$scope', 'Restangular' ,'ngTableParams', 'dialogs', 'toaster','$timeout'];

function packingScreenController($scope, Restangular, ngTableParams, dialogs, toaster,$timeout){
	$scope.toggleDropdown = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.status.isopen = !$scope.status.isopen;
    };
	

    $scope.myInterval = 5000;
    var slides = $scope.slides = [];
    $scope.addSlide = function() {
      slides.push({
        image: 'views/img/c' + slides.length + '.jpg',
        text: ['Carousel text #0','Carousel text #1','Carousel text #2','Carousel text #3'][slides.length % 4]
      });
    };
    for (var i=0; i<4; i++) {
      $scope.addSlide();
    }

   $timeout(function(){

   		//产品
	    var incomingChart1 = echarts.init(document.getElementById('incoming'));
	    var qualifiedChart = echarts.init(document.getElementById('qualified'));
	    var inspectChart = echarts.init(document.getElementById('inspect'));
	    var finalChart = echarts.init(document.getElementById('final'));
	    var scrapChart = echarts.init(document.getElementById('scrap'));
	    var option = {
		    tooltip : {
		        formatter: "{a} <br/>{b} : {c}%"
		    },
		    series: [
		        {
		            name: '业务指标',
		            type: 'gauge',
		            center: ["50%", "71%"], // 默认全局居中
		            radius : "90%",
		            startAngle: 200,
	                endAngle: -20,
	                axisLine : {
	                  show : true,
	                  lineStyle : { // 属性lineStyle控制线条样式
	                     width : 5//表盘宽度
		                }                 
		            },
		            splitLine : { //分割线样式（及10、20等长线样式）
	                      length : 10,
	                      lineStyle : { // 属性lineStyle控制线条样式
	                          width : 1
	                      }
	                  },
	                axisTick : { //刻度线样式（及短线样式）
	                  length : 10
	                },
	                axisLabel : { //文字样式（及“10”、“20”等文字样式）
	                  color : "#fff",
	                  distance : 0 //文字离表盘的距离
	                },
		            detail: {
		            	formatter:'{value}%',
		            	textStyle: {
	                        fontSize: 16
	                    }
		            },
		            pointer:{//指针长度与宽度
			            width:3,
			            length:'45%'
			        },
		            data: [{
		            	value: 50,
		                name: '来料合格',
		                label: {
	                         textStyle: {
	                             fontSize: 12
	                         }
	                     }
		            }],
		            title: {
	                    show: true,
	                    offsetCenter: [0, '-112%'],
	                    textStyle: {
	                        fontWeight: '300',
	                        fontSize: 14,
	                        color: '#333'
	                    }
	                }
		        }
		    ]
		};

		var qualifiedOption = {
		    tooltip : {
		        formatter: "{a} <br/>{b} : {c}%"
		    },
		    series: [
		        {
		            name: '业务指标',
		            type: 'gauge',
		            center: ["50%", "71%"], // 默认全局居中
		            radius : "90%",
		            startAngle: 200,
	                endAngle: -20,
	                axisLine : {
	                  show : true,
	                  lineStyle : { // 属性lineStyle控制线条样式
	                     width : 5//表盘宽度
		                }                 
		            },
		            splitLine : { //分割线样式（及10、20等长线样式）
	                      length : 10,
	                      lineStyle : { // 属性lineStyle控制线条样式
	                          width : 1
	                      }
	                  },
	                axisTick : { //刻度线样式（及短线样式）
	                  length : 10
	                },
	                axisLabel : { //文字样式（及“10”、“20”等文字样式）
	                  color : "#fff",
	                  distance : 0 //文字离表盘的距离
	                },
		            detail: {
		            	formatter:'{value}%',
		            	textStyle: {
	                        fontSize: 16
	                    }
		            },
		            pointer:{//指针长度与宽度
			            width:3,
			            length:'45%'
			        },
		            data: [{
		            	value: 50,
		                name: '首件合格',
		                label: {
	                         textStyle: {
	                             fontSize: 12
	                         }
	                     }
		            }],
		            title: {
	                    show: true,
	                    offsetCenter: [0, '-112%'],
	                    textStyle: {
	                        fontWeight: '300',
	                        fontSize: 14,
	                        color: '#333'
	                    }
	                }
		        }
		    ]
		};

		var inspectOption = {
		    tooltip : {
		        formatter: "{a} <br/>{b} : {c}%"
		    },
		    series: [
		        {
		            name: '业务指标',
		            type: 'gauge',
		            center: ["50%", "71%"], // 默认全局居中
		            radius : "90%",
		            startAngle: 200,
	                endAngle: -20,
	                axisLine : {
	                  show : true,
	                  lineStyle : { // 属性lineStyle控制线条样式
	                     width : 5//表盘宽度
		                }                 
		            },
		            splitLine : { //分割线样式（及10、20等长线样式）
	                      length : 10,
	                      lineStyle : { // 属性lineStyle控制线条样式
	                          width : 1
	                      }
	                  },
	                axisTick : { //刻度线样式（及短线样式）
	                  length : 10
	                },
	                axisLabel : { //文字样式（及“10”、“20”等文字样式）
	                  color : "#fff",
	                  distance : 0 //文字离表盘的距离
	                },
		            detail: {
		            	formatter:'{value}%',
		            	textStyle: {
	                        fontSize: 16
	                    }
		            },
		            pointer:{//指针长度与宽度
			            width:3,
			            length:'45%'
			        },
		            data: [{
		            	value: 50,
		                name: '巡检不良',
		                label: {
	                         textStyle: {
	                             fontSize: 12
	                         }
	                     }
		            }],
		            title: {
	                    show: true,
	                    offsetCenter: [0, '-112%'],
	                    textStyle: {
	                        fontWeight: '300',
	                        fontSize: 14,
	                        color: '#333'
	                    }
	                }
		        }
		    ]
		};
		var finalOption = {
		    tooltip : {
		        formatter: "{a} <br/>{b} : {c}%"
		    },
		    series: [
		        {
		            name: '业务指标',
		            type: 'gauge',
		            center: ["50%", "71%"], // 默认全局居中
		            radius : "90%",
		            startAngle: 200,
	                endAngle: -20,
	                axisLine : {
	                  show : true,
	                  lineStyle : { // 属性lineStyle控制线条样式
	                     width : 5//表盘宽度
		                }                 
		            },
		            splitLine : { //分割线样式（及10、20等长线样式）
	                      length : 10,
	                      lineStyle : { // 属性lineStyle控制线条样式
	                          width : 1
	                      }
	                  },
	                axisTick : { //刻度线样式（及短线样式）
	                  length : 10
	                },
	                axisLabel : { //文字样式（及“10”、“20”等文字样式）
	                  color : "#fff",
	                  distance : 0 //文字离表盘的距离
	                },
		            detail: {
		            	formatter:'{value}%',
		            	textStyle: {
	                        fontSize: 16
	                    }
		            },
		            pointer:{//指针长度与宽度
			            width:3,
			            length:'45%'
			        },
		            data: [{
		            	value: 50,
		                name: '最终产品合格率',
		                label: {
	                         textStyle: {
	                             fontSize: 12
	                         }
	                     }
		            }],
		            title: {
	                    show: true,
	                    offsetCenter: [0, '-112%'],
	                    textStyle: {
	                        fontWeight: '300',
	                        fontSize: 14,
	                        color: '#333'
	                    }
	                }
		        }
		    ]
		};
		var scrapOption = {
		    tooltip : {
		        formatter: "{a} <br/>{b} : {c}%"
		    },
		    series: [
		        {
		            name: '业务指标',
		            type: 'gauge',
		            center: ["50%", "71%"], // 默认全局居中
		            radius : "90%",
		            startAngle: 200,
	                endAngle: -20,
	                axisLine : {
	                  show : true,
	                  lineStyle : { // 属性lineStyle控制线条样式
	                     width : 5//表盘宽度
		                }                 
		            },
		            splitLine : { //分割线样式（及10、20等长线样式）
	                      length : 10,
	                      lineStyle : { // 属性lineStyle控制线条样式
	                          width : 1
	                      }
	                  },
	                axisTick : { //刻度线样式（及短线样式）
	                  length : 10
	                },
	                axisLabel : { //文字样式（及“10”、“20”等文字样式）
	                  color : "#fff",
	                  distance : 0 //文字离表盘的距离
	                },
		            detail: {
		            	formatter:'{value}%',
		            	textStyle: {
	                        fontSize: 16
	                    }
		            },
		            pointer:{//指针长度与宽度
			            width:3,
			            length:'45%'
			        },
		            data: [{
		            	value: 50,
		                name: '包装报废率',
		                label: {
	                         textStyle: {
	                             fontSize: 12
	                         }
	                     }
		            }],
		            title: {
	                    show: true,
	                    offsetCenter: [0, '-112%'],
	                    textStyle: {
	                        fontWeight: '300',
	                        fontSize: 14,
	                        color: '#333'
	                    }
	                }
		        }
		    ]
		};

		// option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
	   //  incomingChart1.setOption(option, true);
	    setInterval(function () {
		   	option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
		    incomingChart1.setOption(option, true);
		},1000);
		setInterval(function () {
		   	qualifiedOption.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
		    qualifiedChart.setOption(qualifiedOption, true);
		},1000);
		setInterval(function () {
		   	inspectOption.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
		    inspectChart.setOption(inspectOption, true);
		},1000);
		setInterval(function () {
		   	finalOption.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
		    finalChart.setOption(finalOption, true);
		},1000);
		setInterval(function () {
		   	scrapOption.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
		    scrapChart.setOption(scrapOption, true);
		},1000);

   },2000)
    	
	 	
   
                    
    

	// setInterval(function () {
	//    	option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
	//     incomingChart1.setOption(option, true);
	// },2000);






	// var baseBanks = Restangular.one('master/datasource');
	// var add = function (item) {
	// 	var dlg = dialogs.create('views/tpl/layer/product-admin/add.html','addController',{},{size:'md'});
 //    };
	
 //    var modify = function () {
	// 	var dlg = dialogs.create('views/tpl/layer/product-admin/modify.html','modifyController',{},{size:'md'});
		
 //    };

 //    var deleted = function () {
	// 	var dlg = dialogs.create('views/tpl/layer/product-admin/delete.html','deteleDataController',{},{size:'sm'});
		
 //    };



	// $scope.delete = deleted;
	// $scope.modify = modify;
	// $scope.add = add;

}


// app.controller('packingScreenController', ['$scope', 'Restangular' ,'ngTableParams', 'dialogs', 'toaster',
// 	function($scope, Restangular, ngTableParams, dialogs, toaster) {

     


	
// }]);



app.controller('addController',function($scope,$modalInstance,data){
	$scope.title = "添加生产计划";
	
	$scope.cancel = function(){
		$modalInstance.dismiss('Cancelled');
	};
	
	$scope.save = function(){
		$modalInstance.close($scope.bank);
	};

});
app.controller('modifyController',function($scope,$modalInstance,data){
	console.log(24242434342);
	console.log(data);

	//$scope.dataTypes = [{"id":"1", "name":"总行"},{"id":"2", "name":"分行"},{"id":"3", "name":"支行"}];
	$scope.title = "生产计划变更";
	
	$scope.cancel = function(){
		$modalInstance.dismiss('Cancelled');
	};
	
	$scope.save = function(){
		$modalInstance.close($scope.bank);
	};

});

app.controller('deteleDataController',function($scope,$modalInstance,data){

	$scope.title = "删除机器";
	
	$scope.cancel = function(){
		$modalInstance.dismiss('Cancelled');
	};
	
	$scope.save = function(){
		$modalInstance.close($scope.bank);
	};

});
