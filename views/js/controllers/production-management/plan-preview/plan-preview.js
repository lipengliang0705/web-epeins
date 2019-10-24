app.controller('planPreviewController', planPreviewController);
planPreviewController.$inject = ['$scope', 'Restangular' ,'ngTableParams', 'dialogs', 'toaster', '$http', '$rootScope', '$filter'];
function planPreviewController($scope, Restangular, NgTableParams, dialogs, toaster, $http, $rootScope, $filter) {
	$scope.resoures = {
		list: [],//信息列表
	};
	$scope.myTable = null;
	//临时数据
	$scope.prodTestData = [
		{fileNo:'1', pdListFile:"生产计划01.xlsl", updateTime:"2019-10-20", size:"200Kb",  memo:"任务单信息", changeFlg:"true"},
		{fileNo:'2', pdListFile:"生产计划02.xlsl", updateTime:"2019-10-21", size:"200Kb",  memo:"任务单信息", changeFlg:"true"},
		{fileNo:'3', pdListFile:"生产计划03.xlsl", updateTime:"2019-10-22", size:"200Kb",  memo:"任务单信息", changeFlg:"true"},
		{fileNo:'4', pdListFile:"生产计划04.xlsl", updateTime:"2019-10-23", size:"200Kb",  memo:"任务单信息", changeFlg:"true"},
		{fileNo:'5', pdListFile:"生产计划05.xlsl", updateTime:"2019-10-24", size:"200Kb",  memo:"任务单信息", changeFlg:"true"},
	];
	//临时赋予数据
	$scope.resoures.list = $scope.prodTestData;
	$scope.myTable = new NgTableParams({count: 10, sorting: { title: "desc" } }, { counts: [10, 20, 30], dataset: $scope.resoures.list});
	//查询所有生产计划信息/factory/planInfo/findOne
	// function productionPlanInfoAll() {
	// 	// var params = {
	// 	// 	param:''
	// 	// };
	// 	var params = {
	// 		"planInfo": {
	// 		  "changeFlg": "string",
	// 		  "changeLossTime": 0,
	// 		  "countToday": 0,
	// 		  "id": 0,
	// 		  "materialId": "string",
	// 		  "memo": "string",
	// 		  "planDate": "2019-10-09T06:50:29.021Z",
	// 		  "platId": "string",
	// 		  "prodId": "string",
	// 		  "repairLossTime": 0,
	// 		  "taskId": "string",
	// 		  "typeId": "string",
	// 		  "updateTime": "2019-10-09T06:50:29.021Z",
	// 		  "waitLossTime": 0
	// 		}
	// 	}
	// 	// Restangular.one('/epeins-factory/planInfo/findOne').customGET('',params).then(function(res) {
	// 	Restangular.all('/epeins-factory/planInfo/find').post(params).then(function(res) {
	// 		//console.log('哈哈', res.resultData.content);
	// 		if (res.resultCode == 200) {
	// 			//写入数据
	// 			//$scope.resoures.list.push(res.resultData.content);
	// 			$scope.resoures.list = res.resultData.content;
	// 			angular.forEach($scope.resoures.list,function(item,index){
	// 				//统计总耗时，并添加到对象
	// 				$scope.countLossTime = Number(item.changeLossTime) + Number(item.waitLossTime) + Number(item.repairLossTime);
	// 				item.countLossTime = $scope.countLossTime;
	// 				//console.log('再次统计',$scope.countLossTime);
	// 			});
	// 			//console.log('生产信息', $scope.resoures.list);
	// 			$scope.myTable = new NgTableParams({count: 5, sorting: { title: "desc" } }, { counts: [5, 10, 20], dataset: $scope.resoures.list});
	// 	 		toaster.pop('success', '', '加载数据成功！');
	// 		}	
	// 	}, function(errResponse) {
	// 		console.log("Error with status code", errResponse.status);
	// 	}); 
		
	// };
	//时间插件
	
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

	function add(item) {
		var dlg = dialogs.create('views/tpl/production-management/production-plan/add.html','addController',{data:item},{size:'lg'});
    };
	
    function modify(item) {
		var dlg = dialogs.create('views/tpl/production-management/production-plan/modify.html','modifyController',{data:item},{size:'md'});	
    };

    function deleted(item) {
		var dlg = dialogs.create('views/tpl/production-management/production-plan/delete.html','deteleDataController',{data:item},{size:'sm'});	
	};
	$scope.data = {
		
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
		//productionPlanInfoAll();
	};
	// 新建列表成功
	$rootScope.$on('addSuccess', function (event, data) {
		productionPlanInfoAll();
	})
	// 修改列表成功
	$rootScope.$on('modifySuccess', function (event, data) {
		checkKnowledgeAll();
	})
	// 删除列表成功
	$rootScope.$on('deleteSuccess', function (event, data) {
		checkKnowledgeAll();
	})
	// $scope.delete = deleted;
	// $scope.modify = modify;
	// $scope.add = add;

	init();
};



