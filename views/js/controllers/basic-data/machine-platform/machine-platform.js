app.controller('machinePlatformController', machinePlatformController);
machinePlatformController.$inject = ['$scope', 'Restangular' ,'ngTableParams', 'dialogs', 'toaster', '$http', '$rootScope', '$filter'];
function machinePlatformController($scope, Restangular, NgTableParams, dialogs, toaster, $http, $rootScope, $filter) {
	$scope.resoures = {
		list: [],//信息列表
	};
	$scope.machinePlatform = {
		list: [],//机台分类名称
	}
	$scope.myTable = null;
	//临时数据
	// $scope.prodTestData = [
	// 	{platNo:'1', platId:"P01", typeId:"K1214", platDisp:"1#机", typeName:"ZJG-20190722F2-119", typeId:"K1214", changeFlg:"true"},
	// 	{platNo:'2', platId:"P02", typeId:"K813", platDisp:"2#机", typeName:"SC20190718X1-521", typeId:"K1214", changeFlg:"true"},
	// 	{platNo:'3', platId:"P03", typeId:"K68", platDisp:"3#机", typeName:"SC20190617X1-437", typeId:"K1215", changeFlg:"false"},
	// ];
	// //临时赋予数据
	// $scope.resoures.list = $scope.prodTestData;
	// $scope.myTable = new NgTableParams({count: 10, sorting: { title: "desc" } }, { counts: [10, 20, 30], dataset: $scope.resoures.list});

	
	//查询所有机台基础数据信息/
	function machinePlatformAll() {
		var params = {
			"id": "",
			"platDisp": "",
			"platId": "",
			"platNo": "",
			"typeId": "",
			"typeName": ""
		}
		Restangular.all('/epeins-factory/machinePlatform/query').post(params).then(function(res) {
			if (res.resultCode == 200) {
				//过滤获取产品名称列表
				var result = [];
				var distinctArr = [];
				angular.forEach(res.resultData,function(item,index){
					//循环过滤掉重复的
					if(distinctArr.indexOf(item.typeId) == -1){
						distinctArr.push(item.typeId);
						result.push(item);
					}	
				});
				//写入数据
				$scope.machinePlatform.list = result;
				console.log('哈哈测试', $scope.machinePlatform.list);


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
				id: $scope.data.id || '',
				platDisp: $scope.data.platDisp || '', 
				platId: $scope.data.platId || '', 
				platNo: $scope.data.platNo || '', 
				typeId: $scope.data.typeId.typeId || '', 
				typeName: $scope.data.typeName || '', 
			};
			//console.log('测试类型',typeof(params));
			$scope.resoures.list = [];
			Restangular.all('/epeins-factory/machinePlatform/query').post(params).then(function(res) {
				//查询列表
				if (res) {
					//查询列表
					$scope.resoures.list = res.resultData;
					console.log($scope.resoures.list);
					$scope.myTable = new NgTableParams({count: 10, sorting: { title: "desc" } }, { counts: [10, 20, 30], dataset: $scope.resoures.list});
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
		var dlg = dialogs.create('views/tpl/basic-data/machine-platform/add.html','addPlatformController',{data:item},{size:'md'});
    };
	
    function modify(item) {
		var dlg = dialogs.create('views/tpl/basic-data/machine-platform/modify.html','modifyPlatformController',{data:item},{size:'md'});	
    };

    function deleted(item) {
		var dlg = dialogs.create('views/tpl/basic-data/machine-platform/delete.html','detelePlatformController',{data:item},{size:'sm'});	
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
		machinePlatformAll();
	};
	// 新建列表成功
	$rootScope.$on('addSuccess', function (event, data) {
		machinePlatformAll();
	})
	// 修改列表成功
	$rootScope.$on('modifySuccess', function (event, data) {
		machinePlatformAll();
	})
	// 删除列表成功
	$rootScope.$on('deleteSuccess', function (event, data) {
		machinePlatformAll();
	})

	init();
};



app.controller('addPlatformController',function($scope, $modalInstance, Restangular, data, toaster, $rootScope){
	$scope.title = "新增机台基础数据";
	//添加数据对象
	$scope.data = {
		platId: "",
		platNo: "",
		platDisp: "",
		typeId: "",
		typeName: "",
		memo: "",	
	}
	//console.log('测试试试',$scope.data.platId);
	$scope.machinePlatform = {
		list: [],//分类列表
	}
	//过滤获取机型id及机型名称
    function machinePlatformList() {
		var params = {
			"id": "",
			"platDisp": "",
			"platId": "",
			"platNo": "",
			"typeId": "",
			"typeName": ""
		}
		Restangular.all('/epeins-factory/machinePlatform/query').post(params).then(function(res) {
			if (res.resultCode == 200) {
				var result = [];
				var distinctArr = [];
				angular.forEach(res.resultData,function(item,index){
					//循环过滤掉重复的
					// if(distinctArr.indexOf(item.typeId) == -1 && distinctArr.indexOf(item.typeName) == -1){
					// 	distinctArr.push(item.typeId,item.typeName);
					// 	result.push(item);
					// }
					if(distinctArr.indexOf(item.typeId) == -1){
						distinctArr.push(item.typeId);
						result.push(item);
					}		
				});
				//console.log('打印result',result);
				console.log('测试',result);
				//写入数据
				$scope.machinePlatform.list = result;
			}	
		}, function(errResponse) {
			console.log("Error with status code", errResponse.status);
		}); 
		
	};

	// 方法
	$scope.method = {
		submit: submit,
		cancel: cancel,
	}
	function init() {
		machinePlatformList();
	}
	function cancel(){
		$modalInstance.dismiss('Cancelled');
	};
	
	function submit(){
		//获取输入数据
		var item = {
			platId: $scope.data.platId,
			platNo: $scope.data.platNo,
			platDisp: $scope.data.platDisp,
			//typeId: $scope.data.typeId.typeId,
			typeId: $scope.data.typeId,
			typeName: $scope.data.typeName,
			memo: $scope.data.memo,	
		}
		console.log('新增传递参数',item);
		// 调接口，储存
		Restangular.all('/epeins-factory/machinePlatform/addOrUpdate').post(item).then(function(res) {
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
app.controller('modifyPlatformController',function($scope, $modalInstance, data, Restangular, $rootScope, toaster){
	$scope.title = "机台计划变更";
	//选中的行赋给details数组
	$scope.details = data.data;
	$scope.machinePlatform = {
		list: [],//分类列表
	}
	//获取筛选产品名称
    //过滤获取机型id及机型名称
    function machinePlatformList() {
		var params = {
			"id": "",
			"platDisp": "",
			"platId": "",
			"platNo": "",
			"typeId": "",
			"typeName": ""
		}
		Restangular.all('/epeins-factory/machinePlatform/query').post(params).then(function(res) {
			if (res.resultCode == 200) {
				var result = [];
				var distinctArr = [];
				angular.forEach(res.resultData,function(item,index){
					//循环过滤掉重复的
					if(distinctArr.indexOf(item.typeId) == -1){
						distinctArr.push(item.typeId);
						result.push(item);
					}		
				});
				//console.log('打印result',result);
				console.log('测试',result);
				//写入数据
				$scope.machinePlatform.list = result;
			}	
		}, function(errResponse) {
			console.log("Error with status code", errResponse.status);
		}); 
		
	};
	function init() {
		machinePlatformList();
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
			platId: $scope.details.platId,
			platNo: $scope.details.platNo,
			platDisp: $scope.details.platDisp,
			typeId: $scope.details.typeId,
			typeName: $scope.details.typeName,
			memo: $scope.details.memo,
		}
		console.log('传递参数',item);
		//传递参数，调接口
		Restangular.all('/epeins-factory/machinePlatform/addOrUpdate').post(item).then(function(res) {
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

app.controller('detelePlatformController',function($scope, $modalInstance, data, Restangular, $rootScope,toaster){
	console.log(data);
	$scope.title = "删除机台数据";
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
		Restangular.one('/epeins-factory/machinePlatform/delete').customGET('',params).then(function(res) {
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
