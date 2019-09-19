app.controller('productAdminController', ['$scope', 'Restangular' ,'ngTableParams', 'dialogs', 'toaster', 
	function($scope, Restangular, NgTableParams, dialogs, toaster) {

     $scope.toggleDropdown = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.status.isopen = !$scope.status.isopen;
    };
	

    //产品
    var myProductChart = echarts.init(document.getElementById('productcharts'));
    var myNumberChart = echarts.init(document.getElementById('numbercharts'));
    var myTaskChart = echarts.init(document.getElementById('taskcharts'));
    var myTimeChart = echarts.init(document.getElementById('timecharts'));
    var myQuestionChart = echarts.init(document.getElementById('questioncharts'));
    option = {
	    // title : {
	    //     text: '某地区蒸发量和降水量',
	    //     subtext: '纯属虚构'
	    // },
	    tooltip : {
	        trigger: 'axis'
	    },
	    grid:{
	    	top:'22%',
            left:'2%',
            right:'2%',
            bottom:'1%',
            containLabel:true
        },
	    legend: {
	        data:['Forest','Steppe','Desert','Wetland'],
	        top:'-1%',
	    },
	    calculable : true,
	    xAxis : [
	        {
	            type : 'category',
	            splitLine: {
                    show: false 
                },
	            data : ['2012','2013','2014','2015','2016','2017','2018']
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value',

	        }
	    ],
	    series : [
	        {
	            name:'Forest',
	            type:'bar',
	            data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6],
	        },
	        {
	            name:'Steppe',
	            type:'bar',
	            data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6],
	        },
	        {
	            name:'Desert',
	            type:'bar',
	            data:[26, 59, 90, 264, 287, 70, 175],
	        },
	        {
	            name:'Wetland',
	            type:'bar',
	            data:[26, 159, 9, 26, 27, 79, 176],
	        }
	    ]
	};
	//数量

	numberOption = {
		grid:{
	    	top:'2%',
            left:'2%',
            right:'2%',
            bottom:'1%',
            containLabel:true
        },
	    legend: {
	        orient : 'vertical',
	        x : 'left',
	        y: 'top',
	        data:['生产量','计划量','联盟广告','视频广告','搜索引擎']
	    },
	    calculable : true,
	    series : [
	        {
	            name:'月生产数量统计',
	            type:'pie',
	            radius : '55%',
	            center: ['60%', '60%'],
	            data:[
	                {value:335, name:'生产量'},
	                {value:310, name:'计划量'},
	            ]
	        }
	    ]
	};

	//任务
	var hours = ['1#', '2#', '3#', '4#', '5#', '6#', '7#',
        '8#', '9#', '10#','11#','12#',
        '13#', '14#', '15#', '16#', '17#', '18#',
        '19#'];
	var days = ['周一', '周二', '周三',
	        '周四', '周五', '周六', '周日'];

	var data = [[0,0,5],[0,1,1],[0,2,0],[0,3,0],[0,4,0],[0,5,0],[0,6,0],[0,7,0],[0,8,0],[0,9,0],[0,10,0],[0,11,2],[0,12,4],[0,13,1],[0,14,1],[0,15,3],[0,16,4],[0,17,6],[0,18,4],[0,19,4],[0,20,3],[0,21,3],[0,22,2],[0,23,5],[1,0,7],[1,1,0],[1,2,0],[1,3,0],[1,4,0],[1,5,0],[1,6,0],[1,7,0],[1,8,0],[1,9,0],[1,10,5],[1,11,2],[1,12,2],[1,13,6],[1,14,9],[1,15,11],[1,16,6],[1,17,7],[1,18,8],[1,19,12],[1,20,5],[1,21,5],[1,22,7],[1,23,2],[2,0,1],[2,1,1],[2,2,0],[2,3,0],[2,4,0],[2,5,0],[2,6,0],[2,7,0],[2,8,0],[2,9,0],[2,10,3],[2,11,2],[2,12,1],[2,13,9],[2,14,8],[2,15,10],[2,16,6],[2,17,5],[2,18,5],[2,19,5],[2,20,7],[2,21,4],[2,22,2],[2,23,4],[3,0,7],[3,1,3],[3,2,0],[3,3,0],[3,4,0],[3,5,0],[3,6,0],[3,7,0],[3,8,1],[3,9,0],[3,10,5],[3,11,4],[3,12,7],[3,13,14],[3,14,13],[3,15,12],[3,16,9],[3,17,5],[3,18,5],[3,19,10],[3,20,6],[3,21,4],[3,22,4],[3,23,1],[4,0,1],[4,1,3],[4,2,0],[4,3,0],[4,4,0],[4,5,1],[4,6,0],[4,7,0],[4,8,0],[4,9,2],[4,10,4],[4,11,4],[4,12,2],[4,13,4],[4,14,4],[4,15,14],[4,16,12],[4,17,1],[4,18,8],[4,19,5],[4,20,3],[4,21,7],[4,22,3],[4,23,0],[5,0,2],[5,1,1],[5,2,0],[5,3,3],[5,4,0],[5,5,0],[5,6,0],[5,7,0],[5,8,2],[5,9,0],[5,10,4],[5,11,1],[5,12,5],[5,13,10],[5,14,5],[5,15,7],[5,16,11],[5,17,6],[5,18,0],[5,19,5],[5,20,3],[5,21,4],[5,22,2],[5,23,0],[6,0,1],[6,1,0],[6,2,0],[6,3,0],[6,4,0],[6,5,0],[6,6,0],[6,7,0],[6,8,0],[6,9,0],[6,10,1],[6,11,0],[6,12,2],[6,13,1],[6,14,3],[6,15,4],[6,16,0],[6,17,0],[6,18,0],[6,19,0],[6,20,1],[6,21,2],[6,22,2],[6,23,6]];

	taskOption = {
	    title: {
	        text: '各机器设备上的任务分配情况',
	        textStyle: {
		        fontSize: 13,
		        fontWeight: 'bolder',
		        color: '#777'                             // 主标题文字颜色
		    },
	    },
	    legend: {
	        data: ['计划任务'],
	        left: 'right'
	    },
	    polar: {},
	    tooltip: {
	        formatter: function (params) {
	            return params.value[2] + ' 任务 ' + hours[params.value[1]] + ' of ' + days[params.value[0]];
	        }
	    },
	    angleAxis: {
	        type: 'category',
	        data: hours,
	        boundaryGap: false,
	        splitLine: {
	            show: true,
	            lineStyle: {
	                color: '#999',
	                type: 'dashed'
	            }
	        },
	        axisLine: {
	            show: false
	        }
	    },
	    radiusAxis: {
	        type: 'category',
	        data: days,
	        axisLine: {
	            show: false
	        },
	        axisLabel: {
	            rotate: 45
	        }
	    },
	    series: [{
	        name: '计划任务',
	        type: 'scatter',
	        coordinateSystem: 'polar',
	        symbolSize: function (val) {
	            return val[2] * 2;
	        },
	        data: data,
	        animationDelay: function (idx) {
	            return idx * 5;
	        }
	    }]
	};

	//时间
	function randomData() {
	    now = new Date(+now + oneDay);
	    value = value + Math.random() * 21 - 10;
	    return {
	        name: now.toString(),
	        value: [
	            [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
	            Math.round(value)
	        ]
	    }
	}

	var data = [];
	var now = +new Date(1997, 9, 3);
	var oneDay = 24 * 3600 * 1000;
	var value = Math.random() * 1000;
	for (var i = 0; i < 1000; i++) {
	    data.push(randomData());
	}

	timeOption = {
	    tooltip: {
	        trigger: 'axis',
	        formatter: function (params) {
	            params = params[0];
	            var date = new Date(params.name);
	            return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
	        },
	        axisPointer: {
	            animation: false
	        }
	    },
	    xAxis: {
	        type: 'time',
	        splitLine: {
	            show: false
	        }
	    },
	    yAxis: {
	        type: 'value',
	        boundaryGap: [0, '100%'],
	        splitLine: {
	            show: false
	        }
	    },
	    series: [{
	        name: '模拟数据',
	        type: 'line',
	        showSymbol: false,
	        hoverAnimation: false,
	        data: data
	    }]
	};

	setInterval(function () {

	    for (var i = 0; i < 5; i++) {
	        data.shift();
	        data.push(randomData());
	    }

	    myChart.setOption({
	        series: [{
	            data: data
	        }]
	    });
	}, 1000);

	//问题
	questionOption = {
	    tooltip : {
	        trigger: 'axis',
	        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
	            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
	        }
	    },
	    grid:{
	    	top:'18%',
            left:'2%',
            right:'2%',
            bottom:'1%',
            containLabel:true
        },
	    legend: {
	        data:['叠膜', '过热', '脏破']
	    },
	    calculable : true,
	    xAxis : [
	        {
	            type : 'value',
	            splitLine: {
                    show: false 
                },
	        }
	    ],
	    yAxis : [
	        {
	            type : 'category',
	            splitLine: {
                    show: false 
                },
	            axisTick : {show: false},
	            data : ['周一','周二','周三','周四','周五','周六','周日']
	        }
	    ],
	    series : [
	        {
	            name:'叠膜',
	            type:'bar',
	            itemStyle : { normal: {label : {show: true, position: 'inside'}}},
	            data:[200, 170, 240, 244, 200, 220, 210]
	        },
	        {
	            name:'过热',
	            type:'bar',
	            stack: '总量',
	            barWidth : 5,
	            itemStyle: {normal: {
	                label : {show: true}
	            }},
	            data:[320, 302, 341, 374, 390, 450, 420]
	        },
	        {
	            name:'脏破',
	            type:'bar',
	            stack: '总量',
	            itemStyle: {normal: {
	                label : {show: true, position: 'left'}
	            }},
	            data:[-120, -132, -101, -134, -190, -230, -210]
	        }
	    ]
	};
                    
                    
	myProductChart.setOption(option);
	myNumberChart.setOption(numberOption);
	myTaskChart.setOption(taskOption);
	myTimeChart.setOption(timeOption);
	myQuestionChart.setOption(questionOption);
                    
    






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
