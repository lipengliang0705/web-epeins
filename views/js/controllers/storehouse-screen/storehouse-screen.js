app.controller('storehouseController', ['$scope', 'Restangular' ,'ngTableParams', 'dialogs', 'toaster', '$interval',
	function($scope, Restangular, NgTableParams, dialogs, toaster,$interval) {

     $scope.toggleDropdown = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.status.isopen = !$scope.status.isopen;
    };
	

	//echarts数据表格
	$scope.chartConfig = {
		// title:'本月销售出货装载率',
		debug: true,
		gauge: {
			//仪表盘位置及属性
			center: ["50%", "61%"], // 默认全局居中
			radius : "90%",
			startAngle: 200,
			endAngle: -20,
			// 属性lineStyle控制线条样式
			axisLine: {
				show: true,
				lineStyle: {
					color: [
						[0.2, '#2b821d'],
						[0.8, '#005eaa'],
						[1, '#c12e34']
					],
					width: 5
				}
			},
			//刻度线样式（及短线样式）
			axisTick: {
				splitNumber: 10,
				length: 8,
				lineStyle: { 
					color : "#555",
                    distance : 0 //文字离表盘的距离
				}
			},
			//文字样式（及“10”、“20”等文字样式）
			axisLabel: { 
				textStyle: { color: 'auto' } 
			},
			//分割线样式（及10、20等长线样式）
			splitLine: {
				length: 10,
				lineStyle: { 
					color: 'auto',
					width : 1 
				}
			},
			//指针长度与宽度
			pointer: {
				length: '60%',
				width: 3,
				color: 'auto'
			},
			//标题样式
			title: { 
				show: true,
				offsetCenter: [0, '-110%'],
				textStyle: {
					fontWeight: '500',
					fontSize: 14,
					color: '#333'
				}
			},

			detail: { textStyle: { color: 'auto' } }
		},
		grid: { show: false, left: '10', top: 15, right: 10, bottom: 0},
		color: ['#5378AD', '#FF8900', '#98BE3B', '#D15B3B']	

	};
	$scope.chartPieConfig = {
        stack: false,
		grid: { show: false, left: '10', top: 30, right: 40, bottom: 10, },
		color: ['#5378AD', '#FF8900', '#98BE3B', '#D15B3B'],

	};
	$scope.pueTrends = [
		{name:'实际', datapoints:[
			{x:'完成率',y:10.34},
		]}
	];

	$interval(function(){
		$scope.pueTrends = [
			{name:'业务指标', datapoints:[
				{x:'完成率',y:(Math.random()*100).toFixed(2) - 0},
				// {x:'完成率',y:1.33},
				// {x:'完成率',y:1.41},
				// {x:'完成率',y:1.44},
				// {x:'完成率',y:1.49},
				// {x:'完成率',y:1.51}
			]}
		];
	},2000)
    $scope.warnSummary1 = [
		{
			name: 'page.load',
			datapoints: [
				{ x: 2001, y: 1012 },
				{ x: 2002, y: 1023 },
				{ x: 2003, y: 1045 },
				{ x: 2004, y: 1062 },
				{ x: 2005, y: 1032 },
				{ x: 2006, y: 1040 },
				{ x: 2007, y: 1023 },
				{ x: 2008, y: 1090 },
				{ x: 2009, y: 1012 },
				{ x: 2010, y: 1012 }
			]
		}
	];

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
	            subtext: '全年计划任务与实际生产情况',
	            textStyle: {  
	                color: '#000'  
	            },
	        },
	        tooltip: {
	        },
	        legend: {
	            x: 'right',
	            data: ['月计划量'],
	            textStyle: {  
	                color: '#000'  
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
	                      color: '#000'
	                  }
	                },
		            axisLine: {
	                  lineStyle: {
	                      type: 'solid',
	                      color: '#333',//左边线的颜色
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
	                      color: '#333'
	                  }
	                },
	                axisLine: {
	                  lineStyle: {
	                      type: 'solid',
	                      color: '#333',//左边线的颜色
	                      width:'1'//坐标线的宽度
	                  }
	                },
		            splitLine:{
		                show:true,
		                lineStyle: {
		                     type: 'solid',
		                     color: '#333',//左边线的颜色
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
				        fontWeight: '500',
				        color: '#333'                             // 主标题文字颜色
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
				        fontWeight: '500',
				        color: '#333'                             // 主标题文字颜色
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
				        fontWeight: '500',
				        color: '#333'                             // 主标题文字颜色
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
				        fontWeight: '500',
				        color: '#333'                             // 主标题文字颜色
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
				        fontWeight: '500',
				        color: '#333'                             // 主标题文字颜色
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
				        fontWeight: '500',
				        color: '#333'                             // 主标题文字颜色
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
				        fontWeight: '500',
				        color: '#333'                             // 主标题文字颜色
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
				        fontWeight: '500',
				        color: '#333'                             // 主标题文字颜色
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
				        fontWeight: '500',
				        color: '#333'                             // 主标题文字颜色
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
				        fontWeight: '500',
				        color: '#333'                             // 主标题文字颜色
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
				        fontWeight: '500',
				        color: '#333'                             // 主标题文字颜色
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
				        fontWeight: '500',
				        color: '#333'                             // 主标题文字颜色
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
                        color: '#555',
                    }
                }
            },
        }
        var labelBottom = {
            normal : {
                color: '#555',
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
                  color: '#555'  
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
                      color:'#33'
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
                  color : "#555",
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
                        fontWeight: '500',
                        fontSize: 14,
                        color: '#333'
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
