app.controller('planDetailController', ['$scope', 'Restangular' ,'ngTableParams', 'dialogs', 'toaster', 
	function($scope, Restangular, NgTableParams, dialogs, toaster) {

    var testData = [
 	{code:'1', planName:"20170301_生产计划1",productNumber:'10000', purchaseNumber:"12000",price:'8000000'},
 	{code:'2', planName:"20170301_生产计划2",productNumber:'10500', purchaseNumber:"13000",price:'1200000'},
 	{code:'3', planName:"20170301_生产计划3",productNumber:'12000', purchaseNumber:"13000",price:'1205000'},
 	{code:'4', planName:"20170301_生产计划4",productNumber:'13000', purchaseNumber:"15000",price:'2234000'},
 	{code:'5', planName:"20170301_生产计划5",productNumber:'14500', purchaseNumber:"16000",price:'1600000'},
 	{code:'6', planName:"20170301_生产计划6",productNumber:'15000', purchaseNumber:"14500",price:'1700000'},
 	{code:'7', planName:"20170301_生产计划7",productNumber:'13450', purchaseNumber:"15000",price:'1456000'},
 	{code:'8', planName:"20170301_生产计划8",productNumber:'16000', purchaseNumber:"17000",price:'1570500'},
 	{code:'9', planName:"20170301_生产计划9",productNumber:'15500', purchaseNumber:"19000",price:'2460007'},
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
