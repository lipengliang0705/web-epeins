app.controller('taskInfoController', taskInfoController);
taskInfoController.$inject = ['$scope', 'Restangular' ,'ngTableParams', 'dialogs', 'toaster', '$http', '$rootScope', '$filter'];
function taskInfoController($scope, Restangular, NgTableParams, dialogs, toaster, $http, $rootScope, $filter) {
	$scope.resoures = {
		list: [],//信息列表
	};
	$scope.taskNo = {
		list: [],//机台分类名称
	}
	$scope.myTable = null;
	//查询所有任务单基础数据信息/
	function taskInfoAll() {
		var params = {
			"id": "",
			"prodId": "",
			"prodName": "",
			"taskCount": "",
			"taskNo": ""
			
		}
		// Restangular.one('/epeins-factory/planInfo/findOne').customGET('',params).then(function(res) {
		Restangular.all('/epeins-factory/taskInfo/query').post(params).then(function(res) {
			console.log('哈哈', res.resultData);
			if (res.resultCode == 200) {
				//过滤获取产品名称列表
				// var result = [];
				// var distinctArr = [];
				// angular.forEach(res.resultData,function(item,index){
				// 	//循环过滤掉重复的
				// 	if(distinctArr.indexOf(item.typeId) == -1){
				// 		distinctArr.push(item.typeId);
				// 		result.push(item);
				// 	}	
				// });
				// //写入数据
				// $scope.machinePlatform.list = result;
				//写入数据
				$scope.resoures.list = res.resultData;
				$scope.myTable = new NgTableParams({count: 10, sorting: { title: "desc" } }, { counts: [10, 20, 30], dataset: $scope.resoures.list});
			}	
		}, function(errResponse) {
			console.log("Error with status code", errResponse.status);
		}); 
		
	};
	//搜索
	function search(){
		//三者必须选择其一的时候判断用，否则不需要
		//if ($scope.data.title || $scope.data.startDate || $scope.data.endDate) {
			// 提交的参数，并判断是否为空
			var params = { 
				id: '',
				prodId:$scope.data.prodId || '', 
				prodName:$scope.data.prodName || '',
				taskCount:$scope.data.taskCount || '',
				taskNo:$scope.data.taskNo || '',
				// beginTime:$scope.data.startDate?$filter('date')($scope.data.startDate, 'yyyy-MM-dd'):'',
				// endTime:$scope.data.endDate?$filter('date')($scope.data.endDate, 'yyyy-MM-dd'):''
			};
			console.log('测试类型',typeof(params));
			$scope.resoures.list = [];
			Restangular.all('/epeins-factory/taskInfo/query').post(params).then(function(res) {
				//查询列表
				if (res) {
					//查询列表
					$scope.resoures.list = res.resultData;
					$scope.myTable = new NgTableParams({count: 5, sorting: { title: "desc" } }, { counts: [5, 10, 20], dataset: $scope.resoures.list});
				}
			}, function(errRes) {
				//console.log("Error with status code", errRes.status);
			});
		// }
	}
	//表格模糊匹配搜索
	// $scope.$watch("data.search", function (newValue, oldValue) {
	// 	//console.log(newValue, oldValue);
	// 	if (newValue == undefined) {
	// 		$scope.myTable.filter({});
	// 	} else if (newValue != oldValue) {
	// 		$scope.myTable.filter({ $: $scope.data.search.typeId });
	// 	}
	// });

	function add(item) {
		var dlg = dialogs.create('views/tpl/basic-data/task-info/add.html','addTaskInfoController',{data:item},{size:'md'});
    };
	
    function modify(item) {
		var dlg = dialogs.create('views/tpl/basic-data/task-info/modify.html','modifyTaskInfoController',{data:item},{size:'md'});	
    };

    function deleted(item) {
		var dlg = dialogs.create('views/tpl/basic-data/task-info/delete.html','deteleTaskInfoController',{data:item},{size:'sm'});	
	};
	$scope.data = {
		search:'',
	};
	//定义方法
	$scope.method = {
		add:add,
		modify:modify,
		deleted:deleted,
		search:search,
	};
	
	//初始化方法
	function init(){
		taskInfoAll();
	};
	// 新建列表成功
	$rootScope.$on('addSuccess', function (event, data) {
		taskInfoAll();
	})
	// 修改列表成功
	$rootScope.$on('modifySuccess', function (event, data) {
		taskInfoAll();
	})
	// 删除列表成功
	$rootScope.$on('deleteSuccess', function (event, data) {
		taskInfoAll();
	})

	init();
};



