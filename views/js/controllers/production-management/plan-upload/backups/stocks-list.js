app.controller('stocksController', ['$scope', 'Restangular' ,'ngTableParams', 'dialogs', 'toaster', 
	function($scope, Restangular, NgTableParams, dialogs, toaster) {

 var testData = [
 	{code:'1', oreName:"硫酸渣",area:'贵港市', taste:"60", sio2:"5",al2o3:'1.7', p:"0.05", loi:"8.5", classy:"供应",stock:'558',  remark:"褐铁矿，烧结性能好。"},
 	{code:'2', oreName:"铁矿砂",area:'巴基斯坦', taste:"50", sio2:"3.6",al2o3:'2.3', p:"0.08", loi:"5", classy:"供应",stock:'561.5', remark:"部分褐铁矿，烧结性能好。"},
 	{code:'3', oreName:"赤铁矿块",area:'南非', taste:"65", sio2:"3",al2o3:'1.5', p:"0.07", loi:"4", classy:"供应",stock:'562.8',  remark:"褐铁矿，还原性好，热强度一般。"},
 	{code:'4', oreName:"球团矿",area:'南澳大利亚', taste:"65", sio2:"4.5",al2o3:'2.2', p:"0.08", loi:"2.5", classy:"供应",stock:'462.5',remark:"烧结粉， 赤铁矿，烧结性能。"},
 	{code:'5', oreName:"铁矿石",area:'沙坡头区', taste:"46.4", sio2:"2.6",al2o3:'1.3', p:"0.06", loi:"1.5", classy:"供应",stock:'564',  remark:"品位高，储量丰富，开采成本极低。"},
 	{code:'6', oreName:"铁精粉",area:'中国', taste:"65", sio2:"2.6",al2o3:'1.3', p:"0.06", loi:"1.5", classy:"求购",stock:'557.5', remark:"褐铁矿，烧结性能较好。"},
 	{code:'7', oreName:"火箭块",area:'', taste:"59.7", sio2:"2.6",al2o3:'1.3', p:"0.06", loi:"1.5", classy:"供应",stock:'560', remark:"褐铁矿,还原性能较好。"},
 	{code:'8', oreName:"特粉",area:'', taste:"60.2", sio2:"2.6",al2o3:'1.3', p:"0.06", loi:"1.5", classy:"供应",stock:'557.5', remark:"褐铁矿，烧结性能较好。"},
 	{code:'9', oreName:"超特",area:'', taste:"60.8", sio2:"2.6",al2o3:'1.3', p:"0.06", loi:"1.5", classy:"供应",stock:'456.7', remark:"褐铁矿，烧结性能较好。"},
 ];

$scope.myTable = new NgTableParams({count: 5, sorting: { name: "desc", money:"asc" } }, { counts: [5, 10, 20], dataset: testData});

     $scope.toggleDropdown = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.status.isopen = !$scope.status.isopen;
    };
	
	var baseBanks = Restangular.one('master/datasource');
	
    var create = function () {
		var dlg = dialogs.create('views/tpl/layer/master/stocks-edit.html','stocksEditController',{},{size:'md'});
		/*
		dlg.result.then(function(bank){
			Restangular.all('master/banks').post(bank).then(function(result) {
	    		if (result) {
	    			toaster.pop('success', '', '新建银行数据成功！');
	    			search();
	    		}	
			}, function(errResponse) {
				console.log("Error with status code", errResponse.status);
			}); 

		},function(){
			console.log("Cancelled");
		});
		*/
    };

    var deleted = function () {
		var dlg = dialogs.create('views/tpl/layer/master/delete.html','deteleDataController',{},{size:'md'});
		
    };



	$scope.delete = deleted;
	$scope.create = create;
}]);



app.controller('stocksEditController',function($scope,$modalInstance,data){

	$scope.dataTypes = [{"id":"1", "name":"总行"},{"id":"2", "name":"分行"},{"id":"3", "name":"支行"}];
	$scope.title = "库存信息";
	
	$scope.cancel = function(){
		$modalInstance.dismiss('Cancelled');
	};
	
	$scope.save = function(){
		$modalInstance.close($scope.bank);
	};

});

app.controller('deteleDataController',function($scope,$modalInstance,data){

	$scope.title = "删除解析";
	
	$scope.cancel = function(){
		$modalInstance.dismiss('Cancelled');
	};
	
	$scope.save = function(){
		$modalInstance.close($scope.bank);
	};

});
