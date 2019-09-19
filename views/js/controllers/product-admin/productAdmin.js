app.controller('productAdminController', ['$scope', 'Restangular' ,'ngTableParams', 'dialogs', 'toaster', 
	function($scope, Restangular, NgTableParams, dialogs, toaster) {

	 var testData = [
	 	{code:'1', machine:"1#机",types:'K1214', productName:"YFL-1-T/B",taskNo:'ZJG-20190722F2-119', taskNumber:"2000",waste:'0', date:"2019-07-28", InvName:"1000", material:"LBK15D", changeover:"是", drawing:"views/imgs/standard.svg", standard:"views/imgs/standard.svg"},
	 	{code:'2', machine:"1#机",types:'K1214', productName:"XJ-50B",taskNo:'SC20190718X1-521', taskNumber:"50000",waste:'0', date:"2019-07-28", InvName:"2000", material:"PB4520", changeover:"是", drawing:"views/imgs/standard.svg", standard:"views/imgs/standard.svg"},
	 	{code:'3', machine:"2#机",types:'K1214', productName:"XJ-20-T",taskNo:'SC20190617X1-437', taskNumber:"20000",waste:'0', date:"2019-07-28", InvName:"3500", material:"PB4520", changeover:"是", drawing:"views/imgs/standard.svg", standard:"views/imgs/standard.svg"},
	 	{code:'4', machine:"2#机",types:'K1214', productName:"PLKPA45*50T",taskNo:'SC20190718X1-521', taskNumber:"50000",waste:'0', date:"2019-07-28", InvName:"4000", material:"PB4520", changeover:"否", drawing:"views/imgs/standard.svg", standard:"views/imgs/standard.svg"},
	 	{code:'5', machine:"2#机",types:'K1214', productName:"PLKPA45*60T",taskNo:'SC20190718X1-521', taskNumber:"50000",waste:'0', date:"2019-07-28", InvName:"4000", material:"PB4520", changeover:"是", drawing:"views/imgs/standard.svg", standard:"views/imgs/standard.svg"},
	 	{code:'6', machine:"2#机",types:'K1214', productName:"LG-16-T/B",taskNo:'SC20190718X1-521', taskNumber:"50000",waste:'0', date:"2019-07-28", InvName:"4500", material:"PB4520", changeover:"是", drawing:"views/imgs/standard.svg", standard:"views/imgs/standard.svg"},
	 ];

	 $scope.testData = testData;
     $scope.myTable = new NgTableParams({count: 5, sorting: { name: "desc", money:"asc" } }, { counts: [5, 10, 20], dataset: testData});
     var search = function() {	
		$scope.myTable = new NgTableParams({count: 5, sorting: { name: "desc", money:"asc" } }, { counts: [5, 10, 20], dataset: testData});
     };
     $scope.toggleDropdown = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.status.isopen = !$scope.status.isopen;
    };
	
	var baseBanks = Restangular.one('master/datasource');
	$scope.search = function(machine,types,productName,taskNo,material){
		// $scope.searcher.date
		console.log(999,machine,types,productName,taskNo,material);
		var filterData = [];
		angular.forEach(testData,function(item,index){
			if(item.machine.indexOf(machine) > -1 || item.types.indexOf(types) > -1 || item.productName.indexOf(productName) > -1 || item.taskNo.indexOf(taskNo) > -1 || item.material.indexOf(material) > -1){
				filterData.push(item);
			}
		});

		$scope.myTable = new NgTableParams({count: 5, sorting: { name: "desc", money:"asc" } }, { counts: [5, 10, 20], dataset: filterData});

	}

	var add = function (item) {
		var dlg = dialogs.create('views/tpl/layer/product-admin/add.html','addController',{},{size:'md'});
    };
	
    function modify(item) {
    	console.log(item);
		var dlg = dialogs.create('views/tpl/layer/product-admin/modify.html','modifyController',{data:item},{size:'md'});
		
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
	$scope.title = "添加生产计划";
	var row = {};
    $scope.testData =[
    	{machine:"1#机",types:"K1214",productName:"YFL-1-T/B",taskNo:"ZJG-20190722F2-119"},
    	{machine:"2#机",types:"K1214",productName:"XJ-50B",taskNo:"SC20190718X1-521"},
    	{machine:"3#机",types:"K1214",productName:"XJ-20-T",taskNo:"SC20190617X1-437"}
    ]
	
	$scope.cancel = function(){
		$modalInstance.dismiss('Cancelled');
	};
	
	$scope.save = function(){
		var item = {};
		$scope.item = {
            machine: $scope.row.machine,
            types: $scope.row.types,
            name: $scope.row.name,
        }
        console.log(89898989,$scope.item);
        toaster.pop('success', '', '新建数据成功！');
		$modalInstance.close($scope.bank);
	};

});
app.controller('modifyController',function($scope,$modalInstance,data){
	//$scope.dataTypes = [{"id":"1", "name":"总行"},{"id":"2", "name":"分行"},{"id":"3", "name":"支行"}];
	$scope.title = "生产计划变更";
	$scope.testData =[
    	{machine:"1#机",types:"K1214",productName:"YFL-1-T/B",taskNo:"ZJG-20190722F2-119"},
    	{machine:"2#机",types:"K1215",productName:"XJ-50B",taskNo:"SC20190718X1-521"},
    	{machine:"3#机",types:"K1216",productName:"XJ-20-T",taskNo:"SC20190617X1-437"}
    ]
    //var row = {};
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
