app.controller('loginController', loginController);
loginController.$inject = ['$scope', 'Restangular', '$http', 'dialogs', 'toaster', '$state'];
function loginController ($scope, Restangular, $http, dialogs, toaster, $state) {
    //定义数据
	$scope.data = {
		username:'',
		password:''
	};
    
	//定义方法
	$scope.method = {
		login:login
	};

	//初始化方法
	function init(){
		window.localStorage.removeItem("authenticationToken");
	};
	//定义登录函数
	function login(){
		//定义传递参数
		var params =  {
			username: $scope.data.username,
			password: $scope.data.password
		}
		$http.post('/api/authenticate',  params).success(function (response, status, headers, config) {
			/*成功信息*/
			console.log(response);
			if(response.id_token){
				window.localStorage.setItem("authenticationToken", response.id_token);
				$state.go('app.s5.storehouse-screen-mgmt');
			}
		}).error(function (response) {
			/*失败信息*/
		});

	}
	//调用初始化方法
	init()
};
