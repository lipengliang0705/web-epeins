app.controller('productAdminController', ['$scope', 'Restangular' ,'ngTableParams', 'dialogs', 'toaster', 
	function($scope, Restangular, NgTableParams, dialogs, toaster) {

     $scope.toggleDropdown = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.status.isopen = !$scope.status.isopen;
    };
	

    //产品
    var myTimeChart1 = echarts.init(document.getElementById('timecharts1'));
    var myTimeChart2 = echarts.init(document.getElementById('timecharts2'));
    var myTimeChart3 = echarts.init(document.getElementById('timecharts3'));
    var myTimeChart4 = echarts.init(document.getElementById('timecharts4'));
    var myTimeChart5 = echarts.init(document.getElementById('timecharts5'));
    var myTimeChart6 = echarts.init(document.getElementById('timecharts6'));
    var myTimeChart7 = echarts.init(document.getElementById('timecharts7'));
    var myTimeChart8 = echarts.init(document.getElementById('timecharts8'));
    

	data = [["2019-06-05",116],["2019-06-06",129],["2019-06-07",135],["2019-06-08",86],["2019-06-09",73],["2019-06-10",85],["2019-06-11",73],["2019-06-12",68],["2019-06-13",92],["2019-06-14",130],["2019-06-15",245],["2019-06-16",139],["2019-06-17",115],["2019-06-18",111],["2019-06-19",309],["2019-06-20",206],["2019-06-21",137],["2019-06-22",128],["2019-06-23",85],["2019-06-24",94],["2019-06-25",71],["2019-06-26",106],["2019-06-27",84],["2019-06-28",93],["2019-06-29",85]];

	var dateList = data.map(function (item) {
	    return item[0];
	});
	var valueList = data.map(function (item) {
	    return item[1];
	});

	timeOption = {

	    // Make gradient line here
	    visualMap: [{
	        show: false,
	        type: 'continuous',
	        seriesIndex: 0,
	        min: 0,
	        max: 400
	    }, {
	        show: false,
	        type: 'continuous',
	        seriesIndex: 1,
	        dimension: 0,
	        min: 0,
	        max: dateList.length - 1
	    }],


	    title: [{
	        left: 'center',
	        text: '生产小时',
	        textStyle: {
		        fontSize: 14,
		        fontWeight: '300',
		        color: '#999'                             // 主标题文字颜色
		    },

	    }, {
	        top: '55%',
	        left: 'center',
	        text: '包装小时',
	        textStyle: {
		        fontSize: 14,
		        fontWeight: '300',
		        color: '#999'                             // 主标题文字颜色
		    },

	    }],
	    tooltip: {
	        trigger: 'axis'
	    },
	    xAxis: [{
	        data: dateList,
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
            splitLine: {show: false}
	    }, {
	        data: dateList,
	        gridIndex: 1,
	        axisLabel: {
              show: true,
              textStyle: {
                  color: '#555'
              }
            },
            splitLine: {show: false},
            axisLine: {
              lineStyle: {
                  type: 'solid',
                  color: '#555',//左边线的颜色
                  width:'1'//坐标线的宽度
              }
            }
	    }],
	    yAxis: [{
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
            },
	    }, {
	        splitLine: {show: false},
	        gridIndex: 1,
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
	    }],
	    grid: [{
	        bottom: '60%',
	        top:"10%"
	    }, {
	        top: '60%',
	        bottom: '10%'
	    }],
	    series: [{
	        type: 'line',
	        showSymbol: false,
	        data: valueList
	    }, {
	        type: 'line',
	        showSymbol: false,
	        data: valueList,
	        xAxisIndex: 1,
	        yAxisIndex: 1
	    }]
	};
                    
                   
	myTimeChart1.setOption(timeOption);
	myTimeChart2.setOption(timeOption);
	myTimeChart3.setOption(timeOption);
	myTimeChart4.setOption(timeOption);
	myTimeChart5.setOption(timeOption);
	myTimeChart6.setOption(timeOption);
	myTimeChart7.setOption(timeOption);
	myTimeChart8.setOption(timeOption);
                    
    






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
