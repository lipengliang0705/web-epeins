app.controller('inspectReportController', ['$scope', 'Restangular' ,'ngTableParams', 'dialogs', 'toaster', 
	function($scope, Restangular, NgTableParams, dialogs, toaster) {

	 var testData = [
	 	{code:'1', machine:"1#机",productNo:'XJ-50-B', leader:"徐太阳",inspector:'张元丰', result:"合格",inspectTime:'09:30', inspectDate:"2019-07-28", scrapRate:"", material:"LBK15D", changeover:"", drawing:"views/imgs/standard.svg", standard:"views/imgs/standard.svg"},
	 	{code:'2', machine:"1#机",productNo:'XJ-50-B', leader:"徐太阳",inspector:'张元丰', result:"合格",inspectTime:'09:45', inspectDate:"2019-07-28", scrapRate:"", material:"PB4520", changeover:"", drawing:"views/imgs/standard.svg", standard:"views/imgs/standard.svg"},
	 	{code:'3', machine:"2#机",productNo:'NF-198-T', leader:"徐太阳",inspector:'张元丰', result:"合格",inspectTime:'10:00', inspectDate:"2019-07-28", scrapRate:"", material:"PB4520", changeover:"是", drawing:"views/imgs/standard.svg", standard:"views/imgs/standard.svg"},
	 	{code:'4', machine:"2#机",productNo:'YH-1-1', leader:"徐太阳",inspector:'张元丰', result:"合格",inspectTime:'10:15', inspectDate:"2019-07-28", scrapRate:"", material:"PB4520", changeover:"", drawing:"views/imgs/standard.svg", standard:"views/imgs/standard.svg"},
	 	{code:'5', machine:"2#机",productNo:'LG-49', leader:"徐太阳",inspector:'张元丰', result:"不合格",inspectTime:'10:40', inspectDate:"2019-07-28", scrapRate:"1.5%", material:"PB4520", changeover:"", drawing:"views/imgs/standard.svg", standard:"views/imgs/standard.svg"},
	 	{code:'6', machine:"2#机",productNo:'NF-198-T', leader:"徐太阳",inspector:'张元丰', result:"不合格",inspectTime:'11:00', inspectDate:"2019-07-28", scrapRate:"1%", material:"PB4520", changeover:"", drawing:"views/imgs/standard.svg", standard:"views/imgs/standard.svg"},
	 ];

	 
     $scope.testData = testData;
     $scope.myTable = new NgTableParams({count: 5, sorting: { name: "desc", money:"asc" } }, { counts: [5, 10, 20], dataset: testData});
     
     $scope.toggleDropdown = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.status.isopen = !$scope.status.isopen;
    };
	
	var baseBanks = Restangular.one('master/datasource');
	$scope.search = function(productName,taskNo){
		console.log(productName,taskNo);
		var filterData = [];
		angular.forEach(testData,function(item,index){
			if(item.productName.indexOf(productName) > -1 || item.taskNo.indexOf(taskNo) > -1){
				filterData.push(item);
			}
		});

		$scope.myTable = new NgTableParams({count: 5, sorting: { name: "desc", money:"asc" } }, { counts: [5, 10, 20], dataset: filterData});

	}
	
	var add = function (item) {
		var dlg = dialogs.create('views/tpl/layer/inspect-report/add.html','addController',{},{size:'lg'});
    };
	
    function modify(item) {
    	console.log(item);
		var dlg = dialogs.create('views/tpl/layer/inspect-report/modify.html','modifyController',{data:item},{size:'lg'});
		
		// dlg.result.then(function(resDate){
		// 	console.log('cdsajs999999999',data);
		// })

		// dlg.result.then(function(bank){
		// 	Restangular.all('master/banks').post(bank).then(function(result) {
	 //    		if (result) {
	 //    			toaster.pop('success', '', '新建银行数据成功！');
	 //    			search();
	 //    		}	
		// 	}, function(errResponse) {
		// 		console.log("Error with status code", errResponse.status);
		// 	}); 

		// },function(){
		// 	console.log("Cancelled");
		// });
		
    };

    var deleted = function () {
		var dlg = dialogs.create('views/tpl/layer/product-admin/delete.html','deteleDataController',{},{size:'sm'});
		
    };



	$scope.delete = deleted;
	$scope.modify = modify;
	$scope.add = add;


}]);



