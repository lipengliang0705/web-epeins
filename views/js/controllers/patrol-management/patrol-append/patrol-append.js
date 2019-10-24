app.controller('patrolReportController', patrolReportController);
patrolReportController.$inject = ['$scope', 'Restangular' ,'ngTableParams', 'dialogs', 'toaster', '$http', '$rootScope', '$filter','$stateParams'];
function patrolReportController($scope, Restangular, NgTableParams, dialogs, toaster, $http, $rootScope, $filter,$stateParams) {
	console.log($stateParams)
	//选中的行赋给details数组
	$scope.details = $stateParams;
	$scope.resoures = {
		list: [],//信息列表
	};
	$scope.machineType = {
		list: [],//机型分类名称
	}
	$scope.myTable = null;
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

	//时分控制
	//$scope.mytime = new Date();
    $scope.hstep = 1;
	$scope.mstep = 15;
	
	$scope.hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
	$scope.minutes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41,  42, 43, 44, 45, 46, 47, 48, 49, 50,  51, 52, 53, 54, 55, 56, 57, 58, 59, 60];
	//临时数据
	$scope.prodTestData = [
		{platNo:'1', chkDate:"2019-10-10", chkTime:"9:30", owner:"许太阳", inspector:"张元风", judge:"",  weight:"1008", planDate:"2019-10-11 10:22:54",changeFlg:"true"},
	];
	//临时赋予数据
	$scope.resoures.list = $scope.prodTestData;
	$scope.myTable = new NgTableParams({count: 10, sorting: { title: "desc" } }, { counts: [10, 20, 30], dataset: $scope.resoures.list});






	//查询所有机型基础数据信息/epeins-factory/machineType/query
	function machineTypeAll() {
		var params = {
			"id": "",
			"typeId": "",
			"typeName": "",
			"memo": ""
			
		}
		// Restangular.one('/epeins-factory/planInfo/findOne').customGET('',params).then(function(res) {
		// Restangular.all('/epeins-factory/machineType/query').post(params).then(function(res) {
		// 	console.log('哈哈', res.resultData);
		// 	if (res.resultCode == 200) {
		// 		//过滤获取产品名称列表
		// 		var result = [];
		// 		var distinctArr = [];
		// 		angular.forEach(res.resultData,function(item,index){
		// 			//循环过滤掉重复的
		// 			if(distinctArr.indexOf(item.typeId) == -1){
		// 				distinctArr.push(item.typeId);
		// 				result.push(item);
		// 			}	
		// 		});
		// 		//写入数据
		// 		$scope.machineType.list = result;


		// 		//写入数据
		// 		$scope.resoures.list = res.resultData;
		// 		$scope.myTable = new NgTableParams({count: 10, sorting: { title: "desc" } }, { counts: [10, 20, 30], dataset: $scope.resoures.list});
		// 	}	
		// }, function(errResponse) {
		// 	console.log("Error with status code", errResponse.status);
		// }); 
		
	};
	//搜索
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
			$scope.myTable.filter({ $: $scope.data.search.typeId });
		}
	});

	function add(item) {
		var dlg = dialogs.create('views/tpl/patrol-management/patrol-report/add.html','addPatrolReportController',{data:item},{size:'md'});
    };
	
    function modify(item) {
		var dlg = dialogs.create('views/tpl/patrol-management/patrol-report/modify.html','modifyPatrolReportController',{data:item},{size:'md'});	
    };

    function deleted(item) {
		var dlg = dialogs.create('views/tpl/patrol-management/patrol-report/delete.html','detelePatrolReportController',{data:item},{size:'sm'});	
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
		machineTypeAll();
	};
	// 新建列表成功
	$rootScope.$on('addSuccess', function (event, data) {
		machineTypeAll();
	})
	// 修改列表成功
	$rootScope.$on('modifySuccess', function (event, data) {
		machineTypeAll();
	})
	// 删除列表成功
	$rootScope.$on('deleteSuccess', function (event, data) {
		machineTypeAll();
	})

	init();
};



