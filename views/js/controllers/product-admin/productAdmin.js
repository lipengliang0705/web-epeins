app.controller('productAdminController', productAdminController);
productAdminController.$inject = ['$scope', 'Restangular' ,'ngTableParams', 'dialogs', 'toaster', '$http', '$rootScope','$filter'];
function productAdminController($scope, Restangular, NgTableParams, dialogs, toaster, $http, $rootScope,$filter) {
	 //查询所有知识分类列表
	 //var baseBanks = Restangular.one('/api/knowledge/knowledge-all');
	$scope.resoures = {
		list: [],//信息列表
	};
	function checkKnowledgeAll() {
		var params = { 
			categoryId: '', 
			knowledge: '', 
			beginTime: '', 
			endTime: '' 
		}
		Restangular.all('/api/knowledge/knowledge-all').post(params).then(function(res) {
			if (res) {
				//console.log('测试', $scope.resoures.list);
				var len = 30;
                // 截取描述
                angular.forEach(res, function (item, index) {
                    var ele = $('<div>' + item.content + '</div>');
                    var text = ele.text();
                    if (item.content && text.length > len) {
                        item.subTitle = text.substring(0, len) + '...';
                    } else if (item.content && text.length <= len) {
                        item.subTitle = text;
                    } else {
                        item.subTitle = '';
                    }
				});
				$scope.resoures.list = res;
				$scope.myTable = new NgTableParams({count: 5, sorting: { title: "desc" } }, { counts: [5, 10, 20], dataset: $scope.resoures.list});
				toaster.pop('success', '', '列表数据成功！');
			}	
		}, function(errRes) {
			console.log("Error with status code", errRes.status);}
	)};
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


	//  $scope.testData = testData;
    //  $scope.myTable = new NgTableParams({count: 5, sorting: { name: "desc", money:"asc" } }, { counts: [5, 10, 20], dataset: testData});
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
			//判断是否为空
			// if($scope.data.title){
			// 	params.knowledge = $scope.data.title;
			// }
			// // console.log(parmas);
			// if($scope.data.startDate){
			// 	params.beginTime =  $filter('date')($scope.data.startDate, 'yyyy-MM-dd');
			// }
			// if($scope.data.endDate){
			// 	params.endTime = $filter('date')($scope.data.endDate, 'yyyy-MM-dd');
			// }
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
		var dlg = dialogs.create('views/tpl/product-admin/add.html','addController',{data:item},{size:'md'});
    };
	
    function modify(item) {
		var dlg = dialogs.create('views/tpl/product-admin/modify.html','modifyController',{data:item},{size:'md'});	
    };

    function deleted(item) {
		var dlg = dialogs.create('views/tpl/product-admin/delete.html','deteleDataController',{data:item},{size:'sm'});	
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
	//echarts数据表格
	$scope.chartConfig = {
        debug: true,
        stack: false,
		zoomX: true,
		grid: { show: true, left: '10', top: 30, right: 40, bottom: 40, containLabel: true, },
		color: ['#5378AD', '#FF8900', '#98BE3B', '#D15B3B'],

	};
	$scope.chartPieConfig = {
        stack: false,
		grid: { show: false, left: '10', top: 30, right: 40, bottom: 10, },
		color: ['#5378AD', '#FF8900', '#98BE3B', '#D15B3B'],

	};
	$scope.pueTrends = [
		{name:'实际', datapoints:[
			{x:'2016-01',y:10.34},
			{x:'2016-02',y:1.39},
			{x:'2016-03',y:1.44},
			{x:'2016-04',y:1.33},
			{x:'2016-05',y:1.41},
			{x:'2016-06',y:1.44},
			{x:'2016-07',y:1.49},
			{x:'2016-08',y:1.51},
			{x:'2016-09',y:1.46},
			{x:'2016-10',y:1.44},
			{x:'2016-11',y:1.34},
			{x:'2016-12',y:15.39}
		]},
		{name:'预测', datapoints:[
			{x:'2016-01',y:1.35},
			{x:'2016-02',y:2.40},
			{x:'2016-03',y:1.43},
			{x:'2016-04',y:1.32},
			{x:'2016-05',y:1.39},
			{x:'2016-06',y:1.45},
			{x:'2016-07',y:1.51},
			{x:'2016-08',y:1.52},
			{x:'2016-09',y:1.45},
			{x:'2016-10',y:1.45},
			{x:'2016-11',y:1.36},
			{x:'2016-12',y:1.39},
			{x:'2017-01',y:1.42},
			{x:'2017-02',y:1.45},
			{x:'2017-03',y:1.41},
		]},
	];

    $scope.warnSummary1 = [
		{
			name: 'page.load',
        datapoints: [
            { x: 2001, y: 1012 },
            { x: 2002, y: 1023 },
            { x: 2003, y: 1045 },
            { x: 2004, y: 1062 },
            { x: 2005, y: 1032 },
            { x: 2006, y: 1040 },
            { x: 2007, y: 1023 },
            { x: 2008, y: 1090 },
            { x: 2009, y: 1012 },
            { x: 2010, y: 1012 }
        ]
		}
	]
	$scope.humitureTrends = [
		{
			name: '温度',
			datapoints: [
				{
					x: '09.12',
					y: 13
				}, {
					x: '09.26',
					y: 14
				}, {
					x: '10.10',
					y: 13
				}, {
					x: '10.24',
					y: 14
				}, {
					x: '11.07',
					y: 12
				}, {
					x: '11.21',
					y: 13
				}, {
					x: '12.05',
					y: 13
				}]
		}, {
			name: '湿度',
			datapoints: [
				/*
				 * {x:'2016-01',y:1277282}, {x:'2016-02',y:1367282}, {x:'2016-03',y:1292822}, {x:'2016-04',y:1397282}, {x:'2016-05',y:1317282},
				 * {x:'2016-06',y:1290222},
				 */
				{
					x: '09.12',
					y: 17
				}, {
					x: '09.26',
					y: 18
				}, {
					x: '10.10',
					y: 19
				}, {
					x: '10.24',
					y: 18
				}, {
					x: '11.07',
					y: 15
				}, {
					x: '11.21',
					y: 17
				}, {
					x: '12.05',
					y: 13
				}]
		}

	]
	//初始化方法
	function init(){
		checkKnowledgeAll();
	};
	// 新建列表成功
	$rootScope.$on('addSuccess', function (event, data) {
		checkKnowledgeAll();
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
	$scope.title = "添加生产计划";
	//添加数据对象
	$scope.data = {
		title: '',
		content: '',
		labels: '',
		createdTime: new Date(),
		modifiedTime: new Date(),
		createdBy: '',
		editor: null,
		kcategory: [],
	}
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
	function cancel(){
		$modalInstance.dismiss('Cancelled');
	};
	
	function submit(){
		//获取输入数据
		var item = {
			title: $scope.data.title,
			labels: $scope.data.labels,
			content: $scope.data.content,
			// createdTime: vm.data.createdTime,
			// modifiedTime: vm.data.modifiedTime,
			// createdBy: vm.data.createdBy,
			knowledgeCategory: $scope.data.knowledgeCategory,
		}

		console.log(item);

		// 调接口，储存
		Restangular.all('/api/knowledge/knowledge-create').post(item).then(function(res) {
			console.log('添加列表', res);
			if (res.status == 0) {
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
	console.log('ceshi',$scope.details.knowledgeCategorytitle);
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

app.controller('deteleDataController',function($scope, $modalInstance, data, Restangular, $rootScope){
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
	
	function submit(){
		$modalInstance.close($scope.bank);
	};
	function submit(id) {
		//调删除接口/api/knowledge/knowledge-delete/:id
		// get
		Restangular.one('/api/knowledge/knowledge-delete/', $scope.data.id).get().then(function(res) {
			console.log(res);
			if (res.status == 200) {
				//请求删除数据
				$rootScope.$broadcast('deleteSuccess', data);
				toaster.pop('success', '删除数据成功！');
				// 关闭
				cancel();
				//$modalInstance.close($scope.bank);
			}	
		}, function(errResponse) {
			console.log("Error with status code", errResponse.status);
		}); 	
	}
});
