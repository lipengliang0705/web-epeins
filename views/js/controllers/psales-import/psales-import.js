app.controller('psalesImportController', ['$scope', 'Restangular' ,'ngTableParams', 'dialogs', 'toaster', 
	function($scope, Restangular, NgTableParams, dialogs, toaster) {

 var testData = [
 	{code:'1', name:"杨迪粉",smallClass:'', englishName:"BHP Yandi JV",fe:'58', sio2:"5",al2o3:'1.7', p:"0.05", loi:"8.5", remark:"褐铁矿，烧结性能好。"},
 	{code:'2', name:"PB粉",smallClass:'', englishName:"Rio Tinto",fe:'61.5', sio2:"3.6",al2o3:'2.3', p:"0.08", loi:"5", remark:"部分褐铁矿，烧结性能好。"},
 	{code:'3', name:"PB块",smallClass:'', englishName:"Rio Tinto",fe:'62.8', sio2:"3",al2o3:'1.5', p:"0.07", loi:"4", remark:"褐铁矿，还原性好，热强度一般。"},
 	{code:'4', name:"纽曼粉",smallClass:'', englishName:"BHP",fe:'62.5', sio2:"4.5",al2o3:'2.2', p:"0.08", loi:"2.5", remark:"烧结粉， 赤铁矿，烧结性能。"},
 	{code:'5', name:"纽曼块",smallClass:'', englishName:"BHP",fe:'64', sio2:"2.6",al2o3:'1.3', p:"0.06", loi:"1.5", remark:"赤铁矿，还原性好，热强度较好。"},
 	{code:'6', name:"火箭粉",smallClass:'', englishName:"FMG Rocket",fe:'57.5', sio2:"4.2",al2o3:'2.2', p:"0.05", loi:"9.5", remark:"褐铁矿，烧结性能较好。"},
 	{code:'7', name:"火箭块",smallClass:'', englishName:"FMG Rocket",fe:'60', sio2:"3.1",al2o3:'1.6', p:"0.045", loi:"9.5", remark:"褐铁矿,还原性能较好。"},
 	{code:'8', name:"特粉",smallClass:'', englishName:"FMG特粉",fe:'57.5', sio2:"5.5",al2o3:'2.5', p:"0.05", loi:"10", remark:"褐铁矿，烧结性能较好。"},
 	{code:'9', name:"超特",smallClass:'', englishName:"FMG超特粉",fe:'56.7', sio2:"7",al2o3:'2.5', p:"0.05", loi:"10", remark:"褐铁矿，烧结性能较好。"},
 ];

$scope.myTable = new NgTableParams({count: 5, sorting: { name: "desc", money:"asc" } }, { counts: [5, 10, 20], dataset: testData});

     $scope.toggleDropdown = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.status.isopen = !$scope.status.isopen;
    };
	
	var baseBanks = Restangular.one('master/datasource');
	
    var create = function () {
		var dlg = dialogs.create('views/tpl/layer/master/oredictionary-edit.html','oredictionaryEditController',{},{size:'md'});
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



app.controller('oredictionaryEditController',function($scope,$modalInstance,data){

	$scope.dataTypes = [{"id":"1", "name":"总行"},{"id":"2", "name":"分行"},{"id":"3", "name":"支行"}];
	$scope.title = "矿石信息";
	
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
