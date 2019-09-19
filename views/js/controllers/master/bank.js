app.controller('BankController', ['$scope', 'Restangular' ,'ngTableParams', 'dialogs', 'toaster', 
	function($scope, Restangular, NgTableParams, dialogs, toaster) {
	
	var baseBanks = Restangular.one('master/banks');
	
	var search = function() {	
		baseBanks.get($scope.searcher).then(function(result) {
    		if (result.length < 1) {
    			toaster.pop('warning', '', '没有找到符合条件的数据！');
    		}
			$scope.tableParamsBank = new NgTableParams({count: 10}, { counts: [10, 15, 20], dataset: result});
		}, function(errResponse) {
			console.log("Error with status code", errResponse.status);
		});   	
    };

	var create1 = function() {	
		baseBanks.post().then(function(result) {
    		if (result) {
    			toaster.pop('success', '', '新建银行数据成功！');
    		}
			
		}, function(errResponse) {
			console.log("Error with status code", errResponse.status);
		});   	
    };
    

    var create = function () {
		var dlg = dialogs.create('views/tpl/master/editBank.html','editBankController',{},{size:'md'});
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

    var edit = function (bank) {
		var dlg = dialogs.create('views/tpl/master/editBank.html','editBankController',{"bank":bank},{size:'md'});
		/*
		dlg.result.then(function(updBank){
			Restangular.one('master/banks').customPUT(updBank).then(function(result) {
	    		if (result) {
	    			toaster.pop('success', '', '更新银行数据成功！');
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
    
	$scope.search = search;
	$scope.create = create;
	$scope.edit = edit;
	
	//search();
	
}]);


app.controller('editBankController',function($scope,$modalInstance,data){

	$scope.bankTypes = [{"id":"1", "name":"总行"},{"id":"2", "name":"分行"},{"id":"3", "name":"支行"}];
	$scope.title = "增加银行";
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
