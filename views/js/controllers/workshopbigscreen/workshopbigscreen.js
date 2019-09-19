app.controller('productAdminController', ['$scope', 'Restangular' ,'ngTableParams', 'dialogs', 'toaster', 
	function($scope, Restangular, NgTableParams, dialogs, toaster) {

     $scope.toggleDropdown = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.status.isopen = !$scope.status.isopen;
    };
	

    //产品
    var myGaugeChart1 = echarts.init(document.getElementById('gaugecharts1'));
    var myGaugeChart2 = echarts.init(document.getElementById('gaugecharts2'));
    var myGaugeChart3 = echarts.init(document.getElementById('gaugecharts3'));
    var myGaugeChart4 = echarts.init(document.getElementById('gaugecharts4'));
    var myGaugeChart5 = echarts.init(document.getElementById('gaugecharts5'));
    var myGaugeChart6 = echarts.init(document.getElementById('gaugecharts6'));
    var myGaugeChart7 = echarts.init(document.getElementById('gaugecharts7'));
    var myGaugeChart8 = echarts.init(document.getElementById('gaugecharts8'));
    var myGaugeChart9 = echarts.init(document.getElementById('gaugecharts9'));
    var myGaugeChart10 = echarts.init(document.getElementById('gaugecharts10'));
    var myGaugeChart11 = echarts.init(document.getElementById('gaugecharts11'));
    var myGaugeChart12 = echarts.init(document.getElementById('gaugecharts12'));
    var myGaugeChart13 = echarts.init(document.getElementById('gaugecharts13'));
    var myGaugeChart14 = echarts.init(document.getElementById('gaugecharts14'));
    var myGaugeChart15 = echarts.init(document.getElementById('gaugecharts15'));
    var myGaugeChart16 = echarts.init(document.getElementById('gaugecharts16'));
    var myGaugeChart17 = echarts.init(document.getElementById('gaugecharts17'));
    var myGaugeChart18 = echarts.init(document.getElementById('gaugecharts18'));
    var myGaugeChart19 = echarts.init(document.getElementById('gaugecharts19'));
    option = {
	    tooltip : {
	        formatter: "{a} <br/>{b} : {c}%"
	    },
	    series: [
	        {
	            name: '业务指标',
	            type: 'gauge',
	            center: ["50%", "71%"], // 默认全局居中
	            radius : "110%",
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
	    option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
	    myGaugeChart1.setOption(option, true);
	},2000);

	setInterval(function () {
	    option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
	    myGaugeChart2.setOption(option, true);
	},2000);
	setInterval(function () {
	    option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
	    myGaugeChart3.setOption(option, true);
	},2000);
	setInterval(function () {
	    option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
	    myGaugeChart4.setOption(option, true);
	},2000);
	setInterval(function () {
	    option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
	    myGaugeChart5.setOption(option, true);
	},2000);
	setInterval(function () {
	    option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
	    myGaugeChart6.setOption(option, true);
	},2000);
	setInterval(function () {
	    option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
	    myGaugeChart7.setOption(option, true);
	},2000);
	setInterval(function () {
	    option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
	    myGaugeChart8.setOption(option, true);
	},2000);
	setInterval(function () {
	    option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
	    myGaugeChart9.setOption(option, true);
	},2000);
	setInterval(function () {
	    option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
	    myGaugeChart10.setOption(option, true);
	},2000);
	setInterval(function () {
	    option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
	    myGaugeChart11.setOption(option, true);
	},2000);
	setInterval(function () {
	    option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
	    myGaugeChart12.setOption(option, true);
	},2000);
	setInterval(function () {
	    option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
	    myGaugeChart13.setOption(option, true);
	},2000);
	setInterval(function () {
	    option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
	    myGaugeChart14.setOption(option, true);
	},2000);
	setInterval(function () {
	    option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
	    myGaugeChart15.setOption(option, true);
	},2000);
	setInterval(function () {
	    option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
	    myGaugeChart16.setOption(option, true);
	},2000);
	setInterval(function () {
	    option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
	    myGaugeChart17.setOption(option, true);
	},2000);
	setInterval(function () {
	    option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
	    myGaugeChart18.setOption(option, true);
	},2000);
	setInterval(function () {
	    option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
	    myGaugeChart19.setOption(option, true);
	},2000);
                    
	
                    
                    
	//myGaugeChart.setOption(option);
                    
    






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
