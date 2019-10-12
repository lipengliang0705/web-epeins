app.controller('productInfoController', productInfoController);
productInfoController.$inject = ['$scope', 'Restangular' ,'ngTableParams', 'dialogs', 'toaster', '$http', '$rootScope', '$filter'];
function productInfoController($scope, Restangular, NgTableParams, dialogs, toaster, $http, $rootScope, $filter) {
	$scope.resoures = {
		list: [],//信息列表
	};
	$scope.prodName = {
		list: [],//产品分类名称
	}
	$scope.myTable = null;
	//查询所有产品基础数据信息/epeins-factory/productInfo/query
	function productionInfoAll() {
		var params = {
			"id": "",
			"memo": "",
			"prodName": ""
		}
		// Restangular.one('/epeins-factory/planInfo/findOne').customGET('',params).then(function(res) {
		Restangular.all('/epeins-factory/productInfo/query').post(params).then(function(res) {
			console.log('哈哈', res.resultData);
			if (res.resultCode == 200) {
				//过滤获取产品名称列表
				var result = [];
				var distinctArr = [];
				angular.forEach(res.resultData,function(item,index){
					//循环过滤掉重复的
					if(distinctArr.indexOf(item.prodName) == -1){
						distinctArr.push(item.prodName);
						result.push(item);
					}	
				});
				//写入数据
				$scope.prodName.list = result;


				//写入数据
				$scope.resoures.list = res.resultData;
				$scope.myTable = new NgTableParams({count: 10, sorting: { title: "desc" } }, { counts: [10, 20, 30], dataset: $scope.resoures.list});
			}	
		}, function(errResponse) {
			console.log("Error with status code", errResponse.status);
		}); 
		
	};
	//时间插件
	$scope.today = function() {
		$scope.dt = new Date();
	};
	$scope.today();

	$scope.clear = function () {
		$scope.dt = null;
	};

	// Disable weekend selection
	$scope.disabled = function(date, mode) {
		return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
	};

	$scope.toggleMin = function() {
		$scope.minDate = $scope.minDate ? null : new Date();
	};
	$scope.toggleMin();

	$scope.open = function($event, target) {
		$event.preventDefault();
		$event.stopPropagation();

		$scope[target] = !$scope[target];
	};
	$scope.dateOptions = {
		formatYear: 'yy',
		startingDay: 1,
		class: 'datepicker'
	};
	$scope.initDate = new Date('2016-15-20');
	$scope.formats = ['dd-MMMM-yyyy', 'yyyy-MM-dd', 'dd.MM.yyyy', 'shortDate'];
	$scope.format = $scope.formats[1];

    $scope.toggleDropdown = function($event) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope.status.isopen = !$scope.status.isopen;
    };
	function search(){
		//三者必须选择其一的时候判断用，否则不需要
		//if ($scope.data.title || $scope.data.startDate || $scope.data.endDate) {
			// 提交的参数，并判断是否为空
			var params = { 
				categoryId: '',
				knowledge:$scope.data.title || '', 
				beginTime:$scope.data.startDate?$filter('date')($scope.data.startDate, 'yyyy-MM-dd'):'',
				endTime:$scope.data.endDate?$filter('date')($scope.data.endDate, 'yyyy-MM-dd'):''
			};
			console.log('测试类型',typeof(params));
			$scope.resoures.list = [];
			Restangular.all('/api/knowledge/knowledge-all').post(params).then(function(res) {
				//查询列表
				if (res) {
					//查询列表
					$scope.resoures.list = res;
					$scope.myTable = new NgTableParams({count: 5, sorting: { title: "desc" } }, { counts: [5, 10, 20], dataset: $scope.resoures.list});
				}
			}, function(errRes) {
				//console.log("Error with status code", errRes.status);
			});
		// }
	}
	//表格模糊匹配搜索
	$scope.$watch("data.search", function (newValue, oldValue) {
		//console.log(newValue, oldValue);
		if (newValue == undefined) {
			$scope.myTable.filter({});
		} else if (newValue != oldValue) {
			$scope.myTable.filter({ $: $scope.data.search.prodName });
		}
	});

	function add(item) {
		var dlg = dialogs.create('views/tpl/basic-data/product-info/add.html','addController',{data:item},{size:'md'});
    };
	
    function modify(item) {
		var dlg = dialogs.create('views/tpl/basic-data/product-info/modify.html','modifyController',{data:item},{size:'md'});	
    };

    function deleted(item) {
		var dlg = dialogs.create('views/tpl/basic-data/product-info/delete.html','deteleDataController',{data:item},{size:'sm'});	
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
		productionInfoAll();
	};
	// 新建列表成功
	$rootScope.$on('addSuccess', function (event, data) {
		productionInfoAll();
	})
	// 修改列表成功
	$rootScope.$on('modifySuccess', function (event, data) {
		productionInfoAll();
	})
	// 删除列表成功
	$rootScope.$on('deleteSuccess', function (event, data) {
		productionInfoAll();
	})
	// $scope.delete = deleted;
	// $scope.modify = modify;
	// $scope.add = add;

	init();
};



