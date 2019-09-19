app.controller('productAdminController', ['$scope', 'Restangular' ,'ngTableParams', 'dialogs', 'toaster', 
	function($scope, Restangular, NgTableParams, dialogs, toaster) {

	 var testData = [
	 	{code:'1', machine:"1#机",type:'K1214', productName:"YFL-1-T/B",numbers:'ZJG-20190722F2-119', status:"未生产",packNumbers:'0', date:"2019-07-28", scrapRate:"", material:"LBK15D", changeover:"", drawing:"views/imgs/standard.svg", standard:"views/imgs/standard.svg"},
	 	{code:'2', machine:"1#机",type:'K1214', productName:"XJ-50B",numbers:'SC20190718X1-521', status:"生产中",packNumbers:'0', date:"2019-07-28", scrapRate:"", material:"PB4520", changeover:"", drawing:"views/imgs/standard.svg", standard:"views/imgs/standard.svg"},
	 	{code:'3', machine:"2#机",type:'K1214', productName:"XJ-20-T",numbers:'SC20190617X1-437', status:"待包装",packNumbers:'', date:"2019-07-28", scrapRate:"", material:"PB4520", changeover:"是", drawing:"views/imgs/standard.svg", standard:"views/imgs/standard.svg"},
	 	{code:'4', machine:"2#机",type:'K1214', productName:"PLKPA45*50T",numbers:'SC20190718X1-521', status:"包装完",packNumbers:'', date:"2019-07-28", scrapRate:"", material:"PB4520", changeover:"", drawing:"views/imgs/standard.svg", standard:"views/imgs/standard.svg"},
	 	{code:'5', machine:"2#机",type:'K1214', productName:"PLKPA45*60T",numbers:'SC20190718X1-521', status:"生产中",packNumbers:'433', date:"2019-07-28", scrapRate:"1.5%", material:"PB4520", changeover:"", drawing:"views/imgs/standard.svg", standard:"views/imgs/standard.svg"},
	 	{code:'6', machine:"2#机",type:'K1214', productName:"LG-16-T/B",numbers:'SC20190718X1-521', status:"生产中",packNumbers:'495', date:"2019-07-28", scrapRate:"1%", material:"PB4520", changeover:"", drawing:"views/imgs/standard.svg", standard:"views/imgs/standard.svg"},
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
	$scope.title = "生产计划变更";
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
