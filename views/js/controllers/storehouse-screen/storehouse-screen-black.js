app.controller('storehouseController', ['$scope', 'Restangular' ,'ngTableParams', 'dialogs', 'toaster', 
	function($scope, Restangular, NgTableParams, dialogs, toaster) {

     $scope.toggleDropdown = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.status.isopen = !$scope.status.isopen;
    };
	

    //产品
    var myProductChart = echarts.init(document.getElementById('productcharts'));
    var completionRatecharts = echarts.init(document.getElementById('completionRatecharts'));
    var LoadingRatecharts = echarts.init(document.getElementById('LoadingRatecharts'));



	var dataMap = {};
	function dataFormatter(obj) {
	    var pList = ['采购计划达成率','销售计划达成率','销售出货装载率'];
	    var temp;
	    for (var month = 1; month <= 12; month++) {
	        var max = 0;
	        var sum = 0;
	        temp = obj[month];
	        for (var i = 0, l = temp.length; i < l; i++) {
	            max = Math.max(max, temp[i]);
	            sum += temp[i];
	            obj[month][i] = {
	                name : pList[i],
	                value : temp[i]
	            }
	        }
	        obj[month + 'max'] = Math.floor(max / 100) * 100;
	        obj[month + 'sum'] = sum;
	    }
	    return obj;
	}
	
	dataMap.dataPI = dataFormatter({
	    12:[89, 85, 67],
	    11:[76, 96, 88],
	    10:[91, 86, 73],
	    9:[96, 91, 90],
	    8:[94, 87, 90],
	    7:[91, 90, 94],
	    6:[96, 88, 79],
	    5:[93, 86, 90],
	    4:[92, 89, 92],
	    3:[95, 83, 73],
	    2:[73, 84, 85],
	    1:[87, 85, 88]
	});
	
	option = {
	    baseOption: {
	        timeline: {
	            // y: 0,
	            axisType: 'value',
	            // realtime: false,
	            // loop: false,
	            autoPlay: true,
	            // currentIndex: 2,
	            playInterval: 1000,
	            // controlStyle: {
	            //     position: 'left'
	            // },
	            data: [
	                '1','2','3','4',
	                '5','6','7','8','9','10',
	                '11','12'
	            ],
	        },
	        title: {
	            subtext: '全年计划任务与实际生产情况'
	        },
	        tooltip: {
	        },
	        legend: {
	            x: 'right',
	            data: ['月计划量'],
	            textStyle: {  
	                color: '#999'  
	            },  
	        },
	        calculable : true,
	        grid: {
	            top: 80,
	            bottom: 100,
	            tooltip: {
	                trigger: 'axis',
	                axisPointer: {
	                    type: 'shadow',
	                    label: {
	                        show: true,
	                        formatter: function (params) {
	                            return params.value.replace('\n', '');
	                        }
	                    }
	                }
	            }
	        },
	        xAxis: [
	            {
	                'type':'category',
	                'axisLabel':{'interval':0},
	                'data':['采购计划达成率','销售计划达成率','销售出货装载率'],
	                splitLine: {show: false},
	                axisLabel: {
	                  show: true,
	                  textStyle: {
	                      color: '#555'
	                  }
	                },
		            axisLine: {
	                  lineStyle: {
	                      type: 'solid',
	                      color: '#555',//左边线的颜色
	                      width:'1'//坐标线的宽度
	                  }
	                }
	            }
	        ],
	        yAxis: [
	            {
	                type: 'value',
	                name: '数量（个）',
	                axisLabel: {
	                  show: true,
	                  textStyle: {
	                      color: '#555'
	                  }
	                },
	                axisLine: {
	                  lineStyle: {
	                      type: 'solid',
	                      color: '#555',//左边线的颜色
	                      width:'1'//坐标线的宽度
	                  }
	                },
		            splitLine:{
		                show:true,
		                lineStyle: {
		                     type: 'solid',
		                     color: '#555',//左边线的颜色
		                     width:'1'//坐标线的宽度
	                    }
		            }
	            }
	        ],
	        series: [
	            {name: '月计划量', type: 'bar'},
	            {
	                name: '完成率',
	                type: 'pie',
	                center: ['75%', '20%'],
	                radius:'15%',
	                z: 100
	            }
	        ]
	    },
	    options: [
	        {
	            title: {
	            	text: '1月采购与销售情况',
	            	textStyle: {
				        fontSize: 15,
				        fontWeight: '300',
				        color: '#fff'                             // 主标题文字颜色
				    },
	            },
	            series: [
	                {data: dataMap.dataPI['1']}
	            ]
	        },
	        {
	            title: {
	            	text: '2月采购与销售情况',
	            	textStyle: {
				        fontSize: 15,
				        fontWeight: '300',
				        color: '#fff'                             // 主标题文字颜色
				    },
	            },
	            series: [
	                {data: dataMap.dataPI['2']}
	                ]
	        },          
	        {
	            title: {
	            	text: '3月采购与销售情况',
	            	textStyle: {
				        fontSize: 15,
				        fontWeight: '300',
				        color: '#fff'                             // 主标题文字颜色
				    },
	            },
	            series: [
	                {data: dataMap.dataPI['3']}
	                ]
	        },
	        {
	            title: {
	            	text: '4月采购与销售情况',
	            	textStyle: {
				        fontSize: 15,
				        fontWeight: '300',
				        color: '#fff'                             // 主标题文字颜色
				    },
	            },
	            series: [
	                {data: dataMap.dataPI['4']}
	                ]
	        },
	        {
	            title: {
	            	text: '5月采购与销售情况',
	            	textStyle: {
				        fontSize: 15,
				        fontWeight: '300',
				        color: '#fff'                             // 主标题文字颜色
				    },
	            },
	            series: [
	                {data: dataMap.dataPI['5']}
	            ]
	        },
	        {
	            title: {
	            	text: '6月采购与销售情况',
	            	textStyle: {
				        fontSize: 15,
				        fontWeight: '300',
				        color: '#fff'                             // 主标题文字颜色
				    },
	            },
	            series: [
	                {data: dataMap.dataPI['6']}
	            ]
	        },
	        {
	            title: {
	            	text: '7月采购与销售情况',
	            	textStyle: {
				        fontSize: 15,
				        fontWeight: '300',
				        color: '#fff'                             // 主标题文字颜色
				    },
	            },
	            series: [
	                {data: dataMap.dataPI['7']}
	            ]
	        },
	        {
	            title: {
	            	text: '8月采购与销售情况',
	            	textStyle: {
				        fontSize: 15,
				        fontWeight: '300',
				        color: '#fff'                             // 主标题文字颜色
				    },
	            },
	            series: [
	                {data: dataMap.dataPI['8']}
	            ]
	        },
	        {
	            title: {
	            	text: '9月采购与销售情况',
	            	textStyle: {
				        fontSize: 15,
				        fontWeight: '300',
				        color: '#fff'                             // 主标题文字颜色
				    },
	            },
	            series: [
	                {data: dataMap.dataPI['9']}
	            ]
	        },
	        {
	            title: {
	            	text: '10月采购与销售情况',
	            	textStyle: {
				        fontSize: 15,
				        fontWeight: '300',
				        color: '#fff'                             // 主标题文字颜色
				    },
	            },
	            series: [
	                {data: dataMap.dataPI['10']}
	            ]
	        },
	        {
	            title: {
	            	text: '11月采购与销售情况',
	            	textStyle: {
				        fontSize: 15,
				        fontWeight: '300',
				        color: '#fff'                             // 主标题文字颜色
				    },
	            },
	            series: [
	                {data: dataMap.dataPI['11']}
	            ]
	        },
	        {
	            title: {
	            	text: '12月采购与销售情况',
	            	textStyle: {
				        fontSize: 15,
				        fontWeight: '300',
				        color: '#fff'                             // 主标题文字颜色
				    },
	            },
	            series: [
	                {data: dataMap.dataPI['12']}
	            ]
	        }
	    ]
	};

    


    //本月销售与采购达成率
        var labelTop = {
            normal : {
                label : {
                    show : true,
                    position : 'center',
                    formatter : '{b}',
                    textStyle: {
                        baseline : 'bottom',
                        color: '#ccc',
                    }
                },
                labelLine : {
                    show : false
                }
            }
        };
        var labelFromatter = {
            normal : {
                label : {
                    formatter : function (params){
                        return 100 - params.value + '%'
                    },
                    textStyle: {
                        baseline : 'top',
                        color: '#ccc',
                    }
                }
            },
        }
        var labelBottom = {
            normal : {
                color: '#ccc',
                label : {
                    show : true,
                    position : 'center'
                },
                labelLine : {
                    show : false
                }
            },
            emphasis: {
                color: 'rgba(0,0,0,0)'
            }
        };
        var radius = [50, 60];
        completionRateOption = {
            legend: {
                x : 'center',
                y : 'bottom',
                textStyle: {  
                  color: '#999'  
              },  
                data:[
                    '采购计划达成率','销售计划达成率'

                ]
            },
            title : {
                text: '月度采购与销售达成率',
                x: 'center',
                y:'0',
                textStyle: {
                    fontFamily: "microsoft yahei",
                      fontSize: 14,
                      fontStyle: 'normal',
                      color:'#fff'
                    },
            },
            series : [
                {
                    type : 'pie',
                    center : ['25%', '40%'],
                    radius : radius,
                    x: '0%', // for funnel
                    itemStyle : labelFromatter,
                    data : [
                        {name:'other', value:46, itemStyle : labelBottom},
                        {name:'采购计划达成率', value:54,itemStyle : labelTop}
                    ]
                },
                {
                    type : 'pie',
                    center : ['70%', '40%'],
                    radius : radius,
                    x:'20%', // for funnel
                    itemStyle : labelFromatter,
                    data : [
                        {name:'other', value:56, itemStyle : labelBottom},
                        {name:'销售计划达成率', value:44,itemStyle : labelTop}
                    ]
                }
            ]
        };
	

	LoadingRateOption = {
	    tooltip : {
	        formatter: "{a} <br/>{b} : {c}%"
	    },
	    series: [
	        {
	            name: '业务指标',
	            type: 'gauge',
	            center: ["50%", "61%"], // 默认全局居中
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
	                name: '完成率',
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
                        color: '#fff'
                    }
                }
	        }
	    ]
	};
    setInterval(function () {
	    LoadingRateOption.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
	    LoadingRatecharts.setOption(LoadingRateOption, true);
	},2000);              
                    
	myProductChart.setOption(option);
	completionRatecharts.setOption(completionRateOption);
	//LoadingRatecharts.setOption(LoadingRateOption);
                    
    






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



	
}]);



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