app.controller('addController',function($scope, $modalInstance, Restangular, data, toaster, $rootScope){
	$scope.title = "新增产品基础数据";
	// $scope.prodUuid = [
	// 	{id:'1', platId:"1#机", typeId:"K1214", prodName:"YFL-1-T/B", taskId:"ZJG-20190722F2-119", materialId:"LBK15D", changeFlg:"true"},
	// 	{id:'2', platId:"2#机", typeId:"K1214", prodName:"XJ-50B", taskId:"SC20190718X1-521", materialId:"PB4520", changeFlg:"true"},
	// 	{id:'3', platId:"3#机", typeId:"K1214", prodName:"XJ-20-T", taskId:"SC20190617X1-437", materialId:"PB4520", changeFlg:"false"},
	// ];
	//时间插件
	$scope.today = function() {
		$scope.dt = new Date();
	};
	$scope.today();

	$scope.clear = function () {
		$scope.dt = null;
	};

	// Disable weekend selection
	$scope.disabled = function(date, mode) {
		return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
	};

	$scope.toggleMin = function() {
		$scope.minDate = $scope.minDate ? null : new Date();
	};
	$scope.toggleMin();

	$scope.open = function($event, target) {
		$event.preventDefault();
		$event.stopPropagation();

		$scope[target] = !$scope[target];
	};
	$scope.dateOptions = {
		formatYear: 'yy',
		startingDay: 1,
		class: 'datepicker'
	};
	$scope.initDate = new Date('2016-15-20');
	$scope.formats = ['dd-MMMM-yyyy', 'yyyy-MM-dd', 'dd.MM.yyyy', 'shortDate'];
	$scope.format = $scope.formats[1];
	//添加数据对象
	$scope.data = {
		prodName: '',
		memo: '',
		createTime: new Date(),
		updateTime: new Date(),
	}
	//console.log('测试试试',$scope.data.platId);
	$scope.prodName = {
		list: [],//分类列表
	}
	//过滤获取产品名称
    function prodNameList() {
		var params = {
			"id": "",
			"memo": "",
			"prodName": ""
		}
		Restangular.all('/epeins-factory/productInfo/query').post(params).then(function(res) {
			if (res.resultCode == 200) {
				var result = [];
				var distinctArr = [];
				angular.forEach(res.resultData,function(item,index){
					//console.log('获取每一个产品',item);
					//循环过滤掉重复的
					if(distinctArr.indexOf(item.prodName) == -1){
						distinctArr.push(item.prodName);
						result.push(item);
					}	
				});
				//console.log('打印result',result);
				//console.log(result);
				//写入数据
				$scope.prodName.list = result;
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
		prodNameList();
	}
	function cancel(){
		$modalInstance.dismiss('Cancelled');
	};
	
	function submit(){
		//获取输入数据
		var item = {
			prodName: $scope.data.prodName.prodName,
			memo: $scope.data.memo,
		}
		console.log('新增传递参数',item);
		// 调接口，储存
		Restangular.all('/epeins-factory/productInfo/addOrUpdate').post(item).then(function(res) {
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
app.controller('modifyController',function($scope, $modalInstance, data, Restangular, $rootScope, toaster){
	//修改列表接口method: 'PUT',url: '/api/knowledge/knowledge-infos'
	$scope.title = "产品计划变更";
	//数据对象
	//$scope.details = [];
	//选中的行赋给details数组
	$scope.details = data.data;
	console.log('enen',$scope.details);
	$scope.prodName = {
		list: [],//分类列表
	}
	//获取筛选产品名称
    function prodNameList() {
		var params = {
			"id": "",
			"memo": "",
			"prodName": ""
		}
		Restangular.all('/epeins-factory/productInfo/query').post(params).then(function(res) {
			if (res.resultCode == 200) {
				var result = [];
				var distinctArr = [];
				angular.forEach(res.resultData,function(item,index){
					//循环过滤掉重复的
					if(distinctArr.indexOf(item.prodName) == -1){
						distinctArr.push(item.prodName);
						result.push(item);
					}	
				});
				//写入数据
				$scope.prodName.list = result;
				//console.log($scope.prodName.list);
			}	
		}, function(errResponse) {
			console.log("Error with status code", errResponse.status);
		}); 	
	};
	$scope.testChange = function () {
         console.log($scope.testSelect); 
     }
		
	function init() {
		prodNameList();
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
			prodName: $scope.details.prodName.prodName,
			memo: $scope.details.memo,
		}
		console.log('传递参数',item);
		//传递参数，调接口
		Restangular.all('/epeins-factory/productInfo/addOrUpdate').post(item).then(function(res) {
			console.log(res);
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

app.controller('deteleDataController',function($scope, $modalInstance, data, Restangular, $rootScope,toaster){
	console.log(data);
	$scope.title = "删除产品数据";
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
		Restangular.one('/epeins-factory/productInfo/delete').customGET('',params).then(function(res) {
		//Restangular.one('/epeins-factory/productInfo/delete/', $scope.data.id).get().then(function(res) {
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