app.controller('addTaskInfoController',function($scope, $modalInstance, Restangular, data, toaster, $rootScope){
	$scope.title = "新增任务单基础数据";
	//添加数据对象
	$scope.data = {
		id: "",
		prodId: "",
		prodName: "",
		taskCount: "",	
		taskNo: "",
		memo: "",
		updateTime: new Date(),
	}
	//console.log('测试试试',$scope.data.platId);
	$scope.taskNo = {
		list: [],//任务单号列表
	}
	//过滤获任务单号
    // function taskNoList() {
	// 	var params = {
	// 		"id": "",
	// 		"prodId": "",
	// 		"prodName": "",
	// 		"taskCount": "",
	// 		"taskNo": "",
	// 	}
	// 	Restangular.all('/epeins-factory/machineType/query').post(params).then(function(res) {
	// 		if (res.resultCode == 200) {
	// 			var result = [];
	// 			var distinctArr = [];
	// 			angular.forEach(res.resultData,function(item,index){
	// 				//循环过滤掉重复的
	// 				if(distinctArr.indexOf(item.typeId) == -1 && distinctArr.indexOf(item.typeName) == -1){
	// 					distinctArr.push(item.typeId,item.typeName);
	// 					result.push(item);
	// 				}	
	// 			});
	// 			//console.log('打印result',result);
	// 			console.log('测试',result);
	// 			//写入数据
	// 			$scope.machineType.list = result;
	// 		}	
	// 	}, function(errResponse) {
	// 		console.log("Error with status code", errResponse.status);
	// 	}); 
		
	// };

	// 方法
	$scope.method = {
		submit: submit,
		cancel: cancel,
	}
	function init() {
		//taskNoList();
	}
	function cancel(){
		$modalInstance.dismiss('Cancelled');
	};
	
	function submit(){
		//获取输入数据
		var item = {
			prodId: $scope.data.prodId,
			prodName: $scope.data.prodName,
			taskCount: $scope.data.taskCount,
			taskNo: $scope.data.taskNo,
		}
		console.log('新增传递参数',item);
		// 调接口，储存
		Restangular.all('/epeins-factory/taskInfo/addOrUpdate').post(item).then(function(res) {
			console.log('添加列表', res);
			if (res.resultCode == 200) {
				// 储存成功后，并且刷新页面
				toaster.pop('success', '', '新建数据成功！');
				$rootScope.$broadcast('addSuccess');
			}	
		}, function(errRes) {
			console.log("Error with status code", errRes.status);
		});
		cancel();
	};
	init();
});
app.controller('modifyTaskInfoController',function($scope, $modalInstance, data, Restangular, $rootScope, toaster){
	$scope.title = "任务单变更";
	//选中的行赋给details数组
	$scope.details = data.data;
	function init() {
	}
	//方法
	$scope.method = {
		submit: submit,
		cancel: cancel,
	}
	function cancel(){
		$modalInstance.dismiss('Cancelled');
	};
	
	function submit(){
		var item = {
			id: $scope.details.id,
			prodId: $scope.details.prodId,
			prodName: $scope.details.prodName,
			taskCount: $scope.details.taskCount,
			taskNo: $scope.details.taskNo,
		}
		console.log('传递参数',item);
		//传递参数，调接口
		Restangular.all('/epeins-factory/taskInfo/addOrUpdate').post(item).then(function(res) {
			if (res.resultCode == 200) {
				// 储存成功后，跳转到列表页，并且刷新页面
				$rootScope.$broadcast('modifySuccess');
				toaster.pop('success', '修改数据成功！');
			}	
		}, function(errResponse) {
			console.log("Error with status code", errResponse.status);
		});
		// 关闭
		cancel();
	};
	init();

});

app.controller('deteleTaskInfoController',function($scope, $modalInstance, data, Restangular, $rootScope,toaster){
	console.log(data);
	$scope.title = "删除任务单数据";
	$scope.data = {
		id: data.data,
	}
	// 方法
	$scope.method = {
		submit: submit,
		cancel: cancel,
	}
	function cancel(){
		$modalInstance.dismiss('Cancelled');
	};
	
	function submit(id) {
		//调删除接口/productInfo/delete
		var params = {
			"id": $scope.data.id,
		}
		Restangular.one('/epeins-factory/taskInfo/delete').customGET('',params).then(function(res) {
			console.log(res);
			if (res.resultCode == 200) {
				//请求删除数据
				$rootScope.$broadcast('deleteSuccess');
				toaster.pop('success', '删除数据成功！');
				// 关闭
				cancel();
			}	
		}, function(errResponse) {
			console.log("Error with status code", errResponse.status);
		}); 
		// 关闭
		cancel();	
	}
});
