app.controller('firstReportController', ['$scope', 'Restangular' ,'ngTableParams', 'dialogs', 'toaster', 
	function($scope, Restangular, NgTableParams, dialogs, toaster) {

	 var testData = [
	 	{code:'1', machine:"1#机",machineNo:'PL-1', productNo:"NF-198-T",materialNo:'720549-102', result:"合格",reportNo:'SYS8.6-13', date:"2019-07-28", scrapRate:"", material:"LBK15D", changeover:"", drawing:"views/imgs/standard.svg", standard:"views/imgs/standard.svg"},
	 	{code:'2', machine:"1#机",machineNo:'PL-2', productNo:"XJ-20-T",materialNo:'100501303', result:"合格",reportNo:'SYS8.6-13', date:"2019-07-28", scrapRate:"", material:"PB4520", changeover:"", drawing:"views/imgs/standard.svg", standard:"views/imgs/standard.svg"},
	 	{code:'3', machine:"2#机",machineNo:'PL-3', productNo:"XJ-50-B",materialNo:'1005235562', result:"合格",reportNo:'SYS8.6-13', date:"2019-07-28", scrapRate:"", material:"PB4520", changeover:"是", drawing:"views/imgs/standard.svg", standard:"views/imgs/standard.svg"},
	 	{code:'4', machine:"2#机",machineNo:'PL-5', productNo:"TM-18-B",materialNo:'PB4530', result:"合格",reportNo:'SYS8.6-13', date:"2019-07-28", scrapRate:"", material:"PB4520", changeover:"", drawing:"views/imgs/standard.svg", standard:"views/imgs/standard.svg"},
	 ];
     $scope.testData = testData;
     $scope.myTable = new NgTableParams({count: 5, sorting: { name: "desc", money:"asc" } }, { counts: [5, 10, 20], dataset: testData});
     $scope.toggleDropdown = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.status.isopen = !$scope.status.isopen;
    };
	
	var baseBanks = Restangular.one('master/datasource');
	$scope.search = function(reportNo,productNo,machineNo,material,materialNo){
		console.log(reportNo,productNo,machineNo,material,materialNo);
		var filterData = [];
		angular.forEach(testData,function(item,index){
			if(item.reportNo.indexOf(reportNo) > -1 || item.productNo.indexOf(productNo) > -1 || item.machineNo.indexOf(machineNo) > -1 || item.material.indexOf(material) > -1 || item.materialNo.indexOf(materialNo) > -1){
				filterData.push(item);
			}
		});

		$scope.myTable = new NgTableParams({count: 5, sorting: { name: "desc", money:"asc" } }, { counts: [5, 10, 20], dataset: filterData});

	}
	var add = function (item) {
		var dlg = dialogs.create('views/tpl/layer/first-report/add.html','addController',{data:item},{size:'lg'});
    };
	
    function modify(item) {
    	console.log(item);
		var dlg = dialogs.create('views/tpl/layer/first-report/modify.html','modifyController',{data:item},{size:'lg'});
		
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
	$scope.title = "添加首检报告";
	$scope.testData = [
	 	{code:'1', machine:"1#机",machineNo:'PL-1', productNo:"NF-198-T",materialNo:'720549-102', result:"合格",reportNo:'SYS8.6-13', date:"2019-07-28", weight:"223", material:"LBK15D", changeover:"否", drawing:"views/imgs/standard.svg", standard:"views/imgs/standard.svg"},
	 	{code:'2', machine:"1#机",machineNo:'PL-2', productNo:"XJ-20-T",materialNo:'100501303', result:"合格",reportNo:'SYS8.6-13', date:"2019-07-28", weight:"218", material:"PB4520", changeover:"否", drawing:"views/imgs/standard.svg", standard:"views/imgs/standard.svg"},
	 	{code:'3', machine:"2#机",machineNo:'PL-3', productNo:"XJ-50-B",materialNo:'1005235562', result:"合格",reportNo:'SYS8.6-13', date:"2019-07-28", weight:"220", material:"PB4520", changeover:"是", drawing:"views/imgs/standard.svg", standard:"views/imgs/standard.svg"},
	 	{code:'4', machine:"2#机",machineNo:'PL-5', productNo:"TM-18-B",materialNo:'PB4530', result:"合格",reportNo:'SYS8.6-13', date:"2019-07-28", weight:"426", material:"PB4520", changeover:"否", drawing:"views/imgs/standard.svg", standard:"views/imgs/standard.svg"},
	 ];
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
	$scope.title = "首检报告变更";
	$scope.testData = [
	 	{code:'1', machine:"1#机",machineNo:'PL-1', productNo:"NF-198-T",materialNo:'720549-102', result:"合格",reportNo:'SYS8.6-13', date:"2019-07-28", weight:"223", material:"LBK15D", changeover:"否", drawing:"views/imgs/standard.svg", standard:"views/imgs/standard.svg"},
	 	{code:'2', machine:"1#机",machineNo:'PL-2', productNo:"XJ-20-T",materialNo:'100501303', result:"合格",reportNo:'SYS8.6-13', date:"2019-07-28", weight:"218", material:"PB4520", changeover:"否", drawing:"views/imgs/standard.svg", standard:"views/imgs/standard.svg"},
	 	{code:'3', machine:"2#机",machineNo:'PL-3', productNo:"XJ-50-B",materialNo:'1005235562', result:"合格",reportNo:'SYS8.6-13', date:"2019-07-28", weight:"220", material:"PB4520", changeover:"是", drawing:"views/imgs/standard.svg", standard:"views/imgs/standard.svg"},
	 	{code:'4', machine:"2#机",machineNo:'PL-5', productNo:"TM-18-B",materialNo:'PB4530', result:"合格",reportNo:'SYS8.6-13', date:"2019-07-28", weight:"426", material:"PB4520", changeover:"否", drawing:"views/imgs/standard.svg", standard:"views/imgs/standard.svg"},
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
