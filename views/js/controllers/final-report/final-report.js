app.controller('finalReportController', ['$scope', 'Restangular' ,'ngTableParams', 'dialogs', 'toaster', 
	function($scope, Restangular, NgTableParams, dialogs, toaster) {

	 var testData = [
	 	{code:'1', machine:"1#机",reportNo:'rpxxxx', productName:"XJ-50-B",taskNo:'ZJG-20190722F2-119', result:"合格",inspectNumber:'0', productDate:"2019-07-28", testDate:"2019-07-28",customerName:"XJ", samplingNumber:"20PCS", batchNumbers:"300PCS", qualifiedNum:"20PCS", unqualifiedNum:"0PCS", drawing:"views/imgs/standard.svg", standard:"views/imgs/standard.svg"},
	 	{code:'2', machine:"1#机",reportNo:'rpxxxx', productName:"XJ-50B",taskNo:'SC20190611X1-416', result:"合格",inspectNumber:'0', productDate:"2019-07-28", testDate:"2019-07-28",customerName:"XJ", samplingNumber:"20PCS", batchNumbers:"300PCS", qualifiedNum:"20PCS", unqualifiedNum:"0PCS", drawing:"views/imgs/standard.svg", standard:"views/imgs/standard.svg"},
	 	{code:'3', machine:"2#机",reportNo:'rpxxxx', productName:"XJ-20-T",taskNo:'SC20190619F2-452', result:"合格",inspectNumber:'', productDate:"2019-07-28", testDate:"2019-07-28",customerName:"XJ", samplingNumber:"20PCS", batchNumbers:"300PCS", qualifiedNum:"20PCS", unqualifiedNum:"0PCS", drawing:"views/imgs/standard.svg", standard:"views/imgs/standard.svg"},
	 	{code:'4', machine:"2#机",reportNo:'rpxxxx', productName:"PLKPA45*50T",taskNo:'SC20190527NJ-365', result:"合格",inspectNumber:'', productDate:"2019-07-28", testDate:"2019-07-28",customerName:"XJ", samplingNumber:"20PCS", batchNumbers:"300PCS", qualifiedNum:"20PCS", unqualifiedNum:"0PCS", drawing:"views/imgs/standard.svg", standard:"views/imgs/standard.svg"},
	 	{code:'5', machine:"2#机",reportNo:'rpxxxx', productName:"PLKPA45*60T",taskNo:'SC20190528SZ-357', result:"不合格",inspectNumber:'5', productDate:"2019-07-28", testDate:"2019-07-28",customerName:"XJ", samplingNumber:"20PCS", batchNumbers:"300PCS", qualifiedNum:"20PCS", unqualifiedNum:"0PCS", drawing:"views/imgs/standard.svg", standard:"views/imgs/standard.svg"},
	 	{code:'6', machine:"2#机",reportNo:'rpxxxx', productName:"LG-16-T/B",taskNo:'SC20190626A-471', result:"不合格",inspectNumber:'2', productDate:"2019-07-28", testDate:"2019-07-28",customerName:"XJ", samplingNumber:"20PCS", batchNumbers:"300PCS", qualifiedNum:"19PCS", unqualifiedNum:"0PCS", drawing:"views/imgs/standard.svg", standard:"views/imgs/standard.svg"},
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
		var dlg = dialogs.create('views/tpl/layer/final-report/add.html','addController',{},{size:'lg'});
    };
	
    function modify(item) {
    	console.log(item);
		var dlg = dialogs.create('views/tpl/layer/final-report/modify.html','modifyController',{data:item},{size:'lg'});
		
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
	$scope.testData = [
	 	{code:'1', machine:"1#机",reportNo:'rpxxxx', productName:"XJ-50-B",taskNo:'ZJG-20190722F2-119', result:"合格",inspectNumber:'0', productDate:"2019-07-28", testDate:"2019-07-28",customerName:"XJ", samplingNumber:"20PCS", batchNumbers:"300PCS", qualifiedNum:"20PCS", unqualifiedNum:"0PCS", drawing:"views/imgs/standard.svg", standard:"views/imgs/standard.svg"},
	 	{code:'2', machine:"1#机",reportNo:'rpxxxx', productName:"XJ-50B",taskNo:'SC20190611X1-416', result:"合格",inspectNumber:'0', productDate:"2019-07-28", testDate:"2019-07-28",customerName:"XJ", samplingNumber:"20PCS", batchNumbers:"300PCS", qualifiedNum:"20PCS", unqualifiedNum:"0PCS", drawing:"views/imgs/standard.svg", standard:"views/imgs/standard.svg"},
	 	{code:'3', machine:"2#机",reportNo:'rpxxxx', productName:"XJ-20-T",taskNo:'SC20190619F2-452', result:"合格",inspectNumber:'', productDate:"2019-07-28", testDate:"2019-07-28",customerName:"XJ", samplingNumber:"20PCS", batchNumbers:"300PCS", qualifiedNum:"20PCS", unqualifiedNum:"0PCS", drawing:"views/imgs/standard.svg", standard:"views/imgs/standard.svg"},
	 	{code:'4', machine:"2#机",reportNo:'rpxxxx', productName:"PLKPA45*50T",taskNo:'SC20190527NJ-365', result:"合格",inspectNumber:'', productDate:"2019-07-28", testDate:"2019-07-28",customerName:"XJ", samplingNumber:"20PCS", batchNumbers:"300PCS", qualifiedNum:"20PCS", unqualifiedNum:"0PCS", drawing:"views/imgs/standard.svg", standard:"views/imgs/standard.svg"},
	 	{code:'5', machine:"2#机",reportNo:'rpxxxx', productName:"PLKPA45*60T",taskNo:'SC20190528SZ-357', result:"不合格",inspectNumber:'5', productDate:"2019-07-28", testDate:"2019-07-28",customerName:"XJ", samplingNumber:"20PCS", batchNumbers:"300PCS", qualifiedNum:"20PCS", unqualifiedNum:"0PCS", drawing:"views/imgs/standard.svg", standard:"views/imgs/standard.svg"},
	 	{code:'6', machine:"2#机",reportNo:'rpxxxx', productName:"LG-16-T/B",taskNo:'SC20190626A-471', result:"不合格",inspectNumber:'2', productDate:"2019-07-28", testDate:"2019-07-28",customerName:"XJ", samplingNumber:"20PCS", batchNumbers:"300PCS", qualifiedNum:"19PCS", unqualifiedNum:"0PCS", drawing:"views/imgs/standard.svg", standard:"views/imgs/standard.svg"},
	];
	$scope.title = "添加最终检验报告";
	var row = {};
	$scope.row = {
    	machine:"",
    	type:"",
    	name:"",
    	judge: "OK"
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
	$scope.title = "最终检验报告变更";
	$scope.testData = [
	 	{code:'1', machine:"1#机",reportNo:'rpxxxx', productName:"XJ-50-B",taskNo:'ZJG-20190722F2-119', result:"合格",inspectNumber:'0', productDate:"2019-07-28", testDate:"2019-07-28",customerName:"XJ", samplingNumber:"20PCS", batchNumbers:"300PCS", qualifiedNum:"20PCS", unqualifiedNum:"0PCS", drawing:"views/imgs/standard.svg", standard:"views/imgs/standard.svg"},
	 	{code:'2', machine:"1#机",reportNo:'rpxxxx', productName:"XJ-50B",taskNo:'SC20190611X1-416', result:"合格",inspectNumber:'0', productDate:"2019-07-28", testDate:"2019-07-28",customerName:"XJ", samplingNumber:"20PCS", batchNumbers:"300PCS", qualifiedNum:"20PCS", unqualifiedNum:"0PCS", drawing:"views/imgs/standard.svg", standard:"views/imgs/standard.svg"},
	 	{code:'3', machine:"2#机",reportNo:'rpxxxx', productName:"XJ-20-T",taskNo:'SC20190619F2-452', result:"合格",inspectNumber:'', productDate:"2019-07-28", testDate:"2019-07-28",customerName:"XJ", samplingNumber:"20PCS", batchNumbers:"300PCS", qualifiedNum:"20PCS", unqualifiedNum:"0PCS", drawing:"views/imgs/standard.svg", standard:"views/imgs/standard.svg"},
	 	{code:'4', machine:"2#机",reportNo:'rpxxxx', productName:"PLKPA45*50T",taskNo:'SC20190527NJ-365', result:"合格",inspectNumber:'', productDate:"2019-07-28", testDate:"2019-07-28",customerName:"XJ", samplingNumber:"20PCS", batchNumbers:"300PCS", qualifiedNum:"20PCS", unqualifiedNum:"0PCS", drawing:"views/imgs/standard.svg", standard:"views/imgs/standard.svg"},
	 	{code:'5', machine:"2#机",reportNo:'rpxxxx', productName:"PLKPA45*60T",taskNo:'SC20190528SZ-357', result:"不合格",inspectNumber:'5', productDate:"2019-07-28", testDate:"2019-07-28",customerName:"XJ", samplingNumber:"20PCS", batchNumbers:"300PCS", qualifiedNum:"20PCS", unqualifiedNum:"0PCS", drawing:"views/imgs/standard.svg", standard:"views/imgs/standard.svg"},
	 	{code:'6', machine:"2#机",reportNo:'rpxxxx', productName:"LG-16-T/B",taskNo:'SC20190626A-471', result:"不合格",inspectNumber:'2', productDate:"2019-07-28", testDate:"2019-07-28",customerName:"XJ", samplingNumber:"20PCS", batchNumbers:"300PCS", qualifiedNum:"19PCS", unqualifiedNum:"0PCS", drawing:"views/imgs/standard.svg", standard:"views/imgs/standard.svg"},
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
