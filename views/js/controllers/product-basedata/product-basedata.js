app.controller('productAdminController', ['$scope', 'Restangular' ,'ngTableParams', 'dialogs', 'toaster', 
	function($scope, Restangular, NgTableParams, dialogs, toaster) {

 var testData = [
 	{code:'1', productName:"XJ-20-B",weight:'290', moldingWeight:"14",outputs:'3', modulus:"413",productionCycle:'209', capacity:"1240", actual:"52", hourlyCapacity:"48"},
 	{code:'1', productName:"XJ-40-B",weight:'270', moldingWeight:"13",outputs:'4', modulus:"403",productionCycle:'200', capacity:"1240", actual:"50", hourlyCapacity:"45"},
 	
 ];
 $scope.testData = testData;
// 储存为副本
 // var testDataCppy = angular.copy(testData);

 $scope.myTable = new NgTableParams({count: 5, sorting: { name: "desc", money:"asc" } }, { counts: [5, 10, 20], dataset: testData});
 // var search = function() {	
	// $scope.myTable = new NgTableParams({count: 5, sorting: { name: "desc", money:"asc" } }, { counts: [5, 10, 20], dataset: testData});
 // };

 $scope.toggleDropdown = function($event) {
  $event.preventDefault();
  $event.stopPropagation();
  $scope.status.isopen = !$scope.status.isopen;
};
	
	var baseBanks = Restangular.one('master/datasource');
	var add = function (item) {
		var dlg = dialogs.create('views/tpl/layer/product-basedata/add.html','addController',{},{size:'md'});
    };
	
    function modify(item) {
    	console.log(item);
		var dlg = dialogs.create('views/tpl/layer/product-basedata/modify.html','modifyController',{data:item},{size:'md'});
		
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
		var dlg = dialogs.create('views/tpl/layer/product-basedata/delete.html','deteleDataController',{},{size:'sm'});
		
    };

	$scope.delete = deleted;
	$scope.modify = modify;
	$scope.add = add;

	$scope.search = function(productName){
		// $scope.searcher.date
		console.log(productName);
		var filterData = [];
		angular.forEach(testData,function(item,index){
			if(item.productName.indexOf(productName) > -1){
				filterData.push(item);
			}
		});

		$scope.myTable = new NgTableParams({count: 5, sorting: { name: "desc", money:"asc" } }, { counts: [5, 10, 20], dataset: filterData});

	}

}]);



app.controller('addController',function($scope,$modalInstance,data,toaster){
	$scope.title = "添加生产基础数据";
	var row = {};
	$scope.row = {
    	machine:"",
    	type:"",
    	name:"",
    }
	$scope.testData = [
	 	{code:'1', productName:"XJ-20-B",weight:'290', moldingWeight:"14",outputs:'3', modulus:"413",productionCycle:'209', capacity:"1240", actual:"52", hourlyCapacity:"48"},
	 	{code:'1', productName:"XJ-40-B",weight:'270', moldingWeight:"13",outputs:'4', modulus:"403",productionCycle:'200', capacity:"1240", actual:"50", hourlyCapacity:"45"},
	 	
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
	$scope.title = "生产基础数据变更";
	$scope.testData = [
	 	{code:'1', productName:"XJ-20-B",weight:'290', moldingWeight:"14",outputs:'3', modulus:"413",productionCycle:'209', capacity:"1240", actual:"52", hourlyCapacity:"48"},
	 	{code:'1', productName:"XJ-40-B",weight:'270', moldingWeight:"13",outputs:'4', modulus:"403",productionCycle:'200', capacity:"1240", actual:"50", hourlyCapacity:"45"},
	 	
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

	$scope.title = "删除生产基础数据";
	
	$scope.cancel = function(){
		$modalInstance.dismiss('Cancelled');
	};
	
	$scope.save = function(){
		$modalInstance.close($scope.bank);
	};

});
