app.controller('planController', ['$scope', 'Restangular' ,'ngTableParams', 'dialogs', 'toaster', 
	function($scope, Restangular, NgTableParams, dialogs, toaster) {

    var testData = [
 	{code:'1', planName:"综合最优", productNumber:'1,000', arts:"工艺1", material:'纽曼粉、杨迪粉'},
 	{code:'2', planName:"价格最低", productNumber:'1,100', arts:"工艺2", material:'纽曼粉、杨迪粉'},
 	{code:'3', planName:"工艺要求最低", productNumber:'1,050', arts:"工艺3", material:'纽曼粉、杨迪粉'},
 	{code:'4', planName:"工艺要求高、价格低", productNumber:'1,200', arts:"工艺4", material:'纽曼粉、杨迪粉'},
 	{code:'5', planName:"综合最优", productNumber:'1,100', arts:"工艺1", material:'纽曼粉、杨迪粉'},
 	{code:'6', planName:"综合最优", productNumber:'1,000', arts:"工艺1", material:'纽曼粉、杨迪粉'},
];
$scope.myTable = new NgTableParams({count: 5, sorting: { name: "desc", money:"asc" } }, { counts: [5, 10, 20], dataset: testData});


     $scope.toggleDropdown = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.status.isopen = !$scope.status.isopen;
    };
	
	/*var baseBanks = Restangular.one('plan/plan');*/



	var create = function () {
		var dlg = dialogs.create('views/tpl/layer/plan/planAdd.html','EditDataSourceController',{},{size:'md'});
    };

    var deleted = function () {
		var dlg = dialogs.create('views/tpl/layer/plan/planEdit.html','countDataController',{},{size:'md'});
		
    };



	$scope.delete = deleted;
	$scope.create = create;
	
}]);



app.controller('EditDataSourceController',function($scope,$modalInstance,data){

	$scope.dataTypes = [{"id":"1", "name":"总行"},{"id":"2", "name":"分行"},{"id":"3", "name":"支行"}];
	$scope.title = "新建/修改方案";
	if (data.bank) {
		$scope.title = "更新银行";
		$scope.bank = data.bank;
	}
	
	$scope.cancel = function(){
		$modalInstance.dismiss('Cancelled');
	};
	
	$scope.save = function(){
		$modalInstance.close($scope.bank);
	};

});

app.controller('countDataController',function($scope,$modalInstance,data){

	$scope.title = "计算方案";
	
	$scope.cancel = function(){
		$modalInstance.dismiss('Cancelled');
	};
	
	$scope.save = function(){
		$modalInstance.close($scope.bank);
	};

});
