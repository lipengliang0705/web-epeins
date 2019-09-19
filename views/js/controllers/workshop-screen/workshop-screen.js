
app.controller('workshopController', ['$scope', 'Restangular' ,'ngTableParams', 'dialogs', 'toaster', 
	function($scope, Restangular, NgTableParams, dialogs, toaster) {

     $scope.toggleDropdown = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.status.isopen = !$scope.status.isopen;
    };
	var testData = [
	 	{code:'1', machineNo:"1#机",completionRate:'96%', lossRate:"6%",turnonRate:'93%', result:"合格"},
	 	{code:'2', machineNo:"2#机",completionRate:'96%', lossRate:"6%",turnonRate:'93%', result:"合格"},
	 	{code:'3', machineNo:"3#机",completionRate:'96%', lossRate:"6%",turnonRate:'93%', result:"不合格"},
	 	{code:'4', machineNo:"4#机",completionRate:'96%', lossRate:"6%",turnonRate:'93%', result:"合格"},
	 	{code:'5', machineNo:"5#机",completionRate:'96%', lossRate:"6%",turnonRate:'93%', result:"合格"},
	 	{code:'6', machineNo:"6#机",completionRate:'96%', lossRate:"6%",turnonRate:'93%', result:"合格"},
	 	{code:'7', machineNo:"7#机",completionRate:'96%', lossRate:"6%",turnonRate:'93%', result:"合格"},
	 	{code:'8', machineNo:"8#机",completionRate:'96%', lossRate:"6%",turnonRate:'93%', result:"合格"},
	 	{code:'9', machineNo:"9#机",completionRate:'96%', lossRate:"6%",turnonRate:'93%', result:"合格"},
	 	{code:'10', machineNo:"10#机",completionRate:'96%', lossRate:"6%",turnonRate:'93%', result:"合格"},
	 	{code:'11', machineNo:"11#机",completionRate:'96%', lossRate:"6%",turnonRate:'93%', result:"合格"},
	 	{code:'12', machineNo:"12#机",completionRate:'96%', lossRate:"6%",turnonRate:'93%', result:"合格"},
	 	{code:'13', machineNo:"13#机",completionRate:'96%', lossRate:"6%",turnonRate:'93%', result:"合格"},
	 	{code:'14', machineNo:"14#机",completionRate:'96%', lossRate:"6%",turnonRate:'93%', result:"合格"},
	 	{code:'15', machineNo:"15#机",completionRate:'96%', lossRate:"6%",turnonRate:'93%', result:"合格"},
	 	{code:'16', machineNo:"16#机",completionRate:'96%', lossRate:"6%",turnonRate:'93%', result:"合格"},
	 	{code:'17', machineNo:"17#机",completionRate:'96%', lossRate:"6%",turnonRate:'93%', result:"合格"},
	 	{code:'18', machineNo:"18#机",completionRate:'96%', lossRate:"6%",turnonRate:'93%', result:"合格"},
	 	{code:'19', machineNo:"19#机",completionRate:'96%', lossRate:"6%",turnonRate:'93%', result:"合格"},
	];
    $scope.testData = testData;

    
                    
    






	// var baseBanks = Restangular.one('master/datasource');
	// var add = function (item) {
	// 	var dlg = dialogs.create('views/tpl/layer/product-admin/add.html','addController',{},{size:'md'});
 //    };
	
 //    var modify = function () {
	// 	var dlg = dialogs.create('views/tpl/layer/product-admin/modify.html','modifyController',{},{size:'md'});
		
 //    };

 //    var deleted = function () {
	// 	var dlg = dialogs.create('views/tpl/layer/product-admin/delete.html','deteleDataController',{},{size:'sm'});
		
 //    };



	// $scope.delete = deleted;
	// $scope.modify = modify;
	// $scope.add = add;



	
}]);



app.controller('addController',function($scope,$modalInstance,data){
	$scope.title = "添加生产计划";
	
	$scope.cancel = function(){
		$modalInstance.dismiss('Cancelled');
	};
	
	$scope.save = function(){
		$modalInstance.close($scope.bank);
	};

});
app.controller('modifyController',function($scope,$modalInstance,data){
	console.log(24242434342);
	console.log(data);

	//$scope.dataTypes = [{"id":"1", "name":"总行"},{"id":"2", "name":"分行"},{"id":"3", "name":"支行"}];
	$scope.title = "生产计划变更";
	
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
