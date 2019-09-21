// config

var rootUrl = "";
var idx = document.URL.indexOf('#');
if (idx < 0) {
	rootUrl = document.URL;
} else {
	rootUrl = document.URL.substring(0,idx);
}

var app =  
angular.module('app')
  .config(
    [        '$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
    function ($controllerProvider,   $compileProvider,   $filterProvider,   $provide) {
        
        // lazy controller, directive and service
        app.controller = $controllerProvider.register;
        app.directive  = $compileProvider.directive;
        app.filter     = $filterProvider.register;
        app.factory    = $provide.factory;
        app.service    = $provide.service;
        app.constant   = $provide.constant;
        app.value      = $provide.value;
    }
  ])
  .config(function(RestangularProvider) {
	  
	//RestangularProvider.setBaseUrl('http://localhost:8080/bdp');
	//console.log("rootURL: " + rootUrl);
	RestangularProvider.setBaseUrl(rootUrl);
	RestangularProvider.setResponseExtractor(function(response, operation) {
    return response;
		// if (response.status == "SUCCESS"){
		// 	return response.result;
		// } else {
		// 	console.log("status: " + response.status);
		// }
    });
  //RestangularProvider.setRequestSuffix('.json');
  var token='Bearer ' + window.localStorage.getItem('authenticationToken');
	RestangularProvider.setDefaultHeaders({'content-type': 'application/json; charset=utf-8','Authorization':token});
  
  })
  .config(['$translateProvider', function($translateProvider){
    // Register a loader for the static files
    // So, the module will search missing translation tables under the specified urls.
    // Those urls are [prefix][langKey][suffix].
    $translateProvider.useStaticFilesLoader({
      prefix: 'views/l10n/',
      suffix: '.js'
    });
    // Tell the module what language to use by default
    $translateProvider.preferredLanguage('cn');
    // Tell the module to store the language in the local storage
    $translateProvider.useLocalStorage();
  }]);