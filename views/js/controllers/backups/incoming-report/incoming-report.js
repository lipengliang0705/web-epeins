app.controller('incomingReportController', ['$scope', 'Restangular' ,'ngTableParams', 'dialogs', 'toaster', 
	function($scope, Restangular, NgTableParams, dialogs, toaster) {

	 var testData = [
	 	{code:'1', reportNo:"SYS8.6-01",materialName:'ARPR05319', supplierName:"杰斯比",batchNumber:'B190807303', result:"合格",inspector:'张元风', checkDate:"2019-07-26", confirmer:"刘磊", drawing:"views/imgs/standard.svg", standard:"views/imgs/standard.svg"},
	 	{code:'2', reportNo:"SYS8.6-02",materialName:'ARPR05319', supplierName:"杰斯比",batchNumber:'B190807303', result:"合格",inspector:'张元风', checkDate:"2019-07-28", confirmer:"刘磊", drawing:"views/imgs/standard.svg", standard:"views/imgs/standard.svg"},
	 	{code:'3', reportNo:"SYS8.6-03",materialName:'ARPR05319', supplierName:"杰斯比",batchNumber:'B190807303', result:"不合格",inspector:'张元风', checkDate:"2019-07-29", confirmer:"刘磊", drawing:"views/imgs/standard.svg", standard:"views/imgs/standard.svg"},
	 	{code:'4', reportNo:"SYS8.6-04",materialName:'ARPR05319', supplierName:"杰斯比",batchNumber:'B190807303', result:"合格",inspector:'张元风', checkDate:"2019-07-30", confirmer:"刘磊", drawing:"views/imgs/standard.svg", standard:"views/imgs/standard.svg"},
	 	{code:'5', reportNo:"SYS8.6-05",materialName:'ARPR05319', supplierName:"杰斯比",batchNumber:'B190807303', result:"合格",inspector:'张元风', checkDate:"2019-07-30", confirmer:"刘磊", drawing:"views/imgs/standard.svg", standard:"views/imgs/standard.svg"},
	 ];
     $scope.testData = testData;
     $scope.myTable = new NgTableParams({count: 5, sorting: { name: "desc", money:"asc" } }, { counts: [5, 10, 20], dataset: testData});
     $scope.toggleDropdown = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.status.isopen = !$scope.status.isopen;
    };
	
	var baseBanks = Restangular.one('master/datasource');
	$scope.search = function(reportNo,materialName,inspector){
		console.log(reportNo,materialName,inspector);
		var filterData = [];
		angular.forEach(testData,function(item,index){
			if(item.reportNo.indexOf(reportNo) > -1 || item.materialName.indexOf(materialName) > -1 || item.inspector.indexOf(inspector) > -1){
				filterData.push(item);
			}
		});

		$scope.myTable = new NgTableParams({count: 5, sorting: { name: "desc", money:"asc" } }, { counts: [5, 10, 20], dataset: filterData});

	}
	var add = function (item) {
		var dlg = dialogs.create('views/tpl/layer/incoming-report/add.html','addController',{},{size:'lg'});
    };
	
    function modify(item) {
    	console.log(item);
		var dlg = dialogs.create('views/tpl/layer/incoming-report/modify.html','modifyController',{data:item},{size:'lg'});
		
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
		var dlg = dialogs.create('views/tpl/layer/incoming-report/delete.html','deteleDataController',{},{size:'sm'});
		
    };



	$scope.delete = deleted;
	$scope.modify = modify;
	$scope.add = add;


}]);



app.controller('addController',function($scope,$modalInstance,data,toaster){
	$scope.title = "添加来料检验报告";
	var row = {};
	$scope.row = {
    	machine:"",
    	type:"",
    	name:"",
    }
	
	$scope.testData = [
		{sampleNo:"9",reportNo:"SYS8.6-01", content:"标签注假密度及其它（见标准）25.3g/l",standard:"24.1----27.0g/l 良好",checkValue:"25.6g/l",result:"OK",judge:"合格"},
		{sampleNo:"10",reportNo:"SYS8.6-02", content:"标签注假密度及其它（见标准）25.3g/l",standard:"24.1----27.0g/l 良好",checkValue:"25.6g/l",result:"OK",judge:"合格"},
        {sampleNo:"11",reportNo:"SYS8.6-03",content:"标签注假密度及其它（见标准）25.3g/l",standard:"24.1----27.0g/l 良好",checkValue:"25.6g/l",result:"OK",judge:"合格"},
        {sampleNo:"17",reportNo:"SYS8.6-04",content:"标签注假密度及其它（见标准）25.3g/l",standard:"24.1----27.0g/l 良好",checkValue:"25.6g/l",result:"OK",judge:"合格"},
        {sampleNo:"18",reportNo:"SYS8.6-05",content:"标签注假密度及其它（见标准）25.3g/l",standard:"24.1----27.0g/l 良好",checkValue:"25.6g/l",result:"OK",judge:"合格"}
	]
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
	$scope.title = "来料检验报告变更";
	$scope.testData = [
		{sampleNo:"9",reportNo:"SYS8.6-01",content:"标签注假密度及其它（见标准）25.3g/l",standard:"24.1----27.0g/l 良好",checkValue:"25.6g/l",result:"OK",judge:"合格"},
		{sampleNo:"10",reportNo:"SYS8.6-02",content:"标签注假密度及其它（见标准）25.3g/l",standard:"24.1----27.0g/l 良好",checkValue:"25.6g/l",result:"OK",judge:"合格"},
        {sampleNo:"11",reportNo:"SYS8.6-03",content:"标签注假密度及其它（见标准）25.3g/l",standard:"24.1----27.0g/l 良好",checkValue:"25.6g/l",result:"OK",judge:"合格"},
        {sampleNo:"17",reportNo:"SYS8.6-04",content:"标签注假密度及其它（见标准）25.3g/l",standard:"24.1----27.0g/l 良好",checkValue:"25.6g/l",result:"OK",judge:"合格"},
        {sampleNo:"18",reportNo:"SYS8.6-05",content:"标签注假密度及其它（见标准）25.3g/l",standard:"24.1----27.0g/l 良好",checkValue:"25.6g/l",result:"OK",judge:"合格"}
	]
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

	$scope.title = "删除数据";
	
	$scope.cancel = function(){
		$modalInstance.dismiss('Cancelled');
	};
	
	$scope.save = function(){
		$modalInstance.close($scope.bank);
	};

});