app.controller('addController',function($scope,$modalInstance,data,dialogs,toaster){
	$scope.title = "添加巡检报告";

    var append = function () {
        var dlg = dialogs.create('views/tpl/layer/inspect-report/append.html','appendController',{},{size:'lg'});
    };
    $scope.append = append;
    //新增页面json数据
	//var addresources = [];
	$scope.addresources =[
    	{
            id: 1,
            machine: "PL-1",
            productNo: "XJ-50-B",
            scope: "112.5-137.5",
            weight: "126",
            result: "OK"
        },{
            id: 1,
            machine: "PL-2",
            productNo: "LG-49",
            scope: "135-173",
            weight: "159",
            result: "OK"
        },{
            id: 1,
            machine: "PL-3",
            productNo: "NF-198-T",
            scope: "195-237",
            weight: "220",
            result: "OK"
        },{
            id: 1,
            machine: "PL-4",
            productNo: "FM4-6168-B",
            scope: "216-240",
            weight: "237",
            result: "OK"
        },{
            id: 1,
            machine: "PL-5",
            productNo: "XJ-25-B",
            scope: "110-135",
            weight: "126",
            result: "OK"
        }
    ]


	var row = {};
	$scope.row = {
    	machine:"",
    	type:"",
    	name:"",
    }
	
	$scope.cancel = function(){
		$modalInstance.dismiss('Cancelled');
	};
	
	$scope.save = function(){
		var item = {};
		$scope.item = {
            machine: $scope.row.machine,
            type: $scope.row.type,
            name: $scope.row.name,
        }
        console.log(89898989,$scope.item);
        toaster.pop('success', '', '新建数据成功！');
		$modalInstance.close($scope.bank);
	};

});
app.controller('modifyController',function($scope,$modalInstance,data){
	//$scope.dataTypes = [{"id":"1", "name":"总行"},{"id":"2", "name":"分行"},{"id":"3", "name":"支行"}];
	$scope.title = "巡检报告变更";

	$scope.addresources =[
    	{
            id: 1,
            machine: "PL-1",
            productNo: "XJ-50-B",
            scope: "112.5-137.5",
            weight: "126",
            result: "OK"
        },{
            id: 1,
            machine: "PL-2",
            productNo: "LG-49",
            scope: "135-173",
            weight: "159",
            result: "OK"
        },{
            id: 1,
            machine: "PL-3",
            productNo: "NF-198-T",
            scope: "195-237",
            weight: "220",
            result: "OK"
        },{
            id: 1,
            machine: "PL-4",
            productNo: "FM4-6168-B",
            scope: "216-240",
            weight: "237",
            result: "OK"
        },{
            id: 1,
            machine: "PL-5",
            productNo: "XJ-25-B",
            scope: "110-135",
            weight: "126",
            result: "OK"
        }
    ]
	// var row = {
 //        machine: data.data.machine,
 //        type: data.data.type,
 //        name: data.data.name,
 //    }
    var row = {};
    $scope.row = data.data;
	console.log(999,$scope.row);
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
app.controller('appendController',function($scope,$modalInstance,data,toaster){
    $scope.title = "工程巡检记录追加";
    $scope.addresources =[
        {
            id: 1,
            machine: "PL-1",
            productNo: "XJ-50-B",
            scope: "112.5-137.5",
            weight: "126",
            content: "湿重/其它",
            result: "OK"
        },{
            id: 1,
            machine: "PL-2",
            productNo: "LG-49",
            scope: "135-173",
            weight: "159",
            content: "湿重/其它",
            result: "OK"
        },{
            id: 1,
            machine: "PL-3",
            productNo: "NF-198-T",
            scope: "195-237",
            weight: "220",
            result: "OK"
        },{
            id: 1,
            machine: "PL-4",
            productNo: "FM4-6168-B",
            scope: "216-240",
            weight: "237",
            content: "湿重/其它",
            result: "OK"
        },{
            id: 1,
            machine: "PL-5",
            productNo: "XJ-25-B",
            scope: "110-135",
            weight: "126",
            content: "湿重/其它",
            result: "OK"
        }
    ]
    $scope.row = {
        result:"OK",
        judge:"O"
    }
    $scope.cancel = function(){
        $modalInstance.dismiss('Cancelled');
    };
    
    $scope.save = function(){
        var item = {};
        $scope.item = {
            machine: $scope.row.machine,
            type: $scope.row.type,
            name: $scope.row.name,
        }
        console.log(89898989,$scope.item);
        toaster.pop('success', '', '新建数据成功！');
        $modalInstance.close($scope.bank);
    };

});
