app.controller('TenantController', ['$scope', 'Restangular' ,'ngTableParams', 'dialogs', 'toaster', 
	function($scope, Restangular, NgTableParams, dialogs, toaster) {
	
	var baseTenant = Restangular.one('servant/list');
	
	var search = function() {	
    	baseTenant.get($scope.searcher).then(function(ret) {
    		if (ret.result.length < 1) {
    			toaster.pop('warning', '', '没有找到符合条件的数据！');
    		}
			$scope.tableParamsTenants = new NgTableParams({count: 3}, { counts: [3, 5, 10], dataset: ret.result});
		}, function(errResponse) {
			console.log("Error with status code", errResponse.status);
		});   	
    };
	
	$scope.searcher = {"username":""};
	search();

	$scope.search = search;
	

	
	
}]);