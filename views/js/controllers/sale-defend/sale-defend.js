app.controller('saleDefendController', ['$scope', 'Restangular' ,'ngTableParams', 'dialogs', 'toaster', 
	function($scope, Restangular, NgTableParams, dialogs, toaster) {

	 var testData = [
	 	{code:'1', orderNo:"ZJG-20190806A-206",productName:'04WXNF-NF-198-T', deliveryDate:"2019-08-10",numbers:'3400', result:"合格",arrivalTime:'13:00前', models:"720549-102B", adress:"张家港鸿翔001号", material:"LBK15D", changeover:"", drawing:"views/imgs/standard.svg", standard:"views/imgs/standard.svg"},
	 	
	 ];
     $scope.testData = testData;
     $scope.myTable = new NgTableParams({count: 5, sorting: { name: "desc", money:"asc" } }, { counts: [5, 10, 20], dataset: testData});
     $scope.toggleDropdown = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.status.isopen = !$scope.status.isopen;
    };
	
	var baseBanks = Restangular.one('master/datasource');
	$scope.search = function(orderNo,productName){
		console.log(orderNo,productName);
		var filterData = [];
		angular.forEach(testData,function(item,index){
			if(item.orderNo.indexOf(orderNo) > -1 || item.productName.indexOf(productName) > -1){
				filterData.push(item);
			}
		});

		$scope.myTable = new NgTableParams({count: 5, sorting: { name: "desc", money:"asc" } }, { counts: [5, 10, 20], dataset: filterData});

	}
	var add = function (item) {
		var dlg = dialogs.create('views/tpl/layer/sale-defend/add.html','addController',{},{size:'md'});
    };
	
    function modify(item) {
    	console.log(item);
		var dlg = dialogs.create('views/tpl/layer/sale-defend/modify.html','modifyController',{data:item},{size:'md'});
		
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



app.controller('addController',function($scope,$modalInstance,data,toaster){
	$scope.title = "添加销售出库计划";
	var row = {};
	$scope.row = {
    	machine:"",
    	type:"",
    	name:"",
    }
	$scope.testData = [
	 	{code:'1', orderNo:"ZJG-20190806A-206",productName:'04WXNF-NF-198-T', deliveryDate:"2019-08-10",numbers:'3400', result:"合格",arrivalTime:'13:00前', models:"720549-102B", adress:"张家港鸿翔001号", material:"LBK15D", changeover:"", drawing:"views/imgs/standard.svg", standard:"views/imgs/standard.svg"},
	 	
	];
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
	$scope.title = "销售出库计划变更";
	$scope.testData = [
	 	{code:'1', orderNo:"ZJG-20190806A-206",productName:'04WXNF-NF-198-T', deliveryDate:"2019-08-10",numbers:'3400', result:"合格",arrivalTime:'13:00前', models:"720549-102B", adress:"张家港鸿翔001号", material:"LBK15D", changeover:"", drawing:"views/imgs/standard.svg", standard:"views/imgs/standard.svg"},
	 	
	];
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
