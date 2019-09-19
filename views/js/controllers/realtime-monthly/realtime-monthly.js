app.controller('productAdminController', ['$scope', 'Restangular' ,'ngTableParams', 'dialogs', 'toaster', 
	function($scope, Restangular, NgTableParams, dialogs, toaster) {

     $scope.toggleDropdown = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.status.isopen = !$scope.status.isopen;
    };
	

    //产品
    var myProductChart = echarts.init(document.getElementById('productcharts'));
    




	var dataMap = {};
	function dataFormatter(obj) {
	    var pList = ['1#机','2#机','3#机','4#机','5#机','6#机','7#机','8#机','9#机','10#机','11#机','12#机','13#机','14#机','15#机','16#机','17#机','18#机','19#机'];
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
	        obj[month + 'max'] = Math.floor(max / 10);
	        obj[month + 'sum'] = sum;
	    }
	    return obj;
	}

	dataMap.dataPI = dataFormatter({
	    //max : 4000,
	    12:[12153.03,7521.85,17235.48,7358.31,9740.25,15212.49,7278.75,8587,15046.45,34457.3,22990.35,10062.82,12236.53,7655.18,33896.65,19480.46,12961.1,13059.69,39482.56],
	    11:[16251.93,11307.28,24515.76,11237.55,14359.88,22226.7,10568.83,12582,19195.69,49110.27,32318.85,15300.65,17560.18,11702.82,45361.85,26931.03,19632.26,19669.56,53210.28],
	    10:[16251.93,11307.28,24515.76,11237.55,14359.88,22226.7,10568.83,12582,19195.69,49110.27,32318.85,15300.65,17560.18,11702.82,45361.85,26931.03,19632.26,19669.56,53210.28],
	    9:[14113.58,9224.46,20394.26,9200.86,11672,18457.27,8667.58,10368.6,17165.98,41425.48,27722.31,12359.33,14737.12,9451.26,39169.92,23092.36,15967.61,16037.96,46013.06],
	    8:[12153.03,7521.85,17235.48,7358.31,9740.25,15212.49,7278.75,8587,15046.45,34457.3,22990.35,10062.82,12236.53,7655.18,33896.65,19480.46,12961.1,13059.69,39482.56],
	    7:[11115,6719.01,16011.97,7315.4,8496.2,13668.58,6426.1,8314.37,14069.87,30981.98,21462.69,8851.66,10823.01,6971.05,30933.28,18018.53,11328.92,11555,36796.71],
	    6:[9846.81,5252.76,13607.32,6024.45,6423.18,11164.3,5284.69,7104,12494.01,26018.48,18753.73,7360.92,9248.53,5800.25,25776.91,15012.46,9333.4,9439.6,31777.01],
	    5:[8117.78,4462.74,11467.6,4878.61,4944.25,9304.52,4275.12,6211.8,10572.24,21742.05,15718.47,6112.5,7583.85,4820.53,21900.19,12362.79,7617.47,7688.67,26587.76],
	    4:[6969.52,3905.64,10012.11,4230.53,3905.03,8047.26,3620.27,5513.7,9247.66,18598.69,13417.68,5350.17,6554.69,4056.76,18366.87,10587.42,6590.19,6596.1,22557.37],
	    3:[6033.21,3110.97,8477.63,3571.37,3041.07,6672,3122.01,4750.6,8072.83,15003.6,11648.7,4759.3,5763.35,3456.7,15021.84,8553.79,5633.24,5641.94,18864.62],
	    2:[5007.21,2578.03,6921.29,2855.23,2388.38,6002.54,2662.08,4057.4,6694.23,12442.87,9705.02,3923.11,4983.67,2807.41,12078.15,6867.7,4757.45,4659.99,15844.64],
	    1:[4315,2150.76,6018.28,2324.8,1940.94,5458.22,2348.54,3637.2,5741.03,10606.85,8003.67,3519.72,4467.55,2450.48,10275.5,6035.48,4212.82,4151.54,13502.42]
	});

	dataMap.dataSI = dataFormatter({
	    //max : 26600,
	    1:[12153.03,7521.85,17235.48,7358.31,9740.25,15212.49,7278.75,8587,15046.45,34457.3,22990.35,10062.82,12236.53,7655.18,33896.65,19480.46,12961.1,13059.69,39482.56],
	    3:[16251.93,11307.28,24515.76,11237.55,14359.88,22226.7,10568.83,12582,19195.69,49110.27,32318.85,15300.65,17560.18,11702.82,45361.85,26931.03,19632.26,19669.56,53210.28],
	    5:[16251.93,11307.28,24515.76,11237.55,14359.88,22226.7,10568.83,12582,19195.69,49110.27,32318.85,15300.65,17560.18,11702.82,45361.85,26931.03,19632.26,19669.56,53210.28],
	    7:[14113.58,9224.46,20394.26,9200.86,11672,18457.27,8667.58,10368.6,17165.98,41425.48,27722.31,12359.33,14737.12,9451.26,39169.92,23092.36,15967.61,16037.96,46013.06],
	    9:[12153.03,7521.85,17235.48,7358.31,9740.25,15212.49,7278.75,8587,15046.45,34457.3,22990.35,10062.82,12236.53,7655.18,33896.65,19480.46,12961.1,13059.69,39482.56],
	    2:[11115,6719.01,16011.97,7315.4,8496.2,13668.58,6426.1,8314.37,14069.87,30981.98,21462.69,8851.66,10823.01,6971.05,30933.28,18018.53,11328.92,11555,36796.71],
	    4:[9846.81,5252.76,13607.32,6024.45,6423.18,11164.3,5284.69,7104,12494.01,26018.48,18753.73,7360.92,9248.53,5800.25,25776.91,15012.46,9333.4,9439.6,31777.01],
	    6:[8117.78,4462.74,11467.6,4878.61,4944.25,9304.52,4275.12,6211.8,10572.24,21742.05,15718.47,6112.5,7583.85,4820.53,21900.19,12362.79,7617.47,7688.67,26587.76],
	    8:[6969.52,3905.64,10012.11,4230.53,3905.03,8047.26,3620.27,5513.7,9247.66,18598.69,13417.68,5350.17,6554.69,4056.76,18366.87,10587.42,6590.19,6596.1,22557.37],
	    10:[6033.21,3110.97,8477.63,3571.37,3041.07,6672,3122.01,4750.6,8072.83,15003.6,11648.7,4759.3,5763.35,3456.7,15021.84,8553.79,5633.24,5641.94,18864.62],
	    12:[5007.21,2578.03,6921.29,2855.23,2388.38,6002.54,2662.08,4057.4,6694.23,12442.87,9705.02,3923.11,4983.67,2807.41,12078.15,6867.7,4757.45,4659.99,15844.64],
	    11:[4315,2150.76,6018.28,2324.8,1940.94,5458.22,2348.54,3637.2,5741.03,10606.85,8003.67,3519.72,4467.55,2450.48,10275.5,6035.48,4212.82,4151.54,13502.42]
	});

	option = {
	    baseOption: {
	        timeline: {
	            axisType: 'value',
	            autoPlay: true,
	            playInterval: 1000,
	            data: [
                '1','2','3',
                {
                    value: '4',
                    tooltip: {
                        formatter: '{b}月 生产量最高'
                    },
                    symbol: 'diamond',
                    symbolSize: 16
                },
                '5','6','7','8','9',
                {
                    value: '10',
                    tooltip: {
                        formatter: function (params) {
                            return params.name + '月计划量最高';
                        }
                    },
                    symbol: 'diamond',
                    symbolSize: 18
                },
                '11','12',
                ],
	        },
	        title: {
	            subtext: '全年计划任务与实际生产情况'
	        },
	        legend: {
	            x: 'right',
	            data: ['月计划量', '月生产量'],
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
	                'data':[
	                    '1#机','\n 2#机','3#机','\n4#机','5#机','\n6#机','7#机','\n8#机',
	                    '9#机','\n10#机','11#机','\n12#机','13#机','\n14#机','15#机','\n16#机',
	                    '17#机','\n18#机','19#机'
	                ],
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
	            {name: '月生产量', type: 'bar'},
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
	            	text: '1月生产状况',
	            	textStyle: {
				        fontSize: 15,
				        fontWeight: '300',
				        color: '#fff'                             // 主标题文字颜色
				    },
	            },
	            series: [
	                {data: dataMap.dataPI['1']},
	                {data: dataMap.dataSI['1']},
	                {data: [
	                    {name: '计划量', value: dataMap.dataPI['1sum']},
	                    {name: '生产量', value: dataMap.dataSI['1sum']}
	                ]}
	            ]
	        },
	        {
	            title: {text: '2月生产状况'},
	            series: [
	                {data: dataMap.dataPI['2']},
	                {data: dataMap.dataSI['2']},
	                {data: [
	                    {name: '计划量', value: dataMap.dataPI['2sum']},
	                    {name: '生产量', value: dataMap.dataSI['2sum']}
	                ]}
	            ]
	        },
	        {
	            title: {text: '3月生产状况'},
	            series: [
	                {data: dataMap.dataPI['3']},
	                {data: dataMap.dataSI['3']},
	                {data: [
	                    {name: '计划量', value: dataMap.dataPI['3sum']},
	                    {name: '生产量', value: dataMap.dataSI['3sum']}
	                ]}
	            ]
	        },
	        {
	            title: {text: '4月生产状况'},
	            series: [
	                {data: dataMap.dataPI['4']},
	                {data: dataMap.dataSI['4']},
	                {data: [
	                    {name: '计划量', value: dataMap.dataPI['4sum']},
	                    {name: '生产量', value: dataMap.dataSI['4sum']}
	                ]}
	            ]
	        },
	        {
	            title: {text: '5月生产状况'},
	            series: [
	                {data: dataMap.dataPI['5']},
	                {data: dataMap.dataSI['5']},
	                {data: [
	                    {name: '计划量', value: dataMap.dataPI['5sum']},
	                    {name: '生产量', value: dataMap.dataSI['5sum']}
	                ]}
	            ]
	        },
	        {
	            title: {text: '6月生产状况'},
	            series: [
	                {data: dataMap.dataPI['6']},
	                {data: dataMap.dataSI['6']},
	                {data: [
	                    {name: '计划量', value: dataMap.dataPI['6sum']},
	                    {name: '生产量', value: dataMap.dataSI['6sum']}
	                ]}
	            ]
	        },
	        {
	            title: {text: '7月生产状况'},
	            series: [
	                {data: dataMap.dataPI['7']},
	                {data: dataMap.dataSI['7']},
	                {data: [
	                    {name: '计划量', value: dataMap.dataPI['7sum']},
	                    {name: '生产量', value: dataMap.dataSI['7sum']}
	                ]}
	            ]
	        },
	        {
	            title: {text: '8月生产状况'},
	            series: [
	                {data: dataMap.dataPI['8']},
	                {data: dataMap.dataSI['8']},
	                {data: [
	                    {name: '计划量', value: dataMap.dataPI['8sum']},
	                    {name: '生产量', value: dataMap.dataSI['8sum']}
	                ]}
	            ]
	        },
	        {
	            title: {text: '9月生产状况'},
	            series: [
	                {data: dataMap.dataPI['9']},
	                {data: dataMap.dataSI['9']},
	                {data: [
	                    {name: '计划量', value: dataMap.dataPI['9sum']},
	                    {name: '生产量', value: dataMap.dataSI['9sum']}
	                ]}
	            ]
	        },
	        {
	            title: {text: '10月生产状况'},
	            series: [
	                {data: dataMap.dataPI['10']},
	                {data: dataMap.dataSI['10']},
	                {data: [
	                    {name: '计划量', value: dataMap.dataPI['10sum']},
	                    {name: '生产量', value: dataMap.dataSI['10sum']}
	                ]}
	            ]
	        },
	        {
	            title: {text: '11月生产状况'},
	            series: [
	                {data: dataMap.dataPI['11']},
	                {data: dataMap.dataSI['11']},
	                {data: [
	                    {name: '计划量', value: dataMap.dataPI['11sum']},
	                    {name: '生产量', value: dataMap.dataSI['11sum']}
	                ]}
	            ]
	        },
	        {
	            title: {text: '12月生产状况'},
	            series: [
	                {data: dataMap.dataPI['12']},
	                {data: dataMap.dataSI['12']},
	                {data: [
	                    {name: '计划量', value: dataMap.dataPI['12sum']},
	                    {name: '生产量', value: dataMap.dataSI['12sum']}
	                ]}
	            ]
	        }
	    ]
	};

	
                    
                    
	myProductChart.setOption(option);
                    
    






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
