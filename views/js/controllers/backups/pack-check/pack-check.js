app.controller('productAdminController', ['$scope', 'Restangular' ,'ngTableParams', 'dialogs', 'toaster', 
	function($scope, Restangular, NgTableParams, dialogs, toaster) {

 var testData = [
 	{code:'1', machine:"1#机",type:'K1214', productName:"YFL-1-T/B",numbers:'2000', status:"未生产",packNumbers:'5', date:"2019-07-28", scrapRate:"0", material:"LBK15D", changeover:"", drawing:"views/imgs/standard.svg", standard:"views/imgs/standard.svg"},
 	{code:'2', machine:"1#机",type:'K1214', productName:"XJ-50B",numbers:'1001', status:"生产中",packNumbers:'0', date:"2019-07-28", scrapRate:"0", material:"PB4520", changeover:"", drawing:"views/imgs/standard.svg", standard:"views/imgs/standard.svg"},
 	{code:'3', machine:"2#机",type:'K1214', productName:"XJ-20-T",numbers:'1500', status:"待包装",packNumbers:'', date:"2019-07-28", scrapRate:"0", material:"PB4520", changeover:"是", drawing:"views/imgs/standard.svg", standard:"views/imgs/standard.svg"},
 	{code:'4', machine:"2#机",type:'K1214', productName:"PLKPA45*50T",numbers:'3000', status:"包装完",packNumbers:'', date:"2019-07-28", scrapRate:"0", material:"PB4520", changeover:"", drawing:"views/imgs/standard.svg", standard:"views/imgs/standard.svg"},
 	{code:'5', machine:"2#机",type:'K1214', productName:"PLKPA45*60T",numbers:'5000', status:"生产中",packNumbers:'433', date:"2019-07-29", scrapRate:"1.5%", material:"PB4520", changeover:"", drawing:"views/imgs/standard.svg", standard:"views/imgs/standard.svg"},
 	{code:'6', machine:"2#机",type:'K1214', productName:"LG-16-T/B",numbers:'4000', status:"生产中",packNumbers:'495', date:"2019-07-28", scrapRate:"1%", material:"PB4520", changeover:"", drawing:"views/imgs/standard.svg", standard:"views/imgs/standard.svg"},
 ];
 $scope.testData = testData;
// 储存为副本
 // var testDataCppy = angular.copy(testData);
 angular.forEach(testData,function(item,index){
	 console.log('shishi',item);
	 //var count = '';
	 $scope.count = Number(item.numbers) + Number(item.packNumbers);
	 item.count = $scope.count;
	 console.log('再次统计',$scope.count);
	// if(item.date == date || item.name.indexOf(name) > -1){
	// 	filterData.push(item);
	// }
 });

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
		var dlg = dialogs.create('views/tpl/layer/product-admin/add.html','addController',{},{size:'md'});
    };
	
    function modify(item) {
    	console.log(item);
		var dlg = dialogs.create('views/tpl/layer/pack-check/modify.html','modifyController',{data:item},{size:'md'});
		
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

	$scope.search = function(date,name){
		// $scope.searcher.date
		console.log(date,name);
		var filterData = [];
		angular.forEach(testData,function(item,index){
			if(item.date == date || item.name.indexOf(name) > -1){
				filterData.push(item);
			}
		});

		$scope.myTable = new NgTableParams({count: 5, sorting: { name: "desc", money:"asc" } }, { counts: [5, 10, 20], dataset: filterData});

	}
	//测试事件
	function test($event){
		// $scope.searcher.date
		console.log(event);
		console.log(event.target.innerText);
		event.target.innerText = '测试完成';
	}
	//定义方法
	$scope.method = {
		test:test,
	};

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
	$scope.title = "包装数据变更";
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