app.controller('addController',function($scope, $modalInstance, Restangular, data, toaster, $rootScope){
	$scope.title = "新增生产计划";
	$scope.prodUuid = [
		{id:'1', platId:"1#机", typeId:"K1214", prodId:"YFL-1-T/B", taskId:"ZJG-20190722F2-119", materialId:"LBK15D", changeFlg:"true"},
		{id:'2', platId:"2#机", typeId:"K1214", prodId:"XJ-50B", taskId:"SC20190718X1-521", materialId:"PB4520", changeFlg:"true"},
		{id:'3', platId:"3#机", typeId:"K1214", prodId:"XJ-20-T", taskId:"SC20190617X1-437", materialId:"PB4520", changeFlg:"false"},
	];
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
		addDate: '',
		platId: '',
		typeId: '',
		prodId: '',
		materialId: '',
		countToday: '',
		changeLossTime: '',
		repairLossTime: '',
		waitLossTime: '',
		otherLossTime: '',
		memo: '',
	}
	//console.log('测试试试',$scope.data.platId);
	$scope.kcategory = {
		list: [],//分类列表
	}
	//$scope.data.editor = new window.wangEditor('#ueditor');
    //如果需要使用 base64 编码直接将图片插入到内容中，可参考一下示例配置
	//$scope.data.editor.customConfig.uploadImgShowBase64 = true;
	//$scope.data.editor.create();

	// 方法
	$scope.method = {
		submit: submit,
		cancel: cancel,
	}
	function init() {
		//getAccount();
		//kcategorySelect();
	}
	//筛选分类 GET
	// function kcategorySelect() {
	// 	Restangular.one('/api/kcategory/category-all').get().then(function(res) {
	// 		if (res) {
	// 			$scope.kcategory.list = res;
	// 			console.log('筛选分类', $scope.kcategory.list);
	// 		}	
	// 	}, function(errResponse) {
	// 		console.log("Error with status code", errResponse.status);
	// 	}); 

	// }
	function cancel(){
		$modalInstance.dismiss('Cancelled');
	};
	
	function submit(){
		//获取输入数据
		var item = {
			addDate: $scope.data.addDate,
			platId: $scope.data.platId,
			typeId: $scope.data.typeId,
			prodId: $scope.data.prodId,
			materialId: $scope.data.materialId,
			countToday: $scope.data.countToday,
			changeLossTime: $scope.data.changeLossTime,
			repairLossTime: $scope.data.repairLossTime,
			waitLossTime: $scope.data.waitLossTime,
			otherLossTime: $scope.data.otherLossTime,
			memo: $scope.data.memo,
		}
		//console.log(item);

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
	console.log(data);
	$scope.title = "生产计划变更";
	//数据对象
	$scope.details = [];
	//选中的行赋给details数组
	$scope.details = data.data;
	$scope.kcategory = {
		list: [],//分类列表
	}
	function init() {
		//getAccount();
		kcategorySelect();
	}
	//筛选分类 GET
	function kcategorySelect() {
		Restangular.one('/api/kcategory/category-all').get().then(function(res) {
			if (res) {
				$scope.kcategory.list = res;
				console.log('筛选分类', $scope.kcategory.list);
			}	
		}, function(errResponse) {
			console.log("Error with status code", errResponse.status);
		}); 

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
			title: $scope.details.title,
			labels: $scope.details.labels,
			content: $scope.details.content,
			knowledgeCategory:$scope.details.knowledgeCategory,
		}
		console.log(item);
		Restangular.all('/api/knowledge/knowledge-infos').customPUT(item).then(function(res) {
			console.log(res);
			if (res.status == 0) {
				// 储存成功后，跳转到列表页，并且刷新页面
				$rootScope.$broadcast('modifySuccess');
				toaster.pop('success', '修改数据成功！');
				// 关闭
				cancel();
			}	
		}, function(errResponse) {
			console.log("Error with status code", errResponse.status);
		});
	};
	init();

});

app.controller('deteleDataController',function($scope, $modalInstance, data, Restangular, $rootScope,toaster){
	console.log(data);
	$scope.title = "删除机器";
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
		//调删除接口/api/knowledge/knowledge-delete/:id
		// get
		Restangular.one('/api/knowledge/knowledge-delete/', $scope.data.id).get().then(function(res) {
			console.log(res);
			if (res.status == 1) {
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
