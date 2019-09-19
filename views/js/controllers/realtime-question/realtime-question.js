app.controller('productAdminController', ['$scope', 'Restangular' ,'ngTableParams', 'dialogs', 'toaster', 
	function($scope, Restangular, NgTableParams, dialogs, toaster) {

     $scope.toggleDropdown = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.status.isopen = !$scope.status.isopen;
    };
	

    //产品
    
    
    var myQuestionChart1 = echarts.init(document.getElementById('questioncharts1'));
    var myQuestionChart2 = echarts.init(document.getElementById('questioncharts2'));
    var myQuestionChart3 = echarts.init(document.getElementById('questioncharts3'));

    questionOption1 = {
	    title : {
	        text: '生产问题分析',
	        textStyle: {
		        fontSize: 15,
		        fontWeight: '300',
		        color: '#999'                             // 主标题文字颜色
		    },
	    },
	    tooltip : {
	        trigger: 'axis'
	    },
	    legend: {
	        data:['蒸发量']
	    },
	    calculable : true,
	    xAxis : [
	        {
	            type : 'category',
	            data : ['夹生1', '夹生2', '叠模1', '叠模2', '过热1', '过热2', '填料1','填料2','脏破1','脏破2'],
	            axisTick: {
                    alignWithLabel: true
                },
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
	                show:false
	            }
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value',
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
	    series : [
	        {
	            name:'直接访问',
	            type:'bar',
	            data:[10, 52, 33, 28, 76, 48, 25,92,27,21],
	            markPoint : {
	                data : [
	                    {type : 'max', name: '最大值'},
	                    {type : 'min', name: '最小值'}
	                ]
	            },
	            markLine : {
	                data : [
	                    {type : 'average', name: '平均值'}
	                ]
	            }
	        }
	    ]
	};



	app.title = '极坐标系下的堆叠柱状图';

	questionOption2 = {
	    angleAxis: {
	        type: 'category',
	        data: ['1#机', '2#机', '3#机', '4#机', '5#机', '6#机', '7#机','8#机','9#机','10#机'],
	        z: 10,
	        axisLabel: {
              show: true,
              textStyle: {
                  color: '#999'
              }
            },
            axisLine: {
              lineStyle: {
                  type: 'solid',
                  color: '#999',//左边线的颜色
                  width:'1'//坐标线的宽度
              }
            },
	    },
	    radiusAxis: {
	    },
	    polar: {
	    },
	    series: [{
	        type: 'bar',
	        data: [1, 2, 3, 4, 3, 5, 1],
	        coordinateSystem: 'polar',
	        name: '叠模',
	        stack: 'a'
	    }, {
	        type: 'bar',
	        data: [2, 4, 6, 1, 3, 2, 1],
	        coordinateSystem: 'polar',
	        name: '过热',
	        stack: 'a'
	    }, {
	        type: 'bar',
	        data: [1, 2, 3, 4, 1, 2, 5],
	        coordinateSystem: 'polar',
	        name: '脏破',
	        stack: 'a'
	    }],
	    legend: {
	        show: true,
	        data: ['叠模', '过热', '脏破'],
	        textStyle: {  
                color: '#999'  
            },  
	    }
	};

    


    questionOption3 = {
	    title : {
	        text: '周期内问题发生次数',
	        textStyle: {
	          fontSize: 15,
	          fontWeight: '300',
	          color: '#999'                             // 主标题文字颜色
	      },
	    },
	    tooltip : {
	        trigger: 'axis'
	    },
	    legend: {
	        data:['叠模','过热','脏破'],
	        textStyle: {  
                color: '#999'  
            },  
	    },
	    calculable : true,
	    xAxis : [
	        {
	            type : 'category',
	            boundaryGap : false,
	            data : ['周一','周二','周三','周四','周五','周六','周日'],
	            axisTick: {
                    alignWithLabel: true
                },
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
	                show:false
	            }
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value',
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
	    series : [
	        {
	            name:'叠模',
	            type:'line',
	            smooth:true,
	            itemStyle: {normal: {areaStyle: {type: 'default'}}},
	            data:[10, 12, 21, 54, 260, 830, 710]
	        },
	        {
	            name:'过热',
	            type:'line',
	            smooth:true,
	            itemStyle: {normal: {areaStyle: {type: 'default'}}},
	            data:[30, 182, 434, 791, 390, 30, 10]
	        },
	        {
	            name:'脏破',
	            type:'line',
	            smooth:true,
	            itemStyle: {normal: {areaStyle: {type: 'default'}}},
	            data:[1320, 1132, 601, 234, 120, 90, 20]
	        }
	    ]
	};
                    
                                    
                    
	myQuestionChart1.setOption(questionOption1);
	myQuestionChart2.setOption(questionOption2);
	myQuestionChart3.setOption(questionOption3);
                    
    






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