app.controller('addPatrolReportController',function($scope, $modalInstance, Restangular, data, toaster, $rootScope){
	$scope.title = "新增工程巡检报告数据";
	//临时测试数据
	// $scope.prodUuid = [
	// 	{id:'1', platId:"1#机", typeId:"K1214", prodName:"YFL-1-T/B", typeName:"ZJG-20190722F2-119", materialId:"LBK15D", changeFlg:"true"},
	// 	{id:'2', platId:"2#机", typeId:"K813", prodName:"XJ-50B", typeName:"SC20190718X1-521", materialId:"PB4520", changeFlg:"true"},
	// 	{id:'3', platId:"3#机", typeId:"K68", prodName:"XJ-20-T", typeName:"SC20190617X1-437", materialId:"PB4520", changeFlg:"false"},
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
	//时间方法
	$scope.hstep = 1;
	$scope.mstep = 15;
	//添加数据对象
	$scope.data = {
		id: "",
		chkDate: "",
		chkTime: "",
		owner: "",	
		inspector: "",
		createTime: new Date(),
		updateTime: new Date(),
	}
	console.log('测试试试',$scope.data);
	$scope.machineType = {
		list: [],//分类列表
	}
	//过滤获取机型id及机型名称
    function machineTypeList() {
		var params = {
			"id": "",
			"typeId": "",
			"typeName": "",
			"memo": ""	
		}
		Restangular.all('/epeins-factory/machineType/query').post(params).then(function(res) {
			if (res.resultCode == 200) {
				var result = [];
				var distinctArr = [];
				angular.forEach(res.resultData,function(item,index){
					//循环过滤掉重复的
					if(distinctArr.indexOf(item.typeId) == -1 && distinctArr.indexOf(item.typeName) == -1){
						distinctArr.push(item.typeId,item.typeName);
						result.push(item);
					}	
				});
				//console.log('打印result',result);
				console.log('测试',result);
				//写入数据
				$scope.machineType.list = result;
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
		machineTypeList();
	}
	function cancel(){
		$modalInstance.dismiss('Cancelled');
	};
	
	function submit(){
		//获取输入数据
		var ymd = new Date($scope.data.chkDate);
		var resDate = ymd.getFullYear() + '-' + p((ymd.getMonth() + 1)) + '-' + p(ymd.getDate());
		var hms = new Date($scope.data.chkTime);
		//var resTime = p(hms.getHours()) + ':' + p(hms.getMinutes()) + ':' + p(hms.getSeconds());
		var resTime = p(hms.getHours()) + ':' + p(hms.getMinutes()) + ':' + p(hms.getSeconds())
		//p为不够10添加0的函数
		function p(s){
			return s < 10 ? '0' + s : s
		}
		var item = {
			chkDate:resDate,
			chkTime: resTime,
			owner: $scope.data.owner,	
			inspector: $scope.data.inspector,
		}
		console.log('新增传递参数',item);
		// 调接口，储存
		Restangular.all('/epeins-factory/machineType/addOrUpdate').post(item).then(function(res) {
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
app.controller('modifyPatrolReportController',function($scope, $modalInstance, data, Restangular, $rootScope, toaster){
	$scope.title = "工程巡检报告变更";
	console.log('测试11111',data);
	//选中的行赋给details数组
	$scope.details = data.data;
	$scope.machineType = {
		list: [],//分类列表
	}
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
	//时间
	$scope.hstep = 1;
    $scope.mstep = 15;
	//获取筛选产品名称
    //过滤获取机型id及机型名称
    function machineTypeList() {
		var params = {
			"id": "",
			"typeId": "",
			"typeName": "",
			"memo": ""	
		}
		Restangular.all('/epeins-factory/machineType/query').post(params).then(function(res) {
			if (res.resultCode == 200) {
				var result = [];
				var distinctArr = [];
				angular.forEach(res.resultData,function(item,index){
					//循环过滤掉重复的
					if(distinctArr.indexOf(item.typeId) == -1 && distinctArr.indexOf(item.typeName) == -1){
						distinctArr.push(item.typeId,item.typeName);
						result.push(item);
					}	
				});
				//console.log('打印result',result);
				console.log('测试',result);
				//写入数据
				$scope.machineType.list = result;
			}	
		}, function(errResponse) {
			console.log("Error with status code", errResponse.status);
		}); 
		
	};	
	function init() {
		machineTypeList();
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
			typeId: $scope.details.typeId,
			typeName: $scope.details.typeName,
			memo: $scope.details.memo,
		}
		console.log('传递参数',item);
		//传递参数，调接口
		Restangular.all('/epeins-factory/machineType/addOrUpdate').post(item).then(function(res) {
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

app.controller('detelePatrolReportController',function($scope, $modalInstance, data, Restangular, $rootScope,toaster){
	console.log(data);
	$scope.title = "删除工程巡检报告数据";
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
		Restangular.one('/epeins-factory/machineType/delete').customGET('',params).then(function(res) {
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
